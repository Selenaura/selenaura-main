'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { getCrossSellRecommendations, READINGS } from '@/lib/constants';
import { ZODIAC_SIGNS, getSunSign } from '@/lib/zodiac';
import { getUpcomingEvents, getCurrentEvents, getPastEvents, getImpactColor, getTypeLabel, formatEventDate, daysUntil, getPersonalImpact } from '@/lib/cosmic-calendar';
import {
  Navbar, Card, SectionTitle, ArrowIcon, SunIcon, HistoryIcon,
  CompassIcon, MoonIcon, BookIcon, StarIcon, Badge,
} from '@/components/ui';
import {
  IconBriefcase, IconHeart, IconPalette, IconLotus, IconPeople, IconBrain,
  IconCheck, IconX, IconTarot, IconConjunction, IconDream, IconBook,
  IconStar, IconSparkle, IconMoon as IconMoonCustom, IconSun as IconSunCustom,
  IconRetrograde, IconFlame, IconTransit, IconConstellation,
  IconLeaf, IconWind, IconWater,
  getEventIcon, getReadingIcon,
} from '@/components/icons';

// ── Moon phase calculation ──
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + month + day;
  if (month < 3) r += 2;
  r -= ((year < 2000) ? 4 : 8.3);
  r = Math.floor(r + 0.5) % 30;
  if (r < 0) r += 30;
  return r;
}

function getMoonEmoji(phase) {
  // Returns a moon icon component instead of emoji
  return <IconMoonCustom size={18} className="text-selene-gold inline-block" />;
}

function getMoonPhaseName(phase) {
  if (phase === 0) return 'Luna Nueva';
  if (phase <= 3) return 'Creciente';
  if (phase <= 7) return 'Cuarto Creciente';
  if (phase <= 11) return 'Gibosa Creciente';
  if (phase <= 15) return 'Luna Llena';
  if (phase <= 19) return 'Gibosa Menguante';
  if (phase <= 23) return 'Cuarto Menguante';
  return 'Menguante';
}

// ── Static horoscope placeholders by sign ──
const STATIC_HOROSCOPES = {
  Aries: { content: 'Tu energia de fuego se intensifica hoy. Es un buen momento para iniciar proyectos que llevas posponiendo — tu determinacion esta en su punto mas alto. No ignores las senales sutiles que llegan de personas cercanas.', energy: 8, focus: 'Accion' },
  Tauro: { content: 'Venus te invita a reconectar con tus sentidos. Hoy lo tangible importa mas que lo abstracto — date permiso para disfrutar lo simple. Una conversacion pendiente puede resolverse con honestidad directa.', energy: 6, focus: 'Disfrute' },
  'Geminis': { content: 'Mercurio activa tu curiosidad natural. Las ideas fluyen rapido hoy, pero elige una y profundiza en lugar de dispersarte. Alguien cercano necesita que escuches mas de lo que hablas.', energy: 7, focus: 'Enfoque' },
  'Cancer': { content: 'La Luna amplifica tu intuicion. Presta atencion a lo que sientes en el cuerpo, no solo en la mente — tus emociones hoy son brujulas precisas. Un gesto pequeno puede transformar una relacion importante.', energy: 5, focus: 'Intuicion' },
  Leo: { content: 'El Sol ilumina tu creatividad. Hoy tienes la capacidad de contagiar entusiasmo a quienes te rodean — usala con intencion. Un proyecto creativo pendiente merece tu atencion esta semana.', energy: 9, focus: 'Creatividad' },
  Virgo: { content: 'Tu capacidad analitica esta en su mejor momento. Aprovecha para organizar lo que se ha acumulado, pero no te pierdas en los detalles — el panorama general tambien necesita tu atencion. Cuida tu descanso.', energy: 6, focus: 'Orden' },
  Libra: { content: 'Venus busca armonia en tus relaciones. Hoy es un buen dia para mediar en conflictos o tener conversaciones que equilibren dinamicas. No pospongas lo que sabes que necesita ser dicho.', energy: 7, focus: 'Relaciones' },
  Escorpio: { content: 'Pluton te empuja hacia la profundidad. Las verdades que emergen hoy no son comodas, pero son necesarias — la transformacion real nunca lo es. Confiar en tu instinto es tu superpoder hoy.', energy: 8, focus: 'Verdad' },
  Sagitario: { content: 'Jupiter expande tu perspectiva. Es un dia para pensar en grande y planificar el proximo paso importante. La rutina puede sentirse limitante — busca una dosis de novedad, aunque sea pequena.', energy: 7, focus: 'Expansion' },
  Capricornio: { content: 'Saturno premia tu constancia. Los resultados de esfuerzos pasados empiezan a materializarse — permitete reconocerlos. Hoy, la disciplina y la paciencia son tus mayores aliadas.', energy: 6, focus: 'Constancia' },
  Acuario: { content: 'Urano despierta ideas inesperadas. Tu forma unica de ver las cosas es exactamente lo que necesita una situacion que parece estancada. No temas proponer lo que nadie ha sugerido.', energy: 7, focus: 'Innovacion' },
  Piscis: { content: 'Neptuno afina tu empatia. Hoy sientes mas de lo habitual — protege tu energia sin cerrarte al mundo. La creatividad y la meditacion son tus mejores herramientas para canalizar lo que percibes.', energy: 5, focus: 'Empatia' },
};

