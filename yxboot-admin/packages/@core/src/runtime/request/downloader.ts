import type { HttpClient } from './client';

/**
 * 下载文件
 * @param client HTTP 客户端
 * @param url 下载地址
 * @param config 可选配置（如 responseType: 'blob'）
 * @returns Blob 或 原始响应
 */
export async function downloadFile(
  client: HttpClient,
  url: string,
  config?: { responseType?: 'blob'; method?: string; [k: string]: any },
): Promise<Blob> {
  const instance = client.getInstance();
  const res = await instance.request({
    url,
    method: (config?.method || 'GET').toUpperCase(),
    responseType: 'blob',
    ...config,
  });
  return res.data as Blob;
}
