import React from 'react';

const NationwideReachSection = () => {
    return (
        // Main container for the section
        // justify-start remains to ensure content starts from the left
        <section className="relative w-full py-20 bg-[#F7F7F7] overflow-hidden min-h-[800px] flex items-center justify-start">
            {/* Background elements - remain on the right side */}

            {/* Large semi-transparent blue circle */}
            <svg
                width="607"
                height="607"
                style={{
                    position: 'absolute',
                    right: -150, // Remains on the right
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

            {/* World Map / Nationwide illustration (the background image) */}
            {/* Added scale-x-[-1] for horizontal flip, removed opacity-50 for 100% opacity */}
            <img
                className="absolute w-[1179.30px] h-[661px] right-[-300px] top-1/2 transform -translate-y-1/2 scale-x-[-1] rotate-[0deg] origin-center z-0" // <-- Key changes here: added 'scale-x-[-1]', removed 'opacity-50'
                src="/images/close-up-bike-with-trunk.png"
                alt="World Map / Nationwide illustration"
            />

            {/* Main content wrapper - Added pl-[100px] for left margin */}
            {/* The 'px-4' will provide 16px right padding, and 100px left padding from 'pl-[100px]' */}
            <div className="relative z-10 w-full px-4 pl-[100px] flex justify-start"> {/* <-- Key change here: added 'pl-[100px]' */}
                {/* Text content block */}
                {/* Removed mr-auto as pl-[100px] on parent handles left alignment */}
                <div className="max-w-[550px] flex flex-col items-start text-left gap-3"> {/* <-- Key change here: removed 'mr-auto' */}
                    {/* "OUR REACH" tag */}
                    <div className="px-4 py-1 bg-[#12497033] rounded-md inline-block">
                        <p className="text-[#124970] text-xl font-medium font-['Inter']">OUR REACH</p>
                    </div>

                    {/* Main headings */}
                    <h2 className="text-black text-[44px] font-light font-['Outfit'] leading-tight">
                        We are present
                    </h2>
                    <h3 className="text-black text-6xl font-bold font-['Outfit'] leading-tight">
                        all over the <span className="text-[#124970]">nation</span>
                    </h3>

                    {/* Description */}
                    <p className="text-black text-lg font-normal font-['Inter'] leading-relaxed max-w-lg">
                        From Jenjarom to the farthest corners of the Malaysia, we're pedaling towards a world where everyone enjoys the ride. Our passion for bikes knows no borders – and neither do our dreams!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NationwideReachSection;