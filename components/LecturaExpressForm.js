'use client';

import { useState, useEffect, useRef } from 'react';
import { MoonIcon } from '@/components/ui';
import { IconFlame, IconLeaf, IconWind, IconWater, IconMoon as IconMoonCustom } from '@/components/icons';

// ── Inline sun sign calculator (no imports needed) ──
function calcSunSign(month, day) {
  const signs = [
    { sign: 'Acuario', emoji: '♒', element: 'Aire', start: [1, 20], end: [2, 18],
      hook: 'Urano y Saturno. Tu red neuronal por defecto funciona diferente: ves patrones donde otros ven caos. No eres rara — piensas en sistemas.' },
    { sign: 'Piscis', emoji: '♓', element: 'Agua', start: [2, 19], end: [3, 20],
      hook: 'Neptuno disuelve las fronteras. Tu corteza somatosensorial absorbe el dolor ajeno como propio — los estudios de empatia te describen sin nombrarte.' },
    { sign: 'Aries', emoji: '♈', element: 'Fuego', start: [3, 21], end: [4, 19],
      hook: 'Naciste con Marte encendido. Tu sistema nervioso esta cableado para la accion — la neurociencia lo llama motivacion intrinseca. Tu lo llamas impaciencia.' },
    { sign: 'Tauro', emoji: '♉', element: 'Tierra', start: [4, 20], end: [5, 20],
      hook: 'Venus te ancla al placer real, no al imaginado. Tu cerebro libera mas dopamina con experiencias sensoriales que con estimulos abstractos.' },
    { sign: 'Geminis', emoji: '♊', element: 'Aire', start: [5, 21], end: [6, 20],
      hook: 'Mercurio duplicado. Tu corteza prefrontal procesa informacion a una velocidad que agota a quienes te rodean — y a veces, a ti.' },
    { sign: 'Cancer', emoji: '♋', element: 'Agua', start: [6, 21], end: [7, 22],
      hook: 'La Luna gobierna tus mareas internas. Tu amigdala es mas reactiva que la media — no es debilidad, es un radar emocional afinado.' },
    { sign: 'Leo', emoji: '♌', element: 'Fuego', start: [7, 23], end: [8, 22],
      hook: 'El Sol es tu regente literal. Tu corteza cingulada anterior busca reconocimiento no por vanidad — por supervivencia emocional.' },
    { sign: 'Virgo', emoji: '♍', element: 'Tierra', start: [8, 23], end: [9, 22],
      hook: 'Mercurio terrestre. Tu cerebelo no descansa: analiza, optimiza, repara. Lo que otros llaman perfeccionismo, la neurociencia llama hipervigilancia funcional.' },
    { sign: 'Libra', emoji: '♎', element: 'Aire', start: [9, 23], end: [10, 22],
      hook: 'Venus aerea. Tu insula anterior se activa ante la injusticia antes de que la registres conscientemente. No eres indecisa — procesas ambos lados a la vez.' },
    { sign: 'Escorpio', emoji: '♏', element: 'Agua', start: [10, 23], end: [11, 21],
      hook: 'Pluton y Marte. Tu sistema limbico opera a una profundidad que la mayoria nunca alcanza. Lo que sientes no es intensidad — es percepcion sin filtro.' },
    { sign: 'Sagitario', emoji: '♐', element: 'Fuego', start: [11, 22], end: [12, 21],
      hook: 'Jupiter expansivo. Tu hipocampo busca novedad como un buscador de tesoros neuronal. La rutina no te mata — te desconecta.' },
    { sign: 'Capricornio', emoji: '♑', element: 'Tierra', start: [12, 22], end: [1, 19],
      hook: 'Saturno moldea tu prefrontal como un escultor paciente. Tu capacidad de retraso de gratificacion esta por encima de la media — y eso te da poder.' },
  ];

  for (const s of signs) {
    if (s.start[0] > s.end[0]) {
      // Capricorn spans year boundary
      if ((month === s.start[0] && day >= s.start[1]) || (month === s.end[0] && day <= s.end[1])) return s;
    } else {
      if ((month === s.start[0] && day >= s.start[1]) || (month === s.end[0] && day <= s.end[1])) return s;
    }
  }
  return signs[0]; // fallback
}

const ELEMENT_COLORS = {
  Fuego: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  Tierra: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  Aire: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400' },
  Agua: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
};

