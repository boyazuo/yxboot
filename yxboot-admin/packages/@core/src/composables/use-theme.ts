import { computed } from 'vue';
import { useAppStore } from '../runtime/store/app';
import { presetThemes } from '../runtime/theme';
import type { ThemeMode } from '../base/types/app';

export function useTheme() {
  const appStore = useAppStore();

  const theme = computed(() => appStore.theme);
  const setTheme = (value: ThemeMode) => appStore.setTheme(value);

  function setPrimaryColor(color: string) {
    // 可扩展：写入 CSS 变量或持久化，此处仅预留
    document.documentElement.style.setProperty('--color-primary', color);
  }

  return {
    theme,
    setTheme,
    setPrimaryColor,
    presetThemes,
  };
}
