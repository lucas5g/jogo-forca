import { ArrowRight, Check, Feather, Heart, Keyboard, Sparkles, Trophy } from 'lucide-react';
import { categories, difficulties } from '../data/words';
import CategoryIcon from '../components/CategoryIcon';
import HangmanDrawing from '../components/HangmanDrawing';
import type { Preferences } from '../types/game';

export default function Home({ preferences, onChange, onPlay }: { preferences: Preferences; onChange: (value: Preferences) => void; onPlay: () => void }) {
  return <>
    <section className="hero" aria-labelledby="home-title">
      <span className="eyebrow"><span className="tiny-dot" /> UM CLÁSSICO QUE NUNCA PERDE A GRAÇA</span>
      <h1 id="home-title">Entre letras, encontre<br />a <em>diversão.</em><svg viewBox="0 0 155 14" aria-hidden="true"><path d="M3 10Q75-2 151 6M15 13Q85 4 141 11" /></svg></h1>
      <p>Um pouco de intuição. Uma pitada de vocabulário.<br className="desktop-break" /> Escolha seu desafio e descubra a palavra.</p>
    </section>

    <section className="setup-panel" aria-label="Configure sua partida">
      <div className="setup-controls">
        <fieldset className="category-fieldset">
          <legend><span className="step-number">01</span> Qual é a sua vibe?<span className="legend-hint">Escolha uma categoria</span></legend>
          <div className="category-grid">
            {categories.map(category => <button type="button" key={category.id} className={`category-card ${preferences.category === category.id ? 'selected' : ''}`}
              aria-pressed={preferences.category === category.id} onClick={() => onChange({ ...preferences, category: category.id })}>
              <span className={`category-icon ${category.color}`}><CategoryIcon category={category.id} /></span>
              <span className="category-text"><strong>{category.name}</strong><small>{category.description}</small></span>
              {preferences.category === category.id && <Check className="selection-check" size={15} aria-hidden="true" />}
            </button>)}
          </div>
        </fieldset>

        <fieldset className="difficulty-fieldset">
          <legend><span className="step-number">02</span> No seu ritmo<span className="legend-hint">Escolha a dificuldade</span></legend>
          <div className="difficulty-options">
            {difficulties.map((difficulty, index) => <button type="button" key={difficulty.id} aria-pressed={preferences.difficulty === difficulty.id}
              className={`difficulty-button ${preferences.difficulty === difficulty.id ? 'selected' : ''}`} onClick={() => onChange({ ...preferences, difficulty: difficulty.id })}>
              <span className="difficulty-name"><span className="difficulty-bars" aria-hidden="true">{[0, 1, 2].map(bar => <i key={bar} className={bar <= index ? 'bar-active' : ''} />)}</span>{difficulty.name}</span>
              <small>{difficulty.description}</small>
            </button>)}
          </div>
        </fieldset>
        <button type="button" className="primary-button play-button" onClick={onPlay}>Vamos jogar <ArrowRight size={19} /></button>
        <span className="no-signup"><Feather size={13} /> Sem cadastro. Sem pressa. Só mais uma partida.</span>
      </div>

      <aside className="preview-panel" aria-label="Prévia do jogo">
        <div className="preview-heading"><Sparkles size={13} /><span>AQUECENDO OS NEURÔNIOS</span></div>
        <div className="preview-art"><span className="floating-tile tile-a" aria-hidden="true">A</span><HangmanDrawing preview /><span className="floating-tile tile-question" aria-hidden="true">?</span><span className="handwritten" aria-hidden="true">você consegue!<svg viewBox="0 0 50 32"><path d="M3 3Q10 24 43 23m-8-7 9 7-10 5" /></svg></span></div>
        <div className="preview-word" aria-hidden="true">{'FORCA'.split('').map((letter, index) => <span key={letter} className={index === 1 || index === 3 ? 'empty-letter' : ''}>{index === 1 || index === 3 ? '' : letter}</span>)}</div>
        <h2>Uma letra pode<br />mudar o jogo.</h2>
        <p>Você tem 6 chances.<br />E um mundo de palavras para descobrir.</p>
        <div className="preview-footer"><span className="tiny-dot" /> A curiosidade é seu melhor palpite.</div>
      </aside>
    </section>

    <section className="features" aria-label="Como funciona">
      <div className="feature"><span className="feature-icon"><Keyboard size={21} /></span><div><h2>Do seu jeito</h2><p>Use o teclado ou toque nas letras.</p></div></div>
      <div className="feature"><span className="feature-icon"><Heart size={21} /></span><div><h2>6 chances de acertar</h2><p>Cada tentativa é uma nova pista.</p></div></div>
      <div className="feature"><span className="feature-icon"><Trophy size={21} /></span><div><h2>Um desafio que vale pontos</h2><p>Menos erros, mais motivos para celebrar.</p></div></div>
    </section>
  </>;
}
