import { http } from '@/utils/http/axios'
import type { BasicResultModel } from '../model/basicModel'

enum Api {
  list = '/sys/file/list',
  get = '/sys/file/get',
  save = '/sys/file/save',
  remove = '/sys/file/remove',
  getByPath = '/sys/file/getByPath',
  upload = '/sys/file/upload',
}

export const listFile = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const getFile = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })
export const saveFile = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })
export const removeFile = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })
export const getByPathFile = (params: any) => http.get<BasicResultModel>({ url: Api.getByPath, params })
export const uploadFile = (params: any) => http.uploadFile({ url: Api.upload }, params)
