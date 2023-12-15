import { LAYOUT } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

export const ABOUT_ROUTE: RouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/sys/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true
      }
    }
  ]
}
