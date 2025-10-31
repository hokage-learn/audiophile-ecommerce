'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ZX7SpeakerSection() {
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

    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
        <div className="relative rounded-lg overflow-hidden min-h-[320px]">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <Image
              src="/z7speaker.png"
              alt="ZX7 Speaker"
              fill
              className="object-cover"
            />
          </div>
          <div ref={contentRef} className="relative z-10 p-16 flex flex-col gap-6 items-start justify-center h-full opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <h2 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase m-0">ZX7 SPEAKER</h2>
            <Link href="/products/zx7-speaker" className="bg-transparent text-[#101010] border border-[#101010] px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase transition-all hover:bg-[#101010] hover:text-white no-underline">
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
