import type { DeepPartial, Preferences } from './types';

import { markRaw, reactive, readonly, watch } from 'vue';
import { StorageManager } from '../cache/storage';
import { breakpointsTailwind, useBreakpoints, useDebounceFn } from '@vueuse/core';
import { defaultPreferences } from './config';
import { PREFERENCES_LOCALE_KEY, PREFERENCES_STORAGE_KEY, PREFERENCES_THEME_KEY } from './constants';
import { updateCSSVariables } from './update-css-variables';

/** 深度合并：仅合并纯对象，其余直接覆盖 */
function deepMerge<T extends object>(target: T, ...sources: (Partial<T> | null | undefined)[]): T {
  const result = { ...target } as T;
  for (const src of sources) {
    if (!src || typeof src !== 'object') continue;
    for (const key of Object.keys(src) as (keyof T)[]) {
      const v = (src as T)[key];
      const existing = (result as Record<string, unknown>)[key as string];
      if (
        v != null &&
        typeof v === 'object' &&
        !Array.isArray(v) &&
        existing != null &&
        typeof existing === 'object' &&
        !Array.isArray(existing)
      ) {
        (result as Record<string, unknown>)[key as string] = deepMerge(
          existing as object,
          v as object,
        );
      } else if (v !== undefined) {
        (result as Record<string, unknown>)[key as string] = v;
      }
    }
  }
  return result;
}

function isMacOs(): boolean {
  return typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

class PreferenceManager {
  private cache: StorageManager;
  private debouncedSave: (preference: Preferences) => void;
  private initialPreferences: Preferences = defaultPreferences;
  private isInitialized = false;
  private state: Preferences;

  constructor() {
    this.cache = new StorageManager();
    this.state = reactive<Preferences>({ ...defaultPreferences });
    this.debouncedSave = useDebounceFn((preference) => this.saveToCache(preference), 150);
  }

  clearCache = (): void => {
    this.cache.removeItem(PREFERENCES_STORAGE_KEY);
    this.cache.removeItem(PREFERENCES_LOCALE_KEY);
    this.cache.removeItem(PREFERENCES_THEME_KEY);
  };

  getInitialPreferences = (): Preferences => {
    return this.initialPreferences;
  };

  getPreferences = (): Readonly<Preferences> => {
    return readonly(this.state);
  };

  initPreferences = (options: { namespace: string; overrides?: DeepPartial<Preferences> }): void => {
    if (this.isInitialized) return;

    const { namespace, overrides } = options;
    this.cache = new StorageManager({ prefix: namespace });
    this.initialPreferences = deepMerge(
      { ...defaultPreferences },
      (overrides ?? {}) as Partial<Preferences>,
    ) as Preferences;
    const cached = this.loadFromCache() ?? {};
    const merged: Preferences = deepMerge({ ...this.initialPreferences }, cached) as Preferences;
    Object.assign(this.state, merged);
    this.handleUpdates(merged);
    this.setupWatcher();
    document.documentElement.dataset.platform = isMacOs() ? 'macOs' : 'window';
    this.isInitialized = true;
  };

  resetPreferences = (): void => {
    Object.assign(this.state, this.initialPreferences);
    this.saveToCache(this.state);
    this.handleUpdates(this.state);
  };

  updatePreferences = (updates: DeepPartial<Preferences>): void => {
    const merged = deepMerge({}, markRaw(this.state) as object, updates);
    Object.assign(this.state, merged);
    this.handleUpdates(updates);
    this.debouncedSave(this.state);
  };

  private handleUpdates(updates: Preferences): void;
  private handleUpdates(updates: DeepPartial<Preferences>): void;
  private handleUpdates(updates: DeepPartial<Preferences> | Preferences): void {
    const u = updates as Partial<Preferences>;
    const { theme, app } = u;
    if (theme && (Object.keys(theme).length > 0 || Reflect.has(theme, 'fontSize'))) {
      updateCSSVariables(this.state);
    }
    if (app && (Reflect.has(app, 'colorGrayMode') || Reflect.has(app, 'colorWeakMode'))) {
      const { colorGrayMode, colorWeakMode } = this.state.app;
      document.documentElement.classList.toggle('invert-mode', colorWeakMode);
      document.documentElement.classList.toggle('grayscale-mode', colorGrayMode);
    }
  }

  private loadFromCache(): Preferences | null {
    return this.cache.getItem<Preferences>(PREFERENCES_STORAGE_KEY);
  }

  private saveToCache(preference: Preferences): void {
    this.cache.setItem(PREFERENCES_STORAGE_KEY, preference);
    this.cache.setItem(PREFERENCES_LOCALE_KEY, preference.app.locale);
    this.cache.setItem(PREFERENCES_THEME_KEY, preference.theme.mode);
  }

  private setupWatcher(): void {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller('md');
    watch(
      () => isMobile.value,
      (val) => this.updatePreferences({ app: { isMobile: val } }),
      { immediate: true },
    );
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
      if (this.state.theme.mode === 'auto') {
        this.updatePreferences({ theme: { mode: isDark ? 'dark' : 'light' } });
        this.updatePreferences({ theme: { mode: 'auto' } });
      }
    });
  }
}

export const preferencesManager = new PreferenceManager();
export { PreferenceManager };
