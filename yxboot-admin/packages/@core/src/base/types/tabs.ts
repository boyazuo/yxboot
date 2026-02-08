import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';

/**
 * 标签页定义（扩展 RouteLocationNormalized）
 */
export interface TabDefinition {
  fullPath?: string;
  key?: string;
  meta?: Record<string, unknown>;
  name?: string | symbol | null;
  params?: Record<string, string>;
  path: string;
  query?: Record<string, string | string[]>;
  matched?: Array<{ meta: Record<string, unknown>; name?: string | symbol; path: string }>;
}

/**
 * 从 route 获取 tab 的 key
 */
export function getTabKey(
  tab: RouteLocationNormalized | RouteRecordNormalized | TabDefinition,
): string {
  const route = tab as RouteLocationNormalized & { fullPath?: string; query?: Record<string, unknown> };
  const fullPath = route.fullPath ?? route.path;
  const query = route.query ?? {};
  const pageKey = Array.isArray(query.pageKey) ? query.pageKey[0] : query.pageKey;
  const rawKey = (pageKey as string) ?? fullPath;
  try {
    return decodeURIComponent(rawKey);
  } catch {
    return rawKey;
  }
}
