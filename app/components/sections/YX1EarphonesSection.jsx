'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function YX1EarphonesSection() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

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
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={imageRef} className="relative rounded-lg overflow-hidden bg-[#F1F1F1] min-h-[320px] opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <Image
              src="/yspeaker.png"
              alt="YX1 Earphones"
              fill
              className="object-cover"
            />
          </div>
          <div ref={contentRef} className="bg-[#F1F1F1] rounded-lg p-16 flex flex-col gap-6 justify-center opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
            <h2 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase m-0">YX1 EARPHONES</h2>
            <Link href="/products/yx1-earphones" className="w-fit bg-transparent text-[#101010] border border-[#101010] px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase transition-all hover:bg-[#101010] hover:text-white no-underline">
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
