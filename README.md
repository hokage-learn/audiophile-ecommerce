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

Create a `.env.local` file in the root directory:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Email (SMTP) - Required for checkout confirmation emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Base URL (optional - defaults to localhost:3000)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### SMTP Configuration

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password as `SMTP_PASSWORD`

For other email providers, check their SMTP settings:
- **Outlook/Hotmail:** smtp-mail.outlook.com:587
- **SendGrid:** smtp.sendgrid.net:587 (requires API key)
- **Mailgun:** smtp.mailgun.org:587

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

The app uses Nodemailer to send order confirmation emails. Configure your SMTP settings in `.env.local`.

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
- `NEXT_PUBLIC_CONVEX_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `NEXT_PUBLIC_BASE_URL` (set to your deployed URL)

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

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
