import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import { PERSONAL_ROUTE } from './personal'

// 根路由
export const ROOT_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login.vue'),
  meta: {
    title: '登录',
    keepAlive: true,
    requireAuth: false,
  },
}

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [ROOT_ROUTE, LOGIN_ROUTE, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE, PERSONAL_ROUTE]
