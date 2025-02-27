import { AppSetting } from '#/config'
import { _assign, deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { defineStore } from 'pinia'
import { ContentLayoutEnum, RouterTransitionEnum, SettingButtonPositionEnum, ThemeEnum, ThemeTypeEnum } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

let defaultOptions: AppSetting = {
  themeSetting: {
    theme: ThemeEnum.LIGHT,
    themeType: ThemeTypeEnum.DARK,
    borderRadius: 4,
    primaryColor: '#1677ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#ff4d4f',
    infoColor: '#1677ff'
  },
  projectSetting: {
    showSettingButton: true,
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    contentMode: ContentLayoutEnum.FULL,
    showLogo: true,
    showFooter: false,
    openKeepAlive: true,
    lockTime: 0,
    showBreadCrumb: true,
    showBreadCrumbIcon: false,
    useErrorHandle: false,
    useOpenBackTop: true,
    canEmbedIFramePage: true,
    closeMessageOnSwitch: true,
    removeAllHttpPending: false
  },
  siderSetting: {
    theme: ThemeEnum.DARK,
    fixed: false,
    show: true,
    width: 210,
    mixSidebarWidth: 80,
    collapsedWidth: 48,
    collapsed: false
  },
  headerSetting: {
    fixed: true,
    show: true,
    theme: ThemeEnum.LIGHT,
    useLockPage: true,
    showFullScreen: true
  },
  menuSetting: {
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDER,
    split: false
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    showQuick: true,
    showRedo: true,
    showFold: true,
    canDrag: true
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    openNProgress: false
  }
}

// Must be called before the first use of useAppConfig
export const initAppConfigStore = (options) => {
  defaultOptions = deepMerge(defaultOptions, options)
  useAppConfigStore()
}

export const useAppConfigStore = defineStore('APP_CONFIG', {
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
      this.themeSetting = value
    },
    setProjectSetting(value) {
      this.projectSetting = value
    },
    setSiderSetting(value) {
      this.siderSetting = value
    },
    setHeaderSetting(value) {
      this.headerSetting = value
    },
    setMenuSetting(value) {
      this.menuSetting = value
    },
    setMultiTabsSetting(value) {
      this.multiTabsSetting = value
    },
    setTransitionSetting(value) {
      this.transitionSetting = value
    },
    async resetAllState() {
      Persistent.clearAll()
    }
  }
})
