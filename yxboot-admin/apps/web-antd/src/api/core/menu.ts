import type { RouteRecordStringComponent } from '@yxboot/core';
import { requestClient } from '@/api/request';

/** 后端 SysMenu 结构（与 /auth/permissions、/sys/menu 一致） */
export interface SysMenuDto {
  menuId?: number;
  name?: string;
  code?: string;
  type?: string;
  icon?: string;
  path?: string;
  component?: string;
  parentId?: number | null;
  display?: number;
  sort?: number;
  children?: SysMenuDto[];
}

function mapMenuToRoute(m: SysMenuDto): RouteRecordStringComponent {
  return {
    path: m.path ?? '',
    name: (m.code || m.path || String(m.menuId)) as string,
    meta: {
      title: m.name,
      icon: m.icon,
      order: m.sort,
    },
    component: m.component ?? '',
    children: m.children?.length
      ? (m.children.map(mapMenuToRoute) as RouteRecordStringComponent[])
      : undefined,
  };
}

/** 将扁平菜单按 parentId 转为树 */
function buildMenuTree(list: SysMenuDto[], parentId: number | null = null): SysMenuDto[] {
  return list
    .filter((m) => (m.parentId ?? null) === parentId)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((m) => ({
      ...m,
      children: buildMenuTree(list, m.menuId ?? null),
    }));
}

/** 当前用户可访问的菜单（树形）：后端 GET /auth/permissions，扁平转树 */
export async function getPermissionsMenusApi() {
  const list = await requestClient.get<SysMenuDto[]>('/auth/permissions');
  if (!Array.isArray(list)) return [];
  const tree = buildMenuTree(list);
  return tree.map(mapMenuToRoute);
}

/** 获取菜单列表（用于后端/混合模式动态路由）：与 getPermissionsMenusApi 一致 */
export async function getAllMenusApi() {
  return getPermissionsMenusApi();
}
