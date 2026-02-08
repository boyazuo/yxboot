/**
 * UI 组件类型定义（UI 无关，供适配器实现）
 * 子模块类型由各目录 types 导出，此处做兼容性汇总
 */

export type { FormLayout, FormSchema, FormProps, FormInstance } from './form';
export type { TableColumn, TablePagination, TableProps, TableInstance } from './table';
export type {
  ModalOptions,
  DrawerOptions,
  ModalApi,
  DrawerApi,
  ModalAnimationType,
} from './modal';
export type { TabsProps, TabsStyleType, TabConfig } from './tabs';
export type { LayoutProps, LayoutContext, LayoutMode } from './layout';
export type { MenuProps, MenuItemProps } from './menu';
