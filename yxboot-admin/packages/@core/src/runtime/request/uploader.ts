import type { AxiosRequestConfig } from 'axios';
import type { HttpClient } from './client';

/**
 * 上传参数：至少包含 file
 */
export type UploadData = Record<string, unknown> & { file: Blob | File };

function isUndefined(v: unknown): v is undefined {
  return v === undefined;
}

/**
 * 文件上传器
 */
export class FileUploader {
  constructor(private client: HttpClient) {}

  async upload<T = any>(
    url: string,
    data: UploadData,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (!isUndefined(item)) {
            formData.append(`${key}[${index}]`, item as Blob | string);
          }
        });
      } else {
        formData.append(key, value as Blob | string);
      }
    }

    return this.client.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
  }
}
