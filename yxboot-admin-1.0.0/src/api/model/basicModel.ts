export interface BasicResultModel<T = any> {
  code: number
  msg: string
  data: T
}
