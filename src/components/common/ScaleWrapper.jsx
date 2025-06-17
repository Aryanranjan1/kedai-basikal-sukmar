// components/common/ScaleWrapper.jsx
'use client'; // <--- CRITICAL: This directive MUST be at the very top of the file.

import React, { useState, useEffect, useRef, useCallback } from 'react';

const BASE_WIDTH = 1440; // The target width for your design

const ScaleWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null); // Ref for the inner div that gets scaled
  const wrapperRef = useRef(null); // Ref for the outer div that reserves space

  const calculateScale = useCallback(() => {
    // Only execute if window is defined (client-side) and refs are available
    if (typeof window !== 'undefined' && contentRef.current && wrapperRef.current) {
      const currentWidth = window.innerWidth;
      const newScale = currentWidth / BASE_WIDTH;
      setScale(newScale);

      // Set the width of the outer wrapper based on the scaled BASE_WIDTH.
      // This reserves the appropriate horizontal space on the page for the scaled content.
      wrapperRef.current.style.width = `${BASE_WIDTH * newScale}px`;

      // Temporarily remove scale from contentRef to get its true unscaled scrollHeight.
      // This is crucial for accurate height calculation, especially during rapid resizing.
      contentRef.current.style.transform = 'none';
      const originalContentHeight = contentRef.current.scrollHeight;

      // Reapply the transform scale and set the origin to top-left.
      contentRef.current.style.transform = `scale(${newScale})`;
      contentRef.current.style.transformOrigin = 'top left';

      // Set the height of the outer wrapper to match the scaled height of the content.
      // This ensures the wrapper reserves enough vertical space and prevents content cutoff.
      wrapperRef.current.style.height = `${originalContentHeight * newScale}px`;
    }
  }, []); // useCallback dependencies: empty, as it doesn't depend on external state/props that change during its lifecycle.

  useEffect(() => {
    calculateScale(); // Perform initial calculation when the component mounts.

    // Add event listener to recalculate scale whenever the window is resized.
    window.addEventListener('resize', calculateScale);

    // Cleanup function: remove the event listener when the component unmounts
    // to prevent memory leaks and ensure correct behavior.
    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [calculateScale]); // useEffect dependency: `calculateScale` itself.

  return (
    // The `wrapperRef` div controls the layout space the scaled content occupies.
    // `relative overflow-hidden` are important for containing the absolutely positioned child
    // and handling any slight rendering overlaps during scaling.
    <div ref={wrapperRef} className="relative overflow-hidden">
      {/* The `contentRef` div is the element that actually gets the CSS `transform` applied.
          It's absolutely positioned within its `wrapperRef` parent and has its original `BASE_WIDTH`. */}
      <div ref={contentRef} className="absolute top-0 left-0" style={{ width: `${BASE_WIDTH}px` }}>
        {children} {/* Renders all children passed to ScaleWrapper */}
      </div>
    </div>
  );
};

export default ScaleWrapper;