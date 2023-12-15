import type { HeaderSetting } from '#/config'

import { computed, unref } from 'vue'

import { useAppStore } from '@/store/modules/app'

import { MenuModeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const { getMenuMode, isSidebarType } = useMenuSetting()

  const { getShowBreadCrumb, getShowLogo } = useRootSetting()

  const getShowMixHeaderRef = computed(() => !unref(isSidebarType) && unref(getShowHeader))

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme)

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor)

  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)

  const getUseLockPage = computed(() => appStore.getHeaderSetting.useLockPage)

  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)

  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)

  const getShowBread = computed(() => {
    return unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb)
  })

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) && !unref(isSidebarType)
  })

  const getShowContent = computed(() => {
    return unref(getShowBread)
  })

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    setHeaderSetting,

    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getHeaderBgColor
  }
}
