/**
 * 简单内存缓存（无过期时永久保留）
 */
const cache = new Map<string, { value: unknown; expiry?: number }>();

export function getMemoryItem<T>(key: string): T | undefined {
  const item = cache.get(key);
  if (!item) return undefined;
  if (item.expiry && Date.now() > item.expiry) {
    cache.delete(key);
    return undefined;
  }
  return item.value as T;
}

export function setMemoryItem<T>(key: string, value: T, ttl?: number): void {
  cache.set(key, {
    value,
    expiry: ttl ? Date.now() + ttl : undefined,
  });
}

export function removeMemoryItem(key: string): void {
  cache.delete(key);
}

export function clearMemory(): void {
  cache.clear();
}
