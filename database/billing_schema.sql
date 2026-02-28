-- Billing and Payment Tables for Nxt Leads Pro

-- User billing profiles
CREATE TABLE user_billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  account_balance DECIMAL(10,2) DEFAULT 0.00,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  total_leads_purchased INTEGER DEFAULT 0,
  auto_refill_enabled BOOLEAN DEFAULT false,
  auto_refill_threshold DECIMAL(10,2) DEFAULT 100.00,
  auto_refill_amount DECIMAL(10,2) DEFAULT 500.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transaction history
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('credit_purchase', 'lead_purchase', 'refund', 'auto_refill')),
  amount DECIMAL(10,2) NOT NULL,
  credits_added DECIMAL(10,2) DEFAULT 0,
  credits_spent DECIMAL(10,2) DEFAULT 0,
  balance_before DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead purchases (detailed tracking)
CREATE TABLE lead_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id),
  package_type TEXT NOT NULL, -- 'volume-trucker-250', 'premium-iul-single', etc.
  lead_type TEXT NOT NULL, -- 'trucker', 'final-expense', 'iul', 'mortgage-protection'
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  discount_applied DECIMAL(10,2) DEFAULT 0,
  leads_delivered INTEGER DEFAULT 0,
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'delivering', 'completed', 'failed')),
  delivery_started_at TIMESTAMP WITH TIME ZONE,
  delivery_completed_at TIMESTAMP WITH TIME ZONE,
  purchase_metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit packages available for purchase
CREATE TABLE credit_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  credit_amount DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  bonus_credits DECIMAL(10,2) DEFAULT 0,
  stripe_price_id TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods (stored references to Stripe)
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT NOT NULL,
  type TEXT NOT NULL, -- 'card', 'ach', etc.
  last4 TEXT,
  brand TEXT, -- 'visa', 'mastercard', etc.
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions (if we add subscription features later)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_price DECIMAL(10,2) NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_billing_user_id ON user_billing(user_id);
CREATE INDEX idx_user_billing_stripe_customer ON user_billing(stripe_customer_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_lead_purchases_user_id ON lead_purchases(user_id);
CREATE INDEX idx_lead_purchases_created_at ON lead_purchases(created_at DESC);
CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Insert default credit packages
INSERT INTO credit_packages (name, description, credit_amount, price, bonus_credits, sort_order) VALUES
  ('Starter Pack', 'Perfect for testing the waters', 100.00, 95.00, 5.00, 1),
  ('Growth Pack', 'Most popular for active agents', 500.00, 450.00, 50.00, 2),
  ('Professional Pack', 'For serious lead buyers', 1000.00, 850.00, 150.00, 3),
  ('Elite Pack', 'Maximum value for agencies', 2500.00, 2000.00, 500.00, 4);

-- Sample user billing setup (for testing)
INSERT INTO user_billing (user_id, account_balance, total_spent, total_leads_purchased)
SELECT id, 1247.80, 3842.20, 287 
FROM users 
WHERE email = 'jeremi@example.com' 
LIMIT 1;

-- Function to update user balance
CREATE OR REPLACE FUNCTION update_user_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
    UPDATE user_billing 
    SET 
      account_balance = NEW.balance_after,
      total_spent = total_spent + CASE WHEN NEW.transaction_type = 'lead_purchase' THEN NEW.amount ELSE 0 END,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update balances
CREATE TRIGGER trigger_update_user_balance
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_balance();

-- RLS policies (if using RLS)
ALTER TABLE user_billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for user data access
CREATE POLICY "Users can view own billing" ON user_billing FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own billing" ON user_billing FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own lead purchases" ON lead_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own payment methods" ON payment_methods FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own payment methods" ON payment_methods FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);