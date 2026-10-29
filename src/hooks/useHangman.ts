import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { createGame, guessLetter, selectWord } from '../lib/game';
import { readPreferences, savePreferences } from '../lib/preferences';
import type { GameState, Preferences } from '../types/game';

type Action = { type: 'start'; game: GameState } | { type: 'guess'; letter: string } | { type: 'home' };
function reducer(state: GameState | null, action: Action): GameState | null {
  if (action.type === 'start') return action.game;
  if (action.type === 'home') return null;
  return state ? guessLetter(state, action.letter) : state;
}

export function useHangman(keyboardEnabled: boolean) {
  const [preferences, setPreferences] = useState<Preferences>(readPreferences);
  const [game, dispatch] = useReducer(reducer, null);
  const previousWord = useRef<string | undefined>(undefined);
  useEffect(() => savePreferences(preferences), [preferences]);
  const guess = useCallback((letter: string) => dispatch({ type: 'guess', letter }), []);
  useEffect(() => {
    if (!keyboardEnabled || game?.status !== 'playing') return;
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing ||
          target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))) return;
      if (/^[a-záàâãéêíóôõúüç]$/i.test(event.key)) {
        event.preventDefault();
        guess(event.key);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game?.status, guess, keyboardEnabled]);

  function start() {
    const word = selectWord(preferences, previousWord.current);
    previousWord.current = word;
    dispatch({ type: 'start', game: createGame(preferences, word) });
  }
  return { preferences, setPreferences, game, start, guess, home: () => dispatch({ type: 'home' }) };
}
