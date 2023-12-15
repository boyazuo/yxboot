import { store } from '@/store'
import { defineStore } from 'pinia'

import { SysMenu } from '@/api/model/sysModel'

export interface PermissionState {
  origin: Array<SysMenu>
  menus: Array<SysMenu>
  menusCode: Array<SysMenu>
  loaded: boolean
}
export const usePermissionStore = defineStore({
  id: 'permissionStore',
  state: (): PermissionState => ({
    origin: [],
    menus: [],
    menusCode: [],
    loaded: false
  }),
  getters: {
    getMenus(): Array<SysMenu> {
      return this.menus
    },
    getMenusCode(): Array<SysMenu> {
      return this.menusCode
    },
    isLoaded(): boolean {
      return this.loaded
    }
  },
  actions: {
    setMenus(menus: Array<SysMenu>) {
      this.menus = menus
    },
    setMenusCode(menusCode: Array<SysMenu>) {
      this.menusCode = menusCode
    },
    setLoaded(loaded: boolean) {
      this.loaded = loaded
    },
    resetState(): void {
      this.origin = []
      this.menus = []
      this.loaded = false
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
