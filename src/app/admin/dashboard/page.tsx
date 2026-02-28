'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, Users, MessageSquare, Clock, TrendingUp, 
  Eye, CheckCircle, X, RefreshCw, LogOut, Bell,
  UserCheck, UserX, Mail, Phone, Building, Award
} from "lucide-react";

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  years_experience: string;
  monthly_revenue: string;
  specialties: string[];
  status: string;
  qualification_score: number;
  created_at: string;
}

interface WaitlistMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_experience: string;
  current_revenue: string;
  position: number;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  priority: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [applications, setApplications] = useState<Application[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistMember[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalWaitlist: 0,
    totalContacts: 0,
    unreadContacts: 0
  });

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('nxt-admin-token');
    const user = localStorage.getItem('nxt-admin-user');
    
    if (!token || !user) {
      router.push('/admin/login');
      return;
    }

    try {
      const adminData = JSON.parse(user);
      setAdminUser(adminData);
      loadDashboardData();
    } catch (error) {
      console.error('Invalid admin session');
      router.push('/admin/login');
    }
  }, [router]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    // For now, use mock data since we don't have Supabase connected
    // In production, these would be API calls to your backend
    
    const mockApplications: Application[] = [
      {
        id: '1',
        full_name: 'John Smith',
        email: 'john@insurance.com',
        phone: '(555) 123-4567',
        company_name: 'Smith Insurance Agency',
        years_experience: '5-10',
        monthly_revenue: '15k-30k',
        specialties: ['IUL', 'Final Expense'],
        status: 'pending_review',
        qualification_score: 85,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        full_name: 'Sarah Johnson',
        email: 'sarah@lifeleads.com',
        phone: '(555) 987-6543',
        company_name: 'Life Leads Pro',
        years_experience: '10+',
        monthly_revenue: '50k+',
        specialties: ['IUL', 'Mortgage Protection', 'Annuities'],
        status: 'pending_review',
        qualification_score: 95,
        created_at: new Date().toISOString()
      }
    ];

    const mockWaitlist: WaitlistMember[] = [
      {
        id: '1',
        first_name: 'Mike',
        last_name: 'Davis',
        email: 'mike@newagent.com',
        current_experience: '1-2',
        current_revenue: '5k-10k',
        position: 23,
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];

    const mockContacts: ContactMessage[] = [
      {
        id: '1',
        name: 'Jennifer Lee',
        email: 'jennifer@topagency.com',
        phone: '(555) 456-7890',
        company: 'Top Insurance Agency',
        message: 'Interested in premium IUL leads for our top performers. What volume discounts are available?',
        priority: 'high',
        status: 'new',
        created_at: new Date().toISOString()
      }
    ];

    setApplications(mockApplications);
    setWaitlist(mockWaitlist);
    setContacts(mockContacts);
    setStats({
      totalApplications: mockApplications.length,
      pendingApplications: mockApplications.filter(app => app.status === 'pending_review').length,
      totalWaitlist: mockWaitlist.length,
      totalContacts: mockContacts.length,
      unreadContacts: mockContacts.filter(contact => contact.status === 'new').length
    });

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('nxt-admin-token');
    localStorage.removeItem('nxt-admin-user');
    router.push('/admin/login');
  };

  const approveApplication = async (applicationId: string) => {
    // In production, this would call your API
    alert(`Application ${applicationId} approved! (Demo mode)`);
  };

  const rejectApplication = async (applicationId: string) => {
    alert(`Application ${applicationId} rejected! (Demo mode)`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Nxt Leads Admin</h1>
              <p className="text-slate-400 text-sm">Business Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-medium">{adminUser?.name}</p>
              <p className="text-slate-400 text-sm">{adminUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900/50 border-b border-slate-800 px-6 py-3">
        <div className="flex items-center gap-6">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'applications', label: 'Applications', icon: UserCheck },
            { id: 'waitlist', label: 'Waitlist', icon: Clock },
            { id: 'contacts', label: 'Contacts', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-500/20 text-red-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'applications' && stats.pendingApplications > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingApplications}
                </span>
              )}
              {tab.id === 'contacts' && stats.unreadContacts > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.unreadContacts}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Applications</p>
                    <p className="text-2xl font-bold text-white">{stats.totalApplications}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Pending Review</p>
                    <p className="text-2xl font-bold text-white">{stats.pendingApplications}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Waitlist Members</p>
                    <p className="text-2xl font-bold text-white">{stats.totalWaitlist}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Contact Messages</p>
                    <p className="text-2xl font-bold text-white">{stats.totalContacts}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{app.full_name} submitted application</p>
                      <p className="text-slate-400 text-sm">{app.email} • {app.company_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Score: {app.qualification_score}</p>
                      <p className="text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Elite Agent Applications</h2>
              <button
                onClick={loadDashboardData}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="glass rounded-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{app.full_name}</h3>
                          <p className="text-slate-400">{app.company_name}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                            app.qualification_score >= 80 
                              ? 'bg-green-500/20 text-green-400'
                              : app.qualification_score >= 60
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            <Award className="w-3 h-3" />
                            Score: {app.qualification_score}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{app.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{app.years_experience} years experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">${app.monthly_revenue} monthly</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-slate-400 text-sm mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {app.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() => approveApplication(app.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Application
                      </button>
                      <button
                        onClick={() => rejectApplication(app.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject Application
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'waitlist' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Growth Waitlist</h2>
            
            <div className="glass rounded-xl p-6">
              <p className="text-slate-300 mb-4">
                {waitlist.length} members waiting for qualification
              </p>
              
              {waitlist.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">
                      {member.first_name} {member.last_name}
                    </h4>
                    <p className="text-slate-400 text-sm">{member.email}</p>
                    <p className="text-slate-500 text-xs">
                      {member.current_experience} experience • ${member.current_revenue} revenue
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">Position #{member.position}</p>
                    <p className="text-slate-400 text-sm">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
            
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="glass rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                      <p className="text-slate-400">{contact.email} • {contact.phone}</p>
                      {contact.company && (
                        <p className="text-slate-500 text-sm">{contact.company}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contact.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400'
                          : contact.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {contact.priority} priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contact.status === 'new'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
                    <p className="text-slate-300">{contact.message}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}