// ── Dato del dia (7, rotate by weekday) ──
const DATOS_DEL_DIA = [
  { icon: 'moon', text: 'La Luna tarda 27,3 dias en orbitar la Tierra — el mismo ciclo que tu energia emocional.' },
  { icon: 'sun', text: 'El Sol es 109 veces mas grande que la Tierra. Tu signo solar representa tu nucleo mas visible — pero no es todo lo que eres.' },
  { icon: 'retrograde', text: 'Saturno tarda 29,5 anos en completar su orbita. El "retorno de Saturno" marca los momentos de mayor crecimiento en la vida adulta.' },
  { icon: 'conjunction', text: 'Venus rota en sentido contrario al resto de planetas. En astrologia, representa lo que valoras incluso cuando va contra la corriente.' },
  { icon: 'flame', text: 'Marte tiene el volcan mas alto del sistema solar: 21 km. Tu Marte natal indica donde canalizas tu fuerza mas intensa.' },
  { icon: 'transit', text: 'Jupiter podria contener 1.300 Tierras. En tu carta natal, senala donde tienes capacidad de expansion ilimitada.' },
  { icon: 'constellation', text: 'Hay mas estrellas en el universo observable que granos de arena en todas las playas de la Tierra. Tu carta natal captura un instante irrepetible de ese cielo.' },
];

const DATO_ICON_MAP = {
  moon: IconMoonCustom,
  sun: IconSunCustom,
  retrograde: IconRetrograde,
  conjunction: IconConjunction,
  flame: IconFlame,
  transit: IconTransit,
  constellation: IconConstellation,
};

// Reading icons are now provided by getReadingIcon() from @/components/icons

