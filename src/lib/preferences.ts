import { categories, difficulties } from '../data/words';
import type { Preferences } from '../types/game';

export const PREFERENCES_KEY = 'forca:preferences:v1';
export const defaultPreferences: Preferences = { category: 'animals', difficulty: 'easy' };

export function readPreferences(): Preferences {
  try {
    const value = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? 'null');
    if (value && categories.some(item => item.id === value.category) && difficulties.some(item => item.id === value.difficulty)) return { category: value.category, difficulty: value.difficulty };
  } catch { /* Storage may be blocked or contain invalid data. */ }
  return defaultPreferences;
}

export function savePreferences(preferences: Preferences) {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); } catch { /* The game also works without storage. */ }
}
