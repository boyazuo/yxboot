import { storeToRefs } from 'pinia'
import { ThemeEnum } from '@/enums'
import { useAppConfigStore } from '@/store/modules/appConfig'

export function useSiderSetting() {
  const appConfigStore = useAppConfigStore()
  const { setSiderSetting } = appConfigStore
  const { getSiderSetting } = storeToRefs(appConfigStore)

  const getSiderTheme = computed(() => unref(getSiderSetting).theme)
  const getFixed = computed(() => unref(getSiderSetting).fixed)
  const getShowSider = computed(() => unref(getSiderSetting).show)
  const getWidth = computed(() => unref(getSiderSetting).width)
  const getMixSidebarWidth = computed(() => unref(getSiderSetting).mixSidebarWidth)
  const getCollapsedWidth = computed(() => unref(getSiderSetting).collapsedWidth)
  const getCollapsed = computed(() => unref(getSiderSetting).collapsed)

  function toggleTheme() {
    setSiderSetting({
      theme: unref(getSiderTheme) === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    })
  }

  function toggleCollapsed() {
    setSiderSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    setSiderSetting,

    getSiderTheme,
    getFixed,
    getShowSider,
    getWidth,
    getMixSidebarWidth,
    getCollapsedWidth,
    getCollapsed,

    toggleTheme,
    toggleCollapsed,
  }
}
