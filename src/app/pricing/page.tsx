import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            Elite<span className="text-purple-400">Leads</span> Pro
          </Link>
          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/leads" className="text-gray-300 hover:text-white">Browse Leads</Link>
            <Link href="/pricing" className="text-purple-400">Pricing</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
          <button className="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700">
            Agent Portal
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Transparent Pricing. Premium Results.
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Every lead is exclusive. Every price includes our 300% ROI guarantee.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg text-green-400">
            ✓ No contracts • No minimums • No setup fees
          </div>
        </div>

        {/* Main Pricing Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* Final Expense */}
          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Final Expense</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">$25</div>
              <div className="text-gray-400 text-sm">per lead</div>
            </div>
            
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Ages 50-65+
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                $50-200/month premium
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Exclusive to you only
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                &lt;5min fresh delivery
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                300% ROI guarantee
              </li>
            </ul>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>

          {/* Term Life */}
          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Term Life</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">$27</div>
              <div className="text-gray-400 text-sm">per lead</div>
            </div>
            
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Ages 25-65
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                $100-500/month premium
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Mortgage protection focus
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Family protection angle
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                High conversion rate
              </li>
            </ul>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>

          {/* IUL - Most Popular */}
          <div className="rounded-xl bg-gradient-to-b from-purple-600/20 to-purple-800/20 border-2 border-purple-400 p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">IUL</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">$30</div>
              <div className="text-gray-400 text-sm">per lead</div>
            </div>
            
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Ages 25-65
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                $200-1000/month premium
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Tax-free retirement focus
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Highest commissions
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Premium quality scoring
              </li>
            </ul>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>

          {/* Annuity */}
          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Annuity</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">$35</div>
              <div className="text-gray-400 text-sm">per lead</div>
            </div>
            
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Ages 55+
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Retirement planning focused
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                High asset individuals
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Large premium potential
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                Elite agent priority
              </li>
            </ul>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
              Order Now
            </button>
          </div>
        </div>

        {/* Competitor Comparison */}
        <div className="bg-black/20 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Our $25-30 Pricing Destroys the Competition
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4 text-gray-300">Provider</th>
                  <th className="text-center p-4 text-gray-300">Price Range</th>
                  <th className="text-center p-4 text-gray-300">Exclusivity</th>
                  <th className="text-center p-4 text-gray-300">Conversion Rate</th>
                  <th className="text-center p-4 text-gray-300">Cost per Sale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-4 font-semibold text-purple-400">EliteLeads Pro</td>
                  <td className="p-4 text-center text-white">$25-35</td>
                  <td className="p-4 text-center text-green-400">✓ Exclusive</td>
                  <td className="p-4 text-center text-green-400">15%</td>
                  <td className="p-4 text-center text-green-400 font-semibold">$192</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">G.O.A.T Leads</td>
                  <td className="p-4 text-center text-gray-300">$4-7</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                  <td className="p-4 text-center text-red-400">2%</td>
                  <td className="p-4 text-center text-red-400">$250</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">ClosrLeads</td>
                  <td className="p-4 text-center text-gray-300">$1-125</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                  <td className="p-4 text-center text-yellow-400">3-8%</td>
                  <td className="p-4 text-center text-yellow-400">$200-400</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Others</td>
                  <td className="p-4 text-center text-gray-300">$2-50</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                  <td className="p-4 text-center text-red-400">1-5%</td>
                  <td className="p-4 text-center text-red-400">$300+</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-lg text-green-400 font-semibold">
              Lower cost per sale + Higher conversion rates = Maximum ROI
            </div>
          </div>
        </div>

        {/* Volume Pricing */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <div className="bg-white/5 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-4">Starter</h3>
            <div className="text-gray-300 mb-4">
              <div>1-10 leads/month</div>
              <div className="text-sm text-gray-400">Perfect for new agents</div>
            </div>
            <div className="text-purple-400 font-semibold">Full price per lead</div>
          </div>
          
          <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 border border-purple-400 rounded-lg p-6 text-center relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-400 text-black px-2 py-1 rounded text-xs font-bold">BEST VALUE</div>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Professional</h3>
            <div className="text-gray-300 mb-4">
              <div>11-50 leads/month</div>
              <div className="text-sm text-gray-400">Most popular tier</div>
            </div>
            <div className="text-green-400 font-semibold">5% discount</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-4">Elite</h3>
            <div className="text-gray-300 mb-4">
              <div>51+ leads/month</div>
              <div className="text-sm text-gray-400">High-volume agents</div>
            </div>
            <div className="text-green-400 font-semibold">10% discount + perks</div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Our Iron-Clad Guarantees</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-green-400 text-3xl font-bold mb-2">300%</div>
              <div className="text-white font-semibold mb-2">ROI Guarantee</div>
              <div className="text-gray-300 text-sm">If you don't achieve 300% ROI, we refund the difference</div>
            </div>
            
            <div>
              <div className="text-purple-400 text-3xl font-bold mb-2">&lt;5min</div>
              <div className="text-white font-semibold mb-2">Freshness Guarantee</div>
              <div className="text-gray-300 text-sm">Every lead delivered within 5 minutes of capture</div>
            </div>
            
            <div>
              <div className="text-blue-400 text-3xl font-bold mb-2">100%</div>
              <div className="text-white font-semibold mb-2">Exclusivity Guarantee</div>
              <div className="text-gray-300 text-sm">Your lead is never sold to anyone else, ever</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8">
            Join elite agents who are already crushing their goals with our exclusive leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/leads" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
              Browse Available Leads
            </Link>
            <button className="border border-gray-600 hover:bg-white/10 text-white px-8 py-3 rounded-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}