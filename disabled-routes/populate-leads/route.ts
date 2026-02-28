import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const sampleLeads = [
  {
    lead_type: 'iul',
    status: 'available',
    first_name: 'Michael',
    last_name: 'Rodriguez',
    email: 'michael.rodriguez@email.com',
    phone: '+1-555-0123',
    street_address: '123 Oak Street',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    age: 42,
    annual_income: 95000,
    desired_coverage: 350000,
    quality_score: 88,
    verified_phone: true,
    verified_email: true,
    price: 28.50,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'iul',
    status: 'available',
    first_name: 'Sarah',
    last_name: 'Chen',
    email: 'sarah.chen@email.com',
    phone: '+1-555-0124',
    street_address: '456 Pine Avenue',
    city: 'Dallas',
    state: 'TX',
    zip_code: '75201',
    age: 38,
    annual_income: 120000,
    desired_coverage: 500000,
    quality_score: 92,
    verified_phone: true,
    verified_email: true,
    price: 32.00,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'mortgage_protection',
    status: 'available',
    first_name: 'Jennifer',
    last_name: 'Williams',
    email: 'jennifer.williams@email.com',
    phone: '+1-555-0126',
    street_address: '321 Maple Drive',
    city: 'San Antonio',
    state: 'TX',
    zip_code: '78201',
    age: 33,
    annual_income: 75000,
    desired_coverage: 250000,
    quality_score: 79,
    verified_phone: true,
    verified_email: true,
    price: 24.00,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'final_expense',
    status: 'available',
    first_name: 'Mary',
    last_name: 'Miller',
    email: 'mary.miller@email.com',
    phone: '+1-555-0129',
    street_address: '147 Sunset Boulevard',
    city: 'El Paso',
    state: 'TX',
    zip_code: '79901',
    age: 67,
    annual_income: 45000,
    desired_coverage: 25000,
    quality_score: 76,
    verified_phone: true,
    verified_email: true,
    price: 18.50,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'trucker_insurance',
    status: 'available',
    first_name: 'James',
    last_name: 'Taylor',
    email: 'james.taylor@email.com',
    phone: '+1-555-0132',
    street_address: '741 Highway 35',
    city: 'Laredo',
    state: 'TX',
    zip_code: '78040',
    age: 45,
    annual_income: 65000,
    desired_coverage: 150000,
    quality_score: 89,
    verified_phone: true,
    verified_email: true,
    price: 35.00,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'iul',
    status: 'available',
    first_name: 'Amanda',
    last_name: 'Garcia',
    email: 'amanda.garcia@email.com',
    phone: '+1-555-0135',
    street_address: '159 Executive Way',
    city: 'Irving',
    state: 'TX',
    zip_code: '75038',
    age: 44,
    annual_income: 135000,
    desired_coverage: 600000,
    quality_score: 94,
    verified_phone: true,
    verified_email: true,
    price: 34.00,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'mortgage_protection',
    status: 'available',
    first_name: 'Kevin',
    last_name: 'Martinez',
    email: 'kevin.martinez@email.com',
    phone: '+1-555-0136',
    street_address: '357 Family Court',
    city: 'McKinney',
    state: 'TX',
    zip_code: '75069',
    age: 36,
    annual_income: 88000,
    desired_coverage: 320000,
    quality_score: 90,
    verified_phone: true,
    verified_email: true,
    price: 27.50,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  },
  {
    lead_type: 'final_expense',
    status: 'available',
    first_name: 'Dorothy',
    last_name: 'Jackson',
    email: 'dorothy.jackson@email.com',
    phone: '+1-555-0137',
    street_address: '468 Golden Years Lane',
    city: 'Lubbock',
    state: 'TX',
    zip_code: '79401',
    age: 74,
    annual_income: 41000,
    desired_coverage: 35000,
    quality_score: 83,
    verified_phone: true,
    verified_email: true,
    price: 21.50,
    source: 'facebook',
    expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    utm_source: 'facebook',
    utm_medium: 'cpc',
    utm_campaign: 'premium-leads-q1-2025'
  }
];

export async function POST(request: NextRequest) {
  try {
    // Clear existing leads first
    const { error: clearError } = await supabase
      .from('leads')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all leads

    if (clearError) {
      console.error('Error clearing leads:', clearError);
    }

    // Insert new sample leads
    const { data, error } = await supabase
      .from('leads')
      .insert(sampleLeads)
      .select();

    if (error) {
      console.error('Error inserting leads:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${data.length} leads`,
      leads: data.map((l: any) => `${l.first_name} ${l.last_name} (${l.lead_type})`)
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current leads count
    const { data, error } = await supabase
      .from('leads')
      .select('id, lead_type, first_name, last_name, price, status')
      .eq('status', 'available');

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      leads: data
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred' 
    }, { status: 500 });
  }
}