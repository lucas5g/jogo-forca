import { Heart } from 'lucide-react';
import { normalize } from '../lib/game';
import type { GameState } from '../types/game';

export default function GameStatus({ game }: { game: GameState }) {
  const last = game.guessedLetters.at(-1);
  const feedback = game.status === 'won' ? 'Você descobriu a palavra!' : game.status === 'lost' ? `A palavra era ${game.word}. Vamos tentar outra vez?` :
    last ? normalize(game.word).includes(last) ? `Boa! A letra ${last} está na palavra.` : `A letra ${last} não está na palavra.` : 'Tudo pronto. Escolha sua primeira letra!';
  return <div className="game-status">
    <div className="lives" aria-label={`${6 - game.errors} tentativas restantes`}>
      {Array.from({ length: 6 }, (_, index) => <Heart key={index} size={19} className={index < 6 - game.errors ? 'heart-full' : 'heart-empty'} aria-hidden="true" />)}
      <span>{6 - game.errors} {6 - game.errors === 1 ? 'tentativa restante' : 'tentativas restantes'}</span>
    </div>
    <p className={`guess-feedback ${last && !normalize(game.word).includes(last) ? 'feedback-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
  </div>;
}
