import type { Router } from 'vue-router';
import { useAuthStore, useUserStore, createAccessGuard } from '@yxboot/core';
import { LOGIN_PATH } from '@/constants';
import { defaultHomePath } from '@/preferences';
import { accessRoutes, coreRouteNames } from './routes';

function setupCommonGuard(router: Router) {
  const loadedPaths = new Set<string>();
  router.beforeEach((to) => {
    (to.meta as any).loaded = loadedPaths.has(to.path);
    return true;
  });
  router.afterEach((to) => {
    loadedPaths.add(to.path);
  });
}

function setupAccessGuard(router: Router) {
  createAccessGuard(router, {
    coreRouteNames: [...coreRouteNames, 'FallbackNotFound'],
    mode: 'frontend',
    loginPath: LOGIN_PATH,
    defaultHomePath,
    whiteList: ['/auth'],
    isAuthenticated: () => useAuthStore().isAuthenticated,
    getRoles: () => useUserStore().roles,
    generateOptions: {
      router,
      routes: accessRoutes,
      registerRoutes: false,
      pageMap: import.meta.glob('../views/**/*.vue') as any,
      layoutMap: {
        BasicLayout: () => import('@/layouts/basic.vue'),
      },
    },
  });
}

export function createRouterGuard(router: Router) {
  setupCommonGuard(router);
  setupAccessGuard(router);
}
