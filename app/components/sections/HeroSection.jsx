'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section className="bg-[#101010] text-white overflow-hidden relative h-[90vh] md:h-[95vh] flex items-center">
      {/* Mobile: Image as Background */}
      <div className="md:hidden absolute inset-0 z-0 -top-24">
        <div className="relative w-full h-full">
          <Image
            src="/Bitmap.png"
            alt="XX99 Mark II Headphones"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-[#101010]/70"></div>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1440px] mt-[-100px] md:mt-0 px-4 md:px-8 lg:px-[165px] relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12 pt-8 md:pt-0">
          {/* Text Container - Left */}
          <div ref={textRef} className="w-full md:w-[398px] flex flex-col gap-6 md:gap-4 text-center md:text-left opacity-0 translate-y-8 transition-all duration-700 ease-out">
            {/* Text Tag */}
            <p className="font-sans font-normal text-[14px] leading-[100%] tracking-[10px] uppercase text-white/50">
              NEW PRODUCT
            </p>
            
            {/* Text Heading */}
            <h1 className="font-sans font-bold text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] tracking-[1.3px] md:tracking-[2px] uppercase text-white">
              XX99 MARK II HEADPHONES
            </h1>
            
            {/* Text Paragraph */}
            <p className="font-sans font-medium text-[15px] leading-[25px] tracking-[0px] text-white/75 max-w-[350px] mx-auto md:mx-0">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            
            {/* CTA Button */}
            <Link 
              href="/products" 
              className="w-[160px] h-[48px] mx-auto md:mx-0 flex items-center justify-center bg-[#D87D4A] text-white font-sans font-bold text-[13px] leading-[100%] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors"
            >
              SEE PRODUCT
            </Link>
          </div>
          
          {/* Desktop: Image Container - Right */}
          <div ref={imageRef} className="hidden md:flex md:w-[708.8px] md:h-[886px] items-center justify-center opacity-0 translate-x-8 transition-all duration-700 ease-out delay-200">
            <Image
              src="/Bitmap.png"
              alt="XX99 Mark II Headphones"
              width={708.8}
              height={886}
              priority
              className="w-[708.8px] h-[886px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
