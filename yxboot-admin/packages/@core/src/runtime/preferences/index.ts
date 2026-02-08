import type { Preferences } from './types';
import { preferencesManager } from './preferences';

export const getPreferences = preferencesManager.getPreferences;
export const updatePreferences = preferencesManager.updatePreferences;
export const resetPreferences = preferencesManager.resetPreferences;
export const clearCache = preferencesManager.clearCache;
export const initPreferences = preferencesManager.initPreferences;

export const preferences: Preferences = getPreferences();

export { preferencesManager };

export * from './constants';
export type * from './types';
export * from './use-preferences';
export { isDarkTheme, updateCSSVariables } from './update-css-variables';
