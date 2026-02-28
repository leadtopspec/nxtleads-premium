-- Nxt Leads Database Schema
-- This file contains the complete database schema for the premium lead generation platform

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type subscription_status as enum ('free', 'premium', 'enterprise');
create type user_role as enum ('agent', 'manager', 'admin');
create type lead_status as enum ('available', 'purchased', 'contacted', 'qualified', 'closed_won', 'closed_lost');
create type lead_type as enum ('iul', 'mortgage_protection', 'final_expense', 'trucker_insurance', 'auto_insurance');
create type lead_quality as enum ('premium', 'standard', 'basic');

-- User Profiles Table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  company_name text,
  phone text,
  role user_role default 'agent',
  subscription_status subscription_status default 'free',
  credits_remaining integer default 10,
  total_leads_purchased integer default 0,
  total_spent decimal(10,2) default 0.00,
  conversion_rate decimal(5,2) default 0.00,
  avg_close_time_days integer default 0,
  preferred_lead_types lead_type[] default '{}',
  notification_preferences jsonb default '{"email": true, "sms": false, "push": true}',
  billing_address jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security for profiles
alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Leads Table
create table leads (
  id uuid default uuid_generate_v4() primary key,
  type lead_type not null,
  quality lead_quality default 'standard',
  status lead_status default 'available',
  
  -- Lead Information
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  date_of_birth date,
  gender text,
  
  -- Address Information
  street_address text,
  city text,
  state text,
  zip_code text,
  
  -- Lead Specific Data
  annual_income decimal(12,2),
  employment_status text,
  credit_score_range text,
  existing_coverage boolean,
  coverage_amount decimal(12,2),
  
  -- Qualification Data
  qualification_score integer default 0, -- 0-100
  contact_preference text default 'phone',
  best_time_to_contact text,
  notes text,
  
  -- Lead Source & Tracking
  source_campaign text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page_url text,
  
  -- Pricing
  price decimal(8,2) not null,
  original_price decimal(8,2),
  
  -- Timestamps
  generated_at timestamp with time zone default now(),
  available_until timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for leads table
create index idx_leads_status on leads(status);
create index idx_leads_type on leads(type);
create index idx_leads_quality on leads(quality);
create index idx_leads_available on leads(status, available_until) where status = 'available';
create index idx_leads_price on leads(price);
create index idx_leads_location on leads(state, city);

-- Lead Purchases Table
create table lead_purchases (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references leads(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  
  -- Purchase Details
  purchase_price decimal(8,2) not null,
  credits_used integer default 0,
  payment_method text, -- 'credits', 'stripe', 'invoice'
  stripe_payment_intent_id text,
  
  -- Lead Interaction Tracking
  first_contact_attempt timestamp with time zone,
  first_contact_successful timestamp with time zone,
  appointment_set timestamp with time zone,
  presentation_completed timestamp with time zone,
  application_submitted timestamp with time zone,
  policy_issued timestamp with time zone,
  commission_amount decimal(8,2),
  
  -- Follow-up & Notes
  contact_attempts integer default 0,
  agent_notes text,
  lead_feedback text,
  outcome_reason text,
  
  -- Timestamps
  purchased_at timestamp with time zone default now(),
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  unique(lead_id, user_id)
);

-- Indexes for lead_purchases
create index idx_purchases_user on lead_purchases(user_id);
create index idx_purchases_lead on lead_purchases(lead_id);
create index idx_purchases_date on lead_purchases(purchased_at);
create index idx_purchases_outcome on lead_purchases(user_id, policy_issued) where policy_issued is not null;

-- RLS for leads and purchases
alter table leads enable row level security;
alter table lead_purchases enable row level security;

-- Leads policies - all users can view available leads
create policy "Anyone can view available leads" on leads
  for select using (status = 'available' and available_until > now());

-- Purchased leads policies - users can only see their own purchases
create policy "Users can view their purchased leads" on lead_purchases
  for select using (auth.uid() = user_id);

create policy "Users can update their purchased leads" on lead_purchases
  for update using (auth.uid() = user_id);

create policy "Users can insert their own purchases" on lead_purchases
  for insert with check (auth.uid() = user_id);

-- Subscriptions Table (for Stripe integration)
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  
  -- Stripe Integration
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  
  -- Subscription Details
  status text not null, -- active, canceled, past_due, etc.
  plan_name text not null,
  credits_per_month integer default 0,
  monthly_price decimal(8,2) not null,
  
  -- Billing Periods
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  
  -- Timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS for subscriptions
alter table subscriptions enable row level security;

create policy "Users can view own subscriptions" on subscriptions
  for select using (auth.uid() = user_id);

-- Lead Analytics & Reporting Views
create or replace view user_analytics as
select 
  p.id,
  p.name,
  p.email,
  p.subscription_status,
  p.total_leads_purchased,
  p.total_spent,
  p.conversion_rate,
  
  -- Current month stats
  count(lp.*) filter (where lp.purchased_at >= date_trunc('month', now())) as leads_this_month,
  sum(lp.purchase_price) filter (where lp.purchased_at >= date_trunc('month', now())) as spent_this_month,
  count(lp.*) filter (where lp.purchased_at >= date_trunc('month', now()) and lp.policy_issued is not null) as conversions_this_month,
  
  -- All-time stats
  count(lp.*) filter (where lp.policy_issued is not null) as total_conversions,
  avg(lp.purchase_price) as avg_lead_cost,
  avg(lp.commission_amount) filter (where lp.commission_amount is not null) as avg_commission,
  
  -- Lead quality metrics
  avg(l.qualification_score) as avg_lead_quality,
  avg(extract(days from (lp.first_contact_successful - lp.purchased_at))) as avg_response_time_days
  
from profiles p
left join lead_purchases lp on p.id = lp.user_id
left join leads l on lp.lead_id = l.id
group by p.id, p.name, p.email, p.subscription_status, p.total_leads_purchased, p.total_spent, p.conversion_rate;

-- Lead Performance View
create or replace view lead_performance as
select 
  l.id,
  l.type,
  l.quality,
  l.price,
  l.qualification_score,
  l.state,
  l.city,
  
  -- Purchase metrics
  count(lp.id) as times_purchased,
  count(lp.id) filter (where lp.policy_issued is not null) as conversions,
  case when count(lp.id) > 0 then 
    count(lp.id) filter (where lp.policy_issued is not null)::decimal / count(lp.id) * 100 
  else 0 end as conversion_rate,
  
  avg(lp.contact_attempts) as avg_contact_attempts,
  avg(extract(days from (lp.first_contact_successful - lp.purchased_at))) as avg_response_time_days
  
from leads l
left join lead_purchases lp on l.id = lp.lead_id
group by l.id, l.type, l.quality, l.price, l.qualification_score, l.state, l.city;

-- Functions for common operations

-- Function to purchase a lead
create or replace function purchase_lead(
  p_lead_id uuid,
  p_user_id uuid,
  p_use_credits boolean default true
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_lead leads%rowtype;
  v_user profiles%rowtype;
  v_purchase_id uuid;
  v_credits_cost integer := 1;
begin
  -- Get lead details
  select * into v_lead from leads where id = p_lead_id and status = 'available' and available_until > now();
  if not found then
    return jsonb_build_object('success', false, 'error', 'Lead not available');
  end if;
  
  -- Get user details
  select * into v_user from profiles where id = p_user_id;
  if not found then
    return jsonb_build_object('success', false, 'error', 'User not found');
  end if;
  
  -- Check if lead already purchased by this user
  if exists(select 1 from lead_purchases where lead_id = p_lead_id and user_id = p_user_id) then
    return jsonb_build_object('success', false, 'error', 'Lead already purchased');
  end if;
  
  -- Check credits if using credit system
  if p_use_credits then
    if v_user.credits_remaining < v_credits_cost then
      return jsonb_build_object('success', false, 'error', 'Insufficient credits');
    end if;
    
    -- Deduct credits
    update profiles 
    set credits_remaining = credits_remaining - v_credits_cost,
        total_leads_purchased = total_leads_purchased + 1,
        updated_at = now()
    where id = p_user_id;
  end if;
  
  -- Create purchase record
  insert into lead_purchases (lead_id, user_id, purchase_price, credits_used, payment_method)
  values (p_lead_id, p_user_id, v_lead.price, 
          case when p_use_credits then v_credits_cost else 0 end,
          case when p_use_credits then 'credits' else 'stripe' end)
  returning id into v_purchase_id;
  
  -- Mark lead as purchased
  update leads set status = 'purchased', updated_at = now() where id = p_lead_id;
  
  return jsonb_build_object(
    'success', true, 
    'purchase_id', v_purchase_id,
    'credits_remaining', (select credits_remaining from profiles where id = p_user_id)
  );
end;
$$;

-- Function to update lead interaction
create or replace function update_lead_interaction(
  p_purchase_id uuid,
  p_interaction_type text,
  p_notes text default null,
  p_outcome_data jsonb default null
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_purchase lead_purchases%rowtype;
  v_update_data jsonb;
begin
  -- Get purchase record
  select * into v_purchase from lead_purchases where id = p_purchase_id;
  if not found then
    return jsonb_build_object('success', false, 'error', 'Purchase not found');
  end if;
  
  -- Update based on interaction type
  case p_interaction_type
    when 'first_contact' then
      update lead_purchases 
      set first_contact_attempt = coalesce(first_contact_attempt, now()),
          contact_attempts = contact_attempts + 1,
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
    when 'successful_contact' then
      update lead_purchases 
      set first_contact_successful = coalesce(first_contact_successful, now()),
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
    when 'appointment_set' then
      update lead_purchases 
      set appointment_set = now(),
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
    when 'presentation_completed' then
      update lead_purchases 
      set presentation_completed = now(),
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
    when 'application_submitted' then
      update lead_purchases 
      set application_submitted = now(),
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
    when 'policy_issued' then
      update lead_purchases 
      set policy_issued = now(),
          commission_amount = (p_outcome_data->>'commission_amount')::decimal,
          agent_notes = coalesce(agent_notes || E'\n', '') || p_notes,
          updated_at = now()
      where id = p_purchase_id;
      
      -- Update user conversion rate
      update profiles 
      set conversion_rate = (
        select count(*) filter (where policy_issued is not null)::decimal / count(*) * 100
        from lead_purchases 
        where user_id = v_purchase.user_id
      )
      where id = v_purchase.user_id;
      
    else
      return jsonb_build_object('success', false, 'error', 'Invalid interaction type');
  end case;
  
  return jsonb_build_object('success', true, 'updated_at', now());
end;
$$;

-- Triggers for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_leads_updated_at before update on leads
  for each row execute function update_updated_at_column();

create trigger update_purchases_updated_at before update on lead_purchases
  for each row execute function update_updated_at_column();

-- Sample data insertion (for development/testing)
-- This should be removed in production

-- Insert sample leads
insert into leads (type, quality, first_name, last_name, email, phone, state, city, price, qualification_score, annual_income) values
('iul', 'premium', 'John', 'Smith', 'john.smith@email.com', '555-0101', 'TX', 'Dallas', 32.50, 85, 75000),
('mortgage_protection', 'premium', 'Sarah', 'Johnson', 'sarah.j@email.com', '555-0102', 'CA', 'Los Angeles', 29.75, 78, 95000),
('final_expense', 'standard', 'Robert', 'Williams', 'r.williams@email.com', '555-0103', 'FL', 'Miami', 24.25, 72, 45000),
('trucker_insurance', 'premium', 'Mike', 'Davis', 'mike.davis@email.com', '555-0104', 'TX', 'Houston', 35.50, 88, 85000),
('auto_insurance', 'standard', 'Lisa', 'Garcia', 'lisa.garcia@email.com', '555-0105', 'NY', 'New York', 26.00, 70, 65000);

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;
grant execute on all functions in schema public to authenticated;

-- Comments for documentation
comment on table profiles is 'User profiles with subscription and performance metrics';
comment on table leads is 'Available leads for purchase with qualification data';
comment on table lead_purchases is 'Purchased leads with interaction tracking';
comment on table subscriptions is 'Stripe subscription management';
comment on function purchase_lead is 'Handles lead purchase logic with credit management';
comment on function update_lead_interaction is 'Tracks lead interactions and outcomes';

-- End of schema