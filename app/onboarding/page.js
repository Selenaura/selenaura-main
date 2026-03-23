'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { MoonIcon, CheckIcon } from '@/components/ui';
import { getSunSignDetails } from '@/lib/zodiac';

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [saving, setSaving] = useState(false);
  const [signResult, setSignResult] = useState(null);

  async function handleCalculate() {
    if (!birthDate || !birthCity) return;
    setSaving(true);

    const signDetails = getSunSignDetails(birthDate);
    setSignResult(signDetails);

    // Save to user metadata and profiles table
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Update user metadata
      await supabase.auth.updateUser({
        data: {
          birth_date: birthDate,
          birth_time: birthTime || null,
          birth_city: birthCity,
          sun_sign: signDetails?.name || null,
          onboarding_complete: true,
        },
      });

      // Upsert profiles table
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0],
          email: user.email,
          birth_date: birthDate,
          birth_time: birthTime || null,
          birth_city: birthCity,
          sun_sign: signDetails?.name || null,
          onboarding_complete: true,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Error saving onboarding data:', err);
    }

    setSaving(false);
    setStep(1);
  }

  const inputClass = "w-full px-4 py-3.5 bg-selene-elevated border border-selene-border rounded-xl text-selene-white font-body text-sm outline-none focus:border-selene-gold/40 transition";

  // ── Saving overlay ──
  if (saving) {
    return (
      <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
        <p className="font-display text-xl text-selene-gold mt-6">Consultando las estrellas...</p>
        <p className="text-sm text-selene-white-dim mt-2">Calculando tu carta natal basica</p>
      </div>
    );
  }

  const steps = [
    // Step 0: Birth data
    <>
      <div className="text-center mb-8">
        <div className="text-[40px] mb-4">🌟</div>
        <h2 className="font-display text-2xl font-normal mb-2">Tu mapa cosmico</h2>
        <p className="text-[13px] text-selene-white-dim">Con tus datos de nacimiento calculamos tu carta natal basica</p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-selene-white-dim block mb-1.5">Fecha de nacimiento</label>
          <input type="date" className={inputClass} value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
        </div>
        <div>
          <label className="text-xs text-selene-white-dim block mb-1.5">Hora de nacimiento (opcional)</label>
          <input type="time" className={inputClass} value={birthTime} onChange={e => setBirthTime(e.target.value)} />
          <p className="text-[11px] text-selene-white-dim mt-1.5 leading-relaxed">
            Si la conoces, podremos calcular tu Luna y Ascendente
          </p>
        </div>
        <div>
          <label className="text-xs text-selene-white-dim block mb-1.5">Ciudad de nacimiento</label>
          <input className={inputClass} placeholder="Ej: Madrid, Espanya" value={birthCity} onChange={e => setBirthCity(e.target.value)} required />
        </div>
      </div>
      <button
        onClick={handleCalculate}
        disabled={!birthDate || !birthCity}
        className="w-full mt-6 bg-selene-gold text-selene-bg font-semibold py-3.5 rounded-xl hover:brightness-110 transition disabled:opacity-40"
      >
        Calcular mi carta natal
      </button>
    </>,

    // Step 1: Confirmation
    <>
      <div className="text-center mb-8">
        <div className="text-[48px] mb-4">{signResult?.emoji || '🌙'}</div>
        <h2 className="font-display text-2xl font-normal text-selene-gold mb-2">
          Tu Sol esta en {signResult?.name || 'tu signo'}
        </h2>
        <p className="text-[13px] text-selene-white-dim">Elemento: {signResult?.element}</p>
      </div>

      <div className="bg-selene-card rounded-2xl border border-selene-gold/20 p-5 mb-6">
        <p className="text-sm text-selene-white leading-relaxed" style={{ textAlign: 'justify' }}>
          {signResult?.description}
        </p>
      </div>

      {/* Chart summary */}
      <div className="bg-selene-card rounded-2xl border border-selene-border p-5 mb-6">
        <div className="text-[11px] text-selene-gold font-semibold mb-3 tracking-[0.1em] uppercase">Tu carta natal basica</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg text-selene-gold">☉</span>
            <span className="text-sm text-selene-white">Sol en {signResult?.name}</span>
            <CheckIcon size={14} className="text-selene-success ml-auto" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg text-selene-white-dim">☽</span>
            <span className="text-sm text-selene-white-dim">
              {birthTime ? 'Luna calculada' : 'Luna — necesita hora de nacimiento'}
            </span>
            {birthTime ? (
              <CheckIcon size={14} className="text-selene-success ml-auto" />
            ) : (
              <span className="text-[10px] text-selene-gold/60 ml-auto">Opcional</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg text-selene-white-dim">↑</span>
            <span className="text-sm text-selene-white-dim">
              {birthTime ? 'Ascendente calculado' : 'Ascendente — necesita hora de nacimiento'}
            </span>
            {birthTime ? (
              <CheckIcon size={14} className="text-selene-success ml-auto" />
            ) : (
              <span className="text-[10px] text-selene-gold/60 ml-auto">Opcional</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-selene-blue/10 rounded-xl p-4 border border-selene-blue/15 text-xs text-selene-white-dim leading-relaxed mb-6">
        Tu carta natal basica esta lista. Puedes anadir la hora de nacimiento mas tarde desde tu perfil para completar Luna y Ascendente.
      </div>

      <button
        onClick={() => router.push('/mi-selene')}
        className="w-full bg-selene-gold text-selene-bg font-semibold text-[15px] py-3.5 rounded-xl hover:brightness-110 transition"
      >
        Ir a mi espacio personal
      </button>
    </>,
  ];

  return (
    <div className="min-h-screen bg-selene-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[440px]">
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-8">
          {[0, 1].map(i => (
            <div key={i} className={`flex-1 h-0.5 rounded-full transition-colors ${i <= step ? 'bg-selene-gold' : 'bg-selene-border'}`} />
          ))}
        </div>

        {steps[step]}

        {step > 0 && (
          <button onClick={() => setStep(0)} className="block mx-auto mt-3 text-sm text-selene-white-dim hover:text-selene-white transition">
            ← Atras
          </button>
        )}
      </div>
    </div>
  );
}
