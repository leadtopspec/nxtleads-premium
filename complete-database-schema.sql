-- =============================================================================
-- NXT LEADS - COMPLETE DATABASE SCHEMA
-- Single file for easy deployment to Supabase
-- =============================================================================

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- =============================================================================
-- EXTENSIONS
-- =============================================================================

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for encryption functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- ENUMS
-- =============================================================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('agent', 'admin', 'super_admin');

-- Lead types enum  
CREATE TYPE lead_type AS ENUM ('iul', 'mortgage_protection', 'final_expense', 'trucker_insurance');

-- Lead status enum
CREATE TYPE lead_status AS ENUM ('available', 'sold', 'expired', 'invalid');

-- Transaction status enum
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Transaction type enum
CREATE TYPE transaction_type AS ENUM ('credit_purchase', 'lead_purchase', 'refund');

-- Campaign status enum
CREATE TYPE campaign_status AS ENUM ('active', 'paused', 'completed', 'draft');

-- Lead source enum
CREATE TYPE lead_source AS ENUM ('facebook', 'google', 'organic', 'referral');

-- =============================================================================
-- CORE TABLES
-- =============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'agent',
    credits INTEGER NOT NULL DEFAULT 0,
    total_spent DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_leads_purchased INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- Additional profile fields
    license_number TEXT,
    license_state TEXT,
    specialty_types lead_type[],
    preferred_lead_volume INTEGER DEFAULT 10,
    
    -- Billing information
    stripe_customer_id TEXT UNIQUE,
    billing_address JSONB,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT users_credits_check CHECK (credits >= 0),
    CONSTRAINT users_phone_check CHECK (phone IS NULL OR phone ~ '^\+?[1-9]\d{1,14}$')
);

-- Leads table
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_type lead_type NOT NULL,
    status lead_status NOT NULL DEFAULT 'available',
    
    -- Lead data
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    
    -- Address information
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    
    -- Lead specific data
    age INTEGER,
    annual_income INTEGER,
    desired_coverage INTEGER,
    current_coverage BOOLEAN DEFAULT false,
    health_conditions TEXT[],
    
    -- Lead quality metrics
    quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 100),
    verified_phone BOOLEAN DEFAULT false,
    verified_email BOOLEAN DEFAULT false,
    
    -- Pricing and availability
    price DECIMAL(8,2) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Source and campaign tracking
    source lead_source NOT NULL DEFAULT 'facebook',
    campaign_id UUID,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sold_at TIMESTAMP WITH TIME ZONE,
    
    -- Additional metadata
    metadata JSONB DEFAULT '{}',
    
    CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT leads_phone_check CHECK (phone ~ '^\+?[1-9]\d{1,14}$'),
    CONSTRAINT leads_price_check CHECK (price > 0),
    CONSTRAINT leads_age_check CHECK (age IS NULL OR (age >= 18 AND age <= 120)),
    CONSTRAINT leads_quality_score_check CHECK (quality_score IS NULL OR (quality_score >= 1 AND quality_score <= 100))
);

-- Lead purchases table
CREATE TABLE public.lead_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    
    -- Purchase details
    price_paid DECIMAL(8,2) NOT NULL,
    credits_used INTEGER NOT NULL,
    
    -- Status tracking
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    downloaded_at TIMESTAMP WITH TIME ZONE,
    
    -- Performance tracking
    contacted BOOLEAN DEFAULT false,
    contacted_at TIMESTAMP WITH TIME ZONE,
    appointment_set BOOLEAN DEFAULT false,
    appointment_at TIMESTAMP WITH TIME ZONE,
    sale_made BOOLEAN DEFAULT false,
    sale_amount DECIMAL(10,2),
    sale_date DATE,
    
    -- Feedback and ratings
    lead_quality_rating INTEGER CHECK (lead_quality_rating >= 1 AND lead_quality_rating <= 5),
    feedback TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    CONSTRAINT lead_purchases_unique UNIQUE (user_id, lead_id),
    CONSTRAINT lead_purchases_price_check CHECK (price_paid > 0),
    CONSTRAINT lead_purchases_credits_check CHECK (credits_used > 0)
);

