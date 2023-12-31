import type { ProjectConfig } from '#/config'

import { computed } from 'vue'

import { ContentLayoutEnum, ThemeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'

type RootSetting = Omit<ProjectConfig, 'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'>

export function useRootSetting() {
  const appStore = useAppStore()

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const getSettingButtonPosition = computed(() => appStore.getProjectConfig.settingButtonPosition)

  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage)

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  const getContentMode = computed(() => appStore.getProjectConfig.contentMode)

  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop)

  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton)

  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle)

  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)

  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb)

  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor)

  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon)

  const getLockTime = computed(() => appStore.getProjectConfig.lockTime)

  const getDarkMode = computed(() => appStore.getDarkMode)

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentLayoutEnum.FULL ? ContentLayoutEnum.FULL : ContentLayoutEnum.FIXED
  )

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode)
  }
  return {
    setRootSetting,

    getSettingButtonPosition,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getShowLogo,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getLockTime,
    getThemeColor,
    getDarkMode,
    setDarkMode
  }
}
