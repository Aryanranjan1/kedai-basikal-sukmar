// src/components/common/HeroSlider.tsx
'use client'; // This component requires client-side interactivity (state, useEffect)

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSliderProps {
  // The 'images' prop will be an array of image URLs, typically coming from a CMS
  images: string[];
  autoPlayInterval?: number; // Optional: time in ms for auto-play (default 5000ms)
}

const HeroSlider: React.FC<HeroSliderProps> = ({ images, autoPlayInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, autoPlayInterval);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  // Navigate to previous slide
  const goToPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  // Navigate to next slide
  const goToNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  // Go to a specific slide (for dot indicators)
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
        No banner images available.
      </div>
    );
  }

  return (
    <div className="relative w-full h-[800px] overflow-hidden rounded-md">
      {/* Slider Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <Image
              src={src}
              alt={`Banner image ${index + 1}`}
              fill
              priority={index === 0} // Prioritize loading the first image
              className="object-cover"
              sizes="100vw" // Image takes full width of viewport
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-[#124970]' : 'bg-gray-300 opacity-70'
            } transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;