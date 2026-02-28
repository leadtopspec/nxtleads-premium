'use client';

import { useState } from 'react';
import { Truck, Shield, DollarSign, Clock, CheckCircle, Phone, Mail, Calendar, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function FacebookLeadTruckerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    truckerType: '',
    yearsExperience: '',
    currentCoverage: '',
    coverageAmount: '',
    age: '',
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
        content_category: 'Trucker Insurance',
        value: 45.00,
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
              Your Trucking Career is Protected!
            </h1>
            <p className="text-slate-300 mb-6">
              A commercial insurance specialist will contact you within 2 hours to discuss 
              comprehensive life insurance coverage specifically designed for professional drivers.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-300 font-medium">
                🚛 Priority Service: Same-day consultation for active drivers
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
                  Professional Life Insurance for 
                  <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"> Truck Drivers</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Protect your family's financial future with life insurance designed 
                  specifically for the unique risks and needs of professional drivers.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Trucker-Specific Coverage
                    </h3>
                    <p className="text-slate-300">
                      Insurance designed for professional drivers who understand the unique risks of the road.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      High Coverage Amounts
                    </h3>
                    <p className="text-slate-300">
                      Coverage up to $1 million to match your earning potential and protect your family's lifestyle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Competitive Rates
                    </h3>
                    <p className="text-slate-300">
                      Special rates for experienced drivers with clean records. Many pay less than $100/month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Quick Approval Process
                    </h3>
                    <p className="text-slate-300">
                      Get approved fast with simplified underwriting. Many drivers get coverage within 48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Awareness */}
              <div className="mt-8 p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  The Reality for Professional Drivers
                </h4>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Truck drivers are 10x more likely to be in a fatal accident</li>
                  <li>• Average trucker income: $75,000+ per year</li>
                  <li>• Without insurance, families lose this income immediately</li>
                  <li>• Medical costs from accidents can exceed $500,000</li>
                  <li>• Most families can't maintain their lifestyle without the driver's income</li>
                </ul>
              </div>

              {/* Success Stories */}
              <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-3">
                  🚛 Real Driver Stories
                </h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>"When I was in an accident, my family didn't worry about money. The insurance covered everything and then some." - Mike R., OTR Driver</p>
                  <p>"For $85/month, I know my wife and kids are set if something happens to me on the road." - Carlos M., Fleet Owner</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Why Drivers Choose Us</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-300">✓ A+ Rated Insurance Companies</div>
                  <div className="text-slate-300">✓ Specialized in Commercial Drivers</div>
                  <div className="text-slate-300">✓ Coverage up to $1 Million</div>
                  <div className="text-slate-300">✓ Fast Approval (24-48 hours)</div>
                  <div className="text-slate-300">✓ No Medical Exam for Qualified Drivers</div>
                  <div className="text-slate-300">✓ Rates Lock In For Life</div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Trucker Insurance Quote
                  </h2>
                  <p className="text-slate-300">
                    Specialized life insurance coverage designed for professional drivers.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
                    <Truck className="w-4 h-4" />
                    <span>Over 25,000 professional drivers protected</span>
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
                        Driver Type *
                      </label>
                      <select
                        required
                        value={formData.truckerType}
                        onChange={(e) => setFormData({...formData, truckerType: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Type</option>
                        <option value="Owner Operator">Owner Operator</option>
                        <option value="Company Driver">Company Driver</option>
                        <option value="Fleet Owner">Fleet Owner</option>
                        <option value="Local Delivery">Local Delivery</option>
                        <option value="Long Haul OTR">Long Haul OTR</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Years Experience *
                      </label>
                      <select
                        required
                        value={formData.yearsExperience}
                        onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      >
                        <option value="">Select Experience</option>
                        <option value="Less than 2 years">Less than 2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10-20 years">10-20 years</option>
                        <option value="Over 20 years">Over 20 years</option>
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
                        <option value="21-30">21-30</option>
                        <option value="31-40">31-40</option>
                        <option value="41-50">41-50</option>
                        <option value="51-60">51-60</option>
                        <option value="61+">61+</option>
                      </select>
                    </div>
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
                        <option value="Under $100k">Under $100k</option>
                        <option value="$100k-$250k">$100k-$250k</option>
                        <option value="$250k-$500k">$250k-$500k</option>
                        <option value="Over $500k">Over $500k</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Desired Coverage Amount
                    </label>
                    <select
                      value={formData.coverageAmount}
                      onChange={(e) => setFormData({...formData, coverageAmount: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    >
                      <option value="">Select Amount</option>
                      <option value="$100k-$250k">$100k-$250k</option>
                      <option value="$250k-$500k">$250k-$500k</option>
                      <option value="$500k-$750k">$500k-$750k</option>
                      <option value="$750k-$1M">$750k-$1M</option>
                      <option value="Over $1M">Over $1M</option>
                    </select>
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
                      'Get My Free Trucker Insurance Quote'
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    🚛 Driver-focused service. No obligation. Your information stays private.
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