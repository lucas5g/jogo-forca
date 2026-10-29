export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'animals' | 'fruits' | 'countries' | 'objects' | 'technology' | 'sports';
export type GameStatus = 'playing' | 'won' | 'lost';

export interface Preferences { category: Category; difficulty: Difficulty }
export interface GameState extends Preferences {
  word: string;
  guessedLetters: string[];
  errors: number;
  maxErrors: number;
  status: GameStatus;
  score: number;
}
