import type { RouteLocationNormalized } from 'vue-router'

export interface DropMenu {
  onClick?: Fn
  to?: string
  icon?: string
  event: string | number
  text: string
  disabled?: boolean
  divider?: boolean
}

export enum TabContentEnum {
  TAB_TYPE,
  EXTRA_TYPE
}

export interface TabContentProps {
  tabItem: RouteLocationNormalized
  type?: TabContentEnum
  trigger?: ('click' | 'hover' | 'contextmenu')[]
}

export enum MenuEventEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL,
  SCALE
}
