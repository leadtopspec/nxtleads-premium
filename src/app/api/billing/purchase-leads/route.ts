import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { DiscordNotifier } from '@/lib/discord'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      package_type, 
      lead_type, 
      quantity, 
      unit_price 
    } = body
    
    if (!package_type || !lead_type || !quantity || !unit_price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const userId = 'temp-user-id' // Replace with actual user ID from session
    
    const total_amount = quantity * unit_price

    // Check user balance
    const { data: billing, error: balanceError } = await supabase
      .from('user_billing')
      .select('account_balance')
      .eq('user_id', userId)
      .single()

    if (balanceError) {
      return NextResponse.json(
        { error: 'Failed to check account balance' },
        { status: 500 }
      )
    }

    const currentBalance = parseFloat(billing.account_balance)
    if (currentBalance < total_amount) {
      return NextResponse.json(
        { error: 'Insufficient balance', current_balance: currentBalance },
        { status: 400 }
      )
    }

    // Create transaction
    const newBalance = currentBalance - total_amount
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          transaction_type: 'lead_purchase',
          amount: total_amount,
          credits_spent: total_amount,
          balance_before: currentBalance,
          balance_after: newBalance,
          status: 'completed',
          description: `${quantity} ${lead_type} leads (${package_type})`
        }
      ])
      .select()
      .single()

    if (transactionError) {
      console.error('Transaction error:', transactionError)
      return NextResponse.json(
        { error: 'Failed to process transaction' },
        { status: 500 }
      )
    }

    // Create lead purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('lead_purchases')
      .insert([
        {
          user_id: userId,
          transaction_id: transaction.id,
          package_type,
          lead_type,
          quantity,
          unit_price,
          total_amount,
          delivery_status: 'pending',
          purchase_metadata: {
            purchased_at: new Date().toISOString(),
            source: 'dashboard_volume_section'
          }
        }
      ])
      .select()
      .single()

    if (purchaseError) {
      console.error('Purchase record error:', purchaseError)
      return NextResponse.json(
        { error: 'Failed to create purchase record' },
        { status: 500 }
      )
    }

    // Send Discord notification
    try {
      await DiscordNotifier.leadPurchase('premium@agent.com', lead_type, quantity, total_amount)
    } catch (discordError) {
      console.error('Discord notification failed:', discordError)
      // Don't fail the purchase if Discord fails
    }

    return NextResponse.json({
      success: true,
      data: {
        purchase_id: purchase.id,
        transaction_id: transaction.id,
        new_balance: newBalance,
        leads_purchased: quantity,
        total_amount: total_amount
      }
    })

  } catch (error) {
    console.error('Lead purchase API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}