'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/utils/calculateWin';

interface BalanceProps {
  balance: number;
  lastWin?: number;
}

export default function Balance({ balance, lastWin = 0 }: BalanceProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <AnimatePresence>
        {lastWin > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-yellow-300 font-bold text-lg"
          >
            +{formatCurrency(lastWin)} 🎉
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-center">
        <span className="text-xs text-white/80 font-bold">BALANCE</span>
        <motion.div
          key={balance}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="bg-red-600 rounded-full px-8 py-2 shadow-lg"
        >
          <span className="text-white text-2xl font-black">{formatCurrency(balance)}</span>
        </motion.div>
      </div>
    </div>
  );
}
