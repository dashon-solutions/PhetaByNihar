import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export interface NavbarProps {
  theme?: 'light' | 'dark';
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products & Rentals', href: '/products' },
    { name: 'Our Work', href: '/our-work' },
    { name: 'Upcoming Events', href: '/events' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-soft py-2' : 'py-5'
      }`}
    >
      {/* Background Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-300 -z-10 ${
          isScrolled ? 'bg-[#6E1E18]' : 'bg-transparent'
        }`}
      />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer relative z-10 h-full py-1">
          <img
            src="/logo.png"
            alt="Pheta By Nihar"
            className={`w-auto object-contain transition-all duration-500 ease-in-out origin-top-left ${
              isScrolled
                ? 'h-16 scale-[1.3] translate-y-2 md:translate-y-4 mix-blend-multiply'
                : `h-16 scale-100 translate-y-0 ${theme === 'dark' ? 'mix-blend-multiply' : ''}`
            }`}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`font-sans text-xs xl:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#F3D18A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F3D18A] after:rounded-full'
                    : isScrolled || theme === 'dark'
                    ? 'text-white/90 hover:text-[#F3D18A]'
                    : 'text-[#4D2D22] hover:text-[#6E1E18]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile / Tablet Menu Toggle - Strictly hidden on Desktop (lg+) */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
            isScrolled || theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#4D2D22] hover:bg-black/5'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile / Tablet Navigation Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FFFDFB] shadow-xl py-5 px-6 flex flex-col gap-3 border-b border-[#E8D8C5] max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`font-sans text-sm font-bold uppercase tracking-wider transition-colors py-2.5 px-3 rounded-xl flex items-center justify-between ${
                  isActive
                    ? 'bg-[#6E1E18] text-[#F3D18A]'
                    : 'text-[#4D2D22] hover:bg-[#F8F3EC] hover:text-[#6E1E18]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F3D18A]" />}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
