'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    leadType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          leadType: formData.leadType,
          message: formData.message,
          source: 'contact_page'
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Network error. Please try again or email us directly at support@nxtleads.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
        <Navigation />
        
        <section className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              Message <span className="text-gradient">Sent!</span>
            </h1>
            
            <p className="text-xl text-navy-300 mb-8 leading-relaxed">
              Thank you for reaching out to our <strong className="text-gold-400">Elite Team</strong>. 
              We've received your message and will respond within 24 hours.
            </p>

            <div className="glass-light rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                  <span className="text-navy-300">Our team reviews your inquiry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                  <span className="text-navy-300">We'll contact you within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                  <span className="text-navy-300">Start your journey to elite leads</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-navy-300 hover:text-white transition-colors"
              >
                Send Another Message
              </button>
              <a href="/apply" className="btn-primary">
                Apply for Elite Access
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      <Navigation />
      
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-heading-1 text-white mb-6">
              Contact Our <span className="text-gradient">Elite Team</span>
            </h1>
            <p className="text-body-lg text-navy-300 max-w-3xl mx-auto">
              Ready to transform your insurance business? Our premium success team is standing by 
              to help elite agents like you achieve 6-figure results.
            </p>
          </div>

          {/* Centered Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="card-premium">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Get In Contact</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-300 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-300 font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy-300 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors"
                    placeholder="john@insurance.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy-300 font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="Your Agency"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-300 font-medium mb-2">Lead Type Interest</label>
                    <select
                      name="leadType"
                      value={formData.leadType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="">Select Type</option>
                      <option value="final-expense">Final Expense</option>
                      <option value="iul">IUL & Life Insurance</option>
                      <option value="mortgage-protection">Mortgage Protection</option>
                      <option value="annuity">Annuities</option>
                      <option value="all">All Types</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-navy-300 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    placeholder="Tell us about your goals and current lead challenges..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}