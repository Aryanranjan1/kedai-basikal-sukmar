// src/components/HeroSection.jsx
import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 824,
        position: 'relative',
        background: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Concentric circles with transparent intersection using SVG mask */}
      <svg
        width="1007"
        height="1034"
        style={{
          position: 'absolute',
          left: 600,
          top: -80,
          zIndex: 0,
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

      {/* Bicycle Image */}
      <div
        style={{
          width: 884.41,
          height: 1261.23,
          position: 'absolute',
          left: 580,
          top: -200,
          transform: 'rotate(178.08deg) rotateX(180deg)',
          zIndex: 1,
        }}
      >
        <img
          src="/images/cool-bicycle-studio.png"
          alt="Hero Bicycle"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      {/* Text & Buttons */}
      <div
        style={{
          width: 511,
          height: 381,
          position: 'absolute',
          left: 99,
          top: 200,
          zIndex: 2,
        }}
      >
        {/* Ride Joy with Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(18, 73, 112, 0.20)',
            padding: '4px 12px',
            borderRadius: 4,
            width: 'fit-content',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <img
            src="/images/smile-5089.svg"
            alt="Ride Joy Icon"
            style={{ width: 20, height: 20 }}
          />
          <div
            style={{
              color: '#124970',
              fontSize: 20,
              fontFamily: 'Inter',
              fontWeight: 500,
            }}
          >
            Ride Joy
          </div>
        </div>

        {/* Hero Title */}
        <div
          style={{
            position: 'absolute',
            top: 57,
            fontSize: 50,
            fontFamily: 'Outfit',
            fontWeight: 300,
            color: 'black',
          }}
        >
          <span>Pedal </span>
          <span style={{ color: '#124970' }}>Towards</span>
          <span> a</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 117,
            fontSize: 76,
            fontFamily: 'Outfit',
            fontWeight: 500,
          }}
        >
          <span style={{ color: '#124970' }}>Healthier</span>
          <span style={{ color: 'black' }}> You!</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 233,
            width: 510,
            color: 'black',
            fontSize: 19,
            fontFamily: 'Inter',
            fontWeight: 400,
          }}
        >
          Discover top-quality electric bicycles and professional repair services right here in
          Jenjarom. We're your go-to for family-friendly rides and a healthier lifestyle!
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            position: 'absolute',
            top: 356,
            display: 'flex',
            gap: 16,
          }}
        >
          {/* Link to /bicycles */}
          <Link href="/bicycles" passHref>
            <div
              style={{
                background: '#124970',
                color: 'white',
                fontSize: 20,
                fontFamily: 'Inter',
                fontWeight: 500,
                padding: '14px 24px',
                borderRadius: 8,
                cursor: 'pointer',
                textDecoration: 'none', // Important for Link components
                display: 'inline-block', // Important for Link components to apply padding correctly
              }}
            >
              Explore Bikes
            </div>
          </Link>

          {/* Link to /contact */}
          <Link href="/contact" passHref>
            <div
              style={{
                color: '#124970',
                fontSize: 20,
                fontFamily: 'Inter',
                fontWeight: 500,
                padding: '14px 24px',
                borderRadius: 8,
                outline: '1px solid #124970',
                cursor: 'pointer',
                textDecoration: 'none', // Important for Link components
                display: 'inline-block', // Important for Link components to apply padding correctly
              }}
            >
              Contact Us
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;