# 🚀 Deployment Guide: Audiophile to Vercel

Complete guide to deploy your Audiophile e-commerce app to Vercel with Convex backend.

---

## ✅ Summary

**For production, you need BOTH:**
1. **Convex deployed to production** (different from dev)
2. **Environment variables set in TWO places:**
   - Vercel Environment Variables (for Next.js)
   - Convex Dashboard Environment Variables (for email)

---

## 📋 Step-by-Step Deployment

### Step 1: Deploy Convex to Production

1. **Go to Convex Dashboard**: https://dashboard.convex.dev
2. **Select your project**: audiophille
3. **Click "Deployments"** in left sidebar
4. **Click "Create Production Deployment"**
5. **Wait for deployment to complete** (~2-3 minutes)
6. **Copy the Production URL** - it will look like:
   ```
   https://your-project-name-production.convex.cloud
   ```
   
   **📝 Save this URL - you'll need it for Vercel!**

---

### Step 2: Set Environment Variables in Vercel

1. **Go to Vercel**: https://vercel.com
2. **Create a new project** or select existing
3. **Import your GitHub repository**
4. **During setup, go to "Environment Variables"**
5. **Add these variables:**

#### Next.js Environment Variables (in Vercel):

```
Name: NEXT_PUBLIC_CONVEX_URL
Value: https://your-project-name-production.convex.cloud
```

```
Name: NEXT_PUBLIC_BASE_URL
Value: https://your-app-name.vercel.app
```

**📝 Note:** Update `NEXT_PUBLIC_BASE_URL` after first deployment with your actual Vercel URL.

---

### Step 3: Set Environment Variables in Convex Dashboard

**⚠️ CRITICAL:** You must ALSO set the email variables in Convex (not just Vercel)!

1. **Go to Convex Dashboard**: https://dashboard.convex.dev
2. **Settings** → **Environment Variables**
3. **Add these variables:**

```
Name: SMTP_HOST
Value: smtp.gmail.com
```

```
Name: SMTP_PORT
Value: 587
```

```
Name: SMTP_USER
Value: your-email@gmail.com
```

```
Name: SMTP_PASSWORD
Value: your-gmail-app-password (16 characters, no spaces)
```

```
Name: EMAIL_FROM
Value: your-email@gmail.com
```

**📝 These variables are separate from Vercel and required for email to work!**

---

### Step 4: Deploy to Vercel

1. **Push your code to GitHub**
2. **In Vercel dashboard, click "Deploy"**
3. **Wait for build to complete** (~2-3 minutes)
4. **Copy your live URL** (e.g., `https://audiophille.vercel.app`)

---

### Step 5: Update BASE_URL

After first deployment:

1. **Go to Vercel** → Your project → **Settings** → **Environment Variables**
2. **Edit `NEXT_PUBLIC_BASE_URL`:**
   - Change from placeholder to your actual Vercel URL
   - Save and redeploy

---

### Step 6: Seed Production Database

1. **Go to Convex Dashboard** → **Functions** → `seed:seedProducts`
2. **Make sure you're on the "Production" deployment** (top dropdown)
3. **Click "Run"**
4. **Verify products appear** in the Data → `products` table

---

### Step 7: Test Everything

Test in production:

- [ ] Homepage loads
- [ ] Products display
- [ ] Add to cart works
- [ ] Checkout form validates
- [ ] Order saves to Convex
- [ ] Success modal appears
- [ ] Email sends successfully
- [ ] Order confirmation page works

---

## 🔍 Troubleshooting

### Issue: "NEXT_PUBLIC_CONVEX_URL is not set"
**Fix:** Make sure you added it in Vercel Environment Variables and redeployed.

### Issue: Emails not sending
**Fix:** Check if you added email variables in **Convex Dashboard** (not just Vercel).

### Issue: Empty database
**Fix:** Seed the production database in Convex Dashboard.

### Issue: Wrong Convex URL
**Fix:** Make sure you're using the **Production** URL from Convex Dashboard, not dev.

---

## 📝 Environment Variables Summary

### In Vercel (for Next.js):
- `NEXT_PUBLIC_CONVEX_URL` → Production Convex URL
- `NEXT_PUBLIC_BASE_URL` → Your Vercel URL

### In Convex Dashboard (for email):
- `SMTP_HOST` → `smtp.gmail.com`
- `SMTP_PORT` → `587`
- `SMTP_USER` → Your Gmail
- `SMTP_PASSWORD` → App Password
- `EMAIL_FROM` → Your Gmail

---

## 🎯 Quick Checklist

Before going live:

- [ ] Convex deployed to production
- [ ] Production Convex URL copied
- [ ] Vercel project created
- [ ] `NEXT_PUBLIC_CONVEX_URL` set in Vercel
- [ ] `NEXT_PUBLIC_BASE_URL` set in Vercel
- [ ] All email variables set in Convex Dashboard
- [ ] Production database seeded
- [ ] Tested checkout flow
- [ ] Tested email sending
- [ ] All features working

---

## 🚀 You're Live!

After completing all steps, your app should be live at:
```
https://your-app-name.vercel.app
```

Happy deploying! 🎉

