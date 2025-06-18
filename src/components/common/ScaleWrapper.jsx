'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const BASE_WIDTH = 1440;

const ScaleWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  const calculateScale = useCallback(() => {
    if (typeof window !== 'undefined' && contentRef.current && wrapperRef.current) {
      const currentWidth = window.innerWidth;
      const newScale = currentWidth / BASE_WIDTH;
      setScale(newScale);

      wrapperRef.current.style.width = `${BASE_WIDTH * newScale}px`;

      // Temporarily remove scaling to get accurate height
      contentRef.current.style.transform = 'none';
      const contentHeight = contentRef.current.scrollHeight;

      // Reapply scaling and set height
      contentRef.current.style.transform = `scale(${newScale})`;
      contentRef.current.style.transformOrigin = 'top left';
      wrapperRef.current.style.height = `${contentHeight * newScale}px`;
    }
  }, []);

  useEffect(() => {
    calculateScale();

    // Observe content size changes (e.g., from dynamic content)
    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [calculateScale]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div
        ref={contentRef}
        className="absolute top-0 left-0"
        style={{ width: `${BASE_WIDTH}px`, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaleWrapper;
