import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

// Create a payment intent for credit purchases
export async function createPaymentIntent(
  amount: number, // Amount in dollars
  currency: string = 'usd',
  metadata: Record<string, string> = {}
): Promise<Stripe.PaymentIntent> {
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

// Create a customer
export async function createCustomer(
  email: string,
  name?: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Customer> {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata,
    })

    return customer
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}

// Get customer by ID
export async function getCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return customer as Stripe.Customer
  } catch (error) {
    console.error('Error retrieving customer:', error)
    return null
  }
}

// Verify webhook signature
export function verifyWebhookSignature(
  body: string,
  signature: string,
  endpointSecret: string
): Stripe.Event {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    return event
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    throw new Error('Webhook signature verification failed')
  }
}

// Create a setup intent for saving payment methods
export async function createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return setupIntent
  } catch (error) {
    console.error('Error creating setup intent:', error)
    throw error
  }
}

// List customer payment methods
export async function getCustomerPaymentMethods(
  customerId: string,
  type: 'card' | 'us_bank_account' = 'card'
): Promise<Stripe.PaymentMethod[]> {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type,
    })

    return paymentMethods.data
  } catch (error) {
    console.error('Error retrieving payment methods:', error)
    return []
  }
}

// Cancel a payment intent
export async function cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.error('Error canceling payment intent:', error)
    throw error
  }
}

// Helper to format amount for display
export function formatAmount(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount)
}

// Validate payment intent status
export function isPaymentSuccessful(paymentIntent: Stripe.PaymentIntent): boolean {
  return paymentIntent.status === 'succeeded'
}

// Create subscription (if needed for future features)
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    return subscription
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error
  }
}