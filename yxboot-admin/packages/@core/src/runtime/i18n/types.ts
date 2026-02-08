/**
 * 国际化类型
 */

export type LocaleType = 'zh-CN' | 'en-US';

export interface I18nOptions {
  locale?: LocaleType;
  fallbackLocale?: LocaleType;
  messages?: Record<string, Record<string, unknown>>;
  legacy?: boolean;
}
