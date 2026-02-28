-- Billing Migration for Existing Nxt Leads Database
-- This adds billing functionality to the existing schema

-- Add billing fields to existing users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS account_balance DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auto_refill_enabled BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auto_refill_threshold DECIMAL(10,2) DEFAULT 100.00;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auto_refill_amount DECIMAL(10,2) DEFAULT 500.00;

-- Transaction history table
CREATE TABLE IF NOT EXISTS transactions (
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

-- Enhanced lead purchases (extends existing lead_purchases)
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS package_type TEXT;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS lead_type TEXT;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2);
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10,2);
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS discount_applied DECIMAL(10,2) DEFAULT 0;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS leads_delivered INTEGER DEFAULT 0;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'pending' 
  CHECK (delivery_status IN ('pending', 'delivering', 'completed', 'failed'));
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS delivery_started_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS delivery_completed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS purchase_metadata JSONB DEFAULT '{}';
ALTER TABLE lead_purchases ADD COLUMN IF NOT EXISTS transaction_id UUID REFERENCES transactions(id);

-- Credit packages table
CREATE TABLE IF NOT EXISTS credit_packages (
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

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT NOT NULL,
  type TEXT NOT NULL,
  last4 TEXT,
  brand TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);

-- Insert default credit packages
INSERT INTO credit_packages (name, description, credit_amount, price, bonus_credits, sort_order) 
VALUES
  ('Starter Pack', 'Perfect for testing the waters', 100.00, 95.00, 5.00, 1),
  ('Growth Pack', 'Most popular for active agents', 500.00, 450.00, 50.00, 2),
  ('Professional Pack', 'For serious lead buyers', 1000.00, 850.00, 150.00, 3),
  ('Elite Pack', 'Maximum value for agencies', 2500.00, 2000.00, 500.00, 4)
ON CONFLICT (name) DO NOTHING;

-- Update existing user with sample balance (for testing)
UPDATE users 
SET account_balance = 1247.80 
WHERE email LIKE '%jeremi%' OR email LIKE '%test%'
LIMIT 1;

-- Function to update user balance from transactions
CREATE OR REPLACE FUNCTION update_user_balance_from_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
    UPDATE users 
    SET 
      account_balance = NEW.balance_after,
      total_spent = total_spent + CASE WHEN NEW.transaction_type = 'lead_purchase' THEN NEW.amount ELSE 0 END,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_balance ON transactions;
CREATE TRIGGER trigger_update_balance
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_balance_from_transaction();

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'transactions'
    AND rowsecurity = true
  ) THEN
    ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for transactions
CREATE POLICY IF NOT EXISTS "Users can view own transactions" 
  ON transactions FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY IF NOT EXISTS "Users can view own payment methods" 
  ON payment_methods FOR SELECT 
  USING (auth.uid()::text = user_id::text);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON transactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON payment_methods TO authenticated;
GRANT SELECT ON credit_packages TO authenticated;
GRANT SELECT, UPDATE ON users TO authenticated;