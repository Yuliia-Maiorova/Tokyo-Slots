import { SymbolId, WinResult } from '@/types';

export function calculateWin(results: SymbolId[], bet: number): WinResult {
  const allSevens = results.every(symbol => symbol === 'seven');
  if (allSevens) {
    return { isWin: true, winAmount: bet * 100, isJackpot: true, matchingSymbols: 'seven', matchCount: 4 };
  }

  const sevenCount = results.filter(s => s === 'seven').length;
  if (sevenCount === 3) {
    return { isWin: true, winAmount: bet * 20, isJackpot: false, matchingSymbols: 'seven', matchCount: 3 };
  }

  const symbolCounts = results.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {} as Record<SymbolId, number>);

  let maxSymbol: SymbolId | null = null;
  let maxCount = 0;

  for (const [symbol, count] of Object.entries(symbolCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxSymbol = symbol as SymbolId;
    }
  }

  if (maxCount >= 3 && maxSymbol) {
    return { isWin: true, winAmount: bet * 5, isJackpot: false, matchingSymbols: maxSymbol, matchCount: maxCount };
  }

  if (maxCount === 2 && maxSymbol) {
    return { isWin: true, winAmount: bet * 1.5, isJackpot: false, matchingSymbols: maxSymbol, matchCount: 2 };
  }

  return { isWin: false, winAmount: 0, isJackpot: false, matchingSymbols: null, matchCount: 0 };
}

export function getMatchingIndices(results: SymbolId[]): number[] {
  const symbolCounts = results.reduce((acc, symbol, index) => {
    if (!acc[symbol]) acc[symbol] = [];
    acc[symbol].push(index);
    return acc;
  }, {} as Record<SymbolId, number[]>);

  let maxIndices: number[] = [];
  for (const indices of Object.values(symbolCounts)) {
    if (indices.length > maxIndices.length) {
      maxIndices = indices;
    }
  }

  return maxIndices.length >= 2 ? maxIndices : [];
}

export function calculateJackpotContribution(bet: number): number {
  return bet * 0.05;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
