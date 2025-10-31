'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId;
  const order = useQuery(api.orders.getOrderById, { orderId });
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Announce to screen readers
    if (order) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Order ${orderId} confirmed. Total: $${order.totals.total.toLocaleString()}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  }, [order, orderId]);

  if (!isClient) {
    return (
      <>
        <Header />
        <Cart />
        <main className="bg-white min-h-screen py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <p className="text-[15px] leading-[25px] text-black/50">Loading order...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (order === undefined) {
    return (
      <>
        <Header />
        <Cart />
        <main className="bg-white min-h-screen py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <p className="text-[15px] leading-[25px] text-black/50">Loading order...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show loading while querying
  if (order === undefined && !hasError) {
    return (
      <>
        <Header />
        <Cart />
        <main className="bg-white min-h-screen py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <p className="text-[15px] leading-[25px] text-black/50">Loading order...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show error if order not found after query completes
  if (order === null || hasError) {
    return (
      <>
        <Header />
        <Cart />
        <main className="bg-white min-h-screen py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <h1 className="text-[40px] font-bold mb-4">Order Not Found</h1>
              <p className="text-[15px] leading-[25px] text-black/50 mb-8">
                We couldn't find an order with that ID. It may have been deleted or the URL is incorrect.
              </p>
              <Link href="/" className="text-[#D87D4A] hover:underline inline-block">
                Return to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Cart />
      <main className="bg-white min-h-screen py-16">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
          <div className="max-w-[730px] mx-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-[64px] h-[64px] bg-[#D87D4A] rounded-full flex items-center justify-center">
                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L10.5 20.5L29 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h1 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase text-center text-[#101010] mb-4">
              THANK YOU FOR YOUR ORDER
            </h1>
            
            <p className="text-[15px] leading-[25px] text-center text-black/50 mb-12">
              You will receive an email confirmation shortly.
            </p>

            {/* Order Details */}
            <div className="bg-[#F1F1F1] rounded-lg p-6 md:p-8 mb-6">
              {/* Order ID */}
              <div className="mb-8">
                <p className="text-[15px] leading-[25px] text-black/50 font-bold mb-2 uppercase">ORDER NUMBER</p>
                <p className="text-[18px] leading-[25px] font-bold text-[#D87D4A] tracking-[1.3px]">
                  {order.orderId}
                </p>
              </div>

              {/* Customer Info */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold tracking-[1px] uppercase text-[#101010] mb-4">CUSTOMER DETAILS</h3>
                <div className="space-y-2 text-[15px] leading-[25px] text-black/50">
                  <p><strong className="text-[#101010]">Name:</strong> {order.customerName}</p>
                  <p><strong className="text-[#101010]">Email:</strong> {order.customerEmail}</p>
                  <p><strong className="text-[#101010]">Phone:</strong> {order.customerPhone}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold tracking-[1px] uppercase text-[#101010] mb-4">SHIPPING ADDRESS</h3>
                <div className="space-y-2 text-[15px] leading-[25px] text-black/50">
                  <p>{order.customerName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold tracking-[1px] uppercase text-[#101010] mb-4">ORDER ITEMS</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-black/10 last:border-0">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-[15px] font-bold leading-[25px] text-[#101010]">{item.name}</span>
                        <span className="text-[15px] font-bold leading-[25px] text-black/50">x{item.quantity}</span>
                      </div>
                      <span className="text-[15px] font-bold leading-[25px] text-[#101010]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals */}
              <div className="mb-8 pt-6 border-t border-black/20">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[15px] leading-[25px] text-black/50 uppercase">SUBTOTAL</span>
                    <span className="text-[18px] font-bold text-[#101010]">
                      ${order.totals.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[15px] leading-[25px] text-black/50 uppercase">SHIPPING</span>
                    <span className="text-[18px] font-bold text-[#101010]">
                      ${order.totals.shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[15px] leading-[25px] text-black/50 uppercase">VAT (INCLUDED)</span>
                    <span className="text-[18px] font-bold text-[#101010]">
                      ${order.totals.tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-black/20">
                    <span className="text-[18px] font-bold leading-[25px] text-[#101010] uppercase">TOTAL</span>
                    <span className="text-[18px] font-bold text-[#D87D4A]">
                      ${order.totals.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <p className="text-[13px] font-bold tracking-[1px] uppercase text-[#101010] mb-2">ORDER STATUS</p>
                <p className="text-[15px] font-bold leading-[25px] text-[#D87D4A] uppercase">
                  {order.status}
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-[#D87D4A] text-white py-[15px] px-8 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:ring-offset-2"
                aria-label="Back to home page"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

