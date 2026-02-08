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
  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean;
  /** 是否在标签页中隐藏 */
  hideInTab?: boolean;
  /** 是否固定在标签页 */
  affix?: boolean;
  /** 固定标签页顺序 */
  affixTabOrder?: number;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 权限/角色标识（与 permissions/roles 二选一，vben 风格） */
  authority?: string[];
  /** 权限标识 */
  permissions?: string[];
  /** 角色标识 */
  roles?: string[];
  /** 菜单可见但无权限时跳 403 */
  menuVisibleWithForbidden?: boolean;
  /** 排序 */
  order?: number;
  /** 外部链接 */
  externalLink?: string;
  /** 内嵌 iframe */
  iframe?: string;
  /** 子级在菜单中不展现 */
  hideChildrenInMenu?: boolean;
  /** 外链路径 */
  link?: string;
  /** 不使用基础布局 */
  noBasicLayout?: boolean;
  /** 标签页最大打开数 */
  maxNumOfOpenTab?: number;
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
