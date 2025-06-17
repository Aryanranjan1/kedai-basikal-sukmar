// src/components/PageLoader.jsx
'use client';

import React from 'react'; // Removed useEffect as scroll management is moved
import Lottie from 'lottie-react';
import lottieAnimationData from '@/animations/Animation - 1750172491552.json';

const PageLoader = () => {
  // Removed the useEffect hook here as scroll management is now in ScrollManager.jsx

  return (
    <div style={loaderOverlayStyle}>
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
  backgroundColor: 'rgba(18, 73, 112, 0.95)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

export default PageLoader;