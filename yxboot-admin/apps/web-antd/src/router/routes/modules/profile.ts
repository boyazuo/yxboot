import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('@/views/_core/profile/index.vue'),
    meta: {
      icon: 'lucide:user',
      hideInMenu: true,
      title: '个人中心',
    },
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('@/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: '关于',
      order: 9999,
    },
  },
];

export default routes;
