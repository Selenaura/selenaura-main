'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { getCrossSellRecommendations, READINGS } from '@/lib/constants';
import { ZODIAC_SIGNS, getSunSign } from '@/lib/zodiac';
import {
  Navbar, Card, SectionTitle, ArrowIcon, SunIcon, HistoryIcon,
  CompassIcon, MoonIcon, BookIcon, StarIcon, Badge,
} from '@/components/ui';

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
  if (phase === 0) return '🌑';
  if (phase <= 3) return '🌒';
  if (phase <= 7) return '🌓';
  if (phase <= 11) return '🌔';
  if (phase <= 15) return '🌕';
  if (phase <= 19) return '🌖';
  if (phase <= 23) return '🌗';
  return '🌘';
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
  { emoji: '🌕', text: 'La Luna tarda 27,3 dias en orbitar la Tierra — el mismo ciclo que tu energia emocional.' },
  { emoji: '☉', text: 'El Sol es 109 veces mas grande que la Tierra. Tu signo solar representa tu nucleo mas visible — pero no es todo lo que eres.' },
  { emoji: '🪐', text: 'Saturno tarda 29,5 anos en completar su orbita. El "retorno de Saturno" marca los momentos de mayor crecimiento en la vida adulta.' },
  { emoji: '♀', text: 'Venus rota en sentido contrario al resto de planetas. En astrologia, representa lo que valoras incluso cuando va contra la corriente.' },
  { emoji: '🔴', text: 'Marte tiene el volcan mas alto del sistema solar: 21 km. Tu Marte natal indica donde canalizas tu fuerza mas intensa.' },
  { emoji: '♃', text: 'Jupiter podria contener 1.300 Tierras. En tu carta natal, senala donde tienes capacidad de expansion ilimitada.' },
  { emoji: '💫', text: 'Hay mas estrellas en el universo observable que granos de arena en todas las playas de la Tierra. Tu carta natal captura un instante irrepetible de ese cielo.' },
];

// ── Reading type icons ──
const READING_ICONS = {
  'lectura-express': '⚡',
  'carta-basica': '☉',
  'carta-completa': '🌙',
  'carta-premium': '✦',
  'compatibilidad': '💫',
  'tarot-profunda': '🃏',
  'quirologia': '🤚',
  'suenos': '💤',
};

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
      icon: '🌙',
      title: 'Tu Carta Completa',
      price: '7,99',
      desc: 'Lo que los planetas dicen de ti',
      gradient: 'from-blue-500/10 to-transparent',
    },
    {
      id: 'compatibilidad',
      icon: '💫',
      title: 'Compatibilidad',
      price: '9,99',
      desc: 'La quimica cosmica entre dos personas',
      gradient: 'from-pink-500/10 to-transparent',
    },
    {
      id: 'tarot-profunda',
      icon: '🃏',
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
            <span className="text-2xl shrink-0">{dato.emoji}</span>
            <div>
              <p className="text-[10px] text-selene-gold font-semibold tracking-[0.1em] uppercase mb-1">Dato del dia</p>
              <p className="text-[13px] text-selene-white/85 leading-relaxed">{dato.text}</p>
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
                <p className="text-[12px] text-selene-white-dim leading-relaxed">
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

            <Link
              href="/lecturas"
              className="flex items-center justify-center gap-2 text-sm text-selene-gold font-medium hover:text-selene-gold-light no-underline mt-2"
            >
              Descubrir mi carta completa <ArrowIcon size={14} />
            </Link>
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
                    <div className="text-5xl mb-4">✨</div>
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

        {/* ═══ Mis lecturas recientes ═══ */}
        <SectionTitle subtitle="Tu historial de lecturas">Mis lecturas</SectionTitle>

        {readings.length > 0 ? (
          <Card className="mb-8 overflow-hidden">
            {readings.map((reading, i) => {
              const readingMeta = READINGS.find(r => r.id === reading.reading_type);
              const icon = READING_ICONS[reading.reading_type] || '📜';
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
                  <span className="text-lg shrink-0">{icon}</span>
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
                      <span className="text-[28px]">{preview.icon}</span>
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
                <span className="text-4xl shrink-0">🃏</span>
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
                <span className="text-4xl shrink-0">💫</span>
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
                <span className="text-4xl shrink-0">💤</span>
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

          <a href="https://academia.selenaura.com/catalogo" target="_blank" rel="noopener noreferrer" className="no-underline block group">
            <Card hover className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-selene-gold/8 via-transparent to-selene-gold/5 pointer-events-none" />
              <div className="relative flex items-center gap-4 p-5">
                <span className="text-4xl shrink-0">🌟</span>
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
