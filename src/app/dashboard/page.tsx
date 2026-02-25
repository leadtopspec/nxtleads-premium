import Link from "next/link";

export default function DashboardPage() {
  const recentLeads = [
    { id: 1, name: "Michael Chen", purchased: "2 hours ago", status: "Contacted", conversion: "In Progress" },
    { id: 2, name: "Sarah Martinez", purchased: "4 hours ago", status: "Appointment Set", conversion: "High Probability" },
    { id: 3, name: "Robert Johnson", purchased: "6 hours ago", status: "Quote Sent", conversion: "Pending" },
    { id: 4, name: "Jennifer Walsh", purchased: "1 day ago", status: "Closed Won", conversion: "Closed" },
  ];

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
            <Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <Link href="/dashboard" className="text-purple-400">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-white">Welcome, <span className="text-purple-400">Agent Mike</span></div>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">Agent Dashboard</h1>
          <p className="text-gray-300">Track your performance and manage your elite leads</p>
        </div>

        {/* Key Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">This Month</div>
              <div className="text-green-400">📈</div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">47</div>
            <div className="text-gray-300 text-sm">Leads Purchased</div>
          </div>
          
          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Conversion Rate</div>
              <div className="text-purple-400">🎯</div>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">17.2%</div>
            <div className="text-gray-300 text-sm">Above average (15%)</div>
          </div>
          
          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Revenue</div>
              <div className="text-green-400">💰</div>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">$23,450</div>
            <div className="text-gray-300 text-sm">This month</div>
          </div>
          
          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">ROI</div>
              <div className="text-blue-400">📊</div>
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1">387%</div>
            <div className="text-gray-300 text-sm">Beat 300% guarantee!</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
              <h2 className="mb-6 text-xl font-bold text-white">Recent Lead Activity</h2>
              
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between border-b border-gray-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{lead.name}</div>
                        <div className="text-gray-400 text-sm">Purchased {lead.purchased}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white">{lead.status}</div>
                      <div className={`text-sm ${
                        lead.conversion === 'Closed' ? 'text-green-400' :
                        lead.conversion === 'High Probability' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                        {lead.conversion}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/leads" className="text-purple-400 hover:text-purple-300">
                  View all leads →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions & Performance */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link href="/leads" className="block w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-3 text-center text-white">
                  Browse New Leads
                </Link>
                <button className="w-full rounded-lg border border-gray-600 hover:bg-white/10 px-4 py-3 text-white">
                  Request Success Manager
                </button>
                <button className="w-full rounded-lg border border-gray-600 hover:bg-white/10 px-4 py-3 text-white">
                  Download Lead Reports
                </button>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="rounded-lg bg-white/5 backdrop-blur-sm p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Performance Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">Monthly Goal</span>
                    <span className="text-white text-sm">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">ROI Target</span>
                    <span className="text-green-400 text-sm">129%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="text-green-400 text-sm font-semibold">🎉 Congratulations!</div>
                  <div className="text-green-300 text-xs">You've exceeded your ROI guarantee by 87 percentage points!</div>
                </div>
              </div>
            </div>

            {/* Success Manager */}
            <div className="rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Williams</div>
                  <div className="text-gray-300 text-sm">Your Success Manager</div>
                </div>
              </div>
              
              <div className="text-gray-300 text-sm mb-4">
                "Great work this month, Mike! Your conversion rate is above average. Let's discuss targeting strategies for next month."
              </div>
              
              <button className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white text-sm">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}