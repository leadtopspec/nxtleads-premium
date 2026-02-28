import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyWebhookSignature } from '@/lib/stripe'
import { DiscordNotifier } from '@/lib/discord'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object, supabase)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object, supabase)
        break
        
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object, supabase)
        break
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object, supabase)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object, supabase)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: any, supabase: any) {
  try {
    const userId = paymentIntent.metadata?.user_id
    const packageId = paymentIntent.metadata?.package_id
    const creditAmount = parseFloat(paymentIntent.metadata?.credit_amount || '0')
    const bonusCredits = parseFloat(paymentIntent.metadata?.bonus_credits || '0')
    
    if (!userId) {
      console.error('No user_id in payment intent metadata')
      return
    }

    // Get current balance
    const { data: billing, error: balanceError } = await supabase
      .from('user_billing')
      .select('account_balance')
      .eq('user_id', userId)
      .single()

    if (balanceError) {
      console.error('Error fetching user balance:', balanceError)
      return
    }

    const currentBalance = parseFloat(billing.account_balance)
    const totalCredits = creditAmount + bonusCredits
    const newBalance = currentBalance + totalCredits

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          stripe_payment_intent_id: paymentIntent.id,
          transaction_type: 'credit_purchase',
          amount: paymentIntent.amount / 100, // Convert from cents
          credits_added: totalCredits,
          balance_before: currentBalance,
          balance_after: newBalance,
          status: 'completed',
          description: `Credit purchase: ${paymentIntent.metadata?.package_name || 'Unknown package'}`,
          metadata: {
            stripe_payment_intent_id: paymentIntent.id,
            package_id: packageId,
            credit_amount: creditAmount,
            bonus_credits: bonusCredits
          }
        }
      ])

    if (transactionError) {
      console.error('Error creating transaction:', transactionError)
      return
    }

    // Send Discord notification
    await DiscordNotifier.paymentAdded('user@example.com', paymentIntent.amount / 100, 'Stripe')

    console.log(`Payment successful for user ${userId}: +$${totalCredits} credits`)

  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: any, supabase: any) {
  try {
    const userId = paymentIntent.metadata?.user_id
    
    if (!userId) {
      console.error('No user_id in failed payment intent metadata')
      return
    }

    // Log failed transaction
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          stripe_payment_intent_id: paymentIntent.id,
          transaction_type: 'credit_purchase',
          amount: paymentIntent.amount / 100,
          status: 'failed',
          description: `Failed credit purchase: ${paymentIntent.metadata?.package_name || 'Unknown package'}`,
          metadata: {
            stripe_payment_intent_id: paymentIntent.id,
            failure_reason: paymentIntent.last_payment_error?.message || 'Unknown error'
          }
        }
      ])

    if (error) {
      console.error('Error logging failed transaction:', error)
    }

    // Send Discord alert
    await DiscordNotifier.systemAlert(`Payment failed for ${userId}: $${paymentIntent.amount / 100}`, 'error')

    console.log(`Payment failed for user ${userId}`)

  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleSubscriptionCreated(subscription: any, supabase: any) {
  // Handle subscription creation if we add subscription features
  console.log('Subscription created:', subscription.id)
}

async function handleSubscriptionUpdated(subscription: any, supabase: any) {
  // Handle subscription updates
  console.log('Subscription updated:', subscription.id)
}

async function handleSubscriptionDeleted(subscription: any, supabase: any) {
  // Handle subscription cancellation
  console.log('Subscription deleted:', subscription.id)
}