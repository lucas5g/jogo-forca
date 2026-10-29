import { difficulties, words } from '../data/words';
import type { GameState, Preferences } from '../types/game';

export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

export function selectWord(preferences: Preferences, previousWord?: string, random = Math.random): string {
  const pool = words[preferences.category][preferences.difficulty];
  const candidates = pool.filter(word => word !== previousWord);
  const available = candidates.length ? candidates : pool;
  return available[Math.min(available.length - 1, Math.max(0, Math.floor(random() * available.length)))];
}

export function createGame(preferences: Preferences, word: string): GameState {
  return { ...preferences, word, guessedLetters: [], errors: 0, maxErrors: 6, status: 'playing', score: 0 };
}

export function potentialScore(game: Pick<GameState, 'difficulty' | 'errors'>): number {
  return 100 - game.errors * 10 + difficulties.find(item => item.id === game.difficulty)!.bonus;
}

export function guessLetter(game: GameState, value: string): GameState {
  const letter = normalize(value);
  if (game.status !== 'playing' || !/^[A-Z]$/.test(letter) || game.guessedLetters.includes(letter)) return game;
  const guessedLetters = [...game.guessedLetters, letter];
  const normalizedWord = normalize(game.word);
  const errors = game.errors + (normalizedWord.includes(letter) ? 0 : 1);
  const won = [...normalizedWord].every(character => guessedLetters.includes(character));
  const status = won ? 'won' : errors >= game.maxErrors ? 'lost' : 'playing';
  return { ...game, guessedLetters, errors, status, score: won ? potentialScore({ ...game, errors }) : 0 };
}
