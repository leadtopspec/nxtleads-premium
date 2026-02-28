import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    
    // Get user from session (you'll need to implement proper auth)
    const userId = 'temp-user-id' // Replace with actual user ID from session
    
    // Get user billing information
    const { data: billing, error } = await supabase
      .from('user_billing')
      .select(`
        account_balance,
        total_spent,
        total_leads_purchased,
        auto_refill_enabled,
        auto_refill_threshold,
        auto_refill_amount
      `)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching billing data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch billing data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: billing
    })

  } catch (error) {
    console.error('Billing balance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description } = body
    
    const userId = 'temp-user-id' // Replace with actual user ID from session
    
    // Get current balance
    const { data: currentBilling, error: fetchError } = await supabase
      .from('user_billing')
      .select('account_balance')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch current balance' },
        { status: 500 }
      )
    }

    const balanceBefore = parseFloat(currentBilling.account_balance)
    const balanceAfter = balanceBefore + amount

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          transaction_type: amount > 0 ? 'credit_purchase' : 'lead_purchase',
          amount: Math.abs(amount),
          credits_added: amount > 0 ? amount : 0,
          credits_spent: amount < 0 ? Math.abs(amount) : 0,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          status: 'completed',
          description: description || (amount > 0 ? 'Credit added' : 'Lead purchase'),
        }
      ])
      .select()
      .single()

    if (transactionError) {
      console.error('Error creating transaction:', transactionError)
      return NextResponse.json(
        { error: 'Failed to create transaction' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        transaction_id: transaction.id,
        new_balance: balanceAfter
      }
    })

  } catch (error) {
    console.error('Balance update API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}