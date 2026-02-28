'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BillingManager from '@/components/BillingManager'
import { usePurchaseLead } from '@/hooks/usePurchaseLead'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Crown,
  Filter,
  Phone,
  Mail,
  Download,
  Star,
  Timer,
  CheckCircle2,
  Flame,
  Package,
  Eye,
  Bell,
  ChevronDown,
  Settings,
  CreditCard,
  LogOut,
  User,
  Lock,
  Shield,
  Trash2,
  AlertTriangle,
  X,
  Check,
  CheckCheck,
  Settings as SettingsIcon,
  BarChart3,
  MapPin,
  Clock
} from 'lucide-react'

const SAMPLE_LEADS = [
  {
    id: 1,
    name: 'Michael Chen',
    age: 34,
    location: 'Austin, TX',
    phone: 'Available - Tap to Reveal',
    email: 'Available - Tap to Reveal',
    type: 'IUL Elite Premium',
    tier: 'Platinum Elite',
    income: '$85K',
    status: 'Fresh',
    score: 92,
    purchased: '2 hours ago',
    notes: [],
    timeline: [
      { action: 'Lead Generated', time: '2 hours ago', status: 'success' },
      { action: 'Quality Verified', time: '2 hours ago', status: 'success' }
    ]
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    age: 41,
    location: 'Denver, CO',
    phone: 'Available - Tap to Reveal',
    email: 'Available - Tap to Reveal',
    type: 'Final Expense Elite',
    tier: 'Gold Elite',
    income: '$62K',
    status: 'Contacted',
    score: 87,
    purchased: '4 hours ago',
    notes: ['Initial call completed', 'Very interested in coverage'],
    timeline: [
      { action: 'Lead Generated', time: '4 hours ago', status: 'success' },
      { action: 'First Contact', time: '3 hours ago', status: 'success' },
      { action: 'Interest Confirmed', time: '2 hours ago', status: 'success' }
    ]
  },
  {
    id: 3,
    name: 'Robert Johnson',
    age: 45,
    location: 'Phoenix, AZ',
    phone: 'Available - Tap to Reveal',
    email: 'Available - Tap to Reveal',
    type: 'Mortgage Protection Pro',
    tier: 'Silver Elite',
    income: '$95K',
    status: 'Appointment Set',
    score: 89,
    purchased: '6 hours ago',
    notes: ['Appointment scheduled for tomorrow', 'Prefers evening calls'],
    timeline: [
      { action: 'Lead Generated', time: '6 hours ago', status: 'success' },
      { action: 'Qualification Call', time: '5 hours ago', status: 'success' },
      { action: 'Appointment Scheduled', time: '4 hours ago', status: 'success' }
    ]
  }
]

const LEAD_DROPS = [
  {
    id: 'drop1',
    title: 'IUL Elite Premium Drop',
    subtitle: 'High-Income Austin Tech Workers',
    price: 45,
    originalPrice: 60,
    timeLeft: '00:23:45',
    available: 8,
    total: 15,
    tier: 'Platinum Elite',
    avgIncome: '$120K+',
    conversionRate: '22%',
    status: 'live',
    waitlist: 47
  },
  {
    id: 'drop2',
    title: 'Final Expense Elite Drop',
    subtitle: 'Colorado Seniors 55-70',
    price: 38,
    originalPrice: 50,
    timeLeft: '01:45:22',
    available: 12,
    total: 20,
    tier: 'Gold Elite',
    avgIncome: '$65K+',
    conversionRate: '18%',
    status: 'live',
    waitlist: 31
  },
  {
    id: 'drop3',
    title: 'Trucker Insurance Elite',
    subtitle: 'Next Drop Tomorrow',
    price: 42,
    originalPrice: 55,
    timeLeft: null,
    available: 0,
    total: 25,
    tier: 'Platinum Elite',
    avgIncome: '$95K+',
    conversionRate: '20%',
    status: 'upcoming',
    waitlist: 89
  }
]

const LEAD_TYPES = [
  { id: 'iul', name: 'IUL Elite Premium', price: 35 },
  { id: 'final-expense', name: 'Final Expense Elite', price: 28 },
  { id: 'mortgage-protection', name: 'Mortgage Protection Pro', price: 32 },
  { id: 'trucker-insurance', name: 'Trucker Insurance Elite', price: 35 }
]

const STORE_PACKAGES = [
  {
    id: 'trial',
    title: 'Trial Pack',
    subtitle: 'Perfect for testing',
    leads: 5,
    discountPercent: 0,
    discount: null,
    popular: false,
    features: ['Mixed lead types', 'Basic support', 'Quality verified']
  },
  {
    id: 'growth',
    title: 'Growth Pack',
    subtitle: 'Most popular choice',
    leads: 25,
    discountPercent: 13,
    discount: '13% savings',
    popular: true,
    features: ['Choose lead types', 'Priority support', 'Performance analytics', 'Quality scoring']
  },
  {
    id: 'scale',
    title: 'Scale Pack',
    subtitle: 'For serious agents',
    leads: 50,
    discountPercent: 22,
    discount: '22% savings',
    popular: false,
    features: ['Premium lead types', 'Dedicated support', 'Advanced analytics', 'Custom filtering', 'Tier filtering']
  },
  {
    id: 'elite',
    title: 'Elite Pack',
    subtitle: 'Maximum value',
    leads: 100,
    discountPercent: 31,
    discount: '31% savings',
    popular: false,
    features: ['All lead types', 'Success manager', 'Full analytics suite', 'Priority placement', 'Custom campaigns', 'Exclusive access']
  }
]

const ENHANCED_LEADS = [
  {
    id: '3034348',
    status: 'New Lead',
    name: 'Cheryl Ann Blackford',
    phone: '(920) 941-8110',
    email: 'cheryal79@gmail.com',
    state: 'Wisconsin',
    type: 'Final Expense Lead',
    quality: 'Premium',
    assigned: '01/5/26 03:50:13 PM',
    desc: 'N',
    tags: '',
    purchased: '01/5/2026',
    avatar: 'bg-green-500'
  },
  {
    id: '302791',
    status: 'New Lead', 
    name: 'Patrick Hardy',
    phone: '(920) 470-2432',
    email: 'phardy26@icloud.com',
    state: 'Wisconsin',
    type: 'Final Expense Lead',
    quality: 'Premium',
    assigned: '01/5/26 03:50:13 PM',
    desc: 'N',
    tags: '',
    purchased: '01/5/2026',
    avatar: 'bg-blue-500'
  },
  {
    id: '300341',
    status: 'New Lead',
    name: 'Myron Boyle',
    phone: '(920) 397-6784',
    email: 'mwboyle@gmail.com',
    state: 'Wisconsin',
    type: 'Final Expense Lead',
    quality: 'Premium',
    assigned: '01/5/26 03:50:13 PM',
    desc: 'N',
    tags: '',
    purchased: '01/5/2026',
    avatar: 'bg-purple-500'
  },
  {
    id: '299273',
    status: 'New Lead',
    name: 'Dawn Engel',
    phone: '(920) 615-7845',
    email: 'morningengel@gmail.com',
    state: 'Wisconsin',
    type: 'Final Expense Lead',
    quality: 'Premium',
    assigned: '01/5/26 03:50:13 PM',
    desc: 'N',
    tags: '',
    purchased: '01/5/2026',
    avatar: 'bg-orange-500'
  },
  {
    id: '300428',
    status: 'New Lead',
    name: 'Carol Tizky',
    phone: '(920) 444-0724',
    email: 'carol.tizky@gmail.com',
    state: 'Wisconsin',
    type: 'Final Expense Lead',
    quality: 'Premium',
    assigned: '01/5/26 03:50:13 PM',
    desc: 'N',
    tags: '',
    purchased: '01/5/2026',
    avatar: 'bg-cyan-500'
  }
]

