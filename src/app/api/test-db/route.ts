import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Test database connection by fetching leads count
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('count', { count: 'exact', head: true })

    if (leadsError) {
      console.error('Leads query error:', leadsError)
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed',
        details: leadsError.message 
      }, { status: 500 })
    }

    // Test users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })

    if (usersError) {
      console.error('Users query error:', usersError)
      return NextResponse.json({ 
        success: false, 
        error: 'Users table access failed',
        details: usersError.message 
      }, { status: 500 })
    }

    // Test available leads
    const { data: availableLeads, error: availableError } = await supabase
      .from('leads')
      .select('id, first_name, last_name, lead_type, price, quality_score')
      .eq('status', 'available')
      .gte('expires_at', new Date().toISOString())
      .limit(5)

    if (availableError) {
      console.error('Available leads query error:', availableError)
      return NextResponse.json({ 
        success: false, 
        error: 'Available leads query failed',
        details: availableError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful! 🚀',
      stats: {
        totalLeads: leads?.length || 0,
        totalUsers: users?.length || 0,
        availableLeads: availableLeads?.length || 0
      },
      sampleLeads: availableLeads?.slice(0, 3) || []
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected database error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}