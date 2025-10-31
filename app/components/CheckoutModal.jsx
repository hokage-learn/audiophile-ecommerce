'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutModal({ cart, grandTotal, onClose }) {
  const router = useRouter();
  const firstItem = cart[0];
  const otherItemsCount = cart.length - 1;

  // Prevent body scroll when modal is open and manage focus
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Move focus to modal when it opens
    const modalElement = document.querySelector('[role="dialog"]');
    if (modalElement) {
      modalElement.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackToHome = () => {
    onClose();
    // Navigate to home after closing modal
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        aria-hidden="true"
      >
        {/* Modal */}
        <div 
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          aria-modal="true"
          tabIndex={-1}
          className="bg-white rounded-lg w-full max-w-[540px] p-8 md:p-12 relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-[64px] h-[64px] bg-[#D87D4A] rounded-full flex items-center justify-center">
              <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L10.5 20.5L29 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h2 id="modal-title" className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase text-center text-[#101010] mb-4">
            THANK YOU FOR YOUR ORDER
          </h2>
          
          {/* Confirmation Message */}
          <p id="modal-description" className="text-[15px] leading-[25px] text-center text-black/50 mb-8">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary */}
          <div className="rounded-lg overflow-hidden mb-6 grid grid-cols-[55%_45%]">
            {/* Left Side - Items (Gray/White) */}
            <div className="bg-[#F1F1F1] p-6">
              {firstItem && (
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-[50px] h-[50px] bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    {firstItem.image && (
                      <Image
                        src={firstItem.image}
                        alt={firstItem.name}
                        width={50}
                        height={50}
                        className="object-contain rounded-lg"
                      />
                    )}
                  </div>
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold leading-[25px] text-[#101010] truncate">
                      {firstItem.name}
                    </h3>
                    <p className="text-[14px] leading-[25px] text-black/50 font-bold">
                      ${firstItem.price.toLocaleString()}
                    </p>
                  </div>
                  {/* Quantity */}
                  <div className="text-[15px] font-bold leading-[25px] text-black/50">
                    x{firstItem.quantity}
                  </div>
                </div>
              )}
              
              {otherItemsCount > 0 && (
                <div className="pt-3 mt-3 border-t border-black/10">
                  <p className="text-[12px] leading-[16px] font-bold text-black/50 text-center">
                    and {otherItemsCount} other item{otherItemsCount > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Right Side - Grand Total (Black) */}
            <div className="bg-[#101010] p-6 flex flex-col justify-center">
              <div className="flex flex-col gap-2">
                <span className="text-[15px] leading-[25px] text-white/50 uppercase">GRAND TOTAL</span>
                <span className="text-[18px] font-bold text-white">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            onClick={handleBackToHome}
            className="block w-full bg-[#D87D4A] text-white py-[15px] px-8 text-center font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D87D4A] focus:ring-offset-2"
            aria-label="Back to home page"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </>
  );
}

