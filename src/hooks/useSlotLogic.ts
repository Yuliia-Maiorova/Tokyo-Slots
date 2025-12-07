import { useCallback, useEffect, useState } from 'react';
import { useSlotStore } from '@/store/useSlotStore';

export function useSlotLogic() {
  const store = useSlotStore();
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  const canSpin = !store.isSpinning && store.balance >= store.currentBet;

  useEffect(() => {
    if (store.gameResult === 'win') {
      const timer = setTimeout(() => setShowWinModal(true), 500);
      return () => clearTimeout(timer);
    } else if (store.gameResult === 'lose') {
      const timer = setTimeout(() => setShowLoseModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, [store.gameResult]);

  useEffect(() => {
    if (showLoseModal) {
      const timer = setTimeout(() => {
        setShowLoseModal(false);
        store.setGameResult('idle');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showLoseModal, store]);

  const closeModals = useCallback(() => {
    setShowWinModal(false);
    setShowLoseModal(false);
    store.setGameResult('idle');
  }, [store]);

  const handleSpin = useCallback(() => {
    if (canSpin) {
      closeModals();
      store.spin();
    }
  }, [canSpin, store, closeModals]);

  return {
    balance: store.balance,
    currentBet: store.currentBet,
    isSpinning: store.isSpinning,
    gameResult: store.gameResult,
    lastWin: store.lastWin,
    jackpot: store.jackpot,
    currentSymbols: store.currentSymbols,
    winningSymbols: store.winningSymbols,
    isJackpot: store.isJackpot,
    canSpin,
    showWinModal,
    showLoseModal,
    spin: handleSpin,
    incrementBet: store.incrementBet,
    decrementBet: store.decrementBet,
    setMaxBet: store.setMaxBet,
    setMinBet: store.setMinBet,
    resetGame: store.resetGame,
    closeModals,
  };
}
