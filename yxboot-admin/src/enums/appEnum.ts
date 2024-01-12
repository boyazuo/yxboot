export const SIDE_BAR_MINI_WIDTH = 48

export enum ContentLayoutEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed'
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light'
}

export enum ThemeTypeEnum {
  LIGHT = 'light',
  DARK = 'dark',
  REAL_DARK = 'real-dark'
}

/**
 * @description: Navigation bar mode
 */
export enum NavBarModeEnum {
  // left menu
  SIDEBAR = 'sidebar',
  // mix-sidebar
  MIX_SIDEBAR = 'mix-sidebar',
  // mixin menu
  MIX = 'mix',
  // top menu
  TOP_MENU = 'top-menu'
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed'
}

// Route switching animation
// 路由切换动画
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale'
}
