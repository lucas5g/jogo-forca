import { normalize } from '../lib/game';
import type { GameState } from '../types/game';

export default function VirtualKeyboard({ game, onGuess }: { game: GameState; onGuess: (letter: string) => void }) {
  return <div className="virtual-keyboard" role="group" aria-label="Escolha uma letra">
    {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map(row => <div className="keyboard-row" key={row}>
      {[...row].map(letter => {
        const used = game.guessedLetters.includes(letter);
        const correct = normalize(game.word).includes(letter);
        return <button type="button" className={`keyboard-key ${used ? correct ? 'key-correct' : 'key-wrong' : ''}`} key={letter}
          disabled={used || game.status !== 'playing'} aria-label={`${letter}${used ? correct ? ', acerto' : ', erro' : ''}`} onClick={() => onGuess(letter)}>{letter}</button>;
      })}
    </div>)}
  </div>;
}
