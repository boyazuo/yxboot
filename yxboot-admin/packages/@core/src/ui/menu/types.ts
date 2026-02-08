/**
 * 菜单类型（UI 无关）
 */
import type { MenuRecordRaw } from '../../base/types/menu-record';

export interface MenuProps {
  /** 菜单数据 */
  items?: MenuRecordRaw[];
  /** 当前激活的 path */
  activeKey?: string;
  /** 是否折叠 */
  collapsed?: boolean;
  /** 模式：垂直 / 水平 / 内联 */
  mode?: 'vertical' | 'horizontal' | 'inline';
  /** 点击菜单项 */
  onSelect?: (key: string, item: MenuRecordRaw) => void;
  [key: string]: unknown;
}

export interface MenuItemProps {
  item: MenuRecordRaw;
  depth?: number;
  collapsed?: boolean;
}
