/**
 * 应用相关类型
 */

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** 布局模式 */
export type LayoutMode = 'sidebar' | 'mix' | 'top';

/** 语言类型 */
export type Locale = 'zh-CN' | 'en-US';

/** 应用配置 */
export interface AppConfig {
  /** 应用名称 */
  name: string;
  /** 应用版本 */
  version: string;
  /** 应用描述 */
  description?: string;
  /** 主题模式 */
  theme: ThemeMode;
  /** 布局模式 */
  layout: LayoutMode;
  /** 语言 */
  locale: Locale;
  /** 是否显示 Logo */
  showLogo?: boolean;
  /** 是否显示面包屑 */
  showBreadcrumb?: boolean;
  /** 是否显示标签页 */
  showTabs?: boolean;
}

/** 应用状态 */
export interface AppState {
  /** 侧边栏是否折叠 */
  collapsed: boolean;
  /** 是否移动端 */
  mobile: boolean;
  /** 当前语言 */
  locale: Locale;
  /** 主题模式 */
  theme: ThemeMode;
  /** 布局模式 */
  layout: LayoutMode;
}
