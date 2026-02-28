# Discord Webhook Setup for User Tracking

## Overview
The Nxt Leads marketplace now sends real-time notifications to Discord for all user activity:

- 🎉 **New User Signups** - Agent registrations with full details
- 🔐 **User Logins** - Login activity tracking  
- 💰 **Lead Purchases** - Revenue alerts with transaction details
- 🚨 **System Alerts** - Errors, warnings, and system status

## Setup Instructions

### 1. Create Discord Webhook
1. **Right-click your Discord channel** (e.g., #nxt-leads-manager)
2. Select **"Edit Channel"**
3. Go to **"Integrations"** tab
4. Click **"Create Webhook"**
5. Name it: `Nxt Leads Tracker`
6. **Copy the Webhook URL**

### 2. Configure Environment
Add the webhook URL to your `.env.local` file:

```bash
# Discord Webhook for User Activity Tracking
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

### 3. Test the Integration
Test all notification types:

```bash
# Test signup notification
curl -X POST http://localhost:3001/api/test-discord \
  -H "Content-Type: application/json" \
  -d '{"type":"signup"}'

# Test login notification  
curl -X POST http://localhost:3001/api/test-discord \
  -H "Content-Type: application/json" \
  -d '{"type":"login"}'

# Test purchase notification
curl -X POST http://localhost:3001/api/test-discord \
  -H "Content-Type: application/json" \
  -d '{"type":"purchase"}'

# Test system alert
curl -X POST http://localhost:3001/api/test-discord \
  -H "Content-Type: application/json" \
  -d '{"type":"alert"}'
```

## Notification Examples

### New User Signup
```
🚨 NEW AGENT ALERT 🚨

🎉 NEW USER SIGNUP
A new premium agent has joined Nxt Leads!

👤 Agent Details
Name: John Smith
Email: john@example.com

🏢 Company Info
Company: Smith Insurance Agency
Phone: +1-555-123-4567

📋 License Info
License #: TX-INS-12345
State: TX

💰 Account Status
Starting Credits: 10
Status: Active
```

### Lead Purchase
```
💸 REVENUE ALERT - $32.50 earned!

💰 LEAD PURCHASE
Premium lead purchased by agent

👤 Buyer
Name: John Smith
Email: john@example.com

📋 Lead Details
Type: IUL
Lead ID: NXL-2847
Price: $32.50

💳 Transaction
Credits Used: 1
Remaining: 24
```

## Business Intelligence

### Key Metrics Tracked
- **New signups per day**
- **Active users and login frequency**
- **Revenue per lead type**
- **Credit utilization patterns**
- **System performance issues**

### Revenue Tracking
Each purchase notification includes:
- Lead type and price
- Agent information
- Credits used/remaining
- Timestamp for analytics

### User Behavior
Track agent activity patterns:
- Peak usage times
- Most popular lead types
- Credit purchase patterns
- User retention metrics

## Security Notes

- Webhook URLs contain sensitive tokens - keep them secure
- Never commit webhook URLs to version control
- Regenerate webhooks if compromised
- Discord rate limits apply (5 requests per second)

## Troubleshooting

### No Notifications Appearing
1. Check webhook URL is correctly set in `.env.local`
2. Verify webhook hasn't been deleted in Discord
3. Check server logs for Discord API errors
4. Test with `/api/test-discord` endpoint

### Rate Limiting
- Discord allows 5 requests per second per webhook
- High-volume signups may be delayed
- Consider batching notifications for heavy traffic

### Message Formatting
- Embeds have 6000 character limit
- Field values limited to 1024 characters
- Maximum 10 fields per embed
- Maximum 10 embeds per message

---

**Status:** Ready for production use
**Last Updated:** February 26, 2026