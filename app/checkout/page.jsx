'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useAction } from 'convex/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../components/CartContext';
import { api } from '../../convex/_generated/api';
import { generateOrderConfirmationEmail } from '../lib/emailTemplate';
import { generateOrderId } from '../utils/orderIdGenerator';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getSubtotal, getShipping, getTax, getGrandTotal, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCart, setOrderCart] = useState(null); // Store cart data for modal before clearing
  const [orderGrandTotal, setOrderGrandTotal] = useState(0); // Store grand total for modal
  const createOrder = useMutation(api.orders.createOrder);
  const sendEmail = useAction(api.sendEmail.sendOrderConfirmation);

  // If cart is empty AND no modal is showing, show empty cart message
  if (cart.length === 0 && !showModal && !orderCart) {
    return (
      <>
        <Header />
        <Cart />
        <main className="bg-[#F2F2F2] min-h-screen py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <h1 className="text-[40px] font-bold mb-4">Your cart is empty</h1>
              <Link href="/" className="text-[#D87D4A] hover:underline inline-block">
                Return to shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSubmit = async (values, { setSubmitting: setFormikSubmitting }) => {
    if (cart.length === 0) {
      setError('Your cart is empty. Please add items to your cart before checking out.');
      if (setFormikSubmitting) setFormikSubmitting(false);
      return;
    }

    if (isSubmitting) {
      if (setFormikSubmitting) setFormikSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    if (setFormikSubmitting) {
      setFormikSubmitting(true);
    }

    try {
      // Generate unique order ID with collision prevention
      const orderId = generateOrderId(cart);

      // Prepare order data
      const orderData = {
        orderId,
        customerName: values.name,
        customerEmail: values.email,
        customerPhone: values.phone,
        shippingAddress: {
          address: values.address,
          city: values.city,
          zipCode: values.zipCode,
          country: values.country,
        },
        items: cart.map((item) => ({
          productId: item.id, // Note: This should be a Convex ID if available
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totals: {
          subtotal: getSubtotal(),
          shipping: getShipping(),
          tax: getTax(),
          total: getGrandTotal(),
        },
      };

      // Save order to Convex
      // Note: The orderId is unique, so duplicate submissions will fail gracefully
      let orderDbId;
      try {
        orderDbId = await createOrder(orderData);
      } catch (orderError) {
        // Check if it's a duplicate order error
        if (orderError.message?.includes('duplicate') || orderError.message?.includes('already exists')) {
          setError('This order has already been processed. Please check your email for confirmation.');
          setIsSubmitting(false);
          return;
        }
        throw orderError; // Re-throw if it's a different error
      }

      // Generate email HTML
      const emailHtml = generateOrderConfirmationEmail({
        customerName: values.name,
        orderId,
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: orderData.shippingAddress,
        totals: orderData.totals,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
      });

      // Send confirmation email (non-blocking - order is already saved)
      let emailResult = null;
      try {
        emailResult = await sendEmail({
          orderId,
          customerName: values.name,
          customerEmail: values.email,
          shippingAddress: orderData.shippingAddress,
          items: orderData.items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totals: orderData.totals,
          emailHtml,
        });
      } catch (emailError) {
        // Email failed but order is still saved
      }

      // Save cart data BEFORE clearing (for modal display)
      const cartForModal = [...cart];
      const grandTotalForModal = getGrandTotal();

      // Reset form state
      setIsSubmitting(false);
      if (setFormikSubmitting) {
        setFormikSubmitting(false);
      }

      // Show success modal immediately (BEFORE clearing cart)
      setOrderCart(cartForModal);
      setOrderGrandTotal(grandTotalForModal);
      setShowModal(true);

      // Clear cart after showing modal
      // Only clear if order was actually created (not a duplicate)
      if (orderDbId) {
        clearCart();
      }

      // Don't auto-redirect - let user click "BACK TO HOME" button
      // Modal will handle navigation when user clicks button

    } catch (err) {
      setError(err.message || 'Failed to process order. Please try again.');
      setIsSubmitting(false);
      setFormikSubmitting(false);
    } finally {
      // Always reset Formik submitting state
      if (setFormikSubmitting) {
        setFormikSubmitting(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Cart />
      {showModal && orderCart && (
        <CheckoutModal
          cart={orderCart}
          grandTotal={orderGrandTotal}
          onClose={() => {
            setShowModal(false);
            setOrderCart(null);
            setOrderGrandTotal(0);
          }}
        />
      )}
      <main className="bg-[#F2F2F2] min-h-screen py-16">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
          {/* Go Back Link */}
          <Link href="/" className="text-[15px] leading-[25px] text-black/50 hover:text-[#D87D4A] transition-colors mb-8 inline-block">
            Go Back
          </Link>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-32">
            {/* Checkout Form - Left Side */}
            <div className="bg-white rounded-lg p-6 md:p-8">
              <CheckoutForm onSubmit={handleSubmit} error={error} isSubmitting={isSubmitting} />
            </div>

            {/* Order Summary - Right Side */}
            <div className="bg-white rounded-lg p-6 md:p-8 h-fit lg:sticky lg:top-8">
              <h2 className="text-[18px] font-bold tracking-[1.3px] uppercase mb-8">SUMMARY</h2>

              {/* Cart Items */}
              <div className="flex flex-col gap-6 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain rounded-lg"
                        />
                      )}
                    </div>
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold leading-[25px] text-[#101010] truncate">
                        {item.name}
                      </h3>
                      <p className="text-[14px] leading-[25px] text-black/50 font-bold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    {/* Quantity */}
                    <div className="text-[15px] font-bold leading-[25px] text-black/50">
                      x{item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-[15px] leading-[25px] text-black/50 uppercase">TOTAL</span>
                  <span className="text-[18px] font-bold text-[#101010]">
                    ${getSubtotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] leading-[25px] text-black/50 uppercase">SHIPPING</span>
                  <span className="text-[18px] font-bold text-[#101010]">
                    ${getShipping().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] leading-[25px] text-black/50 uppercase">VAT (INCLUDED)</span>
                  <span className="text-[18px] font-bold text-[#101010]">
                    ${getTax().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#F1F1F1]">
                  <span className="text-[18px] font-bold leading-[25px] text-[#101010] uppercase">GRAND TOTAL</span>
                  <span className="text-[18px] font-bold text-[#D87D4A]">
                    ${getGrandTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Continue & Pay Button */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#D87D4A] text-white py-[15px] px-8 font-bold text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors hover:bg-[#FBAF85] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                disabled={cart.length === 0 || isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'PROCESSING...' : 'CONTINUE & PAY'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

