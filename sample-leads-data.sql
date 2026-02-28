-- =============================================================================
-- SAMPLE LEADS DATA FOR TESTING
-- Execute this in Supabase to create test leads
-- =============================================================================

-- Insert sample leads for testing
INSERT INTO public.leads (
  lead_type, first_name, last_name, email, phone, 
  street_address, city, state, zip_code, age, annual_income, 
  desired_coverage, quality_score, price, expires_at
) VALUES 
-- IUL Insurance Leads
('iul', 'Michael', 'Rodriguez', 'michael.rodriguez@email.com', '+1-555-0123', 
 '123 Oak Street', 'Austin', 'TX', '78701', 42, 95000, 350000, 
 88, 28.50, NOW() + INTERVAL '72 hours'),

('iul', 'Sarah', 'Chen', 'sarah.chen@email.com', '+1-555-0124', 
 '456 Pine Avenue', 'Dallas', 'TX', '75201', 38, 120000, 500000, 
 92, 32.00, NOW() + INTERVAL '72 hours'),

('iul', 'Robert', 'Johnson', 'robert.johnson@email.com', '+1-555-0125', 
 '789 Elm Street', 'Houston', 'TX', '77001', 35, 85000, 300000, 
 85, 26.00, NOW() + INTERVAL '72 hours'),

-- Mortgage Protection Leads  
('mortgage_protection', 'Jennifer', 'Williams', 'jennifer.williams@email.com', '+1-555-0126', 
 '321 Maple Drive', 'San Antonio', 'TX', '78201', 33, 75000, 250000, 
 79, 24.00, NOW() + INTERVAL '72 hours'),

('mortgage_protection', 'David', 'Brown', 'david.brown@email.com', '+1-555-0127', 
 '654 Cedar Lane', 'Fort Worth', 'TX', '76101', 41, 92000, 400000, 
 86, 25.50, NOW() + INTERVAL '72 hours'),

('mortgage_protection', 'Lisa', 'Davis', 'lisa.davis@email.com', '+1-555-0128', 
 '987 Birch Road', 'Plano', 'TX', '75023', 29, 68000, 220000, 
 82, 23.00, NOW() + INTERVAL '72 hours'),

-- Final Expense Leads
('final_expense', 'Mary', 'Miller', 'mary.miller@email.com', '+1-555-0129', 
 '147 Sunset Boulevard', 'El Paso', 'TX', '79901', 67, 45000, 25000, 
 76, 18.50, NOW() + INTERVAL '72 hours'),

('final_expense', 'William', 'Wilson', 'william.wilson@email.com', '+1-555-0130', 
 '258 Rose Street', 'Arlington', 'TX', '76001', 72, 38000, 20000, 
 78, 19.00, NOW() + INTERVAL '72 hours'),

('final_expense', 'Patricia', 'Moore', 'patricia.moore@email.com', '+1-555-0131', 
 '369 Lily Avenue', 'Garland', 'TX', '75040', 69, 42000, 30000, 
 81, 20.00, NOW() + INTERVAL '72 hours'),

-- Trucker Insurance Leads
('trucker_insurance', 'James', 'Taylor', 'james.taylor@email.com', '+1-555-0132', 
 '741 Highway 35', 'Laredo', 'TX', '78040', 45, 65000, 150000, 
 89, 35.00, NOW() + INTERVAL '72 hours'),

('trucker_insurance', 'Linda', 'Anderson', 'linda.anderson@email.com', '+1-555-0133', 
 '852 Interstate Drive', 'Corpus Christi', 'TX', '78401', 38, 58000, 120000, 
 84, 33.50, NOW() + INTERVAL '72 hours'),

('trucker_insurance', 'Christopher', 'Thomas', 'christopher.thomas@email.com', '+1-555-0134', 
 '963 Truck Stop Road', 'Amarillo', 'TX', '79101', 52, 72000, 180000, 
 87, 36.00, NOW() + INTERVAL '72 hours'),

-- Additional High-Quality Leads
('iul', 'Amanda', 'Garcia', 'amanda.garcia@email.com', '+1-555-0135', 
 '159 Executive Way', 'Irving', 'TX', '75038', 44, 135000, 600000, 
 94, 34.00, NOW() + INTERVAL '72 hours'),

('mortgage_protection', 'Kevin', 'Martinez', 'kevin.martinez@email.com', '+1-555-0136', 
 '357 Family Court', 'McKinney', 'TX', '75069', 36, 88000, 320000, 
 90, 27.50, NOW() + INTERVAL '72 hours'),

('final_expense', 'Dorothy', 'Jackson', 'dorothy.jackson@email.com', '+1-555-0137', 
 '468 Golden Years Lane', 'Lubbock', 'TX', '79401', 74, 41000, 35000, 
 83, 21.50, NOW() + INTERVAL '72 hours');

-- Update all leads to have verified contact data
UPDATE public.leads SET verified_phone = true, verified_email = true WHERE id IS NOT NULL;

-- Add some campaign tracking data
UPDATE public.leads SET 
  source = 'facebook',
  utm_source = 'facebook',
  utm_medium = 'cpc',
  utm_campaign = 'premium-leads-q1-2025'
WHERE id IS NOT NULL;

-- Create some lead submissions for testing
INSERT INTO public.lead_submissions (
  form_type, first_name, last_name, email, phone,
  street_address, city, state, zip_code, age, annual_income,
  desired_coverage, current_coverage, ip_address, user_agent,
  utm_source, utm_medium, utm_campaign, facebook_pixel_id,
  processed
) VALUES 
('iul', 'Test', 'Lead', 'test.lead@example.com', '+1-555-9999',
 '123 Test Street', 'Test City', 'TX', '12345', 40, 80000,
 250000, false, '192.168.1.1', 'Mozilla/5.0 Test Browser',
 'facebook', 'cpc', 'test-campaign', '1234567890',
 false);

SELECT 'Sample leads data inserted successfully! 🎯' as status;