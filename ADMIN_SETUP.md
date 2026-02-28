# 🔐 Nxt Leads Admin System Setup

## 🎯 Quick Admin Access

### **1. Admin Login Credentials**
```
URL: http://localhost:3001/admin/login
Email: jeremi@nxtleads.com
Password: NxtLeads2026!
Admin Key: ELITE_ACCESS_2026
```

### **2. Set Up Discord Channels**

#### **Create Two Discord Servers:**

**Server 1: "Nxt Leads Admin" (Private)**
- **Purpose**: System alerts, admin notifications
- **Channels**: 
  - `#system-alerts` - Login attempts, errors
  - `#business-metrics` - Daily summaries, analytics
- **Webhook**: Main `DISCORD_WEBHOOK_URL`

**Server 2: "Nxt Leads Operations" (Business Team)**
- **Purpose**: Form submissions, lead notifications  
- **Channels**:
  - `#applications` - Elite agent applications
  - `#contacts` - Contact form submissions
  - `#waitlist` - Waitlist signups
  - `#leads` - Lead purchases & sales
- **Webhook**: Forms `DISCORD_FORMS_WEBHOOK_URL`

#### **Set Up Webhooks:**

**For each channel:**
1. Click channel settings ⚙️
2. Go to "Integrations" → "Webhooks"
3. Click "New Webhook"
4. Name: "Nxt Leads Bot"
5. Copy webhook URL
6. Add to `.env.local`

### **3. Environment Variables Setup**

Add to your `.env.local`:

```bash
# Admin System
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ADMIN_SERVER_WEBHOOK
DISCORD_FORMS_WEBHOOK_URL=https://discord.com/api/webhooks/BUSINESS_SERVER_WEBHOOK
DISCORD_ADMIN_USER_ID=540918090339450880

# Admin Authentication (CHANGE THESE!)
ADMIN_EMAIL=jeremi@nxtleads.com
ADMIN_PASSWORD=YourSecurePassword2026!
ADMIN_KEY=YOUR_SECRET_ACCESS_KEY
```

### **4. Test Admin System**

```bash
# 1. Start server
npm run dev:3001

# 2. Test admin login
open http://localhost:3001/admin/login

# 3. Test form submissions (should appear in Discord)
open http://localhost:3001/contact
open http://localhost:3001/apply
open http://localhost:3001/waitlist

# 4. Check admin dashboard
# Login and view applications/contacts/waitlist
```

## 🎛️ **Admin Dashboard Features**

### **Overview Tab**
- **Real-time stats**: Applications, waitlist, contacts
- **Recent activity**: Latest submissions
- **Quick actions**: Approve/reject applications

### **Applications Tab**
- **Auto-scoring system**: 0-100 qualification score
- **Detailed agent info**: Experience, revenue, specialties
- **One-click actions**: Approve/reject/review
- **Contact information**: Email, phone, company

### **Waitlist Tab**
- **Position tracking**: Queue management
- **Progress monitoring**: Experience/revenue growth
- **Promotion ready alerts**: Auto-notification when qualified

### **Contacts Tab**
- **Priority detection**: Urgent/high/normal/low
- **Lead opportunity flagging**: Sales keywords detection
- **Response tracking**: New/in-progress/resolved
- **Quick actions**: Reply/mark resolved

## 📊 **Discord Notification Types**

### **Admin Webhooks (`DISCORD_WEBHOOK_URL`)**
- 🚨 Failed admin login attempts
- ✅ Successful admin logins
- ⚠️ System errors and alerts
- 📊 Daily business summaries

### **Forms Webhooks (`DISCORD_FORMS_WEBHOOK_URL`)**
- 📋 **Elite Applications**: Auto-scored with priority
- 📞 **Contact Forms**: Priority and sales opportunity detection
- ⏳ **Waitlist Signups**: Qualification progress tracking
- 💰 **Lead Purchases**: Revenue notifications

## 🔒 **Security Features**

### **Admin Authentication**
- **Multi-factor**: Email + Password + Admin Key
- **Session tokens**: 24-hour expiry
- **Login monitoring**: Failed attempt alerts
- **Access logging**: All actions tracked

### **Data Protection**
- **Role-based access**: Admin-only areas
- **Input validation**: XSS/injection protection
- **Audit trails**: Complete action logging
- **Secure storage**: No credentials in localStorage

## 📈 **Business Workflow**

### **Daily Admin Routine:**
1. **Check Dashboard**: Review overnight submissions
2. **Process Applications**: Approve qualified agents
3. **Respond to Contacts**: Handle sales inquiries  
4. **Monitor Waitlist**: Promote ready candidates
5. **Review Analytics**: Track business metrics

### **Discord Alert Flow:**
1. **Form Submitted** → Instant Discord notification
2. **Auto-Analysis** → Priority/score assigned
3. **Admin Alerted** → Mobile notification
4. **Quick Action** → Approve/respond from dashboard
5. **Business Impact** → Revenue tracking

## 🚀 **Production Deployment**

### **Security Checklist:**
- [ ] Change default admin credentials
- [ ] Use strong passwords (20+ characters)
- [ ] Set up SSL certificates
- [ ] Configure rate limiting
- [ ] Enable audit logging
- [ ] Set up backup Discord webhooks

### **Admin Training:**
- [ ] Dashboard navigation
- [ ] Application scoring system  
- [ ] Priority handling workflows
- [ ] Discord notification setup
- [ ] Emergency procedures

## 🆘 **Emergency Procedures**

### **If Admin Access Lost:**
1. Check credentials in `.env.local`
2. Reset password in `/api/admin/login/route.ts`
3. Clear browser localStorage
4. Check Discord for failed login alerts

### **If Forms Stop Working:**
1. Test webhook URLs in Discord
2. Check environment variables
3. Review server logs for errors
4. Test individual API endpoints

### **If Discord Stops Working:**
1. Verify webhook URLs are active
2. Check Discord server permissions
3. Test with different webhooks
4. Monitor rate limits

---

**🎯 Your complete admin system is ready!**

**Next Steps:**
1. Set up Discord servers and webhooks
2. Update environment variables
3. Test admin login and dashboard
4. Submit test forms to verify Discord notifications
5. Train your team on the system

**You now have a professional business management system that can handle hundreds of leads per day with real-time notifications and admin oversight.**