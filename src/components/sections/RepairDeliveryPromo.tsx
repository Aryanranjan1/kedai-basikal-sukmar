import React from 'react';

const RepairDeliveryPromo = () => {
  return (
    <section className="w-full h-[900px] relative bg-[#F7F7F7] overflow-hidden flex items-center justify-start">

    
      {/* Original Ellipse positioning (left: -138, top: -31) */}
        <svg
                width="607"
                height="607"
                style={{
                    position: 'absolute',
                    left: -150, // Remains on the right
                    top: '35%',
                    transform: 'translateY(-50%)',
                    zIndex: 0,
                }}
            >
                <defs>
                    <mask id="donutMask2">
                        <rect width="607" height="607" fill="white" />
                        {/* Transparent cutout rings */}
                        <circle cx="303.5" cy="303.5" r="220" fill="black" />
                        <circle cx="303.5" cy="303.5" r="100" fill="black" />
                    </mask>
                </defs>
                <circle
                    cx="303.5"
                    cy="303.5"
                    r="303.5"
                    fill="rgba(18, 73, 112, 0.3)"
                    mask="url(#donutMask2)"
                />
            </svg>
      <img
        // Original image positioning (left: -325, top: 123)
        className="w-[1179.30px] h-[661px] absolute left-[-325px] top-[123px]"
        src="/images/close-up-bike-with-trunk.png" // **Update this path to your actual image**
        alt="Bicycle Delivery Service"
      />

      {/* Content Block (Headings, Description, Button) - ALIGNED TO THE RIGHT, TEXT IS LEFT-ALIGNED INTERNALLY */}
      {/* Used justify-end to push the content block to the right. */}
      {/* The inner div ensures text remains left-aligned within its max-width. */}
      <div className="relative z-10 w-full flex justify-end pr-[100px] pl-[100px]"> {/* Added pr-[100px] for right margin, keep pl-[100px] for consistent section width */}
        <div className="max-w-[570px] text-left flex flex-col items-start"> {/* text-left and items-start are restored here */}
          {/* Headings */}
          <h2 className="text-black text-[48px] font-semibold font-['Inter'] leading-tight mb-4">
            Your <span className="text-[#124970]">Repairs</span>, Delivered. Absolutely <span className="text-[#124970]">Free !</span>
          </h2>

          {/* Description */}
          <p className="text-[rgba(0,0,0,0.70)] text-[22px] font-normal font-['Outfit'] leading-relaxed mb-10">
            Letting your bike fixed has never been easier. We offer a complimentary pickup and delivery service for all bicycle repairs within the Jenjarom area. Simply book your repair with us, and our friendly team will collect your bike from your home or office, bring it to our shop for expert servicing, and return it to you once it's fixed. This means no fuss, no transport hassle, and no hidden fees—just pure convenience to keep you riding smoothly.
          </p>

          {/* "Book a Repair !" Button */}
          <a href="/contact" className="inline-block">
            <div className="w-[438px] h-[76px] bg-[#124970] rounded-[32px] flex items-center justify-center cursor-pointer">
              <p className="text-white text-[36px] font-semibold font-['Inter']">Book a Repair !</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RepairDeliveryPromo;