-- Credit transactions table
CREATE TABLE public.credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Transaction details
    type transaction_type NOT NULL,
    status transaction_status NOT NULL DEFAULT 'pending',
    
    -- Amounts
    credits_amount INTEGER NOT NULL,
    dollar_amount DECIMAL(10,2) NOT NULL,
    
    -- Payment processing
    stripe_payment_intent_id TEXT,
    stripe_session_id TEXT,
    
    -- Reference data
    lead_purchase_id UUID REFERENCES public.lead_purchases(id),
    description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    CONSTRAINT credit_transactions_credits_check CHECK (credits_amount != 0),
    CONSTRAINT credit_transactions_amount_check CHECK (dollar_amount >= 0)
);

-- Campaigns table (for tracking Facebook ad campaigns)
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    lead_type lead_type NOT NULL,
    status campaign_status NOT NULL DEFAULT 'draft',
    
    -- Campaign configuration
    daily_budget DECIMAL(8,2) NOT NULL,
    target_cpa DECIMAL(8,2) NOT NULL,
    
    -- Facebook Ad Account info
    facebook_campaign_id TEXT,
    facebook_adset_id TEXT,
    facebook_ad_id TEXT,
    facebook_account_id TEXT NOT NULL,
    
    -- Targeting configuration
    target_states TEXT[],
    target_age_min INTEGER DEFAULT 25,
    target_age_max INTEGER DEFAULT 65,
    target_interests TEXT[],
    
    -- Performance tracking
    total_spend DECIMAL(10,2) DEFAULT 0,
    total_leads INTEGER DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    cost_per_lead DECIMAL(8,2),
    conversion_rate DECIMAL(5,4),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    CONSTRAINT campaigns_budget_check CHECK (daily_budget > 0),
    CONSTRAINT campaigns_cpa_check CHECK (target_cpa > 0),
    CONSTRAINT campaigns_age_check CHECK (
        target_age_min >= 18 AND 
        target_age_max <= 120 AND 
        target_age_min <= target_age_max
    )
);

-- Lead form submissions table (raw data before processing into leads)
CREATE TABLE public.lead_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Form data
    form_type lead_type NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    
    -- Address
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    
    -- Type-specific data
    age INTEGER,
    annual_income INTEGER,
    desired_coverage INTEGER,
    current_coverage BOOLEAN,
    health_conditions TEXT[],
    
    -- Tracking data
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    facebook_pixel_id TEXT,
    facebook_click_id TEXT,
    
    -- Processing status
    processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMP WITH TIME ZONE,
    lead_id UUID REFERENCES public.leads(id),
    
    -- Quality checks
    phone_verified BOOLEAN DEFAULT false,
    email_verified BOOLEAN DEFAULT false,
    duplicate_check_passed BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Raw form data backup
    raw_data JSONB DEFAULT '{}',
    
    CONSTRAINT lead_submissions_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT lead_submissions_phone_check CHECK (phone ~ '^\+?[1-9]\d{1,14}$')
);

-- Admin settings table
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Notification content
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info', -- info, success, warning, error
    
    -- Status
    read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Action links
    action_url TEXT,
    action_text TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Users indexes
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);
CREATE INDEX idx_users_active ON public.users(is_active);

-- Leads indexes
CREATE INDEX idx_leads_type ON public.leads(lead_type);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_price ON public.leads(price);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_expires_at ON public.leads(expires_at);
CREATE INDEX idx_leads_available ON public.leads(status, lead_type, expires_at) WHERE status = 'available';
CREATE INDEX idx_leads_quality_score ON public.leads(quality_score);
CREATE INDEX idx_leads_state ON public.leads(state);

-- Lead purchases indexes
CREATE INDEX idx_lead_purchases_user ON public.lead_purchases(user_id);
CREATE INDEX idx_lead_purchases_lead ON public.lead_purchases(lead_id);
CREATE INDEX idx_lead_purchases_purchased_at ON public.lead_purchases(purchased_at);
CREATE INDEX idx_lead_purchases_performance ON public.lead_purchases(contacted, appointment_set, sale_made);

-- Credit transactions indexes
CREATE INDEX idx_credit_transactions_user ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_type ON public.credit_transactions(type);
CREATE INDEX idx_credit_transactions_status ON public.credit_transactions(status);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at);

