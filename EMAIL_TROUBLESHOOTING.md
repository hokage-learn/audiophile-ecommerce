# 🔧 Email Troubleshooting Guide

## Issue: Emails Not Being Delivered

If you've set up SMTP environment variables but emails aren't being sent, follow these steps:

## ✅ Step 1: Verify Convex Environment Variables

**Important:** Convex does NOT read from `.env.local` files. You must set environment variables in the Convex Dashboard.

### How to Set Environment Variables in Convex:

1. Go to https://dashboard.convex.dev
2. Sign in and select your project: **audiophille**
3. Click **"Settings"** (gear icon) in the left sidebar
4. Click **"Environment Variables"** tab
5. Click **"+ Add Variable"** for each:

#### Required Variables:

1. **SMTP_HOST**
   - For Gmail: `smtp.gmail.com`
   - For Outlook: `smtp-mail.outlook.com`
   - For other providers: Check your email provider's documentation

2. **SMTP_PORT**
   - For Gmail: `587` (TLS) or `465` (SSL)
   - For Outlook: `587`
   - Common ports: `587` (TLS), `465` (SSL), `25` (not recommended)

3. **SMTP_USER**
   - Your full email address (e.g., `your-email@gmail.com`)

4. **SMTP_PASSWORD**
   - **NOT your regular password!**
   - For Gmail: You need an **App Password** (see Step 2)
   - For other providers: Check if they support app passwords

5. **EMAIL_FROM** (optional)
   - The "from" email address
   - If not set, uses `SMTP_USER`

## ✅ Step 2: Get Gmail App Password

If using Gmail, you **must** use an App Password, not your regular password:

1. Go to: https://myaccount.google.com
2. Click **Security** → **2-Step Verification** (must be enabled first!)
3. Scroll to **"App passwords"**
4. Click **"Select app"** → Choose **"Mail"**
5. Click **"Select device"** → Choose **"Other"** → Type "Audiophile Convex"
6. Click **"Generate"**
7. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)
8. **Paste it in `SMTP_PASSWORD` in Convex Dashboard** (remove spaces)

## ✅ Step 3: Check Email Logs

After setting up, check the Convex Dashboard logs:

1. Go to Convex Dashboard → **"Logs"** tab
2. Look for email-related logs when you submit a checkout
3. You should see:
   - `✅ Email sent successfully!` - Success!
   - `❌ Error sending email:` - Something went wrong

## ✅ Step 4: Common Issues & Fixes

### Issue 1: "Authentication failed"
- **Fix:** Make sure you're using an App Password, not your regular password
- **Fix:** Verify `SMTP_USER` is your full email address

### Issue 2: "Connection timeout"
- **Fix:** Check if `SMTP_HOST` is correct
- **Fix:** Verify `SMTP_PORT` is correct (587 for Gmail TLS)
- **Fix:** Check your firewall/network settings

### Issue 3: "Invalid credentials"
- **Fix:** Double-check `SMTP_PASSWORD` - make sure no extra spaces
- **Fix:** Regenerate App Password if needed

### Issue 4: "Email not arriving"
- **Fix:** Check spam/junk folder
- **Fix:** Verify recipient email is correct
- **Fix:** Some email providers have sending limits (Gmail: 500 emails/day)

## ✅ Step 5: Test Email Configuration

You can test your email setup directly in Convex Dashboard:

1. Go to **"Functions"** tab
2. Find `sendEmail:sendOrderConfirmation` action
3. Click **"Run"**
4. Provide test JSON:
   ```json
   {
     "orderId": "TEST-123",
     "customerName": "Test User",
     "customerEmail": "your-test-email@gmail.com",
     "shippingAddress": {
       "address": "123 Test St",
       "city": "Test City",
       "zipCode": "12345",
       "country": "Test Country"
     },
     "items": [
       {
         "name": "Test Product",
         "price": 100,
         "quantity": 1
       }
     ],
     "totals": {
       "subtotal": 100,
       "shipping": 50,
       "tax": 20,
       "total": 170
     },
     "emailHtml": "<h1>Test Email</h1>"
   }
   ```
5. Click **"Run"**
6. Check logs for success/error messages

## 🔍 Debug Checklist

- [ ] Environment variables set in Convex Dashboard (not `.env.local`)
- [ ] `SMTP_HOST` is correct for your email provider
- [ ] `SMTP_PORT` matches your email provider (587 for Gmail)
- [ ] `SMTP_USER` is your full email address
- [ ] `SMTP_PASSWORD` is an App Password (not regular password)
- [ ] 2-Step Verification enabled (for Gmail)
- [ ] No extra spaces in environment variables
- [ ] Recipient email is correct
- [ ] Check spam/junk folder
- [ ] Check Convex logs for error messages

## 📝 Quick Reference: Gmail Setup

```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: your-email@gmail.com
SMTP_PASSWORD: [16-character App Password]
EMAIL_FROM: your-email@gmail.com (optional)
```

## 🆘 Still Not Working?

1. Check Convex Dashboard → Logs for detailed error messages
2. Try a different email provider (Resend, SendGrid, Mailgun)
3. Verify your email provider allows SMTP access
4. Check if your email provider has IP whitelisting requirements

---

**Note:** The email action will not block checkout if it fails - your order will still be saved to Convex even if the email doesn't send.

