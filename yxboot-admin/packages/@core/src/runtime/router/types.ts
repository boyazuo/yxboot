import type { Router, RouteRecordRaw } from 'vue-router';
import type { ComponentRecordType, RouteRecordStringComponent } from '../../base/types/component';
import type { MenuRecordRaw } from '../../base/types/menu-record';

/**
 * 生成菜单与路由的选项
 */
export interface GenerateMenuAndRoutesOptions {
  /** 从后端拉取菜单（后端/混合模式） */
  fetchMenuListAsync?: () => Promise<RouteRecordStringComponent[]>;
  /** 403 页面组件 */
  forbiddenComponent?: RouteRecordRaw['component'];
  /** 布局组件映射 */
  layoutMap?: ComponentRecordType;
  /** 页面组件映射 */
  pageMap?: ComponentRecordType;
  /** 是否向 router 动态注册路由；为 false 时仅生成菜单与权限数据（路由已在初始 config 中） */
  registerRoutes?: boolean;
  /** 角色列表（前端/混合模式） */
  roles?: string[];
  router: Router;
  /** 前端路由表（前端/混合模式） */
  routes: RouteRecordRaw[];
}

export type { MenuRecordRaw, RouteRecordRaw };
