import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
  appInfo: {
    name: 'Nxt Leads Pro',
    version: '1.0.0',
  },
})

// Payment intent for one-time purchases (lead packages)
export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

// Create customer for user
export async function createStripeCustomer(
  email: string,
  name: string,
  userId: string
) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        user_id: userId,
      },
    })
    
    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}

// Get customer by user ID
export async function getStripeCustomer(userId: string) {
  try {
    const customers = await stripe.customers.list({
      limit: 1,
      expand: ['data.default_source'],
    })
    
    const customer = customers.data.find(
      c => c.metadata?.user_id === userId
    )
    
    return customer
  } catch (error) {
    console.error('Error getting Stripe customer:', error)
    throw error
  }
}

// Create subscription for recurring services
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata,
    })
    
    return subscription
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error
  }
}

// Webhook signature verification
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw error
  }
}