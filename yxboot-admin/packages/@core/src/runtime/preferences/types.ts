/**
 * 偏好设置类型定义
 * 参考 vben @vben-core/preferences，与 yxboot 现有类型对齐
 */
import type { Locale, ThemeMode } from '../../base/types/app';

/** 布局类型：与 base/types/app LayoutMode 对齐，并扩展全屏等 */
export type LayoutType = 'sidebar' | 'mix' | 'top' | 'full-content';

/** 内容紧凑模式 */
export type ContentCompactType = 'compact' | 'wide';

/** 顶栏模式 */
export type LayoutHeaderModeType = 'fixed' | 'static' | 'auto' | 'auto-scroll';

/** 顶栏菜单位置 */
export type LayoutHeaderMenuAlignType = 'start' | 'center' | 'end';

/** 面包屑风格 */
export type BreadcrumbStyleType = 'normal' | 'background';

/** 导航风格 */
export type NavigationStyleType = 'plain' | 'rounded';

/** 标签页风格 */
export type TabsStyleType = 'chrome' | 'card' | 'plain' | 'brisk';

/** 页面切换动画 */
export type PageTransitionType = 'fade' | 'fade-slide' | 'fade-up' | 'fade-down';

/** 偏好设置按钮位置 */
export type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header';

/** 深度部分类型 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ---------- 各模块偏好 ----------

export interface AppPreferences {
  /** 是否灰色模式 */
  colorGrayMode: boolean;
  /** 是否色弱模式 */
  colorWeakMode: boolean;
  /** 是否紧凑模式 */
  compact: boolean;
  /** 内容紧凑模式 */
  contentCompact: ContentCompactType;
  /** 内容紧凑宽度 */
  contentCompactWidth: number;
  /** 内容内边距 */
  contentPadding: number;
  contentPaddingBottom: number;
  contentPaddingLeft: number;
  contentPaddingRight: number;
  contentPaddingTop: number;
  /** 默认首页 */
  defaultHomePath: string;
  /** 是否动态标题 */
  dynamicTitle: boolean;
  /** 是否显示偏好设置入口 */
  enablePreferences: boolean;
  /** 是否移动端 */
  isMobile: boolean;
  /** 布局方式 */
  layout: LayoutType;
  /** 语言 */
  locale: Locale;
  /** 应用名 */
  name: string;
  /** 偏好设置按钮位置 */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /** 水印 */
  watermark: boolean;
  watermarkContent: string;
  zIndex: number;
}

export interface BreadcrumbPreferences {
  enable: boolean;
  hideOnlyOne: boolean;
  showHome: boolean;
  showIcon: boolean;
  styleType: BreadcrumbStyleType;
}

export interface CopyrightPreferences {
  companyName: string;
  companySiteLink: string;
  date: string;
  enable: boolean;
  icp: string;
  icpLink: string;
  settingShow?: boolean;
}

export interface FooterPreferences {
  enable: boolean;
  fixed: boolean;
  height: number;
}

export interface HeaderPreferences {
  enable: boolean;
  height: number;
  hidden: boolean;
  menuAlign: LayoutHeaderMenuAlignType;
  mode: LayoutHeaderModeType;
}

export interface LogoPreferences {
  enable: boolean;
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  source: string;
  sourceDark?: string;
}

export interface NavigationPreferences {
  accordion: boolean;
  split: boolean;
  styleType: NavigationStyleType;
}

export interface SidebarPreferences {
  autoActivateChild: boolean;
  collapsed: boolean;
  collapsedButton: boolean;
  collapsedShowTitle: boolean;
  collapseWidth: number;
  enable: boolean;
  expandOnHover: boolean;
  extraCollapse: boolean;
  extraCollapsedWidth: number;
  fixedButton: boolean;
  hidden: boolean;
  mixedWidth: number;
  width: number;
}

export interface TabbarPreferences {
  draggable: boolean;
  enable: boolean;
  height: number;
  keepAlive: boolean;
  maxCount: number;
  middleClickToClose: boolean;
  persist: boolean;
  showIcon: boolean;
  showMaximize: boolean;
  showMore: boolean;
  styleType: TabsStyleType;
  wheelable: boolean;
}

export interface ThemePreferences {
  colorDestructive: string;
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  fontSize: number;
  mode: ThemeMode;
  radius: string;
  semiDarkHeader: boolean;
  semiDarkSidebar: boolean;
}

export interface TransitionPreferences {
  enable: boolean;
  loading: boolean;
  name: PageTransitionType | string;
  progress: boolean;
}

export interface WidgetPreferences {
  fullscreen: boolean;
  globalSearch: boolean;
  languageToggle: boolean;
  lockScreen: boolean;
  notification: boolean;
  refresh: boolean;
  sidebarToggle: boolean;
  themeToggle: boolean;
  timezone: boolean;
}

export interface ShortcutKeyPreferences {
  enable: boolean;
  globalLockScreen: boolean;
  globalLogout: boolean;
  globalPreferences: boolean;
  globalSearch: boolean;
}

export interface Preferences {
  app: AppPreferences;
  breadcrumb: BreadcrumbPreferences;
  copyright: CopyrightPreferences;
  footer: FooterPreferences;
  header: HeaderPreferences;
  logo: LogoPreferences;
  navigation: NavigationPreferences;
  shortcutKeys: ShortcutKeyPreferences;
  sidebar: SidebarPreferences;
  tabbar: TabbarPreferences;
  theme: ThemePreferences;
  transition: TransitionPreferences;
  widget: WidgetPreferences;
}

export type PreferencesKeys = keyof Preferences;

export interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<Preferences>;
}
