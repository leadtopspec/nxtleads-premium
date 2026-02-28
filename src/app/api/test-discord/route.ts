import { NextRequest, NextResponse } from 'next/server';
import { DiscordNotifier } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    switch (type) {
      case 'signup':
        await DiscordNotifier.newUser('test@example.com', 'John Test Agent');
        break;

      case 'login':
        await DiscordNotifier.systemAlert('User John Test Agent logged in with 25 credits', 'info');
        break;

      case 'purchase':
        await DiscordNotifier.leadPurchase('test@example.com', 'IUL', 1, 32.50);
        break;

      case 'alert':
        await DiscordNotifier.systemAlert('Discord notification system is working correctly!', 'info');
        break;

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid test type. Use: signup, login, purchase, or alert'
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Discord notification test (${type}) sent successfully!`
    });

  } catch (error) {
    console.error('Discord test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send Discord test notification'
    }, { status: 500 });
  }
}

// GET endpoint to show test options
export async function GET() {
  return NextResponse.json({
    message: 'Discord Notification Test Endpoint',
    usage: 'POST to this endpoint with { "type": "signup|login|purchase|alert" }',
    examples: {
      signup: 'Tests new user registration notification',
      login: 'Tests user login notification', 
      purchase: 'Tests lead purchase notification',
      alert: 'Tests system alert notification'
    },
    webhook_status: process.env.DISCORD_WEBHOOK_URL ? 'Configured' : 'Not configured - add DISCORD_WEBHOOK_URL to .env.local'
  });
}