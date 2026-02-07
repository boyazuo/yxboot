import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

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
        title: '个人中心',
        icon: 'ant-design:user-outlined',
        hideMenu: true,
      },
    },
  ],
}
