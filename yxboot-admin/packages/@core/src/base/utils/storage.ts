/**
 * 存储工具函数
 */

type StorageType = 'localStorage' | 'sessionStorage';

/**
 * 存储类
 */
class Storage {
  private storage: globalThis.Storage;

  constructor(type: StorageType = 'localStorage') {
    this.storage = type === 'localStorage' ? localStorage : sessionStorage;
  }

  /**
   * 设置存储项
   * @param key 键
   * @param value 值
   * @param expire 过期时间（秒）
   */
  set(key: string, value: any, expire?: number): void {
    const data = {
      value,
      expire: expire ? Date.now() + expire * 1000 : null,
    };
    this.storage.setItem(key, JSON.stringify(data));
  }

  /**
   * 获取存储项
   * @param key 键
   * @returns 值
   */
  get<T = any>(key: string): T | null {
    const item = this.storage.getItem(key);
    if (!item) return null;

    try {
      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        this.remove(key);
        return null;
      }
      return data.value;
    } catch {
      return null;
    }
  }

  /**
   * 移除存储项
   * @param key 键
   */
  remove(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * 清空存储
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * 获取所有键
   * @returns 键列表
   */
  keys(): string[] {
    return Object.keys(this.storage);
  }
}

/** localStorage 实例 */
export const storage = new Storage('localStorage');

/** sessionStorage 实例 */
export const sessionStorage = new Storage('sessionStorage');
