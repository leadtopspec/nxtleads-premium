'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { 
  Crown, 
  Shield, 
  Target, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  DollarSign, 
  Users, 
  Zap, 
  BarChart3, 
  Award,
  Clock,
  MapPin,
  TrendingDown,
  AlertTriangle,
  ThumbsUp,
  Quote
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Elite Agent, TX",
      avatar: "SM",
      content: "Went from $3K to $47K monthly with NxtLeads. The 18% close rate is no joke - these leads are pre-qualified gold.",
      revenue: "$564K Annual"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Top Producer, FL",
      avatar: "MR",
      content: "After switching from cheap leads, my conversion jumped 6x. Worth every penny - quality over quantity wins.",
      revenue: "$832K Annual"
    },
    {
      name: "Jennifer Chen",
      role: "Agency Owner, CA", 
      avatar: "JC",
      content: "Built a 7-figure agency on NxtLeads. My agents average 15% close rates vs 2% industry standard.",
      revenue: "$1.2M Annual"
    }
  ];

  const stats = [
    { value: "18.3%", label: "Average Close Rate", sublabel: "vs 3% industry avg", color: "text-emerald-400" },
    { value: "$31.50", label: "Avg Lead Cost", sublabel: "4x ROI guarantee", color: "text-yellow-400" },
    { value: "5,847", label: "Elite Agents", sublabel: "Earning 6+ figures", color: "text-blue-400" },
    { value: "<15min", label: "Lead Delivery", sublabel: "Real-time alerts", color: "text-purple-400" }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Exclusive Leads",
      description: "Zero competition. Each lead sold to only one agent. Guaranteed exclusivity with TCPA compliance.",
      highlight: "Never shared"
    },
    {
      icon: Target,
      title: "AI Quality Scoring",
      description: "90+ quality scores only. Machine learning filters out tire-kickers and time-wasters.",
      highlight: "90+ scores only"
    },
    {
      icon: TrendingUp,
      title: "Proven ROI System",
      description: "4x ROI guarantee. Our elite agents consistently outperform industry benchmarks by 600%.",
      highlight: "4x ROI guarantee"
    },
    {
      icon: Clock,
      title: "Real-Time Delivery", 
      description: "Instant lead notifications. Strike while the iron is hot with sub-15-minute delivery.",
      highlight: "15min delivery"
    },
    {
      icon: BarChart3,
      title: "Elite Dashboard",
      description: "Professional CRM with conversion tracking, pipeline management, and performance analytics.",
      highlight: "Pro tools included"
    },
    {
      icon: Award,
      title: "Elite Agent Support",
      description: "Dedicated success manager, conversion coaching, and exclusive elite agent training programs.",
      highlight: "Personal success mgr"
    }
  ];

  const pricingComparison = [
    {
      provider: "Commodity Leads",
      price: "$4-7",
      quality: "Mixed",
      exclusive: false,
      support: "Basic",
      conversion: "2-3%",
      problems: ["Shared with 5+ agents", "Low quality scores", "No TCPA compliance", "Poor ROI"]
    },
    {
      provider: "NxtLeads Elite",
      price: "$25-35", 
      quality: "Premium 90+",
      exclusive: true,
      support: "Elite", 
      conversion: "15-18%",
      problems: []
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-transparent"></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Elite Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/30 rounded-2xl text-gold-300 font-semibold mb-8 backdrop-blur-sm">
              <Crown className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Elite Agent Exclusive Program</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Stop Chasing</span><br />
              <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Premium Leads
              </span><br />
              <span className="text-white">That Actually</span> 
              <span className="text-green-400"> Convert</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join 5,847 elite insurance agents earning <strong className="text-gold-400">6-7 figures annually</strong> with our 
              exclusive lead generation system. <span className="text-green-400 font-semibold">18.3% average close rate</span> vs 
              3% industry standard.
            </p>

            {/* Social Proof Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">$47M+ in agent sales this year</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 text-gold-400 fill-current" />
                <span className="text-slate-300 text-sm">4.9/5 Elite Agent Rating</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">100% TCPA Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
                >
                  <Crown className="w-5 h-5" />
                  Access Elite Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/apply"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
                  >
                    <Crown className="w-5 h-5" />
                    Apply for Elite Access
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="border border-slate-600 hover:border-gold-400 text-white hover:text-gold-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
                  >
                    Agent Login
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>4x ROI Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Performance Stats */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Elite Performance Metrics</h2>
            <p className="text-xl text-slate-400">Why elite agents choose premium over commodity leads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold mb-2">{stat.label}</div>
                  <div className="text-slate-400 text-sm">{stat.sublabel}</div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Commodity Leads vs Elite Leads</h2>
            <p className="text-xl text-slate-400">Stop wasting time and money on low-quality prospects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Commodity Problems */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Commodity Lead Problems</h3>
              </div>

              <div className="space-y-4">
                {[
                  "Shared with 5+ agents - zero exclusivity",
                  "2-3% conversion rates waste your time", 
                  "Poor quality scoring - lots of tire-kickers",
                  "No TCPA compliance = legal liability",
                  "Fake contact info and bad phone numbers",
                  "No support when leads don&apos;t convert"
                ].map((problem, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{problem}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="text-red-400 font-semibold mb-2">Reality Check:</div>
                <div className="text-slate-300">
                  At $7/lead with 2% conversion, you need <strong>50 leads</strong> to make one sale. 
                  That&apos;s $350 in lead costs alone - before your time investment.
                </div>
              </div>
            </div>

            {/* Elite Solution */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">NxtLeads Elite Solution</h3>
              </div>

              <div className="space-y-4">
                {[
                  "100% exclusive - sold to only one agent",
                  "18.3% average close rate saves time",
                  "AI-verified 90+ quality scores only",
                  "Full TCPA compliance and legal protection",
                  "Triple-verified contact information",
                  "Dedicated success manager and support"
                ].map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{solution}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="text-green-400 font-semibold mb-2">Elite Math:</div>
                <div className="text-slate-300">
                  At $32/lead with 18% conversion, you need just <strong>6 leads</strong> to make one sale. 
                  That&apos;s $192 in lead costs - <span className="text-green-400 font-semibold">45% less total cost</span> with way higher close rates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Features */}
      <section className="py-20 bg-gradient-to-br from-navy-950 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Elite Platform Features</h2>
            <p className="text-xl text-slate-400">Everything you need to dominate your market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="glass rounded-2xl p-8 h-full hover:border-gold-500/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <div className="px-2 py-1 bg-gold-500/20 text-gold-400 rounded text-xs font-medium">
                      {feature.highlight}
                    </div>
                  </div>
                  
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Agent Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Elite Agent Success Stories</h2>
            <p className="text-xl text-slate-400">Real results from real agents earning 6-7 figures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="glass rounded-2xl p-8 h-full hover:scale-105 transition-all duration-300">
                  <Quote className="w-8 h-8 text-gold-400 mb-4" />
                  
                  <p className="text-slate-300 mb-6 italic leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-navy-950 font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      <div className="text-green-400 text-sm font-semibold">{testimonial.revenue}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-full">
              <Star className="w-4 h-4 text-gold-400 fill-current" />
              <span className="text-white font-semibold">4.9/5 Rating</span>
              <span className="text-slate-400">from 5,847+ Elite Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Access CTA */}
      <section className="py-20 bg-gradient-to-r from-gold-500/10 via-gold-600/10 to-gold-500/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold mb-8">
              <Crown className="w-4 h-4" />
              <span>LIMITED ELITE ACCESS</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the <span className="text-gold-400">Elite 1%</span>?
            </h2>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Stop competing with 10+ agents for the same mediocre leads. 
              Get exclusive access to premium prospects that actually convert.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
                >
                  <Crown className="w-5 h-5" />
                  Access Your Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/apply"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
                  >
                    <Crown className="w-5 h-5" />
                    Apply Now - Limited Spots
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="border border-slate-600 hover:border-gold-400 text-white hover:text-gold-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
                  >
                    Agent Login
                  </Link>
                </>
              )}
            </div>

            {/* Final Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>4x ROI Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>15-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-400" />
                <span>Elite Support Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <span className="text-navy-950 font-bold text-lg">N</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  Nxt<span className="text-gold-400">Leads</span>
                </div>
                <div className="text-xs text-slate-400">Premium • Exclusive • Guaranteed</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <div className="text-sm">
                © 2024 NxtLeads. Elite Agent Platform.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}