# 📘 Step-by-Step Convex Dashboard Guide

## What You Need to Do in the Convex Dashboard

Follow these steps to complete your setup and verify everything is working.

---

## Step 1: Access Your Convex Dashboard

1. Go to **https://dashboard.convex.dev**
2. Sign in with your account (the one you used during `npx convex dev`)
3. You should see your project: **audiophille** (or the name you chose)

---

## Step 2: Verify Database Schema ✅

### Check Tables Exist:

1. Click on **"Data"** in the left sidebar
2. You should see two tables:
   - ✅ **`products`** - Your product catalog
   - ✅ **`orders`** - Customer orders

3. Click on **`products`** table
   - You should see **6 products** (if you ran the seed function)
   - Each product should have: name, slug, price, image, category, etc.

**If products are missing:**
- See Step 3 below to seed the database

---

## Step 3: Seed Products (If Needed) 🌱

### Option A: Using Dashboard UI (Recommended)

1. Click on **"Functions"** in the left sidebar
2. Scroll down to find **`seed:seedProducts`**
3. Click on **`seedProducts`**
4. Click the **"Run"** button (top right)
5. Wait for execution to complete
6. You should see: `{ message: 'Seeded 6 products successfully!' }`

### Option B: Using Terminal

```bash
cd audiophille
npx convex run seed:seedProducts
```

### Verify Products:

1. Go back to **"Data"** → **`products`** table
2. You should now see 6 products:
   - XX99 MARK II HEADPHONES
   - XX99 MARK I HEADPHONES
   - XX59 HEADPHONES
   - ZX9 SPEAKER
   - ZX7 SPEAKER
   - YX1 EARPHONES

---

## Step 4: Set Environment Variables for Email 📧

### For Email Functionality:

1. Click on **"Settings"** (gear icon) in the left sidebar
2. Go to **"Environment Variables"** tab
3. Add these variables (click **"+ Add Variable"** for each):

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `SMTP_HOST` | `smtp.gmail.com` | Your email provider's SMTP server |
   | `SMTP_PORT` | `587` | SMTP port (587 for TLS) |
   | `SMTP_USER` | `your-email@gmail.com` | Your email address |
   | `SMTP_PASSWORD` | `your-app-password` | **App-specific password** (see below) |
   | `EMAIL_FROM` | `your-email@gmail.com` | Sender email (usually same as SMTP_USER) |

### Getting Gmail App Password:

1. Go to **Google Account Settings**: https://myaccount.google.com
2. Click **Security** → **2-Step Verification** (must be enabled)
3. Scroll to **"App passwords"**
4. Click **"Select app"** → Choose **"Mail"**
5. Click **"Select device"** → Choose **"Other"** → Type "Audiophile"
6. Click **"Generate"**
7. Copy the 16-character password (no spaces)
8. Use this in `SMTP_PASSWORD`

### Other Email Providers:

**Outlook/Hotmail:**
- `SMTP_HOST`: `smtp-mail.outlook.com`
- `SMTP_PORT`: `587`

**SendGrid:**
- `SMTP_HOST`: `smtp.sendgrid.net`
- `SMTP_PORT`: `587`
- `SMTP_USER`: `apikey`
- `SMTP_PASSWORD`: Your SendGrid API key

---

## Step 5: Test Functions 🔧

### Test Product Query:

1. Go to **"Functions"** → **`products:getProducts`**
2. Click **"Run"**
3. You should see an array of 6 products
4. ✅ **Success if you see product data**

### Test Order Creation:

1. Go to **"Functions"** → **`orders:createOrder`**
2. **Important:** You'll see the CODE tab - this is just for viewing. **Don't modify the code!**
3. Click the **"Run"** button (usually top right)
4. A dialog/modal will appear with an input field
5. Paste this test JSON in the input field:
   ```json
   {
     "orderId": "TEST-12345",
     "customerName": "Test Customer",
     "customerEmail": "test@example.com",
     "customerPhone": "1234567890",
     "shippingAddress": {
       "address": "123 Test St",
       "city": "Test City",
       "zipCode": "12345",
       "country": "USA"
     },
     "items": [
       {
         "productId": "j00000000000000000000000",
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
     }
   }
   ```
   **Note:** For a real `productId`, go to Data → `products` table and copy any product's `_id` value.
