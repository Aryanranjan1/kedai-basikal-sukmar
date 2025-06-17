// src/components/products/ProductCarousel.tsx
'use client'; // This component requires client-side interactivity

import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../common/ProductCard'; // Import the ProductCard component

// Define a type for your product data (adjust as per your actual product structure)
interface ProductData {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  // Add any other properties your ProductCard needs
}

interface ProductCarouselProps {
  products: ProductData[]; // Array of product data to display in the carousel
  cardsPerView?: number; // How many cards to show at once (e.g., 3 for desktop)
  autoPlayInterval?: number; // Interval for auto-play in milliseconds
  gap?: number; // Gap between cards in pixels
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  cardsPerView = 3, // Default to showing 3 cards
  autoPlayInterval = 3000, // Default to 3 seconds
  gap = 65, // Gap as per your HTML (65px)
}) => {
  // To create a seamless loop, we'll duplicate the initial cards at the end.
  // We need enough duplicates to fill the 'cardsPerView' space when looping.
  const duplicatedProducts = products.length > 0
    ? [...products, ...products.slice(0, cardsPerView)]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate card width and total item width dynamically
  // Based on your original ProductCard width: 312px
  const cardWidth = 312;
  const totalItemWidth = cardWidth + gap; // Width of one card plus its gap

  useEffect(() => {
    if (duplicatedProducts.length === 0) return;

    const startAutoPlay = () => {
      slideTimeoutRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // If we are at the beginning of the duplicated items, instantly jump back
          // to the real start (index 0) without animation, then proceed.
          if (prevIndex >= products.length) {
            // First, jump visually without transition
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              carouselRef.current.style.transform = `translateX(0px)`;
            }
            // Then, reset index and continue animation
            setTimeout(() => {
              setCurrentIndex(1); // Move to the second item after reset
              if (carouselRef.current) {
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
              }
            }, 50); // Small delay to allow reflow for transition: 'none'
            return 0; // Return to 0 for the state, then next tick will move to 1
          } else {
            return prevIndex + 1;
          }
        });
      }, autoPlayInterval);
    };

    startAutoPlay();

    return () => {
      if (slideTimeoutRef.current) {
        clearInterval(slideTimeoutRef.current);
      }
    };
  }, [duplicatedProducts.length, products.length, autoPlayInterval]);


  // Effect to apply smooth transition after index changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * totalItemWidth}px)`;
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
    }
  }, [currentIndex, totalItemWidth]);


  // Manual Navigation (Optional, but good for user control)
  const goToPrev = () => {
    if (slideTimeoutRef.current) clearInterval(slideTimeoutRef.current); // Stop auto-play
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // If at the start, jump to the "end" of the real products + duplicates
        const newIndex = duplicatedProducts.length - cardsPerView; // Go near the end of the total track
         if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              carouselRef.current.style.transform = `translateX(-${newIndex * totalItemWidth}px)`;
         }
         setTimeout(() => {
            setCurrentIndex(newIndex -1); // Then move back one to make it seem continuous
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
            }
         }, 50);
         return newIndex; // State will update after timeout
      }
      return prevIndex - 1;
    });
  };

  const goToNext = () => {
    if (slideTimeoutRef.current) clearInterval(slideTimeoutRef.current); // Stop auto-play
    setCurrentIndex((prevIndex) => (prevIndex + 1));
  };


  if (products.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
        No products to display in the carousel.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden p-4"> {/* Added padding for visibility */}
      <div
        ref={carouselRef}
        className="flex"
        style={{
          // Set fixed height for the carousel container to prevent jumps
          height: '465px', // Height of a ProductCard
          gap: `${gap}px`, // Apply gap using CSS gap property
          transform: `translateX(-${currentIndex * totalItemWidth}px)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {duplicatedProducts.map((product, index) => (
          // Use a unique key, especially important with duplicates
          <div key={`${product.id}-${index}`} style={{ flexShrink: 0, width: `${cardWidth}px` }}>
            <ProductCard
              // Pass product data as props to the ProductCard
              // Ensure ProductCard component is updated to accept these props
              productName={product.name}
              productDescription={product.description}
              productImage={product.image}
              productRating={product.rating}
              productId={product.id}
            />
          </div>
        ))}
      </div>

      {/* Optional: Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
        aria-label="Previous products"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
        aria-label="Next products"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel;