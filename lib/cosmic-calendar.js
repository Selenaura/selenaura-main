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

// ══════════════════════════════════════════════
// Personalized impact by sign element + event type
// How does this event affect YOU based on your sign?
// ══════════════════════════════════════════════

const SIGN_ELEMENTS = {
  Aries: 'Fuego', Tauro: 'Tierra', Géminis: 'Aire', Geminis: 'Aire',
  Cáncer: 'Agua', Cancer: 'Agua', Leo: 'Fuego', Virgo: 'Tierra',
  Libra: 'Aire', Escorpio: 'Agua', Sagitario: 'Fuego',
  Capricornio: 'Tierra', Acuario: 'Aire', Piscis: 'Agua',
};

// Per element × event type: personalized impact + actionable advice
const PERSONAL_IMPACT = {
  eclipse: {
    Fuego: {
      impact: 'Los eclipses activan tu eje de identidad. Algo que dabas por sentado sobre ti se transforma. No resistas — el fuego se renueva quemando lo viejo.',
      action: 'Escribe qué parte de ti ya no te representa. Déjala ir conscientemente.',
    },
    Tierra: {
      impact: 'Tu estabilidad se sacude, pero para recalibrarte. Los eclipses en signos de tierra revelan qué estructuras necesitan renovación — trabajo, rutinas, finanzas.',
      action: 'Revisa un hábito que mantienes por inercia, no por convicción. Cámbialo esta semana.',
    },
    Aire: {
      impact: 'Tu mente recibe descargas de claridad. Ideas que llevabas meses procesando cristalizan de golpe. Los eclipses aceleran tu capacidad de conexión mental.',
      action: 'Anota las 3 ideas más potentes que te lleguen en las próximas 48 horas. Una de ellas será transformadora.',
    },
    Agua: {
      impact: 'Tu campo emocional se amplifica. Emociones antiguas pueden resurgir — no es regresión, es limpieza profunda. Tu intuición está en su punto más alto.',
      action: 'Dedica 15 minutos a estar en silencio. Lo que sientas, sin juzgarlo, contiene información valiosa.',
    },
  },
  luna: {
    Fuego: {
      impact: 'Las fases lunares modulan tu impulso. En luna llena, tu energía se desborda — canaliza antes de que se disperse. En luna nueva, planta semillas audaces.',
      action: 'Luna llena: celebra un logro. Luna nueva: inicia algo que te dé miedo.',
    },
    Tierra: {
      impact: 'La Luna conecta con tu cuerpo más que con tu mente. Notarás cambios sutiles en energía, sueño y apetito. Tu biología responde a los ciclos lunares.',
      action: 'Observa cómo duermes esta noche. Los signos de tierra procesan las lunas durante el sueño.',
    },
    Aire: {
      impact: 'Tu comunicación fluctúa con las fases lunares. En luna llena, tus palabras tienen más peso. En luna nueva, escuchar es más valioso que hablar.',
      action: 'Luna llena: di lo que llevas callando. Luna nueva: haz una pregunta que no te atrevas a hacer.',
    },
    Agua: {
      impact: 'Eres el elemento más sensible a la Luna — la sientes en el cuerpo antes de que tu mente la registre. Tus emociones hoy son un barómetro preciso.',
      action: 'No intentes racionalizar lo que sientes. Registra tus emociones en un diario — mañana tendrán más sentido.',
    },
  },
  retrogrado: {
    Fuego: {
      impact: 'Los retrógrados frenan tu velocidad natural — y eso te frustra. Pero la ciencia del timing dice que la pausa estratégica multiplica resultados más que la acción continua.',
      action: 'Revisa un proyecto que abandonaste. La versión 2.0 puede ser mejor que la original.',
    },
    Tierra: {
      impact: 'Tu planificación necesita ajustes. Los retrógrados te piden revisar contratos, presupuestos y acuerdos. No firmes nada nuevo — mejora lo que ya tienes.',
      action: 'Haz una auditoría rápida: ¿qué suscripción, gasto o compromiso ya no te sirve?',
    },
    Aire: {
      impact: 'La comunicación se enreda — malentendidos, emails perdidos, conversaciones circulares. Tu mente va más rápido que el momento. Reduce velocidad verbal.',
      action: 'Antes de enviar un mensaje importante, espera 1 hora. Tu segunda versión será más clara.',
    },
    Agua: {
      impact: 'Emociones del pasado resurgen. Personas, situaciones y heridas antiguas piden atención. No es el universo castigándote — es tu psique completando ciclos.',
      action: 'Si alguien del pasado aparece (en tu mente o en tu vida), pregúntate: ¿qué no cerré?',
    },
  },
  conjuncion: {
    Fuego: {
      impact: 'Las conjunciones amplifican tu magnetismo natural. Hoy irradias más de lo habitual — las oportunidades te buscan a ti, no al revés.',
      action: 'Di sí a lo que llegue hoy. Tu instinto de fuego sabe distinguir una oportunidad real.',
    },
    Tierra: {
      impact: 'Cuando dos planetas se alinean, tu sentido práctico se afina. Las decisiones financieras o profesionales que tomes hoy tienen potencial a largo plazo.',
      action: 'Es buen día para negociar, invertir o consolidar algo que lleva tiempo gestándose.',
    },
    Aire: {
      impact: 'Tu capacidad de conexión se multiplica. Las conjunciones activan tu red social y mental — conversaciones de hoy pueden cambiar tu dirección.',
      action: 'Contacta a alguien que admiras. Hoy tu mensaje llegará en el momento justo.',
    },
    Agua: {
      impact: 'Las conjunciones intensifican tu vida emocional y relacional. El amor, la creatividad y la intuición se fusionan en algo poderoso.',
      action: 'Exprésale a alguien cercano lo que sientes por esa persona. La vulnerabilidad es tu fuerza.',
    },
  },
  estacion: {
    Fuego: {
      impact: 'Los equinoccios y solsticios marcan puntos de inflexión en tu energía vital. Tu fuego necesita estos resets para no consumirse.',
      action: 'Haz un ritual simple: escribe en un papel lo que dejas atrás y lo que quieres crear. Guárdalo donde lo veas.',
    },
    Tierra: {
      impact: 'Tu conexión con los ciclos naturales es profunda. Los cambios de estación afectan tu metabolismo, tu productividad y tu estado de ánimo más que a otros elementos.',
      action: 'Ajusta una rutina (sueño, alimentación o ejercicio) al nuevo ritmo estacional. Tu cuerpo te lo pedirá.',
    },
    Aire: {
      impact: 'Los cambios de estación renuevan tu perspectiva mental. Lo que parecía estancado cobra nueva forma. Tu cerebro necesita estos ciclos para reorganizar información.',
      action: 'Plantea una meta para los próximos 3 meses. Los equinoccios son los mejores puntos de partida del año.',
    },
    Agua: {
      impact: 'Sientes los cambios de estación emocionalmente antes de que lleguen físicamente. Tu sensibilidad es un termómetro preciso del cambio colectivo.',
      action: 'Dedica este día a un acto de autocuidado significativo. No superficial — profundo. Tu sistema emocional lo necesita.',
    },
  },
  transito: {
    Fuego: {
      impact: 'Los tránsitos de planetas lentos abren ciclos largos. Para los signos de fuego, esto significa nuevos terrenos donde expandirse. La audacia será recompensada.',
      action: 'Identifica una área de tu vida donde juegas seguro. Los próximos meses premian el riesgo calculado.',
    },
    Tierra: {
      impact: 'Los tránsitos planetarios remodelan estructuras que creías fijas. Tu capacidad de adaptación pragmática es tu superpoder en estos periodos.',
      action: 'Prepara tu base: finanzas, salud, hogar. Los cambios externos te afectan menos si tu fundamento es sólido.',
    },
    Aire: {
      impact: 'Los tránsitos de planetas lentos transforman cómo piensas, comunicas y te conectas. Espera cambios en tu forma de procesar información.',
      action: 'Aprende algo radicalmente nuevo. Los tránsitos en signos de aire premian la curiosidad activa.',
    },
    Agua: {
      impact: 'Los tránsitos planetarios profundizan tu vida interior. Sueños más vívidos, intuiciones más certeras, emociones más matizadas.',
      action: 'Empieza un diario de sueños o de intuiciones. En 3 meses verás patrones que ahora no percibes.',
    },
  },
  meteoros: {
    Fuego: {
      impact: 'Las lluvias de meteoros encienden tu inspiración. La ciencia dice que observar el cielo nocturno reduce cortisol un 28% — tu fuego necesita ese reset.',
      action: 'Sal esta noche. 15 minutos mirando el cielo sin pantallas. Tu mente se expandirá.',
    },
    Tierra: {
      impact: 'Cada meteoro es un fragmento de cometa ardiendo en la atmósfera. Para ti, es un recordatorio de que lo efímero también tiene valor — no todo necesita ser permanente.',
      action: 'Haz algo espontáneo hoy. Sin planificar. Tu rigidez natural necesita estos descansos.',
    },
    Aire: {
      impact: 'Las lluvias de estrellas alimentan tu curiosidad cósmica. Cada punto de luz es un dato real del universo entrando en tu campo visual.',
      action: 'Investiga de qué cometa provienen estos meteoros. Tu mente disfrutará el viaje.',
    },
    Agua: {
      impact: 'Observar meteoros en la oscuridad conecta con tu necesidad de asombro y trascendencia. Es meditación activa para los signos de agua.',
      action: 'Pide un deseo con cada estrella fugaz. No es superstición — es intención consciente.',
    },
  },
};

/**
 * Get personalized impact text for an event based on user's sun sign.
 * Returns { impact, action } or null if no sign provided.
 */
export function getPersonalImpact(event, sunSign) {
  if (!sunSign || !event?.type) return null;

  const element = SIGN_ELEMENTS[sunSign];
  if (!element) return null;

  const typeImpacts = PERSONAL_IMPACT[event.type];
  if (!typeImpacts) return null;

  const personal = typeImpacts[element];
  if (!personal) return null;

  return {
    impact: personal.impact,
    action: personal.action,
    element,
    signName: sunSign,
  };
}
