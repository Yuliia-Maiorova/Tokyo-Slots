'use client';

import { motion } from 'framer-motion';
import { soundManager } from '@/utils/sounds';

interface BetControlsProps {
  currentBet: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onMaxBet: () => void;
  onMinBet: () => void;
  disabled: boolean;
}

export default function BetControls({ currentBet, onIncrement, onDecrement, onMaxBet, onMinBet, disabled }: BetControlsProps) {
  const handleClick = (action: () => void) => {
    if (!disabled) {
      soundManager.playClick();
      action();
    }
  };

  const buttonStyle = `
    w-10 h-10 rounded-full text-xl font-bold
    ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-100 active:scale-95'}
    shadow-md flex items-center justify-center
  `;

  return (
    <div className="flex items-center gap-4">
      <motion.button
        onClick={() => handleClick(onMinBet)}
        disabled={disabled}
        className={`
          px-3 py-2 rounded-lg text-sm font-bold
          ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}
          shadow-md
        `}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        MIN
      </motion.button>
      <motion.button
        onClick={() => handleClick(onDecrement)}
        disabled={disabled}
        className={buttonStyle}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        −
      </motion.button>
      
      <div className="flex flex-col items-center">
        <span className="text-xs text-white/80 font-medium">BET</span>
        <div className="bg-white rounded-lg px-6 py-2 shadow-inner">
          <span className="text-xl font-bold text-gray-800">{currentBet}</span>
        </div>
      </div>
      
      <motion.button
        onClick={() => handleClick(onIncrement)}
        disabled={disabled}
        className={buttonStyle}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        +
      </motion.button>
      
      <motion.button
        onClick={() => handleClick(onMaxBet)}
        disabled={disabled}
        className={`
          px-3 py-2 rounded-lg text-sm font-bold
          ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}
          shadow-md
        `}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        MAX
      </motion.button>
    </div>
  );
}
