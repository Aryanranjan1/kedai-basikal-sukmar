'use client';

import React from 'react';
import useWishlist from '@/hooks/useWishlist';
import Link from 'next/link';

const WishlistSection = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold">Your wishlist is empty.</h2>
        <p className="text-gray-600 mt-2">Start adding products to see them here!</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Wishlist</h2>
      
      {/* Fixed layout with no responsiveness */}
      <div className="flex flex-wrap gap-6 justify-start">
        {wishlistItems.map((product: any) => {
          const image =
            typeof product?.attributes?.productImage === 'object' &&
            product.attributes.productImage !== null &&
            'url' in product.attributes.productImage &&
            typeof product.attributes.productImage.url === 'string'
              ? product.attributes.productImage.url
              : '/images/fallback.png';

          return (
            <div
              key={product.id}
              className="w-[280px] bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col"
            >
              <Link href={`/bicycles/${product.id}`}>
                <img
                  src={image}
                  alt={product.attributes.productName}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-xl font-semibold mb-1">
                  {product.attributes.productName}
                </h3>
              </Link>
              <p className="text-gray-600 mb-2">
                RM {product.attributes.price?.toFixed(2)}
              </p>
              <button
                onClick={() => toggleWishlist(product)}
                className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                Remove from Wishlist
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WishlistSection;
