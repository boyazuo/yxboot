import type { RouteRecordRaw } from 'vue-router';

/**
 * 路由相关类型
 */

/** 权限模式 */
export type AccessMode = 'frontend' | 'backend' | 'mixed';

/** 路由元信息 */
export interface RouteMeta {
  /** 标题 */
  title?: string;
  /** 图标 */
  icon?: string;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否固定在标签页 */
  affix?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 权限标识 */
  permissions?: string[];
  /** 角色标识 */
  roles?: string[];
  /** 排序 */
  order?: number;
  /** 外部链接 */
  externalLink?: string;
  /** 内嵌 iframe */
  iframe?: string;
}

/** 菜单项 */
export interface MenuItem {
  /** 唯一标识 */
  id: string | number;
  /** 路径 */
  path: string;
  /** 名称 */
  name: string;
  /** 标题 */
  title: string;
  /** 图标 */
  icon?: string;
  /** 父级 ID */
  parentId?: string | number;
  /** 子菜单 */
  children?: MenuItem[];
  /** 元信息 */
  meta?: RouteMeta;
  /** 组件路径 */
  component?: string;
  /** 重定向 */
  redirect?: string;
}

/** 扩展的路由记录 */
export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMeta;
};
