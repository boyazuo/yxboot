import type { Router, RouteRecordRaw } from 'vue-router';
import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { cloneDeep } from 'es-toolkit/compat';
import type { AccessMode } from '../../base/types/router';
import type { GenerateMenuAndRoutesOptions } from '../router/types';
import { generateRoutes } from '../router/generator';
import { generateMenus } from '../router/generate-menus';
import { mapTree } from '../../base/utils/tree';
import { usePermissionStore } from '../store/permission';

export interface AccessGuardOptions {
  /** 核心路由 name 列表，这些路由不参与权限生成与动态注册 */
  coreRouteNames?: (string | symbol)[];
  /** 权限模式 */
  mode?: AccessMode;
  /** 登录页路径 */
  loginPath?: string;
  /** 登录后默认首页 */
  defaultHomePath?: string;
  /** 未登录时是否允许访问白名单（如登录页、忘记密码） */
  whiteList?: string[];
  /** 获取当前用户角色（前端/混合模式用） */
  getRoles?: () => string[] | Promise<string[]>;
  /** 是否已登录 */
  isAuthenticated?: () => boolean | Promise<boolean>;
  /** 生成菜单与路由的选项（routes、router、fetchMenuListAsync 等） */
  generateOptions: GenerateMenuAndRoutesOptions;
}

/**
 * 生成可访问路由与菜单，并注册到 router、写入 permission store
 */
export async function generateAccessible(
  mode: AccessMode,
  options: GenerateMenuAndRoutesOptions,
  getRoles: () => string[] | Promise<string[]>,
): Promise<{ accessibleMenus: import('../../base/types/menu-record').MenuRecordRaw[]; accessibleRoutes: RouteRecordRaw[] }> {
  const { router } = options;
  const permissionStore = usePermissionStore();

  const routes = cloneDeep(options.routes);
  const roles = await getRoles();
  const opts = { ...options, routes, roles };

  let accessibleRoutes = await generateRoutes(mode, opts);

  // 为 keepAlive 包装 component name
  accessibleRoutes = mapTree<RouteRecordRaw, RouteRecordRaw>(
    accessibleRoutes,
    (route) => {
      const r = { ...route };
      const meta = r.meta as any;
      const comp = r.component;
      if (
        meta?.keepAlive &&
        typeof comp === 'function' &&
        r.name &&
        typeof r.name === 'string'
      ) {
        const load = comp as () => Promise<{ default: Component }>;
        r.component = async () => {
          const mod = await load();
          if (!mod?.default) return mod;
          return defineComponent({
            name: r.name as string,
            setup(props, { attrs, slots }) {
              return () => h(mod.default, { ...props, ...attrs }, slots);
            },
          });
        };
      }
      if (r.redirect || !r.children?.length) return r;
      const first = r.children[0];
      if (first?.path?.startsWith('/')) {
        r.redirect = first.path;
      }
      return r;
    },
  );

  const registerRoutes = options.registerRoutes !== false;
  if (registerRoutes) {
    const rootName = 'Root';
    const root = router.getRoutes().find((item) => item.path === '/');
    for (const route of accessibleRoutes) {
      if (root && !(route.meta as any)?.noBasicLayout) {
        if (route.children?.length) {
          delete (route as any).component;
        }
        if (!route.name || !router.hasRoute(route.name)) {
          router.addRoute(rootName, route);
        }
      } else {
        if (!route.name || !router.hasRoute(route.name)) {
          router.addRoute(route);
        }
      }
    }
  }

  const accessibleMenus = generateMenus(accessibleRoutes, router);
  permissionStore.setAccessRoutes(accessibleRoutes);
  permissionStore.setAccessMenus(accessibleMenus);

  return { accessibleMenus, accessibleRoutes };
}

/**
 * 创建路由权限守卫
 */
export function createAccessGuard(
  router: Router,
  options: AccessGuardOptions,
): void {
  const {
    coreRouteNames = [],
    mode = 'frontend',
    loginPath = '/login',
    defaultHomePath,
    whiteList = [loginPath, '/register', '/forgot-password'],
    getRoles = () => [],
    isAuthenticated = () => false,
    generateOptions,
  } = options;

  const permissionStore = usePermissionStore();

  router.beforeEach(async (to, _from, next) => {
    const path = to.path;
    const name = to.name as string | symbol | undefined;

    if (coreRouteNames.length > 0 && name != null && coreRouteNames.includes(name)) {
      const authenticated =
        typeof isAuthenticated === 'function' ? await isAuthenticated() : false;
      if (authenticated && path === loginPath && defaultHomePath) {
        next({ path: defaultHomePath, replace: true });
      } else {
        next();
      }
      return;
    }

    if (whiteList.some((p) => path.startsWith(p))) {
      next();
      return;
    }

    const authenticated =
      typeof isAuthenticated === 'function' ? await isAuthenticated() : false;

    if (!authenticated) {
      next({ path: loginPath, query: { redirect: path } });
      return;
    }

    if (permissionStore.accessRoutes.length > 0) {
      next();
      return;
    }

    try {
      await generateAccessible(mode, generateOptions, getRoles);
      next({ ...to, replace: true });
    } catch (e) {
      console.error('[AccessGuard] generateAccessible failed', e);
      next({ path: loginPath });
    }
  });
}
