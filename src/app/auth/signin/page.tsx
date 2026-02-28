'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const { setDemoUser, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Make the API call directly to get the demo flag
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        if (result.demo) {
          // Handle demo mode by setting the demo user in context
          console.log('🚨 Demo mode detected, setting demo user')
          setDemoUser(result.user)
          
          // Give the context a moment to update, then redirect
          setTimeout(() => {
            router.push('/dashboard')
          }, 100)
        } else {
          // Real authentication - Supabase should handle this automatically
          router.push('/dashboard')
        }
      } else {
        setError(result.error || 'Sign in failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-amber-400 transition-colors">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Nxt Leads
          </span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-slate-400">
              Sign in to your premium lead dashboard
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            {error && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits Reminder */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-4">Join the premium agents earning 15% close rates</p>
            <div className="flex justify-center gap-6 text-xs text-slate-500">
              <span>✓ $25-30 Premium Leads</span>
              <span>✓ Verified Contact Data</span>
              <span>✓ Real-Time Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}