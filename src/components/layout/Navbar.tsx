'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black/20 backdrop-blur-sm'
    } border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
              Travel<span className="text-cyan-400">Hub</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Trang chủ
              </Link>
              <Link href="/tours" className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Tour
              </Link>
              <Link href="/destinations" className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Điểm đến
              </Link>
              <Link href="/about" className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Về chúng tôi
              </Link>
              <Link href="/contact" className="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Liên hệ
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-cyan-400 p-2 rounded-md transition-colors duration-300 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/login" className="text-white hover:text-cyan-400 p-2 rounded-md transition-colors duration-300">
              <User size={20} />
            </Link>
            <Link href="/signup" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105">
              Đăng ký
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white hover:text-cyan-400 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Trang chủ
            </Link>
            <Link href="/tours" className="text-white hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Tour
            </Link>
            <Link href="/destinations" className="text-white hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Điểm đến
            </Link>
            <Link href="/about" className="text-white hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-white hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">
              Liên hệ
            </Link>
            <div className="flex items-center space-x-4 px-3 py-2">
              <Link href="/cart" className="text-white hover:text-cyan-400 transition-colors duration-300 relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/login" className="text-white hover:text-cyan-400 transition-colors duration-300">
                <User size={20} />
              </Link>
              <Link href="/signup" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}