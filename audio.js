/**
 * ====================================================================
 * SABARI — THE CHAMPION'S JOURNEY ⚽ • AUDIO & SPEECH ENGINE
 * ====================================================================
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.pianoGain = null;
    this.ambientGain = null;
    this.isMusicPlaying = false;
    this.isPianoPlaying = false;
    this.ambientOscillators = [];
    this.musicTimeout = null;
    this.pianoTimeout = null;
    this.chantInterval = null;
    this.hasUserInteracted = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.pianoGain = this.ctx.createGain();
      this.pianoGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.pianoGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.hasUserInteracted = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.75,
        this.ctx.currentTime
      );
    }
    if (window.speechSynthesis) {
      if (this.isMuted) window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  playWhistle() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const now = this.ctx.currentTime;
    [2600, 2850].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const vibrato = this.ctx.createOscillator();
      const vibGain = this.ctx.createGain();

      vibrato.frequency.value = 24;
      vibGain.gain.value = 35;
      vibrato.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
      gain.gain.setValueAtTime(0.25, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);

      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + 0.47);
      osc.stop(now + 0.47);
    });
  }

  playKick() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.85, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.24);

    this.playNoise(0.08, 0.2, 450);
  }

  playPass() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playTackle() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    this.playNoise(0.18, 0.4, 300);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.14);
  }

  playNetGoal() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    this.playNoise(0.28, 0.45, 1200);

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.42);
      }, idx * 70);
    });
  }

  playCrowdRoar(duration = 2.5) {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);

    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(1.2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.65, now + 0.4);
    gain.gain.setValueAtTime(0.65, now + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  playSabariChant(times = 4) {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    let count = 0;
    const chant = () => {
      if (count >= times) return;
      this.playCrowdRoar(0.6);
      setTimeout(() => { this.playNoise(0.06, 0.4, 900); }, 350);
      setTimeout(() => { this.playNoise(0.06, 0.4, 900); }, 550);
      setTimeout(() => { this.playNoise(0.06, 0.4, 900); }, 750);
      count++;
      setTimeout(chant, 1200);
    };
    chant();
  }

  playTrophyFanfare() {
    if (this.isMuted || !this.ctx) return;
    this.resume();
    const chords = [
      [392.00, 493.88, 587.33],
      [440.00, 554.37, 659.25],
      [523.25, 659.25, 783.99],
      [587.33, 739.99, 880.00]
    ];

    chords.forEach((chord, step) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        chord.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1800, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.7);
        });
      }, step * 240);
    });
  }

  playNoise(duration = 0.2, volume = 0.2, filterFreq = 1000) {
    if (!this.ctx || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
  }

  startStadiumAtmosphere() {
    if (!this.ctx || this.ambientOscillators.length > 0) return;
    this.resume();
    [110, 164.81, 220].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();
      this.ambientOscillators.push(osc);
    });
  }

  startEmotionalPiano() {
    if (this.isPianoPlaying || !this.ctx) return;
    this.isPianoPlaying = true;
    this.resume();

    const pianoNotes = [
      { notes: [261.63, 329.63, 392.00, 523.25] },
      { notes: [164.81, 329.63, 392.00, 493.88] },
      { notes: [220.00, 261.63, 329.63, 440.00] },
      { notes: [174.61, 261.63, 329.63, 349.23] },
      { notes: [196.00, 246.94, 293.66, 392.00] }
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPianoPlaying || !this.ctx) return;
      const current = pianoNotes[step % pianoNotes.length];
      step++;

      const now = this.ctx.currentTime;
      current.notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0.001, now + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.18 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.18 + 2.8);

        osc.connect(gain);
        gain.connect(this.pianoGain);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 3.0);
      });

      this.pianoTimeout = setTimeout(playNext, 3400);
    };

    playNext();
  }

  stopEmotionalPiano() {
    this.isPianoPlaying = false;
    if (this.pianoTimeout) {
      clearTimeout(this.pianoTimeout);
      this.pianoTimeout = null;
    }
  }

  startCinematicMusic() {
    if (this.isMusicPlaying || !this.ctx) return;
    this.isMusicPlaying = true;
    this.resume();

    const progression = [
      [349.23, 440.0, 523.25, 659.25],
      [261.63, 329.63, 392.0, 493.88],
      [196.00, 246.94, 293.66, 392.00],
      [220.00, 261.63, 329.63, 440.00]
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const notes = progression[chordIndex % progression.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 1.2);
        gain.gain.setValueAtTime(0.05, now + 2.8);
        gain.gain.linearRampToValueAtTime(0.001, now + 4.2);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + 4.3);
      });

      this.musicTimeout = setTimeout(playNextChord, 4000);
    };

    playNextChord();
  }

  // --- Argentine Spanish Speech for Messi ---
  speakSpanish(text, onStart, onEnd) {
    if (this.isMuted || !window.speechSynthesis) {
      if (onStart) onStart();
      const fallbackDuration = Math.max(2500, text.length * 75);
      setTimeout(() => { if (onEnd) onEnd(); }, fallbackDuration);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-AR'; // Argentine Spanish
    utterance.pitch = 0.98;
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es-AR') || v.lang.startsWith('es'));
    if (spanishVoice) utterance.voice = spanishVoice;

    let hasEnded = false;
    const safeEnd = () => {
      if (!hasEnded) {
        hasEnded = true;
        if (onEnd) onEnd();
      }
    };

    utterance.onstart = () => { if (onStart) onStart(); };
    utterance.onend = safeEnd;
    utterance.onerror = safeEnd;

    // Safety timeout in case browser speech engine stalls
    const estimatedDuration = Math.max(3000, text.length * 85);
    setTimeout(safeEnd, estimatedDuration + 500);

    window.speechSynthesis.speak(utterance);
  }
}

window.soundEngine = new SoundEngine();
