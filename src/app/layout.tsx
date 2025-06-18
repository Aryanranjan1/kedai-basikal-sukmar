'use client';

import { Outfit } from 'next/font/google';
import './globals.css';
import '../styles/pagination.css';
import PageLoader from '../components/PageLoader';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const isInitialLoadRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show loader on route change (but not on first load)
  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    setIsLoading(true);

    // Fallback max time in case something goes wrong
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      console.warn('Loader auto-dismissed after 5s');
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Hide loader immediately after render
  useEffect(() => {
    if (isLoading) {
      const raf = requestAnimationFrame(() => {
        setIsLoading(false);
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [isLoading]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${outfit.variable} text-gray-900`}
        style={{
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
          backgroundColor: '#F7F7F7',
        }}
      >
        <PageLoader loading={isLoading} />
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
