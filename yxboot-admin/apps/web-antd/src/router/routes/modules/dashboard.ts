import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/workspace',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '仪表盘',
    },
    children: [
      {
        name: 'Workspace',
        path: 'workspace',
        component: () => import('@/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '工作台',
        },
      },
      {
        name: 'Analytics',
        path: 'analytics',
        component: () => import('@/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '分析页',
        },
      },
    ],
  },
];

export default routes;
