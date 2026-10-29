import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CircleHelp, Heart } from 'lucide-react';
import Home from './pages/Home';
import Game from './pages/Game';
import HowToPlay from './components/HowToPlay';
import { useHangman } from './hooks/useHangman';

export default function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const { preferences, setPreferences, game, start, guess, home } = useHangman(!helpOpen);
  const main = useRef<HTMLElement>(null);
  const screen = game ? 'game' : 'home';
  const status = game?.status;
  useEffect(() => { main.current?.focus({ preventScroll: true }); }, [screen, status]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen]);
  return <div className="app-shell">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header"><div className="header-inner"><button type="button" className="brand" aria-label="Forca, início" onClick={home}><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 36 36"><path d="M8 29V7h18v7M4 29h14"/><circle cx="26" cy="19" r="5"/></svg></span>forca<span className="brand-dot">.</span></button><nav aria-label="Menu principal"><span className="header-tagline">uma letra de cada vez</span><button type="button" className="help-button" onClick={() => setHelpOpen(true)}><CircleHelp size={17} /> Como jogar <ArrowUpRight size={14} /></button></nav></div></header>
    <main id="conteudo" ref={main} tabIndex={-1}>{game ? <Game game={game} onGuess={guess} onPlay={start} onHome={home} /> : <Home preferences={preferences} onChange={setPreferences} onPlay={start} />}</main>
    <footer className="site-footer"><span>Um clássico para desconectar e descobrir.</span><span>Feito para jogar. E jogar de novo. <Heart size={12} /></span></footer>
    {helpOpen && <HowToPlay onClose={() => setHelpOpen(false)} />}
  </div>;
}
