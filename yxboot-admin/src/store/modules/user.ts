import type { UserInfo } from '#/store'
import { LoginParams } from '@/api/model/userModel'
import { login } from '@/api/sys/auth'
import { ACCESS_TOKEN, CURRENT_USER } from '@/enums/cacheEnum'
import { ResultEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { store } from '@/store'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'

export interface UserState {
  user: Nullable<UserInfo>
  token?: string
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    user: null,
    token: ''
  }),
  getters: {
    getUser(): UserInfo {
      return this.user || storage.get(CURRENT_USER, {})
    },
    getToken(): string {
      return this.token || storage.get(ACCESS_TOKEN, '')
    }
  },
  actions: {
    setUser(user: UserInfo | null) {
      this.user = user
      storage.set(CURRENT_USER, this.user)
    },
    setToken(token: string | undefined) {
      this.token = token ? token : '' // for null or undefined value
      storage.set(ACCESS_TOKEN, this.token)
    },
    resetState() {
      this.user = null
      this.token = ''
    },
    // 登录
    async login(userInfo: LoginParams) {
      try {
        const response = await login(userInfo)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000
          storage.set(ACCESS_TOKEN, data.token, ex)
          storage.set(CURRENT_USER, data, ex)
          this.setToken(data.token)
          this.setUser(data)
        }
        return Promise.resolve(response)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    // 登出
    async logout(goLogin = false) {
      this.setToken(undefined)
      this.setUser(null)
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)

      goLogin && router.push(PageEnum.BASE_LOGIN)
    },
    //修改头像
    async setAvatar(avatar: any) {
      const user = storage.get(CURRENT_USER, {})
      user.avatar = avatar
      storage.set(CURRENT_USER, user)
      this.setUser(user)
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
