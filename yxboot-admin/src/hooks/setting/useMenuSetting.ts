import type { MenuSetting } from '#/config'

import { SIDE_BAR_MINI_WIDTH } from '@/enums/appEnum'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import { useAppStore } from '@/store/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getShowSidebar = computed(() => {
    return unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL
  })

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getMenuType = computed(() => appStore.getMenuSetting.type)

  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)

  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)

  const getSplit = computed(() => appStore.getMenuSetting.split)

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor)

  const isSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)

  const isTopMenuType = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  const isMixType = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX
  })

  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { siderHidden } = appStore.getMenuSetting
    return siderHidden ? 0 : SIDE_BAR_MINI_WIDTH
  })

  const getCalcContentWidth = computed(() => {
    const width = unref(isTopMenuType) ? 0 : unref(getRealWidth)
    return `calc(100% - ${unref(width)}px)`
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getMenuFixed,
    getShowMenu,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getMenuTheme,
    getSplit,
    getMenuBgColor,
    getShowSidebar,
    isSidebarType,
    isTopMenuType,
    isMixType
  }
}
