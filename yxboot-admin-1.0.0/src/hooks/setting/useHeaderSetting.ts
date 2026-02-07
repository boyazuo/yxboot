import { computed, unref } from 'vue'
import type { HeaderSetting } from '#/config'
import { MenuModeEnum } from '@/enums/menuEnum'
import { useMenuSetting, useProjectSetting } from '@/hooks/setting'
import { useAppConfigStore } from '@/store/modules/appConfig'

export function useHeaderSetting() {
  const appStore = useAppConfigStore()

  const { getMenuMode, isSidebarType } = useMenuSetting()

  const { getShowBreadCrumb, getShowLogo } = useProjectSetting()

  const getShowMixHeaderRef = computed(() => !unref(isSidebarType) && unref(getShowHeader))

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme)

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

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
  }
}
