// ═══════════════════════════════════════════════
// SELENE — Zodiac Utilities
// ═══════════════════════════════════════════════

export const ZODIAC_SIGNS = [
  {
    name: 'Aries',
    emoji: '\u2648',
    element: 'Fuego',
    startMonth: 3, startDay: 21,
    endMonth: 4, endDay: 19,
    description: 'Energía pionera, valentía y espíritu de iniciativa. Tu fuego interior te impulsa a liderar y explorar nuevos caminos.',
  },
  {
    name: 'Tauro',
    emoji: '\u2649',
    element: 'Tierra',
    startMonth: 4, startDay: 20,
    endMonth: 5, endDay: 20,
    description: 'Estabilidad, sensualidad y conexión con lo tangible. Tu naturaleza terrestre te ancla en el placer y la perseverancia.',
  },
  {
    name: 'Géminis',
    emoji: '\u264A',
    element: 'Aire',
    startMonth: 5, startDay: 21,
    endMonth: 6, endDay: 20,
    description: 'Curiosidad, comunicación y versatilidad. Tu mente ágil conecta ideas y personas con facilidad natural.',
  },
  {
    name: 'Cáncer',
    emoji: '\u264B',
    element: 'Agua',
    startMonth: 6, startDay: 21,
    endMonth: 7, endDay: 22,
    description: 'Intuición profunda, nutrición emocional y protección. Tu sensibilidad es tu mayor fortaleza.',
  },
  {
    name: 'Leo',
    emoji: '\u264C',
    element: 'Fuego',
    startMonth: 7, startDay: 23,
    endMonth: 8, endDay: 22,
    description: 'Creatividad, generosidad y presencia magnética. Tu luz interior ilumina a quienes te rodean.',
  },
  {
    name: 'Virgo',
    emoji: '\u264D',
    element: 'Tierra',
    startMonth: 8, startDay: 23,
    endMonth: 9, endDay: 22,
    description: 'Análisis, servicio y perfeccionamiento. Tu capacidad de observación revela patrones que otros no ven.',
  },
  {
    name: 'Libra',
    emoji: '\u264E',
    element: 'Aire',
    startMonth: 9, startDay: 23,
    endMonth: 10, endDay: 22,
    description: 'Armonía, justicia y belleza. Tu búsqueda de equilibrio crea espacios de paz y entendimiento.',
  },
  {
    name: 'Escorpio',
    emoji: '\u264F',
    element: 'Agua',
    startMonth: 10, startDay: 23,
    endMonth: 11, endDay: 21,
    description: 'Transformación, intensidad y poder regenerativo. Tu profundidad emocional te permite renacer una y otra vez.',
  },
  {
    name: 'Sagitario',
    emoji: '\u2650',
    element: 'Fuego',
    startMonth: 11, startDay: 22,
    endMonth: 12, endDay: 21,
    description: 'Expansión, sabiduría y aventura. Tu espíritu libre busca el sentido profundo de la existencia.',
  },
  {
    name: 'Capricornio',
    emoji: '\u2651',
    element: 'Tierra',
    startMonth: 12, startDay: 22,
    endMonth: 1, endDay: 19,
    description: 'Disciplina, ambición y maestría. Tu determinación construye legados que perduran en el tiempo.',
  },
  {
    name: 'Acuario',
    emoji: '\u2652',
    element: 'Aire',
    startMonth: 1, startDay: 20,
    endMonth: 2, endDay: 18,
    description: 'Innovación, humanitarismo y visión de futuro. Tu originalidad abre caminos que otros seguirán.',
  },
  {
    name: 'Piscis',
    emoji: '\u2653',
    element: 'Agua',
    startMonth: 2, startDay: 19,
    endMonth: 3, endDay: 20,
    description: 'Empatía, espiritualidad y conexión universal. Tu sensibilidad te conecta con dimensiones que trascienden lo visible.',
  },
];

/**
 * Returns the Spanish zodiac sign name for a given date string (YYYY-MM-DD).
 */
export function getSunSign(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString + 'T12:00:00');
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  const sign = ZODIAC_SIGNS.find(s => {
    // Handle Capricorn which spans year boundary
    if (s.startMonth > s.endMonth) {
      return (month === s.startMonth && day >= s.startDay) ||
             (month === s.endMonth && day <= s.endDay);
    }
    return (month === s.startMonth && day >= s.startDay) ||
           (month === s.endMonth && day <= s.endDay);
  });

  return sign || null;
}

/**
 * Returns the full sign object with emoji, element, and description.
 */
export function getSunSignDetails(dateString) {
  const sign = getSunSign(dateString);
  if (!sign) return null;
  return {
    name: sign.name,
    emoji: sign.emoji,
    element: sign.element,
    description: sign.description,
  };
}
