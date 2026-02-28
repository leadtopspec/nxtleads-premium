import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key'

// During build or when env vars are missing, use mock values to prevent errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          company_name?: string
          phone?: string
          role: 'agent' | 'admin' | 'super_admin'
          credits: number
          total_spent: number
          total_leads_purchased: number
          is_active: boolean
          email_verified: boolean
          created_at: string
          updated_at: string
          last_login_at?: string
          license_number?: string
          license_state?: string
          specialty_types?: string[]
          preferred_lead_volume?: number
          stripe_customer_id?: string
          billing_address?: any
          metadata?: any
        }
        Insert: {
          id: string
          email: string
          full_name: string
          company_name?: string
          phone?: string
          role?: 'agent' | 'admin' | 'super_admin'
          credits?: number
          total_spent?: number
          total_leads_purchased?: number
          is_active?: boolean
          email_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string
          license_number?: string
          license_state?: string
          specialty_types?: string[]
          preferred_lead_volume?: number
          stripe_customer_id?: string
          billing_address?: any
          metadata?: any
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company_name?: string
          phone?: string
          role?: 'agent' | 'admin' | 'super_admin'
          credits?: number
          total_spent?: number
          total_leads_purchased?: number
          is_active?: boolean
          email_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string
          license_number?: string
          license_state?: string
          specialty_types?: string[]
          preferred_lead_volume?: number
          stripe_customer_id?: string
          billing_address?: any
          metadata?: any
        }
      }
      leads: {
        Row: {
          id: string
          lead_type: 'iul' | 'mortgage_protection' | 'final_expense' | 'trucker_insurance'
          status: 'available' | 'sold' | 'expired' | 'invalid'
          first_name: string
          last_name: string
          email: string
          phone: string
          street_address: string
          city: string
          state: string
          zip_code: string
          age?: number
          annual_income?: number
          desired_coverage?: number
          current_coverage?: boolean
          health_conditions?: string[]
          quality_score?: number
          verified_phone: boolean
          verified_email: boolean
          price: number
          expires_at: string
          source: 'facebook' | 'google' | 'organic' | 'referral'
          campaign_id?: string
          utm_source?: string
          utm_medium?: string
          utm_campaign?: string
          created_at: string
          sold_at?: string
          metadata?: any
        }
      }
      lead_purchases: {
        Row: {
          id: string
          user_id: string
          lead_id: string
          price_paid: number
          credits_used: number
          purchased_at: string
          downloaded_at?: string
          contacted: boolean
          contacted_at?: string
          appointment_set: boolean
          appointment_at?: string
          sale_made: boolean
          sale_amount?: number
          sale_date?: string
          lead_quality_rating?: number
          feedback?: string
          metadata?: any
        }
      }
      credit_transactions: {
        Row: {
          id: string
          user_id: string
          type: 'credit_purchase' | 'lead_purchase' | 'refund'
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          credits_amount: number
          dollar_amount: number
          stripe_payment_intent_id?: string
          stripe_session_id?: string
          lead_purchase_id?: string
          description?: string
          created_at: string
          completed_at?: string
          metadata?: any
        }
      }
    }
  }
}

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Helper function to get available leads
export async function getAvailableLeads(leadType?: string, limit = 50) {
  let query = supabase
    .from('leads')
    .select('*')
    .eq('status', 'available')
    .gte('expires_at', new Date().toISOString())
    .order('quality_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (leadType) {
    query = query.eq('lead_type', leadType)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }
  
  return data || []
}

// Helper function to purchase a lead
export async function purchaseLead(userId: string, leadId: string, creditsToUse: number, priceToPay: number) {
  const { data, error } = await supabase
    .from('lead_purchases')
    .insert({
      user_id: userId,
      lead_id: leadId,
      credits_used: creditsToUse,
      price_paid: priceToPay
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error purchasing lead:', error)
    return null
  }
  
  return data
}

// Helper function to get user's purchased leads
export async function getUserPurchases(userId: string) {
  const { data, error } = await supabase
    .from('lead_purchases')
    .select(`
      *,
      leads (*)
    `)
    .eq('user_id', userId)
    .order('purchased_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user purchases:', error)
    return []
  }
  
  return data || []
}