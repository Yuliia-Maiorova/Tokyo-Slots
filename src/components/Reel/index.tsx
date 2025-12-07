'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { SymbolId } from '@/types';
import { getSymbolEmoji, generateReelStrip, ANIMATION_CONSTANTS } from '@/utils/symbols';
import { soundManager } from '@/utils/sounds';

interface ReelProps {
  currentSymbol: SymbolId;
  isSpinning: boolean;
  reelIndex: number;
  isWinning?: boolean;
}

export default function Reel({ currentSymbol, isSpinning, reelIndex, isWinning = false }: ReelProps) {
  const [localSpinning, setLocalSpinning] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const stopDelay = ANIMATION_CONSTANTS.REEL_BASE_DURATION + (reelIndex * ANIMATION_CONSTANTS.REEL_STAGGER);
  
  useEffect(() => {
    if (isSpinning) {
      setShowResult(false);
      setLocalSpinning(true);
      
      tickIntervalRef.current = setInterval(() => {
        soundManager.playReelTick();
      }, ANIMATION_CONSTANTS.SPIN_SPEED);
      
      const stopTimer = setTimeout(() => {
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
        soundManager.playReelStop(reelIndex);
        setLocalSpinning(false);
        setShowResult(true);
      }, stopDelay);
      
      return () => {
        clearTimeout(stopTimer);
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      };
    }
  }, [isSpinning, stopDelay, reelIndex]);

  return (
    <div className={`
      w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28
      bg-slate-800 rounded-xl overflow-hidden
      flex items-center justify-center
      ${isWinning && showResult ? 'ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50' : ''}
    `}>
      <AnimatePresence mode="wait">
        {localSpinning ? (
          <motion.div
            key="spinning"
            className="flex flex-col items-center"
            animate={{ y: [0, -1000] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            {generateReelStrip(30).map((symbol, index) => (
              <div key={index} className="h-20 flex items-center text-4xl blur-[1px]">
                {getSymbolEmoji(symbol)}
              </div>
            ))}
          </motion.div>
        ) : showResult ? (
          <motion.div
            key={`result-${currentSymbol}`}
            initial={{ y: -30, scale: 1.3 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="text-4xl sm:text-5xl"
          >
            {getSymbolEmoji(currentSymbol)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
