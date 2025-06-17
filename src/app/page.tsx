// src/app/page.jsx (or page.tsx)
import React from 'react';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import NationwideReachSection from '../components/sections/NationwideReachSection';
import TestimonialCarousel from '../components/common/TestimonialCarousel';
import ScaleWrapper from '../components/common/ScaleWrapper'; // Make sure this import is correct!


// Static data for testimonials (as used previously)
const testimonialsData = [
  { id: '1', quote: "Outstanding repair service! My mountain bike was feeling sluggish, but Kedai Basikal Sukmar brought it back to life.", author: "Aisha M.", title: "Weekend Warrior" },
  { id: '2', quote: "We absolutely love our new family bikes from Kedai Basikal Sukmar! The staff were so patient and helpful.", author: "Matthew L.", title: "Happy Cyclists" },
  { id: '3', quote: "Switching to an electric bike from Kedai Basikal Sukmar was the best decision! My daily commute is now incredibly fun.", author: "David L.", title: "E-Bike Explorer" },
  { id: '4', quote: "Amazing service! My electric bike feels brand new after their repair. So convenient with the free delivery!", author: "Ahmad L.", title: "Urban Commuter" },
];

export const metadata = {
  title: 'Kedai Basikal Sukmar - Your Ultimate Bicycle Shop',
  description: 'Discover top-quality electric bicycles, professional repair services, and a healthier lifestyle with Kedai Basikal Sukmar in Jenjarom.',
};

const HomePage = () => {
  return (
    // The outermost container for the entire page.
    // The ScaleWrapper will now manage its overall dimensions.
    <div className="relative overflow-hidden">
      {/* <--- IMPORTANT: ScaleWrapper now wraps *all* visual content */}
      <ScaleWrapper>
        
        {/* NavBar - Now INSIDE ScaleWrapper, so it will scale proportionally */}
        {/*
          NOTE: If you want the NavBar to stay at the very top of the *browser window*
          and still scale, `position: sticky` or `position: fixed` might behave
          unexpectedly or need adjustments when its parent is scaled.
          For a fully scaled design, it usually just becomes part of the scaled content flow.
          I've changed `sticky top-0` to `relative` as it's now part of the scaled flow.
        */}
        <div className="relative z-50 w-full bg-white shadow-md">
          <NavBar />
        </div>

        {/* Main content area */}
        <main className="flex flex-col w-full">
          {/* Hero Section */}
          <section className="relative w-full h-[824px] overflow-hidden">
            <HeroSection />
          </section>

          {/* Services Section */}
          <section className="relative w-full h-[770px] overflow-hidden bg-white">
            <ServicesSection />
          </section>

          {/* Nationwide Reach Section */}
          <section className="relative w-full h-[800px] overflow-hidden bg-gray-50">
            <NationwideReachSection />
          </section>

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
        </main>

        {/* Footer Section - Now INSIDE ScaleWrapper, so it will scale proportionally */}
        <div className="w-full">
          <Footer />
        </div>
      </ScaleWrapper> {/* <--- ScaleWrapper ends here, enclosing everything */}
    </div>
  );
};

export default HomePage;