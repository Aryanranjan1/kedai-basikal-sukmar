'use client';

import { useEffect } from 'react';

const ScrollFixer = () => {
  useEffect(() => {
    const triggerLayoutReflow = () => {
      document.body.style.overflowY = 'hidden';
      setTimeout(() => {
        document.body.style.overflowY = 'auto';
      }, 50);
    };

    // Trigger on mount
    triggerLayoutReflow();
  }, []);

  return null;
};

export default ScrollFixer;
