'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to demo page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/demo');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Nxt Leads!
          </h1>
          <p className="text-slate-400 mb-8">
            Your account has been created successfully. You're now part of our elite agent network.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-left">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-slate-300">Access to premium verified leads</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-slate-300">15% average close rates</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-slate-300">Real-time lead delivery</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => router.push('/demo')}
            className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-900 font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            Continue to Marketplace
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-slate-500 text-sm mt-4">
            Redirecting automatically in 3 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}