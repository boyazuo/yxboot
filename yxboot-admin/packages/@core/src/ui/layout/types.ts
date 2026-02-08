/**
 * 布局类型（UI 无关）
 */
export type LayoutMode = 'sidebar' | 'mix' | 'top';

export interface LayoutProps {
  /** 布局模式 */
  mode?: LayoutMode;
  /** 是否折叠侧边栏 */
  collapsed?: boolean;
  /** 是否移动端 */
  mobile?: boolean;
  /** 是否显示 Logo */
  showLogo?: boolean;
  /** 是否显示标签页 */
  showTabs?: boolean;
  /** 是否显示面包屑 */
  showBreadcrumb?: boolean;
  /** 头部高度 */
  headerHeight?: number;
  /** 侧边栏宽度 */
  sidebarWidth?: number;
  /** 折叠后侧边栏宽度 */
  collapsedWidth?: number;
  /** 内容区 */
  contentClass?: string;
  [key: string]: unknown;
}

export interface LayoutContext {
  collapsed: boolean;
  mobile: boolean;
  mode: LayoutMode;
  toggleCollapsed: () => void;
}
