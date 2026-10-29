import { ArrowRight, PartyPopper, Sprout } from 'lucide-react';
import type { GameState } from '../types/game';

export default function GameResult({ game, onPlay, onHome }: { game: GameState; onPlay: () => void; onHome: () => void }) {
  const won = game.status === 'won';
  return <section className={`game-result ${won ? 'result-won' : 'result-lost'}`} aria-labelledby="result-title">
    <div className="result-title-row">{won ? <PartyPopper size={26} /> : <Sprout size={26} />}<h2 id="result-title">{won ? 'Mandou muito bem!' : 'A próxima é sua.'}</h2><span className="result-score">{game.score} <small>pontos</small></span></div>
    <p>{won ? 'Cada letra contou. Que tal mais uma descoberta?' : <>A palavra era <strong>{game.word}</strong>. Uma nova palavra espera por você.</>}</p>
    <div className="result-actions"><button type="button" className="primary-button" onClick={onPlay}>Jogar novamente <ArrowRight size={18} /></button><button type="button" className="text-button" onClick={onHome}>Voltar ao início</button></div>
  </section>;
}
