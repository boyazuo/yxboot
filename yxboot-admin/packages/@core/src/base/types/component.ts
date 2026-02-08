import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 组件映射类型（用于动态路由）
 */
export type ComponentRecordType = Record<
  string,
  () => Promise<{ default: Component }>
>;

/**
 * 组件为 string 的路由（后端返回）
 */
export type RouteRecordStringComponent = Omit<
  RouteRecordRaw,
  'children' | 'component'
> & {
  children?: RouteRecordStringComponent[];
  component: string;
};
