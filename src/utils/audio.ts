// Web Audio API Synthesizer for delicate romantic music box & sound effects

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private melodyInterval: number | null = null;
  private melodyStep: number = 0;
  private isMelodyPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMelody();
    } else {
      this.startMelody();
      this.playChime();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted && this.isMelodyPlaying;
  }

  // Play a soft bell / kalimba note
  public playNote(freq: number, duration: number = 1.2, gainLevel: number = 0.08, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Gentle envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  // Flower Blooming Harp Arpeggio Sound
  public playBloomArpeggio() {
    this.initContext();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C major gentle chord
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 1.8, 0.09, 'sine');
      }, idx * 120);
    });
  }

  // Soft sparkle / tap chime
  public playChime() {
    this.playNote(587.33, 0.8, 0.05); // D5
    setTimeout(() => this.playNote(880.00, 1.0, 0.05), 90); // A5
  }

  // Gentle letter open sound
  public playEnvelopeOpen() {
    this.playNote(392.00, 0.6, 0.04);
    setTimeout(() => this.playNote(523.25, 0.8, 0.05), 100);
    setTimeout(() => this.playNote(659.25, 1.2, 0.06), 200);
  }

  // Candle blown out sound + magical twinkle
  public playCandleBlow() {
    this.initContext();
    if (!this.ctx) return;

    // Breath / white noise puff
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);

      // Magical chime cascade after blowing
      setTimeout(() => {
        const starNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        starNotes.forEach((f, i) => {
          setTimeout(() => this.playNote(f, 1.5, 0.07), i * 110);
        });
      }, 300);
    } catch {
      // fallback
    }
  }

  // Continuous music box gentle looping melody
  public startMelody() {
    if (this.isMelodyPlaying) return;
    this.isMelodyPlaying = true;
    this.melodyStep = 0;

    // Sweet pentatonic music box pattern (E4, G4, A4, B4, D5, E5, G5)
    const melody = [
      329.63, 392.00, 493.88, 587.33,
      659.25, 587.33, 493.88, 392.00,
      329.63, 440.00, 523.25, 659.25,
      783.99, 659.25, 523.25, 440.00,
      392.00, 493.88, 587.33, 783.99,
      880.00, 783.99, 587.33, 493.88,
      329.63, 392.00, 440.00, 523.25,
      587.33, 493.88, 392.00, 329.63
    ];

    const playNext = () => {
      if (!this.isMelodyPlaying || this.isMuted) return;
      const freq = melody[this.melodyStep % melody.length];
      this.playNote(freq, 1.4, 0.04, 'sine');

      // Add harmonic bass note every 4 steps
      if (this.melodyStep % 4 === 0) {
        const bassFreq = freq / 2;
        this.playNote(bassFreq, 2.0, 0.03, 'sine');
      }

      this.melodyStep++;
      this.melodyInterval = window.setTimeout(playNext, 550);
    };

    playNext();
  }

  public stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyInterval) {
      clearTimeout(this.melodyInterval);
      this.melodyInterval = null;
    }
  }
}

export const audio = new AudioEngine();
