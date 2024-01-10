import type { HeaderSetting, MenuSetting, MultiTabsSetting, ProjectConfig, TransitionSetting } from '#/config'

import { store } from '@/store'
import { defineStore } from 'pinia'

import { ThemeEnum } from '@/enums/appEnum'
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { darkMode } from '@/settings/designSetting'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'

interface AppState {
  darkMode?: ThemeEnum
  // project config
  projectConfig: ProjectConfig | null
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY)
  }),
  getters: {
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    }
  },
  actions: {
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    async resetAllState() {
      Persistent.clearAll()
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
