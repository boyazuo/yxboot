import { AppSetting } from '#/config'
import { _assign, deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { defineStore } from 'pinia'

let defaultOptions: AppSetting

// Must be called before the first use of useAppConfig
export const initAppConfigStore = (options) => {
  defaultOptions = deepMerge(defaultOptions, options)
  useAppConfigStore()
}

export const useAppConfigStore = defineStore({
  id: 'APP_CONFIG',
  state: () => defaultOptions,
  getters: {
    getThemeSetting(state) {
      return state.themeSetting
    },
    getProjectSetting(state) {
      return state.projectSetting
    },
    getSiderSetting(state) {
      return state.siderSetting
    },
    getHeaderSetting(state) {
      return state.headerSetting
    },
    getMenuSetting(state) {
      return state.menuSetting
    },
    getMultiTabsSetting(state) {
      return state.multiTabsSetting
    },
    getTransitionSetting(state) {
      return state.transitionSetting
    }
  },
  actions: {
    setThemeSetting(value) {
      _assign(this.themeSetting, value)
    },
    setProjectSetting(value) {
      _assign(this.projectSetting, value)
    },
    setSiderSetting(value) {
      _assign(this.siderSetting, value)
    },
    setHeaderSetting(value) {
      _assign(this.headerSetting, value)
    },
    setMenuSetting(value) {
      _assign(this.menuSetting, value)
    },
    setMultiTabsSetting(value) {
      _assign(this.multiTabsSetting, value)
    },
    setTransitionSetting(value) {
      _assign(this.transitionSetting, value)
    },
    async resetAllState() {
      Persistent.clearAll()
    }
  }
})
