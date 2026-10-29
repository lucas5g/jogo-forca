import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultPreferences, PREFERENCES_KEY, readPreferences, savePreferences } from './preferences';

afterEach(() => vi.unstubAllGlobals());

describe('preferências locais', () => {
  it('restaura categoria e dificuldade válidas', () => {
    vi.stubGlobal('localStorage', { getItem: () => JSON.stringify({ category: 'fruits', difficulty: 'hard' }) });
    expect(readPreferences()).toEqual({ category: 'fruits', difficulty: 'hard' });
  });
  it.each(['null', '{corrompido', '{"category":"invalid","difficulty":"easy"}', '{"category":"animals","difficulty":"impossible"}'])('usa padrões para %s', value => {
    vi.stubGlobal('localStorage', { getItem: () => value });
    expect(readPreferences()).toEqual(defaultPreferences);
  });
  it('continua funcionando com armazenamento bloqueado', () => {
    vi.stubGlobal('localStorage', { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } });
    expect(readPreferences()).toEqual(defaultPreferences);
    expect(() => savePreferences(defaultPreferences)).not.toThrow();
  });
  it('persiste apenas as preferências', () => {
    const setItem = vi.fn();
    vi.stubGlobal('localStorage', { setItem });
    savePreferences({ category: 'sports', difficulty: 'medium' });
    expect(setItem).toHaveBeenCalledWith(PREFERENCES_KEY, '{"category":"sports","difficulty":"medium"}');
  });
});
