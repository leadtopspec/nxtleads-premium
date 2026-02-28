#!/usr/bin/env node

/**
 * Nxt Leads Quick Setup Script
 * Validates environment and sets up initial data
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Nxt Leads Quick Setup\n');

// Check for environment file
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ Missing .env.local file!');
  console.log('📋 Copy .env.example to .env.local and fill in your values:');
  console.log('   cp .env.example .env.local');
  console.log('   nano .env.local');
  process.exit(1);
}

// Load environment variables
require('dotenv').config({ path: envPath });

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📋 Please update your .env.local file with these values.');
  process.exit(1);
}

// Test Supabase connection
async function testSupabaseConnection() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);

    if (error && error.code === 'PGRST116') {
      console.log('⚠️  Users table not found - you need to run the database setup SQL');
      console.log('📋 Go to Supabase Dashboard → SQL Editor and run the schema from BACKEND_SETUP.md');
      return false;
    } else if (error) {
      console.log('❌ Supabase connection failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful!');
    return true;
  } catch (err) {
    console.log('❌ Supabase connection error:', err.message);
    return false;
  }
}

// Test Discord webhook (optional)
async function testDiscordWebhook() {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.log('ℹ️  Discord webhook not configured (optional)');
    return true;
  }

  try {
    console.log('🔍 Testing Discord webhook...');
    
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '🎉 Nxt Leads backend setup complete! System is operational.',
        embeds: [{
          title: '🚀 System Status',
          description: 'All backend services are online and ready for business',
          color: 0x00ff00,
          timestamp: new Date().toISOString()
        }]
      })
    });

    if (response.ok) {
      console.log('✅ Discord webhook working!');
      return true;
    } else {
      console.log('⚠️  Discord webhook failed:', response.statusText);
      return false;
    }
  } catch (err) {
    console.log('⚠️  Discord webhook error:', err.message);
    return false;
  }
}

// Main setup function
async function runSetup() {
  console.log('🔧 Running backend validation...\n');

  const supabaseOk = await testSupabaseConnection();
  const discordOk = await testDiscordWebhook();

  console.log('\n📊 Setup Summary:');
  console.log(`   Database: ${supabaseOk ? '✅' : '❌'}`);
  console.log(`   Notifications: ${discordOk ? '✅' : '⚠️'}`);
  
  if (supabaseOk) {
    console.log('\n🎉 Backend setup complete!');
    console.log('\n🚀 Next steps:');
    console.log('   1. npm run dev');
    console.log('   2. Visit http://localhost:3001');
    console.log('   3. Test contact form submission');
    console.log('   4. Check Supabase dashboard for data');
    
    if (process.env.STRIPE_SECRET_KEY) {
      console.log('   5. Set up Stripe webhook in dashboard');
    }
  } else {
    console.log('\n❌ Setup incomplete. Please fix the database connection first.');
    console.log('📖 See BACKEND_SETUP.md for detailed instructions.');
  }
}

// Run the setup
runSetup().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});