/**
 * @description: menu type
 */
export enum MenuTypeEnum {
  // left menu
  SIDEBAR = 'sidebar',
  // mixin menu
  MIX = 'mix',
  // top menu
  TOP_MENU = 'top-menu'
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

// menu mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
  MIX = 'mix'
}

export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT
}
