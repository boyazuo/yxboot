import { http } from '@/utils/http/axios'
import qs from 'qs'
import { BasicResultModel } from '../model/basicModel'

enum Api {
  // 代码生成
  list = '/dev/generator/list', // 查询全部数据表接口
  code = '/dev/generator/code', // 根据单表生成代码
  batchCode = '/dev/generator/batchCode', // 根据多表批量生成代码
  previewCode = '/dev/generator/preview', // 模板预览

  // 代码生成模版
  listTemplate = '/dev/generator/template/list',
  getTemplate = '/dev/generator/template/get',
  saveTemplate = '/dev/generator/template/save',
  removeTemplate = '/dev/generator/template/remove',
  checkTemplate = '/dev/generator/template/check' // 模板检查接口
}

// 代码生成
export const listGenerator = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })
export const codeGenerator = (params: any) => http.download({ url: Api.code, params, method: 'GET' })
export const batchCodeGenerator = (params: any) =>
  http.download({
    url: Api.batchCode,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    method: 'GET'
  })
export const previewCodeGenerator = (params: any) => http.get<BasicResultModel>({ url: Api.previewCode, params })

// 代码生成模版
export const listGeneratorTemplate = (params: any) => http.get<BasicResultModel>({ url: Api.listTemplate, params })
export const getGeneratorTemplate = (params: any) => http.get<BasicResultModel>({ url: Api.getTemplate, params })
export const saveGeneratorTemplate = (data: any) => http.post<BasicResultModel>({ url: Api.saveTemplate, data })
export const removeGeneratorTemplate = (params: any) =>
  http.delete<BasicResultModel>({ url: Api.removeTemplate, params })
export const checkGeneratorTemplate = (data: any) => http.post<BasicResultModel>({ url: Api.checkTemplate, data })
