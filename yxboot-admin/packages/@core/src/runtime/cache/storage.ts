import type { StorageManagerOptions } from './types';

interface StorageItem<T> {
  expiry?: number;
  value: T;
}

/**
 * 带前缀与过期时间的 Storage 封装
 */
export class StorageManager {
  private prefix: string;
  private storage: globalThis.Storage;

  constructor(options: StorageManagerOptions = {}) {
    this.prefix = options.prefix ?? '';
    this.storage =
      options.storageType === 'sessionStorage'
        ? window.sessionStorage
        : window.localStorage;
  }

  private getFullKey(key: string): string {
    return this.prefix ? `${this.prefix}-${key}` : key;
  }

  getItem<T>(key: string, defaultValue: T | null = null): T | null {
    const fullKey = this.getFullKey(key);
    const raw = this.storage.getItem(fullKey);
    if (!raw) return defaultValue;
    try {
      const item: StorageItem<T> = JSON.parse(raw);
      if (item.expiry && Date.now() > item.expiry) {
        this.storage.removeItem(fullKey);
        return defaultValue;
      }
      return item.value;
    } catch {
      this.storage.removeItem(fullKey);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T, ttl?: number): void {
    const fullKey = this.getFullKey(key);
    const item: StorageItem<T> = {
      value,
      expiry: ttl ? Date.now() + ttl : undefined,
    };
    this.storage.setItem(fullKey, JSON.stringify(item));
  }

  removeItem(key: string): void {
    this.storage.removeItem(this.getFullKey(key));
  }

  clear(): void {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const k = this.storage.key(i);
      if (k && (!this.prefix || k.startsWith(this.prefix))) keys.push(k);
    }
    keys.forEach((k) => this.storage.removeItem(k));
  }
}
