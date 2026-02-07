import { storeToRefs } from 'pinia'
import { useAppConfigStore } from '@/store/modules/appConfig'

export function useThemeSetting() {
  const appConfigStore = useAppConfigStore()
  const { setThemeSetting } = appConfigStore
  const { getThemeSetting } = storeToRefs(appConfigStore)

  const getTheme = computed(() => unref(getThemeSetting).theme)
  const getThemeType = computed(() => unref(getThemeSetting).themeType)
  const getBorderRadius = computed(() => unref(getThemeSetting).borderRadius)
  const getPrimaryColor = computed(() => unref(getThemeSetting).primaryColor)
  const getSuccessColor = computed(() => unref(getThemeSetting).successColor)
  const getWarningColor = computed(() => unref(getThemeSetting).warningColor)
  const getErrorColor = computed(() => unref(getThemeSetting).errorColor)
  const getInfoColor = computed(() => unref(getThemeSetting).infoColor)
  const getThemeColors = computed(() => {
    return {
      colorPrimary: getPrimaryColor.value,
      colorSuccess: getSuccessColor.value,
      colorWarning: getWarningColor.value,
      colorError: getErrorColor.value,
      colorInfo: getInfoColor.value,
    }
  })
  const getToken = computed(() => {
    return {
      ...getThemeColors.value,
      borderRadius: getBorderRadius.value,
    }
  })

  return {
    setThemeSetting,

    getTheme,
    getThemeType,
    getToken,
    getThemeColors,
    getBorderRadius,
    getPrimaryColor,
    getSuccessColor,
    getWarningColor,
    getErrorColor,
    getInfoColor,
  }
}
