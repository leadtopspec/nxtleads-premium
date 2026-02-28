'use client';

import { useState } from 'react';
import { Home, Shield, DollarSign, Clock, CheckCircle, Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function FacebookLeadMortgagePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    homeValue: '',
    mortgageBalance: '',
    age: '',
    dependents: '',
    timeframe: '',
    tcpaConsent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Track conversion with Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_category: 'Mortgage Protection',
        value: 29.99,
        currency: 'USD'
      });
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Your Family's Home is Now Protected!
            </h1>
            <p className="text-slate-300 mb-6">
              A mortgage protection specialist will contact you within 24 hours to discuss 
              how to secure your family's home with affordable life insurance coverage.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-300 font-medium">
                🏠 Priority Contact: Same-day callback guaranteed
              </p>
            </div>
            <Link 
              href="/" 
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-semibold py-3 px-8 rounded-lg hover:from-gold-300 hover:to-gold-500 transition-all duration-200"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900">
      {/* Header */}
      <div className="bg-navy-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Nxt Leads
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Benefits */}
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Protect Your Family's 
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Home</span>
                </h1>
                <p className="text-xl text-slate-300">
                  If something happens to you, mortgage protection insurance ensures 
                  your family can stay in their home. Get covered today.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Home className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Keep Your Home
                    </h3>
                    <p className="text-slate-300">
                      Your family won't have to worry about losing their home if you're no longer there to make payments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Complete Peace of Mind
                    </h3>
                    <p className="text-slate-300">
                      Sleep better knowing your mortgage will be paid off automatically if something happens to you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Affordable Protection
                    </h3>
                    <p className="text-slate-300">
                      Coverage typically costs less than $50/month for most homeowners.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Quick & Easy Application
                    </h3>
                    <p className="text-slate-300">
                      Most homeowners can get approved in minutes with no medical exam required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emotional Hook */}
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-3">
                  ⚠️ What Happens Without Mortgage Protection?
                </h4>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Your family could lose their home within 6 months</li>
                  <li>• Surviving spouse struggles with full mortgage payments</li>
                  <li>• Children may have to change schools and lose friends</li>
                  <li>• Family savings get depleted trying to keep the house</li>
                </ul>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Why Choose Our Coverage?</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-300">✓ A+ Rated Insurance Companies</div>
                  <div className="text-slate-300">✓ No Medical Exam Required</div>
                  <div className="text-slate-300">✓ Coverage up to $500k</div>
                  <div className="text-slate-300">✓ Instant Quotes Available</div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Quote in 60 Seconds
                  </h2>
                  <p className="text-slate-300">
                    See how little it costs to protect your family's home.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Home Value *
                      </label>
                      <select
                        required
                        value={formData.homeValue}
                        onChange={(e) => setFormData({...formData, homeValue: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Value</option>
                        <option value="Under $200k">Under $200k</option>
                        <option value="$200k-$300k">$200k-$300k</option>
                        <option value="$300k-$500k">$300k-$500k</option>
                        <option value="$500k-$750k">$500k-$750k</option>
                        <option value="Over $750k">Over $750k</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Mortgage Balance *
                      </label>
                      <select
                        required
                        value={formData.mortgageBalance}
                        onChange={(e) => setFormData({...formData, mortgageBalance: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Balance</option>
                        <option value="Under $100k">Under $100k</option>
                        <option value="$100k-$200k">$100k-$200k</option>
                        <option value="$200k-$350k">$200k-$350k</option>
                        <option value="$350k-$500k">$350k-$500k</option>
                        <option value="Over $500k">Over $500k</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Your Age *
                      </label>
                      <select
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Age</option>
                        <option value="25-35">25-35</option>
                        <option value="36-45">36-45</option>
                        <option value="46-55">46-55</option>
                        <option value="56-65">56-65</option>
                        <option value="65+">65+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Dependents at Home
                      </label>
                      <select
                        value={formData.dependents}
                        onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select</option>
                        <option value="None">None</option>
                        <option value="1-2">1-2 Children</option>
                        <option value="3+">3+ Children</option>
                        <option value="Spouse Only">Spouse Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      When do you need coverage?
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <select
                        value={formData.timeframe}
                        onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Timeframe</option>
                        <option value="Immediately">As soon as possible</option>
                        <option value="Within 30 days">Within 30 days</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="Just researching">Just researching</option>
                      </select>
                    </div>
                  </div>

                  {/* TCPA Compliance */}
                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <input
                      type="checkbox"
                      required
                      id="tcpaConsent"
                      checked={formData.tcpaConsent}
                      onChange={(e) => setFormData({...formData, tcpaConsent: e.target.checked})}
                      className="mt-0.5 w-4 h-4 text-gold-400 bg-transparent border border-white/30 rounded focus:ring-gold-400"
                    />
                    <label htmlFor="tcpaConsent" className="text-xs text-slate-300 leading-tight">
                      By submitting this form, I consent to receive marketing calls and texts at the phone number provided. 
                      I understand this consent is not required to purchase goods or services. Message and data rates may apply. 
                      Reply STOP to opt out.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-bold py-4 px-6 rounded-lg hover:from-gold-300 hover:to-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                        Getting Your Quote...
                      </div>
                    ) : (
                      'Protect My Family\'s Home'
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    💯 No obligation. Free quotes. Your information stays private.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}