import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createPaymentIntent } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { package_id } = body
    
    if (!package_id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    const userId = 'temp-user-id' // Replace with actual user ID from session

    // Get credit package details
    const { data: package_data, error: packageError } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('id', package_id)
      .eq('is_active', true)
      .single()

    if (packageError || !package_data) {
      return NextResponse.json(
        { error: 'Invalid package ID' },
        { status: 400 }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await createPaymentIntent(
      parseFloat(package_data.price),
      'usd',
      {
        user_id: userId,
        package_id: package_id,
        package_name: package_data.name,
        credit_amount: package_data.credit_amount.toString(),
        bonus_credits: package_data.bonus_credits.toString()
      }
    )

    return NextResponse.json({
      success: true,
      data: {
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        package: {
          name: package_data.name,
          price: package_data.price,
          credit_amount: package_data.credit_amount,
          bonus_credits: package_data.bonus_credits,
          total_credits: parseFloat(package_data.credit_amount) + parseFloat(package_data.bonus_credits)
        }
      }
    })

  } catch (error) {
    console.error('Credit purchase API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    
    // Get all active credit packages
    const { data: packages, error } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching credit packages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch credit packages' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: packages
    })

  } catch (error) {
    console.error('Credit packages API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}