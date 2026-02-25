import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-white">
            Elite<span className="text-purple-400">Leads</span> Pro
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <Link href="#leads" className="text-gray-300 hover:text-white">Browse Leads</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
          <button className="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700">
            Agent Portal
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-600/20 px-4 py-2 text-purple-300">
            🔥 Elite Agents Only • Application Required
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Elite Insurance Leads for
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Elite Agents</span>
          </h1>
          
          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            $25-30/Lead. 300% ROI Guarantee. Exclusive Access Only.
          </p>

          <div className="mb-12 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <button className="w-full rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white hover:bg-purple-700 md:w-auto">
              Apply for Elite Access
            </button>
            <button className="w-full rounded-lg border border-gray-600 px-8 py-4 text-lg text-white hover:bg-white/10 md:w-auto">
              Browse Lead Examples
            </button>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">$847K</div>
              <div className="text-gray-400">Elite agents earned today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">312%</div>
              <div className="text-gray-400">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">&lt;5min</div>
              <div className="text-gray-400">Lead freshness guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="bg-black/30 px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Why Elite Agents Choose Us Over the Competition
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg bg-white/5 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="p-4 text-left text-white">Feature</th>
                  <th className="p-4 text-center text-purple-400">EliteLeads Pro</th>
                  <th className="p-4 text-center text-gray-400">G.O.A.T Leads</th>
                  <th className="p-4 text-center text-gray-400">ClosrLeads</th>
                  <th className="p-4 text-center text-gray-400">Others</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">Lead Exclusivity</td>
                  <td className="p-4 text-center text-green-400">✓ Guaranteed Exclusive</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                  <td className="p-4 text-center text-red-400">✗ Shared</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">Freshness</td>
                  <td className="p-4 text-center text-green-400">&lt; 5 minutes</td>
                  <td className="p-4 text-center text-yellow-400">60 seconds claimed</td>
                  <td className="p-4 text-center text-yellow-400">Real-time claimed</td>
                  <td className="p-4 text-center text-red-400">Hours/Days</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">ROI Guarantee</td>
                  <td className="p-4 text-center text-green-400">✓ 300% or refund</td>
                  <td className="p-4 text-center text-red-400">✗ None</td>
                  <td className="p-4 text-center text-yellow-400">Quality guarantee only</td>
                  <td className="p-4 text-center text-red-400">✗ None</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4 text-gray-300">Price per Lead</td>
                  <td className="p-4 text-center text-purple-400">$25-30</td>
                  <td className="p-4 text-center text-gray-400">$4-7</td>
                  <td className="p-4 text-center text-gray-400">$1-125</td>
                  <td className="p-4 text-center text-gray-400">$2-50</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Personal Success Manager</td>
                  <td className="p-4 text-center text-green-400">✓ Dedicated</td>
                  <td className="p-4 text-center text-red-400">✗ None</td>
                  <td className="p-4 text-center text-yellow-400">24/7 chat only</td>
                  <td className="p-4 text-center text-red-400">✗ None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Premium Features Competitors Can't Match
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">🎯</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Exclusive Access</h3>
              <p className="text-gray-300">
                Every lead is sold to one agent only. No competition, no dilution, no sharing.
              </p>
            </div>
            
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">⚡</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Lightning Fast</h3>
              <p className="text-gray-300">
                Leads delivered within 5 minutes of capture. Strike while interest is hottest.
              </p>
            </div>
            
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">🏆</div>
              <h3 className="mb-3 text-xl font-semibold text-white">ROI Guarantee</h3>
              <p className="text-gray-300">
                300% ROI guarantee or your money back. We stand behind our results.
              </p>
            </div>
            
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">📊</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Quality Scoring</h3>
              <p className="text-gray-300">
                AI-powered lead scoring shows conversion probability before you buy.
              </p>
            </div>
            
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">🤝</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Success Manager</h3>
              <p className="text-gray-300">
                Dedicated success manager helps optimize your conversion rates.
              </p>
            </div>
            
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 text-purple-400">📱</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Mobile Optimized</h3>
              <p className="text-gray-300">
                Full mobile experience lets you manage leads on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="bg-purple-900/20 px-6 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            ROI Calculator: Premium vs. Commodity
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-6">
              <h3 className="mb-4 text-xl font-semibold text-red-400">Commodity Leads</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Cost per lead:</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shared with:</span>
                  <span>5+ agents</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion rate:</span>
                  <span>2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads needed for 1 sale:</span>
                  <span>50 leads</span>
                </div>
                <div className="flex justify-between border-t border-red-500/30 pt-3 font-semibold">
                  <span>Cost per sale:</span>
                  <span>$250</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-green-900/20 border border-green-500/30 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-400">Elite Exclusive Leads</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Cost per lead:</span>
                  <span>$27.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Shared with:</span>
                  <span>0 agents (exclusive)</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion rate:</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Leads needed for 1 sale:</span>
                  <span>7 leads</span>
                </div>
                <div className="flex justify-between border-t border-green-500/30 pt-3 font-semibold">
                  <span>Cost per sale:</span>
                  <span>$192.50</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-2xl font-bold text-green-400">
              Save $57.50 per sale + 7x faster closing
            </div>
            <p className="mt-2 text-gray-300">
              Premium leads close faster and cost less per conversion
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Ready to Join Elite Agents?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Application required. Not all agents qualify for our exclusive program.
          </p>
          <button className="rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white hover:bg-purple-700">
            Apply for Elite Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 px-6 py-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2026 EliteLeads Pro. Elite agents deserve elite leads.</p>
        </div>
      </footer>
    </div>
  );
}
