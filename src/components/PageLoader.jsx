// src/components/PageLoader.jsx
'use client';

import React from 'react';
import Lottie from 'lottie-react';
// Ensure this path is correct based on your project structure
import lottieAnimationData from '@/animations/Animation - 1750172491552.json';

// Props interface for TypeScript users, remove if not using TypeScript
/**
 * @typedef {Object} PageLoaderProps
 * @property {boolean} loading - Controls the visibility of the loader.
 */

/**
 * PageLoader component displays a full-screen loading animation.
 * It's controlled by a 'loading' prop.
 *
 * @param {PageLoaderProps} props
 */
const PageLoader = ({ loading }) => {
  return (
    <div
      style={loaderOverlayStyle}
      // Apply opacity and pointer-events for smooth transition and interaction blocking
      className={`transition-opacity duration-300 ${
        loading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="loader-animation-wrapper">
        <Lottie
          animationData={lottieAnimationData}
          loop={true}
          autoplay={true}
          style={{ width: '150px', height: '150px' }}
        />
      </div>

      <style jsx>{`
        @keyframes zoomInOut {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .loader-animation-wrapper {
          animation: zoomInOut 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const loaderOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(18, 73, 112, 0.95)', // Your dark blue with transparency
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Ensure it's on top of everything
};

export default PageLoader;