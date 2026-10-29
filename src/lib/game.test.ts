import { describe, expect, it } from 'vitest';
import { categories, difficulties, words } from '../data/words';
import { createGame, guessLetter, normalize, selectWord } from './game';
import type { Difficulty, GameState } from '../types/game';

const initial = (word = 'ARARA', difficulty: Difficulty = 'easy') => createGame({ category: 'animals', difficulty }, word);
const guesses = (game: GameState, letters: string) => [...letters].reduce(guessLetter, game);

describe('regras da forca', () => {
  it('inicia com seis chances, sem letras e pontuação zero', () => {
    expect(initial()).toMatchObject({ guessedLetters: [], errors: 0, maxErrors: 6, status: 'playing', score: 0 });
  });
  it('normaliza caixa, acentos e cedilha preservando a palavra original', () => {
    const state = guesses(initial('MAÇÃ'), 'mac');
    expect(state).toMatchObject({ word: 'MAÇÃ', guessedLetters: ['M', 'A', 'C'], status: 'won', errors: 0 });
    expect(normalize('áàâãéêíóôõúüç')).toBe('AAAAEEIOOOUUC');
  });
  it('revela todas as ocorrências sem contar erros', () => {
    const state = guessLetter(initial(), 'a');
    expect(state.errors).toBe(0);
    expect([...normalize(state.word)].filter(letter => state.guessedLetters.includes(letter))).toHaveLength(3);
  });
  it('ignora tentativas repetidas, inclusive acentos e caixa', () => {
    const state = guessLetter(initial(), 'z');
    expect(guessLetter(state, 'Z')).toBe(state);
    const accented = guessLetter(initial(), 'ã');
    expect(guessLetter(accented, 'A')).toBe(accented);
  });
  it('ignora números, palavras e símbolos', () => {
    for (const input of ['1', 'Enter', 'AA', '', '?']) { const state = initial(); expect(guessLetter(state, input)).toBe(state); }
  });
  it('incrementa cada estágio e encerra exatamente no sexto erro', () => {
    let state = initial();
    for (const [index, letter] of [...'BCDEFG'].entries()) {
      state = guessLetter(state, letter);
      expect(state.errors).toBe(index + 1);
      expect(state.status).toBe(index === 5 ? 'lost' : 'playing');
    }
    expect(state.score).toBe(0);
    expect(guessLetter(state, 'A')).toBe(state);
  });
  it.each([['easy', 80], ['medium', 105], ['hard', 130]] as const)('calcula vitória em %s com dois erros', (difficulty, score) => {
    const state = guesses(initial('ARARA', difficulty), 'BCA R'.replaceAll(' ', ''));
    expect(state).toMatchObject({ status: 'won', score, errors: 2 });
    expect(guessLetter(state, 'Z')).toBe(state);
  });
  it('reinicia todas as tentativas, mantendo preferências', () => {
    const previous = guesses(initial('CROCODILO', 'hard'), 'XYZ');
    expect(createGame(previous, 'BORBOLETA')).toMatchObject({ word: 'BORBOLETA', difficulty: 'hard', category: 'animals', errors: 0, guessedLetters: [], status: 'playing' });
  });
});

describe('banco de palavras', () => {
  for (const category of categories) for (const difficulty of difficulties) {
    it(`${category.name} / ${difficulty.name}: palavras válidas e sem repetição imediata`, () => {
      const pool = words[category.id][difficulty.id];
      expect(pool.length).toBeGreaterThanOrEqual(4);
      expect(new Set(pool).size).toBe(pool.length);
      for (const word of pool) {
        expect(normalize(word)).toMatch(/^[A-Z]+$/);
        expect(word.length).toBeGreaterThanOrEqual(difficulty.id === 'easy' ? 3 : difficulty.id === 'medium' ? 6 : 9);
        if (difficulty.id !== 'hard') expect(word.length).toBeLessThanOrEqual(difficulty.id === 'easy' ? 5 : 8);
      }
      const preferences = { category: category.id, difficulty: difficulty.id };
      const first = selectWord(preferences, undefined, () => 0);
      const next = selectWord(preferences, first, () => 0);
      expect(pool).toContain(first);
      expect(pool).toContain(next);
      expect(next).not.toBe(first);
      expect(selectWord(preferences, undefined, () => 0.999)).toBe(pool.at(-1));
    });
  }
});
