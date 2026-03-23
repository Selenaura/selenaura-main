'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Navbar, Footer, Card, ArrowIcon } from '@/components/ui';

// ── 22 Major Arcana ──
const MAJOR_ARCANA = [
  { numeral: '0', name: 'El Loco', meaning: 'Nuevos comienzos, libertad y un salto de fe hacia lo desconocido.' },
  { numeral: 'I', name: 'El Mago', meaning: 'Poder de manifestacion, habilidad y recursos a tu disposicion.' },
  { numeral: 'II', name: 'La Sacerdotisa', meaning: 'Intuicion profunda, misterio y sabiduria interior que espera ser escuchada.' },
  { numeral: 'III', name: 'La Emperatriz', meaning: 'Abundancia, creatividad y la fuerza nutritiva de la naturaleza.' },
  { numeral: 'IV', name: 'El Emperador', meaning: 'Estructura, autoridad y la capacidad de construir sobre bases solidas.' },
  { numeral: 'V', name: 'El Hierofante', meaning: 'Tradicion, ensenanza espiritual y la busqueda de un significado mas profundo.' },
  { numeral: 'VI', name: 'Los Enamorados', meaning: 'Eleccion consciente, union y la armonia entre opuestos.' },
  { numeral: 'VII', name: 'El Carro', meaning: 'Determinacion, victoria y el impulso de avanzar con confianza.' },
  { numeral: 'VIII', name: 'La Fuerza', meaning: 'Coraje interior, paciencia y el poder de la compasion sobre la fuerza bruta.' },
  { numeral: 'IX', name: 'El Ermitano', meaning: 'Introspeccion, soledad elegida y la luz que se encuentra en el silencio.' },
  { numeral: 'X', name: 'La Rueda de la Fortuna', meaning: 'Ciclos, destino y los giros inesperados que transforman tu camino.' },
  { numeral: 'XI', name: 'La Justicia', meaning: 'Equilibrio, verdad y las consecuencias naturales de tus acciones.' },
  { numeral: 'XII', name: 'El Colgado', meaning: 'Perspectiva nueva, sacrificio voluntario y la sabiduria de la rendicion.' },
  { numeral: 'XIII', name: 'La Muerte', meaning: 'Transformacion profunda, final de un ciclo y renacimiento inevitable.' },
  { numeral: 'XIV', name: 'La Templanza', meaning: 'Equilibrio, paciencia y la alquimia de combinar elementos opuestos.' },
  { numeral: 'XV', name: 'El Diablo', meaning: 'Ataduras, deseos y la invitacion a liberarte de lo que te limita.' },
  { numeral: 'XVI', name: 'La Torre', meaning: 'Cambio subito, revelacion y la destruccion de estructuras que ya no sirven.' },
  { numeral: 'XVII', name: 'La Estrella', meaning: 'Esperanza, inspiracion y la serenidad que llega tras la tormenta.' },
  { numeral: 'XVIII', name: 'La Luna', meaning: 'Ilusion, intuicion y los misterios del subconsciente que piden atencion.' },
  { numeral: 'XIX', name: 'El Sol', meaning: 'Alegria, exito y la claridad que ilumina todas las sombras.' },
  { numeral: 'XX', name: 'El Juicio', meaning: 'Despertar, llamada interior y la oportunidad de renacer con proposito.' },
  { numeral: 'XXI', name: 'El Mundo', meaning: 'Completitud, logro y la celebracion de un ciclo cumplido.' },
];

// ── Shuffle helper ──
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ── Card Back SVG (moon symbol) ──
function CardBack() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#12121A] to-[#0A0A0F] rounded-xl border-2 border-selene-gold/40">
      <div className="flex flex-col items-center gap-2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1" className="opacity-60">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
        <div className="w-6 h-px bg-selene-gold/30" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1" className="opacity-40">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </div>
    </div>
  );
}

// ── Card Front ──
function CardFront({ card }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#1A1A25] to-[#12121A] rounded-xl border-2 border-selene-gold p-4">
      <span className="font-display text-[11px] tracking-[0.2em] text-selene-gold/60 mb-2 uppercase">
        {card.numeral}
      </span>
      <div className="w-8 h-px bg-selene-gold/30 mb-3" />
      <h3 className="font-display text-base sm:text-lg text-selene-gold text-center leading-tight mb-3">
        {card.name}
      </h3>
      <div className="w-8 h-px bg-selene-gold/30 mb-3" />
      <p className="text-[11px] text-selene-white-dim text-center leading-relaxed px-1">
        {card.meaning}
      </p>
    </div>
  );
}

// ── Single Tarot Card Component ──
function TarotCard({ card, isFlipped, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer transition-transform duration-200 ${
        !isFlipped ? 'hover:scale-105 hover:-translate-y-2' : ''
      }`}
      style={{
        width: '160px',
        height: '260px',
        perspective: '1000px',
      }}
      aria-label={isFlipped ? card.name : `Carta ${index + 1}`}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Back */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <CardBack />
        </div>
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardFront card={card} />
        </div>
      </div>
    </button>
  );
}

export default function TarotPage() {
  const [deck] = useState(() => shuffleArray(MAJOR_ARCANA).slice(0, 3));
  const [flipped, setFlipped] = useState([false, false, false]);
  const allFlipped = flipped.every(Boolean);

  const handleFlip = useCallback((index) => {
    setFlipped(prev => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const positionLabels = ['Pasado', 'Presente', 'Futuro'];

  return (
    <div className="min-h-screen bg-selene-bg flex flex-col">
      <Navbar showAuth />

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-display text-3xl sm:text-4xl text-selene-white mb-3">
            El Tarot te habla
          </h1>
          <p className="text-sm text-selene-white-dim max-w-md mx-auto">
            Elige tres cartas con tu intuicion. Cada una revela un mensaje para ti.
          </p>
        </div>

        {/* Position labels */}
        <div className="flex gap-6 sm:gap-10 mb-4">
          {positionLabels.map((label, i) => (
            <div
              key={label}
              className="text-center"
              style={{ width: '160px' }}
            >
              <span className={`text-[11px] tracking-[0.15em] uppercase ${
                flipped[i] ? 'text-selene-gold' : 'text-selene-white-dim/50'
              } transition-colors`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="flex gap-6 sm:gap-10 mb-10">
          {deck.map((card, i) => (
            <TarotCard
              key={card.numeral}
              card={card}
              isFlipped={flipped[i]}
              onClick={() => handleFlip(i)}
              index={i}
            />
          ))}
        </div>

        {/* Prompt */}
        {!allFlipped && (
          <p className="text-[13px] text-selene-white-dim animate-pulse-gold">
            Toca una carta para revelarla
          </p>
        )}

        {/* CTA after all flipped */}
        {allFlipped && (
          <div className="text-center animate-fade-in mt-2">
            <div className="w-12 h-px bg-selene-gold/40 mx-auto mb-6" />
            <p className="text-sm text-selene-white-dim mb-5 max-w-md mx-auto">
              Estas tres cartas tienen un mensaje unico para ti.
              Una interpretacion profunda conecta sus significados con tu momento vital.
            </p>
            <Link
              href="/checkout?product=tarot-profunda"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-selene-gold text-selene-bg px-6 py-3 rounded-lg hover:brightness-110 no-underline transition"
            >
              Interpretacion profunda &rarr; 1,99&thinsp;&euro;
            </Link>
            <p className="text-[11px] text-selene-white-dim/50 mt-3">
              Un analisis personalizado de tu tirada de tres cartas
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
