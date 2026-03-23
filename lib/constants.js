// ═══════════════════════════════════════════════
// SELENE — Constants & Reading Catalog
// ═══════════════════════════════════════════════

// ── Design Tokens (complement Tailwind) ──
export const COLORS = {
  gold: '#C9A84C',
  teal: '#5B9E8F',
  blue: '#4A6FA5',
  purple: '#7B68AE',
  rose: '#C97B8B',
  success: '#5BB88F',
};

// ── Reading Catalog ──
export const READINGS = [
  {
    id: 'lectura-express',
    title: 'Lectura Express',
    subtitle: 'Una primera mirada a tu energía del momento',
    price: 0,
    price_label: 'GRATIS',
    price_cents: 0,
    requires_account: false,
    icon: '⚡',
    color: COLORS.success,
    tag: 'Email',
    description: 'Recibe una lectura breve directamente en tu correo. Tu primer contacto con Selene.',
    category: 'free',
  },
  {
    id: 'carta-basica',
    title: 'Carta Astral Básica',
    subtitle: 'Sol, Luna y Ascendente — tu triángulo esencial',
    price: 0,
    price_label: 'GRATIS',
    price_cents: 0,
    requires_account: true,
    icon: '☉',
    color: COLORS.teal,
    tag: 'Con cuenta',
    description: 'Descubre las tres posiciones más importantes de tu carta natal. Incluida con tu cuenta gratuita.',
    category: 'free',
  },
  {
    id: 'carta-completa',
    title: 'Carta Astral Completa',
    subtitle: 'Todos los planetas, casas y aspectos principales',
    price: 799,
    price_label: '€7,99',
    price_cents: 799,
    requires_account: true,
    icon: '🌙',
    color: COLORS.blue,
    tag: 'Popular',
    description: 'Tu carta natal al completo: planetas personales, sociales y transpersonales. Casas, aspectos y patrones dominantes.',
    category: 'premium',
  },
  {
    id: 'carta-premium',
    title: 'Carta Astral Premium',
    subtitle: 'Carta completa + tránsitos actuales + guía personalizada',
    price: 1499,
    price_label: '€14,99',
    price_cents: 1499,
    requires_account: true,
    icon: '✦',
    color: COLORS.gold,
    tag: 'Premium',
    description: 'La experiencia más profunda. Tu carta natal completa, los tránsitos del momento y una guía personalizada para los próximos meses.',
    category: 'premium',
  },
  {
    id: 'compatibilidad',
    title: 'Compatibilidad',
    subtitle: 'Sinastría entre dos cartas natales',
    price: 999,
    price_label: '€9,99',
    price_cents: 999,
    requires_account: true,
    icon: '💫',
    color: COLORS.rose,
    tag: 'Parejas',
    description: 'Descubre la dinámica energética entre dos personas. Aspectos armónicos, tensiones y claves para una conexión más profunda.',
    category: 'premium',
  },
  {
    id: 'tarot-profunda',
    title: 'Tarot Profunda',
    subtitle: 'Tirada completa con interpretación detallada',
    price: 199,
    price_label: '€1,99',
    price_cents: 199,
    requires_account: true,
    icon: '✨',
    color: COLORS.purple,
    tag: 'Nuevo',
    description: 'Una tirada de tarot completa con interpretación profunda. Pasado, presente y futuro de tu consulta.',
    category: 'premium',
  },
  {
    id: 'quirologia',
    title: 'Quirología Completa',
    subtitle: 'Lectura de líneas y montes de tu mano',
    price: 149,
    price_label: '€1,49',
    price_cents: 149,
    requires_account: true,
    icon: '🤚',
    color: COLORS.teal,
    tag: 'Nuevo',
    description: 'Sube una foto de tu mano y recibe un análisis detallado de líneas principales, montes y marcas especiales.',
    category: 'premium',
  },
  {
    id: 'suenos',
    title: 'Interpretación de Sueños',
    subtitle: 'Descifra el lenguaje de tu inconsciente',
    price: 199,
    price_label: '€1,99',
    price_cents: 199,
    requires_account: true,
    icon: '💤',
    color: COLORS.blue,
    tag: 'Nuevo',
    description: 'Describe tu sueño y recibe una interpretación basada en simbología arquetípica y psicología junguiana.',
    category: 'premium',
  },
];

// ── Cross-sell Rules ──
export const CROSS_SELL_RULES = [
  {
    from: 'carta-basica',
    to: 'carta-completa',
    to_type: 'reading',
    message: 'Descubre todos los planetas en tu carta',
    icon: '🌙',
  },
  {
    from: 'carta-completa',
    to: 'compatibilidad',
    to_type: 'reading',
    message: 'Descubre tu compatibilidad con alguien especial',
    icon: '💫',
  },
  {
    from: 'tarot-profunda',
    to: 'tarot-intuitivo',
    to_type: 'course',
    message: 'Aprende a leer tarot — curso completo',
    icon: '✨',
    url: 'https://academia.selenaura.com/curso/tarot-intuitivo',
  },
  {
    from: '*',
    to: 'brujula-interior',
    to_type: 'course',
    message: 'Empieza tu viaje formativo — curso gratuito',
    icon: '🌟',
    url: 'https://academia.selenaura.com/curso/brujula-interior',
  },
];

/**
 * Get cross-sell recommendations based on reading history.
 */
export function getCrossSellRecommendations(readingTypes = []) {
  const recommendations = [];

  for (const rule of CROSS_SELL_RULES) {
    if (rule.from === '*' || readingTypes.includes(rule.from)) {
      // Don't recommend something user already has
      if (!readingTypes.includes(rule.to)) {
        recommendations.push(rule);
      }
    }
  }

  return recommendations.slice(0, 3);
}

/**
 * Get a reading by ID.
 */
export function getReading(id) {
  return READINGS.find(r => r.id === id) || null;
}
