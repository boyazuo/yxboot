/**
 * 标签页类型（UI 无关）
 */
import type { TabDefinition } from '../../base/types/tabs';

export type TabsStyleType = 'chrome' | 'button';

export interface TabsProps {
  /** 当前激活的 tab key */
  active?: string;
  /** 标签列表 */
  tabs?: TabDefinition[];
  /** 是否可拖拽排序 */
  draggable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 样式类型 */
  styleType?: TabsStyleType;
  /** 关闭事件 */
  onClose?: (key: string) => void;
  /** 排序事件 */
  onSort?: (oldIndex: number, newIndex: number) => void;
  [key: string]: unknown;
}

export interface TabConfig extends TabDefinition {
  affixTab: boolean;
  closable: boolean;
  icon?: string;
  key: string;
  title: string;
}
