import { NextRequest, NextResponse } from 'next/server';
import { DiscordNotifier } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, leadType, leadName, price, userEmail, userName } = body;

    // Simulate lead purchase process
    const purchaseData = {
      id: `purchase-${Date.now()}`,
      leadId,
      leadType,
      leadName,
      price,
      userEmail,
      userName,
      creditsUsed: 1,
      remainingCredits: 49, // Demo calculation
      purchaseTime: new Date().toISOString(),
      status: 'completed'
    };

    // Send Discord notification
    await DiscordNotifier.leadPurchase(userEmail, leadType, 1, price);

    return NextResponse.json({
      success: true,
      message: `Lead ${leadId} purchased successfully!`,
      purchase: purchaseData,
      leadContact: {
        name: leadName,
        phone: '+1-555-REAL-LEAD',
        email: 'lead@example.com',
        notes: 'This is demo contact info. In production, real verified contact details would be provided.'
      }
    });

  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process lead purchase'
    }, { status: 500 });
  }
}