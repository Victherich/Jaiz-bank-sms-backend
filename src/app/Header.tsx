'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="text-3xl font-semibold text-blue-600">
          <Link href="/">PortfolioBuilder</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="space-x-8 hidden md:flex">
          <Link href="/" className="text-gray-800 hover:text-blue-600 transition">Home</Link>
          <Link href="/about" className="text-gray-800 hover:text-blue-600 transition">About</Link>
          <Link href="/portfolio" className="text-gray-800 hover:text-blue-600 transition">Portfolio</Link>
          <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-full text-lg transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-full text-lg transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 shadow-lg">
          <Link href="/" className="block text-gray-800 hover:text-blue-600">Home</Link>
          <Link href="/about" className="block text-gray-800 hover:text-blue-600">About</Link>
          <Link href="/portfolio" className="block text-gray-800 hover:text-blue-600">Portfolio</Link>
          <Link href="/contact" className="block text-gray-800 hover:text-blue-600">Contact</Link>

          <hr className="border-gray-200" />

          <Link
            href="/login"
            className="block bg-yellow-500 hover:bg-yellow-400 text-white text-center py-2 px-4 rounded-full transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="block bg-blue-600 hover:bg-blue-500 text-white text-center py-2 px-4 rounded-full transition"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