6. Click **"Run"** or **"Execute"** in the dialog
7. You should see a success message with the new order ID
8. Check **"Data"** → **`orders`** table to see the new order
9. ✅ **Success if order appears in database**

**See `TESTING_FUNCTIONS.md` for more detailed instructions!**

---

## Step 6: Test Email Action 📬

**⚠️ Requires SMTP environment variables (Step 4)**

1. Go to **"Functions"** → **`sendEmail:sendOrderConfirmation`**
2. Click **"Run"**
3. Provide test data:
   ```json
   {
     "orderId": "TEST-12345",
     "customerName": "Test Customer",
     "customerEmail": "your-real-email@gmail.com",
     "shippingAddress": {
       "address": "123 Test St",
       "city": "Test City",
       "zipCode": "12345",
       "country": "USA"
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
     "emailHtml": "<html><body><h1>Test Email</h1></body></html>"
   }
   ```
4. Click **"Run"**
5. Check your email inbox
6. ✅ **Success if you receive the email**

**Common Issues:**
- ❌ "SMTP configuration is missing" → Add environment variables (Step 4)
- ❌ "Authentication failed" → Check SMTP credentials
- ❌ "Invalid app password" → Generate new Gmail app password

---

## Step 7: View Logs 📋

### Check Function Logs:

1. Click on **"Logs"** in the left sidebar
2. You'll see execution logs for all functions
3. Look for any errors or warnings
4. ✅ **Green checkmarks** = Success
5. ❌ **Red errors** = Need investigation

### Common Log Messages:

- ✅ `"Seeded 6 products successfully!"` - Products seeded
- ✅ `"Order created successfully"` - Order saved
- ✅ `"Email sent successfully"` - Email delivered
- ❌ `"SMTP configuration is missing"` - Add env vars
- ❌ `"Product not found"` - Run seed function

---

## Step 8: Monitor Orders 📦

### View All Orders:

1. Go to **"Data"** → **`orders`** table
2. You'll see all customer orders
3. Each order shows:
   - Order ID
   - Customer info
   - Items
   - Totals
   - Status
   - Created date

### Query Orders:

1. Go to **"Functions"** → **`orders:getOrderById`**
2. Run with an order ID from the database
3. Should return full order details

---

## Step 9: Production Deployment 🚀

### When Deploying to Production:

1. Go to **"Deployments"** in the left sidebar
2. Click **"Create Production Deployment"**
3. This creates a production URL (different from dev)
4. Update your `.env.local` (or production env vars) with production URL:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-production-url.convex.cloud
   ```

### Environment Variables in Production:

Make sure to add all environment variables to your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

---

## ✅ Quick Verification Checklist

Before testing your app, verify:

- [ ] **Products table** has 6 products
- [ ] **Orders table** exists (may be empty initially)
- [ ] **Environment variables** set for email (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM)
- [ ] **Functions** can run without errors
- [ ] **Logs** show successful executions
- [ ] **Test order creation** works
- [ ] **Test email sending** works (if SMTP configured)

---

## 🆘 Troubleshooting

### Products Not Showing:
- Run seed function: `npx convex run seed:seedProducts`
- Check Data → products table
- Verify seed function in Functions tab

### Email Not Sending:
- Verify all SMTP env vars are set
- Check Gmail app password is correct
- Look at Logs for error messages
- Test email function manually in Dashboard

### Functions Not Working:
- Check Logs for errors
- Verify schema is correct
- Ensure function names match (products.js, orders.js)

### Can't Access Dashboard:
- Go to https://dashboard.convex.dev
- Sign in with same account used for `npx convex dev`
- Select correct project

---

## 🎉 You're Done!

Once you've completed these steps, your Audiophile e-commerce site is fully configured!

**Next Steps:**
1. Test the app at http://localhost:3000
2. Add products to cart
3. Complete checkout flow
4. Verify orders appear in Convex
5. Check email inbox for confirmations

---

**Need Help?**
- Convex Docs: https://docs.convex.dev
- Check Logs in Dashboard
- Verify environment variables are set correctly

