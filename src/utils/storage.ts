// Safe localStorage wrapper to prevent crashes in private window / restricted browsers

import type { CalculationHistoryItem } from '../types/grade';

const HISTORY_KEY = 'wce_cgpa_calc_history_v1';
const THEME_KEY = 'wce_cgpa_calc_theme_v1';
const MAX_HISTORY_ITEMS = 50;

/**
 * Checks if localStorage is available and functional
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__wce_test_key__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Safely retrieve past calculation history from localStorage
 */
export const getHistory = (): CalculationHistoryItem[] => {
  try {
    if (!isLocalStorageAvailable()) return [];
    const item = window.localStorage.getItem(HISTORY_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to read calculation history from localStorage:', e);
    return [];
  }
};

/**
 * Safely save item to history list in localStorage
 */
export const saveHistoryItem = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>): CalculationHistoryItem[] => {
  try {
    const current = getHistory();
    const newItem: CalculationHistoryItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
    };

    const updated = [newItem, ...current].slice(0, MAX_HISTORY_ITEMS);
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch (e) {
    console.warn('Failed to save calculation history item:', e);
    return getHistory();
  }
};

/**
 * Safely clear all calculation history
 */
export const clearHistory = (): boolean => {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(HISTORY_KEY);
    }
    return true;
  } catch (e) {
    console.warn('Failed to clear calculation history:', e);
    return false;
  }
};

/**
 * Safely retrieve theme preference ('dark' | 'light' | null)
 */
export const getSavedTheme = (): 'dark' | 'light' | null => {
  try {
    if (!isLocalStorageAvailable()) return null;
    const theme = window.localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light') return theme;
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Safely save theme preference
 */
export const saveTheme = (theme: 'dark' | 'light'): void => {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  } catch (e) {
    console.warn('Failed to save theme in localStorage:', e);
  }
};
