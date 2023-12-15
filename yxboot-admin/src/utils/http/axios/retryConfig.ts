import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export class RetryConfig implements AxiosRequestConfig {
  __retryCount: number
  requestOptions: { retryRequest: { waitTime: number; count: number } }
  constructor(config: InternalAxiosRequestConfig) {
    Object.keys(config).forEach((key: string) => {
      this[key] = config[key]
      console.log(key)
    })
  }
}
