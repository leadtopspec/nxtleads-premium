'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Crown, Shield, Star, CheckCircle, Building, Phone, Mail, User, DollarSign, Award, Clock, TrendingUp } from "lucide-react";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    imo: '',
    yearsExperience: '',
    monthlyLeadBudget: '',
    currentLeadSources: '',
    averageMonthlyCommissions: '',
    specialties: [] as string[],
    motivation: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specialtyOptions = [
    'IUL (Indexed Universal Life)',
    'Final Expense Insurance', 
    'Mortgage Protection',
    'Trucker Insurance',
    'Annuities',
    'Term Life Insurance',
    'Whole Life Insurance'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreeToTerms') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle specialty checkboxes
        setFormData(prev => ({
          ...prev,
          specialties: checked 
            ? [...prev.specialties, value]
            : prev.specialties.filter(s => s !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Application <span className="text-gold-400">Submitted!</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Thank you for applying to join our <strong className="text-gold-400">Elite Agent Program</strong>. 
                Your application is now under review by our qualification team.
              </p>

              <div className="glass rounded-2xl p-8 mb-8 text-left">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  What Happens Next?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Application Review (12-24 hours)</h4>
                      <p className="text-slate-400 text-sm">Our team will verify your experience and business credentials.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Qualification Call (24-48 hours)</h4>
                      <p className="text-slate-400 text-sm">If approved, we'll schedule a brief qualification call to discuss your goals.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Elite Access Granted</h4>
                      <p className="text-slate-400 text-sm">Welcome to the exclusive marketplace for premium leads!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-6 mb-8">
                <h4 className="text-gold-400 font-bold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Application Status
                </h4>
                <p className="text-white">
                  <strong>Email:</strong> {formData.email}<br />
                  <strong>Status:</strong> <span className="text-blue-400">Under Review</span><br />
                  <strong>Expected Response:</strong> Within 24-48 hours
                </p>
              </div>

              <p className="text-slate-400">
                Questions? Email us at <a href="mailto:apply@nxtleads.com" className="text-gold-400 hover:underline">apply@nxtleads.com</a>
              </p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold mb-8">
            <Crown className="w-4 h-4" />
            <span>Elite Agent Application</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Apply for <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Elite Access</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Join 5,847+ elite agents earning 6-7 figures with exclusive access to premium leads. 
            <strong className="text-gold-400"> Application review takes 24-48 hours.</strong>
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">18.3%</div>
              <div className="text-slate-400 text-sm">Avg Close Rate</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gold-400 mb-1">$25-35</div>
              <div className="text-slate-400 text-sm">Per Lead</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-slate-400 text-sm">Exclusive</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">Elite</div>
              <div className="text-slate-400 text-sm">Access Only</div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Elite Agent Application</h2>
                <p className="text-slate-400">Complete the form below to apply for exclusive access to premium leads</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <User className="w-5 h-5 text-gold-400" />
                    Personal Information
                  </h3>
                  
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
                      <label className="block text-slate-300 font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Building className="w-5 h-5 text-blue-400" />
                    Business Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Company/Agency Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="Smith Insurance Agency"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">IMO/Agency Affiliation *</label>
                      <select
                        name="imo"
                        value={formData.imo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select your IMO</option>
                        <option value="Family First Life">Family First Life</option>
                        <option value="American Income Life">American Income Life</option>
                        <option value="Globe Life">Globe Life</option>
                        <option value="PHP Agency">PHP Agency</option>
                        <option value="Symmetry Financial Group">Symmetry Financial Group</option>
                        <option value="Primerica">Primerica</option>
                        <option value="Transamerica">Transamerica</option>
                        <option value="Mutual of Omaha">Mutual of Omaha</option>
                        <option value="Lincoln Heritage">Lincoln Heritage</option>
                        <option value="Foresters Financial">Foresters Financial</option>
                        <option value="Americo">Americo</option>
                        <option value="Prosperity Life Group">Prosperity Life Group</option>
                        <option value="Senior Life Insurance Company">Senior Life Insurance Company</option>
                        <option value="United Home Life">United Home Life</option>
                        <option value="Columbian Financial Group">Columbian Financial Group</option>
                        <option value="Liberty National Life">Liberty National Life</option>
                        <option value="Colonial Life">Colonial Life</option>
                        <option value="Aflac">Aflac</option>
                        <option value="New York Life">New York Life</option>
                        <option value="Northwestern Mutual">Northwestern Mutual</option>
                        <option value="Mass Mutual">Mass Mutual</option>
                        <option value="Prudential">Prudential</option>
                        <option value="MetLife">MetLife</option>
                        <option value="AIG">AIG</option>
                        <option value="Principal Financial">Principal Financial</option>
                        <option value="Guardian Life">Guardian Life</option>
                        <option value="Pacific Life">Pacific Life</option>
                        <option value="John Hancock">John Hancock</option>
                        <option value="Nationwide">Nationwide</option>
                        <option value="State Farm">State Farm</option>
                        <option value="Allstate">Allstate</option>
                        <option value="Farmers Insurance">Farmers Insurance</option>
                        <option value="Independent Agent">Independent Agent</option>
                        <option value="Captive Agent">Captive Agent</option>
                        <option value="Other">Other (Please specify in motivation section)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Years of Experience *</label>
                      <select
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Monthly Lead Budget *</label>
                      <select
                        name="monthlyLeadBudget"
                        value={formData.monthlyLeadBudget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select budget</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-400" />
                    Insurance Specialties *
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialtyOptions.map((specialty) => (
                      <label key={specialty} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="specialties"
                          value={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-gold-400 bg-slate-800 border border-slate-600 rounded focus:ring-gold-400 focus:ring-2"
                        />
                        <span className="text-slate-300">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Additional Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Current Monthly Commissions *</label>
                      <select
                        name="averageMonthlyCommissions"
                        value={formData.averageMonthlyCommissions}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        required
                      >
                        <option value="">Select range</option>
                        <option value="0-5000">$0 - $5,000</option>
                        <option value="5000-15000">$5,000 - $15,000</option>
                        <option value="15000-30000">$15,000 - $30,000</option>
                        <option value="30000+">$30,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Current Lead Sources</label>
                      <input
                        type="text"
                        name="currentLeadSources"
                        value={formData.currentLeadSources}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="e.g., Referrals, Online Marketing, Lead Vendors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 font-medium mb-2">Why do you want to join Nxt Leads? *</label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                        placeholder="Tell us about your goals and why premium leads would benefit your business..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="border-t border-slate-700 pt-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-gold-400 bg-slate-800 border border-slate-600 rounded focus:ring-gold-400 focus:ring-2 mt-0.5"
                      required
                    />
                    <span className="text-slate-300 text-sm">
                      I agree to the <a href="/terms" className="text-gold-400 hover:underline">Terms of Service</a> and 
                      <a href="/privacy" className="text-gold-400 hover:underline ml-1">Privacy Policy</a>. 
                      I understand that my application will be reviewed within 24-48 hours and that elite access 
                      is subject to qualification approval.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:from-slate-600 disabled:to-slate-700 text-navy-950 disabled:text-slate-400 font-bold px-12 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 disabled:shadow-none text-lg flex items-center gap-3 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></div>
                        Processing Application...
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5" />
                        Submit Elite Application
                      </>
                    )}
                  </button>
                  
                  <p className="text-slate-400 text-sm mt-4">
                    Application review typically takes 24-48 hours
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