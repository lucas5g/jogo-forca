import type { CSSProperties } from 'react';
import { normalize } from '../lib/game';
import type { GameState } from '../types/game';

export default function WordDisplay({ game }: { game: GameState }) {
  const ended = game.status !== 'playing';
  const spoken = [...game.word].map(letter => ended || game.guessedLetters.includes(normalize(letter)) ? letter : 'espaço').join(', ');
  return <div className="word-display" style={{ '--letter-count': game.word.length } as CSSProperties} role="group" aria-label={`Palavra com ${game.word.length} letras: ${spoken}`}>
    {[...game.word].map((letter, index) => {
      const guessed = game.guessedLetters.includes(normalize(letter));
      return <span key={index} aria-hidden="true" className={`letter-slot ${guessed ? 'revealed' : ''} ${ended && !guessed ? 'missed' : ''}`}>{guessed || ended ? letter : ''}</span>;
    })}
  </div>;
}
