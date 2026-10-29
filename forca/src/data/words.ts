import type { Category, Difficulty } from '../types/game';

export const categories: { id: Category; name: string; description: string; color: string }[] = [
  { id: 'animals', name: 'Animais', description: 'Do quintal à savana', color: 'peach' },
  { id: 'fruits', name: 'Frutas', description: 'Uma dose de frescor', color: 'rose' },
  { id: 'countries', name: 'Países', description: 'Uma volta ao mundo', color: 'blue' },
  { id: 'objects', name: 'Objetos', description: 'Por toda parte', color: 'yellow' },
  { id: 'technology', name: 'Tecnologia', description: 'Conecte as ideias', color: 'purple' },
  { id: 'sports', name: 'Esportes', description: 'Entre no jogo', color: 'mint' },
];

export const difficulties: { id: Difficulty; name: string; description: string; bonus: number }[] = [
  { id: 'easy', name: 'Fácil', description: '3–5 letras', bonus: 0 },
  { id: 'medium', name: 'Médio', description: '6–8 letras', bonus: 25 },
  { id: 'hard', name: 'Difícil', description: '9+ letras', bonus: 50 },
];

export const words: Record<Category, Record<Difficulty, string[]>> = {
  animals: {
    easy: ['GATO', 'PATO', 'LEÃO', 'ZEBRA', 'TIGRE', 'COBRA', 'URSO', 'ARARA'],
    medium: ['GIRAFA', 'MACACO', 'COELHO', 'BALEIA', 'TUCANO', 'CAVALO', 'GOLFINHO', 'PANTERA'],
    hard: ['CROCODILO', 'RINOCERONTE', 'HIPOPÓTAMO', 'BORBOLETA', 'ORNITORRINCO', 'ESCORPIÃO', 'TARTARUGA'],
  },
  fruits: {
    easy: ['UVA', 'MAÇÃ', 'PERA', 'KIWI', 'COCO', 'CAJU', 'AMORA', 'MANGA'],
    medium: ['BANANA', 'LARANJA', 'MORANGO', 'ABACAXI', 'MELANCIA', 'ACEROLA', 'PITANGA', 'GOIABA'],
    hard: ['CARAMBOLA', 'TANGERINA', 'FRAMBOESA', 'JABUTICABA', 'SERIGUELA'],
  },
  countries: {
    easy: ['CHILE', 'PERU', 'CUBA', 'CHINA', 'JAPÃO', 'ÍNDIA', 'IRÃ', 'SÍRIA', 'EGITO'],
    medium: ['BRASIL', 'FRANÇA', 'CANADÁ', 'MÉXICO', 'ESPANHA', 'PORTUGAL', 'ALEMANHA', 'ITÁLIA'],
    hard: ['ARGENTINA', 'AUSTRÁLIA', 'NICARÁGUA', 'GUATEMALA', 'LUXEMBURGO', 'MOÇAMBIQUE'],
  },
  objects: {
    easy: ['MESA', 'LÁPIS', 'LIVRO', 'COPO', 'BOLA', 'CHAVE', 'VASO', 'PENTE'],
    medium: ['CADEIRA', 'CANETA', 'GARRAFA', 'MOCHILA', 'CADERNO', 'RELÓGIO', 'TESOURA', 'ESPELHO'],
    hard: ['GRAMPEADOR', 'LIQUIDIFICADOR', 'COMPUTADOR', 'VENTILADOR', 'TRAVESSEIRO', 'GELADEIRA'],
  },
  technology: {
    easy: ['MOUSE', 'CHIP', 'DRONE', 'CABO', 'REDE', 'PIXEL', 'LASER', 'ROBÔ'],
    medium: ['TECLADO', 'INTERNET', 'SISTEMA', 'MONITOR', 'CIRCUITO', 'ARQUIVO', 'MEMÓRIA', 'CÓDIGO'],
    hard: ['ALGORITMO', 'PROCESSADOR', 'APLICATIVO', 'PROGRAMAÇÃO', 'INTELIGÊNCIA', 'CRIPTOGRAFIA'],
  },
  sports: {
    easy: ['JUDÔ', 'SURFE', 'TÊNIS', 'GOLFE', 'BOXE', 'REMO', 'POLO', 'ESQUI'],
    medium: ['FUTEBOL', 'NATAÇÃO', 'CICLISMO', 'BASQUETE', 'HANDEBOL', 'ESGRIMA', 'CANOAGEM', 'CORRIDA'],
    hard: ['ATLETISMO', 'AUTOMOBILISMO', 'MONTANHISMO', 'BADMINTON', 'GINÁSTICA'],
  },
};
