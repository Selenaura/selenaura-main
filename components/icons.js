// ═══════════════════════════════════════════════
// SELENE — Custom SVG Icon Library
// Stroke-only, thin-line, premium cosmic aesthetic
// ═══════════════════════════════════════════════

// 1. IconSun — circle with 8 short rays
export function IconSun({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// 2. IconMoon — crescent moon
export function IconMoon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

// 3. IconRising — arrow pointing up with horizon line
export function IconRising({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="2" y1="18" x2="22" y2="18" />
      <polyline points="12,4 12,14" />
      <polyline points="8,8 12,4 16,8" />
    </svg>
  );
}

// 4. IconStar — 5-point star outline
export function IconStar({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

// 5. IconConstellation — 3 dots connected by lines
export function IconConstellation({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="19" cy="14" r="1.5" />
      <line x1="6.2" y1="16.8" x2="10.8" y2="7.2" />
      <line x1="13.2" y1="7.2" x2="17.8" y2="12.8" />
    </svg>
  );
}

// 6. IconCompass — compass rose simple
export function IconCompass({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  );
}

// 7. IconFlame — flame shape
export function IconFlame({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c0 4-4 6-4 10a4 4 0 108 0c0-4-4-6-4-10z" />
      <path d="M12 22c-1.5 0-2.5-1-2.5-2.5 0-2 2.5-3.5 2.5-3.5s2.5 1.5 2.5 3.5c0 1.5-1 2.5-2.5 2.5z" />
    </svg>
  );
}

// 8. IconLeaf — leaf shape
export function IconLeaf({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 20 4 20 4s-1 4.5-3 10.1A7 7 0 0111 20z" />
      <path d="M5 21l6-6" />
    </svg>
  );
}

// 9. IconWind — wavy horizontal lines
export function IconWind({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.7 7.7A2.5 2.5 0 1019 10H2" />
      <path d="M9.6 4.6A2 2 0 1111 7H2" />
      <path d="M12.6 19.4A2 2 0 1014 17H2" />
    </svg>
  );
}

// 10. IconWater — wave shape
export function IconWater({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  );
}

// 11. IconEclipse — circle with smaller circle overlapping
export function IconEclipse({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 12a7 7 0 01-7 7 7 7 0 010-14" />
    </svg>
  );
}

// 12. IconRetrograde — circular arrow going backwards
export function IconRetrograde({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 14l-4-4 4-4" />
      <path d="M5 10a7 7 0 1 1 .5 5" />
    </svg>
  );
}

// 13. IconConjunction — two circles touching/overlapping
export function IconConjunction({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  );
}

// 14. IconMeteor — diagonal line with small trail
export function IconMeteor({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20L18 4" />
      <path d="M10 6l2-2" />
      <path d="M14 4l1-1" />
      <circle cx="6" cy="18" r="3" />
    </svg>
  );
}

// 15. IconSeason — sun half above horizon line
export function IconSeason({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="2" y1="16" x2="22" y2="16" />
      <path d="M12 16a6 6 0 110-12 6 6 0 010 12z" clipPath="url(#season-clip)" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="5.64" y1="5.64" x2="7.05" y2="7.05" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="16.95" y1="7.05" x2="18.36" y2="5.64" />
    </svg>
  );
}

// 16. IconTransit — arrow curving through a circle
export function IconTransit({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="6" />
      <path d="M2 12c3-5 7-5 10 0s7 5 10 0" />
      <polyline points="19,8 22,12 19,16" />
    </svg>
  );
}

// 17. IconCalendar — simple calendar outline
export function IconCalendar({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// 18. IconHeart — heart outline
export function IconHeart({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

// 19. IconBriefcase — briefcase outline
export function IconBriefcase({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  );
}

// 20. IconPalette — palette shape
export function IconPalette({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a10 10 0 00-6.88 17.23c1.24 1.17 3.24.37 3.38-1.23.1-1.1.9-2 2-2h2a10 10 0 000-14z" />
      <circle cx="7.5" cy="10" r="1" />
      <circle cx="12" cy="7" r="1" />
      <circle cx="16.5" cy="10" r="1" />
    </svg>
  );
}

// 21. IconLotus — lotus flower simple
export function IconLotus({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20c-4 0-7-3-7-7 0-3 3-6 7-11 4 5 7 8 7 11 0 4-3 7-7 7z" />
      <path d="M4 15c1-3 4-5 8-5" />
      <path d="M20 15c-1-3-4-5-8-5" />
    </svg>
  );
}

// 22. IconPeople — two people outline
export function IconPeople({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

// 23. IconBrain — brain outline simplified
export function IconBrain({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a5 5 0 00-4.6 3A4 4 0 003 9a4 4 0 001.2 7A5 5 0 0012 22" />
      <path d="M12 2a5 5 0 014.6 3A4 4 0 0121 9a4 4 0 01-1.2 7A5 5 0 0112 22" />
      <path d="M12 2v20" />
    </svg>
  );
}

// 24. IconTarot — rectangle with star inside
export function IconTarot({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <polygon points="12,7 13.5,10.5 17,11 14.5,13.5 15,17 12,15.5 9,17 9.5,13.5 7,11 10.5,10.5" />
    </svg>
  );
}

// 25. IconDream — cloud with moon inside
export function IconDream({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25" />
      <path d="M15 12a4 4 0 01-4-4 3 3 0 004 4z" />
    </svg>
  );
}

// 26. IconBook — open book
export function IconBook({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

// 27. IconPen — pen/quill
export function IconPen({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// 28. IconCheck — checkmark
export function IconCheck({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

// 29. IconX — X mark
export function IconX({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// 30. IconArrowRight — simple arrow right
export function IconArrowRight({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

// 31. IconHome — house outline
export function IconHome({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

// 32. IconUser — person outline
export function IconUser({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// 33. IconSparkle — 4-point sparkle/diamond
export function IconSparkle({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

// ── Utility: Map event type to icon component ──
export function getEventIcon(type) {
  const map = {
    eclipse_solar: IconEclipse,
    eclipse_lunar: IconEclipse,
    luna_nueva: IconMoon,
    luna_llena: IconMoon,
    retrogrado: IconRetrograde,
    conjuncion: IconConjunction,
    lluvia_meteoros: IconMeteor,
    equinoccio: IconSeason,
    solsticio: IconSeason,
    transito: IconTransit,
  };
  return map[type] || IconStar;
}

// ── Utility: Map reading type to icon component ──
export function getReadingIcon(readingType) {
  const map = {
    'lectura-express': IconSparkle,
    'carta-basica': IconSun,
    'carta-completa': IconMoon,
    'carta-premium': IconStar,
    'compatibilidad': IconConjunction,
    'tarot-profunda': IconTarot,
    'quirologia': IconPen,
    'suenos': IconDream,
  };
  return map[readingType] || IconStar;
}
