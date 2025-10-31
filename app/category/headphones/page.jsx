import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import Link from 'next/link';
import Image from 'next/image';
import CategoriesSection from '../../components/sections/CategoriesSection';
import AboutSection from '../../components/sections/AboutSection';

export default function HeadphonesPage() {
  return (
    <>
      <Header />
      <Cart />
      <main>
        {/* Page Header */}
        <section className="bg-[#101010] py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <h1 className="text-[28px] md:text-[40px] font-bold tracking-[2px] uppercase text-white text-center">
              HEADPHONES
            </h1>
          </div>
        </section>

        {/* Product 1: XX99 MARK II HEADPHONES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="w-full flex items-center justify-center">
                <div className="w-[540px] h-[560px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  <Image
                    src="/feat.png"
                    alt="XX99 Mark II Headphones"
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
                  XX99 MARK II HEADPHONES
                </h2>
                <p className="text-[15px] leading-[25px] text-black/50">
                  The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.
                </p>
                <Link
                  href="/products/xx99-mark-ii-headphones"
                  className="w-fit bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors mx-auto md:mx-0"
                >
                  SEE PRODUCT
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product 2: XX99 MARK I HEADPHONES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Content */}
              <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
                <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1.5px] font-bold uppercase">
                  XX99 MARK I HEADPHONES
                </h2>
                <p className="text-[15px] leading-[25px] text-black/50">
                  As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.
                </p>
                <Link
                  href="/products/xx99-mark-i-headphones"
                  className="w-fit bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors mx-auto md:mx-0"
                >
                  SEE PRODUCT
                </Link>
              </div>
              {/* Image */}
              <div className="w-full order-1 md:order-2 flex items-center justify-center">
                <div className="w-[540px] h-[560px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  <Image
                    src="/feat-head.png"
                    alt="XX99 Mark I Headphones"
                    width={349.24}
                    height={386}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product 3: XX59 HEADPHONES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="w-full flex items-center justify-center">
                <div className="w-[540px] h-[560px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  <Image
                    src="/new-head.png"
                    alt="XX59 Headphones"
                    width={349.24}
                    height={386}
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-6 text-center md:text-left">
                <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1.5px] font-bold uppercase">
                  XX59 HEADPHONES
                </h2>
                <p className="text-[15px] leading-[25px] text-black/50">
                  Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.
                </p>
                <Link
                  href="/products/xx59-headphones"
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

