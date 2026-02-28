import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PurchaseLeadOptions {
  packageType: string
  leadType: string
  quantity: number
  unitPrice: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function usePurchaseLead() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const purchaseLeads = async (options: PurchaseLeadOptions) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/billing/purchase-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_type: options.packageType,
          lead_type: options.leadType,
          quantity: options.quantity,
          unit_price: options.unitPrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.error === 'Insufficient balance') {
          // Redirect to billing page to add credits
          if (confirm(`Insufficient balance. You need $${(options.quantity * options.unitPrice - data.current_balance).toFixed(2)} more. Add credits now?`)) {
            router.push('/dashboard?tab=billing')
          }
          throw new Error(`Insufficient balance. Current: $${data.current_balance}`)
        }
        throw new Error(data.error || 'Purchase failed')
      }

      // Show success message
      if (options.onSuccess) {
        options.onSuccess()
      }

      // Return purchase details
      return {
        success: true,
        purchaseId: data.data.purchase_id,
        transactionId: data.data.transaction_id,
        newBalance: data.data.new_balance,
        leadsPurchased: data.data.leads_purchased,
        totalAmount: data.data.total_amount,
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Purchase failed'
      setError(errorMessage)
      
      if (options.onError) {
        options.onError(errorMessage)
      }
      
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    purchaseLeads,
    loading,
    error,
  }
}