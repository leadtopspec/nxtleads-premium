import { NextRequest, NextResponse } from 'next/server';
import { DiscordNotifier } from '@/lib/discord';

// Demo authentication - bypasses Supabase for now
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, companyName, phone, licenseNumber, licenseState } = body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: email, password, and full name are required'
      }, { status: 400 });
    }

    // Demo user creation - simulate successful signup
    const demoUser = {
      id: `demo-${Date.now()}`,
      email,
      fullName,
      companyName: companyName || 'Demo Agency',
      phone: phone || '+1-555-DEMO',
      licenseNumber: licenseNumber || 'DEMO-LICENSE',
      licenseState: licenseState || 'TX',
      credits: 10, // Start with 10 demo credits
      role: 'agent',
      isActive: true,
      emailVerified: true,
      createdAt: new Date().toISOString()
    };

    // Send Discord notification
    await DiscordNotifier.newUser(demoUser.email, demoUser.fullName);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to Nxt Leads.',
      user: demoUser,
      redirectTo: '/leads' // Redirect to leads page after signup
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create account. Please try again.'
    }, { status: 500 });
  }
}