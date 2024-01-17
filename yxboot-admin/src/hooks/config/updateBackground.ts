import { ThemeEnum } from '@/enums/appEnum'
import { lighten } from '@/utils/color'
import { setCssVar } from '@/utils/theme'
import { useHeaderSetting } from '../setting/useHeaderSetting'

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'

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
