'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ZX9SpeakerSection() {
  const imageRef = useRef(null);
  const textRef = useRef(null);

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

    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
        <div className="bg-[#D87D4A] rounded-lg p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative overflow-hidden">
          {/* Speaker Image with Sound Wave Circles */}
          <div ref={imageRef} className="relative z-10 flex items-center justify-center w-full md:w-auto opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="relative w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] aspect-square flex items-center justify-center overflow-visible">
              {/* Sound Wave Effect - Radial Circles Limited to Speaker Area */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {/* Multiple concentric circles for sound wave effect - Pulsing */}
                <div className="absolute w-[944px] h-[944px] rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-wave"></div>
                <div className="absolute w-[800px] h-[800px] rounded-full border border-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-wave animation-delay-1"></div>
                <div className="absolute w-[650px] h-[650px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-wave animation-delay-2"></div>
                {/* Radial gradient overlay */}
                <div className="absolute w-[944px] h-[944px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ 
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)'
                }}></div>
              </div>
              
              <Image
                src="/z9speaker.png"
                alt="ZX9 Speaker"
                width={756}
                height={756}
                className="w-full h-full object-contain relative z-10 object-bottom"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="flex flex-col gap-6 text-white relative z-10 text-center md:text-left opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
            <h2 className="text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] tracking-[1.3px] md:tracking-[2px] font-bold uppercase m-0 text-white">ZX9 SPEAKER</h2>
            <p className="text-[15px] leading-[25px] text-white/75 m-0 max-w-[350px] mx-auto md:mx-0">
              Upgrade to premium speakers that are phenomenally built to
              deliver truly remarkable sound.
            </p>
            <Link href="/products/zx9-speaker" className="w-fit bg-black text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:opacity-90 transition-opacity no-underline mx-auto md:mx-0">
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
