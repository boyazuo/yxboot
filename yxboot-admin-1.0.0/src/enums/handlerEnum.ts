import type { SelectorType } from '#/config'
import { ContentLayoutEnum, RouterTransitionEnum, ThemeTypeEnum } from '@/enums/appEnum'
import { MenuTypeEnum } from '@/enums/menuEnum'

export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  CHANGE_THEME,

  // sider
  SIDER_FIXED,

  // header
  HEADER_SHOW,
  HEADER_FIXED,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION,
}

export const contentModeOptions = [
  {
    value: ContentLayoutEnum.FULL,
    label: '流式',
  },
  {
    value: ContentLayoutEnum.FIXED,
    label: '定宽',
  },
]

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  }
})

export const themeTypeList: SelectorType[] = [
  {
    title: '亮色主题风格',
    type: ThemeTypeEnum.LIGHT,
  },
  {
    title: '暗色主题风格',
    type: ThemeTypeEnum.DARK,
  },
  {
    title: '暗黑模式',
    type: ThemeTypeEnum.REAL_DARK,
  },
]

export const menuTypeList: SelectorType[] = [
  {
    title: '左侧菜单模式',
    type: MenuTypeEnum.SIDER,
  },
  {
    title: '顶部菜单模式',
    type: MenuTypeEnum.TOP_MENU,
  },
  // {
  //   title: '顶部混合菜单模式',
  //   type: MenuTypeEnum.MIX_TOP
  // },
  {
    title: '侧栏混合菜单模式',
    type: MenuTypeEnum.MIX_SIDER,
  },
]
