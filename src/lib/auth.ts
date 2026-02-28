import { supabase } from './supabase'
import { AuthError, User } from '@supabase/supabase-js'

export interface AuthResult {
  success: boolean
  user?: User | null
  error?: string
}

export interface UserProfile {
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

// Sign up new user
export async function signUp(email: string, password: string, fullName: string, companyName?: string): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
        companyName
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Sign up failed' };
    }

    return { 
      success: true, 
      user: result.user as any,
      error: result.message
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Network error' };
  }
}

// Sign in existing user
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Sign in failed' };
    }

    // If this is demo mode, we need to handle it differently
    if (result.demo) {
      console.log('🚨 DEMO MODE: Client-side authentication bypass');
      // For demo mode, we'll simulate a successful auth
      // The AuthContext will handle the session state
      return { 
        success: true, 
        user: result.user as any,
        error: result.message
      };
    }

    // Real Supabase authentication
    if (result.session) {
      // Supabase should handle the session automatically
      return { 
        success: true, 
        user: result.user as any,
        error: result.message
      };
    }

    return { 
      success: true, 
      user: result.user as any,
      error: result.message
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Network error' };
  }
}

// Sign out user
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred during sign out' }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Get current session
export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Get user profile with extended data
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
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
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while updating profile' }
  }
}

// Reset password
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while resetting password' }
  }
}

// Get current user profile helper
export async function getCurrentUserProfile(): Promise<{ profile: UserProfile | null; error?: string }> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { profile: null, error: 'No authenticated user' }
    }

    const profile = await getUserProfile(user.id)
    return { profile }
  } catch (error) {
    return { profile: null, error: 'Failed to fetch user profile' }
  }
}

// Update password
export async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while updating password' }
  }
}

// Check if user has sufficient credits
export async function checkUserCredits(userId: string, requiredCredits: number): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile ? profile.credits >= requiredCredits : false
}

// Deduct credits from user account
export async function deductUserCredits(userId: string, creditsToDeduct: number): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current credits
    const profile = await getUserProfile(userId)
    if (!profile) {
      return { success: false, error: 'User profile not found' }
    }

    if (profile.credits < creditsToDeduct) {
      return { success: false, error: 'Insufficient credits' }
    }

    // Deduct credits
    const { error } = await supabase
      .from('users')
      .update({
        credits: profile.credits - creditsToDeduct,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while deducting credits' }
  }
}