import { storeToRefs } from 'pinia'
import { useAppConfigStore } from '@/store/modules/appConfig'

export function useProjectSetting() {
  const appConfigStore = useAppConfigStore()
  const { setProjectSetting } = appConfigStore
  const { getProjectSetting } = storeToRefs(appConfigStore)

  const getShowSettingButton = computed(() => unref(getProjectSetting).showSettingButton)
  const getSettingButtonPosition = computed(() => unref(getProjectSetting).settingButtonPosition)
  const getContentMode = computed(() => unref(getProjectSetting).contentMode)
  const getShowLogo = computed(() => unref(getProjectSetting).showLogo)
  const getShowFooter = computed(() => unref(getProjectSetting).showFooter)
  const getOpenKeepAlive = computed(() => unref(getProjectSetting).openKeepAlive)
  const getLockTime = computed(() => unref(getProjectSetting).lockTime)
  const getShowBreadCrumb = computed(() => unref(getProjectSetting).showBreadCrumb)
  const getShowBreadCrumbIcon = computed(() => unref(getProjectSetting).showBreadCrumbIcon)
  const getUseErrorHandle = computed(() => unref(getProjectSetting).useErrorHandle)
  const getUseOpenBackTop = computed(() => unref(getProjectSetting).useOpenBackTop)
  const getCanEmbedIFramePage = computed(() => unref(getProjectSetting).canEmbedIFramePage)
  const getCloseMessageOnSwitch = computed(() => unref(getProjectSetting).closeMessageOnSwitch)
  const getRemoveAllHttpPending = computed(() => unref(getProjectSetting).removeAllHttpPending)

  return {
    setProjectSetting,

    getShowSettingButton,
    getSettingButtonPosition,
    getContentMode,
    getShowLogo,
    getShowFooter,
    getOpenKeepAlive,
    getLockTime,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseErrorHandle,
    getUseOpenBackTop,
    getCanEmbedIFramePage,
    getCloseMessageOnSwitch,
    getRemoveAllHttpPending,
  }
}