-- Lead submissions indexes
CREATE INDEX idx_lead_submissions_processed ON public.lead_submissions(processed);
CREATE INDEX idx_lead_submissions_created_at ON public.lead_submissions(created_at);
CREATE INDEX idx_lead_submissions_form_type ON public.lead_submissions(form_type);
CREATE INDEX idx_lead_submissions_email ON public.lead_submissions(email);
CREATE INDEX idx_lead_submissions_phone ON public.lead_submissions(phone);

-- Campaigns indexes
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_lead_type ON public.campaigns(lead_type);
CREATE INDEX idx_campaigns_performance ON public.campaigns(cost_per_lead, conversion_rate);

-- Notifications indexes
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, read) WHERE read = false;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Super admins can manage users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role = 'super_admin'
        )
    );

-- Leads table policies
CREATE POLICY "Agents can view available leads" ON public.leads
    FOR SELECT USING (
        status = 'available' AND 
        expires_at > NOW() AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('agent', 'admin', 'super_admin')
        )
    );

CREATE POLICY "Users can view purchased leads" ON public.leads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.lead_purchases 
            WHERE lead_id = leads.id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage leads" ON public.leads
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Lead purchases table policies
CREATE POLICY "Users can view own purchases" ON public.lead_purchases
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own purchases" ON public.lead_purchases
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own purchases" ON public.lead_purchases
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all purchases" ON public.lead_purchases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Credit transactions table policies
CREATE POLICY "Users can view own transactions" ON public.credit_transactions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own transactions" ON public.credit_transactions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all transactions" ON public.credit_transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "System can manage transactions" ON public.credit_transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role = 'super_admin'
        )
    );

-- Campaigns table policies
CREATE POLICY "Admins can manage campaigns" ON public.campaigns
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Lead submissions table policies
CREATE POLICY "System can manage submissions" ON public.lead_submissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Admin settings table policies
CREATE POLICY "Admins can manage settings" ON public.admin_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Notifications table policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at 
    BEFORE UPDATE ON public.campaigns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at 
    BEFORE UPDATE ON public.admin_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown User'),
        'agent'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user credits after transaction
CREATE OR REPLACE FUNCTION update_user_credits()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Update user credits based on transaction type
        IF NEW.type = 'credit_purchase' THEN
            UPDATE public.users 
            SET credits = credits + NEW.credits_amount
            WHERE id = NEW.user_id;
        ELSIF NEW.type = 'lead_purchase' THEN
            UPDATE public.users 
            SET credits = credits - NEW.credits_amount,
                total_spent = total_spent + NEW.dollar_amount,
                total_leads_purchased = total_leads_purchased + 1
            WHERE id = NEW.user_id;
        ELSIF NEW.type = 'refund' THEN
            UPDATE public.users 
            SET credits = credits + NEW.credits_amount
            WHERE id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for credit updates
CREATE TRIGGER on_transaction_completed
    AFTER UPDATE ON public.credit_transactions
    FOR EACH ROW EXECUTE FUNCTION update_user_credits();

-- Function to mark lead as sold when purchased
CREATE OR REPLACE FUNCTION mark_lead_sold()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.leads 
    SET status = 'sold', sold_at = NEW.purchased_at
    WHERE id = NEW.lead_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for lead sales
CREATE TRIGGER on_lead_purchased
    AFTER INSERT ON public.lead_purchases
    FOR EACH ROW EXECUTE FUNCTION mark_lead_sold();

-- Function to expire old leads
CREATE OR REPLACE FUNCTION expire_old_leads()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE public.leads 
    SET status = 'expired'
    WHERE status = 'available' 
    AND expires_at < NOW();
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- View for available leads with full details
CREATE VIEW public.available_leads AS
SELECT 
    l.*,
    CASE 
        WHEN l.quality_score >= 80 THEN 'Premium'
        WHEN l.quality_score >= 60 THEN 'Standard'
        ELSE 'Basic'
    END as quality_tier
FROM public.leads l
WHERE l.status = 'available' 
AND l.expires_at > NOW()
ORDER BY l.quality_score DESC, l.created_at DESC;

