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
  Heart,
  Home,
  Truck,
  Building,
  Calculator,
  CreditCard,
  FileText,
  AlertCircle
} from "lucide-react";

export default function PremiumLeadsPage() {
  const { user } = useAuth();

  const leadTypes = [
    {
      id: "iul",
      title: "IUL Premium",
      icon: Crown,
      price: "$32-38",
      description: "High-net-worth individuals seeking indexed universal life insurance for tax-advantaged wealth building and estate planning.",
      targetAge: "35-55",
      incomeRange: "$100K-500K+",
      avgCoverage: "$250K-$1M+",
      conversionRate: "19.2%",
      avgCommission: "$3,500-$8,500",
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      features: [
        "Sophisticated financial planning needs",
        "Tax-advantaged wealth building focus",
        "Estate planning requirements", 
        "High disposable income verified",
        "Investment knowledge confirmed"
      ],
      idealFor: [
        "Experienced agents with IUL expertise",
        "Financial planners and wealth advisors",
        "Agents seeking high-commission sales",
        "Estate planning specialists"
      ],
      qualification: [
        "Income verification: W2s, tax returns",
        "Credit score: 700+ typically",
        "Existing life insurance reviewed",
        "Investment experience confirmed",
        "Estate planning needs assessed"
      ]
    },
    {
      id: "final-expense",
      title: "Final Expense Elite",
      icon: Heart,
      price: "$24-29",
      description: "Pre-qualified seniors aged 50-80 seeking burial and final expense coverage to protect their families from end-of-life costs.",
      targetAge: "50-80",
      incomeRange: "$25K-75K",
      avgCoverage: "$10K-$50K",
      conversionRate: "16.8%",
      avgCommission: "$800-$2,200",
      color: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/20 to-emerald-600/20",
      borderColor: "border-emerald-500/30",
      features: [
        "Burial and funeral cost coverage focus",
        "Simplified underwriting eligible",
        "Fixed income budget considerations",
        "Family protection motivation strong",
        "Immediate need recognition"
      ],
      idealFor: [
        "Agents specializing in senior market",
        "High-volume producers",
        "Simplified issue product experts",
        "Community-based agents"
      ],
      qualification: [
        "Age verification: 50-80 years old",
        "Health screening: basic questions",
        "Income assessment: fixed income OK",
        "Family situation confirmed",
        "Budget capacity verified"
      ]
    },
    {
      id: "mortgage-protection",
      title: "Mortgage Protection Pro", 
      icon: Home,
      price: "$28-35",
      description: "New homeowners and refinancers seeking decreasing term life insurance to protect their mortgage and family's home.",
      targetAge: "25-50",
      incomeRange: "$50K-200K",
      avgCoverage: "$200K-$800K",
      conversionRate: "17.5%",
      avgCommission: "$1,200-$3,800",
      color: "from-blue-500 to-blue-600", 
      bgGradient: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      features: [
        "Recent mortgage activity triggers",
        "Home protection motivation high",
        "Decreasing term structure fits need",
        "Affordability is key consideration",
        "Quick decision-making timeline"
      ],
      idealFor: [
        "Agents with mortgage industry connections",
        "Term life insurance specialists", 
        "Real estate network builders",
        "Volume-focused producers"
      ],
      qualification: [
        "Mortgage verification: recent purchase/refi",
        "Income stability confirmed",
        "Existing coverage gaps identified", 
        "Home value and loan amount known",
        "Family protection priority confirmed"
      ]
    },
    {
      id: "trucker-insurance",
      title: "Commercial Trucker Elite",
      icon: Truck,
      price: "$35-42",
      description: "Owner-operator truckers and small fleet owners needing comprehensive commercial insurance and personal protection coverage.",
      targetAge: "30-65",
      incomeRange: "$60K-150K",
      avgCoverage: "$100K-$500K",
      conversionRate: "14.3%", 
      avgCommission: "$1,800-$4,500",
      color: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-500/20 to-orange-600/20", 
      borderColor: "border-orange-500/30",
      features: [
        "Commercial trucking business verified",
        "Personal and business coverage needs",
        "Cash flow timing considerations",
        "Industry-specific risk understanding",
        "Long-term relationship potential"
      ],
      idealFor: [
        "Commercial insurance specialists",
        "Agents with transportation industry knowledge",
        "Business insurance experts",
        "Relationship-focused producers"
      ],
      qualification: [
        "CDL verification and driving record",
        "Business registration confirmed",
        "Fleet size and equipment valued",
        "Current coverage gaps identified",
        "Cash flow and payment capacity assessed"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Header Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-transparent"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/30 rounded-2xl text-gold-300 font-semibold mb-8 backdrop-blur-sm">
              <Target className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Premium Lead Portfolio</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-white">Elite Insurance</span><br />
              <span className="text-gradient bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Lead Marketplace
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover our premium lead types with <strong className="text-gold-400">exclusive access</strong>, 
              <strong className="text-green-400"> verified quality</strong>, and 
              <strong className="text-blue-400"> industry-leading conversion rates</strong>. 
              Each lead type is carefully crafted for maximum ROI.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">18.3%</div>
                <div className="text-slate-400 text-sm">Avg Conversion Rate</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">$30.50</div>
                <div className="text-slate-400 text-sm">Avg Lead Cost</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-slate-400 text-sm">Exclusive</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-slate-400 text-sm">Lead Types</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {leadTypes.map((leadType, index) => (
              <div key={leadType.id} className="max-w-7xl mx-auto">
                <div className={`glass rounded-3xl overflow-hidden border ${leadType.borderColor}`}>
                  {/* Lead Type Header */}
                  <div className={`bg-gradient-to-r ${leadType.bgGradient} p-8 border-b border-slate-700/50`}>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${leadType.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <leadType.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{leadType.title}</h2>
                          <p className="text-slate-300 max-w-2xl">{leadType.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">{leadType.price}</div>
                          <div className="text-slate-400 text-sm">per lead</div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">{leadType.conversionRate}</span>
                            <span className="text-slate-400">conversion</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-gold-400" />
                            <span className="text-gold-400 font-semibold">{leadType.avgCommission}</span>
                            <span className="text-slate-400">avg commission</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lead Type Details */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Demographics & Specifications */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Target Demographics</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                            <span className="text-slate-400">Target Age:</span>
                            <span className="text-white font-semibold">{leadType.targetAge}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                            <span className="text-slate-400">Income Range:</span>
                            <span className="text-white font-semibold">{leadType.incomeRange}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                            <span className="text-slate-400">Avg Coverage:</span>
                            <span className="text-white font-semibold">{leadType.avgCoverage}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                            <span className="text-slate-400">Conversion Rate:</span>
                            <span className="text-green-400 font-semibold">{leadType.conversionRate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Lead Characteristics</h3>
                        
                        <div className="space-y-3">
                          {leadType.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                          <div className="text-slate-400 text-sm font-medium mb-2">Avg Commission Range</div>
                          <div className="text-2xl font-bold text-gold-400">{leadType.avgCommission}</div>
                          <div className="text-slate-500 text-xs">Based on typical policy sizes</div>
                        </div>
                      </div>

                      {/* Ideal For & Qualification */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Perfect For</h3>
                        
                        <div className="space-y-3 mb-6">
                          {leadType.idealFor.map((ideal, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Star className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5 fill-current" />
                              <span className="text-slate-300 text-sm">{ideal}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-400" />
                            Qualification Process
                          </h4>
                          <div className="space-y-2">
                            {leadType.qualification.slice(0, 3).map((qual, idx) => (
                              <div key={idx} className="text-slate-400 text-xs flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-1.5"></div>
                                <span>{qual}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Leads */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Our Premium Leads Convert</h2>
            <p className="text-xl text-slate-400">Every lead goes through our proprietary qualification system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Triple Verification</h3>
              <p className="text-slate-400 text-sm">Phone, email, and intent verified through multiple touchpoints</p>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Quality Scoring</h3>
              <p className="text-slate-400 text-sm">Machine learning algorithm scores lead quality and buying intent</p>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">TCPA Compliant</h3>
              <p className="text-slate-400 text-sm">Full legal compliance and opt-in verification for every lead</p>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Delivery</h3>
              <p className="text-slate-400 text-sm">Leads delivered within 15 minutes of qualification completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500/10 via-gold-600/10 to-gold-500/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Access <span className="text-gold-400">Premium Leads</span>?
            </h2>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Join thousands of elite agents earning 6-figures with our exclusive, high-converting lead system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 text-lg flex items-center gap-3"
                >
                  <Crown className="w-5 h-5" />
                  Access Lead Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
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
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>100% Exclusive Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>18.3% Avg Conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-400" />
                <span>Elite Support Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}