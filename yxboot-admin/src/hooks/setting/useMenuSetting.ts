import { MenuModeEnum, MenuTypeEnum } from '@/enums'
import { useAppConfigStore } from '@/store/modules/appConfig'
import { storeToRefs } from 'pinia'

export function useMenuSetting() {
  const appConfigStore = useAppConfigStore()
  const { setMenuSetting } = appConfigStore
  const { getMenuSetting } = storeToRefs(appConfigStore)

  const getMenuMode = computed(() => unref(getMenuSetting).mode)
  const getMenuType = computed(() => unref(getMenuSetting).type)
  const getSplit = computed(() => unref(getMenuSetting).split)

  const isSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDER)
  const isTopMenuType = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)
  const isMixTopType = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX_TOP
  })

  return {
    setMenuSetting,

    getMenuMode,
    getMenuType,
    getSplit,
    isSidebarType,
    isTopMenuType,
    isMixTopType
  }
}
