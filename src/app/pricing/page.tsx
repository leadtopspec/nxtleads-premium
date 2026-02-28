'use client';


import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Crown, Star, Shield, TrendingUp, CheckCircle, DollarSign, Users, Clock, Award } from "lucide-react";

interface LeadPackage {
  name: string;
  leadCount: number;
  pricePerLead: number;
  originalPricePerLead?: number;
  totalPrice: number;
  originalTotalPrice?: number;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  savings?: string;
  cta: string;
}

const leadPackages: LeadPackage[] = [
  {
    name: "Trial Pack",
    leadCount: 5,
    pricePerLead: 32,
    totalPrice: 160,
    description: "Test our lead quality across all 4 verticals",
    features: [
      "5 exclusive life insurance leads",
      "Mix of IUL, Final Expense, Mortgage Protection & Trucker",
      "100% exclusive (never shared)",
      "90+ quality score guarantee", 
      "15-minute delivery promise",
      "Basic lead analytics",
      "Email support",
      "Quality guarantee included"
    ],
    cta: "Start Trial"
  },
  {
    name: "Growth Pack",
    leadCount: 25,
    pricePerLead: 28,
    originalPricePerLead: 32,
    totalPrice: 700,
    originalTotalPrice: 800,
    description: "Most popular for consistent multi-vertical flow",
    features: [
      "25 exclusive life insurance leads",
      "Choose your preferred lead types",
      "Priority 10-minute delivery",
      "Advanced lead scoring & filters",
      "Lead performance analytics by vertical",
      "Phone & email support", 
      "CRM integration ready",
      "30-day quality guarantee"
    ],
    popular: true,
    badge: "Most Popular", 
    savings: "Save $100",
    cta: "Get Started"
  },
  {
    name: "Scale Pack",
    leadCount: 50,
    pricePerLead: 25,
    originalPricePerLead: 32,
    totalPrice: 1250,
    originalTotalPrice: 1600,
    description: "Serious agents scaling across all verticals",
    features: [
      "50 exclusive life insurance leads",
      "Custom vertical distribution ratios",
      "Instant 5-minute delivery",
      "Premium lead quality (95+ scores)",
      "Advanced analytics & reporting",
      "Dedicated phone support",
      "Custom lead preferences by type",
      "Priority customer success"
    ],
    savings: "Save $350",
    cta: "Scale Now"
  },
  {
    name: "Elite Pack", 
    leadCount: 100,
    pricePerLead: 22,
    originalPricePerLead: 32,
    totalPrice: 2200,
    originalTotalPrice: 3200,
    description: "Maximum volume across premium verticals",
    features: [
      "100 exclusive life insurance leads",
      "Highest-tier leads in all 4 verticals",
      "Immediate delivery (<2 minutes)",
      "Platinum quality (96+ scores)",
      "Dedicated success manager",
      "Custom lead sourcing by vertical",
      "White-glove onboarding",
      "Advanced CRM integration"
    ],
    savings: "Save $1,000",
    cta: "Contact Sales"
  }
];

const comparisonData = [
  {
    metric: "Price per Lead",
    trial: "$32",
    growth: "$28",
    scale: "$25", 
    elite: "$22"
  },
  {
    metric: "Quality Score",
    trial: "90+",
    growth: "92+",
    scale: "95+",
    elite: "96+"
  },
  {
    metric: "Delivery Time",
    trial: "15 min",
    growth: "10 min", 
    scale: "5 min",
    elite: "2 min"
  },
  {
    metric: "Expected Close Rate",
    trial: "15-17%",
    growth: "16-18%",
    scale: "17-19%", 
    elite: "18-20%"
  },
  {
    metric: "Support Level",
    trial: "Email",
    growth: "Phone & Email",
    scale: "Priority Phone",
    elite: "Dedicated Manager"
  }
];

