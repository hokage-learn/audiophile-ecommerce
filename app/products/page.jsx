'use client';

import { useQuery } from 'convex/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { api } from '../../convex/_generated/api';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../components/CartContext';

export default function ProductsPage() {
  const products = useQuery(api.products.getProducts);
  const { addToCart } = useCart();

  if (products === undefined) {
    return (
      <>
        <Header />
        <Cart />
        <main className="py-16 min-h-screen">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
            <p className="text-center text-[15px] leading-[25px] text-black/50">Loading products...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Cart />
      <main className="py-16 min-h-screen bg-white">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-[165px]">
          <div className="py-8 text-center">
            <h1 className="text-[32px] md:text-[40px] font-bold tracking-[1.15px] md:tracking-[1.5px] uppercase mb-4">
              ALL PRODUCTS
            </h1>
          </div>

          {products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[15px] leading-[25px] text-black/50 mb-2">No products available.</p>
              <p className="text-[15px] leading-[25px] text-black/50">
                Add products through the Convex dashboard to see them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
              {products.map((product) => (
                <div key={product._id} className="bg-[#F1F1F1] rounded-lg p-6 flex flex-col gap-6 transition-transform hover:scale-[1.02]">
                  <Link href={`/products/${product.slug}`} className="flex flex-col gap-4 text-inherit no-underline">
                    <div className="w-full h-[300px] bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-[18px] font-bold tracking-[1.3px] mb-2">{product.name}</h3>
                      <p className="text-[15px] text-black/50 uppercase mb-2">{product.category}</p>
                      <p className="text-[18px] font-bold">${product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })}
                    className="w-full bg-[#D87D4A] text-white py-[15px] px-8 font-bold text-[13px] tracking-[1px] uppercase cursor-pointer transition-colors hover:bg-[#FBAF85] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ADD TO CART
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

