import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  all = '/sys/dept/all',
  list = '/sys/dept/list',
  get = '/sys/dept/get',
  save = '/sys/dept/save',
  remove = '/sys/dept/remove',
  tree = '/sys/dept/tree'
}

export const allDept = (params: any) => http.get<BasicResultModel>({ url: Api.all, params })
export const listDept = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getDept = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveDept = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeDept = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
export const treeDept = (params: any) => http.get<BasicResultModel>({ url: Api.tree, params })
