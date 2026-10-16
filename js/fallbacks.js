/**
 * 「헬로키티의 달콤한 주방」 - 인라인 SVG 캐릭터 및 요리 그래픽 백업
 */

export const SVG_FALLBACKS = {
  // --- 캐릭터 ---
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

  // --- 확장 요리 SVG 그래픽 ---
  cheese_ramen: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#FFF5F7" stroke="#FFCCD5" stroke-width="3"/>
      <!-- Pink Cute Bowl -->
      <path d="M22,65 Q70,128 118,65 Z" fill="#FF8EA3" stroke="#4A2E18" stroke-width="3.5"/>
      <ellipse cx="70" cy="65" rx="48" ry="16" fill="#FF922B" stroke="#4A2E18" stroke-width="3"/>
      <!-- Noodle strands -->
      <path d="M38,62 Q52,50 68,64 Q84,52 100,64" fill="none" stroke="#FFE066" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M44,68 Q60,56 76,70 Q92,58 102,68" fill="none" stroke="#FFE066" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Melted Square Cheese -->
      <g transform="translate(70, 62) rotate(18)">
        <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#FFD43B" stroke="#F59F00" stroke-width="2"/>
        <circle cx="-6" cy="-6" r="3" fill="#FFF9DB"/>
        <circle cx="8" cy="6" r="2.5" fill="#FFF9DB"/>
      </g>
      <!-- Steam -->
      <path d="M50,40 Q55,30 50,22" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M70,36 Q75,26 70,18" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M90,40 Q95,30 90,22" fill="none" stroke="#FFA8A8" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  french_toast: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#FFF9F0" stroke="#FFE8CC" stroke-width="3"/>
      <!-- Plate -->
      <ellipse cx="70" cy="80" rx="56" ry="34" fill="#FFFFFF" stroke="#FFA94D" stroke-width="3.5"/>
      <ellipse cx="70" cy="78" rx="46" ry="26" fill="#FFF4E6"/>
      <!-- Golden Toast Slice -->
      <path d="M40,55 C40,46 52,42 70,42 C88,42 100,46 100,55 L96,92 C96,98 88,102 70,102 C52,102 44,98 44,92 Z" fill="#F59F00" stroke="#744210" stroke-width="3"/>
      <path d="M45,58 C45,50 56,46 70,46 C84,46 95,50 95,58 L91,90 C91,94 84,97 70,97 C56,97 49,94 49,90 Z" fill="#FFE066"/>
      <!-- Butter Cube -->
      <rect x="62" y="60" width="16" height="14" rx="2" fill="#FFF3BF" stroke="#F59F00" stroke-width="2"/>
      <!-- Dripping Honey -->
      <path d="M60,72 Q64,84 66,74 Q72,88 78,74" fill="none" stroke="#F59F00" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  strawberry_pancake: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#FFF0F5" stroke="#FFCCD5" stroke-width="3"/>
      <!-- Plate -->
      <ellipse cx="70" cy="88" rx="58" ry="28" fill="#FFFFFF" stroke="#FF8EA3" stroke-width="3.5"/>
      <!-- Bottom Pancake -->
      <ellipse cx="70" cy="84" rx="42" ry="16" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
      <ellipse cx="70" cy="80" rx="42" ry="15" fill="#FFE066"/>
      <!-- Middle Pancake -->
      <ellipse cx="70" cy="74" rx="38" ry="14" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
      <ellipse cx="70" cy="70" rx="38" ry="13" fill="#FFE066"/>
      <!-- Top Whipped Cream -->
      <ellipse cx="70" cy="56" rx="20" ry="10" fill="#FFFFFF" stroke="#E9ECEF" stroke-width="2"/>
      <!-- Strawberry on Top -->
      <path d="M70,42 C62,42 58,52 70,62 C82,52 78,42 70,42 Z" fill="#FF4D6D" stroke="#C92A2A" stroke-width="1.5"/>
      <circle cx="67" cy="50" r="1" fill="#FFFFFF"/>
      <circle cx="73" cy="52" r="1" fill="#FFFFFF"/>
      <!-- Leaves -->
      <ellipse cx="70" cy="41" rx="4" ry="2" fill="#51CF66"/>
    </svg>
  `,

  strawberry_milk: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#F0F9FF" stroke="#D0EBFF" stroke-width="3"/>
      <!-- Cute Glass -->
      <path d="M48,44 L54,106 Q70,114 86,106 L92,44 Z" fill="#FFFFFF" stroke="#4A2E18" stroke-width="3.5"/>
      <!-- Pink Strawberry Milk -->
      <path d="M51,54 L55,103 Q70,110 85,103 L89,54 Q70,58 51,54 Z" fill="#FFB6C1"/>
      <ellipse cx="70" cy="54" rx="19" ry="4" fill="#FF8EA3"/>
      <!-- Ribbon Straw -->
      <line x1="78" y1="20" x2="66" y2="80" stroke="#FF6B8B" stroke-width="4" stroke-linecap="round"/>
      <line x1="78" y1="20" x2="88" y2="12" stroke="#FF6B8B" stroke-width="4" stroke-linecap="round"/>
      <!-- Strawberry Garnish on glass rim -->
      <path d="M50,42 C44,42 42,50 50,56 C58,50 56,42 50,42 Z" fill="#FF4D6D"/>
    </svg>
  `,

  strawberry_cheese: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="66" fill="#FFF5F7" stroke="#FFCCD5" stroke-width="3"/>
      <!-- Scalloped Plate -->
      <ellipse cx="70" cy="85" rx="55" ry="30" fill="#FFFFFF" stroke="#FF809F" stroke-width="3.5"/>
      <!-- Cake Base Crust -->
      <path d="M38,72 L82,54 L102,82 L58,98 Z" fill="#FFA94D" stroke="#744210" stroke-width="2.5"/>
      <!-- Cream Cheese Layer -->
      <path d="M38,62 L82,44 L102,72 L58,88 Z" fill="#FFF9DB" stroke="#744210" stroke-width="2"/>
      <!-- Pink Strawberry Glaze Top -->
      <path d="M38,56 L82,38 L102,66 L58,82 Z" fill="#FF809F" stroke="#E64980" stroke-width="2"/>
      <!-- Strawberry on Top -->
      <circle cx="72" cy="52" r="8" fill="#FF4D6D"/>
      <circle cx="68" cy="50" r="1" fill="#FFFFFF"/>
      <circle cx="74" cy="52" r="1" fill="#FFFFFF"/>
    </svg>
  `
};
