'use client'; // This directive is crucial for client-side interactivity in Next.js App Router

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import BannerCarousel from '@/components/common/BannerCarousel';
import RecommendedProducts from '@/components/sections/RecommendedProducts';
import RepairServiceHero from '@/components/sections/RepairServiceHero'; // Your hero component
import RepairDeliveryPromo from '@/components/sections/RepairDeliveryPromo';
// REMOVED: import Link from 'next/link'; // This import is not used in the current component

// Banner API import (ensure this path is correct)
import { fetchBanners } from '@/api/strapiMockApi';
import type { BannerData } from '@/api/strapiMockApi';

export default function ServicePage() {
  const [banners, setBanners] = useState<BannerData[]>([]);

  // Effect to load banners when the component mounts
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const response = await fetchBanners();
        setBanners(response.data);
      } catch (error) {
        console.error("Failed to load banners:", error);
        setBanners([]); // Set to empty array on error to prevent issues
      }
    };
    loadBanners();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // ScaleWrapper likely provides some overall scaling or layout context
    <ScaleWrapper>
      <NavBar /> {/* Your navigation bar */}

      {/* Container for the Banner Carousel with responsive padding */}
      {/* ADDED: pt-[150px] for 150px top padding */}
      <div className="px-4 lg:px-16 pt-[120px]"> 
        {/* Render BannerCarousel only if banners data is available */}
        {banners.length > 0 && (
          <BannerCarousel banners={banners} />
        )}
      </div>

      {/* --- Your main content sections below --- */}
      {/* This is where your RepairServiceHero is rendered */}
      <RepairServiceHero /> 
      
      {/* Another section related to repair and delivery promotion */}
      <RepairDeliveryPromo />

      {/* Recommended products section */}
      <RecommendedProducts />
      
      <Footer /> {/* Your website footer */}
    </ScaleWrapper>
  );
}