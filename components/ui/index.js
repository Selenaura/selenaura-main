'use client';

// ═══════════════════════════════════════════════
// SELENE — Shared UI Components
// ═══════════════════════════════════════════════

import { useState } from 'react';
import Link from 'next/link';

// ── Icons ──
export function MoonIcon({ size = 20, className = 'text-selene-gold' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function SunIcon({ size = 20, className = 'text-selene-gold' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function HistoryIcon({ size = 20, className = 'text-selene-gold' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 8v4l3 3" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  );
}

export function CompassIcon({ size = 20, className = 'text-selene-gold' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className = 'text-selene-success' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}><polyline points="20,6 9,17 4,12" /></svg>;
}

export function LockIcon({ size = 16, className = 'text-selene-white-dim' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}

export function ArrowIcon({ size = 16, className = 'text-selene-gold' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
}

export function BackIcon({ size = 20, className = 'text-selene-white-dim' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>;
}

export function UserIcon({ size = 20, className = 'text-selene-white-dim' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

export function CertIcon({ size = 20, className = 'text-selene-gold' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>;
}

export function BookIcon({ size = 20, className = 'text-selene-gold' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
}

export function GridIcon({ size = 20, className = 'text-selene-white-dim' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}

export function StarIcon({ size = 16, className = 'text-selene-gold' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>;
}

export function HomeIcon({ size = 20, className = 'text-selene-white-dim' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

export function PenIcon({ size = 20, className = 'text-selene-white-dim' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// ── Navbar ──
export function Navbar({ showAuth = true, showDashboardNav = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-selene-bg/90 backdrop-blur-xl border-b border-selene-border">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <MoonIcon size={24} />
          <span className="font-display text-[22px] font-semibold text-selene-gold tracking-wider">
            SELENE
          </span>
        </Link>

        {showDashboardNav && (
          <div className="flex gap-4 sm:gap-5 items-center">
            <Link href="/mi-selene" className="flex flex-col items-center gap-0.5 no-underline group" title="Mi Selene">
              <HomeIcon size={20} className="text-selene-gold group-hover:text-selene-gold-light transition-colors" />
              <span className="text-[10px] text-selene-white-dim hidden sm:block">Mi Selene</span>
            </Link>
            <Link href="/lecturas" className="flex flex-col items-center gap-0.5 no-underline group" title="Lecturas">
              <BookIcon size={20} className="text-selene-white-dim group-hover:text-selene-gold transition-colors" />
              <span className="text-[10px] text-selene-white-dim hidden sm:block">Lecturas</span>
            </Link>
            <Link href="/mi-selene/diario" className="flex flex-col items-center gap-0.5 no-underline group" title="Diario">
              <PenIcon size={20} className="text-selene-white-dim group-hover:text-selene-gold transition-colors" />
              <span className="text-[10px] text-selene-white-dim hidden sm:block">Diario</span>
            </Link>
            <Link href="/perfil" className="flex flex-col items-center gap-0.5 no-underline group" title="Perfil">
              <UserIcon size={20} className="text-selene-white-dim group-hover:text-selene-gold transition-colors" />
              <span className="text-[10px] text-selene-white-dim hidden sm:block">Perfil</span>
            </Link>
          </div>
        )}

        {showAuth && !showDashboardNav && (
          <div className="flex gap-3 items-center">
            {/* Desktop links */}
            <Link href="/lecturas" className="text-sm text-selene-white-dim hover:text-selene-white px-3 py-2 no-underline hidden md:inline-block">
              Lecturas
            </Link>
            <Link href="https://academy.selenaura.com/" className="text-sm text-selene-white-dim hover:text-selene-white px-3 py-2 no-underline hidden md:inline-block" target="_blank">
              Cursos
            </Link>
            <Link href="/auth?mode=login" className="text-sm text-selene-white-dim hover:text-selene-white px-4 py-2 no-underline hidden md:inline-block">
              Iniciar sesión
            </Link>
            <Link href="/auth?mode=register" className="text-sm font-semibold bg-selene-gold text-selene-bg px-5 py-2.5 rounded-lg hover:brightness-110 no-underline hidden md:inline-block">
              Empezar gratis
            </Link>

            {/* Language selector */}
            <span className="text-[11px] text-selene-white-dim/60 hidden md:inline-block ml-1">
              <span className="text-selene-gold font-semibold">ES</span>
              <span className="mx-1">|</span>
              <span className="opacity-50 cursor-not-allowed" title="Coming soon">EN</span>
            </span>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menú"
            >
              <span className={`w-5 h-0.5 bg-selene-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-selene-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-selene-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && showAuth && !showDashboardNav && (
        <div className="md:hidden fixed inset-0 top-[57px] z-40 bg-selene-bg/95 backdrop-blur-xl border-t border-selene-border animate-fade-in">
          <div className="flex flex-col items-center gap-6 pt-12">
            <Link href="/lecturas" onClick={() => setMenuOpen(false)} className="text-lg text-selene-white no-underline">
              Lecturas
            </Link>
            <Link href="/lecturas/tarot" onClick={() => setMenuOpen(false)} className="text-lg text-selene-white no-underline">
              Tarot
            </Link>
            <Link href="/lecturas/compatibilidad" onClick={() => setMenuOpen(false)} className="text-lg text-selene-white no-underline">
              Compatibilidad
            </Link>
            <Link href="https://academy.selenaura.com/" onClick={() => setMenuOpen(false)} className="text-lg text-selene-white no-underline" target="_blank">
              Cursos
            </Link>
            <div className="w-10 h-px bg-selene-border my-2" />
            <Link href="/auth?mode=login" onClick={() => setMenuOpen(false)} className="text-lg text-selene-white-dim no-underline">
              Iniciar sesión
            </Link>
            <Link href="/auth?mode=register" onClick={() => setMenuOpen(false)} className="bg-selene-gold text-selene-bg font-semibold text-base px-8 py-3 rounded-xl no-underline">
              Empezar gratis
            </Link>
            <div className="text-[12px] text-selene-white-dim/60 mt-2">
              <span className="text-selene-gold font-semibold">ES</span>
              <span className="mx-1.5">|</span>
              <span className="opacity-50">EN</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Progress Bar ──
export function ProgressBar({ value = 0, color = '#C9A84C', height = 4, className = '' }) {
  return (
    <div className={`w-full bg-selene-elevated rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(value * 100, 100)}%`, background: color }}
      />
    </div>
  );
}

// ── Badge ──
export function Badge({ children, color = '#C9A84C', className = '' }) {
  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wide ${className}`}
      style={{ color: '#0A0A0F', background: color }}
    >
      {children}
    </span>
  );
}

// ── Card ──
export function Card({ children, className = '', hover = false, onClick, ...props }) {
  return (
    <div
      className={`bg-selene-card rounded-2xl border border-selene-border overflow-hidden ${hover ? 'hover:border-selene-gold/30 transition-colors cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Section Label ──
export function SectionTitle({ children, subtitle, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="font-display text-xl font-medium text-selene-white">{children}</h2>
      {subtitle && <p className="text-sm text-selene-white-dim mt-1">{subtitle}</p>}
    </div>
  );
}

// ── Gold Divider ──
export function GoldDivider({ className = '' }) {
  return <div className={`w-10 h-px bg-selene-gold mx-auto ${className}`} />;
}

// ── Loading Spinner ──
export function Spinner({ text = 'Cargando...' }) {
  return (
    <div className="min-h-screen bg-selene-bg flex flex-col items-center justify-center">
      <div className="w-14 h-14 border-2 border-selene-border border-t-selene-gold rounded-full animate-spin" />
      <p className="font-display text-lg text-selene-gold mt-6">{text}</p>
    </div>
  );
}

// ── Footer ──
export function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-selene-border text-center text-xs text-selene-white-dim">
      <div className="flex items-center justify-center gap-2 mb-3">
        <MoonIcon size={16} className="text-selene-gold-dim" />
        <span className="font-display text-selene-gold-dim tracking-wider">SELENE</span>
      </div>
      <p>Ciencia y consciencia de lo invisible &middot; selenaura.com</p>
      <div className="mt-2 opacity-50 flex gap-4 justify-center">
        <Link href="/legal" className="hover:text-selene-white no-underline text-selene-white-dim">Aviso Legal</Link>
        <Link href="/privacidad" className="hover:text-selene-white no-underline text-selene-white-dim">Privacidad</Link>
        <Link href="/cookies" className="hover:text-selene-white no-underline text-selene-white-dim">Cookies</Link>
      </div>
    </footer>
  );
}
