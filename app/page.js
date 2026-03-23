import Link from 'next/link';
import { Navbar, Footer, Card, ArrowIcon, GoldDivider, MoonIcon } from '@/components/ui';
import { READINGS } from '@/lib/constants';
import LecturaExpressForm from '@/components/LecturaExpressForm';

export default function HomePage() {
  const freeFeatures = [
    { icon: '☉', title: 'Carta natal basica', desc: 'Tu Sol, Luna y Ascendente calculados al instante' },
    { icon: '🔮', title: 'Horoscopo diario', desc: 'Personalizado segun tu signo solar, cada manana' },
    { icon: '📜', title: 'Historial de lecturas', desc: 'Todas tus lecturas guardadas y accesibles siempre' },
    { icon: '🌟', title: 'Brujula Interior', desc: 'Acceso al curso gratuito de consciencia cosmica' },
  ];

  const featuredReadings = READINGS.filter(r => ['carta-completa', 'compatibilidad', 'tarot-profunda', 'suenos'].includes(r.id));

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar />

      {/* ── Hero + Lectura Express ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 star-pattern" />
        <div className="absolute inset-0 bg-gradient-radial-gold" />
        <div className="relative max-w-[960px] mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center md:text-left">
              <div className="text-4xl mb-4">🌙</div>
              <h1 className="font-display text-3xl md:text-[42px] font-light text-selene-white mb-4 leading-tight">
                Descubre lo que tus<br />
                <span className="text-selene-gold font-normal">estrellas revelan</span>
              </h1>
              <p className="text-selene-white-dim text-[15px] max-w-[420px] mb-6 leading-relaxed">
                Recibe una lectura personalizada gratuita basada en tu fecha de nacimiento. Sin registro, sin compromiso — solo tu email.
              </p>
              <div className="flex gap-4 text-[11px] text-selene-white-dim">
                <span>✦ 3 párrafos sobre ti</span>
                <span>✦ En tu email en minutos</span>
                <span>✦ 100% gratis</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-selene-card/80 backdrop-blur-xl rounded-2xl border border-selene-border p-6">
              <h2 className="font-display text-lg text-selene-white mb-1 text-center">Tu Lectura Express</h2>
              <p className="text-[12px] text-selene-white-dim mb-5 text-center">Selene lee tu cielo y te cuenta lo que ve</p>
              <LecturaExpressForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get free ── */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">Incluido con tu cuenta gratuita</p>
          <h2 className="font-display text-3xl font-light text-selene-white">Todo esto, sin coste</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {freeFeatures.map((feat, i) => (
            <Card key={i} className="p-6">
              <div className="text-3xl mb-3">{feat.icon}</div>
              <h3 className="text-[15px] font-semibold text-selene-white mb-1.5">{feat.title}</h3>
              <p className="text-[13px] text-selene-white-dim leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ── Reading catalog preview ── */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">Lecturas premium</p>
          <h2 className="font-display text-3xl font-light text-selene-white">Profundiza en tu autoconocimiento</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredReadings.map(reading => (
            <Card key={reading.id} hover className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[28px]">{reading.icon}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide"
                  style={{ color: '#0A0A0F', background: reading.color }}
                >
                  {reading.tag}
                </span>
              </div>
              <div className="text-sm font-semibold text-selene-white mb-1 leading-tight">{reading.title}</div>
              <div className="text-[11px] text-selene-white-dim mb-3">{reading.subtitle}</div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-selene-gold">{reading.price_label}</span>
                <ArrowIcon size={14} className="text-selene-white-dim" />
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/lecturas" className="text-sm text-selene-gold hover:text-selene-gold-light no-underline">
            Ver todas las lecturas →
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* ── Courses preview ── */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-3">Formacion</p>
          <h2 className="font-display text-3xl font-light text-selene-white">Aprende a tu ritmo</h2>
          <p className="text-selene-white-dim text-sm mt-3 max-w-[400px] mx-auto">
            Cursos de astrologia, tarot, meditacion y autoconocimiento con base cientifica.
          </p>
        </div>
        <Card className="p-6 text-center border-selene-gold/15">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="font-display text-xl text-selene-white mb-2">Despierta tu Brujula Interior</h3>
          <p className="text-sm text-selene-white-dim mb-4">Tu primer curso — completamente gratuito</p>
          <p className="text-[13px] text-selene-white-dim max-w-[400px] mx-auto mb-6 leading-relaxed">
            Fundamentos de consciencia espiritual, tu carta natal basica y tu primera meditacion con resultados reales.
          </p>
          <Link
            href="https://academia.selenaura.com/catalogo"
            className="inline-block bg-selene-gold text-selene-bg font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-110 no-underline"
            target="_blank"
          >
            Explorar cursos
          </Link>
        </Card>
      </section>

      <GoldDivider />

      {/* ── Social proof ── */}
      <section className="max-w-[600px] mx-auto px-6 py-20 text-center">
        <div className="text-3xl mb-6">✦</div>
        <blockquote className="font-display text-xl text-selene-white italic leading-relaxed mb-4">
          &ldquo;Selene me ayudo a entender patrones que llevaba repitiendo toda mi vida. No es magia: es autoconocimiento profundo.&rdquo;
        </blockquote>
        <p className="text-sm text-selene-white-dim">— M.R., Escorpio</p>
      </section>

      <GoldDivider />

      {/* ── Final CTA ── */}
      <section className="max-w-[600px] mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">🌙</div>
        <h2 className="font-display text-3xl font-light text-selene-white mb-4">Tu viaje empieza aqui</h2>
        <p className="text-selene-white-dim text-sm mb-8 max-w-[380px] mx-auto">
          Crea tu cuenta gratuita y descubre lo que las estrellas tienen para ti.
        </p>
        <Link
          href="/auth?mode=register"
          className="inline-block bg-selene-gold text-selene-bg font-semibold text-[15px] px-8 py-3.5 rounded-xl hover:brightness-110 no-underline"
        >
          Crear mi cuenta gratis
        </Link>
      </section>

      <Footer />
    </div>
  );
}
