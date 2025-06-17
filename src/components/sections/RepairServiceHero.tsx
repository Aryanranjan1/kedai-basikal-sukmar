// src/components/sections/RepairServiceHero.tsx
import React from 'react';
import ServiceCard from '@/components/common/ServiceCard'; // Ensure this path is correct

export default function RepairServiceHero() {
  return (
    // Main container: height set to 1024px, relative for absolute children,
    // background color, padding, and overflow-hidden.
    <div className="w-full h-[900px] relative bg-[#F7F7F7] py-[50px] overflow-hidden">

      {/* --- Original Concentric circles with transparent intersection using SVG mask --- */}
      {/* Positioned as per your request */}
      <svg
        width="1007"
        height="1134"
        style={{
          position: 'absolute',
          left: 645, // Reverted to original left: 600
          top: -80,  // Reverted to original top: -80
          zIndex: 0, // Ensure it's behind content
        }}
      >
        <defs>
          <mask id="concentricMask">
            {/* Reverted circle dimensions for this specific SVG */}
            <rect x="0" y="0" width="1007" height="1134" fill="white" />
            <circle cx="603.5" cy="617" r="400" fill="black" />
            <circle cx="603.5" cy="617" r="300" fill="black" />
          </mask>
        </defs>
        <circle
          cx="603.5"
          cy="617"
          r="500"
          fill="rgba(18, 73, 112, 0.3)"
          mask="url(#concentricMask)"
        />
      </svg>

      {/* --- Original Bicycle Image --- */}
      {/* Positioned as per your request */}
      <div
        style={{
          width: 784.41,
          height: 1161.23,
          position: 'absolute',
          left: 680,  // Reverted to original left: 580
          top: -10, // Reverted to original top: -200
          transform: 'rotate(178.08deg) rotateX(180deg)',
          zIndex: 1, // Ensure it's between background and content
        }}
      >
        <img
          src="/images/cool-bicycle-studio.png" // Ensure this path is correct
          alt="Hero Bicycle"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      {/* --- Main Content Block (text and service cards) - Remains Aligned to the LEFT --- */}
      {/* Uses flexbox to position content, justify-start aligns it to the left */}
      {/* px-[100px] for 100px responsive horizontal padding on the whole section content */}
      <div className="relative z-10 w-full flex justify-start px-[100px]">
        {/* New wrapper div for text content and service cards */}
        {/* Adjusted top positioning to push this block down, and added pb-[100px] for downward padding */}
        <div className="absolute top-[200px] pb-[100px]"> {/* Added pb-[100px] here */}
          <div className="max-w-[550px] text-left flex flex-col items-start gap-2">
            
            {/* OUR SERVICES Tag (UPDATED) */}
            <div className="absolute left-[475px] top-[-130px] w-[376px] h-[87px] bg-[rgba(18,73,112,0.20)] rounded-[4px] flex items-center justify-center">
              <p className="text-[#124970] text-[48px] font-medium font-['Inter']">OUR SERVICES</p>
            </div>

            {/* Headings */}
            <h2 className="text-black text-3xl font-light font-['Outfit'] mb-1 leading-tight">
              Comprehensive <span className="text-[#124970]">services</span>
            </h2>
            <h3 className="text-black text-5xl font-bold font-['Outfit'] mb-2 leading-tight">
              for <span className="text-[#124970]">Every</span> Ride.
            </h3>

            {/* Description */}
            <p className="text-black text-base font-normal font-['Inter'] leading-relaxed mb-4">
              Our skilled mechanics are equipped to handle a wide range of repairs and maintenance needs, ensuring your bicycle performs optimally and safely.
            </p>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              <ServiceCard
                icon={<img src="/images/refresh.png" alt="Cart Icon" className="w-6 h-6" />}
                title1="Tyre"
                title2="Repair"
              />
              <ServiceCard
                icon={<img src="/images/tools.svg" alt="Repair Icon" className="w-6 h-6" />}
                title1="Break"
                title2="Repair"
              />
              <ServiceCard
                icon={<img src="/images/tyre.png" alt="Delivery Icon" className="w-6 h-6" />}
                title1="Part"
                title2="Change"
              />
              <ServiceCard
                icon={<img src="/images/gear.svg" alt="Gear Icon" className="w-6 h-6" />}
                title1="Gear"
                title2="Tunning"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}