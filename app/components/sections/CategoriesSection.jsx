'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CategoriesSection() {
  const router = useRouter();
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);

    return () => {
      if (card1Ref.current) observer.unobserve(card1Ref.current);
      if (card2Ref.current) observer.unobserve(card2Ref.current);
      if (card3Ref.current) observer.unobserve(card3Ref.current);
    };
  }, []);

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
        {/* Content Container */}
        <div className="w-full max-w-[1110px] h-auto md:h-[284px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] h-full mb-8 md:mb-0">
            {/* Card 1 - Headphones */}
            <Link ref={card1Ref} href="/category/headphones" className="w-[350px] h-[284px] mx-auto md:mx-0 flex flex-col items-center text-inherit no-underline relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
              {/* Image - Centered at top, overlapping the gray card */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <Image
                  src="/headset.png"
                  alt="Headphones"
                  width={123}
                  height={160}
                  className="object-contain"
                />
              </div>
              {/* Gray Card */}
              <div className="w-[350px] h-[204px] mt-[80px] bg-[#F1F1F1] rounded-lg relative flex flex-col items-center justify-end pb-4 pt-16">
                {/* Title - Inside Gray Card */}
                <h3 className="text-lg font-bold tracking-[1.3px] uppercase m-0 z-20 relative">HEADPHONES</h3>
                {/* Shop Link - Inside Gray Card */}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push('/category/headphones');
                  }} 
                  className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] inline-flex items-center gap-2 z-20 relative transition-colors hover:opacity-70 bg-transparent border-none cursor-pointer p-0"
                >
                  SHOP <span aria-hidden="true" className="text-[#D87D4A]">→</span>
                </button>
              </div>
            </Link>

            {/* Card 2 - Speakers */}
            <Link ref={card2Ref} href="/category/speakers" className="w-[350px] h-[284px] mx-auto md:mx-0 flex flex-col items-center text-inherit no-underline relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
              {/* Image - Centered at top, overlapping the gray card */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <Image
                  src="/speaker.png"
                  alt="Speakers"
                  width={123}
                  height={160}
                  className="object-contain"
                />
              </div>
              {/* Gray Card */}
              <div className="w-[350px] h-[204px] mt-[80px] bg-[#F1F1F1] rounded-lg relative flex flex-col items-center justify-end pb-4 pt-16">
                {/* Title - Inside Gray Card */}
                <h3 className="text-lg font-bold tracking-[1.3px] uppercase m-0 z-20 relative">SPEAKERS</h3>
                {/* Shop Link - Inside Gray Card */}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push('/category/speakers');
                  }} 
                  className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] inline-flex items-center gap-2 z-20 relative transition-colors hover:opacity-70 bg-transparent border-none cursor-pointer p-0"
                >
                  SHOP <span aria-hidden="true" className="text-[#D87D4A]">→</span>
                </button>
              </div>
            </Link>

            {/* Card 3 - Earphones */}
            <Link ref={card3Ref} href="/category/earphones" className="w-[350px] h-[284px] mx-auto md:mx-0 flex flex-col items-center text-inherit no-underline relative opacity-0 translate-y-8 transition-all duration-700 ease-out">
              {/* Image - Centered at top, overlapping the gray card */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <Image
                  src="/pod.png"
                  alt="Earphones"
                  width={123}
                  height={160}
                  className="object-contain"
                />
              </div>
              {/* Gray Card */}
              <div className="w-[350px] h-[204px] mt-[80px] bg-[#F1F1F1] rounded-lg relative flex flex-col items-center justify-end pb-4 pt-16">
                {/* Title - Inside Gray Card */}
                <h3 className="text-lg font-bold tracking-[1.3px] uppercase m-0 z-20 relative">EARPHONES</h3>
                {/* Shop Link - Inside Gray Card */}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push('/category/earphones');
                  }} 
                  className="text-[13px] font-bold tracking-[1px] uppercase text-[#D87D4A] inline-flex items-center gap-2 z-20 relative transition-colors hover:opacity-70 bg-transparent border-none cursor-pointer p-0"
                >
                  SHOP <span aria-hidden="true" className="text-[#D87D4A]">→</span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

