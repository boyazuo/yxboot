import { LAYOUT } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

export const PERSONAL_ROUTE: RouteRecordRaw = {
  path: '/personal',
  name: 'personal',
  component: LAYOUT,
  redirect: '/personal/index',
  children: [
    {
      path: 'index',
      name: 'personalPage',
      component: () => import('@/views/sys/personal/personal.vue'),
      meta: {
        title: '关于',
        icon: 'ant-design:user-outlined',
        hideMenu: true
      }
    }
  ]
}
