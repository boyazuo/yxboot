import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/demos',
    name: 'Demos',
    redirect: '/demos/ant-design',
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '示例',
    },
    children: [
      {
        name: 'AntDesignDemos',
        path: 'ant-design',
        component: () => import('@/views/demos/antd/index.vue'),
        meta: { title: 'Ant Design 示例' },
      },
    ],
  },
];

export default routes;
