// src/app/bicycles/page.tsx
'use client';

import { useEffect, useState } from 'react';
// The 'useSearchParams' import is no longer needed in this file
// because 'searchParams' is not used directly within BicyclesPage.
// import { useSearchParams } from 'next/navigation'; 

// --- Common Components ---
import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import ScaleWrapper from '@/components/common/ScaleWrapper';
import FAQSection from '@/components/common/FAQSection';
import BannerCarousel from '@/components/common/BannerCarousel';

// --- Page Specific Sections ---
import StoreSection from '@/components/sections/StoreSection';
import RecommendedProducts from '@/components/sections/RecommendedProducts';
import WhyChooseCyclingSection from '@/components/sections/WhyChooseCyclingSection';

// --- Mock API ---
import { fetchBanners } from '@/api/strapiMockApi';
import type { BannerData } from '@/api/strapiMockApi';

export default function BicyclesPage() {

  const [banners, setBanners] = useState<BannerData[]>([]);

  // Effect to load banners (client-side data fetching)
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const response = await fetchBanners();
        setBanners(response.data);
      } catch (error) {
        console.error("Failed to load banners:", error);
        setBanners([]);
      }
    };
    loadBanners();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <ScaleWrapper>
      <NavBar />

      {/* Main content area with top padding to clear the fixed Navbar */}
      <main className="pt-[120px] px-4 md:px-8 lg:px-16 py-8">
        {/* BannerCarousel receives fetched banners */}
        {banners.length > 0 && (
          <div className="mb-8"> {/* Added margin-bottom for spacing */}
            <BannerCarousel banners={banners} />
          </div>
        )}

        {/* Flex container for optional filters and the StoreSection */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* You can add a FiltersSection here if you have one */}
          {/* <div className="lg:w-1/4">
            <FiltersSection />
          </div> */}

          {/* StoreSection where products are loaded */}
          <div className="lg:w-full"> {/* Use lg:w-full if no filters section is present */}
            {/* FIX: Removed the searchQuery prop as StoreSection
              already reads search parameters from the URL directly.
            */}
            <StoreSection />
          </div>
        </div>

        {/* RecommendedProducts section */}
        <RecommendedProducts />

        {/* Other content sections */}
        <WhyChooseCyclingSection />
        <FAQSection />
      </main>

      <Footer />
    </ScaleWrapper>
  );
}