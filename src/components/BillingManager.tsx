'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { 
  CreditCard, 
  DollarSign, 
  Plus, 
  Check, 
  Loader2,
  Receipt,
  TrendingUp
} from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CreditPackage {
  id: string
  name: string
  description: string
  credit_amount: number
  price: number
  bonus_credits: number
  total_credits: number
}

interface BillingData {
  account_balance: number
  total_spent: number
  total_leads_purchased: number
  auto_refill_enabled: boolean
  auto_refill_threshold: number
  auto_refill_amount: number
}

export default function BillingManager() {
  const [billingData, setBillingData] = useState<BillingData | null>(null)
  const [creditPackages, setCreditPackages] = useState<CreditPackage[]>([])
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    loadBillingData()
    loadCreditPackages()
  }, [])

  const loadBillingData = async () => {
    try {
      const response = await fetch('/api/billing/balance')
      const data = await response.json()
      if (data.success) {
        setBillingData(data.data)
      }
    } catch (error) {
      console.error('Error loading billing data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCreditPackages = async () => {
    try {
      const response = await fetch('/api/billing/purchase-credits')
      const data = await response.json()
      if (data.success) {
        const packages = data.data.map((pkg: any) => ({
          ...pkg,
          total_credits: parseFloat(pkg.credit_amount) + parseFloat(pkg.bonus_credits)
        }))
        setCreditPackages(packages)
      }
    } catch (error) {
      console.error('Error loading credit packages:', error)
    }
  }

  const handlePurchaseCredits = async (packageData: CreditPackage) => {
    setPurchasing(true)
    setSelectedPackage(packageData)

    try {
      const response = await fetch('/api/billing/purchase-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ package_id: packageData.id }),
      })

      const data = await response.json()
      if (data.success) {
        setClientSecret(data.data.client_secret)
      } else {
        console.error('Error creating payment intent:', data.error)
        setPurchasing(false)
      }
    } catch (error) {
      console.error('Error purchasing credits:', error)
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Current Balance Section */}
      {billingData && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-white font-bold text-lg">Account Balance</h3>
                  <p className="text-green-400 text-sm">Available credits</p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${billingData.account_balance.toFixed(2)}
            </div>
            <div className="text-green-400 text-sm">
              Ready to purchase leads
            </div>
          </div>

          <div className="glass border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-bold text-lg">Total Spent</h3>
                  <p className="text-blue-400 text-sm">All-time purchases</p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${billingData.total_spent.toFixed(2)}
            </div>
            <div className="text-blue-400 text-sm">
              {billingData.total_leads_purchased} leads purchased
            </div>
          </div>

          <div className="glass border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Receipt className="h-8 w-8 text-purple-400" />
                <div>
                  <h3 className="text-white font-bold text-lg">Auto-Refill</h3>
                  <p className="text-purple-400 text-sm">
                    {billingData.auto_refill_enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
            {billingData.auto_refill_enabled ? (
              <div className="space-y-2">
                <div className="text-white text-sm">
                  Refill when below ${billingData.auto_refill_threshold}
                </div>
                <div className="text-purple-400 text-sm">
                  Add ${billingData.auto_refill_amount} automatically
                </div>
              </div>
            ) : (
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Enable Auto-Refill
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Credit Packages */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Plus className="h-6 w-6 text-gold-400" />
          <h2 className="text-2xl font-bold text-white">💳 Purchase Credits</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {creditPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`glass border rounded-xl p-6 transition-all cursor-pointer ${
                pkg.name === 'Growth Pack' 
                  ? 'border-2 border-gold-400/50 bg-gradient-to-br from-gold-600/10 to-gold-500/20'
                  : 'border-gray-600/30 hover:border-gold-400/30'
              }`}
              onClick={() => handlePurchaseCredits(pkg)}
            >
              {pkg.name === 'Growth Pack' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-white font-bold text-xl mb-1">{pkg.name}</h3>
                <p className="text-navy-300 text-sm">{pkg.description}</p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">${pkg.price}</div>
                  <div className="text-gold-400 font-semibold">${pkg.total_credits} in credits</div>
                  {pkg.bonus_credits > 0 && (
                    <div className="text-green-400 text-sm">
                      +${pkg.bonus_credits} bonus!
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">${pkg.credit_amount} base credits</span>
                  </div>
                  {pkg.bonus_credits > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-navy-300">+${pkg.bonus_credits} bonus credits</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">Instant delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-navy-300">Never expires</span>
                  </div>
                </div>

                <Button 
                  className={`w-full font-semibold ${
                    pkg.name === 'Growth Pack'
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  }`}
                  disabled={purchasing}
                >
                  {purchasing && selectedPackage?.id === pkg.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `Purchase Credits`
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Payment Modal */}
      {clientSecret && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-gold-500/20 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white font-bold text-lg mb-4">
              Complete Purchase: {selectedPackage.name}
            </h3>
            <div className="mb-4 p-4 bg-gold-900/20 rounded-lg">
              <div className="text-gold-400 font-semibold">
                ${selectedPackage.price} → ${selectedPackage.total_credits} credits
              </div>
              {selectedPackage.bonus_credits > 0 && (
                <div className="text-green-400 text-sm">
                  Includes ${selectedPackage.bonus_credits} bonus credits!
                </div>
              )}
            </div>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm 
                onSuccess={() => {
                  setClientSecret(null)
                  setSelectedPackage(null)
                  setPurchasing(false)
                  loadBillingData()
                }}
                onCancel={() => {
                  setClientSecret(null)
                  setSelectedPackage(null)
                  setPurchasing(false)
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  )
}

function PaymentForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard?payment=success`,
      },
      redirect: 'if_required'
    })

    if (error) {
      console.error('Payment failed:', error)
      setIsProcessing(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gold-600 hover:bg-gold-700 text-navy-950 font-semibold"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Complete Purchase'
          )}
        </Button>
      </div>
    </form>
  )
}