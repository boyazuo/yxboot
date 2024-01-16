import { useAppConfigStore } from '@/store/modules/appConfig'
import { storeToRefs } from 'pinia'

export function useMultipleTabSetting() {
  const appConfigStore = useAppConfigStore()
  const { setMultiTabsSetting } = appConfigStore
  const { getMultiTabsSetting } = storeToRefs(appConfigStore)

  const getShowMultipleTab = computed(() => unref(getMultiTabsSetting).show)

  const getShowQuick = computed(() => unref(getMultiTabsSetting).showQuick)

  const getShowRedo = computed(() => unref(getMultiTabsSetting).showRedo)

  const getShowFold = computed(() => unref(getMultiTabsSetting).showFold)

  return {
    setMultiTabsSetting,

    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold
  }
}
