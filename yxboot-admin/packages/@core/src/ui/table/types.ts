/**
 * 表格相关类型（UI 无关）
 */

export interface TableColumn {
  /** 字段名 */
  prop: string;
  /** 列标题 */
  label: string;
  /** 列宽 */
  width?: number | string;
  /** 最小宽度 */
  minWidth?: number | string;
  /** 是否可排序 */
  sortable?: boolean | 'custom';
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 自定义渲染插槽名 */
  slot?: string;
  [key: string]: unknown;
}

/** 分页 */
export interface TablePagination {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

/** 表格 Props */
export interface TableProps<T = any> {
  columns: TableColumn[];
  data?: T[];
  loading?: boolean;
  pagination?: TablePagination | false;
  rowKey?: string | ((row: T) => string);
  /** 是否显示选择列 */
  selectable?: boolean;
  [key: string]: unknown;
}

/** 表格实例 */
export interface TableInstance<T = any> {
  reload: () => Promise<void>;
  getSelection: () => T[];
  clearSelection: () => void;
}
