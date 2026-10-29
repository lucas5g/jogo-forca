# Forca — uma letra de cada vez

Jogo da forca em português (Brasil), implementando os requisitos P0 e P1 do PRD. Frontend em React 19, TypeScript e Vite, com Tailwind CSS 4 e desenho em SVG. Funciona sem cadastro, backend ou banco de dados.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

## Validar e gerar produção

```sh
npm test
npm run build
npm run preview
```

`dist/` contém o aplicativo estático e pode ser servido por qualquer hospedagem estática.

## Funcionalidades

- Seis categorias: animais, frutas, países, objetos, tecnologia e esportes.
- Três dificuldades: fácil (3–5 letras), médio (6–8) e difícil (9+).
- Teclado físico e virtual; tratamento de acentos, caixa e cedilha.
- Seis estágios em SVG, vitória, derrota e revelação da palavra original.
- Pontuação: `100 − erros × 10 + bônus` (0/25/50); derrota vale 0.
- Nova partida e reinício com preferências mantidas e sem repetir a palavra anterior.
- Preferências validadas e salvas no `localStorage`, com fallback quando indisponível.
- Layout responsivo, estados textuais, regiões de anúncio, foco visível, navegação por teclado e respeito a movimento reduzido.
- Ajuda com diálogo nativo, foco contido e fechamento por Escape.

## Estrutura

`src/data/words.ts` contém as palavras e metadados. `src/lib/game.ts` implementa regras puras, cobertas por testes Vitest. `src/hooks/useHangman.ts` gerencia estado, teclado e preferências. `src/components/` contém componentes reutilizáveis; `src/pages/` contém configuração e partida.

O campo `.openai/hosting.json` configura a publicação estática via Sites. Não há coleta de métricas ou integração com serviços de terceiros no aplicativo.
