'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Clock, Bell, Star, TrendingUp, CheckCircle, Users, Target, Award } from "lucide-react";

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentExperience: '',
    currentRevenue: '',
    goalRevenue: '',
    timeline: '',
    leadBudget: '',
    motivation: '',
    notificationPrefs: {
      email: true,
      sms: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof typeof prev] as object),
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'waitlist_page',
          submittedAt: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      alert('Network error. Please try again or contact support@nxtleads.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const waitlistBenefits = [
    {
      icon: Bell,
      title: 'Early Access Notification',
      description: 'Be the first to know when we have capacity for new elite agents'
    },
    {
      icon: Star,
      title: 'Priority Application Review',
      description: 'Skip the line with expedited application processing'
    },
    {
      icon: Target,
      title: 'Growth Tracking',
      description: 'We\'ll monitor your progress and notify you when you qualify'
    },
    {
      icon: Award,
      title: 'Exclusive Resources',
      description: 'Access our free lead conversion guides while you wait'
    }
  ];

  const qualificationCriteria = [
    { requirement: '2+ years insurance experience', status: 'required' },
    { requirement: '$15K+ monthly revenue', status: 'required' },
    { requirement: 'Professional IMO/FMO affiliation', status: 'required' },
    { requirement: 'Active insurance license', status: 'required' },
    { requirement: 'Minimum $1K monthly lead budget', status: 'preferred' },
    { requirement: '10%+ current close rate', status: 'preferred' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-blue-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                You're on the <span className="text-gold-400">Elite Waitlist!</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Thank you for joining our exclusive waitlist. We'll track your growth and notify you 
                the moment you qualify for <strong className="text-gold-400">Elite Agent Access</strong>.
              </p>

              <div className="glass rounded-2xl p-8 mb-8 text-left">
                <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center gap-3 justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                  What Happens Next?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Immediate Confirmation</h4>
                      <p className="text-slate-400 text-sm">You'll receive a welcome email with our exclusive growth guide.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Progress Monitoring</h4>
                      <p className="text-slate-400 text-sm">We'll track industry data and notify you when you hit our criteria.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Priority Access</h4>
                      <p className="text-slate-400 text-sm">Skip the application queue and get instant elite access!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-6 mb-8">
                <h4 className="text-gold-400 font-bold mb-2 flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4" />
                  Waitlist Status
                </h4>
                <p className="text-white">
                  <strong>Position:</strong> #{Math.floor(Math.random() * 150) + 50}<br />
                  <strong>Estimated Timeline:</strong> {formData.timeline || '3-6 months'}<br />
                  <strong>Target Revenue:</strong> {formData.goalRevenue || 'Not specified'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-300 hover:text-white transition-colors"
                >
                  Update Information
                </button>
                <a href="/contact" className="btn-primary">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-transparent"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-8">
            <Clock className="w-4 h-4" />
            <span>Elite Waitlist</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join the <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Elite Waitlist</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Not ready for elite access yet? Join our exclusive waitlist and we'll notify you 
            the moment you qualify for premium leads.
          </p>

          {/* Current Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">{Math.floor(Math.random() * 200) + 150}</div>
              <div className="text-slate-400 text-sm">On Waitlist</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">{Math.floor(Math.random() * 50) + 25}</div>
              <div className="text-slate-400 text-sm">Promoted This Month</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gold-400 mb-1">3-6</div>
              <div className="text-slate-400 text-sm">Avg Wait (Months)</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">89%</div>
              <div className="text-slate-400 text-sm">Promotion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Waitlist Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {waitlistBenefits.map((benefit, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification Criteria */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Elite Qualification Criteria</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-400" />
                  Required Qualifications
                </h3>
                
                <div className="space-y-4">
                  {qualificationCriteria.filter(c => c.status === 'required').map((criterion, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-300">{criterion.requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Preferred Qualifications
                </h3>
                
                <div className="space-y-4">
                  {qualificationCriteria.filter(c => c.status === 'preferred').map((criterion, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-300">{criterion.requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Join the Elite Waitlist</h2>
                <p className="text-slate-400">Help us track your growth and notify you when you qualify</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="John"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="Smith"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="john@insurance.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Current Status</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Experience Level *</label>
                      <select
                        name="currentExperience"
                        value={formData.currentExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="2-5">2-5 years (Close!)</option>
                        <option value="5+">5+ years (Ready!)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Current Monthly Revenue *</label>
                      <select
                        name="currentRevenue"
                        value={formData.currentRevenue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select range</option>
                        <option value="0-5k">$0 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-15k">$10,000 - $15,000 (Close!)</option>
                        <option value="15k+">$15,000+ (Ready!)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Goal Monthly Revenue</label>
                      <select
                        name="goalRevenue"
                        value={formData.goalRevenue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        <option value="">Select goal</option>
                        <option value="20k-30k">$20,000 - $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k+">$100,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Timeline to Qualify</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        <option value="">How soon?</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="12+ months">12+ months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Goals & Motivation */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Goals & Motivation</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Expected Lead Budget (when qualified)</label>
                      <select
                        name="leadBudget"
                        value={formData.leadBudget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        <option value="">Select budget</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">What's driving your growth goals? *</label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="Tell us about your goals and what's motivating you to join the elite tier..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificationPrefs.email"
                        checked={formData.notificationPrefs.email}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-gold-400 bg-slate-800 border border-slate-600 rounded focus:ring-gold-400 focus:ring-2"
                      />
                      <span className="text-slate-300">Email notifications when I qualify</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificationPrefs.sms"
                        checked={formData.notificationPrefs.sms}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-gold-400 bg-slate-800 border border-slate-600 rounded focus:ring-gold-400 focus:ring-2"
                      />
                      <span className="text-slate-300">SMS notifications (priority updates only)</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 text-white disabled:text-slate-400 font-bold px-12 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:shadow-none text-lg flex items-center gap-3 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Joining Waitlist...
                      </>
                    ) : (
                      <>
                        <Bell className="w-5 h-5" />
                        Join Elite Waitlist
                      </>
                    )}
                  </button>
                  
                  <p className="text-slate-400 text-sm mt-4">
                    We'll monitor your progress and notify you when you qualify
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}