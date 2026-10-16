/**
 * 「헬로키티의 달콤한 주방」 - 사운드 효과음 시스템 (Web Audio API)
 * 브라우저 정책 준수, 외부 의존성 없이 순수 신시사이저로 귀여운 레트로/산리오풍 효과음 구현
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.cookingOsc = null;
    this.cookingGain = null;
    this.isCookingPlaying = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopCookingSound();
    }
    return this.isMuted;
  }

  // 기본 비프/톤 생성 헬퍼
  playTone(freq, type, duration, gainValue = 0.2, attack = 0.01, decay = 0.1) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(gainValue, this.audioCtx.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // 1. 버튼 클릭 (귀여운 퐁! 소리)
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // 2. 재료 선택음 (도레미 맑은 벨 소리)
  playSelect(index = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const baseNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]; // C5, D5, E5, F5, G5, A5
    const freq = baseNotes[index % baseNotes.length] || 600;

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.12);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // 3. 재료 취소/리셋음
  playCancel() {
    this.playTone(330, 'sine', 0.1, 0.15);
  }

  // 4. 에러/잘못된 조합 (귀여운 뿅- 실망음)
  playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.linearRampToValueAtTime(140, t + 0.25);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // 5. 조리 시작/보글보글 지글지글 효과음
  startCookingSound() {
    if (this.isMuted || this.isCookingPlaying) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      // 핑크/브라운 노이즈 버퍼 생성 (보글보글 기름/물 끓는 소리)
      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);

      this.cookingGain = this.audioCtx.createGain();
      this.cookingGain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);

      noise.connect(filter);
      filter.connect(this.cookingGain);
      this.cookingGain.connect(this.audioCtx.destination);

      noise.start();
      this.cookingOsc = noise;
      this.isCookingPlaying = true;
    } catch (e) {
      console.warn('Cooking sound error', e);
    }
  }

  stopCookingSound() {
    if (this.cookingOsc && this.isCookingPlaying) {
      try {
        if (this.cookingGain && this.audioCtx) {
          this.cookingGain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
        }
        setTimeout(() => {
          if (this.cookingOsc) {
            this.cookingOsc.stop();
            this.cookingOsc.disconnect();
            this.cookingOsc = null;
          }
        }, 120);
      } catch (e) {
        // ignore
      }
    }
    this.isCookingPlaying = false;
  }

  // 6. 요리 완성 딩동댕 벨
  playDishReady() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [659.25, 783.99, 1046.50]; // E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (this.isMuted || !this.audioCtx) return;
        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      }, i * 110);
    });
  }

  // 7. 요리 태움 (치이익- 푸쉬식)
  playBurn() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.6);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  }

  // 8. 손님 서빙 성공 (화려하고 기쁜 팡파레)
  playServeSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.isMuted || !this.audioCtx) return;
        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      }, idx * 75);
    });
  }

  // 9. 올 클리어 축하 팡파레
  playGameClear() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.35 },
      { f: 880.00, d: 0.2 },
      { f: 1046.50, d: 0.5 },
    ];

    let delay = 0;
    fanfare.forEach(item => {
      setTimeout(() => {
        if (this.isMuted || !this.audioCtx) return;
        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + item.d);
      }, delay);
      delay += item.d * 900;
    });
  }

  // 10. 게임 오버 멜로디
  playGameOver() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [440, 415.3, 392, 349.2];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.isMuted || !this.audioCtx) return;
        const t = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      }, idx * 180);
    });
  }
}

export const soundManager = new SoundManager();
