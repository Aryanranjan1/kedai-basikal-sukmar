// src/components/common/Footer.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // Import the Image component

const Footer = () => {
  return (
    // Footer needs relative positioning for the absolute ellipse and overflow-hidden to clip it
    // All paddings/margins in this component should ideally be pixel-based (or values that Tailwind resolves to pixels)
    // so they scale consistently with the BASE_WIDTH.
    <footer className="w-full bg-[#F7F7F7] pt-[48px] pb-[96px] relative z-10 overflow-hidden text-[14px] sm:text-[16px]"> {/* 'sm:text-[16px]' is okay if you want a *tiny* jump at 640px */}
      {/* Absolute positioned radial gradient ellipse */}
      <div
        className="absolute"
        style={{
          width: '2160px', // Matches 150vw at 1440px base width
          height: '2160px',
          borderRadius: 9999,
          left: '50%',
          bottom: '-330%', // Half of 2160px, going below the footer
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, #124970 0%, rgba(18, 73, 112, 0) 100%)',
          zIndex: 0,
        }}
      />

      {/* Main Footer Content Wrapper */}
      {/*
        Changed 'flex-col md:flex-row' to just 'flex-row'.
        Removed 'md:px-[32px]' and 'md:gap-[48px]'. Using base px values for consistency.
        The 'max-w-7xl' was removed in a previous step, now 'w-[1280px]' will scale.
      */}
      <div className="w-[1280px] mx-auto px-[16px] flex flex-row justify-between items-start gap-[48px] relative">

        {/* Left Section: Logo/Motto & Contact Info */}
        {/* Changed 'flex-col gap-6 md:gap-8 md:w-1/3' to ensure consistent layout. */}
        <div className="flex flex-col gap-[32px] w-1/3">
          {/* Logo/Motto */}
          <div>
            <h3 className="text-[32px] sm:text-[40px] font-semibold font-['Outfit']">
              <span className="text-black">Your </span>
              <span className="text-[#124970]">Journey,</span>
            </h3>
            <p className="text-[16px] sm:text-[18px] text-gray-600 font-['Outfit'] mt-[8px]">
              is our passion .....
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[16px] sm:text-[18px] font-semibold font-['Outfit'] text-black">Address:</h4>
            <p className="text-[14px] sm:text-[16px] text-gray-600 font-['Outfit'] mt-[4px]">
              No3, Jalan 3/2, Taman Seri Jaromas,<br />
              42600 Jenjarom, Selangor
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[16px] sm:text-[18px] font-semibold font-['Outfit'] text-black">Contact Details:</h4>
            <p className="text-[14px] sm:text-[16px] text-gray-600 font-['Outfit'] mt-[4px]">
              +60 12-345 6789<br />
              +60 11-2233 4455<br />
              kedaibasikalsukmar@gmail.com
            </p>
          </div>
        </div>

        {/* Middle Section: Navigation */}
        {/* Changed 'md:w-1/4' to just 'w-1/4' */}
        <div className="flex flex-col w-1/4">
          <h4 className="text-[18px] sm:text-[20px] font-semibold font-['Outfit'] text-[#124970] mb-[16px]">Navigation</h4>
          <ul className="text-[16px] sm:text-[18px] text-gray-700 font-['Outfit'] space-y-[8px]">
            <li><a href="#" className="hover:text-[#124970] transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-[#124970] transition-colors">Bicycles</a></li>
            <li><a href="#" className="hover:text-[#124970] transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-[#124970] transition-colors">About us</a></li>
            <li><a href="#" className="hover:text-[#124970] transition-colors">Contact us</a></li>
          </ul>
        </div>

        {/* Right Section: Map & Socials */}
        {/* Changed 'items-center md:items-end' to just 'items-end' for a consistent scaled look.
            Changed 'md:w-1/3' to 'w-1/3'. */}
        <div className="flex flex-col items-end gap-[24px] w-1/3">
          {/* Map Iframe Container */}
          <div className="w-[300px] h-[224px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7805579130713!2d101.5030893!3d2.8795565999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdaf5002df7279%3A0x54e798ff077e5825!2sKedai%20Basikal%20Sukmar!5e0!3m2!1sen!2sin!4v1750158697651!5m2!1sen!2sin" // Ensure this is your actual Google Maps embed URL
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-[16px] mt-[16px]">
            {/* Facebook */}
            <a href="#" className="w-[56px] h-[56px] bg-[#124970] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
              <Image 
                src="/images/facebook.svg" 
                alt="Facebook" 
                width={32} // Explicit width
                height={32} // Explicit height
                className="object-contain" 
              />
            </a>
            {/* Twitter */}
            <a href="#" className="w-[56px] h-[56px] bg-[#124970] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
              <Image 
                src="/images/x.svg" 
                alt="Twitter" 
                width={32} // Explicit width
                height={32} // Explicit height
                className="object-contain" 
              />
            </a>
            {/* Instagram */}
            <a href="#" className="w-[56px] h-[56px] bg-[#124970] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
              <Image 
                src="/images/instagram.svg" 
                alt="Instagram" 
                width={32} // Explicit width
                height={32} // Explicit height
                className="object-contain" 
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-[#124970] flex items-center justify-center z-20">
        <p className="text-white text-[14px] sm:text-[16px] font-['Inter'] font-medium">
          © 2025 Kedai Basikal Sukmar. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;