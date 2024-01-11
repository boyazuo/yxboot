/**
 * Application configuration
 */
import type { AppSetting } from '#/config'

import { ThemeEnum } from '@/enums'
import { APP_CFG_KEY } from '@/enums/cacheEnum'
import { HandlerEnum } from '@/enums/handlerEnum'
import appSetting from '@/settings/appSetting'
import { initAppConfigStore, useAppConfigStore } from '@/store/modules/appConfig'
import { _merge, deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { setCssVar } from '@/utils/theme'
import { theme } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useThemeSetting } from '../setting/useThemeSetting'
import { updateDarkTheme } from './dark'
import { updateHeaderBgColor, updateSidebarBgColor } from './updateBackground'

// Initial project configuration
export function initAppConfig() {
  let projCfg: AppSetting = Persistent.getLocal(APP_CFG_KEY) as AppSetting
  projCfg = deepMerge(appSetting, projCfg || {})
  console.log('projCfg', projCfg)
  initAppConfigStore(projCfg)
}

export const useAppConfig = () => {
  const appConfigStore = useAppConfigStore()
  const appConfigOptions = storeToRefs(appConfigStore)
  const { getTheme, getToken, getThemeColors } = useThemeSetting()

  const setAppConfig = (configs: DeepPartial<AppSetting>) => {
    appConfigStore.$patch((state) => {
      _merge(state, configs)
    })
  }

  function baseHandler(event: HandlerEnum, value: any) {
    setAppConfig(handlerResults(event, value))
  }

  const isDark = computed(() => {
    return unref(getTheme) === ThemeEnum.DARK
  })

  const toggleTheme = (value) => {
    if (getTheme.value === value) {
      return
    }
    setAppConfig({ themeSetting: { theme: value }, headerSetting: { theme: value } })
    updateDarkTheme(value)
    updateHeaderBgColor()
  }

  const getThemeConfig = computed(() => {
    return {
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        ...unref(getToken)
      }
    }
  })

  watch(
    getThemeColors,
    (val) => {
      val.colorPrimary && setCssVar('--primary-color', val.colorPrimary)
      val.colorSuccess && setCssVar('--success-color', val.colorSuccess)
      val.colorError && setCssVar('--error-color', val.colorError)
      val.colorWarning && setCssVar('--warning-color', val.colorWarning)
      val.colorInfo && setCssVar('--info-color', val.colorInfo)
    },
    { deep: true }
  )

  return {
    ...appConfigOptions,
    isDark,
    toggleTheme,
    setAppConfig,
    baseHandler,
    getThemeConfig
  }
}

export function handlerResults(
  event: HandlerEnum,
  value: any
): DeepPartial<AppSetting & { menuSetting: { hidden: boolean } }> {
  const { toggleTheme } = useAppConfig()
  switch (event) {
    // ============theme==================
    case HandlerEnum.CHANGE_THEME:
      toggleTheme(value)
      return {}
    case HandlerEnum.CHANGE_THEME_COLOR:
      return { themeSetting: { primaryColor: value } }

    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value
      const splitOpt = split === undefined ? { split } : {}
      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt
        }
      }

    case HandlerEnum.MENU_HAS_DRAG:
      return { menuSetting: { canDrag: value } }

    case HandlerEnum.MENU_ACCORDION:
      return { menuSetting: { accordion: value } }

    case HandlerEnum.MENU_TOP_ALIGN:
      return { menuSetting: { topMenuAlign: value } }

    case HandlerEnum.MENU_COLLAPSED:
      return { menuSetting: { collapsed: value } }

    case HandlerEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } }

    case HandlerEnum.MENU_SHOW_SIDEBAR:
      return { menuSetting: { show: value } }

    case HandlerEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menuSetting: { collapsedShowTitle: value } }

    case HandlerEnum.MENU_THEME:
      updateSidebarBgColor(value)
      return { menuSetting: { bgColor: value } }

    case HandlerEnum.MENU_SPLIT:
      return { menuSetting: { split: value } }

    case HandlerEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      return { menuSetting: { closeMixSidebarOnChange: value } }

    case HandlerEnum.MENU_FIXED:
      return { menuSetting: { fixed: value } }

    // ============transition==================
    case HandlerEnum.ROUTER_TRANSITION:
      return { transitionSetting: { basicTransition: value } }

    case HandlerEnum.OPEN_ROUTE_TRANSITION:
      return { transitionSetting: { enable: value } }

    case HandlerEnum.OPEN_PROGRESS:
      return { transitionSetting: { openNProgress: value } }
    // ============root==================

    case HandlerEnum.LOCK_TIME:
      return { lockTime: value }

    case HandlerEnum.CONTENT_MODE:
      return { contentMode: value }

    case HandlerEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value }

    case HandlerEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value }

    case HandlerEnum.SHOW_FOOTER:
      return { showFooter: value }

    case HandlerEnum.SHOW_LOGO:
      return { showLogo: value }

    // ============tabs==================
    case HandlerEnum.TABS_SHOW_QUICK:
      return { multiTabsSetting: { showQuick: value } }

    case HandlerEnum.TABS_SHOW:
      return { multiTabsSetting: { show: value } }

    case HandlerEnum.TABS_SHOW_REDO:
      return { multiTabsSetting: { showRedo: value } }

    case HandlerEnum.TABS_SHOW_FOLD:
      return { multiTabsSetting: { showFold: value } }

    // ============header==================

    case HandlerEnum.HEADER_FIXED:
      return { headerSetting: { fixed: value } }

    case HandlerEnum.HEADER_SHOW:
      return { headerSetting: { show: value } }
    default:
      return {}
  }
}
