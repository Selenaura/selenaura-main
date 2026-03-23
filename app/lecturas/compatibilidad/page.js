'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer, Card, ArrowIcon, SectionTitle } from '@/components/ui';
import { ZODIAC_SIGNS, getSunSign } from '@/lib/zodiac';

// ── Element mapping ──
const ELEMENTS = {
  'Aries': 'Fuego', 'Leo': 'Fuego', 'Sagitario': 'Fuego',
  'Tauro': 'Tierra', 'Virgo': 'Tierra', 'Capricornio': 'Tierra',
  'Geminis': 'Aire', 'Libra': 'Aire', 'Acuario': 'Aire',
  'Cancer': 'Agua', 'Escorpio': 'Agua', 'Piscis': 'Agua',
  // With accents
  '\u0047\u00e9minis': 'Aire', 'C\u00e1ncer': 'Agua',
};

function getElement(signName) {
  if (!signName) return null;
  return ELEMENTS[signName] || ELEMENTS[signName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')] || null;
}

// ── Element compatibility messages ──
function getElementCompatibility(el1, el2) {
  if (!el1 || !el2) return null;

  const pair = [el1, el2].sort().join('+');
  const messages = {
    'Fuego+Fuego': {
      emoji: '\uD83D\uDD25',
      title: 'Llama doble',
      text: 'Energia similar \u2014 os entendeis de forma natural. Dos fuegos juntos arden con intensidad y compartis la misma pasion por la vida.',
    },
    'Tierra+Tierra': {
      emoji: '\uD83C\uDF3F',
      title: 'Raices compartidas',
      text: 'Energia similar \u2014 os entendeis de forma natural. Dos tierras construyen juntas con una estabilidad y confianza poco comunes.',
    },
    'Aire+Aire': {
      emoji: '\uD83D\uDCA8',
      title: 'Mentes en sincronia',
      text: 'Energia similar \u2014 os entendeis de forma natural. Dos aires se estimulan intelectualmente y nunca se aburren.',
    },
    'Agua+Agua': {
      emoji: '\uD83C\uDF0A',
      title: 'Corriente profunda',
      text: 'Energia similar \u2014 os entendeis de forma natural. Dos aguas se comprenden emocionalmente a un nivel que trasciende las palabras.',
    },
    'Aire+Fuego': {
      emoji: '\u2728',
      title: 'Chispa constante',
      text: 'Chispa constante \u2014 os inspirais mutuamente. El aire aviva el fuego, creando una conexion llena de entusiasmo y proyectos compartidos.',
    },
    'Agua+Tierra': {
      emoji: '\uD83C\uDF31',
      title: 'Jardin fertil',
      text: 'Conexion profunda \u2014 os nutris con estabilidad y emocion. La tierra da forma y la agua da vida: una combinacion que hace crecer todo lo que toca.',
    },
    'Agua+Fuego': {
      emoji: '\u2601\uFE0F',
      title: 'Vapor y pasion',
      text: 'Intensidad pura \u2014 pasion y tension a partes iguales. La atraccion es magnetica pero requiere aprender a equilibrar mundos distintos.',
    },
    'Fuego+Tierra': {
      emoji: '\uD83C\uDF0B',
      title: 'Volcan creativo',
      text: 'Complementarios \u2014 uno enciende, el otro sostiene. El fuego aporta la vision y la tierra la estructura para hacerla realidad.',
    },
    'Agua+Aire': {
      emoji: '\uD83C\uDF0C',
      title: 'Niebla mistica',
      text: 'Mundos distintos \u2014 la mente y el corazon buscan equilibrio. Es una union que, cuando se armoniza, conecta la razon con la intuicion.',
    },
    'Aire+Tierra': {
      emoji: '\uD83C\uDFD7\uFE0F',
      title: 'Arquitectura vital',
      text: 'Contraste productivo \u2014 las ideas encuentran forma. El aire imagina y la tierra materializa: si os escuchais, creais cosas extraordinarias.',
    },
  };

  return messages[pair] || messages[pair.split('+').reverse().join('+')] || null;
}

// ── Get sign from date string ──
function getSignFromDate(dateStr) {
  if (!dateStr) return null;
  const sign = getSunSign(dateStr);
  return sign ? sign : null;
}

export default function CompatibilidadPage() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sign1 = getSignFromDate(date1);
    const sign2 = getSignFromDate(date2);
    if (!sign1 || !sign2) return;

    const el1 = getElement(sign1.name);
    const el2 = getElement(sign2.name);
    const compat = getElementCompatibility(el1, el2);

    setResult({
      sign1,
      sign2,
      element1: el1,
      element2: el2,
      compatibility: compat,
      personName1: name1 || 'Persona 1',
      personName2: name2 || 'Persona 2',
    });
  };

  const canSubmit = date1 && date2;

  return (
    <div className="min-h-screen bg-selene-bg flex flex-col">
      <Navbar showAuth />

      <main className="flex-1 max-w-[600px] mx-auto px-5 py-10 w-full">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-display text-3xl sm:text-4xl text-selene-white mb-3">
            Compatibilidad astral
          </h1>
          <p className="text-sm text-selene-white-dim max-w-md mx-auto">
            Descubre la quimica cosmica entre dos personas a traves de sus signos solares y elementos.
          </p>
        </div>

        {/* Form */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Person 1 */}
              <div>
                <label className="block text-[11px] text-selene-white-dim tracking-[0.1em] uppercase mb-2">
                  Tu fecha de nacimiento
                </label>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full bg-selene-elevated border border-selene-border rounded-lg px-4 py-3 text-sm text-selene-white focus:border-selene-gold focus:outline-none transition-colors"
                  required
                />
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Tu nombre (opcional)"
                  className="w-full bg-selene-elevated border border-selene-border rounded-lg px-4 py-3 text-sm text-selene-white placeholder:text-selene-white-dim/40 focus:border-selene-gold focus:outline-none transition-colors mt-2"
                />
              </div>

              {/* Person 2 */}
              <div>
                <label className="block text-[11px] text-selene-white-dim tracking-[0.1em] uppercase mb-2">
                  Su fecha de nacimiento
                </label>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full bg-selene-elevated border border-selene-border rounded-lg px-4 py-3 text-sm text-selene-white focus:border-selene-gold focus:outline-none transition-colors"
                  required
                />
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Su nombre (opcional)"
                  className="w-full bg-selene-elevated border border-selene-border rounded-lg px-4 py-3 text-sm text-selene-white placeholder:text-selene-white-dim/40 focus:border-selene-gold focus:outline-none transition-colors mt-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full text-sm font-semibold px-6 py-3.5 rounded-lg transition ${
                canSubmit
                  ? 'bg-selene-gold text-selene-bg hover:brightness-110 cursor-pointer'
                  : 'bg-selene-elevated text-selene-white-dim cursor-not-allowed'
              }`}
            >
              Descubrir compatibilidad
            </button>
          </form>
        </Card>

        {/* Results */}
        {result && (
          <div className="animate-fade-in">
            {/* Signs display */}
            <Card className="p-6 mb-6 border-selene-gold/20">
              <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
                {/* Person 1 */}
                <div className="text-center">
                  <div className="text-4xl mb-2">{result.sign1.emoji}</div>
                  <div className="text-sm font-semibold text-selene-white">{result.sign1.name}</div>
                  <div className="text-[11px] text-selene-white-dim">{result.element1}</div>
                  <div className="text-[11px] text-selene-gold mt-1">{result.personName1}</div>
                </div>

                {/* Connector */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{result.compatibility?.emoji || '\u2728'}</span>
                  <div className="w-12 h-px bg-selene-gold/30" />
                </div>

                {/* Person 2 */}
                <div className="text-center">
                  <div className="text-4xl mb-2">{result.sign2.emoji}</div>
                  <div className="text-sm font-semibold text-selene-white">{result.sign2.name}</div>
                  <div className="text-[11px] text-selene-white-dim">{result.element2}</div>
                  <div className="text-[11px] text-selene-gold mt-1">{result.personName2}</div>
                </div>
              </div>

              {/* Compatibility message */}
              {result.compatibility && (
                <div className="bg-selene-elevated/50 rounded-xl p-4 border border-selene-border">
                  <h3 className="font-display text-base text-selene-gold mb-2 text-center">
                    {result.compatibility.title}
                  </h3>
                  <p className="text-[13px] text-selene-white leading-relaxed text-center">
                    {result.compatibility.text}
                  </p>
                </div>
              )}
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="w-12 h-px bg-selene-gold/30 mx-auto mb-5" />
              <p className="text-sm text-selene-white-dim mb-4 max-w-md mx-auto">
                Un analisis completo de sinastria compara ambas cartas natales en profundidad:
                aspectos planetarios, casas compartidas y dinamicas karmicas.
              </p>
              <Link
                href="/checkout?product=compatibilidad"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-selene-gold text-selene-bg px-6 py-3 rounded-lg hover:brightness-110 no-underline transition"
              >
                Analisis completo de compatibilidad &rarr; 9,99&thinsp;&euro;
              </Link>
              <p className="text-[11px] text-selene-white-dim/50 mt-3">
                Incluye comparacion de cartas natales y dinamicas de relacion
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
