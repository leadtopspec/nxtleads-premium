import { NextRequest, NextResponse } from 'next/server';

// Discord webhook for application notifications
const DISCORD_WEBHOOK_URL = process.env.DISCORD_FORMS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || '';

interface ApplicationData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseState: string;
  
  // Professional Information
  companyName: string;
  currentIMO: string;
  agencyType: string;
  yearsExperience: string;
  
  // Business Metrics
  monthlyLeadVolume: string;
  averageLeadCost: string;
  currentConversionRate: string;
  monthlyRevenue: string;
  
  // Qualification Questions
  currentLeadSources: string;
  biggestChallenge: string;
  whyPremiumLeads: string;
  
  // Additional Info
  referralSource: string;
  additionalNotes: string;
}

async function sendDiscordNotification(applicationData: ApplicationData) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log('Discord webhook not configured');
    return;
  }

  // Determine approval likelihood based on criteria
  const getApprovalStatus = () => {
    let score = 0;
    
    // Experience bonus
    if (applicationData.yearsExperience === '6-10' || applicationData.yearsExperience === '11-15') score += 2;
    if (applicationData.yearsExperience === '16+') score += 3;
    if (applicationData.yearsExperience === '2-5') score += 1;
    
    // Volume bonus
    if (applicationData.monthlyLeadVolume === '51-100' || applicationData.monthlyLeadVolume === '101-200') score += 2;
    if (applicationData.monthlyLeadVolume === '200+') score += 3;
    if (applicationData.monthlyLeadVolume === '26-50') score += 1;
    
    // Revenue bonus
    if (applicationData.monthlyRevenue === '50k-100k') score += 2;
    if (applicationData.monthlyRevenue === '100k+') score += 3;
    if (applicationData.monthlyRevenue === '25k-50k') score += 1;
    
    // IMO/Agency bonus (having professional affiliations)
    if (applicationData.currentIMO && applicationData.currentIMO.length > 3) score += 1;
    if (applicationData.agencyType === 'independent' || applicationData.agencyType === 'brokerage') score += 1;
    
    if (score >= 7) return { status: '🟢 HIGH PRIORITY', color: 0x00FF00 };
    if (score >= 4) return { status: '🟡 QUALIFIED', color: 0xFFFF00 };
    return { status: '🔴 NEEDS REVIEW', color: 0xFF0000 };
  };

  const approval = getApprovalStatus();
  
  const embed = {
    title: '📋 NEW ELITE AGENT APPLICATION',
    description: `**${approval.status}** - Application requires review`,
    color: approval.color,
    fields: [
      {
        name: '👤 Agent Information',
        value: `**Name:** ${applicationData.fullName}\n**Email:** ${applicationData.email}\n**Phone:** ${applicationData.phone}`,
        inline: true
      },
      {
        name: '🏢 Professional Details',
        value: `**Company:** ${applicationData.companyName}\n**IMO/FMO:** ${applicationData.currentIMO}\n**Experience:** ${applicationData.yearsExperience}`,
        inline: true
      },
      {
        name: '📋 License Info',
        value: `**State:** ${applicationData.licenseState}\n**Number:** ${applicationData.licenseNumber}`,
        inline: true
      },
      {
        name: '📊 Business Metrics',
        value: `**Monthly Volume:** ${applicationData.monthlyLeadVolume}\n**Revenue Range:** ${applicationData.monthlyRevenue || 'Not specified'}\n**Current Cost:** ${applicationData.averageLeadCost || 'Not specified'}`,
        inline: true
      },
      {
        name: '💡 Current Lead Sources',
        value: applicationData.currentLeadSources.substring(0, 200) + (applicationData.currentLeadSources.length > 200 ? '...' : ''),
        inline: false
      },
      {
        name: '🎯 Biggest Challenge',
        value: applicationData.biggestChallenge.substring(0, 200) + (applicationData.biggestChallenge.length > 200 ? '...' : ''),
        inline: false
      },
      {
        name: '💰 Why Premium Leads?',
        value: applicationData.whyPremiumLeads.substring(0, 200) + (applicationData.whyPremiumLeads.length > 200 ? '...' : ''),
        inline: false
      }
    ],
    footer: {
      text: 'Nxt Leads - Elite Agent Applications'
    },
    timestamp: new Date().toISOString()
  };

  if (applicationData.additionalNotes) {
    embed.fields.push({
      name: '📝 Additional Notes',
      value: applicationData.additionalNotes.substring(0, 200) + (applicationData.additionalNotes.length > 200 ? '...' : ''),
      inline: false
    });
  }

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🚨 **NEW ELITE AGENT APPLICATION** 🚨\n\n**${approval.status}** - Immediate review required`,
        embeds: [embed]
      }),
    });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const applicationData: ApplicationData = await request.json();

    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'licenseNumber', 'licenseState',
      'companyName', 'currentIMO', 'yearsExperience', 'monthlyLeadVolume',
      'currentLeadSources', 'biggestChallenge', 'whyPremiumLeads'
    ];

    for (const field of requiredFields) {
      if (!applicationData[field as keyof ApplicationData]) {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Validate email format
    if (!applicationData.email.includes('@')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Generate application ID
    const applicationId = `APP-${Date.now()}`;

    // Store application data (in production, save to database)
    const applicationRecord = {
      id: applicationId,
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      approvalStatus: null,
      notes: ''
    };

    // Send Discord notification
    await sendDiscordNotification(applicationData);

    // Log application (in production, this would go to a proper database)
    console.log('New application submitted:', {
      id: applicationId,
      name: applicationData.fullName,
      email: applicationData.email,
      company: applicationData.companyName,
      imo: applicationData.currentIMO
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      statusMessage: 'Your application has been submitted for review. We will contact you within 24-48 hours.'
    });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to submit application. Please try again.'
    }, { status: 500 });
  }
}

// GET endpoint to retrieve application status (for future use)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('id');

  if (!applicationId) {
    return NextResponse.json({
      error: 'Application ID required'
    }, { status: 400 });
  }

  // In production, this would query the database
  // For now, return a placeholder response
  return NextResponse.json({
    id: applicationId,
    status: 'pending_review',
    message: 'Your application is being reviewed by our team. You will be contacted within 24-48 hours.'
  });
}