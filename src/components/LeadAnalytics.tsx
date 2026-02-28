'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Clock, Crown, Filter, Calendar, Download } from 'lucide-react';

interface AnalyticsData {
  totalLeads: number;
  revenue: number;
  conversionRate: number;
  averageValue: number;
  statusBreakdown: {
    newLeads: number;
    called: number;
    followUp: number;
    notBooked: number;
    noShow: number;
    sold: number;
  };
  qualityDistribution: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  hourlyActivity: number[];
  topStates: Array<{ state: string; count: number; revenue: number }>;
}

export default function LeadAnalytics() {
  const [timeframe, setTimeframe] = useState('This Month');
  
  const [analytics] = useState<AnalyticsData>({
    totalLeads: 1247,
    revenue: 156750,
    conversionRate: 18.3,
    averageValue: 125.75,
    statusBreakdown: {
      newLeads: 46,
      called: 1,
      followUp: 12,
      notBooked: 8,
      noShow: 3,
      sold: 15
    },
    qualityDistribution: {
      platinum: 23,
      gold: 187,
      silver: 298,
      bronze: 142
    },
    hourlyActivity: [2, 4, 1, 0, 0, 3, 8, 15, 22, 18, 24, 19, 16, 21, 18, 14, 12, 8, 6, 4, 3, 2, 1, 1],
    topStates: [
      { state: 'Texas', count: 234, revenue: 28950 },
      { state: 'Florida', count: 189, revenue: 24780 },
      { state: 'California', count: 156, revenue: 22100 },
      { state: 'New York', count: 134, revenue: 19540 },
      { state: 'Illinois', count: 98, revenue: 14250 }
    ]
  });

  const maxHourlyActivity = Math.max(...analytics.hourlyActivity);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="mr-3 text-amber-400" size={28} />
            Premium Analytics Intelligence
          </h2>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
            Elite Tier
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="This Year">This Year</option>
          </select>
          
          <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white text-sm rounded-lg transition-all flex items-center border border-slate-600/50">
            <Download className="mr-2" size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <DollarSign className="text-emerald-400" size={24} />
            </div>
            <span className="text-emerald-400 text-sm font-medium">+23.5%</span>
          </div>
          <div className="space-y-1">
            <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
            <p className="text-white text-2xl font-bold">${analytics.revenue.toLocaleString()}</p>
            <p className="text-emerald-300 text-xs">Premium tier performance</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="text-blue-400" size={24} />
            </div>
            <span className="text-blue-400 text-sm font-medium">+12.3%</span>
          </div>
          <div className="space-y-1">
            <p className="text-blue-100 text-sm font-medium">Total Leads</p>
            <p className="text-white text-2xl font-bold">{analytics.totalLeads.toLocaleString()}</p>
            <p className="text-blue-300 text-xs">High-quality prospects</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <TrendingUp className="text-amber-400" size={24} />
            </div>
            <span className="text-amber-400 text-sm font-medium">+8.2%</span>
          </div>
          <div className="space-y-1">
            <p className="text-amber-100 text-sm font-medium">Conversion Rate</p>
            <p className="text-white text-2xl font-bold">{analytics.conversionRate}%</p>
            <p className="text-amber-300 text-xs">vs 3% industry avg</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Crown className="text-purple-400" size={24} />
            </div>
            <span className="text-purple-400 text-sm font-medium">+15.7%</span>
          </div>
          <div className="space-y-1">
            <p className="text-purple-100 text-sm font-medium">Avg Lead Value</p>
            <p className="text-white text-2xl font-bold">${analytics.averageValue}</p>
            <p className="text-purple-300 text-xs">Premium positioning</p>
          </div>
        </div>
      </div>

      {/* Status Breakdown & Quality Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Pipeline */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Filter className="mr-2 text-slate-400" size={20} />
            Lead Status Pipeline
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.statusBreakdown).map(([status, count]) => {
              const percentage = (count / Object.values(analytics.statusBreakdown).reduce((a, b) => a + b, 0)) * 100;
              const colors = {
                newLeads: 'bg-red-500',
                called: 'bg-blue-500',
                followUp: 'bg-yellow-500',
                notBooked: 'bg-orange-500',
                noShow: 'bg-red-400',
                sold: 'bg-green-500'
              };
              
              const labels = {
                newLeads: '🔴 New Lead',
                called: '📞 Called',
                followUp: '🔄 Follow Up',
                notBooked: '❌ Not Booked',
                noShow: '🚫 No Show',
                sold: '💰 Sold'
              };

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="text-slate-300 text-sm font-medium w-24">
                        {labels[status as keyof typeof labels]}
                      </span>
                      <div className="flex-1 bg-slate-700/50 rounded-full h-2 relative overflow-hidden">
                        <div 
                          className={`${colors[status as keyof typeof colors]} h-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold min-w-[2rem] text-right">{count}</span>
                      <span className="text-slate-400 text-xs min-w-[3rem] text-right">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Distribution */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Crown className="mr-2 text-amber-400" size={20} />
            Quality Distribution
          </h3>
          <div className="space-y-4">
            {Object.entries(analytics.qualityDistribution).map(([tier, count]) => {
              const total = Object.values(analytics.qualityDistribution).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              
              const tierConfig = {
                platinum: { color: 'bg-cyan-400', label: '👑 Platinum Elite', textColor: 'text-cyan-300' },
                gold: { color: 'bg-amber-400', label: '🥇 Gold Premium', textColor: 'text-amber-300' },
                silver: { color: 'bg-slate-400', label: '🥈 Silver Standard', textColor: 'text-slate-300' },
                bronze: { color: 'bg-orange-400', label: '🥉 Bronze Basic', textColor: 'text-orange-300' }
              };

              const config = tierConfig[tier as keyof typeof tierConfig];

              return (
                <div key={tier} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${config.textColor}`}>
                      {config.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{count}</span>
                      <span className="text-slate-400 text-xs">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${config.color} h-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hourly Activity Heatmap */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Clock className="mr-2 text-blue-400" size={20} />
          24-Hour Activity Heatmap
        </h3>
        <div className="flex items-end space-x-1 h-32">
          {analytics.hourlyActivity.map((activity, hour) => {
            const height = (activity / maxHourlyActivity) * 100;
            const intensity = activity / maxHourlyActivity;
            
            return (
              <div key={hour} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all duration-300 hover:from-blue-500 hover:to-cyan-300 relative group"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {hour}:00 - {activity} leads
                  </div>
                </div>
                <span className="text-slate-400 text-xs mt-1">
                  {hour.toString().padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performing States */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-400" size={20} />
          Top Performing States
        </h3>
        <div className="space-y-3">
          {analytics.topStates.map((state, index) => (
            <div key={state.state} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="text-white font-semibold">{state.state}</p>
                  <p className="text-slate-400 text-sm">{state.count} leads</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">${state.revenue.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">${(state.revenue / state.count).toFixed(0)}/lead</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}