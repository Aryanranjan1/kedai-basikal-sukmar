// src/app/loading.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from '../components/PageLoader';
import { useLoader } from '../context/LoaderContext'; // Assuming this context exists and is correct

export default function Loading() { // Name the component "Loading" or "LoadingPage"
  const { isLoading, setIsLoading } = useLoader();
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pathname, setIsLoading]);

  return (
    // This component only renders the loader, not the entire HTML document.
    <PageLoader loading={isLoading} />
  );
}