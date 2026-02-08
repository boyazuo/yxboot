import type { Preferences } from './types';

/**
 * 根据 theme.mode 判断是否为暗色
 */
export function isDarkTheme(mode: string): boolean {
  if (mode === 'dark') return true;
  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

/**
 * 将 HSL 字符串转为 CSS 可用的数值部分（如 "212 100% 45%"）
 */
function toHslValues(hsl: string): string {
  const m = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)/);
  if (m) return `${m[1]} ${m[2]}% ${m[3]}%`;
  return hsl;
}

/**
 * 更新主题相关 CSS 变量
 */
export function updateCSSVariables(preferences: Preferences): void {
  const root = document.documentElement;
  if (!root) return;

  const theme = preferences?.theme ?? {};

  if (Reflect.has(theme, 'mode')) {
    const dark = isDarkTheme(theme.mode);
    root.classList.toggle('dark', dark);
  }

  if (Reflect.has(theme, 'radius')) {
    root.style.setProperty('--radius', `${theme.radius}rem`);
  }

  if (Reflect.has(theme, 'fontSize')) {
    const fontSize = theme.fontSize;
    root.style.setProperty('--font-size-base', `${fontSize}px`);
    root.style.setProperty(
      '--menu-font-size',
      `calc(${fontSize}px * 0.875)`,
    );
  }

  // 主题色写入 CSS 变量（与 variables.css 中 --primary 等对齐）
  if (theme.colorPrimary) {
    root.style.setProperty('--primary', toHslValues(theme.colorPrimary));
  }
  if (theme.colorSuccess) {
    root.style.setProperty('--success', toHslValues(theme.colorSuccess));
  }
  if (theme.colorWarning) {
    root.style.setProperty('--warning', toHslValues(theme.colorWarning));
  }
  if (theme.colorDestructive) {
    root.style.setProperty('--destructive', toHslValues(theme.colorDestructive));
  }
}
