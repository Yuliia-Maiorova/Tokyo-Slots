const STORAGE_KEYS = {
  BALANCE: 'tokyo_slots_balance',
  JACKPOT: 'tokyo_slots_jackpot',
} as const;

function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function saveBalance(balance: number): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
  } catch {
    console.warn('Failed to save balance');
  }
}

export function loadBalance(defaultBalance: number): number {
  if (!isLocalStorageAvailable()) return defaultBalance;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BALANCE);
    if (saved) {
      const balance = JSON.parse(saved);
      if (typeof balance === 'number' && balance >= 0) return balance;
    }
  } catch {
    console.warn('Failed to load balance');
  }
  return defaultBalance;
}

export function saveJackpot(jackpot: number): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.JACKPOT, JSON.stringify(jackpot));
  } catch {
    console.warn('Failed to save jackpot');
  }
}

export function loadJackpot(defaultJackpot: number): number {
  if (!isLocalStorageAvailable()) return defaultJackpot;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.JACKPOT);
    if (saved) {
      const jackpot = JSON.parse(saved);
      if (typeof jackpot === 'number' && jackpot >= 0) return jackpot;
    }
  } catch {
    console.warn('Failed to load jackpot');
  }
  return defaultJackpot;
}

export function clearGameData(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  } catch {
    console.warn('Failed to clear game data');
  }
}
