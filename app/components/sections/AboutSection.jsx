'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
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
    <section className="py-16 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="flex flex-col gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <h2 className="text-[40px] leading-[44px] tracking-[1.5px] font-bold uppercase m-0">
              BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
            </h2>
            <p className="text-[15px] leading-[25px] text-black/50 m-0">
              Located at the heart of New York City, Audiophile is the premier store for high end
              headphones, earphones, speakers, and audio accessories. We have a large showroom and
              luxury demonstration rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic people who make Audiophile
              the best place to buy your portable audio equipment.
            </p>
          </div>
          <div ref={imageRef} className="relative rounded-lg overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
            <Image
              src="/audio.png"
              alt="Man wearing headphones"
              width={540}
              height={588}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
