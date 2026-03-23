import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use service role for webhook (no user context)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, product_type, product_id } = session.metadata;

    if (product_type === 'reading' && user_id && product_id) {
      // Save reading purchase to history
      const { error: readingError } = await supabase
        .from('readings_history')
        .insert({
          user_id,
          reading_type: product_id,
          stripe_session_id: session.id,
          amount_paid: session.amount_total,
          status: 'purchased',
          created_at: new Date().toISOString(),
        });

      if (readingError) {
        console.error('Reading record error:', readingError);
      }

      // Record payment
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id,
          product_type: 'reading',
          product_id,
          stripe_session_id: session.id,
          amount: session.amount_total,
          currency: session.currency,
          status: 'completed',
        });

      if (paymentError) {
        console.error('Payment record error:', paymentError);
      }

      console.log(`Lectura ${product_id} adquirida por usuario ${user_id}`);
    }

    if (product_type === 'course' && user_id && product_id) {
      // Create enrollment
      const { error: enrollError } = await supabase
        .from('enrollments')
        .upsert({
          user_id,
          course_id: product_id,
          status: 'active',
          enrolled_at: new Date().toISOString(),
          stripe_session_id: session.id,
          amount_paid: session.amount_total,
        });

      if (enrollError) {
        console.error('Enrollment error:', enrollError);
      }

      // Record payment
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id,
          product_type: 'course',
          product_id,
          stripe_session_id: session.id,
          amount: session.amount_total,
          currency: session.currency,
          status: 'completed',
        });

      if (paymentError) {
        console.error('Payment record error:', paymentError);
      }

      console.log(`Curso ${product_id} matriculado para usuario ${user_id}`);
    }
  }

  return NextResponse.json({ received: true });
}
