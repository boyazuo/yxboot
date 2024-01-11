import type { HeaderSetting } from '#/config'

import { MenuModeEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useAppConfigStore } from '@/store/modules/appConfig'
import { computed, unref } from 'vue'

export function useHeaderSetting() {
  const appStore = useAppConfigStore()

  const { getMenuMode, isSidebarType } = useMenuSetting()

  const { getShowBreadCrumb, getShowLogo } = useRootSetting()

  const getShowMixHeaderRef = computed(() => !unref(isSidebarType) && unref(getShowHeader))

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme)

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor)

  const getUseLockPage = computed(() => appStore.getHeaderSetting.useLockPage)

  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)

  const getShowBread = computed(() => {
    return unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb)
  })

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) //&& !unref(isSidebarType)
  })

  const getShowContent = computed(() => {
    return unref(getShowBread)
  })

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setHeaderSetting(headerSetting)
  }

  return {
    setHeaderSetting,

    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getHeaderBgColor
  }
}
