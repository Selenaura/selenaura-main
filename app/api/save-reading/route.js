import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Use service role for saving readings (may be called from webhook)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const {
      user_id,
      reading_type,
      input_data,
      result_text,
      result_sections,
      stripe_session_id,
      amount_paid,
    } = await request.json();

    if (!user_id || !reading_type) {
      return NextResponse.json(
        { error: 'user_id y reading_type son requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('readings_history')
      .insert({
        user_id,
        reading_type,
        input_data: input_data || null,
        result_text: result_text || null,
        result_sections: result_sections || null,
        stripe_session_id: stripe_session_id || null,
        amount_paid: amount_paid || 0,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Save reading error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reading: data });
  } catch (error) {
    console.error('Save reading error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
