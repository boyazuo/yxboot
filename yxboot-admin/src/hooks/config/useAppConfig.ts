/**
 * Application configuration
 */
import type { ProjectConfig } from '#/config'

import { ThemeEnum } from '@/enums/appEnum'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
import { useAppStore } from '@/store/modules/app'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { updateDarkTheme } from './dark'
import { updateHeaderBgColor, updateSidebarBgColor } from './updateBackground'

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore()
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  const darkMode = appStore.getDarkMode
  const { headerSetting: { bgColor: headerBgColor } = {}, menuSetting: { bgColor } = {} } = projCfg

  appStore.setProjectConfig(projCfg)

  // init dark mode
  updateDarkTheme(darkMode)
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor()
    updateSidebarBgColor()
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor)
    bgColor && updateSidebarBgColor(bgColor)
  }
}