export default function PricingPage() {

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
            <span>Premium Lead Packages</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Premium <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Life Insurance</span> Leads
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            High-converting leads across <strong className="text-gold-400">4 premium verticals</strong>: IUL, Final Expense, Mortgage Protection & Trucker Insurance. 
            Every lead is <strong className="text-green-400">100% exclusive</strong> with our 
            <strong className="text-blue-400">elite quality guarantee</strong>.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">18.3%</div>
              <div className="text-slate-400 text-sm">Avg Close Rate</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gold-400 mb-1">4</div>
              <div className="text-slate-400 text-sm">Lead Types</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">90+</div>
              <div className="text-slate-400 text-sm">Quality Score</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">$22-35</div>
              <div className="text-slate-400 text-sm">Per Lead</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Types Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Premium <span className="text-gold-400">Life Insurance</span> Lead Types
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Choose from 4 high-converting verticals, each with exclusive leads and premium quality scoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* IUL Elite Premium */}
            <div className="glass rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-navy-950" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">IUL Elite Premium</h3>
                <div className="text-2xl font-bold text-gold-400 mb-1">$28-35</div>
                <div className="text-slate-400 text-sm">per lead</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age Range:</span>
                  <span className="text-white">25-55</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Income:</span>
                  <span className="text-white">$75K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Close Rate:</span>
                  <span className="text-green-400">22-25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Premium:</span>
                  <span className="text-white">$4,200</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gold-900/20 border border-gold-400/30 rounded-lg">
                <div className="text-gold-400 text-xs font-semibold">HIGHEST COMMISSIONS</div>
                <div className="text-slate-300 text-xs">Premium wealthy clients seeking tax advantages</div>
              </div>
            </div>

            {/* Final Expense Elite */}
            <div className="glass rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Final Expense Elite</h3>
                <div className="text-2xl font-bold text-blue-400 mb-1">$22-28</div>
                <div className="text-slate-400 text-sm">per lead</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age Range:</span>
                  <span className="text-white">50-75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Income:</span>
                  <span className="text-white">$35K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Close Rate:</span>
                  <span className="text-green-400">18-22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Premium:</span>
                  <span className="text-white">$2,800</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                <div className="text-blue-400 text-xs font-semibold">HIGHEST VOLUME</div>
                <div className="text-slate-300 text-xs">Seniors seeking burial/final expense coverage</div>
              </div>
            </div>

            {/* Mortgage Protection Pro */}
            <div className="glass rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Mortgage Protection Pro</h3>
                <div className="text-2xl font-bold text-green-400 mb-1">$25-32</div>
                <div className="text-slate-400 text-sm">per lead</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age Range:</span>
                  <span className="text-white">30-50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Income:</span>
                  <span className="text-white">$60K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Close Rate:</span>
                  <span className="text-green-400">19-23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Premium:</span>
                  <span className="text-white">$3,400</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                <div className="text-green-400 text-xs font-semibold">FASTEST CLOSE</div>
                <div className="text-slate-300 text-xs">Homeowners protecting mortgage debt</div>
              </div>
            </div>

            {/* Trucker Insurance Elite */}
            <div className="glass rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Trucker Insurance Elite</h3>
                <div className="text-2xl font-bold text-purple-400 mb-1">$28-35</div>
                <div className="text-slate-400 text-sm">per lead</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age Range:</span>
                  <span className="text-white">35-60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Income:</span>
                  <span className="text-white">$80K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Close Rate:</span>
                  <span className="text-green-400">20-24%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Premium:</span>
                  <span className="text-white">$3,800</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-900/20 border border-purple-400/30 rounded-lg">
                <div className="text-purple-400 text-xs font-semibold">NICHE EXPERTISE</div>
                <div className="text-slate-300 text-xs">Owner-operators & fleet drivers</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-slate-300 text-sm">All leads 100% exclusive</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300 text-sm">TCPA compliant</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gold-400" />
                <span className="text-slate-300 text-sm">90+ quality scores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Packages */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {leadPackages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  pkg.popular
                    ? 'border-2 border-gold-400 bg-gradient-to-b from-gold-500/10 to-slate-900/50 shadow-xl shadow-gold-500/20'
                    : 'glass hover:border-gold-500/30'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      pkg.popular 
                        ? 'bg-gold-400 text-navy-950' 
                        : 'bg-green-500 text-white'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                  
                  {/* Lead Count Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg mb-4">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-semibold">{pkg.leadCount} Leads</span>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    {pkg.originalPricePerLead && (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-slate-500 line-through text-lg">
                          ${pkg.originalPricePerLead}/lead
                        </span>
                        {pkg.savings && (
                          <span className="text-green-400 text-sm font-semibold">
                            {pkg.savings}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="text-3xl font-bold text-white mb-1">
                      ${pkg.pricePerLead}<span className="text-lg text-slate-400">/lead</span>
                    </div>
                    
                    <div className="text-gold-400 font-semibold">
                      ${pkg.totalPrice.toLocaleString()} total
                    </div>
                    
                    {pkg.originalTotalPrice && (
                      <div className="text-slate-500 line-through text-sm">
                        was ${pkg.originalTotalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/apply"
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 text-center block ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 shadow-lg shadow-gold-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                  }`}
                >
                  {pkg.cta}
                </Link>


              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Package Comparison</h2>
            <p className="text-xl text-slate-400">Compare features across all lead packages</p>
          </div>

          <div className="glass rounded-2xl overflow-hidden max-w-5xl mx-auto">
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-slate-800/30 border-b border-slate-700">
              <div className="font-semibold text-white">Features</div>
              <div className="text-center text-slate-300">Trial Pack</div>
              <div className="text-center text-gold-400 font-semibold">Growth Pack</div>
              <div className="text-center text-blue-400 font-semibold">Scale Pack</div>
              <div className="text-center text-purple-400 font-semibold">Elite Pack</div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/20 transition-colors">
                <div className="font-medium text-slate-300">{row.metric}</div>
                <div className="text-center text-slate-400">{row.trial}</div>
                <div className="text-center text-gold-400 font-medium">{row.growth}</div>
                <div className="text-center text-blue-400 font-medium">{row.scale}</div>
                <div className="text-center text-purple-400 font-medium">{row.elite}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              See Your <span className="text-gold-400">Potential ROI</span>
            </h2>
            
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">18.3%</div>
                  <div className="text-slate-300 font-semibold">Average Close Rate</div>
                  <div className="text-slate-500 text-sm">vs 2-3% industry standard</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400 mb-2">$3,200</div>
                  <div className="text-slate-300 font-semibold">Average Commission</div>
                  <div className="text-slate-500 text-sm">per closed lead</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">12x</div>
                  <div className="text-slate-300 font-semibold">Return on Investment</div>
                  <div className="text-slate-500 text-sm">$32 lead cost vs $3,200 commission</div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl">
                  <h4 className="text-md font-bold text-gold-400 mb-2">IUL Elite Premium Example:</h4>
                  <p className="text-slate-300 text-sm">
                    10 leads × 23% close rate = <span className="text-green-400 font-bold">2.3 sales</span><br />
                    2.3 sales × $4,200 avg commission = <span className="text-green-400 font-bold">$9,660 revenue</span><br />
                    Cost: 10 leads × $32 = $320 • <span className="text-green-400 font-bold">Profit: $9,340</span>
                  </p>
                </div>
                
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h4 className="text-md font-bold text-blue-400 mb-2">Final Expense Elite Example:</h4>
                  <p className="text-slate-300 text-sm">
                    15 leads × 20% close rate = <span className="text-green-400 font-bold">3 sales</span><br />
                    3 sales × $2,800 avg commission = <span className="text-green-400 font-bold">$8,400 revenue</span><br />
                    Cost: 15 leads × $25 = $375 • <span className="text-green-400 font-bold">Profit: $8,025</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500/10 via-gold-600/10 to-gold-500/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start with <span className="text-gold-400">Premium Leads</span>?
            </h2>
            
            <p className="text-xl text-slate-300 mb-12">
              Join 5,847+ elite agents earning 6-7 figures across IUL, Final Expense, Mortgage Protection & Trucker Insurance. 
              Start with our trial pack or scale with volume discounts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/apply"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
              >
                <Crown className="w-5 h-5" />
                Apply for Elite Access
              </Link>
              
              <Link
                href="/apply"
                className="border border-slate-600 hover:border-gold-400 text-white hover:text-gold-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
              >
                Submit Application
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>100% Exclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold-400 fill-current" />
                <span>90+ Quality Score</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>15-Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}