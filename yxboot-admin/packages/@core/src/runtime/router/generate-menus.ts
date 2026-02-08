import type { Router, RouteRecordRaw } from 'vue-router';
import type { MenuRecordRaw } from '../../base/types/menu-record';
import type { RouteMeta } from '../../base/types/router';
import { filterTree, mapTree, sortTree } from '../../base/utils/tree';

type ExRoute = RouteRecordRaw & { parent?: string; parents?: string[] };

/**
 * 根据路由表生成菜单列表
 */
export function generateMenus(
  routes: RouteRecordRaw[],
  router: Router,
): MenuRecordRaw[] {
  const pathMap: Record<string, string> = {};
  for (const r of router.getRoutes()) {
    if (r.name) pathMap[String(r.name)] = r.path;
  }

  let menus = mapTree<ExRoute, MenuRecordRaw>(
    routes as ExRoute[],
    (route) => {
    const path = pathMap[String(route.name)] ?? route.path ?? '';
    const meta = (route.meta ?? {}) as RouteMeta & {
      hideChildrenInMenu?: boolean;
      link?: string;
      order?: number;
    };
    const children = (route.children ?? []) as MenuRecordRaw[];
    const name = (meta.title || route.name || '') as string;
    const resultChildren = meta.hideChildrenInMenu ? [] : children;

    if (resultChildren.length > 0) {
      resultChildren.forEach((child: MenuRecordRaw & { parent?: string; parents?: string[] }) => {
        child.parents = [...(route.parents ?? []), path];
        child.parent = path;
      });
    }

    const resultPath = meta.hideChildrenInMenu ? (route.redirect as string) || path : meta.link || path;

    return {
      activeIcon: (meta as any).activeIcon,
      badge: (meta as any).badge,
      badgeType: (meta as any).badgeType,
      badgeVariants: (meta as any).badgeVariants,
      icon: meta.icon,
      name,
      order: meta.order,
      parent: route.parent,
      parents: route.parents,
      path: resultPath,
      show: !(meta as any).hideInMenu,
      children: resultChildren,
    };
  },
  );

  menus = sortTree<MenuRecordRaw>(menus, (a, b) => (a?.order ?? 999) - (b?.order ?? 999));
  return filterTree<MenuRecordRaw>(menus, (menu) => !!menu.show);
}
