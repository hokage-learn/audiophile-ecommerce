# 🔧 Fix: Email Configuration Error

## Error Message
```
SMTP configuration is missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.
```

## ✅ Good News!
**Your checkout form is working correctly!** The order was saved successfully to Convex. The error is just about email configuration, which is optional.

## 🔧 How to Fix

### Step 1: Go to Convex Dashboard
1. Open: https://dashboard.convex.dev
2. Sign in and select your project: **audiophille**

### Step 2: Add Environment Variables
1. Click **"Settings"** (gear icon) in left sidebar
2. Click **"Environment Variables"** tab
3. Click **"+ Add Variable"** for each:

#### Variable 1: SMTP_HOST
- **Name:** `SMTP_HOST`
- **Value:** `smtp.gmail.com`
- Click **"Save"**

#### Variable 2: SMTP_PORT
- **Name:** `SMTP_PORT`
- **Value:** `587`
- Click **"Save"**

#### Variable 3: SMTP_USER
- **Name:** `SMTP_USER`
- **Value:** `your-email@gmail.com` (your actual Gmail)
- Click **"Save"**

#### Variable 4: SMTP_PASSWORD
- **Name:** `SMTP_PASSWORD`
- **Value:** Your Gmail App Password (see below)
- Click **"Save"**

#### Variable 5: EMAIL_FROM
- **Name:** `EMAIL_FROM`
- **Value:** `your-email@gmail.com` (same as SMTP_USER)
- Click **"Save"**

### Step 3: Get Gmail App Password

1. Go to: https://myaccount.google.com
2. Click **Security** → **2-Step Verification** (must be enabled)
3. Scroll to **"App passwords"**
4. Click **"Select app"** → Choose **"Mail"**
5. Click **"Select device"** → Choose **"Other"** → Type "Audiophile"
6. Click **"Generate"**
7. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)
8. Paste it in `SMTP_PASSWORD` in Convex (remove spaces)

### Step 4: Test
1. Try checkout again
2. Email should now send successfully
3. Check your inbox for confirmation

---

## ✅ What's Working Now

- ✅ **Checkout form submits** - Form validation works
- ✅ **Order saved to Convex** - Orders table has your order
- ✅ **Order confirmation page** - Shows after checkout
- ⚠️ **Email sending** - Needs SMTP config (optional)

---

## 🚀 Quick Test (Without Email)

You can test the full checkout flow right now:
1. Fill out checkout form
2. Submit order
3. Order is saved to Convex ✅
4. You'll see success modal ✅
5. Redirect to order confirmation page ✅
6. Check Convex Dashboard → Data → `orders` table to see your order ✅

Email is optional - everything else works perfectly!

---

## 📝 Notes

- **Order is saved** even if email fails
- **Email is just a notification** - not required for checkout to work
- You can set up email later and it will work automatically
- All orders are visible in Convex Dashboard → Data → `orders`

---

**Once you add the SMTP variables in Convex Dashboard, emails will start sending automatically!** 📧

