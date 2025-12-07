'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { soundManager } from '@/utils/sounds';

interface LoseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoseModal({ isOpen, onClose }: LoseModalProps) {
  useEffect(() => {
    if (isOpen) {
      soundManager.playLose();
    }
  }, [isOpen]);

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
          {/* Orange background for losses */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, #ffb74d, #ff9800, #e65100)'
            }}
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative z-10 flex flex-col items-center gap-6 p-8"
          >
            <h1 className="text-5xl font-black text-white drop-shadow-lg">
              NO LUCK! 😅
            </h1>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-5 border-2 border-white/40"
            >
              <span className="text-3xl font-bold text-white">TRY AGAIN!</span>
            </motion.div>
            
            <p className="text-white/80 text-lg animate-pulse">Tap anywhere to continue</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
