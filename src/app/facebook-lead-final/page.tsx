'use client';

import { useState } from 'react';
import { Heart, Shield, DollarSign, Clock, CheckCircle, Phone, Mail, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function FacebookLeadFinalPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    healthStatus: '',
    currentCoverage: '',
    budget: '',
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
        content_category: 'Final Expense',
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
              Your Family's Final Expenses Are Protected
            </h1>
            <p className="text-slate-300 mb-6">
              A final expense specialist will contact you within 4 hours to discuss 
              affordable coverage that protects your loved ones from funeral costs and final bills.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-300 font-medium">
                💙 Priority Service: Same-day consultation available
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
                  Don't Burden Your Family with 
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Final Expenses</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Final expense insurance covers funeral costs, medical bills, and debts so 
                  your loved ones can grieve without financial stress.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Protect Your Family's Peace of Mind
                    </h3>
                    <p className="text-slate-300">
                      Your family won't have to worry about paying for your funeral or final medical bills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Affordable Monthly Payments
                    </h3>
                    <p className="text-slate-300">
                      Most people qualify for coverage starting at just $15-30 per month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Guaranteed Acceptance
                    </h3>
                    <p className="text-slate-300">
                      Ages 45-85 are guaranteed to be accepted. No medical exam required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Coverage Starts Immediately
                    </h3>
                    <p className="text-slate-300">
                      Your policy begins the day you apply and make your first payment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emotional Hook */}
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-3">
                  💔 The Reality of Final Expenses
                </h4>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Average funeral cost: $7,000-$12,000</li>
                  <li>• Final medical bills can exceed $25,000</li>
                  <li>• Outstanding debts don't disappear when you do</li>
                  <li>• Your family may have to pay out-of-pocket</li>
                  <li>• Many families go into debt to cover these costs</li>
                </ul>
              </div>

              {/* Success Stories */}
              <div className="mt-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-3">
                  💚 Why Families Choose Final Expense Insurance
                </h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>"When Dad passed, we didn't have to worry about money during our grief. The insurance covered everything." - Sarah M.</p>
                  <p>"For $22/month, I know my kids won't be burdened with my final expenses." - Robert T.</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Why Choose Our Coverage?</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-300">✓ A+ Rated Insurance Companies</div>
                  <div className="text-slate-300">✓ Guaranteed Acceptance (45-85)</div>
                  <div className="text-slate-300">✓ No Medical Exam Required</div>
                  <div className="text-slate-300">✓ Coverage up to $50,000</div>
                  <div className="text-slate-300">✓ Premiums Never Increase</div>
                  <div className="text-slate-300">✓ Cash Value Builds Over Time</div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Final Expense Quote
                  </h2>
                  <p className="text-slate-300">
                    Find out how little it costs to protect your family from final expenses.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
                    <Users className="w-4 h-4" />
                    <span>Over 50,000 families protected</span>
                  </div>
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
                        Your Age *
                      </label>
                      <select
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Age</option>
                        <option value="45-50">45-50</option>
                        <option value="51-60">51-60</option>
                        <option value="61-70">61-70</option>
                        <option value="71-80">71-80</option>
                        <option value="81-85">81-85</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Health Status
                      </label>
                      <select
                        value={formData.healthStatus}
                        onChange={(e) => setFormData({...formData, healthStatus: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Health</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Current Life Insurance
                      </label>
                      <select
                        value={formData.currentCoverage}
                        onChange={(e) => setFormData({...formData, currentCoverage: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Coverage</option>
                        <option value="None">No Coverage</option>
                        <option value="Under $10k">Under $10k</option>
                        <option value="$10k-$25k">$10k-$25k</option>
                        <option value="Over $25k">Over $25k</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Monthly Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Budget</option>
                        <option value="Under $25">Under $25/month</option>
                        <option value="$25-$50">$25-$50/month</option>
                        <option value="$50-$75">$50-$75/month</option>
                        <option value="Over $75">Over $75/month</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      When do you want coverage to start?
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
                      'Get My Free Final Expense Quote'
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    💙 No obligation. Free quotes. Your information stays completely private.
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