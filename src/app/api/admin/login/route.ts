import { NextRequest, NextResponse } from 'next/server';
import { DiscordNotifier } from '@/lib/discord';

// Admin credentials - in production, store these securely
const ADMIN_CREDENTIALS = {
  email: 'jeremi@nxtleads.com',
  password: 'NxtLeads2026!', // Change this!
  adminKey: 'ELITE_ACCESS_2026' // Change this!
};

// Simple JWT-like token for demo (in production, use proper JWT)
function generateAdminToken(email: string) {
  const payload = {
    email,
    role: 'admin',
    issued: Date.now(),
    expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  // In production, use proper JWT signing
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminKey } = await request.json();

    // Validate all required fields
    if (!email || !password || !adminKey) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 });
    }

    // Check credentials
    if (
      email !== ADMIN_CREDENTIALS.email ||
      password !== ADMIN_CREDENTIALS.password ||
      adminKey !== ADMIN_CREDENTIALS.adminKey
    ) {
      // Log failed attempt
      await DiscordNotifier.systemAlert(
        `🚨 FAILED ADMIN LOGIN ATTEMPT: ${email} from IP: ${request.headers.get('x-forwarded-for') || 'Unknown'}`,
        'warning'
      );

      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 });
    }

    // Generate session token
    const token = generateAdminToken(email);

    // Log successful login
    await DiscordNotifier.systemAlert(
      `✅ Admin login successful: ${email}`,
      'info'
    );

    return NextResponse.json({
      success: true,
      token,
      admin: {
        email,
        role: 'admin',
        name: 'Jeremi - CEO',
        permissions: [
          'view_applications',
          'manage_waitlist',
          'view_contacts',
          'manage_users',
          'view_analytics',
          'system_admin'
        ]
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Authentication failed'
    }, { status: 500 });
  }
}

// Admin logout endpoint
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString());
        await DiscordNotifier.systemAlert(
          `👋 Admin logout: ${payload.email}`,
          'info'
        );
      } catch (e) {
        // Invalid token, but still return success
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json({
      success: false,
      error: 'Logout failed'
    }, { status: 500 });
  }
}