import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_FORMS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || '';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  leadType?: string;
  message: string;
  source?: string;
}

async function sendDiscordNotification(contactData: ContactData) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log('Discord webhook not configured');
    return;
  }

  // Determine priority based on message content and contact info
  const getPriority = () => {
    const message = contactData.message.toLowerCase();
    const hasCompany = contactData.company && contactData.company.length > 3;
    
    // High priority keywords
    if (message.includes('urgent') || message.includes('asap') || message.includes('immediate')) {
      return { level: '🔴 URGENT', color: 0xFF0000 };
    }
    
    // Sales opportunity keywords
    if (message.includes('buy') || message.includes('purchase') || message.includes('pricing') || 
        message.includes('quote') || message.includes('leads') || hasCompany) {
      return { level: '🟡 SALES OPPORTUNITY', color: 0xFFD700 };
    }
    
    return { level: '🟢 GENERAL INQUIRY', color: 0x00FF00 };
  };

  const priority = getPriority();
  
  const embed = {
    title: '📞 NEW CONTACT FORM SUBMISSION',
    description: `**${priority.level}** - Contact inquiry received`,
    color: priority.color,
    fields: [
      {
        name: '👤 Contact Information',
        value: `**Name:** ${contactData.name}\n**Email:** ${contactData.email}\n**Phone:** ${contactData.phone}`,
        inline: true
      },
      {
        name: '🏢 Business Details',
        value: `**Company:** ${contactData.company || 'Not specified'}\n**Interest:** ${contactData.leadType || 'General inquiry'}`,
        inline: true
      },
      {
        name: '💬 Message',
        value: contactData.message.substring(0, 500) + (contactData.message.length > 500 ? '...' : ''),
        inline: false
      }
    ],
    footer: {
      text: 'Nxt Leads - Contact Forms'
    },
    timestamp: new Date().toISOString()
  };

  if (contactData.source) {
    embed.fields.push({
      name: '📊 Source',
      value: contactData.source,
      inline: true
    });
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📞 **NEW CONTACT** - ${priority.level}`,
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
    const contactData: ContactData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    
    for (const field of requiredFields) {
      if (!contactData[field as keyof ContactData]) {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Validate email format
    if (!contactData.email.includes('@') || !contactData.email.includes('.')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Generate contact ID
    const contactId = `CONTACT-${Date.now()}`;

    // Store contact data (in production, save to database)
    const contactRecord = {
      id: contactId,
      ...contactData,
      submittedAt: new Date().toISOString(),
      status: 'new',
      assignedTo: null,
      responseStatus: 'pending',
      priority: contactData.message.toLowerCase().includes('urgent') ? 'high' : 'normal'
    };

    // Send Discord notification for immediate team awareness
    await sendDiscordNotification(contactData);

    // Log contact submission
    console.log('New contact submission:', {
      id: contactId,
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      leadType: contactData.leadType
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      contactId,
      statusMessage: 'Thank you for contacting us! Our team will respond within 24 hours.'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send message. Please try again or email us directly at support@nxtleads.com.'
    }, { status: 500 });
  }
}