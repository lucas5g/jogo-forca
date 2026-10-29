import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Keyboard, Trophy, X } from 'lucide-react';

export default function HowToPlay({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    element.showModal();
    return () => { element.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="help-dialog" aria-labelledby="help-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="help-content"><button type="button" className="close-button" onClick={onClose} aria-label="Fechar instruções"><X size={22} /></button>
      <span className="eyebrow">É SIMPLES ASSIM</span><h2 id="help-title">Um clássico.<br /><em>Seu próximo desafio.</em></h2>
      <ol className="help-steps"><li><Keyboard /><div><strong>Escolha uma letra</strong><p>Toque no teclado da tela ou use o seu. Todas as ocorrências de uma letra são reveladas juntas, incluindo as acentuadas.</p></div></li><li><Heart /><div><strong>Você tem 6 chances</strong><p>Cada letra incorreta adiciona uma parte ao desenho. Descubra a palavra antes do sexto erro para vencer.</p></div></li><li><Trophy /><div><strong>Cada acerto vale a descoberta</strong><p>Comece com 100 pontos e perca 10 por erro. Ganhe um bônus de 25 no nível médio ou 50 no difícil. Uma derrota vale 0.</p></div></li></ol>
      <button type="button" className="primary-button" onClick={onClose}>Entendi, vamos lá <ArrowRight size={18} /></button>
    </div>
  </dialog>;
}
