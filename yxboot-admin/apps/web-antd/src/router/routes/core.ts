import type { RouteRecordRaw } from 'vue-router';
import { LOGIN_PATH } from '@/constants';
import { defaultHomePath } from '@/preferences';

const BasicLayout = () => import('@/layouts/basic.vue');
const AuthLayout = () => import('@/layouts/auth.vue');

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    meta: { hideInBreadcrumb: true, title: 'Root' },
    redirect: defaultHomePath,
    children: [],
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: AuthLayout,
    meta: { hideInTab: true, title: 'Authentication' },
    redirect: LOGIN_PATH,
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/_core/authentication/login.vue'),
        meta: { title: '登录' },
      },
      {
        name: 'CodeLogin',
        path: 'code-login',
        component: () => import('@/views/_core/authentication/code-login.vue'),
        meta: { title: '手机验证码登录' },
      },
      {
        name: 'QrCodeLogin',
        path: 'qrcode-login',
        component: () => import('@/views/_core/authentication/qrcode-login.vue'),
        meta: { title: '扫码登录' },
      },
      {
        name: 'ForgetPassword',
        path: 'forget-password',
        component: () => import('@/views/_core/authentication/forget-password.vue'),
        meta: { title: '忘记密码' },
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('@/views/_core/authentication/register.vue'),
        meta: { title: '注册' },
      },
    ],
  },
];

const fallbackNotFoundRoute: RouteRecordRaw = {
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
  component: () => import('@/views/_core/fallback/not-found.vue'),
  meta: { hideInBreadcrumb: true, hideInMenu: true, hideInTab: true, title: '404' },
};

function getCoreRouteNames(routes: RouteRecordRaw[], set = new Set<string>()): string[] {
  for (const r of routes) {
    if (r.name && typeof r.name === 'string') set.add(r.name);
    if (r.children?.length) getCoreRouteNames(r.children, set);
  }
  return [...set];
}

const coreRouteNames = getCoreRouteNames(coreRoutes);

export { coreRouteNames, coreRoutes, fallbackNotFoundRoute };
