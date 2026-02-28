'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Phone, Mail, Calendar, CreditCard, Star, Clock, DollarSign, AlertCircle, CheckCircle, X, Loader, Shield, Timer, Flame, Crown, Award, Target, TrendingUp, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Lead {
  id: string;
  lead_type: 'iul' | 'mortgage_protection' | 'final_expense' | 'trucker_insurance';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  age?: number;
  annual_income?: number;
  desired_coverage?: number;
  quality_score?: number;
  verified_phone: boolean;
  verified_email: boolean;
  price: number;
  originalPrice: number;
  source: 'facebook' | 'google' | 'organic' | 'referral';
  campaign_id?: string;
  timeLeft?: number;
  isHot?: boolean;
  interests?: string[];
  metadata?: {
    source: string;
    campaignId: string;
    buyingIntent: 'high' | 'medium' | 'low';
    timeline: string;
  };
}

const premiumLeads: Lead[] = [
  {
    id: 'NXL-2847',
    lead_type: 'iul',
    first_name: 'Michael',
    last_name: 'Rodriguez',
    email: 'michael.rodriguez@email.com',
    phone: 'Contact via form',
    city: 'Austin',
    state: 'TX',
    age: 42,
    annual_income: 125000,
    desired_coverage: 450000,
    quality_score: 96,
    verified_phone: true,
    verified_email: true,
    price: 32.50,
    originalPrice: 35.00,
    source: 'facebook',
    campaign_id: 'premium-iul-q1',
    timeLeft: 18,
    isHot: true,
    interests: ['Financial Planning', 'Investment', 'Retirement'],
    metadata: {
      source: 'Facebook Lead Gen',
      campaignId: 'FB_IUL_TX_2024',
      buyingIntent: 'high',
      timeline: '30-45 days'
    }
  },
  {
    id: 'NXL-2848',
    lead_type: 'iul',
    first_name: 'Sarah',
    last_name: 'Chen',
    email: 'sarah.chen@email.com',
    phone: 'Contact via form',
    city: 'Dallas',
    state: 'TX',
    age: 38,
    annual_income: 150000,
    desired_coverage: 600000,
    quality_score: 98,
    verified_phone: true,
    verified_email: true,
    price: 34.00,
    originalPrice: 38.00,
    source: 'facebook',
    campaign_id: 'premium-iul-q1',
    timeLeft: 12,
    isHot: true,
    interests: ['Wealth Building', 'Tax Planning', 'Business Insurance'],
    metadata: {
      source: 'Facebook Lead Gen',
      campaignId: 'FB_IUL_TX_2024',
      buyingIntent: 'high',
      timeline: '15-30 days'
    }
  },
  {
    id: 'NXL-2849',
    lead_type: 'mortgage_protection',
    first_name: 'Jennifer',
    last_name: 'Williams',
    email: 'jennifer.williams@email.com',
    phone: 'Contact via form',
    city: 'San Antonio',
    state: 'TX',
    age: 33,
    annual_income: 85000,
    desired_coverage: 350000,
    quality_score: 91,
    verified_phone: true,
    verified_email: true,
    price: 26.00,
    originalPrice: 29.00,
    source: 'facebook',
    campaign_id: 'mortgage-protection-q1',
    timeLeft: 25,
    isHot: false,
    interests: ['Home Protection', 'Family Security'],
    metadata: {
      source: 'Facebook Lead Gen',
      campaignId: 'FB_MP_TX_2024',
      buyingIntent: 'high',
      timeline: '45-60 days'
    }
  },
  {
    id: 'NXL-2850',
    lead_type: 'final_expense',
    first_name: 'Robert',
    last_name: 'Johnson',
    email: 'robert.johnson@email.com',
    phone: 'Contact via form',
    city: 'Houston',
    state: 'TX',
    age: 67,
    annual_income: 55000,
    desired_coverage: 25000,
    quality_score: 89,
    verified_phone: true,
    verified_email: true,
    price: 22.50,
    originalPrice: 25.00,
    source: 'facebook',
    campaign_id: 'final-expense-q1',
    timeLeft: 8,
    isHot: true,
    interests: ['Final Expense', 'Estate Planning'],
    metadata: {
      source: 'Facebook Lead Gen',
      campaignId: 'FB_FE_TX_2024',
      buyingIntent: 'high',
      timeline: '7-14 days'
    }
  }
];

