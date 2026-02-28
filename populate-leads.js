const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xfeouqefoeqquumfkegx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZW91cWVmb2VxcXV1bWZrZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODYzNzIsImV4cCI6MjA1NjE2MjM3Mn0.VQxJkTcQJ5YvSjE5w-7Fp9Pk5oelj8cjpE8OPLqsKHw';

const supabase = createClient(supabaseUrl, supabaseKey);

const leads = [
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
  }
];

async function populateLeads() {
  console.log('Populating leads database...');
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert(leads)
      .select();
    
    if (error) {
      console.error('Error inserting leads:', error);
      return;
    }
    
    console.log('✅ Successfully inserted', data.length, 'leads');
    console.log('Leads:', data.map(l => `${l.first_name} ${l.last_name} (${l.lead_type})`));
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

populateLeads();