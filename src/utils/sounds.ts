class SoundManager {
  private audioContext: AudioContext | null = null;
  private initialized = false;

  private init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.initialized = true;
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    this.playTone(800, 0.05, 'square', 0.1);
  }

  playSpinStart() {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  playReelTick() {
    this.playTone(300 + Math.random() * 200, 0.03, 'square', 0.05);
  }

  playReelStop(reelIndex: number) {
    const baseFreq = 400 + reelIndex * 50;
    this.playTone(baseFreq, 0.1, 'triangle', 0.2);
    setTimeout(() => this.playTone(baseFreq * 0.8, 0.05, 'triangle', 0.1), 50);
  }

  playWin() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.2), i * 100);
    });
  }

  playBigWin() {
    const notes = [523, 659, 784, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 'square', 0.15);
        this.playTone(freq * 1.5, 0.15, 'sine', 0.1);
      }, i * 80);
    });
  }

  playJackpot() {
    const notes = [262, 330, 392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, 'sawtooth', 0.15);
        this.playTone(freq * 1.25, 0.3, 'sine', 0.1);
        this.playTone(freq * 1.5, 0.3, 'triangle', 0.08);
      }, i * 120);
    });

    setTimeout(() => {
      this.playTone(523, 0.8, 'sine', 0.2);
      this.playTone(659, 0.8, 'sine', 0.15);
      this.playTone(784, 0.8, 'sine', 0.15);
      this.playTone(1047, 0.8, 'sine', 0.1);
    }, notes.length * 120);
  }

  playLose() {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  playCoin() {
    this.playTone(1200, 0.08, 'sine', 0.15);
    setTimeout(() => this.playTone(1500, 0.06, 'sine', 0.1), 40);
  }
}

export const soundManager = new SoundManager();
