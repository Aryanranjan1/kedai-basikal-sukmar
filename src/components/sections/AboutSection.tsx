// src/components/sections/AboutSection.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const AboutSection: React.FC = () => {
    // Define heights for each section to correctly stack them
    const OUR_JOURNEY_SECTION_HEIGHT = 900; // Estimated height based on content
    const BEHIND_THE_RIDE_SECTION_HEIGHT = 800; // Based on image height
    const FOOTER_HEIGHT_ADJUSTMENT = 100; // Small buffer if needed for stacking

    // Total height for the entire AboutSection content area
    const TOTAL_ABOUT_SECTION_HEIGHT =
        OUR_JOURNEY_SECTION_HEIGHT +
        BEHIND_THE_RIDE_SECTION_HEIGHT +
        FOOTER_HEIGHT_ADJUSTMENT; // Sum of all sections plus a buffer

    return (
        // Main container for the About content, with fixed dimensions for scaling
        <div style={{
            width: '1440px', // Fixed width for your design canvas
            height: TOTAL_ABOUT_SECTION_HEIGHT, // Calculated height to fit all sections
            position: 'relative', // Allows absolute positioning of child sections
            background: '#F7F7F7', // Overall background color for the section
            overflow: 'hidden' // Ensures elements positioned outside boundaries are clipped
        }}>
            {/* Our Journey Segment */}
            <div style={{
                width: '100%', // Takes full width of parent (1440px)
                height: OUR_JOURNEY_SECTION_HEIGHT, // Fixed height for this segment
                position: 'absolute',
                left: 0,
                top: 0, // Positioned at the top of the AboutSection container
                overflow: 'hidden' // Clip content if it overflows this segment's div
            }}>
                {/* Background Ellipse SVG - As provided by user */}
                <svg
                    width="1007"
                    height="1034"
                    style={{
                        position: 'absolute',
                        left: 650, // Positioned as per user's SVG code
                        top: -230, // Positioned as per user's SVG code
                        zIndex: 0, // Ensure it's behind text/image content
                    }}
                >
                    <defs>
                        <mask id="concentricMask">
                            <rect x="0" y="0" width="1007" height="1034" fill="white" />
                            <circle cx="503.5" cy="517" r="350" fill="black" />
                            <circle cx="503.5" cy="517" r="250" fill="black" />
                        </mask>
                    </defs>
                    <circle
                        cx="503.5"
                        cy="517"
                        r="450"
                        fill="rgba(18, 73, 112, 0.3)"
                        mask="url(#concentricMask)"
                    />
                </svg>

                {/* Fixed the apostrophe in the content string below */}
                <div style={{width: 576, left: 102, top: 378, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 22, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>Our journey at Kedai Basikal Sukmar is fueled by a passion for two wheels and a commitment to our community. We envision a world where cycling is not just a mode of transport or a sport, but a lifestyle embraced by everyone. Our mission is to make that vision a reality by providing high-quality electric bicycles that are modern, efficient, and fun, alongside unparalleled repair services that keep you riding smoothly. We&apos;re dedicated to fostering healthier lives, promoting eco-friendly choices, and strengthening family bonds through the simple joy of cycling.</div>
                <div style={{width: 529, height: 64, left: 100, top: 224, position: 'absolute'}}>
                    <span style={{color: 'black', fontSize: 64, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Your </span>
                    <span style={{color: '#124970', fontSize: 64, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word'}}>Journey,</span>
                </div>
                <div style={{width: 509, left: 109, top: 288, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>is our passion&nbsp; .....</div>
                
                {/* Image 1: public/images/close-up-bike-nature-removebg.png */}
                <Image
                    src="/images/close-up-bike-nature-removebg.png"
                    alt="Close-up Bike in Nature"
                    width={720}
                    height={720}
                    style={{ left: 700, top: 96, position: 'absolute', objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Behind the Ride Segment - Positioned directly below "Our Journey" */}
            <div style={{
                width: '100%', // Takes full width of parent (1440px)
                height: BEHIND_THE_RIDE_SECTION_HEIGHT, // Fixed height for this segment
                position: 'absolute',
                left: 0,
                top: OUR_JOURNEY_SECTION_HEIGHT, // Starts after the first segment
                overflow: 'hidden'
            }}>
                {/* Fixed the apostrophes in the content string below */}
                <div style={{width: 576, left: 765, top: 210, position: 'absolute', color: 'rgba(0, 0, 0, 0.70)', fontSize: 22, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>Every great ride has a beginning, and ours started right here in Jenjarom. Kedai Basikal Sukmar was founded with the belief that a bicycle shop could be more than just a place to buy and fix bikes; it could be a hub for health, adventure, and community connection. From our humble beginnings as a local repair shop, we&apos;ve grown, fueled by the smiles of happy customers and the shared love for the open road.<br/><br/>Behind every successful repair and every perfect bike match is our dedicated team. Our skilled mechanics are not just experts in their craft; they&apos;re passionate cyclists themselves, committed to ensuring your ride is always at its best. Our friendly staff are here to guide you through our selection, answer your questions, and share their love for the cycling lifestyle. We&apos;re proud to be a part of your journey, helping you pedal towards countless adventures.</div>
                <div style={{width: 576, left: 765, top: 51, position: 'absolute'}}>
                    <span style={{color: 'black', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>Behind the </span>
                    <span style={{color: '#124970', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>Rides</span>
                    <span style={{color: 'black', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>: Our Story &amp; </span> {/* Added &amp; for '&' */}
                    <span style={{color: '#124970', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>Passion</span>
                    <span style={{color: 'black', fontSize: 48, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word'}}>.</span>
                </div>
                
                {/* Image 2: public/images/happy_customer.jpg */}
                <Image
                    src="/images/happy_customer.jpg"
                    alt="Happy Customer"
                    width={1200}
                    height={800}
                    style={{ left: -480, top: 0, position: 'absolute', objectFit: 'cover' }}
                    priority
                />
            </div>
            {/* The Testimonial Carousel placeholder has been removed from here. */}
        </div>
    );
};

export default AboutSection;