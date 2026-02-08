import type { RouteRecordRaw } from 'vue-router';
import { coreRoutes, fallbackNotFoundRoute, coreRouteNames } from './core';

const dynamicModules = import.meta.glob('./modules/**/*.ts', { eager: true }) as Record<
  string,
  { default: RouteRecordRaw[] }
>;

const dynamicRoutes: RouteRecordRaw[] = [];
for (const key of Object.keys(dynamicModules).sort()) {
  const mod = dynamicModules[key];
  if (mod?.default && Array.isArray(mod.default)) {
    dynamicRoutes.push(...mod.default);
  }
}

/** 有权限校验的路由列表（用于守卫内按角色过滤菜单） */
const accessRoutes = dynamicRoutes;

/** 根路由 + 业务子路由，保证 Root 在 404 之前、匹配顺序正确 */
const rootWithChildren: RouteRecordRaw = {
  ...coreRoutes[0],
  children: [...dynamicRoutes],
};

/** 最终路由：Root(含子路由) -> Auth -> 404 */
const routes: RouteRecordRaw[] = [
  rootWithChildren,
  ...coreRoutes.slice(1),
  fallbackNotFoundRoute,
];

export { accessRoutes, coreRouteNames, routes };
