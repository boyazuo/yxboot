import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  list = '/sys/user/list',
  get = '/sys/user/get',
  save = '/sys/user/save',
  remove = '/sys/user/remove',
  reset = '/sys/user/resetPassword',
  change = '/sys/user/changePassword'
}

export const listUser = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getUser = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveUser = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeUser = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
export const resetPassword = (params: any) => http.post<BasicResultModel>({ url: Api.reset, params })
export const changePassword = (params: any) => http.post<BasicResultModel>({ url: Api.change, params })
