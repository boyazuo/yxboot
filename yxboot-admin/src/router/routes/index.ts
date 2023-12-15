import { PageEnum } from '@/enums/pageEnum'
import { LAYOUT } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'
import { ABOUT_ROUTE } from './about'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import { PERSONAL_ROUTE } from './personal'

// 根路由
export const HOME_ROUTE: RouteRecordRaw = {
  path: '/',
  name: 'Index',
  component: LAYOUT,
  redirect: PageEnum.BASE_HOME,
  children: [
    {
      path: '/index',
      name: 'Home',
      component: () => import('@/views/sys/home/index.vue'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }
  ]
}

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login.vue'),
  meta: {
    title: '登录',
    keepAlive: true,
    requireAuth: false
  }
}

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LOGIN_ROUTE, HOME_ROUTE, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE, ABOUT_ROUTE, PERSONAL_ROUTE]
