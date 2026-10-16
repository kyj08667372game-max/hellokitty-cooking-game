/**
 * 「헬로키티의 달콤한 주방」 - 통합 번들 스크립트 (8종 요리 & 랜덤 시스템 확장)
 */

(function () {
  'use strict';

  // ================= 1. 게임 마스터 데이터 =================
  const RECIPES = {
    ramen: {
      id: 'ramen',
      name: '계란 라면',
      emoji: '🍜',
      image: 'public/images/dishes/egg_ramen.png',
      svgFallback: 'egg_ramen',
      ingredients: ['noodle', 'egg', 'water'],
      cookTime: 5,
      category: '식사',
      description: '따끈따끈 쫄깃한 면에 고소한 계란이 퐁당!',
    },
    cheese_ramen: {
      id: 'cheese_ramen',
      name: '치즈 라면',
      emoji: '🧀🍜',
      image: '',
      svgFallback: 'cheese_ramen',
      ingredients: ['noodle', 'water', 'cheese'],
      cookTime: 4,
      category: '식사',
      description: '얼큰한 국물에 고소한 슬라이스 치즈가 사르르~',
    },
    fried_egg: {
      id: 'fried_egg',
      name: '계란 프라이',
      emoji: '🍳',
      image: 'public/images/dishes/fried_egg.png',
      svgFallback: 'fried_egg',
      ingredients: ['egg', 'oil'],
      cookTime: 3,
      category: '브런치',
      description: '노릇노릇 바삭하고 부드러운 하트 계란 프라이!',
    },
    sandwich: {
      id: 'sandwich',
      name: '치즈 샌드위치',
      emoji: '🥪',
      image: 'public/images/dishes/cheese_sandwich.png',
      svgFallback: 'cheese_sandwich',
      ingredients: ['bread', 'cheese'],
      cookTime: 4,
      category: '브런치',
      description: '고소한 치즈가 듬뿍 들어간 바삭 토스트 샌드위치!',
    },
    french_toast: {
      id: 'french_toast',
      name: '프렌치 토스트',
      emoji: '🍞🍯',
      image: '',
      svgFallback: 'french_toast',
      ingredients: ['bread', 'egg', 'milk'],
      cookTime: 4,
      category: '브런치',
      description: '달콤한 계란 우유물에 적셔 노릇하게 구운 폭신 토스트!',
    },
    strawberry_pancake: {
      id: 'strawberry_pancake',
      name: '딸기 팬케이크',
      emoji: '🥞🍓',
      image: '',
      svgFallback: 'strawberry_pancake',
      ingredients: ['bread', 'egg', 'strawberry'],
      cookTime: 4,
      category: '디저트',
      description: '상큼한 딸기가 듬뿍 올라간 달콤 폭신 팬케이크!',
    },
    strawberry_milk: {
      id: 'strawberry_milk',
      name: '달콤 딸기 라떼',
      emoji: '🥛🍓',
      image: '',
      svgFallback: 'strawberry_milk',
      ingredients: ['milk', 'strawberry', 'water'],
      cookTime: 3,
      category: '음료',
      description: '신선한 생딸기와 부드러운 우유의 사랑스러운 만남!',
    },
    strawberry_cheese: {
      id: 'strawberry_cheese',
      name: '딸기 치즈케이크',
      emoji: '🍰🍓',
      image: '',
      svgFallback: 'strawberry_cheese',
      ingredients: ['cheese', 'milk', 'strawberry'],
      cookTime: 5,
      category: '디저트',
      description: '진한 크림치즈와 향긋한 딸기 무스의 환상 조화!',
    }
  };

  const INGREDIENTS = [
    { id: 'noodle', name: '면', emoji: '🍜', color: '#FFF3BF', iconBg: '#FFF9DB' },
    { id: 'egg', name: '계란', emoji: '🥚', color: '#FFE066', iconBg: '#FFF3BF' },
    { id: 'water', name: '물', emoji: '💧', color: '#A5D8FF', iconBg: '#E7F5FF' },
    { id: 'oil', name: '기름', emoji: '🫗', color: '#FFD43B', iconBg: '#FFF3BF' },
    { id: 'bread', name: '빵', emoji: '🍞', color: '#FFA94D', iconBg: '#FFE8CC' },
    { id: 'cheese', name: '치즈', emoji: '🧀', color: '#FFC078', iconBg: '#FFF4E6' },
    { id: 'milk', name: '우유', emoji: '🥛', color: '#EBF8FF', iconBg: '#F0F9FF' },
    { id: 'strawberry', name: '딸기', emoji: '🍓', color: '#FFA8A8', iconBg: '#FFF5F5' }
  ];

  const CHARACTERS = {
    chef: {
      id: 'hello_kitty',
      name: '헬로키티 셰프',
      role: 'chef',
      image: 'public/images/characters/hello_kitty_chef.png',
      svgFallback: 'hello_kitty',
    },
    guests: [
      {
        id: 'cinnamoroll',
        name: '시나모롤',
        image: 'public/images/characters/cinnamoroll.png',
        svgFallback: 'cinnamoroll',
        dialogueTemplates: {
          order: (dish) => `달콤한 구름 같은 ${dish.name}을 부탁해! 몽실몽실 기분 좋아질 것 같아~ ☁️✨`,
          happy: (dish) => `우와! ${dish.name}이 정말 맛있어! 고마워 키티야~ ☁️💕`
        },
        color: '#BEE3F8'
      },
      {
        id: 'my_melody',
        name: '마이멜로디',
        image: 'public/images/characters/my_melody.png',
        svgFallback: 'my_melody',
        dialogueTemplates: {
          order: (dish) => `맛있는 ${dish.name}을 만들어줘! 멜로디가 너무 기대하고 있어~ 🌸💖`,
          happy: (dish) => `향긋하고 달콤해! 역시 키티의 솜씨는 최고야~ 🌸💕`
        },
        color: '#FED7E2'
      },
      {
        id: 'kuromi',
        name: '쿠로미',
        image: 'public/images/characters/kuromi.png',
        svgFallback: 'kuromi',
        dialogueTemplates: {
          order: (dish) => `나를 위해 특별한 ${dish.name}을 만들어줘! 최고의 맛이어야 해! 💜✨`,
          happy: (dish) => `헤헤, 제법인데? 너무 맛있어서 반해버리겠어! 💜🌟`
        },
        color: '#E9D8FD'
      },
      {
        id: 'pompompurin',
        name: '폼폼푸린',
        image: 'public/images/characters/pompompurin.png',
        svgFallback: 'pompompurin',
        dialogueTemplates: {
          order: (dish) => `배가 꼬르륵거려 푸링~ 맛있는 ${dish.name} 부탁해! 🍮💛`,
          happy: (dish) => `냠냠 꿀꺽! 너무 맛있어서 모자가 들썩들썩해 푸링~ 🍮✨`
        },
        color: '#FEFCBF'
      },
      {
        id: 'pochacco',
        name: '포차코',
        image: 'public/images/characters/pochacco.png',
        svgFallback: 'pochacco',
        dialogueTemplates: {
          order: (dish) => `신나게 산책하고 왔더니 배고파! ${dish.name} 하나 부탁할게! 🐾🌟`,
          happy: (dish) => `에너지 충전 200%! 키티 셰프 최고야 멍멍! 🐾💖`
        },
        color: '#C6F6D5'
      }
    ]
  };

  const GAME_CONFIG = {
    TOTAL_TIME: 60,
    MAX_CUSTOMERS: 3,
    BURN_TIME_LIMIT: 5,
    SCORES: {
      CORRECT_SERVE: 100,
      PERFECT_COOK: 50,
      MAX_FAST_SERVE_BONUS: 50,
      WRONG_RECIPE_PENALTY: 20,
      BURN_PENALTY: 30
    }
  };

  // ================= 2. 인라인 SVG 그래픽 백업 =================
  const SVG_FALLBACKS = {
    hello_kitty: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#FFF0F5" stroke="#FFB6C1" stroke-width="4"/>
        <path d="M55,50 C45,35 60,18 75,25 C82,15 98,18 102,28 C115,22 125,38 110,50 Z" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3"/>
        <rect x="58" y="46" width="48" height="10" rx="3" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3"/>
        <polygon points="42,66 28,34 60,46" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5" stroke-linejoin="round"/>
        <polygon points="118,66 132,34 100,46" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5" stroke-linejoin="round"/>
        <ellipse cx="80" cy="82" rx="48" ry="38" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5"/>
        <g transform="translate(102, 42)">
          <ellipse cx="-12" cy="0" rx="9" ry="6" fill="#FF4D6D" stroke="#4A2E18" stroke-width="2.5" transform="rotate(-25 -12 0)"/>
          <ellipse cx="12" cy="0" rx="9" ry="6" fill="#FF4D6D" stroke="#4A2E18" stroke-width="2.5" transform="rotate(25 12 0)"/>
          <circle cx="0" cy="0" r="5.5" fill="#FF2A55" stroke="#4A2E18" stroke-width="2.5"/>
        </g>
        <ellipse cx="60" cy="84" rx="4.5" ry="6" fill="#4A2E18"/>
        <ellipse cx="100" cy="84" rx="4.5" ry="6" fill="#4A2E18"/>
        <ellipse cx="80" cy="90" rx="5" ry="3.5" fill="#FFD166" stroke="#4A2E18" stroke-width="2"/>
        <line x1="32" y1="80" x2="48" y2="83" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="30" y1="88" x2="48" y2="88" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="33" y1="96" x2="48" y2="93" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="128" y1="80" x2="112" y2="83" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="130" y1="88" x2="112" y2="88" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="127" y1="96" x2="112" y2="93" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M50,118 Q80,128 110,118 L116,155 Q80,158 44,155 Z" fill="#FFB6C1" stroke="#4A2E18" stroke-width="3"/>
      </svg>
    `,
    cinnamoroll: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#EBF8FF" stroke="#90CDF4" stroke-width="4"/>
        <ellipse cx="28" cy="82" rx="26" ry="12" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3" transform="rotate(-15 28 82)"/>
        <ellipse cx="132" cy="82" rx="26" ry="12" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3" transform="rotate(15 132 82)"/>
        <ellipse cx="80" cy="85" rx="42" ry="32" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5"/>
        <ellipse cx="64" cy="83" rx="4" ry="5.5" fill="#3182CE"/>
        <ellipse cx="96" cy="83" rx="4" ry="5.5" fill="#3182CE"/>
        <ellipse cx="52" cy="91" rx="6" ry="4" fill="#FEB2B2" opacity="0.8"/>
        <ellipse cx="108" cy="91" rx="6" ry="4" fill="#FEB2B2" opacity="0.8"/>
        <path d="M74,90 Q80,96 86,90" fill="none" stroke="#4A2E18" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `,
    my_melody: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#FFF5F7" stroke="#FBB6CE" stroke-width="4"/>
        <path d="M48,60 C32,15 58,10 65,48 C72,25 90,25 95,50 C108,12 132,20 112,62 C132,88 125,120 95,125 C65,125 35,95 48,60 Z" fill="#F687B3" stroke="#4A2E18" stroke-width="3.5"/>
        <ellipse cx="80" cy="86" rx="34" ry="26" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3"/>
        <circle cx="56" cy="42" r="4.5" fill="#FFFFFF" stroke="#4A2E18" stroke-width="1.5"/>
        <ellipse cx="68" cy="84" rx="3.5" ry="5" fill="#4A2E18"/>
        <ellipse cx="92" cy="84" rx="3.5" ry="5" fill="#4A2E18"/>
        <ellipse cx="80" cy="89" rx="3.5" ry="2.5" fill="#ECC94B" stroke="#4A2E18" stroke-width="1.5"/>
      </svg>
    `,
    kuromi: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#FAF5FF" stroke="#D6BCFA" stroke-width="4"/>
        <polygon points="40,70 18,22 62,55" fill="#2D3748" stroke="#1A202C" stroke-width="3"/>
        <polygon points="120,70 142,22 98,55" fill="#2D3748" stroke="#1A202C" stroke-width="3"/>
        <ellipse cx="80" cy="86" rx="36" ry="28" fill="#FFFFFF" stroke="#1A202C" stroke-width="3"/>
        <circle cx="80" cy="52" r="6" fill="#F687B3"/>
        <ellipse cx="66" cy="82" rx="4" ry="5.5" fill="#1A202C"/>
        <ellipse cx="94" cy="82" rx="4" ry="5.5" fill="#1A202C"/>
      </svg>
    `,
    pompompurin: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#FFFFF0" stroke="#FAF089" stroke-width="4"/>
        <ellipse cx="38" cy="76" rx="14" ry="22" fill="#F6E05E" stroke="#4A2E18" stroke-width="3"/>
        <ellipse cx="122" cy="76" rx="14" ry="22" fill="#F6E05E" stroke="#4A2E18" stroke-width="3"/>
        <ellipse cx="80" cy="86" rx="46" ry="40" fill="#F6E05E" stroke="#4A2E18" stroke-width="3.5"/>
        <ellipse cx="80" cy="46" rx="22" ry="10" fill="#744210"/>
      </svg>
    `,
    pochacco: `
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="76" fill="#F0FFF4" stroke="#9AE6B4" stroke-width="4"/>
        <ellipse cx="38" cy="62" rx="12" ry="24" fill="#2D3748" stroke="#1A202C" stroke-width="3"/>
        <ellipse cx="122" cy="62" rx="12" ry="24" fill="#2D3748" stroke="#1A202C" stroke-width="3"/>
        <ellipse cx="80" cy="84" rx="40" ry="34" fill="#FFFFFF" stroke="#1A202C" stroke-width="3.5"/>
      </svg>
    `,

    // 요리 그래픽 백업
    cheese_ramen: `
      <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="66" fill="#FFF5F7" stroke="#FFCCD5" stroke-width="3"/>
        <path d="M22,65 Q70,128 118,65 Z" fill="#FF8EA3" stroke="#4A2E18" stroke-width="3.5"/>
        <ellipse cx="70" cy="65" rx="48" ry="16" fill="#FF922B" stroke="#4A2E18" stroke-width="3"/>
        <path d="M38,62 Q52,50 68,64 Q84,52 100,64" fill="none" stroke="#FFE066" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M44,68 Q60,56 76,70 Q92,58 102,68" fill="none" stroke="#FFE066" stroke-width="4.5" stroke-linecap="round"/>
        <g transform="translate(70, 62) rotate(18)">
          <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#FFD43B" stroke="#F59F00" stroke-width="2"/>
          <circle cx="-6" cy="-6" r="3" fill="#FFF9DB"/>
          <circle cx="8" cy="6" r="2.5" fill="#FFF9DB"/>
        </g>
        <path d="M50,40 Q55,30 50,22" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M70,36 Q75,26 70,18" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M90,40 Q95,30 90,22" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `,
    french_toast: `
      <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="66" fill="#FFF9F0" stroke="#FFE8CC" stroke-width="3"/>
        <ellipse cx="70" cy="80" rx="56" ry="34" fill="#FFFFFF" stroke="#FFA94D" stroke-width="3.5"/>
        <ellipse cx="70" cy="78" rx="46" ry="26" fill="#FFF4E6"/>
        <path d="M40,55 C40,46 52,42 70,42 C88,42 100,46 100,55 L96,92 C96,98 88,102 70,102 C52,102 44,98 44,92 Z" fill="#F59F00" stroke="#744210" stroke-width="3"/>
        <path d="M45,58 C45,50 56,46 70,46 C84,46 95,50 95,58 L91,90 C91,94 84,97 70,97 C56,97 49,94 49,90 Z" fill="#FFE066"/>
        <rect x="62" y="60" width="16" height="14" rx="2" fill="#FFF3BF" stroke="#F59F00" stroke-width="2"/>
        <path d="M60,72 Q64,84 66,74 Q72,88 78,74" fill="none" stroke="#F59F00" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
    strawberry_pancake: `
      <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="66" fill="#FFF0F5" stroke="#FFCCD5" stroke-width="3"/>
        <ellipse cx="70" cy="88" rx="58" ry="28" fill="#FFFFFF" stroke="#FF8EA3" stroke-width="3.5"/>
        <ellipse cx="70" cy="84" rx="42" ry="16" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
        <ellipse cx="70" cy="80" rx="42" ry="15" fill="#FFE066"/>
        <ellipse cx="70" cy="74" rx="38" ry="14" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
        <ellipse cx="70" cy="70" rx="38" ry="13" fill="#FFE066"/>
        <ellipse cx="70" cy="56" rx="20" ry="10" fill="#FFFFFF" stroke="#E9ECEF" stroke-width="2"/>
        <path d="M70,42 C62,42 58,52 70,62 C82,52 78,42 70,42 Z" fill="#FF4D6D" stroke="#C92A2A" stroke-width="1.5"/>
        <circle cx="67" cy="50" r="1" fill="#FFFFFF"/>
        <circle cx="73" cy="52" r="1" fill="#FFFFFF"/>
        <ellipse cx="70" cy="41" rx="4" ry="2" fill="#51CF66"/>
      </svg>
    `,
    strawberry_milk: `
      <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="66" fill="#F0F9FF" stroke="#D0EBFF" stroke-width="3"/>
        <path d="M48,44 L54,106 Q70,114 86,106 L92,44 Z" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5"/>
        <path d="M51,54 L55,103 Q70,110 85,103 L89,54 Q70,58 51,54 Z" fill="#FFB6C1"/>
        <ellipse cx="70" cy="54" rx="19" ry="4" fill="#FF8EA3"/>
        <line x1="78" y1="20" x2="66" y2="80" stroke="#FF6B8B" stroke-width="4" stroke-linecap="round"/>
        <line x1="78" y1="20" x2="88" y2="12" stroke="#FF6B8B" stroke-width="4" stroke-linecap="round"/>
        <path d="M50,42 C44,42 42,50 50,56 C58,50 56,42 50,42 Z" fill="#FF4D6D"/>
      </svg>
    `,
    strawberry_cheese: `
      <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="66" fill="#FFF5F7" stroke="#FFCCD5" stroke-width="3"/>
        <ellipse cx="70" cy="85" rx="55" ry="30" fill="#FFFFFF" stroke="#FF809F" stroke-width="3.5"/>
        <path d="M38,72 L82,54 L102,82 L58,98 Z" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
        <path d="M38,62 L82,44 L102,72 L58,88 Z" fill="#FFF9DB" stroke="#744210" stroke-width="2"/>
        <path d="M38,56 L82,38 L102,66 L58,82 Z" fill="#FF809F" stroke="#E64980" stroke-width="2"/>
        <circle cx="72" cy="52" r="8" fill="#FF4D6D"/>
        <circle cx="68" cy="50" r="1" fill="#FFFFFF"/>
        <circle cx="74" cy="52" r="1" fill="#FFFFFF"/>
      </svg>
    `
  };

  // ================= 3. 사운드 매니저 =================
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
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) this.stopCookingSound();
      return this.isMuted;
    }

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

    playSelect(index = 0) {
      if (this.isMuted) return;
      this.init();
      if (!this.audioCtx) return;

      const baseNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
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

    playCancel() {
      if (this.isMuted) return;
      this.init();
      if (!this.audioCtx) return;

      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, t);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    }

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

    startCookingSound() {
      if (this.isMuted || this.isCookingPlaying) return;
      this.init();
      if (!this.audioCtx) return;

      try {
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
        } catch (e) {}
      }
      this.isCookingPlaying = false;
    }

    playDishReady() {
      if (this.isMuted) return;
      this.init();
      if (!this.audioCtx) return;

      const notes = [659.25, 783.99, 1046.50];
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

    playServeSuccess() {
      if (this.isMuted) return;
      this.init();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
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

  const soundManager = new SoundManager();

  // ================= 4. 파티클 시스템 =================
  class ParticleSystem {
    constructor(containerElement) {
      this.container = containerElement;
    }

    spawnFloatingText(text, x, y, type = 'bonus') {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = `floating-text floating-${type}`;
      el.textContent = text;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      this.container.appendChild(el);
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1500);
    }

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
        const dy = Math.sin(angle) * distance - 30;

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

  // ================= 5. 메인 게임 클래스 =================
  class HelloKittyCookingGame {
    constructor() {
      this.gameState = 'START';
      this.score = 0;
      this.remainingTime = GAME_CONFIG.TOTAL_TIME;
      this.customerIndex = 0;
      this.successfulOrders = 0;

      this.roundGuests = [];
      this.roundRecipes = [];

      this.currentGuest = null;
      this.currentRecipe = null;
      this.orderStartTime = 0;
      this.selectedIngredients = new Set();

      this.gameTimerId = null;
      this.gameStartTime = null;
      this.gameTimeDuration = GAME_CONFIG.TOTAL_TIME * 1000;

      this.cookTimerId = null;
      this.cookStartTime = null;
      this.cookDuration = 0;

      this.burnTimerId = null;
      this.burnStartTime = null;
      this.burnDuration = GAME_CONFIG.BURN_TIME_LIMIT * 1000;

      this.isServingProcessed = false;

      this.initDOMElements();
      this.particles = new ParticleSystem(this.dom.gameScreen);
      this.bindEvents();
      this.renderRecipeBookModal();
      this.renderStartScreenPreviews();
      this.showScreen('start');
    }

    initDOMElements() {
      this.dom = {
        startScreen: document.getElementById('start-screen'),
        gameScreen: document.getElementById('game-screen'),
        resultScreen: document.getElementById('result-screen'),

        btnStartGame: document.getElementById('btn-start-game'),
        btnHowToPlay: document.getElementById('btn-how-to-play'),
        modalHowToPlay: document.getElementById('modal-how-to-play'),
        btnCloseModal: document.getElementById('btn-close-modal'),

        btnRecipeBook: document.getElementById('btn-recipe-book'),
        modalRecipeBook: document.getElementById('modal-recipe-book'),
        btnCloseRecipeBook: document.getElementById('btn-close-recipe-book'),
        recipeBookList: document.getElementById('recipe-book-list'),
        previewDishesContainer: document.getElementById('preview-dishes-container'),

        timerText: document.getElementById('timer-text'),
        timerBar: document.getElementById('timer-gauge-fill'),
        scoreText: document.getElementById('score-text'),
        customerBadge: document.getElementById('customer-progress-badge'),
        btnSoundToggle: document.getElementById('btn-sound-toggle'),

        guestAvatar: document.getElementById('guest-avatar'),
        guestName: document.getElementById('guest-name'),
        speechBubble: document.getElementById('guest-speech-bubble'),
        chefAvatar: document.getElementById('chef-avatar'),
        chefActionLabel: document.getElementById('chef-action-label'),

        stoveDisplay: document.getElementById('stove-display'),
        stoveDishImage: document.getElementById('stove-dish-image'),
        stoveStatusText: document.getElementById('stove-status-text'),
        cookProgressContainer: document.getElementById('cook-progress-container'),
        cookProgressBar: document.getElementById('cook-progress-bar'),
        cookProgressLabel: document.getElementById('cook-progress-label'),
        burnProgressContainer: document.getElementById('burn-progress-container'),
        burnProgressBar: document.getElementById('burn-progress-bar'),
        burnProgressLabel: document.getElementById('burn-progress-label'),

        ingredientsGrid: document.getElementById('ingredients-grid'),
        selectedTray: document.getElementById('selected-tray'),
        btnResetIngredients: document.getElementById('btn-reset-ingredients'),
        btnCook: document.getElementById('btn-cook'),
        btnServe: document.getElementById('btn-serve'),
        btnCookAgain: document.getElementById('btn-cook-again'),

        resultTitle: document.getElementById('result-title'),
        resultSubtext: document.getElementById('result-subtext'),
        resultFinalScore: document.getElementById('result-final-score'),
        resultOrdersCount: document.getElementById('result-orders-count'),
        resultStars: document.getElementById('result-stars'),
        resultCelebration: document.getElementById('result-celebration'),
        btnRestartGame: document.getElementById('btn-restart-game'),
      };
    }

    bindEvents() {
      this.dom.btnStartGame.addEventListener('click', () => {
        soundManager.playClick();
        this.startGame();
      });

      this.dom.btnHowToPlay.addEventListener('click', () => {
        soundManager.playClick();
        this.dom.modalHowToPlay.classList.remove('hidden');
      });

      this.dom.btnCloseModal.addEventListener('click', () => {
        soundManager.playClick();
        this.dom.modalHowToPlay.classList.add('hidden');
      });

      if (this.dom.btnRecipeBook) {
        this.dom.btnRecipeBook.addEventListener('click', () => {
          soundManager.playClick();
          this.dom.modalRecipeBook.classList.remove('hidden');
        });
      }

      if (this.dom.btnCloseRecipeBook) {
        this.dom.btnCloseRecipeBook.addEventListener('click', () => {
          soundManager.playClick();
          this.dom.modalRecipeBook.classList.add('hidden');
        });
      }

      this.dom.btnSoundToggle.addEventListener('click', () => {
        const isMuted = soundManager.toggleMute();
        this.dom.btnSoundToggle.textContent = isMuted ? '🔇' : '🔊';
        this.dom.btnSoundToggle.classList.toggle('muted', isMuted);
      });

      this.dom.btnResetIngredients.addEventListener('click', () => {
        if (this.gameState === 'COOKING') return;
        soundManager.playCancel();
        this.clearSelectedIngredients();
      });

      this.dom.btnCook.addEventListener('click', () => {
        if (this.gameState !== 'ORDERING') return;
        this.handleStartCooking();
      });

      this.dom.btnServe.addEventListener('click', () => {
        if (this.gameState !== 'READY') return;
        this.handleServe();
      });

      this.dom.btnCookAgain.addEventListener('click', () => {
        if (this.gameState !== 'BURNT') return;
        soundManager.playClick();
        this.resetStoveForRetry();
      });

      this.dom.btnRestartGame.addEventListener('click', () => {
        soundManager.playClick();
        this.startGame();
      });

      window.addEventListener('click', () => {
        soundManager.init();
      }, { once: true });
    }

    renderStartScreenPreviews() {
      if (!this.dom.previewDishesContainer) return;
      this.dom.previewDishesContainer.innerHTML = '';
      
      Object.values(RECIPES).forEach(recipe => {
        const ingNames = recipe.ingredients.map(id => {
          const item = INGREDIENTS.find(i => i.id === id);
          return item ? item.name : id;
        }).join('+');

        const el = document.createElement('div');
        el.className = 'dish-badge';
        el.innerHTML = `<span>${recipe.emoji} <strong>${recipe.name}</strong></span> <span class="ing-hint">(${ingNames} ⏱️${recipe.cookTime}s)</span>`;
        this.dom.previewDishesContainer.appendChild(el);
      });
    }

    renderRecipeBookModal() {
      if (!this.dom.recipeBookList) return;
      this.dom.recipeBookList.innerHTML = '';

      Object.values(RECIPES).forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-book-card';

        const ingTags = recipe.ingredients.map(id => {
          const ing = INGREDIENTS.find(i => i.id === id);
          return ing ? `<span class="rec-ing-chip">${ing.emoji} ${ing.name}</span>` : id;
        }).join(' + ');

        card.innerHTML = `
          <div class="rec-card-header">
            <span class="rec-card-title">${recipe.emoji} ${recipe.name}</span>
            <span class="rec-card-time">⏱️ 조리 ${recipe.cookTime}초</span>
          </div>
          <div class="rec-card-ingredients">${ingTags}</div>
          <p class="rec-card-desc">${recipe.description}</p>
        `;

        this.dom.recipeBookList.appendChild(card);
      });
    }

    showScreen(screen) {
      this.dom.startScreen.classList.toggle('hidden', screen !== 'start');
      this.dom.gameScreen.classList.toggle('hidden', screen !== 'game');
      this.dom.resultScreen.classList.toggle('hidden', screen !== 'result');
    }

    startGame() {
      this.stopAllTimers();

      this.gameState = 'ORDERING';
      this.score = 0;
      this.remainingTime = GAME_CONFIG.TOTAL_TIME;
      this.customerIndex = 0;
      this.successfulOrders = 0;
      this.isServingProcessed = false;

      // 1) 랜덤 손님 3명 무작위 추첨 (중복 없이 3명 선택)
      const shuffledGuests = [...CHARACTERS.guests].sort(() => 0.5 - Math.random());
      this.roundGuests = shuffledGuests.slice(0, GAME_CONFIG.MAX_CUSTOMERS);

      // 2) 랜덤 요리 3종 무작위 추첨 (매 판마다 8가지 중 다른 요리가 등장하도록 셔플)
      const recipeKeys = Object.keys(RECIPES);
      const shuffledRecipes = [...recipeKeys].sort(() => 0.5 - Math.random());
      this.roundRecipes = shuffledRecipes.slice(0, GAME_CONFIG.MAX_CUSTOMERS).map(k => RECIPES[k]);

      this.updateHUD();
      this.updateTimerDisplay(60, 100);

      this.renderIngredientsGrid();
      this.clearSelectedIngredients();
      this.renderChef();

      this.showScreen('game');

      this.start60sTimer();
      this.spawnNextCustomer();
    }

    start60sTimer() {
      this.gameStartTime = performance.now();
      this.gameTimeDuration = GAME_CONFIG.TOTAL_TIME * 1000;

      const tick = () => {
        if (this.gameState === 'CLEAR' || this.gameState === 'GAMEOVER') return;

        const elapsed = performance.now() - this.gameStartTime;
        const timeLeftMs = Math.max(0, this.gameTimeDuration - elapsed);
        const remainingSec = Math.ceil(timeLeftMs / 1000);
        const percentage = (timeLeftMs / this.gameTimeDuration) * 100;

        this.remainingTime = remainingSec;
        this.updateTimerDisplay(remainingSec, percentage);

        if (timeLeftMs <= 0) {
          this.handleTimeUp();
          return;
        }

        this.gameTimerId = requestAnimationFrame(tick);
      };

      if (this.gameTimerId) cancelAnimationFrame(this.gameTimerId);
      this.gameTimerId = requestAnimationFrame(tick);
    }

    updateTimerDisplay(seconds, percentage) {
      const formatted = `00:${String(seconds).padStart(2, '0')}`;
      this.dom.timerText.textContent = formatted;
      this.dom.timerBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;

      this.dom.timerText.classList.remove('timer-pink', 'timer-orange', 'timer-red', 'timer-blink');
      this.dom.timerBar.classList.remove('bar-pink', 'bar-orange', 'bar-red');

      if (seconds > 30) {
        this.dom.timerText.classList.add('timer-pink');
        this.dom.timerBar.classList.add('bar-pink');
      } else if (seconds > 10) {
        this.dom.timerText.classList.add('timer-orange');
        this.dom.timerBar.classList.add('bar-orange');
      } else {
        this.dom.timerText.classList.add('timer-red', 'timer-blink');
        this.dom.timerBar.classList.add('bar-red');
      }
    }

    spawnNextCustomer() {
      if (this.customerIndex >= GAME_CONFIG.MAX_CUSTOMERS) {
        this.handleGameClear();
        return;
      }

      this.gameState = 'ORDERING';
      this.isServingProcessed = false;
      this.clearSelectedIngredients();
      this.resetStoveDisplay();

      // 이번 라운드에 무작위로 선택된 손님과 요리
      this.currentGuest = this.roundGuests[this.customerIndex];
      this.currentRecipe = this.roundRecipes[this.customerIndex];
      this.orderStartTime = performance.now();

      const orderSpeech = this.currentGuest.dialogueTemplates
        ? this.currentGuest.dialogueTemplates.order(this.currentRecipe)
        : `맛있는 ${this.currentRecipe.name}을 부탁해! 💕`;

      this.dom.guestName.textContent = this.currentGuest.name;
      this.dom.speechBubble.innerHTML = `
        <div class="speech-quote">${orderSpeech}</div>
        <div class="speech-order-badge">
          <span class="recipe-tag">${this.currentRecipe.emoji} ${this.currentRecipe.name}</span>
          <span class="time-tag">⏱️ 조리 ${this.currentRecipe.cookTime}초</span>
        </div>
      `;

      this.renderGuestAvatar(this.currentGuest);
      this.dom.customerBadge.textContent = `손님 ${this.customerIndex + 1} / ${GAME_CONFIG.MAX_CUSTOMERS}`;

      this.dom.guestAvatar.classList.remove('guest-enter', 'guest-happy');
      void this.dom.guestAvatar.offsetWidth;
      this.dom.guestAvatar.classList.add('guest-enter');

      this.dom.chefActionLabel.textContent = '주문 대기 중... 🎀';
      this.updateActionButtons();
    }

    renderGuestAvatar(guest) {
      this.dom.guestAvatar.innerHTML = '';
      const img = document.createElement('img');
      img.src = guest.image;
      img.alt = guest.name;
      img.className = 'character-img';
      img.onerror = () => {
        this.dom.guestAvatar.innerHTML = SVG_FALLBACKS[guest.svgFallback] || '';
      };
      this.dom.guestAvatar.appendChild(img);
    }

    renderChef() {
      this.dom.chefAvatar.innerHTML = '';
      const img = document.createElement('img');
      img.src = CHARACTERS.chef.image;
      img.alt = CHARACTERS.chef.name;
      img.className = 'chef-img';
      img.onerror = () => {
        this.dom.chefAvatar.innerHTML = SVG_FALLBACKS.hello_kitty;
      };
      this.dom.chefAvatar.appendChild(img);
    }

    renderIngredientsGrid() {
      this.dom.ingredientsGrid.innerHTML = '';

      INGREDIENTS.forEach((ing, index) => {
        const btn = document.createElement('button');
        btn.className = 'ingredient-btn';
        btn.dataset.id = ing.id;
        btn.innerHTML = `
          <span class="ing-emoji">${ing.emoji}</span>
          <span class="ing-name">${ing.name}</span>
        `;

        btn.addEventListener('click', () => {
          if (this.gameState !== 'ORDERING') return;
          this.toggleIngredient(ing.id, index);
        });

        this.dom.ingredientsGrid.appendChild(btn);
      });
    }

    toggleIngredient(ingId, index) {
      if (this.selectedIngredients.has(ingId)) {
        this.selectedIngredients.delete(ingId);
        soundManager.playCancel();
      } else {
        this.selectedIngredients.add(ingId);
        soundManager.playSelect(index);
      }
      this.updateIngredientUI();
    }

    updateIngredientUI() {
      const buttons = this.dom.ingredientsGrid.querySelectorAll('.ingredient-btn');
      buttons.forEach(btn => {
        const id = btn.dataset.id;
        btn.classList.toggle('selected', this.selectedIngredients.has(id));
      });

      this.dom.selectedTray.innerHTML = '';
      if (this.selectedIngredients.size === 0) {
        this.dom.selectedTray.innerHTML = `<span class="empty-tray-tip">재료를 클릭하여 올려놓으세요 ✨</span>`;
      } else {
        this.selectedIngredients.forEach(id => {
          const ing = INGREDIENTS.find(i => i.id === id);
          if (!ing) return;
          const chip = document.createElement('span');
          chip.className = 'selected-chip';
          chip.innerHTML = `${ing.emoji} ${ing.name} <button class="btn-remove-chip" aria-label="제거">×</button>`;

          chip.querySelector('.btn-remove-chip').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.gameState !== 'ORDERING') return;
            this.selectedIngredients.delete(id);
            soundManager.playCancel();
            this.updateIngredientUI();
          });

          this.dom.selectedTray.appendChild(chip);
        });
      }

      this.updateActionButtons();
    }

    clearSelectedIngredients() {
      this.selectedIngredients.clear();
      this.updateIngredientUI();
    }

    handleStartCooking() {
      if (!this.currentRecipe) return;

      const recipeIngredients = [...this.currentRecipe.ingredients].sort();
      const userIngredients = [...this.selectedIngredients].sort();

      const isMatch = (
        recipeIngredients.length === userIngredients.length &&
        recipeIngredients.every((val, idx) => val === userIngredients[idx])
      );

      if (!isMatch) {
        soundManager.playError();
        this.updateScore(-GAME_CONFIG.SCORES.WRONG_RECIPE_PENALTY, '잘못된 재료 조합! (-20점)', this.dom.btnCook);
        this.flashStoveError('앗! 재료 조합이 틀렸어요. 레시피를 다시 확인해줘요! 💦');
        return;
      }

      this.gameState = 'COOKING';
      soundManager.startCookingSound();

      this.dom.stoveStatusText.textContent = `${this.currentRecipe.name} 요리 중... 보글보글!`;
      this.dom.chefActionLabel.textContent = '열심히 요리하는 중! 🍳✨';
      this.dom.chefAvatar.classList.add('chef-cooking');

      this.dom.cookProgressContainer.classList.remove('hidden');
      this.dom.cookProgressBar.style.width = '0%';
      this.dom.cookProgressLabel.textContent = `0.0 / ${this.currentRecipe.cookTime}초`;

      this.updateActionButtons();

      this.cookStartTime = performance.now();
      this.cookDuration = this.currentRecipe.cookTime * 1000;

      const cookTick = () => {
        if (this.gameState !== 'COOKING') return;

        const elapsed = performance.now() - this.cookStartTime;
        const progress = Math.min(1, elapsed / this.cookDuration);
        const remainingSec = Math.max(0, (this.cookDuration - elapsed) / 1000).toFixed(1);

        this.dom.cookProgressBar.style.width = `${progress * 100}%`;
        this.dom.cookProgressLabel.textContent = `남은 조리 시간: ${remainingSec}초`;

        if (progress >= 1) {
          this.handleCookingComplete();
          return;
        }

        this.cookTimerId = requestAnimationFrame(cookTick);
      };

      if (this.cookTimerId) cancelAnimationFrame(this.cookTimerId);
      this.cookTimerId = requestAnimationFrame(cookTick);
    }

    handleCookingComplete() {
      soundManager.stopCookingSound();
      soundManager.playDishReady();

      this.gameState = 'READY';
      this.dom.chefAvatar.classList.remove('chef-cooking');
      this.dom.chefActionLabel.textContent = '요리 완성! 어서 서빙하세요! 💖';

      this.dom.cookProgressContainer.classList.add('hidden');

      this.renderStoveDish(this.currentRecipe);
      this.dom.stoveStatusText.innerHTML = `✨ <strong>${this.currentRecipe.name}</strong> 완성! 타기 전에 서빙하세요! ✨`;

      const rect = this.dom.stoveDisplay.getBoundingClientRect();
      this.particles.burstHeartsAndStars(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);

      this.updateActionButtons();
      this.startBurnCountdown();
    }

    startBurnCountdown() {
      this.burnStartTime = performance.now();
      this.burnDuration = GAME_CONFIG.BURN_TIME_LIMIT * 1000;

      this.dom.burnProgressContainer.classList.remove('hidden');
      this.dom.burnProgressBar.style.width = '100%';

      const burnTick = () => {
        if (this.gameState !== 'READY') return;

        const elapsed = performance.now() - this.burnStartTime;
        const timeLeft = Math.max(0, this.burnDuration - elapsed);
        const ratio = timeLeft / this.burnDuration;
        const secLeft = (timeLeft / 1000).toFixed(1);

        this.dom.burnProgressBar.style.width = `${ratio * 100}%`;
        this.dom.burnProgressLabel.textContent = `🔥 ${secLeft}초 후 요리가 타버려요!`;

        if (timeLeft <= 0) {
          this.handleDishBurned();
          return;
        }

        this.burnTimerId = requestAnimationFrame(burnTick);
      };

      if (this.burnTimerId) cancelAnimationFrame(this.burnTimerId);
      this.burnTimerId = requestAnimationFrame(burnTick);
    }

    handleDishBurned() {
      this.gameState = 'BURNT';
      soundManager.playBurn();

      this.updateScore(-GAME_CONFIG.SCORES.BURN_PENALTY, '요리가 타버렸어요! (-30점)', this.dom.stoveDisplay);

      const rect = this.dom.stoveDisplay.getBoundingClientRect();
      this.particles.spawnSmoke(rect.left + rect.width / 2, rect.top + 40, 10);

      this.renderStoveDish({ id: 'burnt', name: '탄 요리', image: 'public/images/dishes/burnt_dish.png', svgFallback: 'burnt_dish' });
      this.dom.stoveStatusText.innerHTML = `⚠️ <strong>새까맣게 타버렸어요!</strong> 다시 요리해야 해요. 💨`;
      this.dom.burnProgressContainer.classList.add('hidden');
      this.dom.chefActionLabel.textContent = '아이쿠! 요리가 타버렸어요 😿';

      this.updateActionButtons();
    }

    resetStoveForRetry() {
      this.gameState = 'ORDERING';
      this.resetStoveDisplay();
      this.clearSelectedIngredients();
      this.dom.chefActionLabel.textContent = '다시 정성껏 만들어봐요! 🎀';
      this.updateActionButtons();
    }

    handleServe() {
      if (this.gameState !== 'READY') return;
      if (this.isServingProcessed) return;
      this.isServingProcessed = true;

      if (this.burnTimerId) {
        cancelAnimationFrame(this.burnTimerId);
        this.burnTimerId = null;
      }
      this.dom.burnProgressContainer.classList.add('hidden');

      soundManager.playServeSuccess();

      const elapsedSinceOrder = (performance.now() - this.orderStartTime) / 1000;
      const fastBonus = Math.max(10, Math.min(GAME_CONFIG.SCORES.MAX_FAST_SERVE_BONUS, Math.round(60 - elapsedSinceOrder * 2.5)));
      const perfectBonus = GAME_CONFIG.SCORES.PERFECT_COOK;
      const totalGain = GAME_CONFIG.SCORES.CORRECT_SERVE + fastBonus + perfectBonus;

      this.updateScore(totalGain, `성공! +${totalGain}점`, this.dom.btnServe);

      const happySpeech = this.currentGuest.dialogueTemplates
        ? this.currentGuest.dialogueTemplates.happy(this.currentRecipe)
        : `정말 맛있어! 고마워 키티야~ 💕`;

      this.dom.guestAvatar.classList.remove('guest-enter');
      this.dom.guestAvatar.classList.add('guest-happy');
      this.dom.speechBubble.innerHTML = `
        <div class="speech-quote happy">${happySpeech}</div>
        <div class="speech-score-tag">💖 만족도 최고! (+${totalGain}점)</div>
      `;

      const guestRect = this.dom.guestAvatar.getBoundingClientRect();
      this.particles.burstHeartsAndStars(guestRect.left + guestRect.width / 2, guestRect.top + guestRect.height / 2, 22);

      this.successfulOrders++;
      this.dom.chefActionLabel.textContent = '손님이 아주 좋아해요! 💕';

      setTimeout(() => {
        if (this.gameState === 'GAMEOVER') return;
        this.customerIndex++;
        this.spawnNextCustomer();
      }, 1800);
    }

    updateScore(delta, reason, sourceElement = null) {
      this.score = Math.max(0, this.score + delta);
      this.dom.scoreText.textContent = `${this.score}점`;

      this.dom.scoreText.classList.remove('score-pulse');
      void this.dom.scoreText.offsetWidth;
      this.dom.scoreText.classList.add('score-pulse');

      if (sourceElement) {
        const rect = sourceElement.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        const type = delta > 0 ? 'bonus' : 'penalty';
        const prefix = delta > 0 ? `+${delta}` : `${delta}`;
        this.particles.spawnFloatingText(`${prefix}점!`, x, y, type);
      }
    }

    renderStoveDish(recipe) {
      this.dom.stoveDishImage.innerHTML = '';
      if (recipe.image) {
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.name;
        img.className = 'cooked-dish-img';
        img.onerror = () => {
          if (SVG_FALLBACKS[recipe.svgFallback]) {
            this.dom.stoveDishImage.innerHTML = SVG_FALLBACKS[recipe.svgFallback];
          }
        };
        this.dom.stoveDishImage.appendChild(img);
      } else if (SVG_FALLBACKS[recipe.svgFallback]) {
        this.dom.stoveDishImage.innerHTML = SVG_FALLBACKS[recipe.svgFallback];
      } else {
        this.dom.stoveDishImage.innerHTML = `<span style="font-size: 50px;">${recipe.emoji || '🍽️'}</span>`;
      }
    }

    resetStoveDisplay() {
      this.dom.stoveDishImage.innerHTML = `
        <div class="empty-pan">
          <span class="pan-emoji">🍳</span>
          <span class="pan-tip">조리대가 비어있어요</span>
        </div>
      `;
      this.dom.stoveStatusText.textContent = '재료를 선택한 후 조리 시작을 눌러주세요.';
      this.dom.cookProgressContainer.classList.add('hidden');
      this.dom.burnProgressContainer.classList.add('hidden');
    }

    flashStoveError(message) {
      const originalText = this.dom.stoveStatusText.textContent;
      this.dom.stoveStatusText.innerHTML = `<span class="error-msg">❌ ${message}</span>`;
      this.dom.stoveDisplay.classList.add('shake-error');

      setTimeout(() => {
        this.dom.stoveDisplay.classList.remove('shake-error');
        if (this.gameState === 'ORDERING') {
          this.dom.stoveStatusText.textContent = originalText;
        }
      }, 1500);
    }

    updateActionButtons() {
      const isOrdering = this.gameState === 'ORDERING';
      const isCooking = this.gameState === 'COOKING';
      const isReady = this.gameState === 'READY';
      const isBurnt = this.gameState === 'BURNT';

      const ingButtons = this.dom.ingredientsGrid.querySelectorAll('.ingredient-btn');
      ingButtons.forEach(btn => btn.disabled = !isOrdering);
      this.dom.btnResetIngredients.disabled = !isOrdering || this.selectedIngredients.size === 0;

      this.dom.btnCook.classList.toggle('hidden', !isOrdering && !isCooking);
      this.dom.btnCook.disabled = isCooking || this.selectedIngredients.size === 0;
      this.dom.btnCook.textContent = isCooking ? '조리 중...' : '🎀 조리 시작';

      this.dom.btnServe.classList.toggle('hidden', !isReady);
      this.dom.btnServe.disabled = !isReady || this.isServingProcessed;

      this.dom.btnCookAgain.classList.toggle('hidden', !isBurnt);
    }

    updateHUD() {
      this.dom.scoreText.textContent = `${this.score}점`;
      this.dom.customerBadge.textContent = `손님 ${Math.min(3, this.customerIndex + 1)} / ${GAME_CONFIG.MAX_CUSTOMERS}`;
    }

    stopAllTimers() {
      if (this.gameTimerId) {
        cancelAnimationFrame(this.gameTimerId);
        this.gameTimerId = null;
      }
      if (this.cookTimerId) {
        cancelAnimationFrame(this.cookTimerId);
        this.cookTimerId = null;
      }
      if (this.burnTimerId) {
        cancelAnimationFrame(this.burnTimerId);
        this.burnTimerId = null;
      }
      soundManager.stopCookingSound();
    }

    handleGameClear() {
      this.gameState = 'CLEAR';
      this.stopAllTimers();
      soundManager.playGameClear();

      this.dom.resultTitle.textContent = '🎉 축하합니다! 완벽 클리어! 🎀';
      this.dom.resultSubtext.textContent = '산리오 친구들 3명의 주문을 모두 맛있게 완성했어요!';
      this.dom.resultFinalScore.textContent = `${this.score}점`;
      this.dom.resultOrdersCount.textContent = `3 / 3 (완벽 달성!)`;

      this.renderResultStars(3);

      this.dom.resultCelebration.innerHTML = `
        <div class="celebration-friends">
          <img src="public/images/characters/hello_kitty_chef.png" alt="헬로키티" class="celebrate-avatar">
          <img src="public/images/characters/cinnamoroll.png" alt="시나모롤" class="celebrate-avatar">
          <img src="public/images/characters/my_melody.png" alt="마이멜로디" class="celebrate-avatar">
          <img src="public/images/characters/kuromi.png" alt="쿠로미" class="celebrate-avatar">
        </div>
        <p class="celebrate-praise">"키티야, 달콤한 주방의 최고 셰프 인증서 수여 완료! 💖"</p>
      `;

      this.particles.launchConfetti(4000);
      this.showScreen('result');
    }

    handleTimeUp() {
      this.gameState = 'GAMEOVER';
      this.stopAllTimers();
      soundManager.playGameOver();

      this.dom.resultTitle.textContent = '⏰ 시간 종료!';
      this.dom.resultSubtext.textContent = '60초가 모두 지났어요! 아쉽지만 다음엔 더 빠르게 요리해봐요!';
      this.dom.resultFinalScore.textContent = `${this.score}점`;
      this.dom.resultOrdersCount.textContent = `${this.successfulOrders} / 3`;

      let stars = 1;
      if (this.successfulOrders >= 2 && this.score >= 200) stars = 2;
      if (this.successfulOrders === 3) stars = 3;
      if (this.successfulOrders === 0) stars = 0;

      this.renderResultStars(stars);

      this.dom.resultCelebration.innerHTML = `
        <div class="celebration-friends">
          <img src="public/images/characters/hello_kitty_chef.png" alt="헬로키티" class="celebrate-avatar">
        </div>
        <p class="celebrate-praise">"다음엔 꼭 3명의 친구들에게 모두 맛있는 요리를 전해줄 수 있을 거예요! 🍰"</p>
      `;

      this.showScreen('result');
    }

    renderResultStars(count) {
      this.dom.resultStars.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const star = document.createElement('span');
        star.className = `star-icon ${i <= count ? 'active' : 'inactive'}`;
        star.textContent = i <= count ? '⭐' : '☆';
        this.dom.resultStars.appendChild(star);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.helloKittyGame = new HelloKittyCookingGame();
    });
  } else {
    window.helloKittyGame = new HelloKittyCookingGame();
  }
})();
