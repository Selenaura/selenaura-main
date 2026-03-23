import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getSunSignDetails } from '@/lib/zodiac';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { birth_date } = await request.json();

    if (!birth_date) {
      return NextResponse.json({ error: 'Fecha de nacimiento requerida' }, { status: 400 });
    }

    const signDetails = getSunSignDetails(birth_date);

    if (!signDetails) {
      return NextResponse.json({ error: 'Fecha no valida' }, { status: 400 });
    }

    // Update profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        sun_sign: signDetails.name,
        birth_date: birth_date,
        updated_at: new Date().toISOString(),
      });

    if (updateError) {
      console.error('Profile update error:', updateError);
    }

    return NextResponse.json({
      sun_sign: signDetails.name,
      sun_emoji: signDetails.emoji,
      sun_element: signDetails.element,
      sun_description: signDetails.description,
    });
  } catch (error) {
    console.error('Basic chart error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
