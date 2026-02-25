import Link from "next/link";

const sampleLeads = [
  {
    id: 1,
    name: "Michael Chen",
    age: 38,
    location: "Denver, CO",
    premium: "$200-400/month",
    timing: "Within 2 weeks",
    score: 95,
    type: "IUL",
    verified: true,
    price: "$28.00"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    age: 45,
    location: "Austin, TX",
    premium: "$500-1000/month",
    timing: "Next 30 days",
    score: 98,
    type: "Life Insurance",
    verified: true,
    price: "$32.00"
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 62,
    location: "Tampa, FL",
    premium: "$50-100/month",
    timing: "Immediate coverage needed",
    score: 89,
    type: "Final Expense",
    verified: true,
    price: "$25.00"
  },
  {
    id: 4,
    name: "Jennifer Walsh",
    age: 34,
    location: "Seattle, WA",
    premium: "$300-600/month",
    timing: "Within 1 week",
    score: 92,
    type: "Mortgage Protection",
    verified: true,
    price: "$30.00"
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    age: 41,
    location: "Phoenix, AZ",
    premium: "$150-300/month",
    timing: "Within 3 weeks",
    score: 87,
    type: "Term Life",
    verified: true,
    price: "$26.00"
  }
];

export default function LeadsPage() {
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
            <Link href="/leads" className="text-purple-400">Browse Leads</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
          <button className="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700">
            Agent Portal
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-white">Premium Lead Marketplace</h1>
          <p className="text-gray-300">
            Exclusive leads available now. Each lead sold to one agent only.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="rounded-lg bg-white/10 px-4 py-2 text-white border border-gray-600">
            <option>All States</option>
            <option>California</option>
            <option>Texas</option>
            <option>Florida</option>
            <option>New York</option>
          </select>
          
          <select className="rounded-lg bg-white/10 px-4 py-2 text-white border border-gray-600">
            <option>All Types</option>
            <option>Final Expense</option>
            <option>IUL</option>
            <option>Term Life</option>
            <option>Mortgage Protection</option>
          </select>
          
          <select className="rounded-lg bg-white/10 px-4 py-2 text-white border border-gray-600">
            <option>All Ages</option>
            <option>25-35</option>
            <option>36-50</option>
            <option>51-65</option>
            <option>65+</option>
          </select>
          
          <select className="rounded-lg bg-white/10 px-4 py-2 text-white border border-gray-600">
            <option>Quality Score: All</option>
            <option>95+</option>
            <option>90+</option>
            <option>85+</option>
          </select>
        </div>

        {/* Live Status */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-green-400 text-sm">Live • 5 new leads in the last hour</span>
        </div>

        {/* Leads Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleLeads.map((lead) => (
            <div key={lead.id} className="rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
              {/* Lead Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{lead.name}</div>
                    <div className="text-gray-400 text-sm">{lead.location}</div>
                  </div>
                </div>
                {lead.verified && (
                  <div className="flex items-center gap-1 bg-green-600/20 px-2 py-1 rounded text-green-400 text-xs">
                    ✓ Verified
                  </div>
                )}
              </div>

              {/* Lead Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Age:</span>
                  <span className="text-white">{lead.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Premium Budget:</span>
                  <span className="text-white">{lead.premium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{lead.timing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-purple-400">{lead.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quality Score:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold">{lead.score}</span>
                    <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${
                      lead.score >= 95 ? 'from-green-500 to-green-400' :
                      lead.score >= 90 ? 'from-yellow-500 to-yellow-400' :
                      'from-orange-500 to-orange-400'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Pricing and CTA */}
              <div className="border-t border-gray-600 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{lead.price}</div>
                    <div className="text-gray-400 text-sm">Exclusive Lead</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-sm">Est. ROI</div>
                    <div className="text-green-400 font-semibold">312%</div>
                  </div>
                </div>
                
                <button className="w-full rounded-lg bg-purple-600 py-2 text-white hover:bg-purple-700 transition-colors">
                  Purchase Lead
                </button>
                
                <div className="mt-2 text-center text-xs text-gray-400">
                  ⚡ Delivered instantly • 🎯 Exclusive to you
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="rounded-lg border border-gray-600 px-8 py-3 text-white hover:bg-white/10">
            Load More Leads
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 text-center">
          <div className="rounded-lg bg-white/5 p-6">
            <div className="text-2xl font-bold text-purple-400">127</div>
            <div className="text-gray-400">Leads available today</div>
          </div>
          <div className="rounded-lg bg-white/5 p-6">
            <div className="text-2xl font-bold text-green-400">89%</div>
            <div className="text-gray-400">Average conversion rate</div>
          </div>
          <div className="rounded-lg bg-white/5 p-6">
            <div className="text-2xl font-bold text-blue-400">4.2min</div>
            <div className="text-gray-400">Average lead age</div>
          </div>
        </div>
      </div>
    </div>
  );
}