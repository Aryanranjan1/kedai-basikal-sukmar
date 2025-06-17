// src/components/common/TestimonialCarousel.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import TestimonialCard from './TestimonialCard'; // Import the TestimonialCard component

interface TestimonialData {
  id: string; // Unique ID for each testimonial, essential for keys
  quote: string;
  author: string;
  title: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialData[]; // Array of testimonial data
  cardsPerView?: number; // Number of testimonial cards visible at once
  autoPlayInterval?: number; // Interval for auto-play in milliseconds
  gap?: number; // Gap between cards in pixels
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  cardsPerView = 3, // Default to showing 3 cards
  autoPlayInterval = 4000, // Default to 4 seconds
  gap = 27, // Gap as per your HTML (27px)
}) => {
  // To create a seamless loop, we duplicate the initial cards at the end.
  // We need enough duplicates to fill the 'cardsPerView' space when looping.
  const duplicatedTestimonials = testimonials.length > 0
    ? [...testimonials, ...testimonials.slice(0, cardsPerView)]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Card width and total item width based on TestimonialCard's fixed width
  const cardWidth = 428;
  const totalItemWidth = cardWidth + gap; // Width of one card plus its gap

  // Auto-play and seamless loop logic
  useEffect(() => {
    if (duplicatedTestimonials.length === 0) return;

    const startAutoPlay = () => {
      slideTimeoutRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // If we are about to move past the last original item into the duplicated items,
          // instantly jump back to the start (index 0) without animation, then proceed.
          if (prevIndex >= testimonials.length) {
            // Step 1: Instantly snap back to the beginning without transition
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              carouselRef.current.style.transform = `translateX(0px)`;
            }
            // Step 2: After a very short delay to allow the browser to render the snap,
            // set the index to 1 (to start sliding to the next item) and re-enable transition.
            setTimeout(() => {
              setCurrentIndex(1); // Move to the second item after reset
              if (carouselRef.current) {
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
              }
            }, 50); // Small delay for reflow
            return 0; // Temporarily set to 0, next tick will correctly move to 1
          } else {
            return prevIndex + 1;
          }
        });
      }, autoPlayInterval);
    };

    startAutoPlay();

    // Cleanup: Clear interval on component unmount
    return () => {
      if (slideTimeoutRef.current) {
        clearInterval(slideTimeoutRef.current);
      }
    };
  }, [duplicatedTestimonials.length, testimonials.length, autoPlayInterval]);

  // Effect to apply smooth transition for normal slides
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * totalItemWidth}px)`;
      // Ensure transition is re-enabled for normal slides if it was disabled for a snap
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, [currentIndex, totalItemWidth]);


  if (testimonials.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
        No testimonials to display.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden py-4"> {/* Added vertical padding */}
        {/* Carousel Track */}
        <div
            ref={carouselRef}
            className="flex"
            style={{
                height: '300px', // Height of a TestimonialCard
                gap: `${gap}px`, // Apply gap using CSS gap property
                transform: `translateX(-${currentIndex * totalItemWidth}px)`,
                transition: 'transform 0.5s ease-in-out', // Default smooth transition
            }}
        >
            {duplicatedTestimonials.map((testimonial, index) => (
                // Use a unique key by combining testimonial ID and its index in the duplicated array
                <div key={`${testimonial.id}-${index}`} style={{ flexShrink: 0, width: `${cardWidth}px` }}>
                    <TestimonialCard
                        quote={testimonial.quote}
                        author={testimonial.author}
                        title={testimonial.title}
                    />
                </div>
            ))}
        </div>

        {/* Optional: Dot Indicators (Similar to your HeroSlider) */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 flex space-x-2 mt-4">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (slideTimeoutRef.current) clearInterval(slideTimeoutRef.current); // Stop auto-play on manual click
                        setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full ${
                        currentIndex % testimonials.length === index ? 'bg-[#124970]' : 'bg-gray-300 opacity-70'
                    } transition-colors`}
                    aria-label={`Go to testimonial ${index + 1}`}
                />
            ))}
        </div>
    </div>
  );
};

export default TestimonialCarousel;