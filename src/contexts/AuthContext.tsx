'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { getUserProfile, UserProfile } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  demoMode: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  setDemoUser: (user: any) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  demoMode: false,
  signOut: async () => {},
  refreshProfile: async () => {},
  setDemoUser: () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [demoMode, setDemoMode] = useState(false)

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await getUserProfile(userId)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error loading user profile:', error)
      setProfile(null)
    }
  }

  // Refresh profile data
  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  // Set demo user (for demo mode)
  const setDemoUser = (demoUser: any) => {
    console.log('🚨 Setting demo user:', demoUser.email)
    setDemoMode(true)
    setUser(demoUser as User)
    setProfile({
      id: demoUser.id,
      email: demoUser.email,
      full_name: demoUser.fullName,
      company_name: demoUser.companyName,
      phone: demoUser.phone,
      role: demoUser.role,
      credits: demoUser.credits,
      total_spent: 0,
      total_leads_purchased: 0,
      is_active: demoUser.isActive,
      email_verified: demoUser.emailVerified,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login_at: demoUser.lastLogin,
      license_number: demoUser.licenseNumber,
      license_state: demoUser.licenseState
    })
    setLoading(false)
  }

  // Sign out function
  const handleSignOut = async () => {
    try {
      if (demoMode) {
        // Demo mode sign out
        console.log('🚨 Demo mode sign out')
        setUser(null)
        setProfile(null)
        setDemoMode(false)
        return
      }

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } }: any = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } }: any = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Show loading spinner during initial load
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    )
  }

  const value = {
    user,
    profile,
    loading,
    demoMode,
    signOut: handleSignOut,
    refreshProfile,
    setDemoUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}