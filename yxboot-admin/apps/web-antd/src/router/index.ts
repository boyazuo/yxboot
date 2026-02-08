import type { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { createRouterGuard } from './guard';

const history =
  import.meta.env.VITE_ROUTER_HISTORY === 'hash'
    ? createWebHashHistory(import.meta.env.BASE_URL || '/')
    : createWebHistory(import.meta.env.BASE_URL || '/');

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { behavior: 'smooth', el: to.hash };
    return { left: 0, top: 0 };
  },
});

export async function setupRouter(app: App) {
  app.use(router);
  // 必须在 app.use(pinia) 之后注册路由守卫，因为守卫内会使用 usePermissionStore 等
  createRouterGuard(router);
  await router.isReady();
}

export { router };
