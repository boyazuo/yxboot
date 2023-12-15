import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  list = '/sys/menu/list',
  get = '/sys/menu/get',
  save = '/sys/menu/save',
  remove = '/sys/menu/remove',
  all = '/sys/menu/all',
  tree = '/sys/menu/tree'
}

export const listMenu = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getMenu = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveMenu = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeMenu = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
export const allMenu = (params: any) => http.get<BasicResultModel>({ url: Api.all, params })
export const treeMenu = () => http.get<BasicResultModel>({ url: Api.tree })
