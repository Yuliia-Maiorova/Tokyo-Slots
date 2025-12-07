'use client';

import { useEffect } from 'react';
import Reel from '@/components/Reel';
import SpinButton from '@/components/SpinButton';
import BetControls from '@/components/BetControls';
import Balance from '@/components/Balance';
import WinModal from '@/components/WinModal';
import LoseModal from '@/components/LoseModal';
import { useSlotLogic } from '@/hooks/useSlotLogic';
import { formatCurrency } from '@/utils/calculateWin';
import { SymbolId } from '@/types';
import { useSlotStore } from '@/store/useSlotStore';

function JackpotDisplay({ jackpot }: { jackpot: number }) {
  return (
    <div className="bg-red-600 rounded-2xl px-8 py-3 mb-6 shadow-lg">
      <span className="text-yellow-300 text-sm font-bold mr-2">🏆 JACKPOT</span>
      <span className="text-white text-2xl font-black">{formatCurrency(jackpot)}</span>
    </div>
  );
}

function ReelsDisplay({ currentSymbols, isSpinning, winningSymbols }: {
  currentSymbols: SymbolId[];
  isSpinning: boolean;
  winningSymbols: number[];
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 mb-4">
      <div className="flex gap-3 justify-center">
        {currentSymbols.map((symbol, index) => (
          <Reel
            key={index}
            currentSymbol={symbol}
            isSpinning={isSpinning}
            reelIndex={index}
            isWinning={winningSymbols.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function SlotMachine() {
  const hydrate = useSlotStore((state) => state.hydrate);
  const {
    balance, currentBet, isSpinning, lastWin, jackpot,
    currentSymbols, winningSymbols, isJackpot, canSpin,
    showWinModal, showLoseModal, spin, incrementBet,
    decrementBet, setMaxBet, setMinBet, closeModals,
  } = useSlotLogic();

  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-lime-500 to-lime-700 flex flex-col items-center justify-center p-4 pb-24">
      <JackpotDisplay jackpot={jackpot} />

      <div className="bg-slate-800 rounded-3xl p-6 shadow-2xl border-4 border-slate-600">
        <h1 className="text-3xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
          🗼 TOKYO SLOTS 🗼
        </h1>
        <ReelsDisplay currentSymbols={currentSymbols as SymbolId[]} isSpinning={isSpinning} winningSymbols={winningSymbols} />
        <div className="flex justify-center mb-4">
          <Balance balance={balance} lastWin={lastWin} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <BetControls currentBet={currentBet} onIncrement={incrementBet} onDecrement={decrementBet} onMaxBet={setMaxBet} onMinBet={setMinBet} disabled={isSpinning} />
        <SpinButton onSpin={spin} disabled={!canSpin} isSpinning={isSpinning} />
        {balance < currentBet && !isSpinning && <p className="text-red-200 text-sm">⚠️ Insufficient balance!</p>}
      </div>

      <WinModal isOpen={showWinModal} onClose={closeModals} winAmount={lastWin} isJackpot={isJackpot} />
      <LoseModal isOpen={showLoseModal} onClose={closeModals} />
    </div>
  );
}
