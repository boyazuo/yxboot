import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  all = '/sys/dict/data/all',
  list = '/sys/dict/data/list',
  get = '/sys/dict/data/get',
  save = '/sys/dict/data/save',
  remove = '/sys/dict/data/remove'
}

export const allDictData = (params: any) => http.get<BasicResultModel>({ url: Api.all, params })
export const listDictData = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getDictData = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveDictData = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeDictData = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
