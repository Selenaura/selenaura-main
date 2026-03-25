'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Footer, Card } from '@/components/ui';
import { READINGS } from '@/lib/constants';

export default function ReadingCheckoutPage({ readingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const reading = READINGS.find(r => r.id === readingId);

  if (!reading) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_type: 'reading', product_id: readingId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.free) {
        router.push('/mi-selene');
      } else if (res.status === 401) {
        router.push(`/auth?mode=login&redirect=/lecturas/${readingId}`);
      } else {
        alert(data.error || 'Error al crear la sesion de pago');
      }
    } catch (err) {
      alert('Error de conexion. Intentalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-selene-bg flex flex-col">
      <Navbar showAuth />

      <main className="flex-1 max-w-[500px] mx-auto px-5 py-10 w-full">
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-5xl mb-4">{reading.icon}</div>
          <h1 className="font-display text-3xl sm:text-4xl text-selene-white mb-3">
            {reading.title}
          </h1>
          <p className="text-sm text-selene-white-dim max-w-md mx-auto">
            {reading.subtitle}
          </p>
        </div>

        <Card className="p-6 mb-8 border-selene-gold/20">
          <p className="text-[13px] text-selene-white leading-relaxed mb-6" style={{ textAlign: 'justify' }}>
            {reading.description}
          </p>

          <div className="w-12 h-px bg-selene-gold/30 mx-auto mb-6" />

          <div className="text-center">
            <div className="text-2xl font-display text-selene-gold mb-4">
              {reading.price_label}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full text-sm font-semibold bg-selene-gold text-selene-bg px-6 py-3.5 rounded-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-wait"
            >
              {loading
                ? 'Conectando con el pago...'
                : reading.price === 0
                  ? 'Acceder gratis'
                  : `Solicitar ${reading.title} → ${reading.price_label}`
              }
            </button>

            {reading.price > 0 && (
              <p className="text-[11px] text-selene-white-dim/50 mt-3">
                Pago seguro con Stripe. Recibes tu lectura al instante.
              </p>
            )}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
