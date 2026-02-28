# 🔥 MAKE NXT LEADS REAL - Production Setup

## Step 1: Real Database Setup (15 minutes)

### Create Production Supabase Project
1. Go to https://supabase.com/dashboard/new
2. Create project: "nxt-leads-production" 
3. Wait for setup to complete
4. Go to Settings → API → Copy these keys:
   - Project URL
   - anon/public key  
   - service_role/secret key

### Run This SQL in Supabase SQL Editor:
```sql
-- Users table (REAL)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  license_number TEXT,
  license_state TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User billing (REAL MONEY)
CREATE TABLE user_billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  account_balance DECIMAL(10,2) DEFAULT 0.00,
  auto_reload_enabled BOOLEAN DEFAULT false,
  auto_reload_amount DECIMAL(10,2) DEFAULT 500.00,
  auto_reload_trigger DECIMAL(10,2) DEFAULT 50.00,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Real transactions table
CREATE TABLE billing_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- 'deposit', 'purchase', 'refund'
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lead purchases (REAL BUSINESS)
CREATE TABLE lead_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lead_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  package_type TEXT,
  leads_data JSONB, -- Actual lead contact info
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payment methods (REAL CARDS)
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT NOT NULL,
  card_brand TEXT,
  card_last4 TEXT,
  card_exp_month INTEGER,
  card_exp_year INTEGER,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only see their own data)
CREATE POLICY "Users can view own profile" ON users FOR ALL USING (id = auth.uid());
CREATE POLICY "Users can view own billing" ON user_billing FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can view own transactions" ON billing_transactions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can view own purchases" ON lead_purchases FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can view own payment methods" ON payment_methods FOR ALL USING (user_id = auth.uid());
```

## Step 2: Real Stripe Account (Live Payments)

### Get Live Stripe Keys
1. Go to https://dashboard.stripe.com
2. Click "Activate Live Payments" 
3. Complete business verification
4. Switch to LIVE mode (toggle in top left)
5. Get LIVE keys from Developers → API keys:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### Set Up Webhooks
1. Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
3. Listen for: `payment_intent.succeeded`, `customer.subscription.created`
4. Copy webhook secret: `whsec_...`

## Step 3: Real Domain & Hosting

### Buy Domain
1. Go to Namecheap/GoDaddy
2. Buy: `nxtleads.com` (or your choice)
3. Set nameservers to Vercel

### Deploy to Vercel
1. Push code to GitHub
2. Connect Vercel to GitHub repo
3. Add environment variables in Vercel dashboard
4. Deploy to production

## Step 4: Discord Admin Backend

### Create Admin Discord Server
```
Server Name: "Nxt Leads Command Center"

Channels:
💰 #revenue-alerts    (Every sale notification)
👤 #new-customers    (User registrations)
📊 #daily-reports    (Automated summaries)  
🚨 #urgent-alerts    (High-value activity)
⚙️ #system-status    (Errors/warnings)
```

### Get Webhook URLs
For each channel: Settings → Integrations → Webhooks → Create
Copy webhook URL for environment variables

## Step 5: Environment Variables (LIVE)

Create `.env.local` with REAL values:
```bash
# PRODUCTION DATABASE
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_real_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_real_service_key

# LIVE STRIPE (REAL MONEY)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_REAL_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_REAL_SECRET  
STRIPE_WEBHOOK_SECRET=whsec_YOUR_REAL_WEBHOOK

# DISCORD NOTIFICATIONS
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK
DISCORD_ADMIN_USER_ID=YOUR_DISCORD_ID

# SECURITY
NEXTAUTH_SECRET=generate_32_char_random_string
NEXTAUTH_URL=https://nxtleads.com
ADMIN_SECRET=your_admin_api_secret

# PRODUCTION MODE
NODE_ENV=production
```

## Step 6: Remove Demo Mode

Update these files to remove demo behavior:
- `src/app/api/auth/signup/route.ts` - Connect to real Supabase
- `src/app/api/auth/signin/route.ts` - Real authentication  
- `src/app/api/billing/*` - Real Stripe integration
- Remove all demo data, sample users, fake transactions

## Step 7: Go Live Checklist

### Before Launch
- [ ] Test real user registration
- [ ] Test real payment processing ($1 test)
- [ ] Verify Discord notifications work
- [ ] Test mobile responsiveness
- [ ] SSL certificate active
- [ ] Domain pointing correctly

### Launch Sequence
1. **Soft launch**: Test with 1-2 real agents
2. **Beta launch**: Invite 10-20 insurance agents  
3. **Full launch**: Public marketing + advertising
4. **Scale**: Facebook ads at $20K+/day

### Success Metrics
- Real user registrations
- Actual money in Stripe dashboard
- Live Discord notifications
- Conversion rate tracking