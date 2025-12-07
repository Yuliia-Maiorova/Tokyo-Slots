import { SlotSymbol, SymbolId, GameConstants } from '@/types';

export const GAME_CONSTANTS: GameConstants = {
  INITIAL_BALANCE: 1000,
  INITIAL_BET: 10,
  MIN_BET: 10,
  MAX_BET: 100,
  BET_STEP: 10,
  REEL_COUNT: 4,
  SPIN_DURATION: 3000,
  JACKPOT_INITIAL: 10000,
  JACKPOT_CONTRIBUTION: 0.05,
};

export const MIN_BET = GAME_CONSTANTS.MIN_BET;
export const MAX_BET = GAME_CONSTANTS.MAX_BET;
export const INITIAL_BALANCE = GAME_CONSTANTS.INITIAL_BALANCE;
export const INITIAL_BET = GAME_CONSTANTS.INITIAL_BET;

export const ANIMATION_CONSTANTS = {
  REEL_BASE_DURATION: 500,
  REEL_STAGGER: 400,
  SPIN_SPEED: 80,
  STOP_BOUNCE: 150,
};

export const SYMBOLS: Record<SymbolId, SlotSymbol> = {
  seven: { id: 'seven', name: 'Lucky Seven', emoji: '7️⃣', value: 100, color: '#FFD700' },
  bar: { id: 'bar', name: 'Bar', emoji: '🎰', value: 50, color: '#C0C0C0' },
  cherry: { id: 'cherry', name: 'Cherry', emoji: '🍒', value: 25, color: '#E63946' },
  bell: { id: 'bell', name: 'Bell', emoji: '🔔', value: 20, color: '#FFE66D' },
  lemon: { id: 'lemon', name: 'Lemon', emoji: '🍋', value: 15, color: '#FFF44F' },
  orange: { id: 'orange', name: 'Orange', emoji: '🍊', value: 10, color: '#FF6B35' },
  grape: { id: 'grape', name: 'Grape', emoji: '🍇', value: 5, color: '#8E44AD' },
};

export const ALL_SYMBOL_IDS: SymbolId[] = ['seven', 'bar', 'cherry', 'bell', 'lemon', 'orange', 'grape'];

export const SYMBOL_WEIGHTS: Record<SymbolId, number> = {
  seven: 5,
  bar: 10,
  cherry: 15,
  bell: 20,
  lemon: 25,
  orange: 25,
  grape: 30,
};

export function getRandomSymbol(): SymbolId {
  const totalWeight = Object.values(SYMBOL_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const [symbolId, weight] of Object.entries(SYMBOL_WEIGHTS)) {
    random -= weight;
    if (random <= 0) return symbolId as SymbolId;
  }
  return 'grape';
}

export function generateReelResults(reelCount: number = GAME_CONSTANTS.REEL_COUNT): SymbolId[] {
  return Array.from({ length: reelCount }, () => getRandomSymbol());
}

export function generateReelStrip(length: number = 20): SymbolId[] {
  return Array.from({ length }, () => getRandomSymbol());
}

export function getSymbol(id: SymbolId): SlotSymbol {
  return SYMBOLS[id];
}

export function getSymbolEmoji(id: SymbolId): string {
  return SYMBOLS[id].emoji;
}

export function getSymbolValue(id: SymbolId): number {
  return SYMBOLS[id].value;
}

export function isJackpotSymbol(id: SymbolId): boolean {
  return id === 'seven';
}
