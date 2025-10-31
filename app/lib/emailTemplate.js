export function generateOrderConfirmationEmail({
  customerName,
  orderId,
  items,
  shippingAddress,
  totals,
  baseUrl,
}) {
  const orderItemsRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toLocaleString()}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="format-detection" content="telephone=no, address=no, email=no">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #d87d4a; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">AUDIOPHILE</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #191919; margin: 0 0 20px 0; font-size: 24px;">Hi ${customerName},</h2>
              <p style="color: #666666; margin: 0 0 20px 0; line-height: 1.6;">
                Thank you for your order! We're excited to get your audio equipment to you.
              </p>
              
              <!-- Order ID -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; color: #191919; font-size: 14px; font-weight: bold;">ORDER NUMBER</p>
                <p style="margin: 5px 0 0 0; color: #d87d4a; font-size: 24px; font-weight: bold; letter-spacing: 1px;">${orderId}</p>
              </div>
              
              <!-- Order Items -->
              <h3 style="color: #191919; margin: 30px 0 15px 0; font-size: 18px;">Order Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #191919; font-weight: bold;">Product</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb; color: #191919; font-weight: bold;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb; color: #191919; font-weight: bold;">Price</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb; color: #191919; font-weight: bold;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsRows}
                </tbody>
              </table>
              
              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; color: #191919; font-weight: bold;">$${totals.subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; color: #191919; font-weight: bold;">$${totals.shipping.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Tax (VAT)</td>
                  <td style="padding: 8px 0; text-align: right; color: #191919; font-weight: bold;">$${totals.tax.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #191919; font-weight: bold; font-size: 18px;">Total</td>
                  <td style="padding: 12px 0; text-align: right; color: #191919; font-weight: bold; font-size: 18px;">$${totals.total.toLocaleString()}</td>
                </tr>
              </table>
              
              <!-- Shipping Address -->
              <div style="margin: 30px 0;">
                <h3 style="color: #191919; margin: 0 0 15px 0; font-size: 18px;">Shipping Address</h3>
                <p style="color: #666666; margin: 0; line-height: 1.8;">
                  ${customerName}<br>
                  ${shippingAddress.address}<br>
                  ${shippingAddress.city}, ${shippingAddress.zipCode}<br>
                  ${shippingAddress.country}
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${baseUrl}/order-confirmation/${orderId}" 
                   style="display: inline-block; background-color: #d87d4a; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                  View Your Order
                </a>
              </div>
              
              <!-- Support Info -->
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                  If you have any questions about your order, please contact us at:
                </p>
                <p style="color: #191919; margin: 0; font-size: 14px;">
                  <strong>Email:</strong> support@audiophile.com<br>
                  <strong>Phone:</strong> +1 (234) 567-8900
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #191919; padding: 30px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 14px;">© 2024 Audiophile. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

