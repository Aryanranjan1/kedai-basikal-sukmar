'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // REDIRECT TO /bicycles page with 'search' query parameter
      router.push(`/bicycles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Bicycles', href: '/bicycles' }, // Ensured this link is also /bicycles
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="w-[1440px] max-w-full mx-auto px-8 py-4 flex justify-between items-center h-[100px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Untitled design.jpg"
            alt="Your Brand Logo"
            width={92}
            height={88}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-medium transition duration-300 ${
                pathname === link.href
                  ? 'text-[#124970]'
                  : 'text-gray-800 hover:text-[#124970]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search Input (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-gray-100 rounded-full pr-2"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-transparent rounded-full focus:outline-none text-gray-700 placeholder-gray-500 text-base w-48"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-[#124970] text-white hover:bg-blue-700 transition duration-300"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </form>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-[#124970] text-white text-xl font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 whitespace-nowrap"
          >
            Visit Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 absolute w-full z-40">
          <div className="px-8 pb-4">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full pr-2 mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 bg-transparent rounded-full focus:outline-none text-gray-700 placeholder-gray-500 text-base w-full"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#124970] text-white hover:bg-blue-700 transition duration-300"
                aria-label="Search"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-2 text-xl font-medium transition duration-300 ${
                  pathname === link.href
                    ? 'text-[#124970]'
                    : 'text-gray-800 hover:text-[#124970]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* CTA for Mobile */}
            <Link
              href="/contact"
              className="mt-4 block text-center bg-[#124970] text-white text-xl font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 whitespace-nowrap"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Visit Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;