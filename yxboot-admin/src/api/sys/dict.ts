import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  list = '/sys/dict/list',
  get = '/sys/dict/get',
  save = '/sys/dict/save',
  remove = '/sys/dict/remove'
}

export const listDict = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getDict = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveDict = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeDict = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
