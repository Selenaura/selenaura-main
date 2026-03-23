'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { getCrossSellRecommendations, READINGS } from '@/lib/constants';
import { Navbar, Card, SectionTitle, ArrowIcon, SunIcon, HistoryIcon, CompassIcon } from '@/components/ui';

export default function MiSelenePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [readings, setReadings] = useState([]);
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
        const sunSign = user.user_metadata?.sun_sign;
        if (sunSign) {
          const { data: horoscopeData } = await supabase
            .from('daily_horoscopes')
            .select('*')
            .eq('sun_sign', sunSign)
            .eq('date', today)
            .single();
          setHoroscope(horoscopeData);
        }
      } catch (e) {
        // No horoscope for today — expected
      }

      // Load reading history
      try {
        const { data: readingsData } = await supabase
          .from('readings_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        setReadings(readingsData || []);
      } catch (e) {
        console.error('Error loading readings:', e);
      }

      setLoading(false);
    }
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-selene-bg flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
      </div>
    );
  }

  const meta = user?.user_metadata || {};
  const userName = meta.name || user?.email?.split('@')[0] || 'Explorador/a';
  const sunSign = meta.sun_sign || profile?.sun_sign;
  const moonSign = profile?.moon_sign;
  const risingSign = profile?.rising_sign;
  const hasBirthTime = !!meta.birth_time;

  // Reading type icons
  const readingIcons = {
    'lectura-express': '⚡',
    'carta-basica': '☉',
    'carta-completa': '🌙',
    'carta-premium': '✦',
    'compatibilidad': '💫',
    'tarot-profunda': '✨',
    'quirologia': '🤚',
    'suenos': '💤',
  };

  // Cross-sell
  const readingTypes = readings.map(r => r.reading_type);
  const crossSell = getCrossSellRecommendations(readingTypes);

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar showAuth={false} showDashboardNav />

      <div className="max-w-[800px] mx-auto px-5 py-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-[26px] font-normal mb-1.5">
            Hola, {userName} <span className="text-xl">✦</span>
          </h1>
          <p className="text-[13px] text-selene-white-dim">
            {sunSign
              ? <>☉ {sunSign}{moonSign ? ` · ☽ ${moonSign}` : ''}{risingSign ? ` · ↑ ${risingSign}` : ''}</>
              : 'Tu espacio personal de consciencia cosmica'
            }
          </p>
        </div>

        {/* Carta Natal Basica */}
        <SectionTitle subtitle="Tu triada esencial">Carta Natal Basica</SectionTitle>
        <Card className="p-5 mb-8 border-selene-gold/20">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl text-selene-gold mb-1">☉</div>
              <div className="text-[13px] font-semibold text-selene-white">{sunSign || '—'}</div>
              <div className="text-[11px] text-selene-white-dim">Sol</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-selene-white-dim mb-1">☽</div>
              <div className="text-[13px] font-semibold text-selene-white">{moonSign || '—'}</div>
              <div className="text-[11px] text-selene-white-dim">Luna</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-selene-white-dim mb-1">↑</div>
              <div className="text-[13px] font-semibold text-selene-white">{risingSign || '—'}</div>
              <div className="text-[11px] text-selene-white-dim">Ascendente</div>
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
            Ver carta completa <ArrowIcon size={14} />
          </Link>
        </Card>

        {/* Horoscopo del dia */}
        <SectionTitle subtitle="Personalizado segun tu signo solar">Horoscopo del dia</SectionTitle>
        <Card className="p-5 mb-8">
          {horoscope ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <CompassIcon size={20} className="text-selene-gold" />
                <span className="text-sm font-semibold text-selene-white">{sunSign} — {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>
              </div>
              <p className="text-[13px] text-selene-white leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                {horoscope.content}
              </p>
              <div className="flex gap-4">
                {horoscope.energy_level && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-selene-white-dim">Energia:</span>
                    <span className="text-[11px] text-selene-gold font-semibold">{horoscope.energy_level}/10</span>
                  </div>
                )}
                {horoscope.focus_area && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-selene-white-dim">Foco:</span>
                    <span className="text-[11px] text-selene-gold font-semibold">{horoscope.focus_area}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-3">🔮</div>
              <p className="text-sm text-selene-white-dim">Tu horoscopo se genera cada manana</p>
              <p className="text-[11px] text-selene-white-dim mt-1">Vuelve manana para ver tu lectura personalizada</p>
            </div>
          )}
        </Card>

        {/* Mis lecturas */}
        <SectionTitle subtitle="Tu historial de lecturas">Mis lecturas</SectionTitle>
        <Card className="mb-8 overflow-hidden">
          {readings.length > 0 ? (
            readings.map((reading, i) => {
              const readingMeta = READINGS.find(r => r.id === reading.reading_type);
              const icon = readingIcons[reading.reading_type] || '📜';
              const date = new Date(reading.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div
                  key={reading.id || i}
                  className={`flex items-center gap-3 px-5 py-3.5 hover:bg-selene-elevated/50 transition ${i > 0 ? 'border-t border-selene-border' : ''}`}
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
              <p className="text-sm text-selene-white-dim mb-2">Aun no tienes lecturas guardadas</p>
              <Link href="/lecturas" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
                Explora nuestras lecturas →
              </Link>
            </div>
          )}
        </Card>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <>
            <SectionTitle subtitle="Basado en tu historial">Te puede interesar</SectionTitle>
            <div className="flex flex-col gap-3 mb-8">
              {crossSell.map((rec, i) => {
                const targetReading = READINGS.find(r => r.id === rec.to);
                const href = rec.url || (targetReading ? `/lecturas` : '#');

                return (
                  <Link key={i} href={href} className="no-underline" target={rec.url ? '_blank' : undefined}>
                    <Card hover className="p-4 flex items-center gap-3">
                      <span className="text-2xl shrink-0">{rec.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-selene-white">{rec.message}</p>
                        <p className="text-[11px] text-selene-white-dim mt-0.5">
                          {rec.to_type === 'course' ? 'Curso' : 'Lectura'}
                          {targetReading ? ` · ${targetReading.price_label}` : ''}
                        </p>
                      </div>
                      <ArrowIcon size={14} className="text-selene-gold shrink-0" />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
