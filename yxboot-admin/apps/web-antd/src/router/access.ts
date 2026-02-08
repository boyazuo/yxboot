import type { GenerateMenuAndRoutesOptions } from '@yxboot/core';
import { generateAccessible } from '@yxboot/core';
import { message } from 'ant-design-vue';
import { BasicLayout } from '@/layouts';
import { getAllMenusApi } from '@/api';

const forbiddenComponent = () => import('@/views/_core/fallback/forbidden.vue');

export async function generateAccess(
  mode: 'frontend' | 'backend' | 'mixed',
  options: GenerateMenuAndRoutesOptions,
  getRoles: () => string[] | Promise<string[]>,
) {
  const pageMap = import.meta.glob('../views/**/*.vue');
  const layoutMap: Record<string, () => Promise<any>> = {
    BasicLayout,
  };

  return generateAccessible(mode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading({ content: '加载菜单中...', duration: 1.5 });
      return getAllMenusApi();
    },
    forbiddenComponent,
    layoutMap,
    pageMap: pageMap as any,
  }, getRoles);
}