// ── Energy dots ──
function EnergyDots({ level = 5, total = 5 }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${i < level ? 'opacity-100' : 'opacity-20'}`}
        >
          ●
        </span>
      ))}
    </div>
  );
}

// ── Element badge colors ──
const ELEMENT_COLORS = {
  Fuego: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  Tierra: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  Aire: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400' },
  Agua: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
};

// ══════════════════════════════════════════════════
// ── NEW: Life Areas (Areas de vida) ──
// ══════════════════════════════════════════════════

const ZODIAC_ORDER = [
  'Aries', 'Tauro', 'Geminis', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis',
];

const AREA_ICON_COMPONENTS = {
  Trabajo: IconBriefcase,
  Amor: IconHeart,
  Creatividad: IconPalette,
  Bienestar: IconLotus,
  Relaciones: IconPeople,
  Interior: IconBrain,
};

const AREA_TEXTS = {
  Trabajo: {
    fluye: 'El impulso esta de tu lado. Proyectos avanzan con menos resistencia de lo habitual.',
    neutro: 'Dia estable. Bueno para consolidar lo que ya esta en marcha, no para iniciar.',
    tension: 'Posibles obstaculos o malentendidos. Revisa antes de enviar.',
  },
  Amor: {
    fluye: 'Conexion autentica. Tu presencia tiene peso hoy — usala para acercarte.',
    neutro: 'Sin grandes movimientos. Un buen dia para la calma, no para la intensidad.',
    tension: 'Cuidado con las palabras no dichas. Lo que callas pesa mas que lo que dices.',
  },
  Creatividad: {
    fluye: 'Las ideas llegan sin esfuerzo. Captura todo, filtra despues.',
    neutro: 'Creatividad latente. No forces — deja que llegue.',
    tension: 'Bloqueo creativo temporal. Cambia de entorno o estimulo.',
  },
  Bienestar: {
    fluye: 'Tu cuerpo responde bien hoy. Buen momento para actividad fisica o cuidado personal.',
    neutro: 'Energia estable. Manten rutinas sin exigir demasiado.',
    tension: 'Escucha las senales de tu cuerpo. Descanso > productividad hoy.',
  },
  Relaciones: {
    fluye: 'Las conversaciones fluyen. Buen dia para resolver algo pendiente.',
    neutro: 'Relaciones en piloto automatico. No es malo — es descanso social.',
    tension: 'Dinamicas tensas. Respira antes de reaccionar — el conflicto no es siempre urgente.',
  },
  Interior: {
    fluye: 'Claridad mental. Tus reflexiones hoy son mas lucidas de lo normal.',
    neutro: 'Introspeccion tranquila. Ni gran revelacion ni gran conflicto.',
    tension: 'Ruido mental. Meditacion, paseo o escritura pueden ayudar a filtrar.',
  },
};

const STATUS_CONFIG = {
  fluye: { dotColor: 'bg-emerald-400', label: 'Fluye', color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
  neutro: { dotColor: 'bg-yellow-400', label: 'Neutro', color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5' },
  tension: { dotColor: 'bg-red-400', label: 'Tension', color: 'text-red-400', border: 'border-red-500/20', bg: 'bg-red-500/5' },
};

function getLifeAreas(sign, dayOfWeek) {
  const signIndex = ZODIAC_ORDER.indexOf(sign);
  const si = signIndex >= 0 ? signIndex : 0;
  const areas = ['Trabajo', 'Amor', 'Creatividad', 'Bienestar', 'Relaciones', 'Interior'];
  const statuses = ['fluye', 'neutro', 'tension'];

  return areas.map((area, i) => {
    // Deterministic but varied pattern using primes to avoid obvious repetition
    const seed = ((si * 7 + dayOfWeek * 13 + i * 5 + 3) * 17) % 3;
    const status = statuses[seed];
    return {
      name: area,
      IconComponent: AREA_ICON_COMPONENTS[area],
      status,
      text: AREA_TEXTS[area][status],
    };
  });
}

// ══════════════════════════════════════════════════
// ── NEW: Consejo del dia (Do / Don't) ──
// ══════════════════════════════════════════════════

const CONSEJOS = [
  { haz: 'Empieza algo que llevas posponiendo', evita: 'Esperar el momento perfecto' },
  { haz: 'Escucha sin preparar tu respuesta', evita: 'Dar consejos no pedidos' },
  { haz: 'Dedica 10 minutos a no hacer nada', evita: 'Llenar cada hueco del dia con productividad' },
  { haz: 'Dile a alguien lo que sientes', evita: 'Asumir que ya lo saben' },
  { haz: 'Prueba una ruta diferente (literal o metaforica)', evita: 'La rutina como zona de confort' },
  { haz: 'Escribe lo que te ronda la cabeza', evita: 'Rumiar sin sacarlo fuera' },
  { haz: 'Celebra un logro pequeno de esta semana', evita: 'Minimizar tu progreso' },
];

// ══════════════════════════════════════════════════
// Events now come from @/lib/cosmic-calendar (real 2026 data)

// ══════════════════════════════════════════════════
// ── NEW: Sign details (element, ruler, polarity) ──
// ══════════════════════════════════════════════════

const SIGN_DETAILS = {
  Aries: {
    ruler: 'Marte', rulerEmoji: '♂️', polarity: 'Yang', quality: 'Cardinal',
    elementDesc: 'Pasion, impulso y accion. Tu fuego te empuja a iniciar, no a esperar.',
    fact: 'Las personas nacidas bajo signos cardinales muestran mayor activacion del cortex prefrontal dorsolateral en tareas de toma de decisiones rapida (Kosinski, 2018).',
  },
  Tauro: {
    ruler: 'Venus', rulerEmoji: '♀️', polarity: 'Yin', quality: 'Fijo',
    elementDesc: 'Estabilidad, constancia y raices profundas. Tu tierra te ancla cuando todo se mueve.',
    fact: 'Los signos fijos correlacionan con mayor persistencia en tests de retraso de gratificacion, similar al famoso test del marshmallow (Mischel, 1972).',
  },
  Geminis: {
    ruler: 'Mercurio', rulerEmoji: '☿️', polarity: 'Yang', quality: 'Mutable',
    elementDesc: 'Intelecto, comunicacion y conexiones. Tu aire mueve ideas como corrientes invisibles.',
    fact: 'Los signos mutables puntuan mas alto en escalas de flexibilidad cognitiva y adaptacion a nuevos contextos (Eysenck, 1985).',
  },
  Cancer: {
    ruler: 'Luna', rulerEmoji: '☽', polarity: 'Yin', quality: 'Cardinal',
    elementDesc: 'Emocion, intuicion y profundidad. Tu agua siente lo que la logica no alcanza.',
    fact: 'El ciclo lunar de 29.5 dias coincide con el ciclo menstrual promedio, un vinculo estudiado desde la antiguedad y revisitado por la cronobiologia moderna.',
  },
  Leo: {
    ruler: 'Sol', rulerEmoji: '☉', polarity: 'Yang', quality: 'Fijo',
    elementDesc: 'Pasion, creatividad y calor. Tu fuego no destruye — ilumina y transforma.',
    fact: 'Estudios sobre personalidad y mes de nacimiento encuentran que las personas nacidas en verano reportan mayor extroversion y apertura (Chotai, 2006).',
  },
  Virgo: {
    ruler: 'Mercurio', rulerEmoji: '☿️', polarity: 'Yin', quality: 'Mutable',
    elementDesc: 'Estabilidad, analisis y precision. Tu tierra separa lo esencial de lo superfluo.',
    fact: 'La atencion al detalle es un rasgo con alta heredabilidad genetica. El perfeccionismo funcional se asocia con mayor bienestar, no menos (Stoeber, 2011).',
  },
  Libra: {
    ruler: 'Venus', rulerEmoji: '♀️', polarity: 'Yang', quality: 'Cardinal',
    elementDesc: 'Intelecto, equilibrio y diplomacia. Tu aire busca armonia sin renunciar a la verdad.',
    fact: 'La preferencia por la simetria y la armonia tiene bases neurologicas: el cerebro procesa patrones simetricos con menor esfuerzo cognitivo (Reber, 2004).',
  },
  Escorpio: {
    ruler: 'Pluton', rulerEmoji: '♇', polarity: 'Yin', quality: 'Fijo',
    elementDesc: 'Emocion, transformacion y poder. Tu agua fluye en las profundidades donde nadie mas llega.',
    fact: 'La resiliencia psicologica — la capacidad de renacer tras el trauma — es uno de los rasgos mas estudiados en psicologia positiva (Bonanno, 2004).',
  },
  Sagitario: {
    ruler: 'Jupiter', rulerEmoji: '♃', polarity: 'Yang', quality: 'Mutable',
    elementDesc: 'Pasion, expansion y aventura. Tu fuego busca horizontes, no limites.',
    fact: 'La necesidad de novedad (novelty seeking) tiene base neurobiologica en el sistema dopaminergico, asociada al gen DRD4 (Ebstein, 1996).',
  },
  Capricornio: {
    ruler: 'Saturno', rulerEmoji: '♄', polarity: 'Yin', quality: 'Cardinal',
    elementDesc: 'Estabilidad, disciplina y legado. Tu tierra construye despacio pero para siempre.',
    fact: 'La constancia (grit) predice el exito a largo plazo mejor que el coeficiente intelectual, segun la investigacion de Angela Duckworth (2007).',
  },
  Acuario: {
    ruler: 'Urano', rulerEmoji: '♅', polarity: 'Yang', quality: 'Fijo',
    elementDesc: 'Intelecto, innovacion y vision. Tu aire respira futuro cuando el resto respira presente.',
    fact: 'El pensamiento divergente — la capacidad de generar multiples soluciones — es la base neuropsicologica de la creatividad (Guilford, 1967).',
  },
  Piscis: {
    ruler: 'Neptuno', rulerEmoji: '♆', polarity: 'Yin', quality: 'Mutable',
    elementDesc: 'Emocion, empatia y trascendencia. Tu agua disuelve fronteras entre ti y el mundo.',
    fact: 'Las neuronas espejo, descubiertas en 1996, son la base neurologica de la empatia — la capacidad de sentir lo que siente otra persona (Rizzolatti, 2004).',
  },
};

const ELEMENT_DESCRIPTIONS = {
  Fuego: { IconComp: IconFlame, label: 'Fuego', desc: 'Pasion, accion e impulso vital' },
  Tierra: { IconComp: IconLeaf, label: 'Tierra', desc: 'Estabilidad, constancia y raices' },
  Aire: { IconComp: IconWind, label: 'Aire', desc: 'Intelecto, comunicacion y libertad' },
  Agua: { IconComp: IconWater, label: 'Agua', desc: 'Emocion, intuicion y profundidad' },
};

// ══════════════════════════════════════════════════
// ── Component: LifeAreasGrid ──
// ══════════════════════════════════════════════════

function LifeAreasGrid({ sign }) {
  const dayOfWeek = new Date().getDay();
  const areas = getLifeAreas(sign, dayOfWeek);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
      {areas.map((area) => {
        const cfg = STATUS_CONFIG[area.status];
        const AreaIcon = area.IconComponent;
        return (
          <div
            key={area.name}
            className={`rounded-xl border ${cfg.border} ${cfg.bg} p-3.5 transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {AreaIcon && <AreaIcon size={16} className="text-selene-white-dim" />}
              <span className="text-[13px] font-semibold text-selene-white">{area.name}</span>
              <span className="ml-auto text-xs flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
                <span className={`text-[11px] font-medium ${cfg.color}`}>{cfg.label}</span>
              </span>
            </div>
            <p className="text-[12px] text-selene-white/70 leading-relaxed">
              {area.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════
// ── Component: ConsejoDelDia ──
// ══════════════════════════════════════════════════

function ConsejoDelDia() {
  const dayOfWeek = new Date().getDay();
  const consejo = CONSEJOS[dayOfWeek];

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* HAZ */}
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <IconCheck size={18} className="text-emerald-400" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400">Haz</span>
        </div>
        <p className="text-[13px] text-selene-white/90 leading-relaxed">
          {consejo.haz}
        </p>
      </div>
      {/* EVITA */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <IconX size={18} className="text-red-400" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-red-400">Evita</span>
        </div>
        <p className="text-[13px] text-selene-white/90 leading-relaxed">
          {consejo.evita}
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// ── Component: EventosCosmicos ──
// ══════════════════════════════════════════════════

function EventosCosmicos({ sunSign }) {
  const current = getCurrentEvents();
  const upcoming = getUpcomingEvents(5);
  const past = getPastEvents(2);

  // Combine: current events first, then upcoming (deduped)
  const currentIds = new Set(current.map(e => e.date + e.title));
  const allEvents = [
    ...current,
    ...upcoming.filter(e => !currentIds.has(e.date + e.title)),
  ].slice(0, 6);

  if (allEvents.length === 0) {
    return <p className="text-sm text-selene-white-dim text-center py-4">No hay eventos próximos registrados.</p>;
  }

  return (
    <div className="space-y-1">
      {/* Active now banner if there are current events */}
      {current.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-selene-gold/5 border border-selene-gold/15">
          <p className="text-[10px] text-selene-gold font-semibold tracking-[0.1em] uppercase mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Activo ahora
          </p>
          {current.map((ev, i) => {
            const EvIcon = getEventIcon(ev.type);
            return (
            <div key={`now-${i}`} className="flex items-start gap-3 mb-2 last:mb-0">
              <EvIcon size={20} className="text-selene-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] text-selene-white font-medium">{ev.title}</p>
                <p className="text-[11px] text-selene-white-dim">{ev.subtitle}</p>
              </div>
            </div>
          );
          })}
        </div>
      )}

      {/* Timeline */}
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-selene-gold/40 via-selene-gold/20 to-transparent" />

        <div className="space-y-5">
          {allEvents.map((ev, i) => {
            const days = daysUntil(ev.date);
            const impactColor = getImpactColor(ev.impact);
            const typeLabel = getTypeLabel(ev.type);
            const isPast = days < 0;
            const TimelineIcon = getEventIcon(ev.type);
            const isToday = days === 0;

            return (
              <div key={i} className={`relative ${isPast ? 'opacity-50' : ''}`}>
                {/* Timeline dot */}
                <div className={`absolute -left-6 top-1 w-[18px] h-[18px] rounded-full bg-selene-card border-2 flex items-center justify-center ${
                  isToday ? 'border-selene-gold pulse-glow' : ev.impact === 'alto' ? 'border-selene-gold/70' : 'border-selene-border'
                }`}>
                  <div className={`w-[6px] h-[6px] rounded-full ${isToday ? 'bg-selene-gold' : ev.impact === 'alto' ? 'bg-selene-gold/70' : 'bg-selene-white-dim'}`} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <TimelineIcon size={16} className="text-selene-gold" />
                    <span className="text-[11px] font-semibold text-selene-gold tracking-wide">{formatEventDate(ev.date)}</span>
                    {isToday && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-selene-gold text-selene-bg">HOY</span>
                    )}
                    {!isPast && !isToday && days <= 7 && (
                      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-selene-gold/15 text-selene-gold">en {days}d</span>
                    )}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${impactColor.bg} ${impactColor.text}`}>{typeLabel}</span>
                  </div>
                  <h4 className="text-[14px] font-semibold text-selene-white mb-0.5">{ev.title}</h4>
                  {ev.subtitle && <p className="text-[11px] text-selene-gold/70 mb-1">{ev.subtitle}</p>}
                  <p className="text-[12px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>{ev.desc}</p>

                  {/* Personalized impact */}
                  {(() => {
                    const personal = sunSign ? getPersonalImpact(ev, sunSign) : null;
                    if (!personal || isPast) return null;
                    return (
                      <div className="mt-3 p-3 rounded-xl bg-selene-gold/5 border border-selene-gold/10">
                        <p className="text-[10px] text-selene-gold font-semibold tracking-[0.08em] uppercase mb-1.5">
                          Cómo te afecta — {personal.signName} ({personal.element})
                        </p>
                        <p className="text-[12px] text-selene-white/85 leading-relaxed mb-2" style={{ textAlign: 'justify' }}>
                          {personal.impact}
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-selene-gold text-sm mt-0.5 shrink-0">→</span>
                          <p className="text-[12px] text-selene-gold/90 leading-relaxed font-medium">
                            {personal.action}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past events teaser */}
      {past.length > 0 && (
        <div className="mt-4 pt-4 border-t border-selene-border">
          <p className="text-[10px] text-selene-white-dim/50 uppercase tracking-wider mb-2">Recientes</p>
          {past.map((ev, i) => {
            const PastIcon = getEventIcon(ev.type);
            return (
              <div key={`past-${i}`} className="flex items-center gap-2 mb-1.5 opacity-40">
                <PastIcon size={14} className="text-selene-white-dim" />
                <span className="text-[11px] text-selene-white-dim">{formatEventDate(ev.date)} — {ev.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// ── Component: SignDetailsPanel ──
// ══════════════════════════════════════════════════

function SignDetailsPanel({ signName, signElement }) {
  const details = SIGN_DETAILS[signName];
  const elemInfo = ELEMENT_DESCRIPTIONS[signElement];
  if (!details) return null;

  return (
    <div className="mt-5 pt-5 border-t border-selene-border space-y-4">
      {/* Element + Polarity row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-selene-elevated/50 border border-selene-border p-3">
          <div className="flex items-center gap-2 mb-1">
            {(() => { const ElemIcon = elemInfo?.IconComp || IconStar; return <ElemIcon size={16} className="text-selene-gold" />; })()}
            <span className="text-[11px] font-semibold text-selene-gold tracking-wide uppercase">Tu elemento</span>
          </div>
          <p className="text-[13px] font-medium text-selene-white mb-0.5">{signElement}</p>
          <p className="text-[11px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>{details.elementDesc}</p>
        </div>

        <div className="rounded-xl bg-selene-elevated/50 border border-selene-border p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{details.rulerEmoji}</span>
            <span className="text-[11px] font-semibold text-selene-gold tracking-wide uppercase">Planeta regente</span>
          </div>
          <p className="text-[13px] font-medium text-selene-white mb-0.5">{details.ruler}</p>
          <p className="text-[11px] text-selene-white-dim leading-relaxed">
            Polaridad: <span className="text-selene-white/80">{details.polarity}</span> · Cualidad: <span className="text-selene-white/80">{details.quality}</span>
          </p>
        </div>
      </div>

      {/* Dato clave */}
      <div className="rounded-xl bg-selene-gold/5 border border-selene-gold/15 p-3.5">
        <div className="flex items-start gap-2.5">
          <IconSparkle size={16} className="text-selene-gold shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-selene-gold block mb-1">Dato clave</span>
            <p className="text-[12px] text-selene-white/80 leading-relaxed italic" style={{ textAlign: 'justify' }}>{details.fact}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-1">
        <p className="text-[12px] text-selene-white-dim mb-2">
          Esto es solo tu Sol. Tu Luna y Ascendente revelan el 90% restante.
        </p>
        <Link
          href="/lecturas/carta-completa"
          className="inline-flex items-center gap-2 text-sm font-semibold text-selene-gold hover:text-selene-gold-light no-underline transition"
        >
          Descubrir mi carta completa <ArrowIcon size={14} />
        </Link>
      </div>
    </div>
  );
}


export default function MiSelenePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [readings, setReadings] = useState([]);
  const [totalReadings, setTotalReadings] = useState(0);
  const [loading, setLoading] = useState(true);

  // Onboarding inline state
  const [onboardDate, setOnboardDate] = useState('');
  const [onboardResult, setOnboardResult] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth?mode=login');
        return;
      }
      setUser(user);

      // Load profile
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profileData);
      } catch (e) {
        console.error('Error loading profile:', e);
      }

      // Load today's horoscope
      try {
        const today = new Date().toISOString().split('T')[0];
        const sunSign = user.user_metadata?.sun_sign || null;
        if (sunSign) {
          const { data: horoscopeData } = await supabase
            .from('daily_horoscopes')
            .select('*')
            .eq('sign', sunSign)
            .eq('horoscope_date', today)
            .single();
          setHoroscope(horoscopeData);
        }
      } catch (e) {
        // No horoscope for today — expected
      }

      // Load reading history
      try {
        const { data: readingsData, count } = await supabase
          .from('readings_history')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        setReadings(readingsData || []);
        setTotalReadings(count || 0);
      } catch (e) {
        console.error('Error loading readings:', e);
      }

      setLoading(false);
    }
    init();
  }, []);

  // Handle inline onboarding date submit
  async function handleOnboardSubmit(e) {
    e.preventDefault();
    if (!onboardDate) return;

    const signObj = getSunSign(onboardDate);
    if (signObj) {
      setOnboardResult(signObj);

      // Save to profile
      setSavingProfile(true);
      try {
        await supabase.auth.updateUser({
          data: {
            sun_sign: signObj.name,
            birth_date: onboardDate,
          },
        });
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            sun_sign: signObj.name,
            birth_date: onboardDate,
          });

        // Update local state
        setProfile(prev => ({ ...prev, sun_sign: signObj.name, birth_date: onboardDate }));
        setUser(prev => ({
          ...prev,
          user_metadata: { ...prev.user_metadata, sun_sign: signObj.name, birth_date: onboardDate },
        }));
      } catch (e) {
        console.error('Error saving profile:', e);
      } finally {
        setSavingProfile(false);
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
        <p className="font-display text-lg text-selene-gold mt-6">Alineando tus estrellas...</p>
      </div>
    );
  }

  const meta = user?.user_metadata || {};
  const userName = meta.name || profile?.name || user?.email?.split('@')[0] || 'viajera estelar';
  const sunSign = onboardResult?.name || meta.sun_sign || profile?.sun_sign;
  const moonSign = profile?.moon_sign;
  const risingSign = profile?.rising_sign;
  const hasBirthTime = !!meta.birth_time;

  // Zodiac data
  const signData = sunSign
    ? ZODIAC_SIGNS.find(z => z.name.toLowerCase() === sunSign.toLowerCase())
    : null;

  // Normalize sign name for lookups (handle accented vs unaccented)
  const normalizedSign = signData?.name
    ? signData.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : null;

  // Moon phase
  const today = new Date();
  const moonPhaseIndex = getMoonPhase(today);
  const moonEmoji = getMoonEmoji(moonPhaseIndex);
  const moonPhaseName = getMoonPhaseName(moonPhaseIndex);

  // Days since account creation
  const createdAt = user?.created_at ? new Date(user.created_at) : today;
  const daysSinceCreation = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));

  // Date display
  const dateStr = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  // Dato del dia
  const datoIndex = today.getDay(); // 0-6
  const dato = DATOS_DEL_DIA[datoIndex];

  // Static horoscope fallback
  const staticHoroscope = sunSign ? STATIC_HOROSCOPES[sunSign] || null : null;
  const displayHoroscope = horoscope || (staticHoroscope ? {
    content: staticHoroscope.content,
    energy_level: staticHoroscope.energy,
    focus_area: staticHoroscope.focus,
  } : null);

  // Element color for onboarding card
  const onboardElColor = onboardResult?.element ? ELEMENT_COLORS[onboardResult.element] : null;

  const inputClass = "w-full px-4 py-3 bg-selene-elevated border border-selene-border rounded-xl text-selene-white text-sm outline-none focus:border-selene-gold/40 transition placeholder:text-selene-white-dim/50";

  // Empty readings preview cards
  const emptyReadingPreviews = [
    {
      id: 'carta-completa',
      IconComp: IconMoonCustom,
      title: 'Tu Carta Completa',
      price: '7,99',
      desc: 'Lo que los planetas dicen de ti',
      gradient: 'from-blue-500/10 to-transparent',
    },
    {
      id: 'compatibilidad',
      IconComp: IconConjunction,
      title: 'Compatibilidad',
      price: '9,99',
      desc: 'La quimica cosmica entre dos personas',
      gradient: 'from-pink-500/10 to-transparent',
    },
    {
      id: 'tarot-profunda',
      IconComp: IconTarot,
      title: 'Tarot',
      price: '1,99',
      desc: '3 cartas, 3 respuestas',
      gradient: 'from-purple-500/10 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar showAuth={false} showDashboardNav />

      <div className="max-w-[800px] mx-auto px-5 py-6">

        {/* ═══ Welcome Header ═══ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-display text-[28px] font-normal text-selene-white">
              Hola, {userName} <span className="text-xl">{moonEmoji}</span>
            </h1>
          </div>
          <p className="text-[13px] text-selene-white-dim">
            {capitalizedDate} &middot; {moonPhaseName}
          </p>
        </div>

        {/* ═══ Eventos cósmicos próximos ═══ */}
        <SectionTitle subtitle="Lo que viene en el cielo">Eventos cósmicos</SectionTitle>
        <Card className="p-5 mb-8">
          <EventosCosmicos sunSign={sunSign} />
        </Card>

        {/* ═══ Quick Stats Bar ═══ */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
          {signData && (
            <div className="flex items-center gap-2 bg-selene-card border border-selene-border rounded-xl px-4 py-2.5 shrink-0">
              <span className="text-lg">{signData.emoji}</span>
              <span className="text-xs font-medium text-selene-white">{signData.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-selene-card border border-selene-border rounded-xl px-4 py-2.5 shrink-0">
            <span className="text-xs text-selene-white-dim">Lecturas</span>
            <span className="text-xs font-semibold text-selene-gold">{totalReadings}</span>
          </div>
          <div className="flex items-center gap-2 bg-selene-card border border-selene-border rounded-xl px-4 py-2.5 shrink-0">
            <span className="text-xs text-selene-white-dim">Contigo desde hace</span>
            <span className="text-xs font-semibold text-selene-gold">
              {daysSinceCreation === 0 ? 'hoy' : `${daysSinceCreation}d`}
            </span>
          </div>
        </div>

        {/* ═══ Dato del dia ═══ */}
        <Card className="p-4 mb-8 border-selene-gold/10 bg-gradient-to-r from-selene-gold/5 to-transparent">
          <div className="flex items-start gap-3">
            {(() => {
              const DatoIcon = DATO_ICON_MAP[dato.icon] || IconStar;
              return <DatoIcon size={22} className="text-selene-gold shrink-0 mt-0.5" />;
            })()}
            <div>
              <p className="text-[10px] text-selene-gold font-semibold tracking-[0.1em] uppercase mb-1">Dato del dia</p>
              <p className="text-[13px] text-selene-white/85 leading-relaxed" style={{ textAlign: 'justify' }}>{dato.text}</p>
            </div>
          </div>
        </Card>

        {/* ═══ Carta Natal / Onboarding ═══ */}
        <SectionTitle subtitle="Tu triada esencial">Carta Natal</SectionTitle>

        {sunSign ? (
          /* ── Has sun sign: show natal chart ── */
          <Card className="p-5 mb-8 border-selene-gold/20">
            {/* Sun sign with description */}
            <div className="flex items-start gap-4 mb-5 pb-5 border-b border-selene-border">
              <div className="text-3xl shrink-0">{signData?.emoji || '☉'}</div>
              <div>
                <div className="text-sm font-semibold text-selene-white mb-0.5">
                  ☉ Sol en {sunSign}
                </div>
                <p className="text-[12px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>
                  {signData?.description || 'Tu signo solar define tu esencia y tu camino de vida.'}
                </p>
              </div>
            </div>

            {/* Moon and Rising */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl text-selene-white-dim">☽</div>
                <div>
                  <div className="text-[13px] font-semibold text-selene-white">{moonSign || '—'}</div>
                  <div className="text-[11px] text-selene-white-dim">Luna</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl text-selene-white-dim">↑</div>
                <div>
                  <div className="text-[13px] font-semibold text-selene-white">{risingSign || '—'}</div>
                  <div className="text-[11px] text-selene-white-dim">Ascendente</div>
                </div>
              </div>
            </div>

            {!hasBirthTime && !moonSign && (
              <div className="bg-selene-gold/5 rounded-xl p-3 border border-selene-gold/15 text-xs text-selene-white-dim leading-relaxed mb-3">
                Anade tu hora de nacimiento en tu perfil para calcular tu Luna y Ascendente.
              </div>
            )}

            {/* ── NEW: Expanded sign details ── */}
            {signData && (
              <SignDetailsPanel signName={normalizedSign} signElement={signData.element} />
            )}
          </Card>
        ) : (
          /* ── No sun sign: inline onboarding ── */
          <Card className="mb-8 border-selene-gold/20 overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-selene-gold/5 to-transparent pointer-events-none" />
              <div className="relative p-6">
                {!onboardResult ? (
                  /* Date picker onboarding */
                  <div className="text-center">
                    <div className="mb-4"><IconSparkle size={48} className="text-selene-gold mx-auto" /></div>
                    <h3 className="font-display text-xl text-selene-white mb-2">
                      Completa tu perfil para desbloquear tu experiencia personalizada
                    </h3>
                    <p className="text-[13px] text-selene-white-dim mb-6 max-w-[400px] mx-auto">
                      Solo necesitamos tu fecha de nacimiento. Selene calcula tu signo solar al instante.
                    </p>
                    <form onSubmit={handleOnboardSubmit} className="max-w-[300px] mx-auto space-y-3">
                      <input
                        className={inputClass}
                        type="date"
                        value={onboardDate}
                        onChange={e => setOnboardDate(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-selene-gold text-selene-bg font-semibold text-sm py-3 rounded-xl hover:brightness-110 transition"
                      >
                        Descubrir mi signo
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Instant sign reveal */
                  <div className="text-center animate-fade-in">
                    <div className="text-[72px] leading-none mb-3">{onboardResult.emoji}</div>
                    <h3 className="font-display text-2xl text-selene-gold mb-2">{onboardResult.name}</h3>
                    {onboardElColor && (
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${onboardElColor.bg} ${onboardElColor.border} ${onboardElColor.text} border mb-4`}>
                        {onboardResult.element}
                      </div>
                    )}
                    <p className="text-[13px] text-selene-white/90 italic leading-relaxed max-w-[400px] mx-auto mb-4">
                      {onboardResult.description}
                    </p>
                    {savingProfile && (
                      <p className="text-[11px] text-selene-gold animate-pulse">Guardando tu perfil...</p>
                    )}
                    {!savingProfile && (
                      <p className="text-[11px] text-selene-white-dim">
                        Perfil actualizado. Tu dashboard ahora esta personalizado.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* ═══ Horoscopo del dia ═══ */}
        <SectionTitle subtitle="Personalizado segun tu signo solar">Horoscopo del dia</SectionTitle>
        <Card className="p-5 mb-8">
          {displayHoroscope && sunSign ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <CompassIcon size={20} className="text-selene-gold" />
                <span className="text-sm font-semibold text-selene-white">
                  {sunSign} — {today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <p className="text-[13px] text-selene-white leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                {displayHoroscope.content}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                {displayHoroscope.energy_level != null && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-selene-white-dim">Energia:</span>
                    <EnergyDots level={Math.round(displayHoroscope.energy_level / 2)} total={5} />
                  </div>
                )}
                {displayHoroscope.focus_area && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-selene-white-dim">Foco:</span>
                    <Badge className="text-[10px]">{displayHoroscope.focus_area}</Badge>
                  </div>
                )}
              </div>
              {!horoscope && staticHoroscope && (
                <p className="text-[10px] text-selene-white-dim/50 mt-3 italic">
                  Lectura general de tu signo. Tu horoscopo personalizado se genera cada manana.
                </p>
              )}

              {/* ── NEW: Life Areas Grid ── */}
              {normalizedSign && <LifeAreasGrid sign={normalizedSign} />}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-3xl mb-3">{moonEmoji}</div>
              <p className="text-sm text-selene-white mb-1">Tu horoscopo se activa con tu signo solar</p>
              <p className="text-[11px] text-selene-white-dim">
                Completa tu perfil arriba para desbloquear tu horoscopo diario.
              </p>
            </div>
          )}
        </Card>

        {/* ═══ NEW: Consejo del dia ═══ */}
        <SectionTitle subtitle="Tu brujula diaria">Consejo del dia</SectionTitle>
        <div className="mb-8">
          <ConsejoDelDia />
        </div>

        {/* ═══ Mis lecturas recientes ═══ */}
        <SectionTitle subtitle="Tu historial de lecturas">Mis lecturas</SectionTitle>

        {readings.length > 0 ? (
          <Card className="mb-8 overflow-hidden">
            {readings.map((reading, i) => {
              const readingMeta = READINGS.find(r => r.id === reading.reading_type);
              const ReadingIconComp = getReadingIcon(reading.reading_type);
              const date = new Date(reading.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div
                  key={reading.id || i}
                  className={`flex items-center gap-3 px-5 py-3.5 hover:bg-selene-elevated/50 transition ${
                    i > 0 ? 'border-t border-selene-border' : ''
                  }`}
                >
                  <ReadingIconComp size={18} className="text-selene-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-selene-white truncate">
                      {readingMeta?.title || reading.reading_type}
                    </div>
                    <div className="text-[11px] text-selene-white-dim">{date}</div>
                  </div>
                  <ArrowIcon size={12} className="text-selene-white-dim shrink-0" />
                </div>
              );
            })}
          </Card>
        ) : (
          /* Empty state: preview cards */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {emptyReadingPreviews.map(preview => (
              <Link key={preview.id} href={`/lecturas/${preview.id}`} className="no-underline group">
                <Card hover className="p-5 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${preview.gradient} pointer-events-none`} />
                  <div className="relative">
                    <div className="flex justify-between items-start mb-3">
                      <preview.IconComp size={28} className="text-selene-gold" />
                      <span className="font-display text-sm font-semibold text-selene-gold">
                        {preview.price} &euro;
                      </span>
                    </div>
                    <h4 className="text-[14px] font-semibold text-selene-white mb-1 group-hover:text-selene-gold transition-colors">
                      {preview.title}
                    </h4>
                    <p className="text-[12px] text-selene-white-dim leading-relaxed">
                      {preview.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-[11px] text-selene-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Descubrir <ArrowIcon size={10} />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* ═══ Explorar ═══ */}
        <SectionTitle subtitle="Descubre nuevas experiencias">Explorar</SectionTitle>
        <div className="space-y-3 mb-10">
          <Link href="/lecturas/tarot-profunda" className="no-underline block group">
            <Card hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/5 pointer-events-none" />
              <div className="relative flex items-center gap-4 p-5">
                <IconTarot size={36} className="text-selene-gold shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display text-base text-selene-white mb-0.5 group-hover:text-selene-gold transition-colors">Tarot</h3>
                  <p className="text-[12px] text-selene-white-dim leading-relaxed">
                    Deja que las cartas revelen lo que necesitas escuchar. Pasado, presente y futuro en una tirada completa.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-sm font-semibold text-selene-gold">1,99 &euro;</span>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/lecturas/compatibilidad" className="no-underline block group">
            <Card hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-pink-500/5 pointer-events-none" />
              <div className="relative flex items-center gap-4 p-5">
                <IconConjunction size={36} className="text-selene-gold shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display text-base text-selene-white mb-0.5 group-hover:text-selene-gold transition-colors">Compatibilidad</h3>
                  <p className="text-[12px] text-selene-white-dim leading-relaxed">
                    Explora la quimica cosmica entre dos personas. Aspectos armonicos, tensiones y claves para conectar.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-sm font-semibold text-selene-gold">9,99 &euro;</span>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/lecturas/suenos" className="no-underline block group">
            <Card hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/5 pointer-events-none" />
              <div className="relative flex items-center gap-4 p-5">
                <IconDream size={36} className="text-selene-gold shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display text-base text-selene-white mb-0.5 group-hover:text-selene-gold transition-colors">Interpretacion de Suenos</h3>
                  <p className="text-[12px] text-selene-white-dim leading-relaxed">
                    Describe tu sueno y recibe una interpretacion basada en simbologia arquetipica.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-sm font-semibold text-selene-gold">1,99 &euro;</span>
                </div>
              </div>
            </Card>
          </Link>

          <a href="https://academy.selenaura.com/" target="_blank" rel="noopener noreferrer" className="no-underline block group">
            <Card hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-selene-gold/8 via-transparent to-selene-gold/5 pointer-events-none" />
              <div className="relative flex items-center gap-4 p-5">
                <IconStar size={36} className="text-selene-gold shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display text-base text-selene-white mb-0.5 group-hover:text-selene-gold transition-colors">Academia</h3>
                  <p className="text-[12px] text-selene-white-dim leading-relaxed">
                    Cursos para profundizar en tu autoconocimiento. Empieza con Brujula Interior — completamente gratis.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-selene-gold/20 text-selene-gold">Gratis</span>
                </div>
              </div>
            </Card>
          </a>
        </div>

      </div>
    </div>
  );
}
