import Link from 'next/link';
import { Navbar, Card, ArrowIcon, MoonIcon } from '@/components/ui';
import LecturaExpressForm from '@/components/LecturaExpressForm';
import { getUpcomingEvents, getImpactColor, getTypeLabel, formatEventDate, daysUntil } from '@/lib/cosmic-calendar';
import {
  IconConstellation, IconConjunction, IconTarot, IconDream,
  IconStar, IconMoon as IconMoonCustom,
  getEventIcon,
} from '@/components/icons';

export default function HomePage() {
  const testimonials = [
    {
      text: 'Me dio escalofríos lo precisa que fue. Nunca había leído algo que me describiera tan bien.',
      name: 'L.M.',
      sign: 'Escorpio',
    },
    {
      text: 'Pensé que sería genérico, pero tocó puntos que solo yo conozco. Ahora reviso mi horóscopo cada día.',
      name: 'A.R.',
      sign: 'Cáncer',
    },
    {
      text: 'Me ayudó a entender patrones que llevaba repitiendo toda mi vida. No es magia: es autoconocimiento profundo.',
      name: 'M.R.',
      sign: 'Sagitario',
    },
  ];

  const premiumReadings = [
    {
      id: 'carta-completa',
      IconComp: IconConstellation,
      title: 'Carta Completa',
      desc: 'Todos los planetas, casas y aspectos de tu cielo natal',
      preview: 'Incluye tu Sol, Luna, Ascendente y los 10 planetas con sus aspectos principales.',
      price: '7,99',
      badge: 'Lo más vendido',
      badgeColor: '#C9A84C',
      url: 'https://carta.selenaura.com/',
    },
    {
      id: 'compatibilidad',
      IconComp: IconConjunction,
      title: 'Compatibilidad',
      desc: 'La química cósmica entre dos personas',
      preview: 'Sinastría completa: dónde conectáis, dónde hay fricción y cómo crecer juntos.',
      price: '9,99',
      badge: null,
      badgeColor: null,
      url: 'https://carta.selenaura.com/',
    },
    {
      id: 'tarot-profunda',
      IconComp: IconTarot,
      title: 'Tarot',
      desc: '3 cartas, 3 respuestas. Pasado, presente y futuro',
      preview: 'Tirada personalizada con interpretación profunda de cada arcano.',
      price: '1,99',
      badge: null,
      badgeColor: null,
      url: 'https://tarot.selenaura.com/',
    },
    {
      id: 'suenos',
      IconComp: IconDream,
      title: 'Interpretación de Sueños',
      desc: 'Descifra el lenguaje de tu inconsciente',
      preview: 'Análisis simbólico conectado con tu carta natal y tus tránsitos actuales.',
      price: '1,99',
      badge: 'Nuevo',
      badgeColor: '#4A6FA5',
      url: 'https://suenos.selenaura.com/',
    },
  ];

  const discoveryCards = [
    {
      title: 'Tu personalidad según la neurociencia',
      text: 'Tu signo solar no es solo un símbolo \u2014 correlaciona con patrones reales de activación neuronal estudiados por investigadores como Eysenck y Mischel.',
      badge: 'Base científica',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-selene-gold">
          <path d="M12 2a7 7 0 017 7c0 3-2 5-3.5 6.5S13 18 13 22h-2c0-4-1-5-2.5-6.5S5 12 5 9a7 7 0 017-7z"/>
          <path d="M10 22h4"/>
        </svg>
      ),
    },
    {
      title: 'Tu mapa emocional',
      text: 'Tu Luna revela patrones emocionales inconscientes. La amígdala procesa emociones antes de que tu mente consciente las registre \u2014 y tu carta natal mapea esos patrones.',
      badge: 'Exclusivo',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-selene-gold">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
    },
    {
      title: 'Tránsitos que te afectan ahora',
      text: 'Los planetas no se detienen. Cada semana, nuevas configuraciones activan diferentes áreas de tu carta natal. Selene te avisa de lo que viene.',
      badge: 'Actualización diaria',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-selene-gold">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
    {
      title: 'Compatibilidad real',
      text: 'No es solo "Aries con Libra". La sinastría analiza 10 planetas entre dos cartas para revelar dónde conectáis y dónde hay fricción.',
      badge: 'Parejas',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-selene-gold">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar />

      {/* ======= Section 1: Hero + Form (Above Fold) ======= */}
      <section className="relative overflow-hidden">
        {/* Constellation dot pattern */}
        <div className="absolute inset-0 constellation-bg opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-radial-gold" />

        {/* Subtle rotating zodiac wheel SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="rotate-slow" width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ opacity: 0.03 }}>
            <circle cx="350" cy="350" r="300" stroke="#C9A84C" strokeWidth="0.5"/>
            <circle cx="350" cy="350" r="250" stroke="#C9A84C" strokeWidth="0.3"/>
            <circle cx="350" cy="350" r="200" stroke="#C9A84C" strokeWidth="0.3"/>
            {/* 12 division lines */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 350 + 200 * Math.cos(angle);
              const y1 = 350 + 200 * Math.sin(angle);
              const x2 = 350 + 300 * Math.cos(angle);
              const y2 = 350 + 300 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="0.3" />;
            })}
          </svg>
        </div>

        <div className="relative max-w-[960px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Copy */}
            <div className="text-center md:text-left">
              <h1 className="font-display text-3xl md:text-[44px] font-light text-selene-white mb-5 leading-[1.15]">
                Tu fecha de nacimiento{' '}
                <span className="text-gradient-gold font-normal">esconde un patrón</span>
              </h1>
              <p className="text-selene-white-dim text-[16px] max-w-[440px] mb-4 leading-relaxed mx-auto md:mx-0 text-justify">
                La cronobiología estudia cómo el momento de nacer influye en tu personalidad. Introduce tu fecha y descúbrelo en 3 segundos.
              </p>
              <p className="text-selene-gold/70 text-[13px] mb-6 mx-auto md:mx-0">
                Más de 12.000 personas ya descubrieron su perfil con nosotros
              </p>
              <div className="flex flex-wrap gap-4 text-[12px] text-selene-white-dim justify-center md:justify-start">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-selene-gold" />
                  Resultado instantáneo
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-selene-gold" />
                  Sin registro
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-selene-gold" />
                  100% gratis
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-selene-card/80 backdrop-blur-xl rounded-2xl border border-selene-border p-6 glow-gold">
              <h2 className="font-display text-lg text-selene-white mb-1 text-center">Tu Lectura Express</h2>
              <p className="text-[12px] text-selene-white-dim mb-5 text-center">
                Un solo dato. Un resultado que te sorprenderá.
              </p>
              <LecturaExpressForm />
            </div>
          </div>
        </div>
      </section>

      {/* ======= Section 2: "Asi funciona" + Testimonials ======= */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Simple y preciso
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">
            Así funciona
          </h2>
        </div>

        {/* 3-step process */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-14">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-16 h-16 rounded-full border border-selene-gold/30 bg-selene-card flex items-center justify-center mb-3 glow-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p className="text-[13px] text-selene-white font-medium">Introduce tu fecha</p>
            <p className="text-[11px] text-selene-white-dim mt-1">Solo tu nacimiento</p>
          </div>

          {/* Connector */}
          <div className="hidden sm:block flex-1 max-w-[80px] border-t border-dashed border-selene-gold/30 mx-2" />

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-16 h-16 rounded-full border border-selene-gold/30 bg-selene-card flex items-center justify-center mb-3 glow-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </div>
            <p className="text-[13px] text-selene-white font-medium">Selene calcula tu cielo</p>
            <p className="text-[11px] text-selene-white-dim mt-1">Precisión astronómica</p>
          </div>

          {/* Connector */}
          <div className="hidden sm:block flex-1 max-w-[80px] border-t border-dashed border-selene-gold/30 mx-2" />

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-16 h-16 rounded-full border border-selene-gold/30 bg-selene-card flex items-center justify-center mb-3 glow-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <p className="text-[13px] text-selene-white font-medium">Recibes tu lectura</p>
            <p className="text-[11px] text-selene-white-dim mt-1">En tu email al instante</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-5 card-lift">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className="text-selene-gold text-xs">{'\u2605'}</span>
                ))}
              </div>
              <p className="text-[13px] text-selene-white/90 leading-relaxed mb-3 italic" style={{ textAlign: 'justify' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[11px] text-selene-white-dim">
                &mdash; {t.name}, {t.sign}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 3: "Lo que descubriras" ======= */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Ciencia y consciencia
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">
            Lo que descubrirás
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {discoveryCards.map((card, i) => (
            <div
              key={i}
              className="bg-selene-card rounded-2xl border border-selene-border p-6 glow-gold card-lift relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-selene-gold/15 text-selene-gold tracking-wide">
                  {card.badge}
                </span>
              </div>
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-[16px] font-semibold text-selene-white mb-2 pr-16">{card.title}</h3>
              <p className="text-[13px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 4: Premium Readings Catalog ======= */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Lecturas premium
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">Profundiza</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {premiumReadings.map(reading => (
            <Link
              key={reading.id}
              href={reading.url || `/lecturas/${reading.id}`}
              target={reading.url?.startsWith('http') ? '_blank' : undefined}
              rel={reading.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="no-underline group"
            >
              <div className="bg-selene-card rounded-2xl border-gradient p-5 h-full transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] card-lift relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <reading.IconComp size={32} className="text-selene-gold" />
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-semibold text-selene-gold">
                      {reading.price} &euro;
                    </span>
                    {reading.badge && (
                      <span
                        className="text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wide whitespace-nowrap"
                        style={{ background: reading.badgeColor, color: '#0A0A0F' }}
                      >
                        {reading.badge}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-selene-white mb-1.5 group-hover:text-selene-gold transition-colors">
                  {reading.title}
                </h3>
                <p className="text-[13px] text-selene-white-dim leading-relaxed mb-2" style={{ textAlign: 'justify' }}>
                  {reading.desc}
                </p>
                <p className="text-[12px] text-selene-white/50 leading-relaxed italic" style={{ textAlign: 'justify' }}>
                  {reading.preview}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-xs text-selene-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Descubrir <ArrowIcon size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/lecturas" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
            Ver todas las lecturas &rarr;
          </Link>
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 4b: Cosmic Calendar ======= */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Calendario cósmico 2026
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">
            Lo que viene en el cielo
          </h2>
          <p className="text-selene-white-dim text-sm mt-3 max-w-[500px] mx-auto">
            Eventos astronómicos y astrológicos reales. Datos de NASA y observatorios — no predicciones inventadas.
          </p>
        </div>

        <div className="space-y-3">
          {getUpcomingEvents(4).map((ev, i) => {
            const days = daysUntil(ev.date);
            const impact = getImpactColor(ev.impact);
            const typeLabel = getTypeLabel(ev.type);
            const EvIcon = getEventIcon(ev.type);
            return (
              <Card key={i} className={`p-5 card-lift ${ev.impact === 'alto' ? 'border-selene-gold/20' : ''}`}>
                <div className="flex items-start gap-4">
                  <EvIcon size={28} className="text-selene-gold shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[12px] font-semibold text-selene-gold">{formatEventDate(ev.date)}</span>
                      {days <= 7 && days >= 0 && (
                        <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-selene-gold/15 text-selene-gold">
                          {days === 0 ? 'HOY' : `en ${days} días`}
                        </span>
                      )}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${impact.bg} ${impact.text}`}>{typeLabel}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-selene-white mb-0.5">{ev.title}</h3>
                    {ev.subtitle && <p className="text-[11px] text-selene-gold/60 mb-1">{ev.subtitle}</p>}
                    <p className="text-[13px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>{ev.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link href="/auth?mode=register" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
            Crear cuenta para ver el calendario completo &rarr;
          </Link>
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section: Mercurio Retrógrado ======= */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            ☿ Mercurio Retrógrado 2026
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white mb-4">
            ¿Cómo te afecta a ti?
          </h2>
          <p className="text-selene-white-dim text-sm max-w-[520px] mx-auto" style={{ textAlign: 'justify' }}>
            Tres veces al año, Mercurio parece retroceder en el cielo. La comunicación se enreda, los contratos se complican y los malentendidos se multiplican. Pero no afecta igual a todos los signos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-selene-card rounded-2xl border border-selene-border p-5 text-center opacity-50">
            <p className="text-[10px] text-selene-white-dim uppercase tracking-wider mb-2">Terminado</p>
            <p className="font-display text-lg text-selene-white/50">En Piscis</p>
            <p className="text-[12px] text-selene-white-dim mt-1">Feb → 20 mar 2026</p>
          </div>
          <div className="bg-selene-card rounded-2xl border border-selene-gold/30 p-5 text-center glow-gold relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-0.5 rounded-full bg-selene-gold text-selene-bg">PRÓXIMO</span>
            <p className="text-[10px] text-selene-gold uppercase tracking-wider mb-2 mt-1">29 jun → 23 jul</p>
            <p className="font-display text-lg text-selene-gold">En Cáncer</p>
            <p className="text-[12px] text-selene-white-dim mt-1">Emociones y familia</p>
          </div>
          <div className="bg-selene-card rounded-2xl border border-selene-border p-5 text-center">
            <p className="text-[10px] text-selene-white-dim uppercase tracking-wider mb-2">Último del año</p>
            <p className="font-display text-lg text-selene-white">En Escorpio</p>
            <p className="text-[12px] text-selene-white-dim mt-1">24 oct → nov 2026</p>
          </div>
        </div>

        <div className="bg-selene-card rounded-2xl border border-selene-gold/15 p-6 text-center">
          <p className="text-selene-white text-[15px] mb-4" style={{ textAlign: 'justify' }}>
            Cada retrógrado activa zonas diferentes de tu carta natal. Tu signo solar determina qué área de tu vida se ve más afectada — y qué puedes hacer para navegar este tránsito con claridad.
          </p>
          <Link
            href="/auth?mode=register"
            className="inline-block bg-selene-gold text-selene-bg font-semibold text-[14px] px-8 py-3 rounded-xl no-underline hover:bg-selene-gold-light transition-colors"
          >
            Quiero saber cómo me afecta ✦
          </Link>
          <p className="text-[11px] text-selene-white-dim/50 mt-3">Lectura personalizada gratis · Solo necesitas tu fecha de nacimiento</p>
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 5: Science Differentiator ======= */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            La diferencia
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">
            &iquest;Por qué Selene es diferente?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Other apps */}
          <div className="bg-selene-card rounded-2xl border border-selene-border p-6">
            <h3 className="text-[14px] font-semibold text-selene-white-dim mb-5 uppercase tracking-wider">
              Otras apps
            </h3>
            <ul className="space-y-4">
              {[
                'Predicciones genéricas',
                'Sin base científica',
                'Horóscopo de periódico',
                'Solo tu signo solar',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-selene-white-dim/70">
                  <span className="text-red-400/80 mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Selene */}
          <div className="bg-selene-card rounded-2xl border border-selene-gold/25 p-6 glow-gold relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-selene-gold/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h3 className="text-[14px] font-semibold text-selene-gold mb-5 uppercase tracking-wider">
                Selene
              </h3>
              <ul className="space-y-4">
                {[
                  'Neurociencia + astrología',
                  'Estudios citados en cada lectura',
                  'Personalización por carta natal completa',
                  '10 planetas analizados',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-selene-white">
                    <span className="text-selene-gold mt-0.5 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 6: Brujula Interior Course ======= */}
      <section className="max-w-[700px] mx-auto px-6 py-16">
        <Card className="p-8 text-center border-selene-gold/15 relative overflow-hidden constellation-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-selene-gold/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="mb-4"><IconStar size={40} className="text-selene-gold mx-auto" /></div>
            <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-2">
              Formación
            </p>
            <h3 className="font-display text-2xl text-selene-white mb-2">
              Tu primer curso &mdash; completamente gratuito
            </h3>
            <p className="text-[14px] text-selene-white-dim max-w-[440px] mx-auto mb-6 leading-relaxed">
              Despierta tu Brújula Interior: fundamentos de consciencia cósmica, tu carta natal y tu primera meditación con resultados reales.
            </p>
            <a
              href="https://academy.selenaura.com/"
              className="inline-block bg-selene-gold text-selene-bg font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-110 no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorar cursos
            </a>
          </div>
        </Card>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section: Master en Guia Espiritual Profesional ======= */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="relative bg-selene-card rounded-2xl border border-selene-gold/25 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-selene-gold/8 via-transparent to-selene-gold/3 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04]">
            <svg viewBox="0 0 200 200" fill="none" stroke="#C9A84C" strokeWidth="0.5">
              <circle cx="100" cy="100" r="80" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                return <line key={i} x1={100 + 40 * Math.cos(angle)} y1={100 + 40 * Math.sin(angle)} x2={100 + 80 * Math.cos(angle)} y2={100 + 80 * Math.sin(angle)} />;
              })}
            </svg>
          </div>

          <div className="relative p-8 md:p-10">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[9px] font-bold px-3 py-1 rounded-full bg-selene-gold text-selene-bg tracking-wide">
                NUEVO
              </span>
              <span className="text-[11px] text-selene-gold font-semibold tracking-[0.12em] uppercase">
                Formaci&oacute;n profesional
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl md:text-[28px] text-selene-white mb-3 leading-tight">
              Convierte tu don en tu profesi&oacute;n
            </h3>
            <p className="text-[15px] text-selene-white-dim max-w-[560px] mb-6 leading-relaxed" style={{ textAlign: 'justify' }}>
              El M&aacute;ster en Gu&iacute;a Espiritual Profesional te da la estructura, la ciencia y la &eacute;tica para ejercer con confianza. El &uacute;nico programa en espa&ntilde;ol que integra carta natal, neurociencia y negocio espiritual.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: '\u2726', text: 'M\u00e9todo Selene: carta natal + neurociencia + \u00e9tica profesional' },
                { icon: '\uD83C\uDF93', text: '30 lecciones, 10 m\u00f3dulos, certificado verificable' },
                { icon: '\uD83D\uDCBC', text: 'M\u00f3dulos de negocio, pricing, legal y marca personal' },
                { icon: '\u2728', text: 'Directorio Profesional Selene: visibilidad para captar clientes' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-selene-elevated/40 rounded-xl px-4 py-3">
                  <span className="text-base shrink-0 mt-0.5">{b.icon}</span>
                  <span className="text-[13px] text-selene-white/90 leading-snug">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://academy.selenaura.com/"
                className="inline-flex items-center gap-2 bg-selene-gold text-selene-bg font-semibold text-[14px] px-7 py-3 rounded-xl hover:brightness-110 no-underline transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descubrir el M&aacute;ster
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-selene-gold font-semibold">149,99 &euro;</span>
                <span className="text-[12px] text-selene-white-dim/60 line-through">299 &euro;</span>
              </div>
            </div>

            {/* Social proof */}
            <p className="text-[11px] text-selene-white-dim/50 mt-4">
              Se paga con una sola sesi&oacute;n profesional &middot; Requisito: 2 certificaciones Selene completadas
            </p>
          </div>
        </div>
      </section>

      <div className="divider-stars">
        <span className="text-selene-gold/40 text-xs">{'\u2726'}</span>
      </div>

      {/* ======= Section 7: Final CTA ======= */}
      <section className="max-w-[480px] mx-auto px-6 py-16 text-center">
        <div className="mb-5"><IconMoonCustom size={48} className="text-selene-gold mx-auto" /></div>
        <h2 className="font-display text-3xl font-light text-selene-white mb-3">
          Tus estrellas llevan esperándote toda la vida
        </h2>
        <p className="text-selene-white-dim text-sm mb-8 max-w-[400px] mx-auto">
          3 segundos. Tu fecha de nacimiento. Y Selene te revela lo que llevas dentro.
        </p>
        <div className="bg-selene-card/80 backdrop-blur-xl rounded-2xl border border-selene-border p-6 glow-gold">
          <LecturaExpressForm compact />
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer className="px-6 py-8 border-t border-selene-border text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MoonIcon size={14} className="text-selene-gold/60" />
          <span className="font-display text-xs text-selene-gold/60 tracking-[0.2em]">SELENE</span>
          <span className="text-[11px] text-selene-white-dim/40">&middot;</span>
          <span className="text-[11px] text-selene-white-dim/40">selenaura.com</span>
        </div>
        <div className="flex gap-4 justify-center text-[11px] text-selene-white-dim/40">
          <Link href="/legal" className="hover:text-selene-white-dim no-underline text-selene-white-dim/40">
            Aviso Legal
          </Link>
          <Link href="/privacidad" className="hover:text-selene-white-dim no-underline text-selene-white-dim/40">
            Privacidad
          </Link>
          <Link href="/cookies" className="hover:text-selene-white-dim no-underline text-selene-white-dim/40">
            Cookies
          </Link>
        </div>
      </footer>
    </div>
  );
}
