export default function HangmanDrawing({ errors = 0, preview = false }: { errors?: number; preview?: boolean }) {
  return <svg className={`hangman ${preview ? 'hangman-preview' : ''}`} viewBox="0 0 260 280" role="img" aria-label={preview ? 'Ilustração de uma forca com um boneco sorridente' : `Forca: ${errors} de 6 partes desenhadas`}>
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path className="gallows-base" d="M31 248 Q77 244 125 248 M64 245 L65 28 Q65 24 70 24 L177 24 M66 67 L106 25 M177 25 L177 63" />
      {(preview || errors >= 1) && <g className="body-part"><circle cx="177" cy="86" r="23" />{preview && <path strokeWidth="2.5" d="M170 88h.1m14 0h.1m-15 9q8 8 16 0" />}</g>}
      {(preview || errors >= 2) && <path className="body-part" d="M177 110 L177 175" />}
      {(preview || errors >= 3) && <path className="body-part" d="M176 125 L146 148" />}
      {(preview || errors >= 4) && <path className="body-part" d="M178 125 L207 148" />}
      {(preview || errors >= 5) && <path className="body-part" d="M176 174 L151 211" />}
      {(preview || errors >= 6) && <path className="body-part" d="M178 174 L204 211" />}
    </g>
    {preview && <g className="drawing-sparkles" fill="none" stroke="#8e9c62" strokeWidth="2" strokeLinecap="round"><path d="M224 62v12m-6-6h12M109 139v10m-5-5h10M214 207l4 4m-4 0 4-4"/><path d="m115 91 3-5 3 5-3 5z" /></g>}
  </svg>;
}
