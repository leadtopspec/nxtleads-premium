import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_FORMS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || '';

interface WaitlistData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentExperience: string;
  currentRevenue: string;
  goalRevenue?: string;
  timeline?: string;
  leadBudget?: string;
  motivation: string;
  notificationPrefs: {
    email: boolean;
    sms: boolean;
  };
  source?: string;
  submittedAt: string;
}

async function sendDiscordNotification(waitlistData: WaitlistData) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log('Discord webhook not configured');
    return;
  }

  // Calculate qualification score
  const getQualificationScore = () => {
    let score = 0;
    let feedback = [];
    
    // Experience scoring
    if (waitlistData.currentExperience === '5+') {
      score += 3;
      feedback.push('✅ Experience: Qualified');
    } else if (waitlistData.currentExperience === '2-5') {
      score += 2;
      feedback.push('🟡 Experience: Close to qualified');
    } else {
      score += 0;
      feedback.push('❌ Experience: Needs growth');
    }
    
    // Revenue scoring
    if (waitlistData.currentRevenue === '15k+') {
      score += 3;
      feedback.push('✅ Revenue: Qualified');
    } else if (waitlistData.currentRevenue === '10k-15k') {
      score += 2;
      feedback.push('🟡 Revenue: Close to qualified');
    } else if (waitlistData.currentRevenue === '5k-10k') {
      score += 1;
      feedback.push('🔶 Revenue: Needs significant growth');
    } else {
      score += 0;
      feedback.push('❌ Revenue: Needs major growth');
    }
    
    // Timeline bonus
    if (waitlistData.timeline === '1-3 months') score += 1;
    if (waitlistData.timeline === '3-6 months') score += 0.5;
    
    // Budget readiness bonus
    if (waitlistData.leadBudget === '5000+') score += 1;
    if (waitlistData.leadBudget === '2500-5000') score += 0.5;
    
    if (score >= 5) return { status: '🚀 PROMOTE IMMEDIATELY', color: 0x00FF00, feedback };
    if (score >= 3.5) return { status: '⭐ HIGH POTENTIAL', color: 0xFFD700, feedback };
    if (score >= 2) return { status: '📈 GROWTH NEEDED', color: 0xFF8C00, feedback };
    return { status: '👥 LONG-TERM NURTURE', color: 0x808080, feedback };
  };

  const qualification = getQualificationScore();
  
  const embed = {
    title: '📋 NEW WAITLIST SIGNUP',
    description: `**${qualification.status}** - Waitlist member added`,
    color: qualification.color,
    fields: [
      {
        name: '👤 Contact Information',
        value: `**Name:** ${waitlistData.firstName} ${waitlistData.lastName}\n**Email:** ${waitlistData.email}\n**Phone:** ${waitlistData.phone || 'Not provided'}`,
        inline: true
      },
      {
        name: '📊 Current Status',
        value: `**Experience:** ${waitlistData.currentExperience}\n**Revenue:** ${waitlistData.currentRevenue}\n**Timeline:** ${waitlistData.timeline || 'Not specified'}`,
        inline: true
      },
      {
        name: '🎯 Goals',
        value: `**Target Revenue:** ${waitlistData.goalRevenue || 'Not specified'}\n**Lead Budget:** ${waitlistData.leadBudget || 'Not specified'}`,
        inline: true
      },
      {
        name: '🔍 Qualification Feedback',
        value: qualification.feedback.join('\n'),
        inline: false
      },
      {
        name: '💭 Motivation',
        value: waitlistData.motivation.substring(0, 300) + (waitlistData.motivation.length > 300 ? '...' : ''),
        inline: false
      },
      {
        name: '📬 Notifications',
        value: `Email: ${waitlistData.notificationPrefs.email ? '✅' : '❌'} | SMS: ${waitlistData.notificationPrefs.sms ? '✅' : '❌'}`,
        inline: true
      }
    ],
    footer: {
      text: 'Nxt Leads - Elite Waitlist'
    },
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📋 **NEW WAITLIST MEMBER** - ${qualification.status}`,
        embeds: [embed]
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const waitlistData: WaitlistData = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'currentExperience', 'currentRevenue', 'motivation'];
    
    for (const field of requiredFields) {
      if (!waitlistData[field as keyof WaitlistData]) {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Validate email format
    if (!waitlistData.email.includes('@') || !waitlistData.email.includes('.')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Generate waitlist ID and position
    const waitlistId = `WL-${Date.now()}`;
    const position = Math.floor(Math.random() * 150) + 50; // Simulate position

    // Store waitlist data (in production, save to database)
    const waitlistRecord = {
      id: waitlistId,
      position,
      ...waitlistData,
      status: 'active',
      addedAt: new Date().toISOString(),
      estimatedPromotionDate: null,
      notificationsSent: 0,
      lastUpdated: new Date().toISOString()
    };

    // Send Discord notification for team awareness
    await sendDiscordNotification(waitlistData);

    // Log waitlist signup
    console.log('New waitlist signup:', {
      id: waitlistId,
      name: `${waitlistData.firstName} ${waitlistData.lastName}`,
      email: waitlistData.email,
      experience: waitlistData.currentExperience,
      revenue: waitlistData.currentRevenue,
      position
    });

    // Determine immediate feedback message
    const getFeedbackMessage = () => {
      const isCloseToQualified = 
        waitlistData.currentExperience === '2-5' || 
        waitlistData.currentRevenue === '10k-15k' ||
        waitlistData.currentRevenue === '15k+';
      
      const isQualified = 
        waitlistData.currentExperience === '5+' && 
        waitlistData.currentRevenue === '15k+';
      
      if (isQualified) {
        return {
          title: 'You might qualify now!',
          message: 'Based on your responses, you may already meet our elite criteria. Our team will reach out within 24 hours to fast-track your application.',
          urgency: 'high'
        };
      } else if (isCloseToQualified) {
        return {
          title: 'You\'re very close!',
          message: 'You\'re almost ready for elite access. We\'ll monitor your progress closely and notify you as soon as you qualify.',
          urgency: 'medium'
        };
      } else {
        return {
          title: 'Welcome to the journey!',
          message: 'We\'ll track your growth and provide resources to help you reach elite status. Check your email for our exclusive growth guide.',
          urgency: 'normal'
        };
      }
    };

    const feedback = getFeedbackMessage();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the elite waitlist',
      waitlistId,
      position,
      feedback,
      statusMessage: `You're #${position} on our elite waitlist. We'll notify you when you qualify for premium leads.`
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to join waitlist. Please try again or contact support@nxtleads.com.'
    }, { status: 500 });
  }
}

// GET endpoint to check waitlist status (for future use)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const waitlistId = searchParams.get('id');

  if (!email && !waitlistId) {
    return NextResponse.json({
      error: 'Email or waitlist ID required'
    }, { status: 400 });
  }

  // In production, this would query the database
  // For now, return a placeholder response
  return NextResponse.json({
    id: waitlistId || 'WL-' + Date.now(),
    position: Math.floor(Math.random() * 150) + 50,
    status: 'active',
    estimatedWaitTime: '3-6 months',
    message: 'You\'re on our elite waitlist. We\'ll notify you when you qualify for premium leads.'
  });
}