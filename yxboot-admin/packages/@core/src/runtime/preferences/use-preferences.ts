import { computed } from 'vue';
import { preferencesManager } from './preferences';
import { isDarkTheme } from './update-css-variables';

export function usePreferences() {
  const preferences = preferencesManager.getPreferences();
  const initialPreferences = preferencesManager.getInitialPreferences();

  const appPreferences = computed(() => preferences.app);
  const isDark = computed(() => isDarkTheme(preferences.theme.mode));
  const locale = computed(() => preferences.app.locale);
  const isMobile = computed(() => appPreferences.value.isMobile);
  const theme = computed(() => (isDark.value ? 'dark' : 'light'));
  const layout = computed(() =>
    isMobile.value ? 'sidebar' : (appPreferences.value.layout as 'sidebar' | 'mix' | 'top'),
  );
  const isShowHeaderNav = computed(() => preferences.header.enable);
  const isFullContent = computed(() => preferences.app.layout === 'full-content');
  const isSideNav = computed(() => preferences.app.layout === 'sidebar');
  const sidebarCollapsed = computed(() => preferences.sidebar.collapsed);
  const keepAlive = computed(
    () => preferences.tabbar.enable && preferences.tabbar.keepAlive,
  );
  const contentIsMaximize = computed(() => {
    const headerIsHidden = preferences.header.hidden;
    const sidebarIsHidden = preferences.sidebar.hidden;
    return headerIsHidden && sidebarIsHidden && !isFullContent.value;
  });

  /** 偏好设置按钮是否固定、是否在 header */
  const preferencesButtonPosition = computed(() => {
    const { enablePreferences, preferencesButtonPosition: pos } = preferences.app;
    if (!enablePreferences) return { fixed: false, header: false };
    const { header, sidebar } = preferences;
    const contentIsMax = header.hidden && sidebar.hidden;
    const isHeaderPosition = pos === 'header';
    if (pos !== 'auto') {
      return { fixed: pos === 'fixed', header: isHeaderPosition };
    }
    const fixed =
      contentIsMax ||
      isFullContent.value ||
      isMobile.value ||
      !isShowHeaderNav.value;
    return { fixed, header: !fixed };
  });

  return {
    preferences,
    initialPreferences,
    appPreferences,
    isDark,
    locale,
    isMobile,
    theme,
    layout,
    isShowHeaderNav,
    isFullContent,
    isSideNav,
    sidebarCollapsed,
    keepAlive,
    contentIsMaximize,
    preferencesButtonPosition,
    getPreferences: () => preferencesManager.getPreferences(),
    updatePreferences: preferencesManager.updatePreferences,
    resetPreferences: preferencesManager.resetPreferences,
  };
}

export type UsePreferencesReturn = ReturnType<typeof usePreferences>;
