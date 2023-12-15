import { generateColors, getThemeColors } from '../../../build/config/themeConfig'

import { replaceStyleVariables } from '@kirklin/vite-plugin-vben-theme/es/client'
import { mixDarken, mixLighten, tinycolor } from '@kirklin/vite-plugin-vben-theme/es/colorUtils'

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color
  })

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors]
  })
}
