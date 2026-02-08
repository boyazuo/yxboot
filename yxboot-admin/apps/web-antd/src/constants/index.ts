/** 登录页路径 */
export const LOGIN_PATH = '/auth/login';

/** 默认首页 */
export const DEFAULT_HOME_PATH = '/dashboard/workspace';

/**
 * 菜单/标签图标映射为 Element Plus 图标集 (ep:)，避免 lucide/carbon/ic 等未加载时显示为方块
 */
export const MENU_ICON_MAP: Record<string, string> = {
  'lucide:layout-dashboard': 'ep:odometer',
  'carbon:workspace': 'ep:monitor',
  'lucide:area-chart': 'ep:data-line',
  'ic:baseline-view-in-ar': 'ep:document',
  'lucide:user': 'ep:user',
  'lucide:copyright': 'ep:info-filled',
};

export function getMenuIcon(icon: unknown): string {
  if (typeof icon !== 'string' || !icon.includes(':')) return 'ep:menu';
  return MENU_ICON_MAP[icon] ?? icon;
}
