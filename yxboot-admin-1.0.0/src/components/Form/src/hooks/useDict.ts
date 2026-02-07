import type { BasicResultModel } from '@/api/model/basicModel'
import { http } from '@/utils/http/axios'

export function useDict() {
  enum Api {
    all = '/sys/dict/data/all',
  }

  const api = (params: any) => http.get<BasicResultModel>({ url: Api.all, params })

  return {
    api,
  }
}
