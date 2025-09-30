import { http } from '@/utils/http/axios'
import type { BasicResultModel } from '../model/basicModel'
import type { LoginParams } from '../model/userModel'

enum Api {
  login = '/auth/login',
  profile = '/auth/profile',
  permissions = '/auth/permissions',
  captcha = '/auth/captcha',
}

export const login = (params: LoginParams) => http.post<BasicResultModel>({ url: Api.login, params })
export const profile = () => http.get<BasicResultModel>({ url: Api.profile })
export const permissions = () => http.get<BasicResultModel>({ url: Api.permissions })
export const captcha = () => http.get<BasicResultModel>({ url: Api.captcha })
