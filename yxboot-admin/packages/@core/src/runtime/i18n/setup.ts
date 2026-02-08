import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import type { I18nOptions, LocaleType } from './types';
import { loadLocaleMessages } from './loader';

const defaultOptions: I18nOptions = {
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  legacy: false,
};

/**
 * 初始化 i18n 并挂载到 app
 */
export function setupI18n(
  app: App,
  options: I18nOptions = {},
): ReturnType<typeof createI18n> {
  const opts = { ...defaultOptions, ...options };
  const messages: Record<string, any> = { ...(opts.messages ?? {}) };
  if (!Object.keys(messages).length && opts.locale) {
    const loaded = loadLocaleMessages(opts.locale as LocaleType);
    if (Object.keys(loaded).length) {
      messages[opts.locale!] = loaded;
    }
  }

  const i18n = createI18n({
    legacy: opts.legacy ?? false,
    locale: opts.locale ?? 'zh-CN',
    fallbackLocale: opts.fallbackLocale ?? 'en-US',
    messages,
  }) as ReturnType<typeof createI18n>;

  app.use(i18n);
  return i18n;
}
