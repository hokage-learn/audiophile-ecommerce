'use client';

import { useCart } from './CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTax,
    getGrandTotal,
  } = useCart();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[1000]"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 w-full max-w-[400px] h-screen bg-white z-[1001] flex flex-col shadow-[-2px_0_10px_rgba(0,0,0,0.1)] transform translate-x-0 transition-transform duration-300 ease-in-out" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="flex justify-between items-center p-6 border-b border-[#F1F1F1]">
          <h2 className="text-lg font-bold tracking-[1.3px] uppercase">
            CART ({cart.length})
          </h2>
          <button
            className="bg-transparent border-none text-[32px] text-[#101010] cursor-pointer p-0 w-8 h-8 flex items-center justify-center leading-none hover:opacity-70"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-6 text-[#666666]">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded bg-[#F1F1F1] overflow-hidden flex-shrink-0">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold mb-1">{item.name}</h3>
                      <p className="text-[15px] font-bold text-[#666666]">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex items-center gap-4 bg-[#F1F1F1] px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-transparent border-none text-lg font-bold text-[#666666] cursor-pointer px-1 transition-colors hover:text-[#D87D4A]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-transparent border-none text-lg font-bold text-[#666666] cursor-pointer px-1 transition-colors hover:text-[#D87D4A]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="bg-transparent border-none text-[13px] text-[#666666] cursor-pointer underline p-0 hover:text-[#D87D4A]"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-[#F1F1F1] flex flex-col gap-2">
                <div className="flex justify-between text-[15px] text-[#666666]">
                  <span>SUBTOTAL</span>
                  <span>${getSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#666666]">
                  <span>SHIPPING</span>
                  <span>${getShipping().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#666666]">
                  <span>VAT (INCLUDED)</span>
                  <span>${getTax().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                  <span>TOTAL</span>
                  <span>${getGrandTotal().toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-4 w-full text-center bg-[#D87D4A] text-white py-[15px] px-8 font-bold text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors hover:bg-[#FBAF85]"
                onClick={() => setIsOpen(false)}
              >
                CHECKOUT
              </Link>
            </>
          )}
        </div>
      </div>

    </>
  );
}
