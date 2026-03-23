import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { READINGS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { product_type, product_id } = await request.json();

    // Handle reading products
    if (product_type === 'reading') {
      const reading = READINGS.find(r => r.id === product_id);

      if (!reading) {
        return NextResponse.json({ error: 'Lectura no encontrada' }, { status: 404 });
      }

      if (reading.price === 0) {
        // Free reading — no checkout needed
        return NextResponse.json({ free: true, reading_id: reading.id });
      }

      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          product_type: 'reading',
          product_id: reading.id,
        },
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: reading.title,
                description: reading.subtitle,
                metadata: { reading_id: reading.id },
              },
              unit_amount: reading.price_cents,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mi-selene?purchased=${reading.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/lecturas`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Handle course products (redirect to academy checkout)
    if (product_type === 'course') {
      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          product_type: 'course',
          product_id: product_id,
        },
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: product_id,
                metadata: { course_id: product_id },
              },
              unit_amount: 0, // Will be set from Stripe price ID in production
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mi-selene?enrolled=${product_id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/lecturas`,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: 'Tipo de producto no valido' }, { status: 400 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
