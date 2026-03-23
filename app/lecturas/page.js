import Link from 'next/link';
import { Navbar, Footer, Card, ArrowIcon, GoldDivider } from '@/components/ui';
import { READINGS } from '@/lib/constants';

export default function LecturasPage() {
  const freeReadings = READINGS.filter(r => r.category === 'free');
  const premiumReadings = READINGS.filter(r => r.category === 'premium');

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 star-pattern" />
        <div className="relative max-w-[800px] mx-auto px-6 py-16 text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h1 className="font-display text-3xl md:text-4xl font-light text-selene-white mb-3">
            Lecturas <span className="text-selene-gold">personalizadas</span>
          </h1>
          <p className="text-selene-white-dim text-sm max-w-[440px] mx-auto">
            Desde tu carta natal hasta la interpretacion de suenos. Cada lectura esta disenada para profundizar en tu autoconocimiento.
          </p>
        </div>
      </section>

      {/* Free with account */}
      <section className="max-w-[900px] mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-[11px] text-selene-success font-semibold tracking-[0.15em] uppercase mb-2">Gratis con tu cuenta</p>
          <h2 className="font-display text-2xl font-light text-selene-white">Empieza sin compromiso</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {freeReadings.map(reading => (
            <Card key={reading.id} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[28px]">{reading.icon}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide"
                  style={{ color: '#0A0A0F', background: reading.color }}
                >
                  {reading.tag}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-selene-white mb-1">{reading.title}</h3>
              <p className="text-[11px] text-selene-white-dim mb-3">{reading.subtitle}</p>
              <p className="text-[12px] text-selene-white-dim leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                {reading.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-selene-success">{reading.price_label}</span>
                <Link
                  href={reading.requires_account ? '/auth?mode=register' : '#'}
                  className="text-sm text-selene-gold font-medium hover:text-selene-gold-light no-underline flex items-center gap-1"
                >
                  {reading.requires_account ? 'Crear cuenta' : 'Probar'} <ArrowIcon size={12} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* Premium readings */}
      <section className="max-w-[900px] mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-[11px] text-selene-gold font-semibold tracking-[0.15em] uppercase mb-2">Lecturas premium</p>
          <h2 className="font-display text-2xl font-light text-selene-white">Profundiza en tu autoconocimiento</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {premiumReadings.map(reading => (
            <Card key={reading.id} hover className="p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[28px]">{reading.icon}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide"
                  style={{ color: '#0A0A0F', background: reading.color }}
                >
                  {reading.tag}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-selene-white mb-1">{reading.title}</h3>
              <p className="text-[11px] text-selene-white-dim mb-3">{reading.subtitle}</p>
              <p className="text-[12px] text-selene-white-dim leading-relaxed mb-4 flex-1" style={{ textAlign: 'justify' }}>
                {reading.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-bold text-selene-gold">{reading.price_label}</span>
                <Link
                  href={reading.url || `/lecturas/${reading.id}`}
                  target={reading.url?.startsWith('http') ? '_blank' : undefined}
                  rel={reading.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-selene-gold font-medium hover:text-selene-gold-light no-underline flex items-center gap-1"
                >
                  Solicitar <ArrowIcon size={12} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* CTA */}
      <section className="max-w-[600px] mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">✦</div>
        <h2 className="font-display text-2xl font-light text-selene-white mb-3">
          Tu carta natal basica es <span className="text-selene-success">gratuita</span>
        </h2>
        <p className="text-sm text-selene-white-dim mb-6 max-w-[380px] mx-auto">
          Crea tu cuenta y descubre tu Sol, Luna y Ascendente al instante.
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
