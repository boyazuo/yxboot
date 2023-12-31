import { http } from '@/utils/http/axios'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  list = '/sys/log/list'
}

export const listOptionLog = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