-- View for user dashboard stats
CREATE VIEW public.user_dashboard_stats AS
SELECT 
    u.id,
    u.credits,
    u.total_spent,
    u.total_leads_purchased,
    COUNT(lp.id) as total_purchases,
    COUNT(CASE WHEN lp.contacted THEN 1 END) as contacted_leads,
    COUNT(CASE WHEN lp.appointment_set THEN 1 END) as appointments_set,
    COUNT(CASE WHEN lp.sale_made THEN 1 END) as sales_made,
    AVG(lp.lead_quality_rating) as avg_lead_rating,
    SUM(lp.sale_amount) as total_sales_amount
FROM public.users u
LEFT JOIN public.lead_purchases lp ON u.id = lp.user_id
GROUP BY u.id, u.credits, u.total_spent, u.total_leads_purchased;

-- View for campaign performance
CREATE VIEW public.campaign_performance AS
SELECT 
    c.*,
    COUNT(ls.id) as total_submissions,
    COUNT(l.id) as total_leads_created,
    COUNT(lp.id) as total_leads_sold,
    AVG(l.quality_score) as avg_quality_score,
    SUM(lp.price_paid) as total_revenue
FROM public.campaigns c
LEFT JOIN public.lead_submissions ls ON c.id::text = ls.utm_campaign
LEFT JOIN public.leads l ON ls.lead_id = l.id
LEFT JOIN public.lead_purchases lp ON l.id = lp.lead_id
GROUP BY c.id;

-- =============================================================================
-- INITIAL DATA SETUP
-- =============================================================================

-- Insert default admin settings
INSERT INTO public.admin_settings (key, value, description) VALUES
('credit_pricing', '{"100": 100, "500": 475, "1000": 900, "2500": 2125, "5000": 4000}', 'Credit packages and pricing'),
('lead_pricing_multiplier', '{"iul": 1.2, "mortgage_protection": 1.0, "final_expense": 0.8, "trucker_insurance": 1.5}', 'Lead type pricing multipliers'),
('default_lead_expiry_hours', '72', 'Default hours before leads expire'),
('facebook_pixel_id', '""', 'Facebook Pixel tracking ID'),
('stripe_webhook_secret', '""', 'Stripe webhook endpoint secret'),
('email_notifications', '{"new_leads": true, "low_credits": true, "system_updates": true}', 'Email notification settings');

-- Create indexes on JSONB columns for performance
CREATE INDEX idx_users_metadata_gin ON public.users USING GIN(metadata);
CREATE INDEX idx_leads_metadata_gin ON public.leads USING GIN(metadata);
CREATE INDEX idx_lead_submissions_raw_data_gin ON public.lead_submissions USING GIN(raw_data);

-- =============================================================================
-- SAMPLE DATA (OPTIONAL - REMOVE IN PRODUCTION)
-- =============================================================================

-- Note: This sample data should be removed before production deployment
-- Uncomment only for development/testing

/*
-- Sample admin user (will be created via Supabase Auth)
-- INSERT INTO public.users (id, email, full_name, role, credits) VALUES
-- ('00000000-0000-0000-0000-000000000001', 'admin@nxtleads.com', 'System Admin', 'super_admin', 1000);

-- Sample leads
-- INSERT INTO public.leads (lead_type, first_name, last_name, email, phone, street_address, city, state, zip_code, age, annual_income, desired_coverage, price, expires_at, quality_score) VALUES
-- ('iul', 'John', 'Smith', 'john.smith@email.com', '+15551234567', '123 Main St', 'Dallas', 'TX', '75201', 35, 75000, 250000, 28.50, NOW() + INTERVAL '72 hours', 85),
-- ('mortgage_protection', 'Sarah', 'Johnson', 'sarah.johnson@email.com', '+15557654321', '456 Oak Ave', 'Austin', 'TX', '73301', 42, 90000, 350000, 24.00, NOW() + INTERVAL '72 hours', 78);
*/

-- =============================================================================
-- COMPLETION MESSAGE
-- =============================================================================

-- This schema is now ready for deployment to Supabase
-- Don't forget to:
-- 1. Update the JWT secret in the first line
-- 2. Remove sample data section before production
-- 3. Configure environment variables in your application
-- 4. Set up Stripe webhooks for payment processing
-- 5. Configure Facebook Pixel integration

SELECT 'Database schema created successfully! 🚀' as status;