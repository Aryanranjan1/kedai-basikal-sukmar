// src/components/sliders/ProductSlider.tsx
'use client'; // This component requires client-side interactivity

import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../common/ProductCard'; // Import the ProductCard component
import { ProductData } from '../../api/strapiMockApi'; // Import ProductData from your API definitions

interface ProductSliderProps {
  products: ProductData[]; // Array of product data to display in the slider
  cardsPerView?: number; // How many cards to show at once (e.g., 3 for desktop)
  autoPlayInterval?: number; // Interval for auto-play in milliseconds
  gap?: number; // Gap between cards in pixels
}

const ProductSlider: React.FC<ProductSliderProps> = ({
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
  const cardWidth = 312; // Based on your ProductCard's fixed width
  const totalItemWidth = cardWidth + gap; // Width of one card plus its gap

  useEffect(() => {
    if (duplicatedProducts.length === 0) return;

    const startAutoPlay = () => {
      // Clear any existing interval before starting a new one
      if (slideTimeoutRef.current) {
        clearInterval(slideTimeoutRef.current);
      }

      slideTimeoutRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // If we are at the end of the real products (and about to show a duplicate)
          if (prevIndex >= products.length) {
            // Instantly jump visually back to the very first real product (index 0)
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none'; // Disable transition for the jump
              carouselRef.current.style.transform = `translateX(0px)`;
            }
            // After a tiny delay to allow the browser to render the "jump",
            // set the index to 1 to animate to the second item.
            setTimeout(() => {
              setCurrentIndex(1); // Move to the second item (first item after reset)
              if (carouselRef.current) {
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
              }
            }, 50); // Small delay to allow reflow for transition: 'none'
            return 0; // Temporarily return to 0 for state, the timeout will then set it to 1
          } else {
            return prevIndex + 1; // Move to the next item normally
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


  // Effect to apply smooth transition when currentIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      // Apply the transform based on the current index
      carouselRef.current.style.transform = `translateX(-${currentIndex * totalItemWidth}px)`;
      // The transition property is managed within the autoPlay and navigation functions
      // to allow for instant jumps when looping.
    }
  }, [currentIndex, totalItemWidth]);


  // Manual Navigation
  const goToPrev = () => {
    // Clear auto-play when manual navigation occurs
    if (slideTimeoutRef.current) {
      clearInterval(slideTimeoutRef.current);
      slideTimeoutRef.current = null;
    }
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // If at the very first item (real index 0), jump to the "end" of the duplicated set
        const jumpToIndex = products.length; // This is the index of the first duplicated item
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none'; // Disable transition for the jump
          carouselRef.current.style.transform = `translateX(-${jumpToIndex * totalItemWidth}px)`;
        }
        // After a small delay, animate one step back to simulate a continuous loop
        setTimeout(() => {
          setCurrentIndex(jumpToIndex - 1); // Animate to the last real product
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
          }
        }, 50);
        return jumpToIndex; // Set state to the jumped position, then it will animate back
      }
      return prevIndex - 1; // Move to the previous item normally
    });
  };

  const goToNext = () => {
    // Clear auto-play when manual navigation occurs
    if (slideTimeoutRef.current) {
      clearInterval(slideTimeoutRef.current);
      slideTimeoutRef.current = null;
    }
    setCurrentIndex((prevIndex) => {
      // If we are at the last real product and about to move into duplicates
      if (prevIndex >= products.length) {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none'; // Disable transition for instant jump
          carouselRef.current.style.transform = `translateX(0px)`; // Jump to the start of real products
        }
        setTimeout(() => {
          setCurrentIndex(1); // Then animate to the next item
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
          }
        }, 50);
        return 0; // Set state to 0, then the timeout will move it to 1
      }
      return prevIndex + 1; // Move to the next item normally
    });
  };


  if (products.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
        No products to display in the slider.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden p-4"> {/* Added padding for visibility */}
      <div
        ref={carouselRef}
        className="flex"
        style={{
          height: '465px', // Fixed height based on ProductCard's height
          gap: `${gap}px`, // Apply gap using CSS gap property
          transform: `translateX(-${currentIndex * totalItemWidth}px)`,
          // Transition property is now controlled dynamically in useEffect and navigation functions
        }}
      >
        {duplicatedProducts.map((product, index) => (
          // Use a unique key for each item, especially with duplicates
          // Combining product.id (which should be unique) with the index of the duplicated array
          <div key={`${product.id}-${index}`} style={{ flexShrink: 0, width: `${cardWidth}px` }}>
            <ProductCard
              // Pass the entire 'product' object to ProductCard
              product={product}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
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

export default ProductSlider;