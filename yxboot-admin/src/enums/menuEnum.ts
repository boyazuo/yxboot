// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 菜单中间
  CENTER = 'CENTER',
  // 头部
  HEADER = 'HEADER',
}

/**
 * @description: menu type
 */
export enum MenuTypeEnum {
  // left menu
  SIDER = 'sider',
  // top menu
  TOP_MENU = 'top-menu',
  // mixin menu
  MIX_TOP = 'mix-top',
  // mix-sidebar
  MIX_SIDER = 'mix-sider',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

// menu mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
  MIX = 'mix',
}

export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
