import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Eres SELENE, una astróloga científica que combina conocimiento astronómico real con neurociencia moderna. Tu voz es la de una científica mística: precisa, profunda, directa y con calidez contenida.

REGLAS FUNDAMENTALES:
- Escribes en segunda persona directa (tú)
- Párrafos de 3-5 frases, prosa fluida
- Tono: ni frío ni New Age. Mentora brillante que habla sin filtro
- NUNCA uses listas con viñetas. Todo en prosa
- PROHIBIDO: "En resumen", "Es importante señalar", "Cabe destacar", emojis, exclamaciones excesivas
- Usa preguntas retóricas que provoquen reconocimiento

ESTRUCTURA — 3 PÁRRAFOS:
1. Tu Sol en [signo]: quién eres en esencia, cómo brillas, qué te apaga.
2. Tu Luna en [signo]: qué necesitas emocionalmente, patrones inconscientes.
3. Lo que viene: un cierre que deje con ganas de saber más — sin vender, solo curiosidad genuina.

Total: ~300 palabras. Sé específica. Sé valiente.`;

function getZodiacSign(birthDate) {
  const d = new Date(birthDate);
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Tauro';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Géminis';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cáncer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitario';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricornio';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Acuario';
  return 'Piscis';
}

export async function POST(request) {
  try {
    const { email, date, time, city } = await request.json();

    if (!email || !date) {
      return NextResponse.json({ error: 'Email y fecha de nacimiento son obligatorios' }, { status: 400 });
    }

    const birthDate = new Date(date);
    const day = birthDate.getUTCDate();
    const month = birthDate.toLocaleDateString('es-ES', { month: 'long', timeZone: 'UTC' });
    const year = birthDate.getFullYear();
    const signoSolar = getZodiacSign(date);

    // Generate reading with Claude
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Genera una Lectura Express para esta persona:\n\n**Fecha de nacimiento:** ${day} de ${month} de ${year}${time ? `\n**Hora de nacimiento:** ${time}` : ''}${city ? `\n**Lugar de nacimiento:** ${city}` : ''}\n\nCalcula las posiciones planetarias aproximadas. Genera los 3 párrafos.`,
        }],
      }),
    });

    if (!claudeResponse.ok) {
      console.error('Claude API error:', await claudeResponse.text());
      return NextResponse.json({ error: 'Error al generar la lectura' }, { status: 502 });
    }

    const claudeData = await claudeResponse.json();
    const lecturaText = claudeData.content[0].text;

    // Send to Brevo (non-blocking)
    const lecturaHtml = lecturaText.split('\n\n').map(p => `<p>${p}</p>`).join('\n');

    // Track funnel events in Supabase
    const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (serviceKey && supabaseUrl) {
      const trackHeaders = {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      };
      // Track lectura_generada
      fetch(`${supabaseUrl}/rest/v1/funnel_events`, {
        method: 'POST', headers: trackHeaders,
        body: JSON.stringify({ event_type: 'lectura_generada', signo_solar: signoSolar, email }),
      }).catch(e => console.error('Funnel track error:', e.message));
      // Track email_capturado
      fetch(`${supabaseUrl}/rest/v1/funnel_events`, {
        method: 'POST', headers: trackHeaders,
        body: JSON.stringify({ event_type: 'email_capturado', signo_solar: signoSolar, email }),
      }).catch(e => console.error('Funnel track error:', e.message));
    }

    const brevoPromises = [];

    if (process.env.BREVO_API_KEY) {
      // Add contact
      brevoPromises.push(
        fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            listIds: [parseInt(process.env.BREVO_LIST_ID || '2')],
            attributes: { FECHA_NACIMIENTO: date, SIGNO_SOLAR: signoSolar, FUENTE: 'lectura-express', HA_COMPRADO: false },
            updateEnabled: true,
          }),
        }).catch(e => console.error('Brevo contact error:', e.message))
      );

      // Send email
      brevoPromises.push(
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: { name: 'Selene', email: 'selene@selenaura.com' },
            to: [{ email }],
            subject: 'Tu lectura está aquí — esto es lo que vi',
            htmlContent: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head><body style="font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;line-height:1.7;"><p style="font-size:18px;color:#2c2c2c;">Hola, ${signoSolar}.</p><p>He mirado tu cielo. Esto es lo que encontré.</p><div style="margin:32px 0;padding:24px;border-left:3px solid #C9A84C;background:#fafaf5;">${lecturaHtml}</div><p>Hay más cosas en tu carta que no caben en esta lectura. Si algo de lo que leíste te resonó, responde a este email.</p><p style="margin-top:32px;">— Selene</p><hr style="margin:40px 0;border:none;border-top:1px solid #e0e0e0;"><p style="font-size:12px;color:#999;">Responsable: SelenaUra · Base legal: Art 6.1.a RGPD<br>Puedes darte de baja en cualquier momento.</p></body></html>`,
            tags: ['lectura-express', 'transactional'],
          }),
        }).catch(e => console.error('Brevo email error:', e.message))
      );

      await Promise.allSettled(brevoPromises);
    }

    return NextResponse.json({ lectura: lecturaText, signo: signoSolar });
  } catch (err) {
    console.error('Lectura express error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
