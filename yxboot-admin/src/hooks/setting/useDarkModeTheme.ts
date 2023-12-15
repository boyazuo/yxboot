import { ThemeEnum } from '@/enums/appEnum'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'

export function useDarkModeTheme() {
  const { getDarkMode } = useRootSetting()
  const { darkAlgorithm } = theme
  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK)
  const darkTheme = {
    algorithm: [darkAlgorithm]
  }

  return {
    isDark,
    darkTheme
  }
}
