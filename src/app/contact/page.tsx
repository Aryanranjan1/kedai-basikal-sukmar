// src/app/contact/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/common/NavBar';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import ScaleWrapper from '@/components/common/ScaleWrapper';

const ContactPage: React.FC = () => {
    return (
        // The banner image is now OUTSIDE the ScaleWrapper
        // so it remains fixed and unaffected by the scaling.
        <>{/* Wrap the rest of the page content (excluding the banner) with ScaleWrapper */}
            <ScaleWrapper>
                {/* Navbar */}
                <Navbar />
            {/* Banner Image - Now with fixed dimensions */}
            <div style={{
                position: 'relative',
                width: '1440px', // Set fixed width
                height: '800px', // Set fixed height
                overflow: 'hidden',
                // You might want to center this fixed-size div if the screen is wider
                // You can add 'margin: 0 auto;' if you want it horizontally centered
                // e.g., margin: '0 auto',
                zIndex: 0
            }}>
                <Image
                    src="/images/We are at Your Service!.png"
                    alt="We are at Your Service!"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority
                />
                {/* Optional: Text overlay (remains unchanged) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    zIndex: 10
                }}>
                    {/* You can add text here if the image doesn't already have it */}
                </div>
            </div>
                {/* Main Contact Section */}
                <ContactSection />

                {/* Footer */}
                <Footer />
            </ScaleWrapper>
        </>
    );
};

export default ContactPage;