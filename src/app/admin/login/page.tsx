'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    adminKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (result.success) {
        // Store admin session
        localStorage.setItem('nxt-admin-token', result.token);
        localStorage.setItem('nxt-admin-user', JSON.stringify(result.admin));
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">Nxt Leads Management System</p>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-2">Admin Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                placeholder="admin@nxtleads.com"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Admin Key</label>
              <input
                type="password"
                value={credentials.adminKey}
                onChange={(e) => setCredentials(prev => ({ ...prev, adminKey: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                placeholder="Admin access key"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="text-center">
              <p className="text-slate-500 text-sm">
                Authorized personnel only. All access is logged.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs">
            🔒 Secure admin access • All sessions are monitored
          </p>
        </div>
      </div>
    </div>
  );
}