# Audiophile E-commerce Website

A pixel-perfect e-commerce website built with Next.js, React, Tailwind CSS, and Convex backend.

## Features

- Pixel-perfect design matching Figma specifications
- Responsive design (mobile, tablet, desktop)
- Product catalog with categories (Headphones, Speakers, Earphones)
- Shopping cart functionality
- Checkout flow with form validation
- Order confirmation with email notifications
- Convex backend integration
- Accessible UI components

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v3
- **Backend:** Convex (database, queries, mutations, actions)
- **Form Validation:** Formik, Yup
- **Email Service:** Nodemailer
- **State Management:** React Context (Cart)
- **Font:** Manrope (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Convex account (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Convex:
   ```bash
   npx convex dev
   ```
   Follow the prompts to create a new Convex project or link to an existing one.

4. Seed the database (optional):
   - In the Convex dashboard, go to Functions → `seed:seedProducts`
   - Click "Run" to populate products

### Environment Variables

**⚠️ Important:** Convex environment variables must be set in Convex Dashboard (not `.env.local`)

#### In Convex Dashboard:
1. Go to https://dashboard.convex.dev
2. Settings → Environment Variables
3. Add these variables:
   - `SMTP_HOST` → smtp.gmail.com
   - `SMTP_PORT` → 587
   - `SMTP_USER` → your-email@gmail.com
   - `SMTP_PASSWORD` → your-app-password (16 characters, no spaces)
   - `EMAIL_FROM` → your-email@gmail.com

#### In `.env.local` (for Next.js):
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
audiophille/
├── app/
│   ├── category/          # Category pages
│   ├── checkout/          # Checkout page
│   ├── components/        # React components
│   │   ├── sections/     # Page sections
│   │   └── ...
│   ├── order-confirmation/ # Order confirmation page
│   ├── products/          # Product detail pages
│   └── ...
├── convex/
│   ├── schema.js         # Database schema
│   ├── products.js       # Product queries
│   ├── orders.js         # Order mutations/queries
│   ├── sendEmail.ts      # Email action
│   └── seed.js           # Seed data
├── public/               # Static assets
└── ...
```

## Features Overview

### Shopping Cart
- Add/remove items
- Update quantities
- Persist in localStorage
- Real-time totals calculation

### Checkout Flow
1. Collect customer information (billing, shipping, payment)
2. Validate all fields with inline error messages
3. Create order in Convex database
4. Send confirmation email
5. Clear cart
6. Show success modal
7. Redirect to order confirmation page

### Order Confirmation
- Display order summary
- Show customer details
- Display shipping address
- List all ordered items
- Show totals breakdown

## Convex Setup

1. Create a Convex account: https://convex.dev
2. Install Convex CLI: `npm install -g convex`
3. Run `npx convex dev` to initialize
4. The schema and functions will be automatically synced

### Database Schema

**Products:**
- name, slug, description, price, image, category
- Optional: isNew, features, includes, gallery, relatedProducts

**Orders:**
- orderId, customerName, customerEmail, customerPhone
- shippingAddress (address, city, zipCode, country)
- items (productId, name, price, quantity)
- totals (subtotal, shipping, tax, total)
- status, createdAt

## Email Configuration

The app uses Nodemailer to send order confirmation emails. Configure your SMTP settings in **Convex Dashboard**.

**Email Template Includes:**
- Customer greeting
- Order ID and summary
- Purchased items list
- Shipping address
- Totals breakdown
- "View Your Order" CTA link
- Support contact information

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Required Environment Variables:**

**In Vercel Dashboard:**
- `NEXT_PUBLIC_CONVEX_URL` → Your Convex production URL
- `NEXT_PUBLIC_BASE_URL` → Your deployed Vercel URL

**In Convex Dashboard (Settings → Environment Variables):**
- `SMTP_HOST` → smtp.gmail.com
- `SMTP_PORT` → 587
- `SMTP_USER` → your-email@gmail.com
- `SMTP_PASSWORD` → your-app-password
- `EMAIL_FROM` → your-email@gmail.com

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Testing

Run the test suite (if configured):
```bash
npm test
```

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader announcements
- Focus management
- Form validation with accessible error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
