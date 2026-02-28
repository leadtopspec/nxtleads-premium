import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action, password } = await request.json()
    
    // Simple admin password (replace with proper auth)
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (action === 'enable') {
      // In a real app, you'd update a database or external config
      return NextResponse.json({
        success: true,
        message: 'Maintenance mode enabled. Update MAINTENANCE_MODE environment variable to true.',
        instruction: 'Set MAINTENANCE_MODE=true in Vercel environment variables'
      })
    } else if (action === 'disable') {
      return NextResponse.json({
        success: true,
        message: 'Maintenance mode disabled. Remove MAINTENANCE_MODE environment variable.',
        instruction: 'Remove MAINTENANCE_MODE environment variable in Vercel'
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid action. Use "enable" or "disable"' },
      { status: 400 }
    )
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  
  return NextResponse.json({
    maintenanceMode,
    status: maintenanceMode ? 'enabled' : 'disabled'
  })
}