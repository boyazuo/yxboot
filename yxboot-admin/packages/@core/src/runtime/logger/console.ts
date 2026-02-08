import type { LogLevel } from './types';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export function createConsoleLogger(options: {
  level?: LogLevel;
  prefix?: string;
} = {}) {
  const level = options.level ?? 'info';
  const prefix = options.prefix ?? '';
  const minOrder = LEVEL_ORDER[level];

  function log(method: LogLevel, ...args: unknown[]) {
    if (LEVEL_ORDER[method] < minOrder) return;
    const fn = console[method] ?? console.log;
    fn(prefix ? `[${prefix}]` : '', ...args);
  }

  return {
    debug: (...args: unknown[]) => log('debug', ...args),
    info: (...args: unknown[]) => log('info', ...args),
    warn: (...args: unknown[]) => log('warn', ...args),
    error: (...args: unknown[]) => log('error', ...args),
  };
}

export const logger = createConsoleLogger();
