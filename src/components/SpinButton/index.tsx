'use client';

import { motion } from 'framer-motion';
import { soundManager } from '@/utils/sounds';

interface SpinButtonProps {
  onSpin: () => void;
  disabled: boolean;
  isSpinning: boolean;
}

export default function SpinButton({ onSpin, disabled, isSpinning }: SpinButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      soundManager.playClick();
      soundManager.playSpinStart();
      onSpin();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`
        px-12 py-4 text-xl font-bold text-white rounded-full
        ${disabled 
          ? 'bg-gray-500 cursor-not-allowed' 
          : 'bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
        }
        shadow-lg
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {isSpinning ? 'SPINNING...' : 'SPIN'}
    </motion.button>
  );
}
