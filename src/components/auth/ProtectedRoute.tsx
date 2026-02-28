'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getCurrentUserProfile } from '@/lib/auth';
import type { UserProfile } from '@/lib/auth';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireSubscription?: boolean;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [],
  requireSubscription = false,
  fallbackPath = '/auth/signin'
}: ProtectedRouteProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      checkAuthorization(session);
    });

    // Listen for auth changes
    const { data: { subscription } }: any = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        setSession(session);
        await checkAuthorization(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthorization = async (session: Session | null) => {
    if (!session) {
      setLoading(false);
      setAuthorized(false);
      router.push(fallbackPath);
      return;
    }

    try {
      // Get user profile
      const { profile, error } = await getCurrentUserProfile();
      
      if (error || !profile) {
        setLoading(false);
        setAuthorized(false);
        router.push(fallbackPath);
        return;
      }

      setProfile(profile);

      // Check role authorization
      if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
        setLoading(false);
        setAuthorized(false);
        router.push('/unauthorized');
        return;
      }

      // Check if user is active
      if (!profile.is_active) {
        setLoading(false);
        setAuthorized(false);
        router.push('/account-suspended');
        return;
      }

      setAuthorized(true);
      setLoading(false);
    } catch (error) {
      console.error('Authorization check failed:', error);
      setLoading(false);
      setAuthorized(false);
      router.push(fallbackPath);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null; // Router will handle redirect
  }

  return <>{children}</>;
}

// Hook to use auth context in components
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      if (session) {
        loadProfile();
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } }: any = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        setSession(session);
        if (session) {
          await loadProfile();
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async () => {
    try {
      const { profile } = await getCurrentUserProfile();
      setProfile(profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    profile,
    loading,
    isAuthenticated: !!session,
    isAdmin: profile?.role === 'admin' || profile?.role === 'super_admin',
    credits_remaining: profile?.credits || 0,
    refreshProfile: loadProfile
  };
}