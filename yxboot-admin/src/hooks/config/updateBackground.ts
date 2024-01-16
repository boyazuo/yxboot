import { ThemeEnum } from '@/enums/appEnum'
import { lighten } from '@/utils/color'
import { setCssVar } from '@/utils/theme'
import { useHeaderSetting } from '../setting/useHeaderSetting'

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'

// const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
// const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
// const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

// Dark模式颜色
// const DARK_COLOR = '#212121'

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const { getHeaderTheme, getHeaderBgColor } = useHeaderSetting()
  if (!color) {
    if (getHeaderTheme.value === ThemeEnum.DARK) {
      color = '#151515'
    } else {
      color = getHeaderBgColor.value
    }
  }
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color)

  // hover color
  const hoverColor = lighten(color!, 6)
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor)
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor)
}

/**
 * Change the background color of the left menu
 * @param color  bg color
 */
// export function updateSidebarBgColor(color?: string) {
//   const appStore = useAppStore()

//   // if (!isHexColor(color)) return;
//   const darkMode = appStore.getDarkMode === ThemeEnum.DARK
//   if (!color) {
//     if (darkMode) {
//       color = DARK_COLOR
//     } else {
//       color = appStore.getMenuSetting.bgColor
//     }
//   }
//   // setCssVar(SIDER_DARK_BG_COLOR, color)
//   // setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6))
//   // setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5))

//   // only #ffffff is light
//   // Only when the background color is #fff, the theme of the menu will be changed to light
//   const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase())

//   appStore.setProjectConfig({
//     menuSetting: {
//       theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK
//     }
//   })
// }
