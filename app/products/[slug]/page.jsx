'use client';

import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import { api } from '../../../convex/_generated/api';
import { useCart } from '../../components/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import CategoriesSection from '../../components/sections/CategoriesSection';
import AboutSection from '../../components/sections/AboutSection';

// Static product data fallback for UI when Convex data is not available
const staticProducts = {
  'xx99-mark-ii-headphones': {
    name: 'XX99 MARK II HEADPHONES',
    description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    price: 2999,
    image: '/feat.png',
    category: 'headphones',
    isNew: true,
    features: 'Featuring a genuine leather headband and premium earcups, these headphones deliver superior comfort for long listening sessions. The intuitive controls allow you to manage music playback and adjust volume with ease.\n\nExperience active noise cancellation, Bluetooth 5.0 connectivity, and a 17-hour battery life. The auto on/off pause feature ensures you never waste battery when not in use. These headphones represent the pinnacle of modern audio design.',
    includes: [
      { quantity: '1x', item: 'Headphone Unit' },
      { quantity: '2x', item: 'Replacement Earcups' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: '3.5mm 5m Audio Cable' },
      { quantity: '1x', item: 'Travel Bag' },
    ],
    gallery: {
      first: '/feat.png',
      second: '/feat.png',
      third: '/feat.png',
    },
    relatedProducts: [
      { name: 'XX99 MARK I', slug: 'xx99-mark-i-headphones', image: '/feat-head.png' },
      { name: 'XX59', slug: 'xx59-headphones', image: '/new-head.png' },
      { name: 'ZX9 SPEAKER', slug: 'zx9-speaker', image: '/z9speaker.png' },
    ],
  },
  'xx99-mark-i-headphones': {
    name: 'XX99 MARK I HEADPHONES',
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
    price: 1750,
    image: '/feat-head.png',
    category: 'headphones',
    isNew: false,
    features: 'Featuring a genuine leather headband and premium earcups, these headphones deliver superior comfort for long listening sessions. The intuitive controls allow you to manage music playback and adjust volume with ease.',
    includes: [
      { quantity: '1x', item: 'Headphone Unit' },
      { quantity: '2x', item: 'Replacement Earcups' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: '3.5mm 5m Audio Cable' },
    ],
    gallery: {
      first: '/feat-head.png',
      second: '/feat-head.png',
      third: '/feat-head.png',
    },
    relatedProducts: [
      { name: 'XX99 MARK II', slug: 'xx99-mark-ii-headphones', image: '/feat.png' },
      { name: 'XX59', slug: 'xx59-headphones', image: '/new-head.png' },
      { name: 'ZX9 SPEAKER', slug: 'zx9-speaker', image: '/z9speaker.png' },
    ],
  },
  'xx59-headphones': {
    name: 'XX59 HEADPHONES',
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
    price: 899,
    image: '/new-head.png',
    category: 'headphones',
    isNew: false,
    features: 'These headphones offer a comfortable fit with adjustable headband and soft earcups. The intuitive controls allow you to manage music playback and adjust volume with ease.',
    includes: [
      { quantity: '1x', item: 'Headphone Unit' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: '3.5mm 5m Audio Cable' },
    ],
    gallery: {
      first: '/new-head.png',
      second: '/new-head.png',
      third: '/new-head.png',
    },
    relatedProducts: [
      { name: 'XX99 MARK II', slug: 'xx99-mark-ii-headphones', image: '/feat.png' },
      { name: 'XX99 MARK I', slug: 'xx99-mark-i-headphones', image: '/feat-head.png' },
      { name: 'ZX9 SPEAKER', slug: 'zx9-speaker', image: '/z9speaker.png' },
    ],
  },
  'zx9-speaker': {
    name: 'ZX9 SPEAKER',
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It\'s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
    price: 4500,
    image: '/z9speaker.png',
    category: 'speakers',
    isNew: false,
    features: 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
    includes: [
      { quantity: '2x', item: 'Speaker Unit' },
      { quantity: '2x', item: 'Speaker Cloth Panel' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: '3.5mm 5m Audio Cable' },
      { quantity: '1x', item: '10m Optical Cable' },
    ],
    gallery: {
      first: '/z9speaker.png',
      second: '/z9speaker.png',
      third: '/z9speaker.png',
    },
    relatedProducts: [
      { name: 'ZX7 SPEAKER', slug: 'zx7-speaker', image: '/z7speaker.png' },
      { name: 'XX99 MARK I', slug: 'xx99-mark-i-headphones', image: '/feat-head.png' },
      { name: 'XX59', slug: 'xx59-headphones', image: '/new-head.png' },
    ],
  },
  'zx7-speaker': {
    name: 'ZX7 SPEAKER',
    description: 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    price: 3500,
    image: '/z7speaker.png',
    category: 'speakers',
    isNew: false,
    features: 'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.',
    includes: [
      { quantity: '2x', item: 'Speaker Unit' },
      { quantity: '2x', item: 'Speaker Cloth Panel' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: '3.5mm 7.5m Audio Cable' },
    ],
    gallery: {
      first: '/z7speaker.png',
      second: '/z7speaker.png',
      third: '/z7speaker.png',
    },
    relatedProducts: [
      { name: 'ZX9 SPEAKER', slug: 'zx9-speaker', image: '/z9speaker.png' },
      { name: 'XX99 MARK I', slug: 'xx99-mark-i-headphones', image: '/feat-head.png' },
      { name: 'XX59', slug: 'xx59-headphones', image: '/new-head.png' },
    ],
  },
  'yx1-earphones': {
    name: 'YX1 EARPHONES',
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    price: 599,
    image: '/categories/pod.png',
    category: 'earphones',
    isNew: true,
    features: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
    includes: [
      { quantity: '2x', item: 'Earphone Unit' },
      { quantity: '6x', item: 'Multi-size Earplugs' },
      { quantity: '1x', item: 'User Manual' },
      { quantity: '1x', item: 'USB-C Charging Cable' },
      { quantity: '1x', item: 'Travel Pouch' },
    ],
    gallery: {
      first: '/categories/pod.png',
      second: '/categories/pod.png',
      third: '/categories/pod.png',
    },
    relatedProducts: [
      { name: 'XX99 MARK I', slug: 'xx99-mark-i-headphones', image: '/feat-head.png' },
      { name: 'XX59', slug: 'xx59-headphones', image: '/new-head.png' },
      { name: 'ZX9 SPEAKER', slug: 'zx9-speaker', image: '/z9speaker.png' },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const convexProduct = useQuery(api.products.getProductBySlug, { slug });
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Use Convex data if available, otherwise fall back to static data
  const product = useMemo(() => {
    if (convexProduct !== undefined && convexProduct !== null) {
      return convexProduct;
    }
    if (convexProduct === null && slug && staticProducts[slug]) {
      return staticProducts[slug];
    }
    return null;
  }, [convexProduct, slug]);

  // Show loading only while Convex is fetching and no static data available
  if (convexProduct === undefined && (!slug || !staticProducts[slug])) {
    return (
      <>
        <Header />
        <Cart />
        <main className="py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <p className="text-center">Loading product...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Show not found only if both Convex and static data are unavailable
  if (product === null) {
    return (
      <>
        <Header />
        <Cart />
        <main className="py-16">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="text-center">
              <h1 className="text-[40px] font-bold mb-4">Product Not Found</h1>
              <p>The product you're looking for doesn't exist.</p>
              <Link href="/" className="text-[#D87D4A] hover:underline mt-4 inline-block">
                Return to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    // Use a temporary ID if no _id from Convex
    const productId = product._id || `static-${slug}`;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <Header />
      <Cart />
      <main>
        {/* Product Detail Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            {/* Go Back Link */}
            <Link href="/" className="text-[15px] leading-[25px] text-black/50 hover:text-[#D87D4A] transition-colors mb-8 inline-block">
              Go Back
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Product Image */}
              <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-[540px] h-[560px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={349.24}
                      height={386}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Product Content */}
              <div className="flex flex-col gap-6 text-center md:text-left">
                {product.isNew && (
                  <p className="text-[14px] tracking-[10px] uppercase text-[#D87D4A] font-normal">
                    NEW PRODUCT
                  </p>
                )}
                <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] tracking-[1.5px] font-bold uppercase">
                  {product.name}
                </h1>
                <p className="text-[15px] leading-[25px] text-black/50">
                  {product.description}
                </p>
                <p className="text-[18px] font-bold tracking-[1.3px]">
                  ${product.price.toLocaleString()}
                </p>

                {/* Quantity and Add to Cart */}
                <div className="flex gap-4 items-center">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-[#F1F1F1]">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="px-4 py-3 text-[#101010] font-bold text-[13px] tracking-[1px] uppercase hover:text-[#D87D4A] transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-3 font-bold text-[13px] tracking-[1px] text-[#101010] min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="px-4 py-3 text-[#101010] font-bold text-[13px] tracking-[1px] uppercase hover:text-[#D87D4A] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 md:flex-none bg-[#D87D4A] text-white px-8 py-3 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features and In The Box Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
              {/* Features */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase">
                  FEATURES
                </h2>
                {product.features ? (
                  <div className="text-[15px] leading-[25px] text-black/50 whitespace-pre-line">
                    {product.features}
                  </div>
                ) : (
                  <div className="text-[15px] leading-[25px] text-black/50 space-y-4">
                    <p>
                      Featuring a genuine leather headband and premium earcups, these headphones deliver superior comfort for long listening sessions. The intuitive controls allow you to manage music playback and adjust volume with ease.
                    </p>
                    <p>
                      Experience active noise cancellation, Bluetooth 5.0 connectivity, and a 17-hour battery life. The auto on/off pause feature ensures you never waste battery when not in use. These headphones represent the pinnacle of modern audio design.
                    </p>
                  </div>
                )}
              </div>

              {/* In The Box */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase">
                  IN THE BOX
                </h2>
                {product.includes && product.includes.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex gap-4 text-[15px] leading-[25px] text-black/50">
                        <span className="text-[#D87D4A] font-bold min-w-[30px]">{item.quantity || '1x'}</span>
                        <span>{item.item || item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2 text-[15px] leading-[25px] text-black/50">
                    <li className="flex gap-4">
                      <span className="text-[#D87D4A] font-bold min-w-[30px]">1x</span>
                      <span>Headphone Unit</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#D87D4A] font-bold min-w-[30px]">2x</span>
                      <span>Replacement Earcups</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#D87D4A] font-bold min-w-[30px]">1x</span>
                      <span>User Manual</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#D87D4A] font-bold min-w-[30px]">1x</span>
                      <span>3.5mm 5m Audio Cable</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[#D87D4A] font-bold min-w-[30px]">1x</span>
                      <span>Travel Bag</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Left Side - Two Stacked Images */}
              <div className="flex flex-col gap-4 md:gap-8">
                {/* Gallery Image 2 - Top */}
                <div className="relative w-full h-[174px] md:h-[292px] bg-[#F1F1F1] rounded-lg overflow-hidden">
                  {product.gallery?.second ? (
                    <Image
                      src={product.gallery.second}
                      alt={`${product.name} gallery 2`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                      Gallery Image 2
                    </div>
                  )}
                </div>
                {/* Gallery Image 3 - Bottom */}
                <div className="relative w-full h-[174px] md:h-[292px] bg-[#F1F1F1] rounded-lg overflow-hidden">
                  {product.gallery?.third ? (
                    <Image
                      src={product.gallery.third}
                      alt={`${product.name} gallery 3`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                      Gallery Image 3
                    </div>
                  )}
                </div>
              </div>
              {/* Right Side - One Full-Sized Image */}
              <div className="relative w-full h-[368px] md:h-[592px] bg-[#F1F1F1] rounded-lg overflow-hidden">
                {product.gallery?.first ? (
                  <Image
                    src={product.gallery.first}
                    alt={`${product.name} gallery 1`}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/30">
                    Gallery Image 1
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Like Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <h2 className="text-[32px] leading-[36px] tracking-[1.15px] font-bold uppercase text-center mb-12">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Related Product 1 */}
              <div className="flex flex-col items-center gap-8">
                <div className="w-full h-[120px] md:h-[318px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  {product.relatedProducts?.[0]?.image ? (
                    <Image
                      src={product.relatedProducts[0].image}
                      alt={product.relatedProducts[0].name}
                      width={120}
                      height={125}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-black/30">Product Image</div>
                  )}
                </div>
                <h3 className="text-[24px] leading-[33px] tracking-[1.7px] font-bold uppercase text-center">
                  {product.relatedProducts?.[0]?.name || 'XX99 MARK I'}
                </h3>
                <Link
                  href={product.relatedProducts?.[0]?.slug ? `/products/${product.relatedProducts[0].slug}` : '/products'}
                  className="bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors"
                >
                  SEE PRODUCT
                </Link>
              </div>

              {/* Related Product 2 */}
              <div className="flex flex-col items-center gap-8">
                <div className="w-full h-[120px] md:h-[318px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  {product.relatedProducts?.[1]?.image ? (
                    <Image
                      src={product.relatedProducts[1].image}
                      alt={product.relatedProducts[1].name}
                      width={120}
                      height={125}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-black/30">Product Image</div>
                  )}
                </div>
                <h3 className="text-[24px] leading-[33px] tracking-[1.7px] font-bold uppercase text-center">
                  {product.relatedProducts?.[1]?.name || 'XX59'}
                </h3>
                <Link
                  href={product.relatedProducts?.[1]?.slug ? `/products/${product.relatedProducts[1].slug}` : '/products'}
                  className="bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors"
                >
                  SEE PRODUCT
                </Link>
              </div>

              {/* Related Product 3 */}
              <div className="flex flex-col items-center gap-8">
                <div className="w-full h-[120px] md:h-[318px] bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                  {product.relatedProducts?.[2]?.image ? (
                    <Image
                      src={product.relatedProducts[2].image}
                      alt={product.relatedProducts[2].name}
                      width={120}
                      height={125}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-black/30">Product Image</div>
                  )}
                </div>
                <h3 className="text-[24px] leading-[33px] tracking-[1.7px] font-bold uppercase text-center">
                  {product.relatedProducts?.[2]?.name || 'ZX9 SPEAKER'}
                </h3>
                <Link
                  href={product.relatedProducts?.[2]?.slug ? `/products/${product.relatedProducts[2].slug}` : '/products'}
                  className="bg-[#D87D4A] text-white px-8 py-4 font-bold text-[13px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors"
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

