import { RetryConfig } from '@/utils/http/axios/retryConfig'
import { AxiosError, AxiosInstance } from 'axios'
/**
 *  请求重试机制
 */

export class AxiosRetry {
  /**
   * 重试
   */
  retry(AxiosInstance: AxiosInstance, error: AxiosError) {
    // @ts-ignore
    const { config } = error.response
    const retryConfig = new RetryConfig(config)
    const { waitTime, count } = retryConfig?.requestOptions?.retryRequest
    retryConfig.__retryCount = retryConfig.__retryCount || 0
    if (retryConfig.__retryCount >= count) {
      return Promise.reject(error)
    }
    retryConfig.__retryCount += 1
    return this.delay(waitTime).then(() => AxiosInstance(retryConfig))
  }

  /**
   * 延迟
   */
  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
