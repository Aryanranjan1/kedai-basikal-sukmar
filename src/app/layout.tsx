// src/app/layout.tsx
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import '../styles/pagination.css';
import ScrollFixer from '../components/common/ScrollFixer'; // Scroll fix component

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Kedai Basikal Sukmar',
  description: 'Your premier destination for bicycles and cycling services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          minHeight: '100vh',
          backgroundColor: '#F7F7F7',
        }}
      >
        <ScrollFixer />

        <main className="min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
