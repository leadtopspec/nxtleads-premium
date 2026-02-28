# Supabase Setup Guide for Nxt Leads

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/login with GitHub or email
4. Create new project:
   - **Name**: nxt-leads-production
   - **Database Password**: (Generate strong password - save this!)
   - **Region**: US East (N. Virginia) - closest to target audience
   - **Pricing**: Start with Free tier (can upgrade later)

## Step 2: Get Project Credentials

After project is created (takes ~2-3 minutes):

1. Go to Project Settings > API
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Key**: `eyJhbGc...` (public key)
   - **Service Role Key**: `eyJhbGc...` (private key - keep secret!)

## Step 3: Update Environment Variables

Edit `.env.local` with your actual Supabase credentials:

```bash
# Replace these with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Deploy Database Schema

1. Go to Supabase Dashboard > SQL Editor
2. Click "New Query"
3. Copy the entire contents of `src/lib/database-schema.sql`
4. Paste into SQL Editor
5. Click "Run" to execute
6. Verify tables were created in Table Editor

## Step 5: Configure Authentication

1. Go to Authentication > Settings
2. Set Site URL: `http://localhost:3000` (for development)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)
4. Enable Email confirmations
5. Configure email templates (optional but recommended)

## Step 6: Test Authentication Flow

1. Restart Next.js development server: `npm run dev`
2. Visit `http://localhost:3000/auth/signin`
3. Try creating a new account
4. Check email for verification link
5. Complete verification process
6. Test login/logout functionality

## Step 7: Set Row Level Security Policies

The schema includes RLS policies, but verify they're active:

1. Go to Table Editor > profiles
2. Click "RLS" tab
3. Ensure policies are enabled and active
4. Test that users can only see their own data

## Step 8: Configure Realtime (Optional)

For real-time lead updates:

1. Go to Database > Replication
2. Enable realtime for tables: `leads`, `lead_purchases`
3. This allows live updates when new leads become available

## Step 9: Production Configuration

When ready for production:

1. Add production domain to Auth settings
2. Configure custom SMTP (optional)
3. Set up database backups
4. Enable SSL enforcement
5. Configure monitoring and alerts

## Troubleshooting

**Common Issues:**

- **Connection Error**: Double-check URL and keys in `.env.local`
- **RLS Blocking Queries**: Ensure user is authenticated
- **Email Not Sending**: Check spam folder, verify SMTP settings
- **Schema Errors**: Run schema in smaller chunks if needed

**Helpful Queries:**

```sql
-- Check if tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- View user profiles
SELECT * FROM profiles;

-- Check authentication
SELECT * FROM auth.users;
```

## Next Steps After Setup

1. Test complete user registration flow
2. Verify lead purchasing system works
3. Test dashboard functionality
4. Configure Facebook Pixel integration
5. Deploy to production hosting

---

**IMPORTANT**: Keep your Service Role Key secret! Never commit it to Git or expose it publicly.