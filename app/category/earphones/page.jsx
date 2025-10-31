import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import Link from 'next/link';
import Image from 'next/image';
import CategoriesSection from '../../components/sections/CategoriesSection';
import AboutSection from '../../components/sections/AboutSection';

export default function EarphonesPage() {
  return (
    <>
      <Header />
      <Cart />
      <main>
        {/* Page Header */}
        <section className="bg-[#101010] py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <h1 className="text-[28px] md:text-[40px] font-bold tracking-[2px] uppercase text-white text-center">
              EARPHONES
            </h1>
          </div>
        </section>

        {/* Product 1: YX1 EARPHONES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="w-full flex items-center justify-center">
                <div className="w-[540px] h-[560px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  <Image
                    src="/categories/pod.png"
                    alt="YX1 Earphones"
                    width={349.24}
                    height={386}
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-6 text-center md:text-left">
                <p className="text-[14px] tracking-[10px] uppercase text-[#D87D4A] font-normal">NEW PRODUCT</p>
                <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1.5px] font-bold uppercase">
                  YX1 EARPHONES
                </h2>
                <p className="text-[15px] leading-[25px] text-black/50">
                  Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.
                </p>
                <Link
                  href="/products/yx1-earphones"
                  className="w-fit bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors mx-auto md:mx-0"
                >
                  SEE PRODUCT
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CategoriesSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

