# 🔧 How to Set Email Environment Variables in Convex

## ⚠️ CRITICAL: Convex Does NOT Read `.env.local`

You **must** set environment variables in the **Convex Dashboard**, not in `.env.local`.

The `.env.local` file only works for Next.js variables (like `NEXT_PUBLIC_CONVEX_URL`).
Convex Actions (like email sending) **require variables to be set in the Convex Dashboard**.

---

## 📋 Step-by-Step Instructions

### 1. Go to Convex Dashboard
1. Open: https://dashboard.convex.dev
2. Sign in with your account
3. Select your project: **audiophille**

### 2. Navigate to Environment Variables
1. Click **"Settings"** (gear icon ⚙️) in the left sidebar
2. Click **"Environment Variables"** tab
3. You'll see a list of existing variables (if any)

### 3. Add Each Variable
Click **"+ Add Variable"** and add these **exactly** as shown:

#### Variable 1: SMTP_HOST
- **Name:** `SMTP_HOST`
- **Value:** `smtp.gmail.com` (or your email provider's SMTP server)
- Click **"Save"**

#### Variable 2: SMTP_PORT
- **Name:** `SMTP_PORT`
- **Value:** `587` (for Gmail with TLS)
- Click **"Save"**

#### Variable 3: SMTP_USER
- **Name:** `SMTP_USER`
- **Value:** Your full email address (e.g., `your-email@gmail.com`)
- Click **"Save"**

#### Variable 4: SMTP_PASSWORD
- **Name:** `SMTP_PASSWORD`
- **Value:** Your **App Password** (not your regular password!)
- For Gmail: See instructions below to get App Password
- Click **"Save"**

#### Variable 5: EMAIL_FROM (Optional)
- **Name:** `EMAIL_FROM`
- **Value:** Your full email address (same as SMTP_USER)
- Click **"Save"**

---

## 🔐 How to Get Gmail App Password

**You CANNOT use your regular Gmail password!**

1. Go to: https://myaccount.google.com
2. Click **Security** (on the left sidebar)
3. Scroll to **"2-Step Verification"**
   - If not enabled, **enable it first** (this is required!)
4. After enabling 2-Step Verification, scroll down to **"App passwords"**
5. Click **"App passwords"**
6. Click **"Select app"** → Choose **"Mail"**
7. Click **"Select device"** → Choose **"Other"** → Type: `Audiophile Convex`
8. Click **"Generate"**
9. You'll get a **16-character password** (looks like: `abcd efgh ijkl mnop`)
10. **Copy this password** (remove any spaces)
11. Paste it as `SMTP_PASSWORD` in Convex Dashboard

---

## ✅ Verify Your Setup

After adding all variables:

1. Go back to your Next.js app
2. Try to checkout with a test order
3. Open the **Convex Dashboard → Logs**
4. Look for email-related logs
5. You should see:
   - `✅ Email sent successfully!` = Success!
   - `❌ Missing SMTP_HOST` = Variable not set properly

---

## 🐛 Troubleshooting

### Issue: "SMTP_HOST is Missing"
- **Fix:** Make sure you added `SMTP_HOST` in Convex Dashboard (not `.env.local`)

### Issue: "Authentication failed"
- **Fix:** Make sure you're using an **App Password**, not your regular Gmail password
- **Fix:** Make sure `SMTP_USER` is your full email address (with @gmail.com)

### Issue: Emails not arriving
- **Fix:** Check your spam/junk folder
- **Fix:** Verify the `to` email address in the logs
- **Fix:** Gmail has a daily sending limit (500 emails/day)

### Issue: "Connection timeout"
- **Fix:** Make sure `SMTP_HOST` is correct
- **Fix:** Check if `SMTP_PORT` is correct (587 for Gmail TLS)

---

## 📝 Quick Checklist

Before trying checkout, verify:

- [ ] All 5 variables added in **Convex Dashboard** (not `.env.local`)
- [ ] `SMTP_HOST` = `smtp.gmail.com` (or your provider)
- [ ] `SMTP_PORT` = `587`
- [ ] `SMTP_USER` = Your full email address
- [ ] `SMTP_PASSWORD` = App Password (16 characters, not regular password)
- [ ] `EMAIL_FROM` = Your full email address
- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated and copied correctly
- [ ] Checked Convex Dashboard → Logs for errors

---

## 🆘 Still Not Working?

Check the Convex Dashboard → Logs immediately after checkout:

1. Click **"Logs"** in the left sidebar
2. Filter by time (last 5 minutes)
3. Look for entries with `sendEmail` or `Email`
4. Read the error message carefully
5. Follow the specific error fix above

**Common fixes:**
- Regenerate App Password if authentication fails
- Double-check all variable names (case-sensitive!)
- Make sure no extra spaces in values
- Wait 1-2 minutes after adding variables for them to propagate

---

**Remember:** Convex environment variables are **separate** from Next.js environment variables. You need to set them in **TWO places**:
1. **Convex Dashboard** → For email sending (SMTP_* variables)
2. **`.env.local`** → For Next.js variables (NEXT_PUBLIC_*)

