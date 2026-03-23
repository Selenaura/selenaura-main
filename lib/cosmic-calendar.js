// ══════════════════════════════════════════════
// SELENE — Cosmic Calendar 2026
// Real astronomical + astrological events
// Sources: NASA, Sea and Sky, Cafe Astrology, CHANI
// ══════════════════════════════════════════════

export const COSMIC_EVENTS = [
  // ── Marzo 2026 ──
  { date: '2026-03-03', emoji: '🌕', title: 'Luna Llena del Gusano', subtitle: 'Eclipse Lunar Total', desc: 'La Luna se tiñe de rojo. Eclipse total visible desde América y Asia Oriental. Momento de culminaciones y revelaciones profundas.', type: 'eclipse', impact: 'alto' },
  { date: '2026-03-08', emoji: '♀', title: 'Conjunción Venus-Saturno', subtitle: 'En Piscis', desc: 'Venus y Saturno se encuentran en Piscis. El amor pide estructura. Buen momento para compromisos serios o para evaluar qué relaciones merecen tu energía.', type: 'conjuncion', impact: 'medio' },
  { date: '2026-03-18', emoji: '🌑', title: 'Luna Nueva en Piscis', subtitle: 'Nuevos comienzos emocionales', desc: 'La Luna Nueva en el último signo del zodiaco invita a soltar lo que ya cumplió su ciclo. Ideal para rituales de cierre y nuevas intenciones espirituales.', type: 'luna', impact: 'medio' },
  { date: '2026-03-20', emoji: '🌸', title: 'Equinoccio de Primavera', subtitle: 'El Sol entra en Aries', desc: 'Día y noche duran exactamente lo mismo. El equinoccio marca el Año Nuevo astrológico — el punto cero del zodiaco. La naturaleza despierta y tu energía también.', type: 'estacion', impact: 'alto' },
  { date: '2026-03-20', emoji: '☿', title: 'Mercurio Directo', subtitle: 'Fin del retrógrado en Piscis', desc: 'Mercurio retoma su marcha directa después de 3 semanas en Piscis. La comunicación se aclara, los malentendidos se resuelven. Buen momento para firmar y decidir.', type: 'retrogrado', impact: 'medio' },

  // ── Abril 2026 ──
  { date: '2026-04-01', emoji: '🌕', title: 'Luna Llena Rosa', subtitle: 'En Libra', desc: 'La Luna Llena en Libra ilumina tus relaciones. Lo que sembraste en pareja, amistades o colaboraciones muestra resultados. Equilibrio entre dar y recibir.', type: 'luna', impact: 'medio' },
  { date: '2026-04-17', emoji: '🌑', title: 'Luna Nueva en Aries', subtitle: 'Impulso de fuego', desc: 'La Luna Nueva en Aries enciende la chispa de nuevos proyectos. Es el mejor momento del año para iniciar algo audaz. Tu determinación está en su punto más alto.', type: 'luna', impact: 'medio' },
  { date: '2026-04-22', emoji: '☄️', title: 'Lluvia de Líridas', subtitle: 'Meteoros visibles', desc: 'Las Líridas alcanzan su pico con hasta 20 meteoros por hora. La Luna creciente no interfiere — buenas condiciones de observación. Mira hacia la constelación de Lira después de medianoche.', type: 'meteoros', impact: 'bajo' },
  { date: '2026-04-26', emoji: '⚡', title: 'Urano entra en Géminis', subtitle: 'Cambio generacional', desc: 'Urano entra definitivamente en Géminis hasta 2033. Revolución en comunicación, tecnología y educación. Los próximos 7 años transformarán cómo pensamos y nos conectamos.', type: 'transito', impact: 'alto' },

  // ── Mayo 2026 ──
  { date: '2026-05-01', emoji: '🌕', title: 'Luna Llena de las Flores', subtitle: 'Microlunar', desc: 'La Luna más lejana del año — una Microluna. Pese a su distancia, su energía en Escorpio profundiza tus emociones. Buen momento para trabajo interior.', type: 'luna', impact: 'medio' },
  { date: '2026-05-06', emoji: '🪐', title: 'Plutón Retrógrado', subtitle: 'En Acuario', desc: 'Plutón inicia su retrogradación en Acuario hasta octubre. Revisar estructuras de poder, transformaciones colectivas pendientes y tu relación con el control.', type: 'retrogrado', impact: 'medio' },
  { date: '2026-05-06', emoji: '☄️', title: 'Eta Acuáridas', subtitle: 'Restos del cometa Halley', desc: 'Lluvia de meteoros originada por los restos del cometa Halley. Hasta 50 meteoros por hora en condiciones ideales. Mejor visibilidad antes del amanecer.', type: 'meteoros', impact: 'bajo' },
  { date: '2026-05-16', emoji: '🌑', title: 'Super Luna Nueva', subtitle: 'En Tauro', desc: 'La Luna Nueva más cercana a la Tierra en 2026. Su proximidad amplifica las intenciones que plantes hoy — especialmente las relacionadas con abundancia y estabilidad.', type: 'luna', impact: 'medio' },
  { date: '2026-05-31', emoji: '🔵', title: 'Luna Azul', subtitle: 'Segunda luna llena de mayo', desc: 'Evento raro: la segunda Luna Llena en un mismo mes. La próxima no será hasta diciembre de 2028. Tradición dice que la Luna Azul potencia los deseos inusuales.', type: 'luna', impact: 'alto' },

  // ── Junio 2026 ──
  { date: '2026-06-09', emoji: '✨', title: 'Conjunción Venus-Júpiter', subtitle: 'El beso de los benefactores', desc: 'Los dos planetas más benéficos del zodiaco se abrazan en el cielo. Día excepcional para el amor, la abundancia y las oportunidades inesperadas. No dejes pasar lo que llegue hoy.', type: 'conjuncion', impact: 'alto' },
  { date: '2026-06-21', emoji: '☀️', title: 'Solsticio de Verano', subtitle: 'El día más largo del año', desc: 'El Sol alcanza su punto más alto. Es el día con más horas de luz — tu energía vital está en su pico máximo. Celebra lo que has construido desde el equinoccio de primavera.', type: 'estacion', impact: 'alto' },
  { date: '2026-06-29', emoji: '☿', title: 'Mercurio Retrógrado', subtitle: 'En Cáncer', desc: 'Segundo retrógrado del año, esta vez en Cáncer. La comunicación emocional se enreda. Revisa conversaciones familiares pendientes pero no fuerces resoluciones.', type: 'retrogrado', impact: 'medio' },
  { date: '2026-06-29', emoji: '🌕', title: 'Luna Llena de Fresa', subtitle: 'Microluna en Capricornio', desc: 'Luna Llena en Capricornio — el eje hogar vs. carrera se ilumina. Evalúa si tu estructura profesional nutre o agota tu vida personal.', type: 'luna', impact: 'medio' },
  { date: '2026-06-30', emoji: '♃', title: 'Júpiter entra en Leo', subtitle: 'Expansión creativa', desc: 'Júpiter inicia un año en Leo. Expansión en creatividad, visibilidad y liderazgo. Los próximos 12 meses premian la audacia y la expresión auténtica.', type: 'transito', impact: 'alto' },

  // ── Julio 2026 ──
  { date: '2026-07-23', emoji: '☿', title: 'Mercurio Directo', subtitle: 'Fin del retrógrado en Cáncer', desc: 'Mercurio retoma su marcha directa. Las conversaciones emocionales que quedaron suspendidas pueden retomarse con claridad renovada.', type: 'retrogrado', impact: 'medio' },
  { date: '2026-07-26', emoji: '🪐', title: 'Saturno Retrógrado', subtitle: 'En Aries', desc: 'Saturno retrógrado en Aries hasta diciembre. Revisar compromisos, límites y estructuras que ya no sirven. La paciencia es tu herramienta más potente.', type: 'retrogrado', impact: 'medio' },

  // ── Agosto 2026 ──
  { date: '2026-08-12', emoji: '🌑', title: 'Eclipse Solar Total', subtitle: 'Visible desde España', desc: 'Eclipse solar total visible desde el norte de España, Islandia y Rusia. El cielo se oscurece en pleno día — uno de los fenómenos más impactantes que puedes presenciar. Marca un reset profundo.', type: 'eclipse', impact: 'alto' },
  { date: '2026-08-12', emoji: '☄️', title: 'Perseidas', subtitle: 'La mejor lluvia del año', desc: 'Las Perseidas coinciden con la Luna Nueva — condiciones perfectas para ver hasta 100 meteoros por hora. La lluvia de estrellas más espectacular de 2026.', type: 'meteoros', impact: 'medio' },
  { date: '2026-08-28', emoji: '🌕', title: 'Luna Llena del Esturión', subtitle: 'Eclipse Lunar Parcial', desc: 'Eclipse lunar parcial visible desde Europa, Asia, África y América. La Luna en Piscis disuelve ilusiones y trae claridad emocional.', type: 'eclipse', impact: 'alto' },

  // ── Septiembre 2026 ──
  { date: '2026-09-22', emoji: '🍂', title: 'Equinoccio de Otoño', subtitle: 'El Sol entra en Libra', desc: 'Segundo punto de equilibrio del año. Día y noche vuelven a igualarse. Momento natural para reequilibrar tu vida: ¿qué tiene demasiado peso? ¿Qué necesita más atención?', type: 'estacion', impact: 'alto' },

  // ── Octubre 2026 ──
  { date: '2026-10-03', emoji: '♀', title: 'Venus Retrógrado', subtitle: 'De Escorpio a Libra', desc: 'Venus retrógrado durante 6 semanas. Revisión profunda de relaciones, valores y cómo gestionas la intimidad. No es momento de iniciar relaciones — es momento de entender las que ya tienes.', type: 'retrogrado', impact: 'alto' },
  { date: '2026-10-24', emoji: '☿', title: 'Mercurio Retrógrado', subtitle: 'En Escorpio', desc: 'Tercer y último retrógrado del año, en Escorpio. Secretos pueden salir a la superficie. La comunicación se vuelve más intensa y directa — usa ese poder con cuidado.', type: 'retrogrado', impact: 'medio' },

  // ── Diciembre 2026 ──
  { date: '2026-12-21', emoji: '❄️', title: 'Solsticio de Invierno', subtitle: 'La noche más larga', desc: 'El día más corto del año. La oscuridad invita a la introspección profunda. Desde mañana, la luz empieza a crecer de nuevo — renacimiento simbólico.', type: 'estacion', impact: 'alto' },
  { date: '2026-12-24', emoji: '🌕', title: 'Superluna de Navidad', subtitle: 'Luna Fría — la más cercana del año', desc: 'La Luna más grande y brillante de 2026, a solo 221.667 km de la Tierra. Coincide con Nochebuena — un cierre de año con luz máxima.', type: 'luna', impact: 'alto' },
];

