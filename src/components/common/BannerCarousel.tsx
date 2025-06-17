// components/common/BannerCarousel.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { BannerData } from '@/api/strapiMockApi';

interface BannerCarouselProps {
  banners: BannerData[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.attributes.linkUrl}>
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={banner.attributes.imageUrl}
                  alt={banner.attributes.altText}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                <div className="absolute bottom-10 left-10 bg-black/60 text-white p-4 rounded-xl max-w-[80%]">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {banner.attributes.title}
                  </h2>
                  <p className="text-sm md:text-base mb-2">{banner.attributes.description}</p>
                  {banner.attributes.cta_button_text && (
                    <span className="inline-block bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">
                      {banner.attributes.cta_button_text}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
