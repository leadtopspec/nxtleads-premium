import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // For now, just use demo mode to test the authentication flow
    console.log('🚨 DEMO MODE: Authentication request for', email);
    
    const demoUser = {
      id: `demo-${Date.now()}`,
      email,
      fullName: 'Demo Agent',
      companyName: 'Elite Insurance Agency',
      phone: '+1-555-DEMO-01',
      licenseNumber: 'TX-DEMO-12345',
      licenseState: 'TX',
      credits: 25,
      role: 'agent',
      isActive: true,
      emailVerified: true,
      lastLogin: new Date().toISOString()
    };

    // Skip Discord notification for now to avoid hanging
    console.log('Demo user login:', demoUser.email);

    return NextResponse.json({
      success: true,
      message: '🚨 DEMO MODE: Login successful! (Using demo authentication)',
      user: demoUser,
      demo: true, // Flag to indicate this is demo mode
      redirectTo: '/dashboard'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to login. Please try again.'
    }, { status: 500 });
  }
}