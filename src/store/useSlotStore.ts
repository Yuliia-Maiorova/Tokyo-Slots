import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { SlotStore, SymbolId, GameResult } from '@/types';
import { GAME_CONSTANTS, generateReelResults } from '@/utils/symbols';
import { calculateWin, calculateJackpotContribution, getMatchingIndices } from '@/utils/calculateWin';
import { saveBalance, loadBalance, saveJackpot, loadJackpot } from '@/utils/storage';

const getInitialBalance = () => {
  if (typeof window === 'undefined') return GAME_CONSTANTS.INITIAL_BALANCE;
  return loadBalance(GAME_CONSTANTS.INITIAL_BALANCE);
};

const getInitialJackpot = () => {
  if (typeof window === 'undefined') return GAME_CONSTANTS.JACKPOT_INITIAL;
  return loadJackpot(GAME_CONSTANTS.JACKPOT_INITIAL);
};

export const useSlotStore = create<SlotStore>()(
  subscribeWithSelector((set, get) => ({
    balance: GAME_CONSTANTS.INITIAL_BALANCE,
    currentBet: GAME_CONSTANTS.INITIAL_BET,
    minBet: GAME_CONSTANTS.MIN_BET,
    maxBet: GAME_CONSTANTS.MAX_BET,
    betStep: GAME_CONSTANTS.BET_STEP,
    reels: [],
    currentSymbols: ['seven', 'seven', 'seven', 'seven'] as SymbolId[],
    isSpinning: false,
    lastWin: 0,
    gameResult: 'idle' as GameResult,
    winningSymbols: [],
    jackpot: GAME_CONSTANTS.JACKPOT_INITIAL,
    isJackpot: false,

    hydrate: () => {
      if (typeof window === 'undefined') return;
      set({ balance: getInitialBalance(), jackpot: getInitialJackpot() });
    },

    incrementBet: () => {
      const { currentBet, maxBet, betStep, balance } = get();
      set({ currentBet: Math.min(currentBet + betStep, maxBet, balance) });
    },

    decrementBet: () => {
      const { currentBet, minBet, betStep } = get();
      set({ currentBet: Math.max(currentBet - betStep, minBet) });
    },

    setBet: (amount: number) => {
      const { minBet, maxBet, balance } = get();
      set({ currentBet: Math.max(minBet, Math.min(amount, maxBet, balance)) });
    },

    setMaxBet: () => {
      const { maxBet, balance } = get();
      set({ currentBet: Math.min(maxBet, balance) });
    },

    setMinBet: () => {
        const { minBet, balance } = get();
        set({ currentBet: Math.min(minBet, balance) });
    },

    spin: () => {
      const { balance, currentBet, isSpinning, jackpot } = get();
      if (isSpinning || balance < currentBet) return;

      const newBalance = balance - currentBet;
      const newJackpot = jackpot + calculateJackpotContribution(currentBet);
      const newSymbols = generateReelResults();

      set({
        isSpinning: true,
        balance: newBalance,
        jackpot: newJackpot,
        gameResult: 'spinning',
        lastWin: 0,
        winningSymbols: [],
        isJackpot: false,
        currentSymbols: newSymbols,
      });

      setTimeout(() => {
        get().stopSpin(newSymbols);
      }, GAME_CONSTANTS.SPIN_DURATION);
    },

    stopSpin: (results: SymbolId[]) => {
      const { currentBet, jackpot } = get();
      const winResult = calculateWin(results, currentBet);
      const matchingIndices = getMatchingIndices(results);

      let finalWin = winResult.winAmount;
      let newJackpot = jackpot;

      if (winResult.isJackpot) {
        finalWin += jackpot;
        newJackpot = GAME_CONSTANTS.JACKPOT_INITIAL;
      }

      set((state) => ({
        isSpinning: false,
        currentSymbols: results,
        lastWin: finalWin,
        gameResult: winResult.isWin ? 'win' : 'lose',
        winningSymbols: matchingIndices,
        balance: state.balance + finalWin,
        jackpot: newJackpot,
        isJackpot: winResult.isJackpot,
      }));
    },

    resetGame: () => {
      set({
        balance: GAME_CONSTANTS.INITIAL_BALANCE,
        currentBet: GAME_CONSTANTS.INITIAL_BET,
        currentSymbols: ['seven', 'seven', 'seven', 'seven'] as SymbolId[],
        isSpinning: false,
        lastWin: 0,
        gameResult: 'idle',
        winningSymbols: [],
        jackpot: GAME_CONSTANTS.JACKPOT_INITIAL,
        isJackpot: false,
      });
    },

    addToBalance: (amount: number) => {
      set((state) => ({ balance: state.balance + amount }));
    },

    setGameResult: (result: GameResult) => {
      set({ gameResult: result });
    },

    incrementJackpot: (amount: number) => {
      set((state) => ({ jackpot: state.jackpot + amount }));
    },

    resetJackpot: () => {
      set({ jackpot: GAME_CONSTANTS.JACKPOT_INITIAL });
    },
  }))
);

if (typeof window !== 'undefined') {
  useSlotStore.subscribe((state) => state.balance, (balance) => saveBalance(balance));
  useSlotStore.subscribe((state) => state.jackpot, (jackpot) => saveJackpot(jackpot));
}