export default function EliteDashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [showLeadModal, setShowLeadModal] = useState<number | null>(null)
  const [selectedLeadType, setSelectedLeadType] = useState('iul')
  const [selectedVolumeType, setSelectedVolumeType] = useState('trucker')
  const [accountBalance, setAccountBalance] = useState(1247.80)
  
  // Billing state
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [customAddAmount, setCustomAddAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa-4891')
  const [autoReloadEnabled, setAutoReloadEnabled] = useState(true)
  const [reloadAmount, setReloadAmount] = useState(500)
  const [triggerAmount, setTriggerAmount] = useState(50)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'visa-4891',
      type: 'Visa',
      last4: '4891',
      expiry: '12/26',
      isPrimary: true,
      brand: 'visa'
    },
    {
      id: 'amex-1006', 
      type: 'American Express',
      last4: '1006',
      expiry: '08/27',
      isPrimary: false,
      brand: 'amex'
    }
  ])
  const [showDeleteCardModal, setShowDeleteCardModal] = useState<string | null>(null)
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'Feb 27, 2026', desc: '5 IUL Elite Premium Leads', type: 'Lead Purchase', amount: -175, balance: 1247.80, status: 'success' },
    { id: 2, date: 'Feb 27, 2026', desc: 'Auto-reload from Visa •••• 4891', type: 'Deposit', amount: +500, balance: 1422.80, status: 'success' },
    { id: 3, date: 'Feb 26, 2026', desc: '3 Final Expense Elite Leads', type: 'Lead Purchase', amount: -105, balance: 922.80, status: 'success' },
    { id: 4, date: 'Feb 26, 2026', desc: '10 Mortgage Protection Pro', type: 'Lead Purchase', amount: -320, balance: 1027.80, status: 'success' },
    { id: 5, date: 'Feb 25, 2026', desc: 'Manual deposit from Visa •••• 4891', type: 'Deposit', amount: +1000, balance: 1347.80, status: 'success' },
    { id: 6, date: 'Feb 25, 2026', desc: '8 IUL Elite Premium Leads', type: 'Lead Purchase', amount: -280, balance: 347.80, status: 'success' },
    { id: 7, date: 'Feb 24, 2026', desc: 'Trucker Insurance Volume 250', type: 'Lead Purchase', amount: -300, balance: 627.80, status: 'success' }
  ])
  
  // Lead purchase hook
  const { purchaseLeads, loading: purchaseLoading } = usePurchaseLead()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([])
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'lead',
      title: 'New Premium Lead Available',
      message: 'IUL Elite Premium lead from Austin, TX - Score: 92',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'price',
      title: 'Price Drop Alert',
      message: 'Final Expense leads now $25 (was $28) - Limited time',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'system',
      title: 'Account Security Update',
      message: 'Your password was successfully changed',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'lead',
      title: 'Lead Conversion Success',
      message: 'Sarah Martinez (Final Expense) - Policy sold $45,000',
      time: '4 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: '5',
      type: 'report',
      title: 'Weekly Performance Report',
      message: 'Your conversion rate improved to 17.2% this week',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ])
  const [profileData, setProfileData] = useState({
    firstName: 'Jeremi',
    lastName: 'Kisinski',
    email: 'jeremi@nxtleads.com',
    phone: '(555) 123-4567',
    company: 'Elite Insurance Solutions',
    yearsExperience: '8',
    specialties: ['IUL', 'Final Expense'],
    preferredLeadTypes: ['iul', 'final-expense'],
    notifications: {
      newLeads: true,
      priceDrops: true,
      weeklyReports: true,
      marketingEmails: false
    },
    autoAssignment: {
      enabled: true,
      maxLeadsPerDay: 5,
      workingHours: {
        start: '9:00',
        end: '18:00'
      },
      workingDays: ['mon', 'tue', 'wed', 'thu', 'fri']
    }
  })

  const [accountData, setAccountData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: '30',
    deleteAccount: {
      confirmText: '',
      reason: ''
    }
  })

  const formatTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':')
    return `${hours}h ${minutes}m ${seconds}s`
  }

  // Load account balance function
  const loadAccountBalance = async () => {
    try {
      const response = await fetch('/api/billing/balance')
      const data = await response.json()
      if (data.success) {
        setAccountBalance(data.data.account_balance)
      }
    } catch (error) {
      console.error('Error loading account balance:', error)
    }
  }

  // Load account balance on mount
  useEffect(() => {
    loadAccountBalance()
  }, [])

  const selectedLeadTypeData = LEAD_TYPES.find(t => t.id === selectedLeadType)
  const basePrice = selectedLeadTypeData?.price || 35

  const calculatePackagePrice = (leads: number, discountPercent: number) => {
    const fullPrice = leads * basePrice
    const discountAmount = fullPrice * (discountPercent / 100)
    return Math.round(fullPrice - discountAmount)
  }

  const calculateDiscountedPricePerLead = (leads: number, discountPercent: number) => {
    const totalPrice = calculatePackagePrice(leads, discountPercent)
    return Math.round((totalPrice / leads) * 100) / 100
  }

  const selectedLead = SAMPLE_LEADS.find(lead => lead.id === showLeadModal)

  // Helper functions for notifications
  const unreadCount = notifications.filter(n => !n.read).length
  
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="h-4 w-4" />
      case 'price': return <DollarSign className="h-4 w-4" />
      case 'system': return <SettingsIcon className="h-4 w-4" />
      case 'report': return <TrendingUp className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400/50 bg-red-600/10'
      case 'medium': return 'border-yellow-400/50 bg-yellow-600/10'
      case 'low': return 'border-blue-400/50 bg-blue-600/10'
      default: return 'border-gray-400/50 bg-gray-600/10'
    }
  }

  // Lead selection helper functions
  const handleSelectLead = (leadId: string) => {
    setSelectedLeadIds(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  const handleSelectAllLeads = () => {
    const allLeadIds = ENHANCED_LEADS.map(lead => lead.id)
    setSelectedLeadIds(
      selectedLeadIds.length === allLeadIds.length ? [] : allLeadIds
    )
  }

  const isLeadSelected = (leadId: string) => selectedLeadIds.includes(leadId)
  const allLeadsSelected = selectedLeadIds.length === ENHANCED_LEADS.length
  const someLeadsSelected = selectedLeadIds.length > 0 && selectedLeadIds.length < ENHANCED_LEADS.length

  // CSV Export functionality
  const exportToCSV = (leads: typeof ENHANCED_LEADS, filename: string = 'leads') => {
    const headers = [
      'Lead ID', 'Status', 'Name', 'Phone', 'Email', 'State', 
      'Lead Type', 'Quality', 'Assigned Date/Time', 'Description', 'Tags', 'Purchased Date'
    ]
    
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id,
        `"${lead.status}"`,
        `"${lead.name}"`,
        lead.phone,
        lead.email,
        lead.state,
        `"${lead.type}"`,
        lead.quality,
        `"${lead.assigned}"`,
        lead.desc,
        lead.tags,
        lead.purchased
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportSelected = () => {
    const selectedLeads = ENHANCED_LEADS.filter(lead => selectedLeadIds.includes(lead.id))
    exportToCSV(selectedLeads, 'selected_leads')
  }

  const handleExportAll = () => {
    exportToCSV(ENHANCED_LEADS, 'all_leads')
  }

  const clearAllSelections = () => {
    setSelectedLeadIds([])
  }

  // Billing functions
  const addFunds = async (amount: number, paymentMethod?: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newBalance = accountBalance + amount
      setAccountBalance(newBalance)
      
      // Add transaction record
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        desc: `Manual deposit from ${paymentMethod || 'Visa •••• 4891'}`,
        type: 'Deposit' as const,
        amount: amount,
        balance: newBalance,
        status: 'success' as const
      }
      
      setTransactions(prev => [newTransaction, ...prev])
      
      alert(`✅ Successfully added $${amount} to your account! New balance: $${newBalance.toFixed(2)}`)
    } catch (error) {
      alert('❌ Error adding funds. Please try again.')
    }
  }

  const handleQuickTopUp = (amount: number) => {
    addFunds(amount)
  }

  const handleCustomAddFunds = () => {
    const amount = parseFloat(customAddAmount)
    if (isNaN(amount) || amount < 50) {
      alert('❌ Please enter a valid amount (minimum $50)')
      return
    }
    if (amount > 5000) {
      alert('❌ Maximum amount is $5,000 per transaction')
      return
    }
    
    addFunds(amount, selectedPaymentMethod)
    setCustomAddAmount('')
  }

  const exportTransactions = () => {
    const headers = ['Date', 'Description', 'Type', 'Amount', 'Balance', 'Status']
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        `"${t.desc}"`,
        t.type,
        t.amount,
        t.balance,
        t.status
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nxt-leads-transactions-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const setPrimaryCard = (cardId: string) => {
    setPaymentMethods(prev => prev.map(card => ({
      ...card,
      isPrimary: card.id === cardId
    })))
    
    const card = paymentMethods.find(c => c.id === cardId)
    alert(`✅ ${card?.type} •••• ${card?.last4} is now your primary payment method`)
  }

  const deleteCard = (cardId: string) => {
    const card = paymentMethods.find(c => c.id === cardId)
    if (card?.isPrimary) {
      alert('❌ Cannot delete primary payment method. Set another card as primary first.')
      return
    }
    
    setPaymentMethods(prev => prev.filter(c => c.id !== cardId))
    setShowDeleteCardModal(null)
    alert(`✅ ${card?.type} •••• ${card?.last4} has been removed`)
  }

  const addNewCard = (cardData: {
    number: string
    expiry: string
    cvc: string
    name: string
    setPrimary: boolean
  }) => {
    const last4 = cardData.number.slice(-4)
    const cardType = cardData.number.startsWith('4') ? 'Visa' : 
                     cardData.number.startsWith('5') ? 'Mastercard' :
                     cardData.number.startsWith('3') ? 'American Express' : 'Card'
    
    const newCard = {
      id: `card-${last4}`,
      type: cardType,
      last4,
      expiry: cardData.expiry,
      isPrimary: cardData.setPrimary,
      brand: cardType.toLowerCase().replace(' ', '')
    }
    
    if (cardData.setPrimary) {
      setPaymentMethods(prev => [
        newCard,
        ...prev.map(card => ({ ...card, isPrimary: false }))
      ])
    } else {
      setPaymentMethods(prev => [...prev, newCard])
    }
    
    alert(`✅ ${cardType} •••• ${last4} added successfully!`)
  }

  const toggleAutoReload = () => {
    setAutoReloadEnabled(!autoReloadEnabled)
    if (!autoReloadEnabled) {
      alert(`✅ Auto-reload enabled: $${reloadAmount} when balance drops below $${triggerAmount}`)
    } else {
      alert('❌ Auto-reload disabled')
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileDropdown) {
        setShowProfileDropdown(false)
      }
      if (showNotifications) {
        setShowNotifications(false)
      }
    }

    if (showProfileDropdown || showNotifications) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showProfileDropdown, showNotifications])

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      {/* Elite Header */}
      <header className="border-b border-gold-500/20 bg-navy-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <Crown className="h-8 w-8 text-gold-400" />
            Nxt <span className="text-gold-400">Leads</span> Pro
          </Link>
          <nav className="hidden space-x-8 md:flex">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`transition-colors ${
                activeTab === 'home' 
                  ? 'text-gold-400 font-semibold' 
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('leads')} 
              className={`transition-colors ${
                activeTab === 'leads' 
                  ? 'text-gold-400 font-semibold' 
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              My Leads
            </button>
            <button 
              onClick={() => setActiveTab('marketplace')} 
              className={`transition-colors ${
                activeTab === 'marketplace' 
                  ? 'text-gold-400 font-semibold' 
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              Buy Leads
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`transition-colors ${
                activeTab === 'analytics' 
                  ? 'text-gold-400 font-semibold' 
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('billing')} 
              className={`transition-colors ${
                activeTab === 'billing' 
                  ? 'text-gold-400 font-semibold' 
                  : 'text-navy-300 hover:text-white'
              }`}
            >
              Billing & Payments
            </button>
            {showProfileSettings && (
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`transition-colors ${
                  activeTab === 'settings' 
                    ? 'text-yellow-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Profile
              </button>
            )}
            {showAccountSettings && (
              <button 
                onClick={() => setActiveTab('account')} 
                className={`transition-colors ${
                  activeTab === 'account' 
                    ? 'text-yellow-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Account
              </button>
            )}
          </nav>
          <div className="flex items-center gap-4">
            {/* Account Balance */}
            <div className="hidden lg:flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-lg px-4 py-2">
              <CreditCard className="h-4 w-4 text-green-400" />
              <div className="text-right">
                <div className="text-green-400 font-semibold text-sm">${accountBalance.toFixed(2)}</div>
                <div className="text-green-300 text-xs">Account Balance</div>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotifications(!showNotifications)
                }}
                className="p-2 rounded-lg glass hover:bg-gold-400/10 transition-colors relative"
              >
                <Bell className="h-5 w-5 text-navy-300" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{unreadCount}</span>
                  </div>
                )}
              </button>
            </div>

            {/* User Profile Button */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowProfileDropdown(!showProfileDropdown)
                }}
                className="flex items-center gap-3 glass hover:bg-gold-400/10 rounded-lg p-2 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 flex items-center justify-center text-navy-950 font-bold">
                  JK
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-white font-semibold">Jeremi Kisinski</div>
                  <div className="text-gold-400 text-sm flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Elite Agent
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>



      <div className="container mx-auto px-6 py-8">

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Welcome Banner with Goals */}
            <div className="bg-gradient-to-r from-gold-600/20 to-gold-500/30 border border-gold-400/30 backdrop-blur rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Elite Agent! 👑</h1>
                  <p className="text-navy-300">You're crushing it with <span className="text-gold-400 font-semibold">17.2% conversion rate</span> - 15% above industry average!</p>
                </div>
                <div className="text-right">
                  <p className="text-navy-300 text-sm">Next commission payment</p>
                  <p className="text-2xl font-bold text-green-400">12 days</p>
                  <p className="text-gold-400 text-sm font-medium">~$4,200 expected</p>
                </div>
              </div>
              
              {/* Daily Goal Progress */}
              <div className="mt-6 bg-black/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Daily Revenue Goal</span>
                  <span className="text-gold-400 font-bold">$850 / $1,000</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-gold-400 to-gold-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-navy-300 text-sm mt-1">🔥 Only $150 away from beating your daily record!</p>
              </div>
            </div>

            {/* Enhanced Elite Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-navy-400 text-sm">This Month</p>
                    <p className="text-3xl font-bold text-white">47</p>
                    <p className="text-navy-300 text-sm">Leads Purchased</p>
                    <p className="text-green-400 text-xs mt-1">↗ +23% vs last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-navy-400 text-sm">Conversion Rate</p>
                    <p className="text-3xl font-bold text-green-400">17.2%</p>
                    <p className="text-navy-300 text-sm">Elite Tier (Top 5%)</p>
                    <p className="text-gold-400 text-xs mt-1">🏆 Elite Agent Badge</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-navy-400 text-sm">Revenue</p>
                    <p className="text-3xl font-bold text-green-400">$23,450</p>
                    <p className="text-navy-300 text-sm">This month</p>
                    <p className="text-green-400 text-xs mt-1">Goal: $25K (94%)</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-navy-400 text-sm">ROI</p>
                    <p className="text-3xl font-bold text-gold-400">387%</p>
                    <p className="text-navy-300 text-sm">Elite performance!</p>
                    <p className="text-gold-400 text-xs mt-1">Rank #3 this month</p>
                  </div>
                  <Crown className="h-8 w-8 text-gold-400" />
                </div>
              </div>
            </div>

            {/* Live Activity Feed & Market Intelligence */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Live Activity Feed */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Live Elite Network
                  </h3>
                  <span className="text-navy-400 text-xs">Updated 12s ago</span>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm">JS</div>
                      <div>
                        <p className="text-white text-sm font-medium">Agent John S. just closed</p>
                        <p className="text-green-400 text-xs">IUL Elite Premium • $2,400 commission</p>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">🎉</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-black font-bold text-sm">MR</div>
                      <div>
                        <p className="text-white text-sm font-medium">Agent Maria R. bought</p>
                        <p className="text-blue-400 text-xs">5x Mortgage Protection leads</p>
                      </div>
                    </div>
                    <div className="text-blue-400 font-bold">🛒</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-black font-bold text-sm">DT</div>
                      <div>
                        <p className="text-white text-sm font-medium">Agent David T. booked appointment</p>
                        <p className="text-orange-400 text-xs">Final Expense Elite • High probability</p>
                      </div>
                    </div>
                    <div className="text-orange-400 font-bold">📅</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-900/20 border border-purple-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-black font-bold text-sm">LW</div>
                      <div>
                        <p className="text-white text-sm font-medium">Agent Lisa W. earned badge</p>
                        <p className="text-purple-400 text-xs">25 Leads Milestone • Elite Status</p>
                      </div>
                    </div>
                    <div className="text-purple-400 font-bold">🏆</div>
                  </div>
                </div>
              </div>

              {/* Market Intelligence */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                  Market Intelligence
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-400 font-medium text-sm">🔥 Hot Alert</span>
                      <span className="text-red-400 text-xs">Expires in 2h</span>
                    </div>
                    <p className="text-white text-sm">Texas IUL leads selling 40% faster today</p>
                    <p className="text-navy-300 text-xs">13 available • Avg close rate: 22%</p>
                  </div>

                  <div className="bg-gold-900/20 border border-gold-400/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold-400 font-medium text-sm">💡 Trending</span>
                      <span className="text-green-400 text-xs">↗ +15%</span>
                    </div>
                    <p className="text-white text-sm">Mortgage Protection demand surge</p>
                    <p className="text-navy-300 text-xs">Best ROI opportunity this week</p>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium text-sm">📈 Performance</span>
                      <span className="text-blue-400 text-xs">Elite Tier</span>
                    </div>
                    <p className="text-white text-sm">Your conversion rate: Top 5% nationwide</p>
                    <p className="text-navy-300 text-xs">Recommended: Premium IUL leads</p>
                  </div>

                  <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400 font-medium text-sm">🎯 Recommendation</span>
                      <span className="text-green-400 text-xs">AI Optimized</span>
                    </div>
                    <p className="text-white text-sm">Best buying time: 2-4 PM CST</p>
                    <p className="text-navy-300 text-xs">Historical data: 28% higher close rates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-gold-600/20 to-orange-600/20 border border-gold-400/30 backdrop-blur rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-400" />
                      Live Drops
                    </h3>
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      LIVE
                    </div>
                  </div>
                  <p className="text-navy-300 text-sm mb-1">Premium leads dropping now</p>
                  <p className="text-orange-400 text-xs font-medium">🔥 Next drop: Texas IUL in 47 minutes</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" onClick={() => setActiveTab('marketplace')}>
                  View Live Drops
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 backdrop-blur rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-400" />
                      Store Packages
                    </h3>
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      24/7
                    </div>
                  </div>
                  <p className="text-navy-300 text-sm mb-1">Volume discounts available</p>
                  <p className="text-cyan-400 text-xs font-medium">💰 Save up to 30% on bulk orders</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" onClick={() => setActiveTab('marketplace')}>
                  Browse Store
                </Button>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 backdrop-blur rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      My Leads
                    </h3>
                    <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      47
                    </div>
                  </div>
                  <p className="text-navy-300 text-sm mb-1">Active lead portfolio</p>
                  <p className="text-pink-400 text-xs font-medium">⚡ 3 hot leads need follow-up</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" onClick={() => setActiveTab('leads')}>
                  Manage Leads
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* My Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Enhanced Header with Statistics */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Elite Lead Management</h2>
                <p className="text-gray-400">Manage your premium lead portfolio</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleExportAll}
                  className="border-green-400 text-green-400 hover:bg-green-400/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export All CSV
                </Button>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>

            {/* Lead Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-6">
              <div className="bg-red-900/20 backdrop-blur border border-red-400/30 rounded-lg p-4 text-center">
                <div className="text-red-400 text-2xl font-bold">46</div>
                <div className="text-red-300 text-sm">New Lead</div>
              </div>
              <div className="bg-blue-900/20 backdrop-blur border border-blue-400/30 rounded-lg p-4 text-center">
                <div className="text-blue-400 text-2xl font-bold">1</div>
                <div className="text-blue-300 text-sm">Called</div>
              </div>
              <div className="bg-yellow-900/20 backdrop-blur border border-yellow-400/30 rounded-lg p-4 text-center">
                <div className="text-yellow-400 text-2xl font-bold">0</div>
                <div className="text-yellow-300 text-sm">Follow Up</div>
              </div>
              <div className="bg-green-900/20 backdrop-blur border border-green-400/30 rounded-lg p-4 text-center">
                <div className="text-green-400 text-2xl font-bold">0</div>
                <div className="text-green-300 text-sm">Apt Booked</div>
              </div>
              <div className="bg-purple-900/20 backdrop-blur border border-purple-400/30 rounded-lg p-4 text-center">
                <div className="text-purple-400 text-2xl font-bold">0</div>
                <div className="text-purple-300 text-sm">No Show</div>
              </div>
              <div className="bg-emerald-900/20 backdrop-blur border border-emerald-400/30 rounded-lg p-4 text-center">
                <div className="text-emerald-400 text-2xl font-bold">0</div>
                <div className="text-emerald-300 text-sm">Sold</div>
              </div>
            </div>

            {/* Advanced Filters Row */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
              <div className="grid gap-4 md:grid-cols-6">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Lead Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>All Types</option>
                    <option>IUL Elite Premium</option>
                    <option>Final Expense Elite</option>
                    <option>Mortgage Protection Pro</option>
                    <option>Trucker Insurance Elite</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Quality Tier</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>All Tiers</option>
                    <option>Platinum Elite</option>
                    <option>Gold Elite</option>
                    <option>Silver Elite</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Language</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>All</option>
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">State</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>All States</option>
                    <option>Texas</option>
                    <option>California</option>
                    <option>Florida</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Status</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm">
                    <option>All Statuses</option>
                    <option>New Lead</option>
                    <option>Called</option>
                    <option>Follow Up</option>
                    <option>Apt Booked</option>
                    <option>No Show</option>
                    <option>Sold</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Search</label>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400/10 font-semibold"
                >
                  Clear Filters
                </Button>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* Enhanced Leads Table */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-gray-300 font-medium">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-400 bg-white/10 text-yellow-500 focus:ring-yellow-400 focus:ring-offset-0"
                          checked={allLeadsSelected}
                          ref={(input) => {
                            if (input) input.indeterminate = someLeadsSelected
                          }}
                          onChange={handleSelectAllLeads}
                        />
                      </th>
                      <th className="text-left p-4 text-gray-300 font-medium">ID</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Lead Name</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Phone</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Email</th>
                      <th className="text-left p-4 text-gray-300 font-medium">State</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Lead Type</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Quality</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Assigned Date/Time</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Desc</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Tags</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Purchased</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENHANCED_LEADS.map((lead) => (
                      <tr key={lead.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        isLeadSelected(lead.id) ? 'bg-yellow-400/10 border-yellow-400/30' : ''
                      }`}>
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-400 bg-white/10 text-yellow-500 focus:ring-yellow-400 focus:ring-offset-0"
                            checked={isLeadSelected(lead.id)}
                            onChange={() => handleSelectLead(lead.id)}
                          />
                        </td>
                        <td className="p-4">
                          <span className="text-red-400 font-medium">{lead.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${lead.avatar}`}>
                              {lead.name.charAt(0)}
                            </div>
                            <span className="text-white font-medium">{lead.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-400" />
                            <span className="text-green-400">{lead.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-red-400" />
                            <span className="text-red-400">{lead.email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{lead.state}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{lead.type}</span>
                        </td>
                        <td className="p-4">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
                            {lead.quality}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-white text-sm">
                            <div>{lead.assigned}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-red-400">{lead.desc}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-400">{lead.tags}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white text-sm">{lead.purchased}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
                <div className="text-gray-400 text-sm">
                  Showing 1 to 5 of 47 entries
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    ‹
                  </Button>
                  <Button size="sm" className="bg-red-600 text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    5
                  </Button>
                  <span className="text-gray-400">...</span>
                  <Button variant="outline" size="sm">
                    ›
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            <div className={`backdrop-blur border rounded-lg p-4 transition-colors ${
              selectedLeadIds.length > 0 
                ? 'bg-yellow-400/10 border-yellow-400/30' 
                : 'bg-white/5 border-white/10'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`transition-colors ${
                  selectedLeadIds.length > 0 ? 'text-yellow-400' : 'text-gray-300'
                }`}>
                  <span className="font-medium">Bulk Actions:</span> 
                  {selectedLeadIds.length > 0 
                    ? ` ${selectedLeadIds.length} lead${selectedLeadIds.length > 1 ? 's' : ''} selected`
                    : ' Select leads above to perform actions'
                  }
                </div>
                <div className="flex gap-2">
                  {selectedLeadIds.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearAllSelections}
                      className="border-red-400 text-red-400 hover:bg-red-400/10 font-semibold"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All ({selectedLeadIds.length})
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={selectedLeadIds.length === 0}
                    className={selectedLeadIds.length > 0 ? 'border-green-400 text-green-400 hover:bg-green-400/10' : ''}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Selected ({selectedLeadIds.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={selectedLeadIds.length === 0}
                    className={selectedLeadIds.length > 0 ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' : ''}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Selected ({selectedLeadIds.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={selectedLeadIds.length === 0}
                    className={selectedLeadIds.length > 0 ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10' : ''}
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Change Status ({selectedLeadIds.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={selectedLeadIds.length === 0}
                    onClick={handleExportSelected}
                    className={selectedLeadIds.length > 0 ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' : ''}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected ({selectedLeadIds.length})
                  </Button>
                </div>
              </div>
              {selectedLeadIds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-yellow-400/20">
                  <div className="text-sm text-yellow-300">
                    Selected leads: {selectedLeadIds.map(id => {
                      const lead = ENHANCED_LEADS.find(l => l.id === id)
                      return lead?.name
                    }).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Revolutionary Dual Marketplace */}
        {activeTab === 'marketplace' && (
          <div className="space-y-8">
            {/* Drops Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Flame className="h-6 w-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">🔥 ELITE DROPS</h2>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">LIVE</span>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {LEAD_DROPS.map((drop) => (
                  <div key={drop.id} className={`backdrop-blur border-2 rounded-lg p-6 ${
                    drop.status === 'live' 
                      ? 'bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-400/50' 
                      : 'bg-gradient-to-br from-gray-600/20 to-gray-700/20 border-gray-400/50'
                  }`}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          drop.tier === 'Platinum Elite' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50' :
                          drop.tier === 'Gold Elite' ? 'bg-orange-400/20 text-orange-400 border-orange-400/50' :
                          'bg-gray-400/20 text-gray-400 border-gray-400/50'
                        }`}>
                          {drop.tier}
                        </span>
                        {drop.status === 'live' && (
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-red-400 text-xs font-semibold">LIVE</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-lg">{drop.title}</h3>
                      <p className="text-gray-300 text-sm">{drop.subtitle}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">${drop.price}</div>
                          <div className="text-gray-400 text-sm line-through">${drop.originalPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{drop.available}/{drop.total}</div>
                          <div className="text-gray-400 text-sm">Available</div>
                        </div>
                      </div>
                      
                      {drop.timeLeft && (
                        <div className="bg-red-900/30 rounded-lg p-3 border border-red-500/30">
                          <div className="flex items-center gap-2 text-red-400 text-sm font-semibold mb-2">
                            <Timer className="h-4 w-4" />
                            Ends in: {formatTime(drop.timeLeft)}
                          </div>
                          <div className="w-full bg-red-900/50 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all"
                              style={{ width: `${(drop.available / drop.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy-400">Avg Income:</span>
                          <span className="text-white">{drop.avgIncome}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Conv. Rate:</span>
                          <span className="text-green-400">{drop.conversionRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy-400">Wait List:</span>
                          <span className="text-gold-400">{drop.waitlist} agents</span>
                        </div>
                      </div>
                      
                      {drop.status === 'live' ? (
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold">
                          BUY NOW - ${drop.price}
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full border-navy-400 text-navy-400 hover:bg-navy-400/10">
                          Join Wait List ({drop.waitlist})
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">⚡ PREMIUM STORE</h2>
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">24/7 AVAILABLE</span>
              </div>
              
              {/* Lead Type Selector */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Select Lead Type:</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {LEAD_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedLeadType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedLeadType === type.id
                          ? 'border-blue-400 bg-blue-600/20 text-blue-400'
                          : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-blue-600 hover:bg-blue-600/10'
                      }`}
                    >
                      <div className="text-sm font-semibold">{type.name}</div>
                      <div className="text-xs opacity-75">${type.price}/lead</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {STORE_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className={`backdrop-blur border-2 rounded-lg p-6 relative flex flex-col ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/50'
                      : 'bg-gradient-to-br from-gray-600/20 to-blue-700/20 border-blue-400/30'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-lg">{pkg.title}</h3>
                      <p className="text-gray-300 text-sm">{pkg.subtitle}</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">${calculatePackagePrice(pkg.leads, pkg.discountPercent)}</div>
                          <div className="text-gray-400">{pkg.leads} leads</div>
                          <div className="text-blue-400 font-semibold">${calculateDiscountedPricePerLead(pkg.leads, pkg.discountPercent)}/lead</div>
                          {pkg.discount && (
                            <div className="text-green-400 text-sm">{pkg.discount}</div>
                          )}
                          {pkg.discountPercent > 0 && (
                            <div className="text-gray-400 text-xs line-through">Was ${pkg.leads * basePrice}</div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-400" />
                              <span className="text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button className={`w-full mt-4 ${
                        pkg.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                          : 'bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700'
                      } text-white font-semibold`}>
                        Purchase {LEAD_TYPES.find(t => t.id === selectedLeadType)?.name}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume Leads Section - Truckers & Final Expense Only */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">📦 VOLUME LEADS</h2>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">BULK PRICING</span>
              </div>

              <p className="text-navy-300 mb-8 text-lg">
                Ultra-high volume <strong className="text-gold-400">wholesale pricing</strong> for <span className="text-green-400 font-semibold">Trucker Insurance</span> and 
                <span className="text-blue-400 font-semibold"> Final Expense</span> leads. Perfect for agencies and teams.
              </p>
              
              <div className="mb-8 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-400/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Volume Lead Notice</span>
                </div>
                <p className="text-navy-300 text-sm">
                  These are <strong>lower-quality, high-volume leads</strong> designed for teams with aggressive calling schedules. 
                  Expect <strong>3-6% close rates</strong> vs 18-22% on premium leads. Price reflects quality difference.
                </p>
              </div>

              {/* Volume Lead Type Selector */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Select Volume Lead Type:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                  <button
                    onClick={() => setSelectedVolumeType('trucker')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVolumeType === 'trucker'
                        ? 'border-purple-400 bg-purple-600/20 text-purple-400'
                        : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-purple-600 hover:bg-purple-600/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6" />
                      <div className="text-left">
                        <div className="font-semibold">Trucker Insurance</div>
                        <div className="text-xs opacity-75">$0.85-1.20/lead</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedVolumeType('final-expense')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVolumeType === 'final-expense'
                        ? 'border-blue-400 bg-blue-600/20 text-blue-400'
                        : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-blue-600 hover:bg-blue-600/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6" />
                      <div className="text-left">
                        <div className="font-semibold">Final Expense</div>
                        <div className="text-xs opacity-75">$0.65-0.90/lead</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Volume Packages - Conditional Display */}

              {selectedVolumeType === 'trucker' && (
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Trucker 250 */}
                  <div className="glass border border-purple-500/30 rounded-lg p-6 relative">
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Trucker 250</h3>
                      <p className="text-navy-300 text-sm">Commercial driver leads</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$300</div>
                        <div className="text-purple-400 font-semibold">$1.20/lead</div>
                        <div className="text-navy-400 text-xs">Trucker insurance only</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          <span className="text-navy-300">250 Trucker leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          <span className="text-navy-300">Ages 35-60, $80K+ income</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          <span className="text-navy-300">4-6% expected close rate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          <span className="text-navy-300">Basic volume support</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
                        disabled={purchaseLoading}
                        onClick={async () => {
                          const result = await purchaseLeads({
                            packageType: 'volume-trucker-250',
                            leadType: 'trucker',
                            quantity: 250,
                            unitPrice: 1.20,
                            onSuccess: () => {
                              loadAccountBalance() // Refresh balance
                            },
                            onError: (error) => {
                              alert(`❌ Error: ${error}`)
                            }
                          })
                          
                          if (result.success) {
                            alert(`✅ Success! Purchased 250 Trucker leads for $300. New balance: $${result.newBalance?.toFixed(2)}`)
                          }
                        }}
                      >
                        {purchaseLoading ? 'Processing...' : 'Order Trucker 250'}
                      </Button>
                    </div>
                  </div>

                  {/* Trucker 500 - Most Popular */}
                  <div className="glass border-2 border-gold-400/50 rounded-lg p-6 relative bg-gradient-to-br from-gold-600/10 to-gold-500/20">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-4 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Trucker 500</h3>
                      <p className="text-navy-300 text-sm">Commercial driver volume</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$500</div>
                        <div className="text-gold-400 font-semibold">$1.00/lead</div>
                        <div className="text-navy-400 text-xs">Trucker insurance only</div>
                        <div className="text-green-400 text-sm font-medium">Save $100 vs 250 pack</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">500 Trucker leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">Owner-operators & fleet drivers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">4-6% expected close rate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">Priority volume support</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold">
                        Order Trucker 500
                      </Button>
                    </div>
                  </div>

                  {/* Trucker 1000 */}
                  <div className="glass border border-green-500/30 rounded-lg p-6 relative">
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Trucker 1000</h3>
                      <p className="text-navy-300 text-sm">Premium driver volume</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$850</div>
                        <div className="text-green-400 font-semibold">$0.85/lead</div>
                        <div className="text-navy-400 text-xs">Trucker insurance only</div>
                        <div className="text-green-400 text-sm font-medium">Save $150 vs 500 pack</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">1,000 Trucker leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">Owner-operators & fleet drivers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">4-6% close rate potential</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">Dedicated volume manager</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                        Order Trucker 1K
                      </Button>
                    </div>
                  </div>
                </div>
              )}


              {selectedVolumeType === 'final-expense' && (
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Final Expense 250 */}
                  <div className="glass border border-blue-500/30 rounded-lg p-6 relative">
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Final Expense 250</h3>
                      <p className="text-navy-300 text-sm">Senior coverage leads</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$225</div>
                        <div className="text-blue-400 font-semibold">$0.90/lead</div>
                        <div className="text-navy-400 text-xs">Final expense only</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          <span className="text-navy-300">250 Final Expense leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          <span className="text-navy-300">Seniors 50-75, $35K+ income</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          <span className="text-navy-300">3-5% expected close rate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          <span className="text-navy-300">Basic volume support</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold">
                        Order Final Expense 250
                      </Button>
                    </div>
                  </div>

                  {/* Final Expense 500 - Most Popular */}
                  <div className="glass border-2 border-gold-400/50 rounded-lg p-6 relative bg-gradient-to-br from-gold-600/10 to-gold-500/20">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-4 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Final Expense 500</h3>
                      <p className="text-navy-300 text-sm">Best value for seniors</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$375</div>
                        <div className="text-gold-400 font-semibold">$0.75/lead</div>
                        <div className="text-navy-400 text-xs">Final expense only</div>
                        <div className="text-green-400 text-sm font-medium">Save $75 vs 250 pack</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">500 Final Expense leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">Seniors 50-75, verified income</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">3-5% expected close rate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400" />
                          <span className="text-navy-300">Priority volume support</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold">
                        Order Final Expense 500
                      </Button>
                    </div>
                  </div>

                  {/* Final Expense 1000 */}
                  <div className="glass border border-green-500/30 rounded-lg p-6 relative">
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-xl mb-1">Final Expense 1000</h3>
                      <p className="text-navy-300 text-sm">Agency level volume</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">$650</div>
                        <div className="text-green-400 font-semibold">$0.65/lead</div>
                        <div className="text-navy-400 text-xs">Final expense only</div>
                        <div className="text-green-400 text-sm font-medium">Save $250 vs 500 pack</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">1,000 Final Expense leads</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">Verified seniors 50-75</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">3-5% close rate potential</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-navy-300">Dedicated volume manager</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                        Order Final Expense 1K
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Volume Order Instructions */}
              <div className="mt-8 glass border border-gold-500/20 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-gold-400" />
                  Volume Lead Guidelines
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-navy-900/50 rounded-lg">
                    <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      Final Expense Strategy
                    </h4>
                    <ul className="text-navy-300 text-xs space-y-1">
                      <li>• Target seniors 50-75 seeking burial coverage</li>
                      <li>• Expect 3-5% close rates with volume leads</li>
                      <li>• Best for high-volume calling operations</li>
                      <li>• Lower price point at $0.75-0.90/lead</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-navy-900/50 rounded-lg">
                    <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-400" />
                      Trucker Strategy
                    </h4>
                    <ul className="text-navy-300 text-xs space-y-1">
                      <li>• Target owner-operators & fleet drivers 35-60</li>
                      <li>• Expect 4-6% close rates with volume leads</li>
                      <li>• Higher income demographic, better conversions</li>
                      <li>• Premium pricing at $1.00-1.20/lead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Header with Time Range Selector */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-gold-400" />
                  Elite Business Intelligence
                </h2>
                <p className="text-navy-300 mt-1">Real-time performance analytics and insights</p>
              </div>
              <div className="flex items-center gap-4">
                <select className="bg-navy-800/50 border border-gold-500/20 rounded-lg px-4 py-2 text-white focus:border-gold-400 focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
                <Button className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <div className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                      ↗ +23%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">$156.8K</div>
                  <div className="text-navy-300 text-sm">Total Revenue</div>
                  <div className="text-green-400 text-xs mt-2">+$31.2K this month</div>
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Target className="h-8 w-8 text-gold-400" />
                    <div className="text-gold-400 text-sm font-medium bg-gold-400/10 px-2 py-1 rounded-full">
                      TOP 5%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">17.2%</div>
                  <div className="text-navy-300 text-sm">Conversion Rate</div>
                  <div className="text-gold-400 text-xs mt-2">Industry avg: 3.1%</div>
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div className="text-blue-400 text-sm font-medium bg-blue-400/10 px-2 py-1 rounded-full">
                      247 TOTAL
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">47</div>
                  <div className="text-navy-300 text-sm">Leads This Month</div>
                  <div className="text-blue-400 text-xs mt-2">8 closed deals</div>
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <DollarSign className="h-8 w-8 text-purple-400" />
                    <div className="text-purple-400 text-sm font-medium bg-purple-400/10 px-2 py-1 rounded-full">
                      387% ROI
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">$3,340</div>
                  <div className="text-navy-300 text-sm">Avg Deal Value</div>
                  <div className="text-purple-400 text-xs mt-2">↗ Up from $2,850</div>
                </div>
              </div>
            </div>

            {/* Revenue & Performance Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Revenue Trend Chart */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Revenue Trend (30 Days)
                  </h3>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    +42% vs last month
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { week: 'Week 1', revenue: 4200, percentage: 45 },
                    { week: 'Week 2', revenue: 7850, percentage: 85 },
                    { week: 'Week 3', revenue: 6340, percentage: 68 },
                    { week: 'Week 4', revenue: 9240, percentage: 100 }
                  ].map((week, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-navy-300">{week.week}</span>
                        <span className="text-white font-semibold">${week.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-navy-800 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${week.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">Elite Performance</span>
                  </div>
                  <p className="text-navy-300 text-sm">You're in the top 3% of agents this month with $27,630 total revenue.</p>
                </div>
              </div>

              {/* Lead Quality & Conversion Funnel */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-gold-400" />
                    Conversion Funnel
                  </h3>
                  <div className="text-gold-400 text-sm font-medium">17.2% Close Rate</div>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Leads Purchased</span>
                      <span className="text-white font-bold">47</span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-lg h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full w-full flex items-center justify-center text-white text-sm font-semibold">
                        100%
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Initial Contact</span>
                      <span className="text-white font-bold">38</span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-lg h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-full flex items-center justify-center text-white text-sm font-semibold" style={{ width: '81%' }}>
                        81%
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Qualified Interest</span>
                      <span className="text-white font-bold">24</span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-lg h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-gold-400 to-gold-500 h-full flex items-center justify-center text-white text-sm font-semibold" style={{ width: '51%' }}>
                        51%
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Appointments Set</span>
                      <span className="text-white font-bold">15</span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-lg h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full flex items-center justify-center text-white text-sm font-semibold" style={{ width: '32%' }}>
                        32%
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Closed Deals</span>
                      <span className="text-green-400 font-bold">8</span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-lg h-8 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full flex items-center justify-center text-white text-sm font-semibold" style={{ width: '17%' }}>
                        17%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Quality & Time Analysis */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Lead Quality Distribution */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-gold-400" />
                  Lead Quality Mix
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full"></div>
                      <span className="text-navy-300">Platinum Elite</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">16</div>
                      <div className="text-gold-400 text-xs">34%</div>
                    </div>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-gold-400 to-gold-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
                      <span className="text-navy-300">Gold Elite</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">21</div>
                      <div className="text-orange-400 text-xs">45%</div>
                    </div>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                      <span className="text-navy-300">Silver Elite</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">10</div>
                      <div className="text-gray-400 text-xs">21%</div>
                    </div>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gold-900/20 border border-gold-400/30 rounded-lg">
                  <div className="text-gold-400 text-sm font-semibold mb-1">Quality Score: 8.7/10</div>
                  <div className="text-navy-300 text-xs">Above industry average (6.2)</div>
                </div>
              </div>

              {/* Peak Performance Hours */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Peak Hours Analysis
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '9-11 AM', conversions: 12, rate: '32%', color: 'from-green-400 to-green-500' },
                    { time: '2-4 PM', conversions: 18, rate: '28%', color: 'from-blue-400 to-blue-500' },
                    { time: '6-8 PM', conversions: 15, rate: '24%', color: 'from-purple-400 to-purple-500' },
                    { time: '11-1 PM', conversions: 8, rate: '18%', color: 'from-orange-400 to-orange-500' }
                  ].map((hour, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-navy-300 text-sm">{hour.time}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-semibold">{hour.conversions} calls</span>
                          <span className="text-green-400 text-xs">{hour.rate}</span>
                        </div>
                      </div>
                      <div className="w-full bg-navy-800 rounded-full h-2">
                        <div className={`bg-gradient-to-r ${hour.color} h-2 rounded-full`} style={{ width: hour.rate }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                  <div className="text-blue-400 text-sm font-semibold mb-1">Best Time: 9-11 AM</div>
                  <div className="text-navy-300 text-xs">32% higher conversion rate</div>
                </div>
              </div>

              {/* State Performance */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  Top Performing States
                </h3>
                <div className="space-y-4">
                  {[
                    { state: 'Texas', leads: 12, revenue: '$18,240', rate: '25%' },
                    { state: 'Florida', leads: 8, revenue: '$14,680', rate: '22%' },
                    { state: 'California', leads: 15, revenue: '$22,350', rate: '18%' },
                    { state: 'Arizona', leads: 6, revenue: '$9,480', rate: '28%' },
                    { state: 'Colorado', leads: 6, revenue: '$8,720', rate: '20%' }
                  ].map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-navy-900/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{state.state}</div>
                        <div className="text-navy-300 text-xs">{state.leads} leads • {state.rate} close rate</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-sm">{state.revenue}</div>
                        <div className="text-navy-400 text-xs">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROI & Cost Analysis */}
            <div className="glass border border-gold-500/10 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-2xl flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-green-400" />
                  Financial Performance Analysis
                </h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">387%</div>
                    <div className="text-navy-300 text-sm">ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">$33.45</div>
                    <div className="text-navy-300 text-sm">Cost Per Lead</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">$3,340</div>
                    <div className="text-navy-300 text-sm">Avg Deal Size</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold mb-3">Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-navy-900/50 rounded-lg">
                      <span className="text-navy-300">Lead Purchases</span>
                      <div className="text-right">
                        <div className="text-white font-bold">$1,572</div>
                        <div className="text-red-400 text-xs">47 leads</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-navy-900/50 rounded-lg">
                      <span className="text-navy-300">Platform Fees</span>
                      <div className="text-right">
                        <div className="text-white font-bold">$78</div>
                        <div className="text-orange-400 text-xs">5% processing</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                      <span className="text-white font-semibold">Total Investment</span>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">$1,650</div>
                        <div className="text-green-300 text-xs">This month</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold mb-3">Return Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-navy-900/50 rounded-lg">
                      <span className="text-navy-300">Gross Revenue</span>
                      <div className="text-right">
                        <div className="text-white font-bold">$26,720</div>
                        <div className="text-green-400 text-xs">8 closed deals</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-navy-900/50 rounded-lg">
                      <span className="text-navy-300">Commission (65%)</span>
                      <div className="text-right">
                        <div className="text-white font-bold">$17,368</div>
                        <div className="text-blue-400 text-xs">After company split</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                      <span className="text-white font-semibold">Net Profit</span>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-xl">$15,718</div>
                        <div className="text-green-300 text-xs">953% profit margin</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-gold-900/30 to-green-900/30 border border-gold-400/30 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="h-6 w-6 text-gold-400" />
                  <span className="text-gold-400 font-bold text-lg">Elite Agent Status</span>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">#3</div>
                    <div className="text-navy-300 text-sm">National Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gold-400 mb-1">95th</div>
                    <div className="text-navy-300 text-sm">Percentile</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">$15.7K</div>
                    <div className="text-navy-300 text-sm">Monthly Profit</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-navy-300 text-sm">You're outperforming 95% of all agents on the platform!</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing & Payments Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-gold-400" />
                  Elite Billing & Payments
                </h2>
                <p className="text-navy-300 mt-1">Premium payment management for elite agents</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-navy-300 text-sm">Next Auto-Pay</div>
                  <div className="text-white font-semibold">March 15th</div>
                </div>
                <Button 
                  className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold"
                  onClick={() => alert('📄 Invoice downloaded to Downloads folder')}
                >
                  Download Invoice
                </Button>
              </div>
            </div>

            {/* Account Balance & Quick Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="glass border border-green-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard className="h-8 w-8 text-green-400" />
                    <div className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                      ACTIVE
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">${accountBalance.toFixed(2)}</div>
                  <div className="text-navy-300 text-sm">Available Balance</div>
                  <div className="text-green-400 text-xs mt-2">Auto-refill: $500 at $50</div>
                </div>
              </div>

              <div className="glass border border-gold-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <DollarSign className="h-8 w-8 text-gold-400" />
                    <div className="text-gold-400 text-sm font-medium bg-gold-400/10 px-2 py-1 rounded-full">
                      MTD
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">$1,572</div>
                  <div className="text-navy-300 text-sm">This Month Spent</div>
                  <div className="text-gold-400 text-xs mt-2">47 leads purchased</div>
                </div>
              </div>

              <div className="glass border border-blue-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="h-8 w-8 text-blue-400" />
                    <div className="text-blue-400 text-sm font-medium bg-blue-400/10 px-2 py-1 rounded-full">
                      ROI
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">387%</div>
                  <div className="text-navy-300 text-sm">Return on Investment</div>
                  <div className="text-blue-400 text-xs mt-2">$15.7K profit this month</div>
                </div>
              </div>

              <div className="glass border border-purple-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Crown className="h-8 w-8 text-purple-400" />
                    <div className="text-purple-400 text-sm font-medium bg-purple-400/10 px-2 py-1 rounded-full">
                      ELITE
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">$33.45</div>
                  <div className="text-navy-300 text-sm">Avg Cost Per Lead</div>
                  <div className="text-purple-400 text-xs mt-2">Premium tier pricing</div>
                </div>
              </div>
            </div>

            {/* Payment Methods & Auto-Reload */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Payment Methods */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-gold-400" />
                    Payment Methods
                  </h3>
                  <Button 
                    variant="outline" 
                    className="border-gold-400 text-gold-400 hover:bg-gold-400/10"
                    onClick={() => setShowAddCardModal(true)}
                  >
                    Add New Card
                  </Button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((card) => (
                    <div 
                      key={card.id}
                      className={`border rounded-lg p-4 ${
                        card.isPrimary 
                          ? 'bg-gradient-to-r from-gold-600/20 to-gold-500/30 border-gold-400/50' 
                          : 'bg-navy-900/50 border-navy-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            card.isPrimary ? 'bg-gold-400' : 'bg-navy-600'
                          }`}>
                            <CreditCard className={`h-6 w-6 ${
                              card.isPrimary ? 'text-navy-950' : 'text-navy-300'
                            }`} />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{card.type} •••• {card.last4}</div>
                            <div className={`text-sm ${
                              card.isPrimary ? 'text-gold-300' : 'text-navy-300'
                            }`}>
                              Expires {card.expiry}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {card.isPrimary ? (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                              PRIMARY
                            </span>
                          ) : (
                            <button 
                              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                              onClick={() => setPrimaryCard(card.id)}
                            >
                              Set Primary
                            </button>
                          )}
                          <div className="relative">
                            <button 
                              className={`p-1 ${
                                card.isPrimary ? 'text-gold-400 hover:text-gold-300' : 'text-navy-400 hover:text-navy-300'
                              }`}
                              onClick={() => setShowDeleteCardModal(card.id)}
                            >
                              <SettingsIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {card.isPrimary && (
                        <div className="text-navy-300 text-sm">
                          Auto-reload enabled • ${reloadAmount} when balance drops below ${triggerAmount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-semibold">Secure Payments</span>
                  </div>
                  <div className="text-navy-300 text-sm">
                    All payments are processed securely through Stripe. Your card information is encrypted and never stored on our servers.
                  </div>
                </div>
              </div>

              {/* Auto-Reload Settings */}
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    <Timer className="h-6 w-6 text-blue-400" />
                    Auto-Reload Settings
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={autoReloadEnabled}
                      onChange={toggleAutoReload}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
                  </label>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-navy-300 text-sm mb-3 block">Reload Amount</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[250, 500, 1000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setReloadAmount(amount)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            amount === reloadAmount
                              ? 'border-blue-400 bg-blue-600/20 text-blue-400'
                              : 'border-navy-600 bg-navy-800/30 text-navy-300 hover:border-blue-600 hover:bg-blue-600/10'
                          }`}
                        >
                          <div className="font-semibold">${amount}</div>
                          <div className="text-xs opacity-75">{Math.round(amount / 35)} leads avg</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-navy-300 text-sm mb-3 block">Trigger When Balance Drops Below</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 100, 150].map((trigger) => (
                        <button
                          key={trigger}
                          onClick={() => setTriggerAmount(trigger)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            trigger === triggerAmount
                              ? 'border-green-400 bg-green-600/20 text-green-400'
                              : 'border-navy-600 bg-navy-800/30 text-navy-300 hover:border-green-600 hover:bg-green-600/10'
                          }`}
                        >
                          <div className="font-semibold">${trigger}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-2">Current Settings</div>
                    <div className="text-navy-300 text-sm space-y-1">
                      <div>• Reload ${reloadAmount} when balance drops below ${triggerAmount}</div>
                      <div>• Using primary card (Visa •••• 4891)</div>
                      <div>• {autoReloadEnabled ? 'Next check in ~6 hours' : 'Auto-reload disabled'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Add Funds */}
            <div className="glass border border-gold-500/10 rounded-lg p-6">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-gold-400" />
                Quick Add Funds
              </h3>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-white font-semibold mb-4">Instant Top-Up</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { amount: 250, leads: '~7 leads', popular: false },
                      { amount: 500, leads: '~14 leads', popular: true },
                      { amount: 1000, leads: '~28 leads', popular: false }
                    ].map((option) => (
                      <button
                        key={option.amount}
                        onClick={() => handleQuickTopUp(option.amount)}
                        className={`p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
                          option.popular
                            ? 'border-gold-400 bg-gold-600/20 text-gold-400 relative hover:bg-gold-600/30'
                            : 'border-navy-600 bg-navy-800/30 text-navy-300 hover:border-gold-600 hover:bg-gold-600/10'
                        }`}
                      >
                        {option.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gold-400 text-navy-950 px-2 py-1 rounded text-xs font-bold">
                              POPULAR
                            </span>
                          </div>
                        )}
                        <div className="text-xl font-bold">${option.amount}</div>
                        <div className="text-xs opacity-75 mt-1">{option.leads}</div>
                      </button>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold"
                    onClick={() => handleQuickTopUp(500)}
                  >
                    Add $500 Now
                  </Button>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Custom Amount</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-navy-300 text-sm mb-2 block">Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400">$</span>
                        <input
                          type="number"
                          placeholder="500"
                          value={customAddAmount}
                          onChange={(e) => setCustomAddAmount(e.target.value)}
                          className="w-full bg-navy-800/50 border border-navy-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-navy-400 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="text-navy-400 text-xs mt-1">Minimum: $50 • Maximum: $5,000</div>
                    </div>
                    <div>
                      <label className="text-navy-300 text-sm mb-2 block">Payment Method</label>
                      <select 
                        className="w-full bg-navy-800/50 border border-navy-600 rounded-lg px-4 py-3 text-white focus:border-gold-400 focus:outline-none"
                        value={selectedPaymentMethod}
                        onChange={(e) => {
                          if (e.target.value === 'add-new') {
                            setShowAddCardModal(true)
                          } else {
                            setSelectedPaymentMethod(e.target.value)
                          }
                        }}
                      >
                        {paymentMethods.map(card => (
                          <option key={card.id} value={card.id}>
                            {card.type} •••• {card.last4} {card.isPrimary ? '(Primary)' : ''}
                          </option>
                        ))}
                        <option value="add-new">Add New Card...</option>
                      </select>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
                      onClick={handleCustomAddFunds}
                    >
                      Add Custom Amount
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="glass border border-gold-500/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-green-400" />
                  Recent Transactions
                </h3>
                <div className="flex items-center gap-3">
                  <select className="bg-navy-800/50 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-400 text-green-400 hover:bg-green-400/10"
                    onClick={exportTransactions}
                  >
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="text-left py-3 text-navy-300 font-medium">Date</th>
                      <th className="text-left py-3 text-navy-300 font-medium">Description</th>
                      <th className="text-left py-3 text-navy-300 font-medium">Type</th>
                      <th className="text-right py-3 text-navy-300 font-medium">Amount</th>
                      <th className="text-right py-3 text-navy-300 font-medium">Balance</th>
                      <th className="text-right py-3 text-navy-300 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-700">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-navy-800/30 transition-colors">
                        <td className="py-4 text-white text-sm">{transaction.date}</td>
                        <td className="py-4 text-white font-medium">{transaction.desc}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            transaction.type === 'Deposit' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className={`py-4 text-right font-semibold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                        </td>
                        <td className="py-4 text-right text-white">${transaction.balance.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            ✓ Complete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Billing Insights */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Spending Trends
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-navy-300">This Week</span>
                    <span className="text-green-400 font-semibold">$475</span>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="text-navy-400 text-xs">↗ 23% vs last week</div>
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold-400" />
                  Cost Efficiency
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-navy-300">Cost per Lead</span>
                    <span className="text-gold-400 font-semibold">$33.45</span>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className="bg-gold-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-navy-400 text-xs">15% below market avg</div>
                </div>
              </div>

              <div className="glass border border-gold-500/10 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-purple-400" />
                  Elite Benefits
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">Volume discounts unlocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">Priority lead access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">Dedicated account manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Elite Profile Settings</h2>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowProfileSettings(false)
                  setActiveTab('home')
                }}
                className="text-gray-400 hover:text-white"
              >
                Back to Dashboard
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-yellow-400" />
                    Personal Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    Professional Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Company</label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Years Experience</label>
                      <input
                        type="number"
                        value={profileData.yearsExperience}
                        onChange={(e) => setProfileData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-yellow-400" />
                    Lead Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-3 block">Preferred Lead Types</label>
                      <div className="grid gap-2 md:grid-cols-2">
                        {LEAD_TYPES.map((type) => (
                          <label key={type.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={profileData.preferredLeadTypes.includes(type.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    preferredLeadTypes: [...prev.preferredLeadTypes, type.id] 
                                  }))
                                } else {
                                  setProfileData(prev => ({ 
                                    ...prev, 
                                    preferredLeadTypes: prev.preferredLeadTypes.filter(t => t !== type.id) 
                                  }))
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="text-gray-300 text-sm">{type.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-yellow-400" />
                    Auto-Assignment Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Enable Auto-Assignment</label>
                        <p className="text-gray-400 text-sm">Automatically assign leads based on your preferences</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.autoAssignment.enabled}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            autoAssignment: { ...prev.autoAssignment, enabled: e.target.checked } 
                          }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Max Leads Per Day</label>
                        <input
                          type="number"
                          value={profileData.autoAssignment.maxLeadsPerDay}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            autoAssignment: { ...prev.autoAssignment, maxLeadsPerDay: parseInt(e.target.value) } 
                          }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Working Hours Start</label>
                        <input
                          type="time"
                          value={profileData.autoAssignment.workingHours.start}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            autoAssignment: { 
                              ...prev.autoAssignment, 
                              workingHours: { ...prev.autoAssignment.workingHours, start: e.target.value } 
                            } 
                          }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Working Hours End</label>
                        <input
                          type="time"
                          value={profileData.autoAssignment.workingHours.end}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            autoAssignment: { 
                              ...prev.autoAssignment, 
                              workingHours: { ...prev.autoAssignment.workingHours, end: e.target.value } 
                            } 
                          }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm mb-3 block">Working Days</label>
                      <div className="flex gap-2">
                        {[
                          { id: 'mon', name: 'Mon' },
                          { id: 'tue', name: 'Tue' },
                          { id: 'wed', name: 'Wed' },
                          { id: 'thu', name: 'Thu' },
                          { id: 'fri', name: 'Fri' },
                          { id: 'sat', name: 'Sat' },
                          { id: 'sun', name: 'Sun' }
                        ].map((day) => (
                          <button
                            key={day.id}
                            onClick={() => {
                              const isSelected = profileData.autoAssignment.workingDays.includes(day.id)
                              if (isSelected) {
                                setProfileData(prev => ({
                                  ...prev,
                                  autoAssignment: {
                                    ...prev.autoAssignment,
                                    workingDays: prev.autoAssignment.workingDays.filter(d => d !== day.id)
                                  }
                                }))
                              } else {
                                setProfileData(prev => ({
                                  ...prev,
                                  autoAssignment: {
                                    ...prev.autoAssignment,
                                    workingDays: [...prev.autoAssignment.workingDays, day.id]
                                  }
                                }))
                              }
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              profileData.autoAssignment.workingDays.includes(day.id)
                                ? 'bg-yellow-400 text-black'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {day.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">New Leads</label>
                        <p className="text-gray-400 text-sm">Get notified when new leads match your criteria</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.notifications.newLeads}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, newLeads: e.target.checked } 
                          }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Price Drops</label>
                        <p className="text-gray-400 text-sm">Alert when lead prices drop</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.notifications.priceDrops}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, priceDrops: e.target.checked } 
                          }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Weekly Reports</label>
                        <p className="text-gray-400 text-sm">Receive weekly performance summaries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.notifications.weeklyReports}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, weeklyReports: e.target.checked } 
                          }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Marketing Emails</label>
                        <p className="text-gray-400 text-sm">Promotional content and offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.notifications.marketingEmails}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, marketingEmails: e.target.checked } 
                          }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    Elite Status
                  </h3>
                  <div className="text-center space-y-3">
                    <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                      <Crown className="h-10 w-10 text-black" />
                    </div>
                    <div>
                      <div className="text-yellow-400 font-bold">Elite Agent</div>
                      <div className="text-gray-400 text-sm">Since January 2024</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Leads:</span>
                        <span className="text-white">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversion Rate:</span>
                        <span className="text-green-400">17.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Revenue:</span>
                        <span className="text-white">$156,780</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Account Settings</h2>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowAccountSettings(false)
                  setActiveTab('home')
                }}
                className="text-gray-400 hover:text-white"
              >
                Back to Dashboard
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Settings */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Security Settings */}
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-yellow-400" />
                    Security & Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Current Password</label>
                      <input
                        type="password"
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">New Password</label>
                        <input
                          type="password"
                          value={accountData.newPassword}
                          onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Confirm New Password</label>
                        <input
                          type="password"
                          value={accountData.confirmPassword}
                          onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    Two-Factor Authentication
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Enable 2FA</label>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={accountData.twoFactorEnabled}
                          onChange={(e) => setAccountData(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                    {accountData.twoFactorEnabled && (
                      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                          <Shield className="h-4 w-4" />
                          <span className="font-semibold">2FA Enabled</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">
                          Scan this QR code with your authenticator app or use the backup codes below.
                        </p>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm">
                            Show QR Code
                          </Button>
                          <Button variant="outline" size="sm">
                            Download Backup Codes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Management */}
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Timer className="h-5 w-5 text-yellow-400" />
                    Session Management
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-300 font-medium">Login Notifications</label>
                        <p className="text-gray-400 text-sm">Get notified when someone logs into your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={accountData.loginNotifications}
                          onChange={(e) => setAccountData(prev => ({ ...prev, loginNotifications: e.target.checked }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Session Timeout</label>
                      <select
                        value={accountData.sessionTimeout}
                        onChange={(e) => setAccountData(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="240">4 hours</option>
                        <option value="1440">24 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-900/20 backdrop-blur border border-red-500/30 rounded-lg p-6">
                  <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Delete Account</label>
                      <p className="text-gray-400 text-sm mb-3">
                        This action cannot be undone. This will permanently delete your account and all associated data.
                      </p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={accountData.deleteAccount.confirmText}
                          onChange={(e) => setAccountData(prev => ({ 
                            ...prev, 
                            deleteAccount: { ...prev.deleteAccount, confirmText: e.target.value } 
                          }))}
                          placeholder="Type 'DELETE' to confirm"
                          className="w-full bg-white/5 border border-red-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none"
                        />
                        <textarea
                          value={accountData.deleteAccount.reason}
                          onChange={(e) => setAccountData(prev => ({ 
                            ...prev, 
                            deleteAccount: { ...prev.deleteAccount, reason: e.target.value } 
                          }))}
                          placeholder="Reason for deletion (optional)"
                          rows={3}
                          className="w-full bg-white/5 border border-red-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none"
                        />
                        <Button 
                          disabled={accountData.deleteAccount.confirmText !== 'DELETE'}
                          className={`${
                            accountData.deleteAccount.confirmText === 'DELETE'
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-gray-600 cursor-not-allowed'
                          } text-white font-semibold`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Security Score
                  </h3>
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-green-400">85%</div>
                    <div className="text-gray-300 text-sm">Your account security</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Strong Password</span>
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">2FA Enabled</span>
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Recent Login Review</span>
                        <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Login</span>
                      <span className="text-white">2 minutes ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Password Changed</span>
                      <span className="text-white">3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profile Updated</span>
                      <span className="text-white">1 week ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Settings Modified</span>
                      <span className="text-white">2 weeks ago</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
                  Save All Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notifications Dropdown Portal */}
      {showNotifications && (
        <div className="fixed inset-0 z-[10000]" onClick={() => setShowNotifications(false)}>
          <div 
            className="absolute top-16 right-20 w-96 bg-slate-800/95 backdrop-blur border border-white/10 rounded-lg shadow-xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center gap-1"
                    >
                      <CheckCheck className="h-4 w-4" />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-white p-1 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {unreadCount > 0 && (
                <div className="text-yellow-400 text-sm mt-1">
                  {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className="overflow-y-auto max-h-96">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        notification.read 
                          ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                          : `${getNotificationColor(notification.priority)} hover:bg-white/10`
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded ${
                          notification.priority === 'high' ? 'text-red-400' :
                          notification.priority === 'medium' ? 'text-yellow-400' :
                          'text-blue-400'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-500 text-xs">{notification.time}</span>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    markAsRead(notification.id)
                                  }}
                                  className="text-gray-400 hover:text-green-400 p-1 rounded"
                                  title="Mark as read"
                                >
                                  <Check className="h-3 w-3" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="text-gray-400 hover:text-red-400 p-1 rounded"
                                title="Delete notification"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-white/10">
                <button 
                  onClick={() => {
                    setNotifications([])
                    setShowNotifications(false)
                  }}
                  className="w-full text-center text-gray-400 hover:text-red-400 text-sm font-medium"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Dropdown Portal */}
      {showProfileDropdown && (
        <div className="fixed inset-0 z-[10000]" onClick={() => setShowProfileDropdown(false)}>
          <div 
            className="absolute top-16 right-6 w-64 bg-slate-800/95 backdrop-blur border border-white/10 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-black font-bold">
                  JK
                </div>
                <div>
                  <div className="text-white font-semibold">Jeremi Kisinski</div>
                  <div className="text-yellow-400 text-sm flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Elite Agent
                  </div>
                  <div className="text-gray-400 text-xs">Member since Jan 2024</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button 
                onClick={() => {
                  setShowProfileSettings(true)
                  setActiveTab('settings')
                  setShowProfileDropdown(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <CreditCard className="h-4 w-4" />
                <span>Billing & Payments</span>
              </button>
              <button 
                onClick={() => {
                  setShowAccountSettings(true)
                  setActiveTab('account')
                  setShowProfileDropdown(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <SettingsIcon className="h-4 w-4" />
                <span>Account Settings</span>
              </button>
              <div className="border-t border-white/10 mt-2 pt-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-white font-bold text-xl">{selectedLead.name}</h3>
                <p className="text-gray-300 text-sm">
                  {selectedLead.age}y • {selectedLead.location} • {selectedLead.type}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowLeadModal(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Phone</span>
                    <Button size="sm" variant="outline">
                      Reveal Phone
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Email</span>
                    <Button size="sm" variant="outline">
                      Reveal Email
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div>
                <h4 className="text-white font-semibold mb-3">Lead Intelligence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-gray-400 text-sm">Income</div>
                    <div className="text-white font-semibold">{selectedLead.income}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-gray-400 text-sm">Quality Score</div>
                    <div className="text-yellow-400 font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {selectedLead.score}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-white font-semibold mb-3">Activity Timeline</h4>
                <div className="space-y-3">
                  {selectedLead.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${
                        item.status === 'success' ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="text-white text-sm">{item.action}</div>
                        <div className="text-gray-400 text-xs">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-400/30 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">Add New Card</h3>
              <button 
                onClick={() => setShowAddCardModal(false)}
                className="text-navy-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const cardNumber = formData.get('cardNumber') as string
                const expiry = formData.get('expiry') as string
                const cvc = formData.get('cvc') as string
                const name = formData.get('name') as string
                const setPrimary = formData.get('setPrimary') === 'on'
                
                if (!cardNumber || !expiry || !cvc || !name) {
                  alert('❌ Please fill in all fields')
                  return
                }
                
                if (cardNumber.replace(/\s/g, '').length < 13) {
                  alert('❌ Please enter a valid card number')
                  return
                }
                
                addNewCard({
                  number: cardNumber.replace(/\s/g, ''),
                  expiry,
                  cvc,
                  name,
                  setPrimary
                })
                
                setShowAddCardModal(false)
              }}
            >
              <div>
                <label className="text-navy-300 text-sm mb-2 block">Card Number</label>
                <input
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-navy-800/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-navy-400 focus:border-gold-400 focus:outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-navy-300 text-sm mb-2 block">Expiry Date</label>
                  <input
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-navy-800/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-navy-400 focus:border-gold-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-navy-300 text-sm mb-2 block">CVC</label>
                  <input
                    name="cvc"
                    type="text"
                    placeholder="123"
                    className="w-full bg-navy-800/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-navy-400 focus:border-gold-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-navy-300 text-sm mb-2 block">Cardholder Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-navy-800/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-navy-400 focus:border-gold-400 focus:outline-none"
                  required
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  name="setPrimary"
                  type="checkbox" 
                  className="rounded border-navy-400" 
                />
                <span className="text-navy-300 text-sm">Set as primary payment method</span>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-semibold"
                >
                  Add Card
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddCardModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Card Confirmation Modal */}
      {showDeleteCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-red-400/30 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Delete Payment Method
              </h3>
              <button 
                onClick={() => setShowDeleteCardModal(null)}
                className="text-navy-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-navy-300">
                Are you sure you want to remove this payment method? This action cannot be undone.
              </p>
              
              {(() => {
                const card = paymentMethods.find(c => c.id === showDeleteCardModal)
                return card ? (
                  <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-red-400" />
                      <div>
                        <div className="text-white font-semibold">{card.type} •••• {card.last4}</div>
                        <div className="text-red-300 text-sm">Expires {card.expiry}</div>
                      </div>
                    </div>
                  </div>
                ) : null
              })()}
              
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                  onClick={() => deleteCard(showDeleteCardModal)}
                >
                  Delete Card
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteCardModal(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}