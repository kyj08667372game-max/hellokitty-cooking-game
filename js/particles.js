/**
 * 「헬로키티의 달콤한 주방」 - 파티클 및 비주얼 이펙트 시스템
 * 하트, 별, 반짝이, 점수 플로팅, 연기, 콘페티 축하 효과
 */

export class ParticleSystem {
  constructor(containerElement) {
    this.container = containerElement;
  }

  // 화면 특정 좌표나 요소 근처에 떠오르는 점수 텍스트 팝업
  spawnFloatingText(text, x, y, type = 'bonus') {
    if (!this.container) return;

    const el = document.createElement('div');
    el.className = `floating-text floating-${type}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    this.container.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 1500);
  }

  // 하트 & 별 팡파레 효과 (손님 기쁨)
  burstHeartsAndStars(x, y, count = 16) {
    if (!this.container) return;
    const items = ['💖', '💕', '⭐', '✨', '🎀', '🌸', '🍓'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'burst-particle';
      p.textContent = items[Math.floor(Math.random() * items.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 90;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 30; // 약간 위로 부양

      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.fontSize = `${18 + Math.random() * 16}px`;

      this.container.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 1200);
    }
  }

  // 탄 요리 연기 파티클
  spawnSmoke(x, y, count = 8) {
    if (!this.container) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (!this.container) return;
        const s = document.createElement('div');
        s.className = 'smoke-particle';
        s.textContent = '💨';

        const spread = (Math.random() - 0.5) * 40;
        s.style.left = `${x + spread}px`;
        s.style.top = `${y}px`;
        s.style.fontSize = `${16 + Math.random() * 18}px`;

        this.container.appendChild(s);

        setTimeout(() => {
          if (s.parentNode) s.parentNode.removeChild(s);
        }, 1200);
      }, i * 140);
    }
  }

  // 완벽 클리어 색종이(콘페티) 축하 폭죽
  launchConfetti(durationMs = 3500) {
    if (!this.container) return;

    const colors = ['#FF6B8B', '#FF8E53', '#FFA07A', '#FFD166', '#06D6A0', '#118AB2', '#A2D2FF', '#CDB4DB', '#FFC6FF'];
    const shapes = ['square', 'circle', 'ribbon'];
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        clearInterval(interval);
        return;
      }

      for (let i = 0; i < 6; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.backgroundColor = color;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `-20px`;

        if (shape === 'circle') {
          piece.style.borderRadius = '50%';
        } else if (shape === 'ribbon') {
          piece.style.width = '6px';
          piece.style.height = '18px';
        }

        const animDuration = 2 + Math.random() * 2.5;
        piece.style.animationDuration = `${animDuration}s`;
        piece.style.setProperty('--sway', `${(Math.random() - 0.5) * 200}px`);

        this.container.appendChild(piece);

        setTimeout(() => {
          if (piece.parentNode) piece.parentNode.removeChild(piece);
        }, animDuration * 1000);
      }
    }, 80);
  }
}
