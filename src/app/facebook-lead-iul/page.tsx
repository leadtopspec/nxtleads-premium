'use client';

import { useState } from 'react';
import { Shield, DollarSign, Users, Clock, CheckCircle, Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function FacebookLeadIULPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    annualIncome: '',
    currentCoverage: '',
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
        content_category: 'IUL Insurance',
        value: 29.99,
        currency: 'USD'
      });
    }

    // Simulate form submission (replace with actual API call)
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
              Thank You! Your Information Has Been Received
            </h1>
            <p className="text-slate-300 mb-6">
              A licensed insurance professional will contact you within 24 hours to discuss your 
              Indexed Universal Life insurance options and provide a personalized quote.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-300 font-medium">
                🎯 Expected Call Time: Within 2-4 hours (business days)
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
                  Protect Your Family's Future with 
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> IUL Insurance</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Get life insurance that grows with market gains but never loses value. 
                  Secure your family's financial future today.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Guaranteed Death Benefit
                    </h3>
                    <p className="text-slate-300">
                      Your family receives the full death benefit regardless of market performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Tax-Free Growth Potential
                    </h3>
                    <p className="text-slate-300">
                      Build cash value that grows with market upside but is protected from downside losses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Flexible Premiums
                    </h3>
                    <p className="text-slate-300">
                      Adjust your premium payments based on your changing financial situation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Living Benefits
                    </h3>
                    <p className="text-slate-300">
                      Access cash value while you're alive for retirement, emergencies, or opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-300">
                    ✓ A+ Rated Insurance Companies
                  </div>
                  <div className="text-slate-300">
                    ✓ Licensed Professionals
                  </div>
                  <div className="text-slate-300">
                    ✓ Free Quotes & Consultation
                  </div>
                  <div className="text-slate-300">
                    ✓ No Obligation Service
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your Free IUL Quote
                  </h2>
                  <p className="text-slate-300">
                    Complete the form below and a licensed agent will contact you with personalized options.
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
                        Age *
                      </label>
                      <select
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Age</option>
                        <option value="18-25">18-25</option>
                        <option value="26-35">26-35</option>
                        <option value="36-45">36-45</option>
                        <option value="46-55">46-55</option>
                        <option value="56-65">56-65</option>
                        <option value="65+">65+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Annual Income *
                      </label>
                      <select
                        required
                        value={formData.annualIncome}
                        onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Income</option>
                        <option value="Under $50k">Under $50k</option>
                        <option value="$50k-$75k">$50k-$75k</option>
                        <option value="$75k-$100k">$75k-$100k</option>
                        <option value="$100k-$150k">$100k-$150k</option>
                        <option value="Over $150k">Over $150k</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Current Life Insurance Coverage
                    </label>
                    <select
                      value={formData.currentCoverage}
                      onChange={(e) => setFormData({...formData, currentCoverage: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    >
                      <option value="">Select Coverage</option>
                      <option value="None">No Coverage</option>
                      <option value="Under $100k">Under $100k</option>
                      <option value="$100k-$250k">$100k-$250k</option>
                      <option value="$250k-$500k">$250k-$500k</option>
                      <option value="Over $500k">Over $500k</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      When would you like to purchase?
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <select
                        value={formData.timeframe}
                        onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Timeframe</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 30 days">Within 30 days</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
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
                      By checking this box and submitting this form, I consent to receive marketing calls and texts 
                      at the phone number provided. I understand that consent is not required to purchase goods or services. 
                      Message and data rates may apply. I can opt out at any time by replying STOP.
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
                        Processing...
                      </div>
                    ) : (
                      'Get My Free IUL Quote'
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    Your information is secure and will never be sold to third parties.
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