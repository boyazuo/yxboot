import type { ErrorMessageMode } from '#/axios'
import { message as Message, Modal } from 'ant-design-vue'

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void {
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = msg
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      errMessage = '用户没有权限（令牌、用户名、密码错误）!'
      break
    case 403:
      errMessage = '用户得到授权，但是访问是被禁止的。!'
      break
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误，未找到该资源!'
      break
    case 405:
      errMessage = '网络请求错误，请求方法未允许!'
      break
    case 408:
      errMessage = '网络请求超时'
      break
    case 500:
      errMessage = '服务器错误,请联系管理员!'
      break
    case 501:
      errMessage = '网络未实现'
      break
    case 502:
      errMessage = '网络错误'
      break
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = '网络超时'
      break
    case 505:
      errMessage = 'http版本不支持该请求!'
      break
    default:
      errMessage = msg
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      Modal.error({ title: '错误提示', content: errMessage })
    } else if (errorMessageMode === 'message') {
      Message.error({ content: errMessage, key: `global_error_message_status_${status}` })
    }
  }
}
