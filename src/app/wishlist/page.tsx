'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import RecommendedProducts from '@/components/sections/RecommendedProducts';
import WhyChooseCyclingSection from '@/components/sections/WhyChooseCyclingSection';
import FAQSection from '@/components/common/FAQSection';
import Link from 'next/link';

// Type and utilities
import type { ProductData } from '@/api/strapiMockApi';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<ProductData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWishlist(parsed);
      } catch {
        console.warn('Failed to parse wishlist from localStorage.');
        setWishlist([]);
      }
    }
  }, []);

  return (
    <ScaleWrapper>
  <NavBar />

  <main className="pt-[150px] px-12 py-8">
    <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

    {wishlist.length === 0 ? (
      <p className="text-gray-600">You have no items in your wishlist.</p>
    ) : (
      <div className="flex flex-wrap gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="w-[280px] border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <Link href={`/products/${product.attributes.slug}`}>
              <img
                src={
                  product.attributes.productImage?.data?.attributes?.url ||
                  '/images/fallback.png'
                }
                alt={product.attributes.productName}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">
                {product.attributes.productName}
              </h2>
              <p className="text-gray-700 mb-2">
                RM {product.attributes.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {product.attributes.brand}
              </p>
            </Link>
          </div>
        ))}
      </div>
    )}

    <hr className="my-12 border-gray-300" />

    <RecommendedProducts />
    <WhyChooseCyclingSection />
    <FAQSection />
  </main>

  <Footer />
</ScaleWrapper>

  );
}
