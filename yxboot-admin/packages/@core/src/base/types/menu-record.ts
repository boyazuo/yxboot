import type { Component } from 'vue';

/**
 * 菜单徽标
 */
export interface MenuRecordBadgeRaw {
  badge?: string;
  badgeType?: 'dot' | 'normal';
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * 菜单原始对象（用于从路由生成菜单）
 */
export interface MenuRecordRaw extends MenuRecordBadgeRaw {
  activeIcon?: string;
  children?: MenuRecordRaw[];
  disabled?: boolean;
  icon?: Component | string;
  name: string;
  order?: number;
  parent?: string;
  parents?: string[];
  path: string;
  show?: boolean;
}
