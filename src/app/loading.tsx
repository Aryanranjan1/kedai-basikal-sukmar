// src/app/loading.tsx
'use client';

// REMOVE 'useState' from this import line
import { useEffect, useRef } from 'react'; 
import { usePathname } from 'next/navigation';
import PageLoader from '../components/PageLoader';
import { useLoader } from '../context/LoaderContext';

export default function Loading() {
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
    <PageLoader loading={isLoading} />
  );
}