# 🧪 Testing Functions in Convex Dashboard

## How to Test `createOrder` Function

### Step-by-Step:

1. **Go to Functions** → Click on `orders:createOrder`
2. **You'll see the CODE tab** (this is just viewing the code - don't modify it)
3. **Click the "Run" button** (usually at the top right)
4. **A dialog/modal will appear** asking for input
5. **Paste your JSON** in the input field
6. **Click "Run" or "Execute"**

---

## 📝 JSON Format for `createOrder`

When you click "Run", paste this JSON in the input field:

```json
{
  "orderId": "ORD-TEST-12345",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "1234567890",
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "New York",
    "zipCode": "10001",
    "country": "United States"
  },
  "items": [
    {
      "productId": "j9xyz123abc456def789",
      "name": "XX99 MARK II HEADPHONES",
      "price": 2999,
      "quantity": 1
    },
    {
      "productId": "j9xyz123abc456def790",
      "name": "ZX9 SPEAKER",
      "price": 4500,
      "quantity": 2
    }
  ],
  "totals": {
    "subtotal": 11998,
    "shipping": 50,
    "tax": 2399.6,
    "total": 14447.6
  }
}
```

---

## ⚠️ Important Notes:

### 1. **productId Format:**
The `productId` field expects a Convex ID format like `"j9xyz123abc456def789"`. 

**To get a real product ID:**
1. Go to **Data** → **`products`** table
2. Click on any product row
3. Copy the `_id` field value
4. Use that in your test JSON

**OR use this simpler test** (with a placeholder):
```json
{
  "orderId": "TEST-ORD-001",
  "customerName": "Test Customer",
  "customerEmail": "test@example.com",
  "customerPhone": "555-1234",
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

### 2. **Don't Modify the Code Tab**
- The CODE tab is for **viewing only**
- You **don't edit** the function code there
- Just click **"Run"** and provide JSON input

### 3. **What Happens:**
- The function creates an order in the database
- Returns the Convex ID of the new order
- Check **Data** → **`orders`** table to see your new order

---

## 🎯 Quick Test Steps:

1. **Navigate:** Functions → `orders:createOrder`
2. **Click:** "Run" button (top right)
3. **Paste:** JSON from above
4. **Execute:** Click "Run" or "Execute"
5. **Verify:** Go to Data → `orders` table
6. **Success:** You'll see your test order!

---

## 🔍 Where to Put JSON:

```
┌─────────────────────────────────┐
│  Functions / orders:createOrder │
├─────────────────────────────────┤
│  [CODE] [RUN]  ← Click RUN here │
│                                 │
│  ┌───────────────────────────┐ │
│  │  Input JSON:              │ │
│  │  {                        │ │
│  │    "orderId": "...",     │ │  ← Paste JSON here
│  │    ...                   │ │
│  │  }                        │ │
│  └───────────────────────────┘ │
│                                 │
│  [Cancel] [Run]                │
└─────────────────────────────────┘
```

**NOT in the CODE editor** - in the **Run dialog's input field**!

---

## ✅ Expected Result:

After running, you should see:
```json
{
  "status": "success",
  "result": "j9xyz123abc456def789"  // The new order's Convex ID
}
```

Then check **Data** → **`orders`** table to see your order!

