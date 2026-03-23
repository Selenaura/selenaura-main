import Link from 'next/link';
import { Navbar, Footer, Card, ArrowIcon, GoldDivider, MoonIcon } from '@/components/ui';
import LecturaExpressForm from '@/components/LecturaExpressForm';

// ── Animated counter (client island) ──
function AnimatedCounter() {
  return (
    <span className="font-display text-4xl md:text-5xl font-light text-selene-gold">
      12.000+
    </span>
  );
}

export default function HomePage() {
  const testimonials = [
    {
      text: 'Me dio escalofrios lo precisa que fue. Nunca habia leido algo que me describiera tan bien.',
      name: 'L.M.',
      sign: 'Escorpio',
    },
    {
      text: 'Pense que seria generico, pero toco puntos que solo yo conozco. Ahora reviso mi horoscopo cada dia.',
      name: 'A.R.',
      sign: 'Cancer',
    },
    {
      text: 'Me ayudo a entender patrones que llevaba repitiendo toda mi vida. No es magia: es autoconocimiento profundo.',
      name: 'M.R.',
      sign: 'Sagitario',
    },
  ];

  const premiumReadings = [
    {
      id: 'carta-completa',
      icon: '🌙',
      title: 'Carta Completa',
      desc: 'Todos los planetas, casas y aspectos de tu cielo natal',
      price: '7,99',
      color: '#4A6FA5',
    },
    {
      id: 'compatibilidad',
      icon: '💫',
      title: 'Compatibilidad',
      desc: 'La quimica cosmica entre dos personas',
      price: '9,99',
      color: '#C97B8B',
    },
    {
      id: 'tarot-profunda',
      icon: '🃏',
      title: 'Tarot',
      desc: '3 cartas, 3 respuestas. Pasado, presente y futuro',
      price: '1,99',
      color: '#7B68AE',
    },
    {
      id: 'suenos',
      icon: '💤',
      title: 'Interpretacion de Suenos',
      desc: 'Descifra el lenguaje de tu inconsciente',
      price: '1,99',
      color: '#4A6FA5',
    },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar />

      {/* ═══════════ Section 1: Hero + Form (Above Fold) ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 star-pattern" />
        <div className="absolute inset-0 bg-gradient-radial-gold" />
        <div className="relative max-w-[960px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Copy */}
            <div className="text-center md:text-left">
              <h1 className="font-display text-3xl md:text-[44px] font-light text-selene-white mb-5 leading-[1.15]">
                Descubre quien eres{' '}
                <span className="text-selene-gold font-normal">segun las estrellas</span>
              </h1>
              <p className="text-selene-white-dim text-[16px] max-w-[440px] mb-6 leading-relaxed mx-auto md:mx-0">
                Introduce tu fecha de nacimiento y Selene te revela tu esencia en 3 segundos.
              </p>
              <div className="flex flex-wrap gap-4 text-[12px] text-selene-white-dim justify-center md:justify-start">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-selene-gold" />
                  Resultado instantaneo
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
            <div className="bg-selene-card/80 backdrop-blur-xl rounded-2xl border border-selene-border p-6">
              <h2 className="font-display text-lg text-selene-white mb-1 text-center">Tu Lectura Express</h2>
              <p className="text-[12px] text-selene-white-dim mb-5 text-center">
                Un solo dato. Un resultado que te sorprendera.
              </p>
              <LecturaExpressForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 2: Social Proof Counter ═══════════ */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <AnimatedCounter />
          <p className="text-selene-white-dim text-sm mt-3">
            personas ya descubrieron su carta natal con Selene
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-5">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className="text-selene-gold text-xs">★</span>
                ))}
              </div>
              <p className="text-[13px] text-selene-white/90 leading-relaxed mb-3 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[11px] text-selene-white-dim">
                — {t.name}, {t.sign}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════ Section 3: Free Features (3 cards) ═══════════ */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Incluido con tu cuenta gratuita
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">
            Todo esto, sin coste
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 border-selene-gold/15 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-selene-gold/20 text-selene-gold">
                Gratis
              </span>
            </div>
            <div className="text-3xl mb-3">🔮</div>
            <h3 className="text-[15px] font-semibold text-selene-white mb-1.5">Horoscopo diario</h3>
            <p className="text-[13px] text-selene-white-dim leading-relaxed mb-3">
              Personalizado segun tu signo solar. Cada manana, una nueva perspectiva.
            </p>
            <div className="bg-selene-elevated rounded-lg p-3 border border-selene-border">
              <div className="text-[10px] text-selene-white-dim mb-1">{dateStr}</div>
              <div className="text-[12px] text-selene-white/80 leading-relaxed">
                Las estrellas alinean nuevas posibilidades hoy...
              </div>
            </div>
          </Card>

          <Card className="p-6 border-selene-gold/15 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-selene-gold/20 text-selene-gold">
                Gratis
              </span>
            </div>
            <div className="text-3xl mb-3">📜</div>
            <h3 className="text-[15px] font-semibold text-selene-white mb-1.5">Historial de lecturas</h3>
            <p className="text-[13px] text-selene-white-dim leading-relaxed">
              Todas tus lecturas guardadas y accesibles siempre. Tu biblioteca cosmica personal.
            </p>
          </Card>

          <Card className="p-6 border-selene-gold/15 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-selene-gold/20 text-selene-gold">
                Gratis
              </span>
            </div>
            <div className="text-3xl mb-3">☉</div>
            <h3 className="text-[15px] font-semibold text-selene-white mb-1.5">Carta natal completa</h3>
            <p className="text-[13px] text-selene-white-dim leading-relaxed">
              Sol, Luna, Ascendente y todos los planetas calculados con precision astronomica.
            </p>
          </Card>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════ Section 4: Premium Readings Catalog ═══════════ */}
      <section className="max-w-[900px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">
            Lecturas premium
          </p>
          <h2 className="font-display text-3xl font-light text-selene-white">Profundiza</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {premiumReadings.map(reading => (
            <Link
              key={reading.id}
              href={`/lecturas/${reading.id}`}
              className="no-underline group"
            >
              <Card hover className="p-5 h-full transition-all duration-300 group-hover:border-selene-gold/40 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.08)]">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[32px]">{reading.icon}</span>
                  <span
                    className="font-display text-xl font-semibold text-selene-gold"
                  >
                    {reading.price} &euro;
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-selene-white mb-1.5 group-hover:text-selene-gold transition-colors">
                  {reading.title}
                </h3>
                <p className="text-[13px] text-selene-white-dim leading-relaxed">
                  {reading.desc}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-xs text-selene-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Descubrir <ArrowIcon size={12} />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/lecturas" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
            Ver todas las lecturas →
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* ═══════════ Section 5: Brujula Interior Course ═══════════ */}
      <section className="max-w-[700px] mx-auto px-6 py-16">
        <Card className="p-8 text-center border-selene-gold/15 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-selene-gold/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-2">
              Formacion
            </p>
            <h3 className="font-display text-2xl text-selene-white mb-2">
              Tu primer curso — completamente gratuito
            </h3>
            <p className="text-[14px] text-selene-white-dim max-w-[440px] mx-auto mb-6 leading-relaxed">
              Despierta tu Brujula Interior: fundamentos de consciencia cosmica, tu carta natal y tu primera meditacion con resultados reales.
            </p>
            <a
              href="https://academia.selenaura.com/catalogo"
              className="inline-block bg-selene-gold text-selene-bg font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-110 no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorar cursos
            </a>
          </div>
        </Card>
      </section>

      <GoldDivider />

      {/* ═══════════ Section 6: Final CTA (form repeated) ═══════════ */}
      <section className="max-w-[480px] mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-5">🌙</div>
        <h2 className="font-display text-3xl font-light text-selene-white mb-3">
          Tu carta natal te espera
        </h2>
        <p className="text-selene-white-dim text-sm mb-8 max-w-[360px] mx-auto">
          Solo necesitas tu fecha de nacimiento. El resto lo hace Selene.
        </p>
        <div className="bg-selene-card/80 backdrop-blur-xl rounded-2xl border border-selene-border p-6">
          <LecturaExpressForm compact />
        </div>
      </section>

      {/* ═══════════ Section 7: Minimal Footer ═══════════ */}
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
