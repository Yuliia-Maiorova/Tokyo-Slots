export type SymbolId = 'seven' | 'bar' | 'cherry' | 'bell' | 'lemon' | 'orange' | 'grape';

export interface SlotSymbol {
  id: SymbolId;
  name: string;
  emoji: string;
  value: number;
  color: string;
}

export type GameResult = 'idle' | 'spinning' | 'win' | 'lose';

export interface SlotState {
  balance: number;
  currentBet: number;
  minBet: number;
  maxBet: number;
  betStep: number;
  reels: SymbolId[][];
  currentSymbols: SymbolId[];
  isSpinning: boolean;
  lastWin: number;
  gameResult: GameResult;
  winningSymbols: number[];
  jackpot: number;
  isJackpot: boolean;
}

export interface SlotActions {
  incrementBet: () => void;
  decrementBet: () => void;
  setBet: (amount: number) => void;
  setMaxBet: () => void;
  setMinBet: () => void;
  spin: () => void;
  stopSpin: (results: SymbolId[]) => void;
  resetGame: () => void;
  addToBalance: (amount: number) => void;
  setGameResult: (result: GameResult) => void;
  hydrate: () => void;
  incrementJackpot: (amount: number) => void;
  resetJackpot: () => void;
}

export type SlotStore = SlotState & SlotActions;

export interface GameConstants {
  INITIAL_BALANCE: number;
  INITIAL_BET: number;
  MIN_BET: number;
  MAX_BET: number;
  BET_STEP: number;
  REEL_COUNT: number;
  SPIN_DURATION: number;
  JACKPOT_INITIAL: number;
  JACKPOT_CONTRIBUTION: number;
}

export interface WinResult {
  isWin: boolean;
  winAmount: number;
  isJackpot: boolean;
  matchingSymbols: SymbolId | null;
  matchCount: number;
}
