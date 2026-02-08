import type { RouteRecordRaw } from 'vue-router';
import type { ComponentRecordType, RouteRecordStringComponent } from '../../base/types/component';
import { filterTree, mapTree } from '../../base/utils/tree';
import type { AccessMode } from '../../base/types/router';

/**
 * 前端模式：根据角色过滤路由
 */
export async function generateRoutesByFrontend(
  routes: RouteRecordRaw[],
  roles: string[],
  forbiddenComponent?: RouteRecordRaw['component'],
): Promise<RouteRecordRaw[]> {
  const filtered = filterTree<RouteRecordRaw>(routes, (route) =>
    hasAuthority(route, roles),
  );

  if (!forbiddenComponent) {
    return filtered;
  }

  return mapTree<RouteRecordRaw, RouteRecordRaw>(filtered, (route) => {
    const r = { ...route };
    if (menuVisibleWithForbidden(route)) {
      r.component = forbiddenComponent;
    }
    return r;
  });
}

function hasAuthority(route: RouteRecordRaw, access: string[]): boolean {
  const authority = (route.meta as any)?.authority;
  if (!authority) return true;
  const canAccess = access.some((v) => authority.includes(v));
  return canAccess || (!canAccess && menuVisibleWithForbidden(route));
}

function menuVisibleWithForbidden(route: RouteRecordRaw): boolean {
  const meta = route.meta as any;
  return (
    !!meta?.authority &&
    Reflect.has(meta, 'menuVisibleWithForbidden') &&
    !!meta.menuVisibleWithForbidden
  );
}

/**
 * 后端模式：根据接口返回的菜单转成路由
 */
export async function generateRoutesByBackend(options: {
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>;
  layoutMap?: ComponentRecordType;
  pageMap?: ComponentRecordType;
}): Promise<RouteRecordRaw[]> {
  const { fetchMenuListAsync, layoutMap = {}, pageMap = {} } = options;

  const menuRoutes = await fetchMenuListAsync?.();
  if (!menuRoutes) return [];

  const normalizePageMap: ComponentRecordType = {};
  for (const [key, value] of Object.entries(pageMap)) {
    normalizePageMap[normalizeViewPath(key)] = value;
  }

  return convertRoutes(menuRoutes, layoutMap, normalizePageMap);
}

function normalizeViewPath(path: string): string {
  const normalized = path.replace(/^(\.\/|\.\.\/)+/, '');
  const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return withSlash.replace(/^\/views/, '');
}

function convertRoutes(
  routes: RouteRecordStringComponent[],
  layoutMap: ComponentRecordType,
  pageMap: ComponentRecordType,
): RouteRecordRaw[] {
  return mapTree<RouteRecordStringComponent, RouteRecordRaw>(routes, (node) => {
    const route = { ...node } as unknown as RouteRecordRaw;
    const { component } = node;

    if (component && layoutMap[component]) {
      route.component = layoutMap[component];
    } else if (component) {
      const norm = normalizeViewPath(component);
      const pageKey = norm.endsWith('.vue') ? norm : `${norm}.vue`;
      if (pageMap[pageKey]) {
        route.component = pageMap[pageKey];
      }
    }
    return route;
  });
}

/**
 * 根据权限模式生成路由
 */
export async function generateRoutes(
  mode: AccessMode,
  options: import('./types').GenerateMenuAndRoutesOptions,
): Promise<RouteRecordRaw[]> {
  const { forbiddenComponent, roles = [], routes } = options;

  let result: RouteRecordRaw[];

  switch (mode) {
    case 'backend':
      result = await generateRoutesByBackend(options);
      break;
    case 'frontend':
      result = await generateRoutesByFrontend(routes, roles, forbiddenComponent);
      break;
    case 'mixed': {
      const [front, back] = await Promise.all([
        generateRoutesByFrontend(routes, roles, forbiddenComponent),
        generateRoutesByBackend(options),
      ]);
      result = [...front, ...back];
      break;
    }
    default:
      result = [];
  }

  return result;
}
