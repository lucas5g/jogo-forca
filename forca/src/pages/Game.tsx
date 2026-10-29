import { ArrowLeft, Keyboard, RotateCcw, Trophy } from 'lucide-react';
import { categories, difficulties } from '../data/words';
import { potentialScore } from '../lib/game';
import CategoryIcon from '../components/CategoryIcon';
import HangmanDrawing from '../components/HangmanDrawing';
import WordDisplay from '../components/WordDisplay';
import VirtualKeyboard from '../components/VirtualKeyboard';
import GameStatus from '../components/GameStatus';
import GameResult from '../components/GameResult';
import type { GameState } from '../types/game';

export default function Game({ game, onGuess, onPlay, onHome }: { game: GameState; onGuess: (letter: string) => void; onPlay: () => void; onHome: () => void }) {
  const category = categories.find(item => item.id === game.category)!;
  const difficulty = difficulties.find(item => item.id === game.difficulty)!;
  return <section className="game-page" aria-labelledby="game-title">
    <div className="game-navigation"><button type="button" className="text-button" onClick={onHome}><ArrowLeft size={16} /> Voltar ao início</button><span className="game-score"><Trophy size={16} />{game.status === 'playing' ? `Valendo ${potentialScore(game)} pontos` : `${game.score} pontos nesta partida`}</span></div>
    <header className="game-heading"><span className="eyebrow">SIGA A SUA INTUIÇÃO</span><h1 id="game-title">Qual é a <em>palavra?</em></h1><p>Um bom palpite pode estar a uma letra de distância.</p></header>
    <div className={`game-board ${game.status !== 'playing' ? 'game-ended' : ''}`}>
      <aside className="drawing-panel"><div className="category-badge"><CategoryIcon category={category.id} size={17} />{category.name}<span>·</span>{difficulty.name}</div><HangmanDrawing errors={game.errors} /><div className="error-counter"><strong>{game.errors}</strong> de 6 erros</div><div className="drawing-note">Uma letra de cada vez.</div></aside>
      <div className="game-play-area">
        <GameStatus game={game} />
        <div className="word-area"><span className="word-count">{game.word.length} LETRAS · {category.name.toLocaleUpperCase('pt-BR')}</span><WordDisplay game={game} /></div>
        {game.status === 'playing' ? <><VirtualKeyboard game={game} onGuess={onGuess} /><p className="keyboard-hint"><Keyboard size={15} /> Seu teclado também está no jogo. Acentos não fazem diferença.</p><button type="button" className="text-button restart-button" onClick={onPlay}><RotateCcw size={14} /> Reiniciar partida</button></> : <GameResult game={game} onPlay={onPlay} onHome={onHome} />}
      </div>
    </div>
    <p className="game-bottom-note">Todo mundo tem um bom palpite. Qual é o seu?</p>
  </section>;
}
