/**
 * 「헬로키티의 달콤한 주방」 - 게임 마스터 데이터 (다양한 요리 & 랜덤 시스템 확장)
 */

export const RECIPES = {
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

export const INGREDIENTS = [
  { id: 'noodle', name: '면', emoji: '🍜', color: '#FFF3BF', iconBg: '#FFF9DB' },
  { id: 'egg', name: '계란', emoji: '🥚', color: '#FFE066', iconBg: '#FFF3BF' },
  { id: 'water', name: '물', emoji: '💧', color: '#A5D8FF', iconBg: '#E7F5FF' },
  { id: 'oil', name: '기름', emoji: '🫗', color: '#FFD43B', iconBg: '#FFF3BF' },
  { id: 'bread', name: '빵', emoji: '🍞', color: '#FFA94D', iconBg: '#FFE8CC' },
  { id: 'cheese', name: '치즈', emoji: '🧀', color: '#FFC078', iconBg: '#FFF4E6' },
  { id: 'milk', name: '우유', emoji: '🥛', color: '#EBF8FF', iconBg: '#F0F9FF' },
  { id: 'strawberry', name: '딸기', emoji: '🍓', color: '#FFA8A8', iconBg: '#FFF5F5' }
];

export const CHARACTERS = {
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

export const GAME_CONFIG = {
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
