import { ThemeEnum } from '@/enums'
import { useThemeStore } from '@/store/modules/themeStore'
import { setCssVar } from '@/utils/theme'
import { theme } from 'ant-design-vue'
import { AliasToken } from 'ant-design-vue/es/theme/internal'
import { storeToRefs } from 'pinia'
import { computed, unref } from 'vue'

export const useAppTheme = () => {
  const themeStore = useThemeStore()
  const { setTheme, setHeaderTheme, setSiderTheme, setToken } = themeStore
  const { getTheme, getHeaderTheme, getSiderTheme, getToken } = storeToRefs(themeStore)

  const isDark = computed(() => {
    return unref(getTheme) === ThemeEnum.DARK
  })

  const isSiderDark = computed(() => {
    return unref(getTheme) === ThemeEnum.DARK || unref(getSiderTheme) === ThemeEnum.DARK
  })

  const isHeaderDark = computed(() => {
    return unref(getTheme) === ThemeEnum.DARK || unref(getHeaderTheme) === ThemeEnum.DARK
  })

  const toggleTheme = (dark: boolean) => {
    setTheme(dark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
    // unref(getTheme).algorithm = dark ? theme.darkAlgorithm : theme.defaultAlgorithm
  }

  const toggleSiderTheme = (dark: boolean) => {
    setSiderTheme(dark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
  }

  const toggleHeaderTheme = (dark: boolean) => {
    setHeaderTheme(dark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
  }

  const getThemeConfig = computed(() => {
    return {
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        ...unref(getToken)
      }
    }
  })

  const setThemeColor = (config: Partial<AliasToken>) => {
    setToken(config)
  }

  const primaryColor = computed(() => {
    return getToken.value.colorPrimary
  })

  const infoColor = computed(() => {
    return getToken.value.colorInfo
  })

  const successColor = computed(() => {
    return getToken.value.colorSuccess
  })

  const warningColor = computed(() => {
    return getToken.value.colorWarning
  })

  const errorColor = computed(() => {
    return getToken.value.colorError
  })

  const themeColors = computed(() => {
    return {
      primaryColor: primaryColor.value,
      infoColor: infoColor.value,
      successColor: successColor.value,
      warningColor: warningColor.value,
      errorColor: errorColor.value
    }
  })

  watch(
    themeColors,
    (val) => {
      val.primaryColor && setCssVar('--primary-color', val.primaryColor)
      val.successColor && setCssVar('--success-color', val.successColor)
      val.errorColor && setCssVar('--error-color', val.errorColor)
      val.warningColor && setCssVar('--warning-color', val.warningColor)
    },
    { deep: true }
  )

  return {
    isDark,
    isSiderDark,
    isHeaderDark,

    toggleTheme,
    toggleSiderTheme,
    toggleHeaderTheme,
    setThemeColor,

    getThemeConfig
  }
}
