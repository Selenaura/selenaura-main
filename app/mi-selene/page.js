'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { getCrossSellRecommendations, READINGS } from '@/lib/constants';
import { ZODIAC_SIGNS } from '@/lib/zodiac';
import {
  Navbar, Card, SectionTitle, ArrowIcon, SunIcon, HistoryIcon,
  CompassIcon, MoonIcon, BookIcon, StarIcon, Badge,
} from '@/components/ui';

// ── Moon phase calculation ──
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // Conway's algorithm approximation
  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + month + day;
  if (month < 3) r += 2;
  r -= ((year < 2000) ? 4 : 8.3);
  r = Math.floor(r + 0.5) % 30;
  if (r < 0) r += 30;
  return r; // 0-29
}

function getMoonEmoji(phase) {
  if (phase === 0) return '\uD83C\uDF11';      // new moon
  if (phase <= 3) return '\uD83C\uDF12';        // waxing crescent
  if (phase <= 7) return '\uD83C\uDF13';        // first quarter
  if (phase <= 11) return '\uD83C\uDF14';       // waxing gibbous
  if (phase <= 15) return '\uD83C\uDF15';       // full moon
  if (phase <= 19) return '\uD83C\uDF16';       // waning gibbous
  if (phase <= 23) return '\uD83C\uDF17';       // last quarter
  return '\uD83C\uDF18';                        // waning crescent
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

// ── Reading type icons ──
const READING_ICONS = {
  'lectura-express': '⚡',
  'carta-basica': '☉',
  'carta-completa': '🌙',
  'carta-premium': '✦',
  'compatibilidad': '💫',
  'tarot-profunda': '✨',
  'quirologia': '🤚',
  'suenos': '💤',
};

// ── Energy dots ──
function EnergyDots({ level = 5 }) {
  const total = 10;
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < level ? 'bg-selene-gold' : 'bg-selene-border'
          }`}
        />
      ))}
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
        const sunSign = user.user_metadata?.sun_sign || profile?.sun_sign;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
        <p className="font-display text-lg text-selene-gold mt-6">Alineando tus estrellas...</p>
      </div>
    );
  }

  const meta = user?.user_metadata || {};
  const userName = meta.name || profile?.name || user?.email?.split('@')[0] || 'Viajero estelar';
  const sunSign = meta.sun_sign || profile?.sun_sign;
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

        {/* ═══ Carta Natal Basica ═══ */}
        <SectionTitle subtitle="Tu triada esencial">Carta Natal</SectionTitle>
        <Card className="p-5 mb-8 border-selene-gold/20">
          {sunSign ? (
            <>
              {/* Sun sign with description */}
              <div className="flex items-start gap-4 mb-5 pb-5 border-b border-selene-border">
                <div className="text-3xl shrink-0">{signData?.emoji || '\u2609'}</div>
                <div>
                  <div className="text-sm font-semibold text-selene-white mb-0.5">
                    {'☉'} Sol en {sunSign}
                  </div>
                  <p className="text-[12px] text-selene-white-dim leading-relaxed">
                    {signData?.description || 'Tu signo solar define tu esencia y tu camino de vida.'}
                  </p>
                </div>
              </div>

              {/* Moon and Rising */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl text-selene-white-dim">{'☽'}</div>
                  <div>
                    <div className="text-[13px] font-semibold text-selene-white">{moonSign || '\u2014'}</div>
                    <div className="text-[11px] text-selene-white-dim">Luna</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl text-selene-white-dim">{'↑'}</div>
                  <div>
                    <div className="text-[13px] font-semibold text-selene-white">{risingSign || '\u2014'}</div>
                    <div className="text-[11px] text-selene-white-dim">Ascendente</div>
                  </div>
                </div>
              </div>

              {!hasBirthTime && !moonSign && (
                <div className="bg-selene-blue/10 rounded-xl p-3 border border-selene-blue/15 text-xs text-selene-white-dim leading-relaxed mb-3">
                  Anade tu hora de nacimiento en tu perfil para calcular tu Luna y Ascendente.
                </div>
              )}

              <Link
                href="/lecturas"
                className="flex items-center justify-center gap-2 text-sm text-selene-gold font-medium hover:text-selene-gold-light no-underline mt-2"
              >
                Descubrir mi carta completa <ArrowIcon size={14} />
              </Link>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm text-selene-white mb-1">
                Todavia no conocemos tu signo solar
              </p>
              <p className="text-[12px] text-selene-white-dim mb-4">
                Completa tu perfil con tu fecha de nacimiento para desbloquear tu carta natal.
              </p>
              <Link
                href="/perfil"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-selene-gold text-selene-bg px-5 py-2.5 rounded-lg hover:brightness-110 no-underline"
              >
                Completar perfil <ArrowIcon size={14} className="text-selene-bg" />
              </Link>
            </div>
          )}
        </Card>

        {/* ═══ Horoscopo del dia ═══ */}
        <SectionTitle subtitle="Personalizado segun tu signo solar">Horoscopo del dia</SectionTitle>
        <Card className="p-5 mb-8">
          {horoscope ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <CompassIcon size={20} className="text-selene-gold" />
                <span className="text-sm font-semibold text-selene-white">
                  {sunSign} &mdash; {today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <p className="text-[13px] text-selene-white leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                {horoscope.content}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                {horoscope.energy_level != null && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-selene-white-dim">Energia:</span>
                    <EnergyDots level={horoscope.energy_level} />
                  </div>
                )}
                {horoscope.focus_area && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-selene-white-dim">Foco:</span>
                    <Badge className="text-[10px]">{horoscope.focus_area}</Badge>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-3xl mb-3">{moonEmoji}</div>
              <p className="text-sm text-selene-white mb-1">Tu horoscopo se actualiza cada manana</p>
              <p className="text-[11px] text-selene-white-dim">
                Vuelve manana para descubrir lo que las estrellas tienen preparado.
              </p>
            </div>
          )}
        </Card>

        {/* ═══ Mis lecturas recientes ═══ */}
        <SectionTitle subtitle="Tu historial de lecturas">Mis lecturas recientes</SectionTitle>
        <Card className="mb-8 overflow-hidden">
          {readings.length > 0 ? (
            readings.map((reading, i) => {
              const readingMeta = READINGS.find(r => r.id === reading.reading_type);
              const icon = READING_ICONS[reading.reading_type] || '\uD83D\uDCDC';
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
            })
          ) : (
            <div className="text-center py-8 px-5">
              <HistoryIcon size={28} className="text-selene-white-dim mx-auto mb-3" />
              <p className="text-sm text-selene-white-dim mb-2">Aun no tienes lecturas</p>
              <Link href="/lecturas" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
                Explora las lecturas disponibles &rarr;
              </Link>
            </div>
          )}
        </Card>

        {/* ═══ Explorar ═══ */}
        <SectionTitle subtitle="Descubre nuevas experiencias">Explorar</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <Link href="/lecturas/tarot" className="no-underline">
            <Card hover className="p-5 text-center h-full">
              <div className="text-3xl mb-3">🃏</div>
              <h3 className="font-display text-base text-selene-white mb-1">Tarot</h3>
              <p className="text-[11px] text-selene-white-dim leading-relaxed">
                Deja que las cartas revelen lo que necesitas escuchar.
              </p>
            </Card>
          </Link>
          <Link href="/lecturas/compatibilidad" className="no-underline">
            <Card hover className="p-5 text-center h-full">
              <div className="text-3xl mb-3">💫</div>
              <h3 className="font-display text-base text-selene-white mb-1">Compatibilidad</h3>
              <p className="text-[11px] text-selene-white-dim leading-relaxed">
                Explora la quimica cosmica entre dos personas.
              </p>
            </Card>
          </Link>
          <a href="https://academy.selenaura.com/catalogo" target="_blank" rel="noopener noreferrer" className="no-underline">
            <Card hover className="p-5 text-center h-full">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="font-display text-base text-selene-white mb-1">Academia</h3>
              <p className="text-[11px] text-selene-white-dim leading-relaxed">
                Cursos para profundizar en tu autoconocimiento.
              </p>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}
