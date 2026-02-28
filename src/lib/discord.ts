interface DiscordEmbed {
  title: string
  description: string
  color: number
  fields?: { name: string; value: string; inline?: boolean }[]
  footer?: { text: string }
  timestamp?: string
}

interface DiscordMessage {
  content?: string
  embeds?: DiscordEmbed[]
  username?: string
  avatar_url?: string
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const ADMIN_PING = process.env.DISCORD_ADMIN_USER_ID ? `<@${process.env.DISCORD_ADMIN_USER_ID}>` : ''

export class DiscordNotifier {
  private static async sendWebhook(message: DiscordMessage) {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn('Discord webhook URL not configured')
      return
    }

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        console.error('Discord webhook failed:', response.statusText)
      }
    } catch (error) {
      console.error('Discord notification error:', error)
    }
  }

  static async newUser(userEmail: string, userName: string) {
    await this.sendWebhook({
      embeds: [{
        title: '👤 New User Registration',
        description: `A new agent has joined Nxt Leads!`,
        color: 0x00ff00, // Green
        fields: [
          { name: 'Email', value: userEmail, inline: true },
          { name: 'Name', value: userName, inline: true },
          { name: 'Status', value: '🆕 New Agent', inline: true }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads Admin Panel' }
      }],
      content: `${ADMIN_PING} New agent registered!`
    })
  }

  static async leadPurchase(userEmail: string, leadType: string, quantity: number, amount: number) {
    await this.sendWebhook({
      embeds: [{
        title: '💰 Lead Purchase',
        description: `Agent purchased premium leads`,
        color: 0xffd700, // Gold
        fields: [
          { name: 'Agent', value: userEmail, inline: true },
          { name: 'Lead Type', value: leadType, inline: true },
          { name: 'Quantity', value: quantity.toString(), inline: true },
          { name: 'Amount', value: `$${amount.toFixed(2)}`, inline: true },
          { name: 'Revenue', value: `🔥 $${amount.toFixed(2)}`, inline: true },
          { name: 'Time', value: new Date().toLocaleString(), inline: true }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads Revenue Tracker' }
      }]
    })
  }

  static async paymentAdded(userEmail: string, amount: number, method: string) {
    await this.sendWebhook({
      embeds: [{
        title: '💳 Payment Added',
        description: `Agent added funds to account`,
        color: 0x00ff00, // Green
        fields: [
          { name: 'Agent', value: userEmail, inline: true },
          { name: 'Amount', value: `$${amount.toFixed(2)}`, inline: true },
          { name: 'Method', value: method, inline: true },
          { name: 'Cash Flow', value: `📈 +$${amount.toFixed(2)}`, inline: true }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads Cash Flow' }
      }]
    })
  }

  static async highValueActivity(userEmail: string, activity: string, value?: number) {
    await this.sendWebhook({
      embeds: [{
        title: '🔥 High-Value Activity',
        description: activity,
        color: 0xff4500, // Orange Red
        fields: [
          { name: 'Agent', value: userEmail, inline: true },
          { name: 'Activity', value: activity, inline: true },
          ...(value ? [{ name: 'Value', value: `$${value.toFixed(2)}`, inline: true }] : [])
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads VIP Tracker' }
      }],
      content: `${ADMIN_PING} High-value activity detected! 🚨`
    })
  }

  static async dailySummary(stats: {
    newUsers: number
    totalRevenue: number
    leadsSold: number
    topAgent: string
    topAgentRevenue: number
  }) {
    await this.sendWebhook({
      embeds: [{
        title: '📊 Daily Business Summary',
        description: `Here's your Nxt Leads performance for today`,
        color: 0x4169e1, // Royal Blue
        fields: [
          { name: '👥 New Agents', value: stats.newUsers.toString(), inline: true },
          { name: '💰 Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, inline: true },
          { name: '📋 Leads Sold', value: stats.leadsSold.toString(), inline: true },
          { name: '🏆 Top Agent', value: stats.topAgent, inline: true },
          { name: '🥇 Top Revenue', value: `$${stats.topAgentRevenue.toFixed(2)}`, inline: true },
          { name: '📈 Status', value: '🔥 Growing Strong', inline: true }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads Daily Report' }
      }],
      content: `${ADMIN_PING} Daily report ready! 📊`
    })
  }

  static async systemAlert(message: string, severity: 'info' | 'warning' | 'error' = 'info') {
    const colors = {
      info: 0x0099ff,
      warning: 0xffcc00,
      error: 0xff0000
    }

    const emojis = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '🚨'
    }

    await this.sendWebhook({
      embeds: [{
        title: `${emojis[severity]} System ${severity.toUpperCase()}`,
        description: message,
        color: colors[severity],
        timestamp: new Date().toISOString(),
        footer: { text: 'Nxt Leads System Monitor' }
      }],
      content: severity === 'error' ? `${ADMIN_PING} System error!` : undefined
    })
  }
}

export default DiscordNotifier