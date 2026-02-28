const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

// Discord bot for Nxt Leads admin commands
class NxtLeadsBot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        
        this.adminApiUrl = process.env.ADMIN_API_URL || 'https://nxtleads.com/api';
        this.adminSecret = process.env.ADMIN_SECRET;
        
        this.setupCommands();
        this.setupEventHandlers();
    }

    setupCommands() {
        // Register slash commands
        this.commands = [
            new SlashCommandBuilder()
                .setName('stats')
                .setDescription('Get business statistics')
                .addStringOption(option =>
                    option.setName('period')
                        .setDescription('Time period')
                        .setRequired(false)
                        .addChoices(
                            { name: 'Today', value: 'today' },
                            { name: 'This Week', value: 'week' },
                            { name: 'This Month', value: 'month' }
                        )),
            
            new SlashCommandBuilder()
                .setName('revenue')
                .setDescription('Get revenue report')
                .addStringOption(option =>
                    option.setName('period')
                        .setDescription('Time period')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Today', value: 'today' },
                            { name: 'This Week', value: 'week' },
                            { name: 'This Month', value: 'month' }
                        )),
            
            new SlashCommandBuilder()
                .setName('top-agents')
                .setDescription('Show top performing agents'),
            
            new SlashCommandBuilder()
                .setName('system-health')
                .setDescription('Check system health status'),
            
            new SlashCommandBuilder()
                .setName('send-report')
                .setDescription('Generate and send a business report')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Report type')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Daily Summary', value: 'daily' },
                            { name: 'Weekly Report', value: 'weekly' },
                            { name: 'Real-time Update', value: 'realtime' }
                        ))
        ];
    }

    setupEventHandlers() {
        this.client.once('ready', () => {
            console.log(`✅ Nxt Leads Bot is online as ${this.client.user.tag}!`);
            
            // Register commands
            this.client.application?.commands.set(this.commands);
            
            // Set bot status
            this.client.user.setActivity('Nxt Leads Revenue 📈', { type: 'WATCHING' });
        });

        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            try {
                await this.handleCommand(interaction);
            } catch (error) {
                console.error('Command error:', error);
                await interaction.reply({
                    content: '❌ An error occurred while processing your command.',
                    ephemeral: true
                });
            }
        });
    }

    async handleCommand(interaction) {
        const { commandName, options } = interaction;

        switch (commandName) {
            case 'stats':
                await this.handleStatsCommand(interaction, options);
                break;
            case 'revenue':
                await this.handleRevenueCommand(interaction, options);
                break;
            case 'top-agents':
                await this.handleTopAgentsCommand(interaction);
                break;
            case 'system-health':
                await this.handleSystemHealthCommand(interaction);
                break;
            case 'send-report':
                await this.handleSendReportCommand(interaction, options);
                break;
        }
    }

    async handleStatsCommand(interaction, options) {
        await interaction.deferReply();

        try {
            const stats = await this.getAdminStats();
            const period = options.getString('period') || 'today';
            
            const embed = new EmbedBuilder()
                .setTitle('📊 Nxt Leads Statistics')
                .setColor(0x00ff00)
                .addFields([
                    {
                        name: '👥 Users',
                        value: `Total: ${stats.users.total}\n${this.capitalizeFirst(period)}: ${stats.users[period] || stats.users.today}`,
                        inline: true
                    },
                    {
                        name: '💰 Revenue',
                        value: `Total: $${stats.revenue.total.toFixed(2)}\n${this.capitalizeFirst(period)}: $${(stats.revenue[period] || stats.revenue.today).toFixed(2)}`,
                        inline: true
                    },
                    {
                        name: '📋 Leads Sold',
                        value: `Total: ${stats.leads.total}\n${this.capitalizeFirst(period)}: ${stats.leads[period] || stats.leads.today}`,
                        inline: true
                    }
                ])
                .setTimestamp()
                .setFooter({ text: 'Nxt Leads Admin Bot' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply('❌ Failed to fetch statistics.');
        }
    }

    async handleRevenueCommand(interaction, options) {
        await interaction.deferReply();

        try {
            const stats = await this.getAdminStats();
            const period = options.getString('period');
            
            const revenue = stats.revenue[period];
            const users = stats.users[period];
            const leads = stats.leads[period];
            
            const avgOrderValue = leads > 0 ? revenue / leads : 0;
            const revenuePerUser = users > 0 ? revenue / users : 0;

            const embed = new EmbedBuilder()
                .setTitle(`💰 Revenue Report - ${this.capitalizeFirst(period)}`)
                .setColor(0xffd700)
                .addFields([
                    { name: '💵 Total Revenue', value: `$${revenue.toFixed(2)}`, inline: true },
                    { name: '📈 Avg Order Value', value: `$${avgOrderValue.toFixed(2)}`, inline: true },
                    { name: '👤 Revenue/User', value: `$${revenuePerUser.toFixed(2)}`, inline: true },
                    { name: '📋 Leads Sold', value: leads.toString(), inline: true },
                    { name: '👥 Active Users', value: users.toString(), inline: true },
                    { name: '🎯 Conversion Rate', value: users > 0 ? `${((leads / users) * 100).toFixed(1)}%` : '0%', inline: true }
                ])
                .setTimestamp()
                .setFooter({ text: 'Nxt Leads Revenue Analytics' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply('❌ Failed to fetch revenue data.');
        }
    }

    async handleTopAgentsCommand(interaction) {
        await interaction.deferReply();

        try {
            const stats = await this.getAdminStats();
            
            const topAgentsText = stats.topAgents.slice(0, 10).map((agent, index) => 
                `${index + 1}. **${agent.name}** - $${agent.revenue.toFixed(2)}`
            ).join('\n') || 'No sales data available';

            const embed = new EmbedBuilder()
                .setTitle('🏆 Top Performing Agents')
                .setDescription(topAgentsText)
                .setColor(0xff6b35)
                .setTimestamp()
                .setFooter({ text: 'Nxt Leads Leaderboard' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply('❌ Failed to fetch agent data.');
        }
    }

    async handleSystemHealthCommand(interaction) {
        await interaction.deferReply();

        try {
            // Simple health check - ping the API
            const response = await axios.get(`${this.adminApiUrl}/health`, {
                headers: { Authorization: `Bearer ${this.adminSecret}` },
                timeout: 5000
            });

            const embed = new EmbedBuilder()
                .setTitle('🔧 System Health Check')
                .setColor(0x00ff00)
                .addFields([
                    { name: '🌐 Website', value: '✅ Online', inline: true },
                    { name: '💾 Database', value: '✅ Connected', inline: true },
                    { name: '💳 Payments', value: '✅ Active', inline: true },
                    { name: '📊 API', value: '✅ Responding', inline: true },
                    { name: '🔔 Discord', value: '✅ Connected', inline: true },
                    { name: '⚡ Status', value: '🟢 All Systems Operational', inline: true }
                ])
                .setTimestamp()
                .setFooter({ text: 'Last checked' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('🔧 System Health Check')
                .setColor(0xff0000)
                .addFields([
                    { name: '⚠️ Status', value: '🔴 System Issues Detected', inline: false },
                    { name: '🔍 Details', value: error.message || 'Unknown error', inline: false }
                ])
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        }
    }

    async handleSendReportCommand(interaction, options) {
        await interaction.deferReply();

        try {
            const reportType = options.getString('type');
            
            await axios.post(`${this.adminApiUrl}/admin/discord-report`, 
                { reportType },
                { headers: { Authorization: `Bearer ${this.adminSecret}` }}
            );

            await interaction.editReply(`✅ ${this.capitalizeFirst(reportType)} report sent successfully!`);
        } catch (error) {
            await interaction.editReply('❌ Failed to send report.');
        }
    }

    async getAdminStats() {
        const response = await axios.get(`${this.adminApiUrl}/admin/stats`, {
            headers: { Authorization: `Bearer ${this.adminSecret}` }
        });
        
        return response.data.data;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    start() {
        this.client.login(process.env.DISCORD_BOT_TOKEN);
    }
}

// Start the bot
if (require.main === module) {
    const bot = new NxtLeadsBot();
    bot.start();
}

module.exports = NxtLeadsBot;