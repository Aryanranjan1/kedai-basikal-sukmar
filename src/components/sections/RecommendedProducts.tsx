'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image'; // Image component is still needed for the main section, not individual cards
import { fetchProducts, ProductData } from '../../api/strapiMockApi';
import ProductCard from '../common/ProductCard'; // Import the shared ProductCard component

const RecommendedProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getRecommendedProducts = async () => {
      try {
        // Fetch all products without pagination filters to ensure we get enough to shuffle
        // Consider if you want to limit the initial fetch if your database is very large
        // For mock API, fetching all is fine.
        const allProductsResponse = await fetchProducts(new URLSearchParams());
        const allProducts = allProductsResponse.data || [];

        // Shuffle products and take the first 8
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        // Ensure we take up to 8 products; if allProducts has less than 8, it will take all of them.
        setProducts(shuffled.slice(0, 8));
        console.log(`Fetched ${allProducts.length} total products, displaying ${shuffled.slice(0, 8).length} recommended.`);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
        setProducts([]);
      }
    };

    getRecommendedProducts();
  }, []);

  const scrollByAmount = 300; // Amount to scroll by clicking arrows

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: '#F7F7F7', position: 'relative', padding: '0 100px 50px', boxSizing: 'border-box' }}>
      {/* Top Line */}
      <div
        style={{
          width: 'calc(100% - 200px)',
          margin: '0 auto',
          borderTop: '2px solid #124970',
        }}
      ></div>

      {/* Heading */}
      <div
        style={{
          width: 531,
          height: 87,
          marginLeft: 0,
          marginTop: 42,
          background: 'rgba(18, 73, 112, 0.20)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#124970', fontSize: 48, fontFamily: 'Inter', fontWeight: '500' }}>SUGGESTED</div>
      </div>

      {/* Scroll Arrows */}
      <div
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(20px)',
          background: 'rgba(18, 73, 112, 0.6)',
          color: 'white',
          width: 40,
          height: 40,
          borderRadius: '50%',
          fontSize: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        &#8249;
      </div>
      <div
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(20px)',
          background: 'rgba(18, 73, 112, 0.6)',
          color: 'white',
          width: 40,
          height: 40,
          borderRadius: '50%',
          fontSize: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        &#8250;
      </div>

      {/* Product Cards Scrollable Container */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: 50,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: 20,
          scrollbarWidth: 'none', // for Firefox
          msOverflowStyle: 'none', // for IE/Edge
        }}
        onTouchMove={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Hide scrollbar for Chrome, Safari */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Render ProductCard component for each product */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Line */}
      <div
        style={{
          width: 'calc(100% - 196px)',
          maxWidth: '1240px',
          height: '0',
          margin: '80px auto 0',
          outline: '2px #124970 solid',
          outlineOffset: '-1px',
        }}
      ></div>
    </div>
  );
};

export default RecommendedProducts;