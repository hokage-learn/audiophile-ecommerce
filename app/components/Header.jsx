'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import Image from 'next/image';

export default function Header({ cartIconSrc = '/cart.svg' }) {
  const { getTotalItems, setIsOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-[#101010] text-white py-6 relative z-50">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
          <div className="flex items-center">
            {/* Hamburger Menu - Mobile Only */}
            <button
              className="md:hidden p-2 bg-transparent border-none cursor-pointer text-white hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo - Center on Mobile, Left on Desktop */}
            <Link href="/" className="text-lg font-bold tracking-[1.3px] text-white md:mr-auto flex-1 md:flex-none text-center md:text-left">
              audiophile
            </Link>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:flex flex-1 justify-center">
              <nav className="flex gap-8">
                <Link href="/" className="text-[13px] font-bold tracking-[1px] uppercase text-white hover:text-[#D87D4A] transition-colors">
                  HOME
                </Link>
                <Link href="/category/headphones" className="text-[13px] font-bold tracking-[1px] uppercase text-white hover:text-[#D87D4A] transition-colors">
                  HEADPHONES
                </Link>
                <Link href="/category/speakers" className="text-[13px] font-bold tracking-[1px] uppercase text-white hover:text-[#D87D4A] transition-colors">
                  SPEAKERS
                </Link>
                <Link href="/category/earphones" className="text-[13px] font-bold tracking-[1px] uppercase text-white hover:text-[#D87D4A] transition-colors">
                  EARPHONES
                </Link>
              </nav>
            </div>

            {/* Cart Icon */}
            <button
              className="relative p-2 bg-transparent border-none cursor-pointer text-white hover:opacity-80 transition-opacity ml-auto"
              onClick={() => setIsOpen(true)}
              aria-label={`Open cart with ${getTotalItems()} items`}
            >
              <Image src={cartIconSrc} alt="Cart" width={23} height={20} />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-[#D87D4A] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" aria-hidden="true">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
          
          {/* Desktop HR Separator - Full content width */}
          <hr className="hidden md:block w-full border-white/20 mt-9" />
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      {(isMobileMenuOpen || isAnimating) && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-[998] md:hidden transition-opacity duration-500 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Full Screen Left Drawer */}
          <div
            className={`fixed top-0 left-0 bottom-0 w-full bg-[#101010] z-[999] md:hidden transition-transform duration-500 ease-in-out overflow-y-auto ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="min-h-screen flex flex-col">
              {/* Header with Close Button */}
              <div className="flex justify-end p-6">
                <button
                  className="p-2 bg-transparent border-none cursor-pointer text-white hover:opacity-80 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Centered Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center items-center gap-8 px-4 py-12">
                <Link
                  href="/"
                  className="text-[24px] font-bold tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/category/headphones"
                  className="text-[24px] font-bold tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HEADPHONES
                </Link>
                <Link
                  href="/category/speakers"
                  className="text-[24px] font-bold tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SPEAKERS
                </Link>
                <Link
                  href="/category/earphones"
                  className="text-[24px] font-bold tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EARPHONES
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
