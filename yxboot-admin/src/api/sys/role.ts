import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  all = '/sys/role/all',
  list = '/sys/role/list',
  get = '/sys/role/get',
  save = '/sys/role/save',
  remove = '/sys/role/remove',
  saveMenus = '/sys/role/saveMenus'
}

export const allRole = () => http.get<BasicResultModel>({ url: Api.all })
export const listRole = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getRole = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveRole = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeRole = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
export const saveMenusRole = (data: any) => http.post<BasicResultModel>({ url: Api.saveMenus, data })
