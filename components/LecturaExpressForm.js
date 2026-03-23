'use client';

import { useState } from 'react';
import { MoonIcon } from '@/components/ui';

export default function LecturaExpressForm() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
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

      setSent(true);
    } catch (err) {
      setError(err.message || 'Error al procesar tu lectura');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 bg-selene-elevated border border-selene-border rounded-xl text-selene-white text-sm outline-none focus:border-selene-gold/40 transition placeholder:text-selene-white-dim/50";

  if (sent) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="font-display text-xl text-selene-gold mb-2">Tu lectura está en camino</h3>
        <p className="text-sm text-selene-white-dim mb-6 max-w-[320px] mx-auto">
          Revisa tu email en unos minutos. Selene ha preparado algo único para ti.
        </p>
        <a
          href="/auth?mode=register"
          className="inline-block bg-selene-gold/10 text-selene-gold font-medium text-sm px-6 py-2.5 rounded-xl border border-selene-gold/20 hover:bg-selene-gold/20 transition no-underline"
        >
          Crear cuenta y guardar mi lectura
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          className={inputClass}
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-selene-white-dim block mb-1">Fecha de nacimiento</label>
          <input
            className={inputClass}
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-[10px] text-selene-white-dim block mb-1">Hora <span className="opacity-50">(opcional)</span></label>
          <input
            className={inputClass}
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <input
          className={inputClass}
          type="text"
          placeholder="Ciudad de nacimiento"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
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
            Selene está leyendo tus estrellas...
          </span>
        ) : (
          'Recibir mi lectura gratis'
        )}
      </button>

      <p className="text-[10px] text-selene-white-dim/60 text-center leading-relaxed">
        Recibirás tu lectura por email. Sin spam, sin compromiso.
      </p>
    </form>
  );
}
