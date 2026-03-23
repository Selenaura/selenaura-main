'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { Navbar, Card, SectionTitle, GoldDivider } from '@/components/ui';

// ── Moon phase calculation (same as dashboard) ──
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + month + day;
  if (month < 3) r += 2;
  r -= ((year < 2000) ? 4 : 8.3);
  r = Math.floor(r + 0.5) % 30;
  if (r < 0) r += 30;
  return r;
}

function getMoonEmoji(phase) {
  if (phase === 0) return '\uD83C\uDF11';
  if (phase <= 3) return '\uD83C\uDF12';
  if (phase <= 7) return '\uD83C\uDF13';
  if (phase <= 11) return '\uD83C\uDF14';
  if (phase <= 15) return '\uD83C\uDF15';
  if (phase <= 19) return '\uD83C\uDF16';
  if (phase <= 23) return '\uD83C\uDF17';
  return '\uD83C\uDF18';
}

// ── Mood options ──
const MOODS = [
  { emoji: '\uD83C\uDF11', label: 'Muy baja', value: 1 },
  { emoji: '\uD83C\uDF18', label: 'Baja', value: 2 },
  { emoji: '\uD83C\uDF17', label: 'Neutral', value: 3 },
  { emoji: '\uD83C\uDF16', label: 'Alta', value: 4 },
  { emoji: '\uD83C\uDF15', label: 'Muy alta', value: 5 },
];

// ── LocalStorage key ──
const STORAGE_KEY = 'selene_journal_entries';

function loadEntries() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full or unavailable
  }
}

export default function DiarioPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [mood, setMood] = useState(3);
  const [saved, setSaved] = useState(false);

  // Auth check
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth?mode=login');
        return;
      }
      setEntries(loadEntries());
      setLoading(false);
    }
    checkAuth();
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;

    const now = new Date();
    const moonPhase = getMoonPhase(now);
    const newEntry = {
      id: Date.now().toString(),
      date: now.toISOString(),
      text: text.trim(),
      mood,
      moonEmoji: getMoonEmoji(moonPhase),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setText('');
    setMood(3);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
        <p className="font-display text-lg text-selene-gold mt-6">Abriendo tu diario...</p>
      </div>
    );
  }

  const today = new Date();
  const todayMoon = getMoonEmoji(getMoonPhase(today));
  const dateStr = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  const displayEntries = entries.slice(0, 10);

  return (
    <div className="min-h-screen bg-selene-bg">
      <Navbar showAuth={false} showDashboardNav />

      <div className="max-w-[600px] mx-auto px-5 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-3xl text-selene-white mb-2">
            Mi diario cosmico
          </h1>
          <p className="text-sm text-selene-white-dim">
            Un espacio privado para tu reflexion
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-[12px] text-selene-white-dim">
            <span>{todayMoon}</span>
            <span>{capitalizedDate}</span>
          </div>
        </div>

        {/* New entry */}
        <Card className="p-5 mb-8 border-selene-gold/20">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe lo que sientes, lo que suenas, lo que observas..."
            rows={5}
            className="w-full bg-selene-elevated border border-selene-border rounded-xl px-4 py-3 text-sm text-selene-white placeholder:text-selene-white-dim/40 focus:border-selene-gold focus:outline-none transition-colors resize-none leading-relaxed font-body"
          />

          {/* Mood selector */}
          <div className="mt-4 mb-4">
            <label className="block text-[11px] text-selene-white-dim tracking-[0.1em] uppercase mb-3">
              Tu energia hoy
            </label>
            <div className="flex gap-3 justify-center">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    mood === m.value
                      ? 'bg-selene-gold/10 border border-selene-gold/30 scale-110'
                      : 'border border-transparent hover:bg-selene-elevated'
                  }`}
                  title={m.label}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[9px] text-selene-white-dim">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className={`w-full text-sm font-semibold px-6 py-3 rounded-lg transition ${
              text.trim()
                ? 'bg-selene-gold text-selene-bg hover:brightness-110 cursor-pointer'
                : 'bg-selene-elevated text-selene-white-dim cursor-not-allowed'
            }`}
          >
            {saved ? '\u2713 Guardado' : 'Guardar'}
          </button>
        </Card>

        {/* Entries */}
        {displayEntries.length > 0 && (
          <>
            <SectionTitle subtitle="Tus reflexiones recientes" className="mt-10">
              Entradas anteriores
            </SectionTitle>

            <div className="flex flex-col gap-3">
              {displayEntries.map((entry) => {
                const entryDate = new Date(entry.date);
                const formatted = entryDate.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
                const time = entryDate.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const moodObj = MOODS.find(m => m.value === entry.mood);

                return (
                  <Card key={entry.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-[11px] text-selene-white-dim">
                        <span>{entry.moonEmoji || todayMoon}</span>
                        <span>{formatted} &middot; {time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {moodObj && (
                          <span className="text-sm" title={`Energia: ${moodObj.label}`}>
                            {moodObj.emoji}
                          </span>
                        )}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-[11px] text-selene-white-dim/40 hover:text-selene-rose transition-colors"
                          title="Eliminar entrada"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                    <p className="text-[13px] text-selene-white leading-relaxed whitespace-pre-wrap">
                      {entry.text}
                    </p>
                  </Card>
                );
              })}
            </div>

            {entries.length > 10 && (
              <p className="text-center text-[11px] text-selene-white-dim/50 mt-4">
                Mostrando las 10 entradas mas recientes de {entries.length} en total
              </p>
            )}
          </>
        )}

        {displayEntries.length === 0 && (
          <div className="text-center py-10 animate-fade-in">
            <div className="text-4xl mb-4">{todayMoon}</div>
            <p className="text-sm text-selene-white-dim mb-1">
              Tu diario esta en blanco
            </p>
            <p className="text-[12px] text-selene-white-dim/60">
              Escribe tu primera reflexion. Solo tu puedes verla.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
