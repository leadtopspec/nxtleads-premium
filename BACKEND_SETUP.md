# Nxt Leads Backend Setup Guide

## 🎯 Quick Setup (15 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization: "Nxt Leads"
4. Create project: "nxt-leads-production"
5. Choose region: "US East" (closest to your location)
6. Generate strong password and save it

### Step 2: Get API Keys
After project creation (takes 2-3 minutes):
1. Go to Settings → API
2. Copy these values:
   - `Project URL` 
   - `anon/public` key
   - `service_role/secret` key (click reveal)

### Step 3: Add Environment Variables
Create `/premium-leads-site/.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Discord Notifications (Optional)
DISCORD_WEBHOOK_URL=your_discord_webhook_url

# Stripe Configuration (For Payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 4: Set Up Database Schema
Run this SQL in Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'agent' CHECK (role IN ('agent', 'admin', 'super_admin')),
    credits INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    total_leads_purchased INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    license_number VARCHAR(100),
    license_state VARCHAR(10),
    specialty_types TEXT[],
    preferred_lead_volume INTEGER,
    stripe_customer_id VARCHAR(255),
    billing_address JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Create Applications Table
CREATE TABLE agent_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    license_number VARCHAR(100) NOT NULL,
    license_state VARCHAR(10) NOT NULL,
    current_imo VARCHAR(255) NOT NULL,
    years_experience VARCHAR(50) NOT NULL,
    monthly_revenue VARCHAR(50) NOT NULL,
    monthly_lead_volume VARCHAR(50) NOT NULL,
    current_lead_sources TEXT,
    biggest_challenge TEXT NOT NULL,
    why_premium_leads TEXT NOT NULL,
    specialties TEXT[] NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected', 'needs_more_info')),
    qualification_score INTEGER DEFAULT 0,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    approval_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Waitlist Table
CREATE TABLE waitlist_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    current_experience VARCHAR(50) NOT NULL,
    current_revenue VARCHAR(50) NOT NULL,
    goal_revenue VARCHAR(50),
    timeline VARCHAR(50),
    lead_budget VARCHAR(50),
    motivation TEXT NOT NULL,
    notification_preferences JSONB DEFAULT '{"email": true, "sms": false}',
    position INTEGER,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'promoted', 'inactive')),
    qualification_score DECIMAL(3,1) DEFAULT 0,
    estimated_promotion_date TIMESTAMP WITH TIME ZONE,
    notifications_sent INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contact Messages Table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    lead_type VARCHAR(100),
    message TEXT NOT NULL,
    source VARCHAR(100) DEFAULT 'contact_page',
    priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
    assigned_to UUID REFERENCES users(id),
    response_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_type VARCHAR(50) NOT NULL CHECK (lead_type IN ('iul', 'mortgage_protection', 'final_expense', 'trucker_insurance', 'annuity')),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'expired', 'invalid')),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    street_address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(10),
    zip_code VARCHAR(20),
    age INTEGER,
    annual_income INTEGER,
    desired_coverage INTEGER,
    current_coverage BOOLEAN DEFAULT false,
    health_conditions TEXT[],
    quality_score INTEGER DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
    verified_phone BOOLEAN DEFAULT false,
    verified_email BOOLEAN DEFAULT false,
    price DECIMAL(6,2) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(100) DEFAULT 'facebook',
    campaign_id VARCHAR(255),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    sold_at TIMESTAMP WITH TIME ZONE,
    sold_to UUID REFERENCES users(id),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Lead Purchases Table
CREATE TABLE lead_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    lead_id UUID NOT NULL REFERENCES leads(id),
    price_paid DECIMAL(6,2) NOT NULL,
    credits_used INTEGER DEFAULT 0,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    downloaded_at TIMESTAMP WITH TIME ZONE,
    contacted BOOLEAN DEFAULT false,
    contacted_at TIMESTAMP WITH TIME ZONE,
    appointment_set BOOLEAN DEFAULT false,
    appointment_at TIMESTAMP WITH TIME ZONE,
    sale_made BOOLEAN DEFAULT false,
    sale_amount DECIMAL(10,2),
    sale_date TIMESTAMP WITH TIME ZONE,
    lead_quality_rating INTEGER CHECK (lead_quality_rating >= 1 AND lead_quality_rating <= 5),
    feedback TEXT,
    metadata JSONB
);

-- Create Credit Transactions Table
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL CHECK (type IN ('credit_purchase', 'lead_purchase', 'refund', 'bonus', 'adjustment')),
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    credits_amount INTEGER NOT NULL,
    dollar_amount DECIMAL(10,2) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_session_id VARCHAR(255),
    lead_purchase_id UUID REFERENCES lead_purchases(id),
    description TEXT,
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create Billing Accounts Table (for direct payment system)
CREATE TABLE billing_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
    default_payment_method_id VARCHAR(255),
    billing_email VARCHAR(255),
    auto_reload_enabled BOOLEAN DEFAULT false,
    auto_reload_amount DECIMAL(8,2) DEFAULT 100.00,
    auto_reload_threshold DECIMAL(8,2) DEFAULT 25.00,
    current_balance DECIMAL(10,2) DEFAULT 0.00,
    total_spent_lifetime DECIMAL(12,2) DEFAULT 0.00,
    billing_address JSONB,
    tax_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Payment Transactions Table
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    billing_account_id UUID NOT NULL REFERENCES billing_accounts(id),
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled', 'refunded')),
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('payment', 'refund', 'auto_reload', 'manual_reload')),
    description TEXT,
    metadata JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_applications_status ON agent_applications(status);
CREATE INDEX idx_applications_created_at ON agent_applications(created_at);
CREATE INDEX idx_waitlist_status ON waitlist_members(status);
CREATE INDEX idx_waitlist_position ON waitlist_members(position);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_priority ON contact_messages(priority);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_type ON leads(lead_type);
CREATE INDEX idx_leads_expires_at ON leads(expires_at);
CREATE INDEX idx_lead_purchases_user_id ON lead_purchases(user_id);
CREATE INDEX idx_lead_purchases_purchased_at ON lead_purchases(purchased_at);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_billing_accounts_user_id ON billing_accounts(user_id);
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (you can make these more restrictive later)
-- Allow public read access to leads that are available
CREATE POLICY "Public can view available leads" ON leads
    FOR SELECT USING (status = 'available' AND expires_at > NOW());

-- Allow authenticated users to view their own data
CREATE POLICY "Users can view own data" ON users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own purchases" ON lead_purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON credit_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own billing" ON billing_accounts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON payment_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Allow insert for applications and contact forms (public access)
CREATE POLICY "Anyone can submit applications" ON agent_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can join waitlist" ON waitlist_members
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can send contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Allow admins to view everything (add your admin user IDs)
CREATE POLICY "Admins can view all data" ON users
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can manage applications" ON agent_applications
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can manage waitlist" ON waitlist_members
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can manage contacts" ON contact_messages
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role IN ('admin', 'super_admin')
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON agent_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billing_updated_at BEFORE UPDATE ON billing_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 5: Test Database Connection

After running the SQL schema, test the connection:

```bash
cd premium-leads-site
npm run dev
```

Visit: http://localhost:3001/contact

Fill out and submit the contact form - you should see the data in your Supabase dashboard under "Table Editor".

### Step 6: Enable Real Backend Routes

Restore the backend API routes we temporarily disabled:

```bash
mv disabled-routes/billing src/app/api/
mv disabled-routes/webhooks src/app/api/
mv disabled-routes/populate-leads src/app/api/
mv disabled-routes/setup-demo src/app/api/
mv disabled-routes/test-db src/app/api/
```

### Step 7: Set Up Discord Notifications (Optional)

1. Create Discord server for business notifications
2. Create webhook in channel settings
3. Add webhook URL to `.env.local`
4. Test: http://localhost:3001/api/test-discord

### Step 8: Set Up Stripe (For Payments)

1. Create Stripe account at stripe.com
2. Get API keys from Dashboard → Developers → API keys
3. Add to `.env.local`
4. Configure webhooks endpoint: `your-domain.com/api/webhooks/stripe`

## 🎯 Production Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] Environment variables added
- [ ] Database schema created
- [ ] Contact form submits data
- [ ] Application form works
- [ ] Waitlist form works
- [ ] Discord notifications work
- [ ] Site deployed to production

## 🚨 Important Security Notes

1. **Never commit `.env.local`** to git
2. **Use Row Level Security** for all tables
3. **Validate all inputs** on both client and server
4. **Use HTTPS only** in production
5. **Regularly rotate API keys**

## 📞 Support

If you run into issues:
1. Check Supabase logs in dashboard
2. Check browser console for errors
3. Check Next.js terminal for API errors
4. Test individual API endpoints with Postman