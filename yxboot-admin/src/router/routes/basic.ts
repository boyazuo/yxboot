import { EXCEPTION_COMPONENT, LAYOUT, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true
      }
    }
  ]
}

export const ERROR_LOG_ROUTE: RouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/sys/error-log/index.vue'),
      meta: {
        title: '错误日志列表',
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log'
      }
    }
  ]
}