export default function EliteMarketplacePage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(premiumLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(premiumLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [credits, setCredits] = useState(50);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads(prevLeads => 
        prevLeads.map(lead => ({
          ...lead,
          timeLeft: Math.max(0, (lead.timeLeft || 0) - 1)
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filter leads
  const applyFilters = () => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        formatLeadType(lead.lead_type).toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${lead.city}, ${lead.state}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(lead => lead.lead_type === selectedType);
    }

    setFilteredLeads(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedType, leads]);

  const handlePurchaseLead = async () => {
    if (!selectedLead) return;

    setPurchasing(true);

    // Simulate purchase process
    setTimeout(() => {
      if (credits >= Math.ceil(selectedLead.price / 10)) {
        const creditsUsed = Math.ceil(selectedLead.price / 10);
        setCredits(credits - creditsUsed);
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== selectedLead.id));
        alert(`✅ Elite lead ${selectedLead.id} purchased successfully!\nRemaining credits: ${credits - creditsUsed}\nLead details have been sent to your dashboard.`);
      } else {
        alert('❌ Insufficient credits. Please purchase more credits to buy leads.');
      }
      
      setShowPurchaseModal(false);
      setSelectedLead(null);
      setPurchasing(false);
    }, 1500);
  };

  const formatLeadType = (type: string) => {
    switch (type) {
      case 'iul': return 'IUL Premium';
      case 'mortgage_protection': return 'Mortgage Protection';
      case 'final_expense': return 'Final Expense';
      case 'trucker_insurance': return 'Trucker Insurance';
      default: return type;
    }
  };

  const getQualityColor = (score?: number) => {
    if (!score) return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    if (score >= 95) return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    if (score >= 90) return 'text-gold-400 bg-gold-400/10 border-gold-400/20';
    if (score >= 85) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-green-400 bg-green-400/10 border-green-400/20';
  };

  const getQualityLabel = (score?: number) => {
    if (!score) return 'Standard';
    if (score >= 95) return 'Platinum Elite';
    if (score >= 90) return 'Gold Elite';
    if (score >= 85) return 'Silver Elite';
    return 'Bronze Elite';
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      <Navigation />
      
      {/* Elite Marketplace Header */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span>LIVE MARKETPLACE</span>
            </div>
            
            <h1 className="text-heading-1 text-white mb-6">
              Elite Lead <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-body-lg text-navy-300 max-w-3xl mx-auto">
              Premium, exclusive insurance leads delivered in real-time. 
              Each lead is verified, exclusive to one agent, and guaranteed to convert at 15%+ rates.
            </p>
          </div>

          {/* Elite Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-navy-950" />
              </div>
              <div className="text-2xl font-bold text-gold-400 mb-1">${(filteredLeads.reduce((sum, lead) => sum + lead.price, 0) / filteredLeads.length).toFixed(2)}</div>
              <div className="text-navy-400 text-sm">Avg Lead Price</div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">{Math.round(filteredLeads.reduce((sum, lead) => sum + (lead.quality_score || 0), 0) / filteredLeads.length)}</div>
              <div className="text-navy-400 text-sm">Avg Quality Score</div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">&lt; 5min</div>
              <div className="text-navy-400 text-sm">Delivery Speed</div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-navy-400 text-sm">Exclusive</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Enhanced Filters */}
        <div className="card-premium mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search elite leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-navy-400 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
              />
            </div>

            {/* Lead Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
            >
              <option value="all">All Premium Types</option>
              <option value="final_expense">Final Expense</option>
              <option value="iul">IUL Premium</option>
              <option value="mortgage_protection">Mortgage Protection</option>
              <option value="trucker_insurance">Trucker Insurance</option>
            </select>

            {/* Credits Display */}
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-gold-400/10 to-gold-600/5 border border-gold-400/20 rounded-xl px-4 py-4">
              <Crown className="w-5 h-5 text-gold-400" />
              <div>
                <div className="text-gold-400 font-bold text-lg">{credits}</div>
                <div className="text-navy-400 text-xs">Elite Credits</div>
              </div>
            </div>

            {/* Add Credits (Demo) */}
            <button
              onClick={() => setCredits(credits + 25)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Add 25 Credits (Demo)
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <p className="text-navy-300">
              Showing <span className="text-white font-semibold">{filteredLeads.length}</span> elite leads
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-green-400">Live updates every 30 seconds</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-navy-400 text-sm">Market Activity</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">High Demand</span>
            </div>
          </div>
        </div>

        {/* Elite Leads Grid */}
        <div className="space-y-6">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="card-premium group hover:border-gold-400/30 transition-all duration-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Elite Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-2xl font-bold text-white">{formatLeadType(lead.lead_type)}</h3>
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getQualityColor(lead.quality_score)}`}>
                      {getQualityLabel(lead.quality_score)}
                    </span>
                    {lead.isHot && (
                      <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium border border-red-400/20">
                        <Flame className="w-3 h-3" />
                        HOT LEAD
                      </span>
                    )}
                    {lead.quality_score && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold-400 fill-current" />
                        <span className="text-gold-400 font-bold">{lead.quality_score}</span>
                      </div>
                    )}
                    {lead.timeLeft && lead.timeLeft < 15 && (
                      <div className="flex items-center gap-1 text-orange-400">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">{lead.timeLeft}m left</span>
                      </div>
                    )}
                  </div>

                  {/* Lead Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Personal Info */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">{lead.first_name} {lead.last_name}</h4>
                      <div className="space-y-2 text-sm text-navy-300">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-navy-400" />
                          <span>{lead.city}, {lead.state}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-navy-400" />
                          <span>Age {lead.age}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Phone Verified</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Email Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Profile */}
                    <div>
                      <h4 className="text-navy-400 text-sm mb-3 uppercase tracking-wider">Financial Profile</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy-400">Annual Income:</span>
                          <span className="text-white font-semibold">{formatCurrency(lead.annual_income)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Coverage Desired:</span>
                          <span className="text-white font-semibold">{formatCurrency(lead.desired_coverage)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Buying Intent:</span>
                          <span className="text-green-400 font-semibold capitalize">{lead.metadata?.buyingIntent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Timeline:</span>
                          <span className="text-blue-400 font-semibold">{lead.metadata?.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lead Intelligence */}
                    <div>
                      <h4 className="text-navy-400 text-sm mb-3 uppercase tracking-wider">Lead Intelligence</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy-400">Source:</span>
                          <span className="text-white">{lead.metadata?.source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Campaign:</span>
                          <span className="text-white text-xs">{lead.metadata?.campaignId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Fresh:</span>
                          <span className="text-green-400">3 min ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Competition:</span>
                          <span className="text-gold-400 font-semibold">ZERO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Tags */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-navy-400 text-sm font-medium">Verified Interests:</span>
                    {lead.interests?.map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Premium Purchase Section */}
                <div className="text-right ml-8">
                  <div className="mb-6">
                    <div className="text-navy-400 text-sm mb-2">Premium Lead Price</div>
                    <div className="text-4xl font-bold text-white mb-1">${lead.price.toFixed(2)}</div>
                    {lead.originalPrice > lead.price && (
                      <div className="text-lg text-navy-500 line-through">${lead.originalPrice.toFixed(2)}</div>
                    )}
                    <div className="text-xs text-green-400 font-medium mt-1">
                      Save ${(lead.originalPrice - lead.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Elite Guarantees */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>30-Day Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <Crown className="w-4 h-4" />
                      <span>100% Exclusive</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                      <Award className="w-4 h-4" />
                      <span>Elite Quality</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowPurchaseModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold py-4 px-8 rounded-xl hover:from-gold-300 hover:to-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-gold-400/25 hover:shadow-gold-400/50"
                  >
                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Purchase Elite Lead
                  </button>
                  
                  <div className="text-xs text-navy-400 text-center mt-2">
                    Cost: {Math.ceil(lead.price / 10)} credits • Exclusive access
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLeads.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-navy-950" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Elite Leads Found</h3>
            <p className="text-navy-400 mb-8">Try adjusting your filters or check back in a few minutes for fresh leads</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Elite Purchase Modal */}
      {showPurchaseModal && selectedLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="card-premium w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Confirm Elite Purchase</h3>
              <button 
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedLead(null);
                }}
                className="text-navy-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Lead Details */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Lead Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-navy-400">Lead Type:</span>
                    <span className="text-white font-medium">{formatLeadType(selectedLead.lead_type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-400">Lead ID:</span>
                    <span className="text-white font-medium">{selectedLead.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-400">Quality Score:</span>
                    <span className="text-gold-400 font-bold">{selectedLead.quality_score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-400">Coverage Desired:</span>
                    <span className="text-white font-medium">{formatCurrency(selectedLead.desired_coverage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-400">Annual Income:</span>
                    <span className="text-white font-medium">{formatCurrency(selectedLead.annual_income)}</span>
                  </div>
                </div>
              </div>

              {/* Purchase Summary */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Purchase Summary</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-navy-400">Lead Price:</span>
                    <span className="text-white font-medium">${selectedLead.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-400">Credits Required:</span>
                    <span className="text-white font-medium">{Math.ceil(selectedLead.price / 10)} Credits</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between font-semibold">
                      <span className="text-navy-400">Credits After Purchase:</span>
                      <span className="text-gold-400">{credits - Math.ceil(selectedLead.price / 10)}</span>
                    </div>
                  </div>
                </div>

                {/* Elite Guarantees */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>30-Day Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>100% Exclusive - No Competition</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Elite Quality Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedLead(null);
                }}
                className="flex-1 py-4 px-6 bg-navy-700 text-white rounded-xl hover:bg-navy-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchaseLead}
                disabled={purchasing || credits < Math.ceil(selectedLead.price / 10)}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold rounded-xl hover:from-gold-300 hover:to-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {purchasing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    Confirm Elite Purchase
                  </>
                )}
              </button>
            </div>

            {credits < Math.ceil(selectedLead.price / 10) && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400">
                    Insufficient credits. You need {Math.ceil(selectedLead.price / 10)} credits but only have {credits}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}