// Get upcoming events from today
export function getUpcomingEvents(count = 5) {
  const today = new Date().toISOString().split('T')[0];
  return COSMIC_EVENTS
    .filter(e => e.date >= today)
    .slice(0, count);
}

// Get current/recent events (past 3 days + next 3 days)
export function getCurrentEvents() {
  const now = new Date();
  const threeDaysAgo = new Date(now);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const threeDaysAhead = new Date(now);
  threeDaysAhead.setDate(threeDaysAhead.getDate() + 3);

  const from = threeDaysAgo.toISOString().split('T')[0];
  const to = threeDaysAhead.toISOString().split('T')[0];

  return COSMIC_EVENTS.filter(e => e.date >= from && e.date <= to);
}

// Get past events (last N)
export function getPastEvents(count = 3) {
  const today = new Date().toISOString().split('T')[0];
  return COSMIC_EVENTS
    .filter(e => e.date < today)
    .reverse()
    .slice(0, count);
}

// Impact color mapping
export function getImpactColor(impact) {
  switch (impact) {
    case 'alto': return { bg: 'bg-selene-gold/15', text: 'text-selene-gold', border: 'border-selene-gold/30' };
    case 'medio': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
    case 'bajo': return { bg: 'bg-selene-white/5', text: 'text-selene-white-dim', border: 'border-selene-border' };
    default: return { bg: 'bg-selene-white/5', text: 'text-selene-white-dim', border: 'border-selene-border' };
  }
}

// Type label mapping
export function getTypeLabel(type) {
  switch (type) {
    case 'eclipse': return 'Eclipse';
    case 'conjuncion': return 'Conjunción';
    case 'luna': return 'Lunar';
    case 'estacion': return 'Estación';
    case 'retrogrado': return 'Retrógrado';
    case 'transito': return 'Tránsito';
    case 'meteoros': return 'Meteoros';
    default: return 'Evento';
  }
}

// Format date in Spanish
export function formatEventDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}

// Days until event
export function daysUntil(dateStr) {
  const event = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((event - today) / (1000 * 60 * 60 * 24));
  return diff;
}
