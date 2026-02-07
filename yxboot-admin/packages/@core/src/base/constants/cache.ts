/**
 * 缓存常量
 */

/** 缓存键名前缀 */
export const CACHE_PREFIX = '__yxboot__';

/** 缓存键名 */
export const CACHE_KEYS = {
  /** Token */
  TOKEN: `${CACHE_PREFIX}token`,
  /** Refresh Token */
  REFRESH_TOKEN: `${CACHE_PREFIX}refresh_token`,
  /** 用户信息 */
  USER_INFO: `${CACHE_PREFIX}user_info`,
  /** 主题模式 */
  THEME: `${CACHE_PREFIX}theme`,
  /** 语言 */
  LOCALE: `${CACHE_PREFIX}locale`,
  /** 标签页 */
  TABS: `${CACHE_PREFIX}tabs`,
  /** 侧边栏折叠状态 */
  SIDEBAR_COLLAPSED: `${CACHE_PREFIX}sidebar_collapsed`,
} as const;
