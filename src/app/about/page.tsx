// src/app/about/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialCarousel from '@/components/common/TestimonialCarousel';

// Static data for testimonials (as used previously)
const testimonialsData = [
  { id: '1', quote: "Outstanding repair service! My mountain bike was feeling sluggish, but Kedai Basikal Sukmar brought it back to life.", author: "Aisha M.", title: "Weekend Warrior" },
  { id: '2', quote: "We absolutely love our new family bikes from Kedai Basikal Sukmar! The staff were so patient and helpful.", author: "Matthew L.", title: "Happy Cyclists" },
  { id: '3', quote: "Switching to an electric bike from Kedai Basikal Sukmar was the best decision! My daily commute is now incredibly fun.", author: "David L.", title: "E-Bike Explorer" },
  { id: '4', quote: "Amazing service! My electric bike feels brand new after their repair. So convenient with the free delivery!", author: "Ahmad L.", title: "Urban Commuter" },
];

const AboutPage: React.FC = () => {
    return (
        <>
            {/* ScaleWrapper for the main content that should scale */}
            <ScaleWrapper>
                <Navbar />
                {/* Main About Section content goes here */}
                <AboutSection />
                  {/* Testimonial Carousel Section */}
          <section className="relative w-full py-20 bg-gray-100 flex items-center justify-center">
            <div className="max-w-screen-xl mx-auto px-4">
              <h2 className="text-center text-5xl md:text-7xl font-bold mb-10">
                What <span className="text-[#124970]">people</span> say about us!
              </h2>
              <p className="text-center text-lg md:text-xl text-gray-700 mb-16">
                Hear directly from our community! Their smiles and stories prove our commitment.
              </p>
              <TestimonialCarousel testimonials={testimonialsData} />
            </div>
          </section>
                <Footer />
            </ScaleWrapper>
        </>
    );
};

export default AboutPage;