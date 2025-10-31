/**
 * Generate unique order ID with collision prevention
 * Format: ORD-{timestamp}-{cartHash}-{random}
 */
export function generateOrderId(cart) {
  // Create a hash of cart items for idempotency
  const cartSignature = cart
    .map((item) => `${item.id}:${item.quantity}`)
    .sort()
    .join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < cartSignature.length; i++) {
    const char = cartSignature.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const cartHash = Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return `ORD-${timestamp}-${cartHash}-${random}`;
}

/**
 * Check if an order ID is valid format
 */
export function isValidOrderId(orderId) {
  return /^ORD-\d+-[A-Z0-9]+-[A-Z0-9]+$/.test(orderId);
}

