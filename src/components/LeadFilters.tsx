'use client';

import { useState } from 'react';
import { Search, Filter, Save, RotateCcw, Calendar, BarChart3, TrendingUp } from 'lucide-react';

interface FilterState {
  leadType: string;
  bucket: string;
  quality: string;
  language: string;
  state: string;
  status: string;
  dateRange: string;
  savedFilter: string;
}

interface LeadStats {
  newLeads: number;
  called: number;
  followUp: number;
  notBooked: number;
  noShow: number;
  sold: number;
}

export default function LeadFilters({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    leadType: 'All Types',
    bucket: 'All Buckets',
    quality: 'All',
    language: 'All',
    state: 'All States',
    status: 'All Statuses',
    dateRange: 'All Time',
    savedFilter: ''
  });

  const [stats] = useState<LeadStats>({
    newLeads: 46,
    called: 1,
    followUp: 0,
    notBooked: 0,
    noShow: 0,
    sold: 0
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      leadType: 'All Types',
      bucket: 'All Buckets',
      quality: 'All',
      language: 'All',
      state: 'All States',
      status: 'All Statuses',
      dateRange: 'All Time',
      savedFilter: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Filter className="mr-3 text-amber-400" size={24} />
            Elite Lead Intelligence
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={resetFilters}
              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-sm rounded-lg transition-all duration-200 flex items-center"
            >
              <RotateCcw className="mr-1" size={14} />
              Reset
            </button>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="text-red-400 flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            <span className="font-semibold">{stats.newLeads}</span>
            <span className="text-slate-400 ml-1">New Lead</span>
          </div>
          <div className="text-blue-400 flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            <span className="font-semibold">{stats.called}</span>
            <span className="text-slate-400 ml-1">Called</span>
          </div>
          <div className="text-yellow-400 flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <span className="font-semibold">{stats.followUp}</span>
            <span className="text-slate-400 ml-1">Follow Up</span>
          </div>
          <div className="text-green-400 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="font-semibold">{stats.sold}</span>
            <span className="text-slate-400 ml-1">Sold</span>
          </div>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        {/* Lead Type */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Lead Type</label>
          <select 
            value={filters.leadType}
            onChange={(e) => updateFilter('leadType', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All Types">All Types</option>
            <option value="IUL">IUL Premium</option>
            <option value="Final Expense">Final Expense Elite</option>
            <option value="Mortgage Protection">Mortgage Protection Pro</option>
            <option value="Trucker Insurance">Trucker Insurance Platinum</option>
          </select>
        </div>

        {/* Quality Bucket */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quality Bucket</label>
          <select 
            value={filters.bucket}
            onChange={(e) => updateFilter('bucket', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All Buckets">All Buckets</option>
            <option value="Platinum Elite">👑 Platinum Elite</option>
            <option value="Gold Premium">🥇 Gold Premium</option>
            <option value="Silver Standard">🥈 Silver Standard</option>
            <option value="Bronze Basic">🥉 Bronze Basic</option>
          </select>
        </div>

        {/* Quality Score */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quality</label>
          <select 
            value={filters.quality}
            onChange={(e) => updateFilter('quality', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All">All Quality</option>
            <option value="95-100%">🔥 Elite (95-100%)</option>
            <option value="85-94%">⭐ Premium (85-94%)</option>
            <option value="75-84%">📈 Standard (75-84%)</option>
            <option value="Below 75%">📊 Basic (&lt;75%)</option>
          </select>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Language</label>
          <select 
            value={filters.language}
            onChange={(e) => updateFilter('language', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All">All Languages</option>
            <option value="English">🇺🇸 English</option>
            <option value="Spanish">🇪🇸 Spanish</option>
            <option value="Bilingual">🌐 Bilingual</option>
          </select>
        </div>

        {/* State */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">State</label>
          <select 
            value={filters.state}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All States">All States</option>
            <option value="Texas">Texas</option>
            <option value="Florida">Florida</option>
            <option value="California">California</option>
            <option value="New York">New York</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Illinois">Illinois</option>
          </select>
        </div>

        {/* Lead Status */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Lead Status</label>
          <select 
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="New Lead">🔴 New Lead</option>
            <option value="Called">📞 Called</option>
            <option value="Follow Up">🔄 Follow Up</option>
            <option value="Appointment Set">📅 Appointment Set</option>
            <option value="Sold">💰 Sold</option>
            <option value="No Show">❌ No Show</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Custom Range">Custom Range</option>
          </select>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full bg-slate-800/50 border border-slate-600/50 text-white rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Saved Filters Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-slate-400 text-sm font-medium">Saved Filters:</span>
          <select 
            value={filters.savedFilter}
            onChange={(e) => updateFilter('savedFilter', e.target.value)}
            className="bg-slate-800/50 border border-slate-600/50 text-white rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="">Select a saved filter...</option>
            <option value="High Value IUL">🎯 High Value IUL Prospects</option>
            <option value="Recent Hot Leads">🔥 Recent Hot Leads</option>
            <option value="Follow Up Required">📞 Follow Up Required</option>
            <option value="Premium Tier Only">👑 Premium Tier Only</option>
            <option value="This Week Sales">💰 This Week Sales</option>
          </select>
          <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-lg transition-all duration-200 flex items-center">
            <Save className="mr-1" size={14} />
            Save Current Filter
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <div className="flex items-center">
            <BarChart3 className="mr-1" size={16} />
            <span>Performance Analytics</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="mr-1" size={16} />
            <span>18.3% Close Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}