export default function LecturaExpressForm({ compact = false }) {
  const [step, setStep] = useState(1); // 1=date, 2=result+email, 3=sent
  const [date, setDate] = useState('');
  const [signResult, setSignResult] = useState(null);
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progressAnim, setProgressAnim] = useState(0);
  const resultRef = useRef(null);

  // Animate progress bar when result shows
  useEffect(() => {
    if (signResult) {
      const timer = setTimeout(() => setProgressAnim(10), 100);
      return () => clearTimeout(timer);
    }
  }, [signResult]);

  function handleDateSubmit(e) {
    e.preventDefault();
    if (!date) return;

    const parsed = new Date(date + 'T12:00:00');
    const month = parsed.getMonth() + 1;
    const day = parsed.getDate();
    const result = calcSunSign(month, day);
    setSignResult(result);
    setStep(2);

    // Scroll to result on mobile
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/lectura-express', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, date, time, city }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al generar la lectura');
      }

      setStep(3);
    } catch (err) {
      setError(err.message || 'Error al procesar tu lectura');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 bg-selene-elevated border border-selene-border rounded-xl text-selene-white text-sm outline-none focus:border-selene-gold/40 transition placeholder:text-selene-white-dim/50";

  // ── Step 3: Email sent confirmation ──
  if (step === 3) {
    return (
      <div className="text-center py-6 animate-fade-in" ref={resultRef}>
        <div className="mb-4"><IconMoonCustom size={40} className="text-selene-gold mx-auto" /></div>
        <h3 className="font-display text-xl text-selene-gold mb-2">Tu lectura completa esta en camino</h3>
        <p className="text-sm text-selene-white-dim mb-6 max-w-[320px] mx-auto">
          Revisa tu email en unos minutos. Selene ha preparado algo unico para ti.
        </p>
        <div className="w-full bg-selene-elevated rounded-full h-2 mb-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-selene-gold to-selene-gold-light rounded-full" style={{ width: '100%' }} />
        </div>
        <p className="text-[11px] text-selene-white-dim mb-6">100% de tu lectura express desbloqueada</p>
        <a
          href="/auth?mode=register"
          className="inline-block bg-selene-gold text-selene-bg font-semibold text-[15px] px-6 py-3 rounded-xl hover:brightness-110 transition no-underline"
        >
          Crear cuenta para guardar tu lectura
        </a>
        <p className="text-[11px] text-selene-white-dim/60 mt-3">
          Desbloquea tu horoscopo diario personalizado — gratis
        </p>
      </div>
    );
  }

  // ── Step 2: Sign result + email capture ──
  if (step === 2 && signResult) {
    const elColor = ELEMENT_COLORS[signResult.element] || ELEMENT_COLORS.Fuego;
    return (
      <div className="animate-fade-in" ref={resultRef}>
        {/* Sun sign result card */}
        <div className="relative rounded-2xl border border-selene-gold/30 bg-gradient-to-b from-selene-gold/5 to-transparent p-6 mb-5">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-selene-gold/10 to-transparent rounded-tr-2xl rounded-bl-[80px]" />

          <div className="text-center relative">
            <div className="text-[80px] leading-none mb-3">{signResult.emoji}</div>
            <h3 className="font-display text-2xl text-selene-gold mb-2">{signResult.sign}</h3>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${elColor.bg} ${elColor.border} ${elColor.text} border`}>
              {signResult.element === 'Fuego' && <IconFlame size={14} className="text-red-400" />}
              {signResult.element === 'Tierra' && <IconLeaf size={14} className="text-emerald-400" />}
              {signResult.element === 'Aire' && <IconWind size={14} className="text-sky-400" />}
              {signResult.element === 'Agua' && <IconWater size={14} className="text-blue-400" />}
              {signResult.element}
            </div>
          </div>

          <p className="font-display text-[15px] text-selene-white/90 italic leading-relaxed mt-5 text-center">
            {signResult.hook}
          </p>

          {/* Progress bar: 10% discovered */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-selene-white-dim">Tu carta descubierta</span>
              <span className="text-[11px] text-selene-gold font-semibold">{progressAnim}%</span>
            </div>
            <div className="w-full bg-selene-elevated rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-selene-gold to-selene-gold-light rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressAnim}%` }}
              />
            </div>
            <p className="text-[11px] text-selene-white-dim/70 mt-2 text-center">
              Esto es solo tu Sol. Faltan Luna, Ascendente y 8 planetas mas...
            </p>
          </div>
        </div>

        {/* Email capture form */}
        <div className="rounded-2xl border border-selene-border bg-selene-card/60 p-5">
          <h4 className="font-display text-base text-selene-white mb-1 text-center">
            Quieres tu lectura completa?
          </h4>
          <p className="text-[12px] text-selene-white-dim mb-4 text-center">
            Selene analiza tu cielo completo y te envia el resultado por email
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              className={inputClass}
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-selene-white-dim block mb-1">
                  Hora de nacimiento <span className="opacity-50">(opcional)</span>
                </label>
                <input
                  className={inputClass}
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] text-selene-white-dim block mb-1">
                  Ciudad <span className="opacity-50">(opcional)</span>
                </label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Ciudad de nacimiento"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-selene-gold text-selene-bg font-semibold text-[15px] py-3.5 rounded-xl hover:brightness-110 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-selene-bg/30 border-t-selene-bg rounded-full animate-spin" />
                  Generando tu lectura personalizada...
                </span>
              ) : (
                'Enviarme mi lectura completa'
              )}
            </button>

            <p className="text-[10px] text-selene-white-dim/60 text-center leading-relaxed">
              Gratis. Sin spam, sin compromiso.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Step 1: Date input only ──
  return (
    <form onSubmit={handleDateSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label className="text-[11px] text-selene-white-dim block mb-1.5">Fecha de nacimiento</label>
        <input
          className={`${inputClass} ${compact ? '' : 'text-base py-4'}`}
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-selene-gold text-selene-bg font-semibold rounded-xl hover:brightness-110 transition ${compact ? 'text-sm py-3' : 'text-[15px] py-3.5'}`}
      >
        Descubrir mi signo solar
      </button>

      <p className="text-[10px] text-selene-white-dim/60 text-center leading-relaxed">
        Resultado instantaneo. Sin email, sin registro.
      </p>
    </form>
  );
}
