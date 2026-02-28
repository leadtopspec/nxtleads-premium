import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Create demo user profile
    const demoUser = {
      id: '550e8400-e29b-41d4-a716-446655440000', // Fixed UUID for demo
      email: 'demo@nxtleads.com',
      full_name: 'Demo Agent',
      company_name: 'Elite Insurance Agency',
      phone: '+1-555-DEMO-01',
      role: 'agent',
      credits: 50, // Give 50 credits for testing
      total_spent: 0,
      total_leads_purchased: 0,
      is_active: true,
      email_verified: true,
      license_number: 'TX-DEMO-12345',
      license_state: 'TX',
      specialty_types: ['IUL', 'Final Expense', 'Mortgage Protection', 'Trucker Insurance']
    };

    // Insert/update demo user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert([demoUser], { onConflict: 'id' })
      .select()
      .single();

    if (userError) {
      console.error('Error creating demo user:', userError);
      return NextResponse.json({ 
        success: false, 
        error: userError.message 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Demo environment setup complete',
      user: userData
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred' 
    }, { status: 500 });
  }
}