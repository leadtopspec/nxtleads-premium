'use client';

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, MessageCircle, Mail, Phone, Clock, CheckCircle, ArrowRight, Book, Users, Zap, Shield } from "lucide-react";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportCategories = [
    { id: 'all', label: 'All Topics', icon: Book },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'billing', label: 'Billing & Payments', icon: CheckCircle },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'technical', label: 'Technical Issues', icon: Shield },
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get approved for elite access?',
      answer: 'Apply through our application form. We review applications within 24-48 hours based on experience, revenue, and professional qualifications. Elite agents typically have 2+ years experience and $15K+ monthly revenue.'
    },
    {
      category: 'leads',
      question: 'What makes Nxt Leads different from other providers?',
      answer: 'Our leads are 100% exclusive, verified with OTP, and cost $25-35 each vs competitors\' $4-7. We target 15% close rates vs industry 2%. No deceptive tactics - honest qualification only.'
    },
    {
      category: 'billing',
      question: 'How does billing work for premium leads?',
      answer: 'You purchase leads individually at $25-35 each, or set up auto-reload for volume discounts. All payments are processed securely through Stripe. No subscriptions or minimum commitments.'
    },
    {
      category: 'technical',
      question: 'How quickly do I receive leads after purchase?',
      answer: 'Leads are delivered instantly to your dashboard upon purchase. You\'ll also receive email and SMS notifications. Our API can integrate with your CRM for seamless workflow.'
    },
    {
      category: 'leads',
      question: 'What lead types do you offer?',
      answer: 'IUL, Final Expense, Mortgage Protection, Trucker Insurance, and Annuities. All leads are warm, pre-qualified prospects who requested information about their specific insurance needs.'
    },
    {
      category: 'billing',
      question: 'What if a lead doesn\'t convert?',
      answer: 'While we can\'t guarantee conversions, our leads come with a 30-day quality guarantee. If there are verifiable issues with lead quality, we provide credits or refunds on a case-by-case basis.'
    },
    {
      category: 'getting-started',
      question: 'Do you offer training or support for new agents?',
      answer: 'Yes! Elite members get access to our conversion optimization training, script library, and dedicated success manager. We help you maximize your ROI with our premium leads.'
    },
    {
      category: 'technical',
      question: 'Can I integrate with my existing CRM?',
      answer: 'Absolutely. We offer API access and direct integrations with popular CRMs like Salesforce, HubSpot, and Pipedrive. Contact support for setup assistance.'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      available: '24/7',
      color: 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      action: 'Email Us',
      available: 'Response in 2-4 hours',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Priority Phone',
      description: 'Talk directly to our elite support team',
      action: 'Call Now',
      available: 'Mon-Fri 8AM-8PM CST',
      color: 'text-gold-400'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-transparent"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Elite <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Support</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Get expert help from our dedicated support team. We're here to ensure your success 
            with premium lead generation.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Get Immediate Help</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 ${method.color} bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-slate-400 mb-6">{method.description}</p>
                
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-400 mb-2">
                    <Clock className="w-3 h-3" />
                    {method.available}
                  </div>
                </div>
                
                <button className="btn-primary w-full group-hover:shadow-lg">
                  {method.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {supportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gold-500 text-navy-950'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <details key={index} className="glass rounded-xl overflow-hidden group">
                <summary className="p-6 cursor-pointer hover:bg-slate-700/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-slate-400">Try adjusting your search or contact our support team directly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Need More Help?</h2>
          
          <div className="max-w-2xl mx-auto glass rounded-2xl p-8">
            <p className="text-slate-300 mb-8 leading-relaxed">
              Can't find what you're looking for? Our elite support team is here to help you succeed. 
              Get personalized assistance from insurance lead generation experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Contact Support
              </a>
              <a href="/apply" className="px-6 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-300 hover:text-white hover:border-gold-400 transition-all duration-300">
                Apply for Elite Access
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}