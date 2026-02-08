import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { MenuRecordRaw } from '../../base/types/menu-record';

interface PermissionStoreReturn {
  accessRoutes: Ref<RouteRecordRaw[]>;
  accessMenus: Ref<MenuRecordRaw[]>;
  setAccessRoutes: (routes: RouteRecordRaw[]) => void;
  setAccessMenus: (menus: MenuRecordRaw[]) => void;
  getMenuByPath: (path: string) => MenuRecordRaw | undefined;
}

/**
 * 权限/访问 Store：存储可访问的路由与菜单（由 access guard 填充）
 */
export const usePermissionStore = defineStore(
  'permission',
  (): PermissionStoreReturn => {
    const accessRoutes = ref<RouteRecordRaw[]>([]);
    const accessMenus = ref<MenuRecordRaw[]>([]);

    function setAccessRoutes(routes: RouteRecordRaw[]) {
      accessRoutes.value = routes;
    }

    function setAccessMenus(menus: MenuRecordRaw[]) {
      accessMenus.value = menus;
    }

    function getMenuByPath(path: string): MenuRecordRaw | undefined {
      function find(menus: MenuRecordRaw[], p: string): MenuRecordRaw | undefined {
        for (const menu of menus) {
          if (menu.path === p) return menu;
          if (menu.children) {
            const m = find(menu.children, p);
            if (m) return m;
          }
        }
        return undefined;
      }
      return find(accessMenus.value, path);
    }

    return {
      accessRoutes,
      accessMenus,
      setAccessRoutes,
      setAccessMenus,
      getMenuByPath,
    };
  },
);
