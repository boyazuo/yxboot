import type { LocaleType } from './types';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const localeMap: Record<LocaleType, Record<string, unknown>> = {
  'zh-CN': zhCN as Record<string, unknown>,
  'en-US': enUS as Record<string, unknown>,
};

/**
 * 加载语言包
 * @param locale 语言
 * @returns 消息对象
 */
export function loadLocaleMessages(
  locale: LocaleType,
): Record<string, unknown> {
  return localeMap[locale] ?? {};
}
