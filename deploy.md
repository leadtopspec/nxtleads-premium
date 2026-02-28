# 🚀 Nxt Leads Deployment Guide

## Part 1: Live Website Deployment

### Option A: Vercel (Recommended - Fastest)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

2. **Deploy to Vercel**
- Go to https://vercel.com/new
- Import your GitHub repository
- Vercel will auto-detect Next.js settings
- Add environment variables in Vercel dashboard

3. **Custom Domain**
- In Vercel dashboard: Settings → Domains
- Add your domain (e.g., `nxtleads.com`)
- Update DNS records as instructed

### Option B: Manual Setup

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd premium-leads-site
vercel --prod
```

## Part 2: Production Environment Setup

### 1. Supabase Production Database

1. Go to https://supabase.com/dashboard
2. Create new project: "nxt-leads-production"
3. Run database setup:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  license_number TEXT,
  license_state TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User billing table
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

-- Billing transactions table
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

-- Lead purchases table
CREATE TABLE lead_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lead_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  package_type TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payment methods table
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
```

4. Copy connection details to production environment variables

### 2. Stripe Production Setup

1. Go to https://dashboard.stripe.com
2. Switch to live mode
3. Get production keys:
   - Publishable key (`pk_live_...`)
   - Secret key (`sk_live_...`)
4. Set up webhooks for your production domain

### 3. Discord Backend Setup

#### Create Discord Server
1. Create new Discord server: "Nxt Leads Admin"
2. Create channels:
   - `#revenue-alerts` - Real-time purchase notifications
   - `#new-users` - User registration alerts
   - `#daily-reports` - Automated daily summaries
   - `#system-alerts` - Error/warning notifications
   - `#admin-commands` - Admin controls

#### Create Webhook URLs
For each channel:
1. Channel Settings → Integrations → Webhooks
2. Create webhook, copy URL
3. Add to environment variables

## Part 3: Environment Variables

### Production `.env.local`
```bash
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe (LIVE MODE)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET

# Discord Monitoring
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK
DISCORD_ADMIN_USER_ID=YOUR_DISCORD_USER_ID

# Security
NEXTAUTH_SECRET=your_32_character_secret_key
NEXTAUTH_URL=https://nxtleads.com
ADMIN_SECRET=your_admin_api_secret

# Production
NODE_ENV=production
```

## Part 4: Domain & DNS Setup

### Custom Domain (nxtleads.com)

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Set DNS records:**
   - A record: `@` → Vercel IP
   - CNAME record: `www` → `cname.vercel-dns.com`
3. **SSL Certificate** (automatic with Vercel)

### Email Setup (Optional)
- Set up professional email: `jeremi@nxtleads.com`
- Use Gmail Workspace or similar

## Part 5: Going Live Checklist

### Before Launch
- [ ] Test all payment flows end-to-end
- [ ] Verify Discord notifications work
- [ ] Test user registration/login
- [ ] Confirm lead purchase system
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Test error handling

### Launch Day
- [ ] Update DNS records
- [ ] Monitor Discord for first users
- [ ] Watch for any errors in Vercel logs
- [ ] Test with real credit card (small amount)
- [ ] Announce to your network

### Post-Launch
- [ ] Set up daily Discord reports
- [ ] Monitor conversion rates
- [ ] Collect user feedback
- [ ] Plan feature updates

## Part 6: Monitoring & Analytics

### Discord Bot Commands (Future)
Create admin commands in Discord:
- `/stats daily` - Get daily stats
- `/top-agents` - See highest revenue agents
- `/system-health` - Check all systems
- `/revenue-report` - Generate revenue report

### Analytics to Track
- Conversion rate (signup → first purchase)
- Average order value
- Customer lifetime value
- Lead type preferences
- Peak usage hours

## Support & Maintenance

### Weekly Tasks
- Review Discord notifications
- Check conversion rates
- Monitor system performance
- Update lead inventory

### Monthly Tasks
- Analyze revenue trends
- Review top-performing agents
- Plan feature improvements
- Financial reporting

---

**Ready to launch Nxt Leads and start generating premium lead revenue! 🚀💰**