'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { formatCurrency } from '@/utils/calculateWin';
import { soundManager } from '@/utils/sounds';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  winAmount: number;
  isJackpot?: boolean;
}

export default function WinModal({ isOpen, onClose, winAmount, isJackpot = false }: WinModalProps) {
  useEffect(() => {
    if (isOpen) {
      if (isJackpot) {
        soundManager.playJackpot();
      } else if (winAmount > 100) {
        soundManager.playBigWin();
      } else {
        soundManager.playWin();
      }
    }
  }, [isOpen, isJackpot, winAmount]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Cyan background for wins, Gold for jackpot */}
          <div 
            className="absolute inset-0"
            style={{
              background: isJackpot 
                ? 'radial-gradient(circle, #ffd54f, #ff9800, #e65100)' 
                : 'radial-gradient(circle, #80deea, #00bcd4, #00838f)'
            }}
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative z-10 flex flex-col items-center gap-6 p-8"
          >
            <h1 className="text-5xl font-black text-white drop-shadow-lg">
              {isJackpot ? '🎉 JACKPOT! 🎉' : 'YOU WIN!'}
            </h1>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-5 border-2 border-white/40"
            >
              <span className="text-4xl font-bold text-white">+{formatCurrency(winAmount)}</span>
            </motion.div>
            
            <p className="text-white/80 text-lg animate-pulse">Tap anywhere to continue</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
