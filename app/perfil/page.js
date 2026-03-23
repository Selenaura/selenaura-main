'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { Card, BackIcon, ArrowIcon } from '@/components/ui';
import { getSunSignDetails, ZODIAC_SIGNS } from '@/lib/zodiac';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [birthTime, setBirthTime] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth?mode=login'); return; }
      setUser(user);

      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
        setBirthTime(data?.birth_time || user.user_metadata?.birth_time || '');
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }
    load();
  }, []);

  if (!user) return null;

  const meta = user.user_metadata || {};
  const userName = meta.name || user.email?.split('@')[0] || 'Explorador/a';
  const sunSign = meta.sun_sign || profile?.sun_sign;
  const moonSign = profile?.moon_sign;
  const risingSign = profile?.rising_sign;
  const birthDate = meta.birth_date || profile?.birth_date;
  const birthCity = meta.birth_city || profile?.birth_city;
  const signDetails = birthDate ? getSunSignDetails(birthDate) : null;

  async function handleSaveBirthTime() {
    setSaving(true);
    try {
      await supabase.auth.updateUser({
        data: { birth_time: birthTime },
      });

      await supabase.from('profiles').upsert({
        id: user.id,
        birth_time: birthTime,
        updated_at: new Date().toISOString(),
      });

      setEditing(false);
    } catch (e) {
      console.error('Error saving birth time:', e);
    }
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-selene-bg">
      <nav className="px-6 py-3.5 flex items-center gap-3 border-b border-selene-border">
        <button onClick={() => router.push('/mi-selene')} className="text-selene-white-dim hover:text-selene-white">
          <BackIcon />
        </button>
        <span className="text-sm font-medium text-selene-white">Mi perfil</span>
      </nav>

      <div className="max-w-[600px] mx-auto px-5 py-8">
        {/* Avatar & Info */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-selene-gold/15 to-selene-purple/15 flex items-center justify-center border-2 border-selene-gold/25">
            <span className="text-[32px]">{signDetails?.emoji || '🌙'}</span>
          </div>
          <h2 className="font-display text-2xl font-normal mb-1">{userName}</h2>
          <p className="text-[13px] text-selene-gold">{sunSign ? `Sol en ${sunSign}` : 'Completa tu carta natal'}</p>
          <p className="text-xs text-selene-white-dim mt-1">
            {sunSign && <>☉ {sunSign}</>}
            {moonSign && <> · ☽ {moonSign}</>}
            {risingSign && <> · ↑ {risingSign}</>}
          </p>
        </div>

        {/* Birth Data */}
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-selene-gold">✦</span>
            <span className="text-sm font-semibold text-selene-white">Datos de nacimiento</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-[13px] text-selene-white-dim">Fecha</span>
              <span className="text-[13px] text-selene-white">
                {birthDate ? new Date(birthDate + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-selene-white-dim">Hora</span>
              {editing ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="time"
                    value={birthTime}
                    onChange={e => setBirthTime(e.target.value)}
                    className="px-3 py-1.5 bg-selene-elevated border border-selene-border rounded-lg text-selene-white text-sm outline-none focus:border-selene-gold/40"
                  />
                  <button
                    onClick={handleSaveBirthTime}
                    disabled={saving}
                    className="text-xs text-selene-gold font-semibold hover:text-selene-gold-light"
                  >
                    {saving ? '...' : 'Guardar'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-selene-white">{birthTime || 'No indicada'}</span>
                  <button onClick={() => setEditing(true)} className="text-[11px] text-selene-gold hover:text-selene-gold-light">
                    Editar
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-selene-white-dim">Ciudad</span>
              <span className="text-[13px] text-selene-white">{birthCity || '—'}</span>
            </div>
          </div>
        </Card>

        {/* Natal Chart Summary */}
        <Card className="p-5 mb-6 border-selene-gold/20">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-selene-gold">✦</span>
            <span className="text-sm font-semibold text-selene-white">Tu carta natal</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Sol', value: sunSign, symbol: '☉' },
              { label: 'Luna', value: moonSign, symbol: '☽' },
              { label: 'Ascendente', value: risingSign, symbol: '↑' },
            ].map((p, i) => (
              <div key={i} className="text-center">
                <div className="text-lg text-selene-gold mb-1">{p.symbol}</div>
                <div className="text-[13px] font-semibold text-selene-white">{p.value || '—'}</div>
                <div className="text-[11px] text-selene-white-dim">{p.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sign Info */}
        {signDetails && (
          <Card className="p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{signDetails.emoji}</span>
              <span className="text-sm font-semibold text-selene-white">{signDetails.name}</span>
              <span className="text-[11px] text-selene-white-dim ml-auto">{signDetails.element}</span>
            </div>
            <p className="text-[13px] text-selene-white-dim leading-relaxed" style={{ textAlign: 'justify' }}>
              {signDetails.description}
            </p>
          </Card>
        )}

        {/* Settings */}
        <Card className="overflow-hidden">
          {[
            { label: 'Mis lecturas', icon: '📜', action: () => router.push('/mi-selene') },
            { label: 'Catalogo de lecturas', icon: '🔮', action: () => router.push('/lecturas') },
            { label: 'Cursos Selene', icon: '📚', href: 'https://academia.selenaura.com/catalogo' },
            { label: 'Cerrar sesion', icon: '🚪', action: handleLogout, danger: true },
          ].map((item, i) => (
            item.href ? (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                className={`flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-selene-elevated/50 transition no-underline ${i > 0 ? 'border-t border-selene-border' : ''}`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm flex-1 text-selene-white">{item.label}</span>
                <ArrowIcon size={12} className="text-selene-white-dim" />
              </Link>
            ) : (
              <button
                key={i}
                onClick={item.action}
                className={`flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-selene-elevated/50 transition ${i > 0 ? 'border-t border-selene-border' : ''}`}
              >
                <span className="text-base">{item.icon}</span>
                <span className={`text-sm flex-1 ${item.danger ? 'text-selene-rose' : 'text-selene-white'}`}>{item.label}</span>
                <ArrowIcon size={12} className="text-selene-white-dim" />
              </button>
            )
          ))}
        </Card>
      </div>
    </div>
  );
}
