/**
 * 组合式函数 - useApp
 */
import { computed } from 'vue';
import { useAppStore } from '../runtime/store/app';

export function useApp() {
  const appStore = useAppStore();

  return {
    collapsed: computed(() => appStore.collapsed),
    mobile: computed(() => appStore.mobile),
    locale: computed(() => appStore.locale),
    theme: computed(() => appStore.theme),
    layout: computed(() => appStore.layout),
    toggleCollapsed: appStore.toggleCollapsed,
    setCollapsed: appStore.setCollapsed,
    setMobile: appStore.setMobile,
    setLocale: appStore.setLocale,
    setTheme: appStore.setTheme,
    setLayout: appStore.setLayout,
  };
}
