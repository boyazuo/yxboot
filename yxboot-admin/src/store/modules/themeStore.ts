import { store } from '@/store'
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { defineStore } from 'pinia'

interface ThemeStoreState {
  theme: ThemeConfig
}

export const useThemeStore = defineStore({
  id: 'APP_THEME',
  state: (): ThemeStoreState => ({
    theme: {}
  }),
  getters: {
    getTheme(state) {
      return state.theme
    }
  },
  actions: {
    setTheme(value: ThemeConfig) {
      this.theme = value
    }
  }
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
