// src/components/sections/ServicesSection.jsx
import React from 'react';
import ServiceCard from '../common/ServiceCard'; // Ensure this path is correct

const ServicesSection = () => {
  return (
    <section className="relative w-full py-20 bg-[#F7F7F7] overflow-hidden flex items-center justify-center">
      {/* Background SVG Circle */}
      <svg
        width="607"
        height="607"
        style={{
          position: 'absolute',
          left: -150,
          top: '35%',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      >
        <defs>
          <mask id="donutMask">
            <rect width="607" height="607" fill="white" />
            <circle cx="303.5" cy="303.5" r="220" fill="black" />
            <circle cx="303.5" cy="303.5" r="100" fill="black" />
          </mask>
        </defs>
        <circle
          cx="303.5"
          cy="303.5"
          r="303.5"
          fill="rgba(18, 73, 112, 0.3)"
          mask="url(#donutMask)"
        />
      </svg>

      {/* Background Image */}
      <img
        className="absolute w-[768.66px] h-[768.66px] left-[462.18px] top-[-120px] rotate-[57deg] origin-top-left z-0"
        src="/images/close-up-bike-nature-removebg.png"
        alt="Background graphic"
      />

      {/* Content aligned right within the section, but its internal text is left-aligned */}
      <div className="relative z-10 w-full px-30 flex justify-end"> {/* Keep justify-end here to push the whole content block to the right */}
        {/* ml-auto pushes it to the right, text-left and items-start align content internally */}
        <div className="max-w-[550px] ml-auto text-left flex flex-col items-start gap-2">
          {/* OUR SERVICES Tag */}
          <div className="px-4 py-1 bg-[#12497033] rounded-md inline-block mb-2">
            <p className="text-[#124970] text-xl font-medium font-['Inter']">OUR SERVICES</p>
          </div>

          {/* Headings */}
          <h2 className="text-black text-3xl font-light font-['Outfit'] mb-1 leading-tight">
            We extend our <span className="text-[#124970]">services</span>
          </h2>
          <h3 className="text-black text-5xl font-bold font-['Outfit'] mb-2 leading-tight">
            to the <span className="text-[#124970]">wide</span> variety.
          </h3>

          {/* Description */}
          <p className="text-black text-base font-normal font-['Inter'] leading-relaxed mb-4">
            At Kedai Basikal Sukmar, every cyclist finds their perfect fit and keeps their ride in top shape.
            From the thrill of a new electric bike to meticulous repairs and convenient doorstep service, we've got you covered!
          </p>

          {/* Service Cards */}
          {/* CHANGED: Removed sm:grid-cols-2. It will now consistently be grid-cols-2
              (assuming this is your desired desktop layout to be scaled). */}
          <div className="grid grid-cols-2 gap-6">
            <ServiceCard
              icon={<img src="/images/cart.svg" alt="Cart Icon" className="w-6 h-6" />}
              title1="New"
              title2="Bicycle"
            />
            <ServiceCard
              icon={<img src="/images/tools.svg" alt="Repair Icon" className="w-6 h-6" />}
              title1="Bike"
              title2="Repair"
            />
            <ServiceCard
              icon={<img src="/images/9004685_location_map_pin_navigation_marker_icon.svg" alt="location Icon" className="w-6 h-6" />}
              title1="Nation"
              title2="wide"
            />
            <ServiceCard
              icon={<img src="/images/gear.svg" alt="Gear Icon" className="w-6 h-6" />}
              title1="Bike"
              title2="Gear"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;