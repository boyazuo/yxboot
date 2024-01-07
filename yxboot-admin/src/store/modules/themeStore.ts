import { ThemeEnum } from '@/enums'
import { store } from '@/store'
import { AliasToken } from 'ant-design-vue/es/theme/internal'
import { defineStore } from 'pinia'

interface ThemeStoreState {
  theme: ThemeEnum
  headerTheme: ThemeEnum
  siderTheme: ThemeEnum
  token: Partial<AliasToken>
}

export const useThemeStore = defineStore({
  id: 'themeStore',
  state: (): ThemeStoreState => ({
    theme: ThemeEnum.LIGHT,
    headerTheme: ThemeEnum.LIGHT,
    siderTheme: ThemeEnum.DARK,
    token: {
      borderRadius: 4,
      colorPrimary: '#0960bd',
      colorSuccess: '#55D187',
      colorWarning: '#EFBD47',
      colorError: '#ED6F6F',
      colorInfo: '#0960bd'
    }
  }),
  getters: {
    getTheme(state) {
      return state.theme
    },
    getHeaderTheme(state) {
      return state.headerTheme
    },
    getSiderTheme(state) {
      return state.siderTheme
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setHeaderTheme(value: ThemeEnum) {
      this.headerTheme = value
    },
    setSiderTheme(value: ThemeEnum) {
      this.siderTheme = value
    },
    setToken(value: Partial<AliasToken>) {
      this.token = { ...this.token, ...value }
    }
  }
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
