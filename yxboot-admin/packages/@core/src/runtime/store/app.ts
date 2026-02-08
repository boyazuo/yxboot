/**
 * Pinia Store 模块
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Locale, LayoutMode, ThemeMode } from '../../base/types/app';
import { storage } from '../../base/utils/storage';
import { CACHE_KEYS } from '../../base/constants';

/**
 * 应用 Store
 */
export const useAppStore = defineStore('app', () => {
  // 状态
  const collapsed = ref<boolean>(storage.get(CACHE_KEYS.SIDEBAR_COLLAPSED) ?? false);
  const mobile = ref<boolean>(false);
  const locale = ref<Locale>(storage.get(CACHE_KEYS.LOCALE) ?? 'zh-CN');
  const theme = ref<ThemeMode>(storage.get(CACHE_KEYS.THEME) ?? 'light');
  const layout = ref<LayoutMode>('sidebar');

  // 切换侧边栏折叠状态
  function toggleCollapsed() {
    collapsed.value = !collapsed.value;
    storage.set(CACHE_KEYS.SIDEBAR_COLLAPSED, collapsed.value);
  }

  // 设置侧边栏折叠状态
  function setCollapsed(value: boolean) {
    collapsed.value = value;
    storage.set(CACHE_KEYS.SIDEBAR_COLLAPSED, value);
  }

  // 设置移动端标识
  function setMobile(value: boolean) {
    mobile.value = value;
  }

  // 设置语言
  function setLocale(value: Locale) {
    locale.value = value;
    storage.set(CACHE_KEYS.LOCALE, value);
  }

  // 设置主题
  function setTheme(value: ThemeMode) {
    theme.value = value;
    storage.set(CACHE_KEYS.THEME, value);
  }

  // 设置布局模式
  function setLayout(value: LayoutMode) {
    layout.value = value;
  }

  return {
    collapsed,
    mobile,
    locale,
    theme,
    layout,
    toggleCollapsed,
    setCollapsed,
    setMobile,
    setLocale,
    setTheme,
    setLayout,
  };
});
