import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export interface NavbarProps {
  theme?: 'light' | 'dark';
}

export const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home ', href: '/' },
    { name: 'About Nihar Tambde', href: '/about' },
    { name: 'Pheta Services & Workshops', href: '/services' },
    { name: 'Products & Rentals ', href: '/products' },
    { name: 'Our Work', href: '/our-work' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-soft py-2' : 'py-6'
      }`}>
      {/* Separate Background Layer for Stacking Control */}
      <div className={`absolute inset-0 transition-colors duration-300 -z-10 ${isScrolled ? 'bg-[#6E1E18]' : 'bg-transparent'}`}></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer relative z-10 h-full py-1">
          <img
            src="/logo.png"
            alt="Pheta By Nihar"
            className={`w-auto object-contain transition-all duration-500 ease-in-out origin-top-left ${isScrolled
              ? 'h-16 scale-[1.4] translate-y-2 md:translate-y-6 mix-blend-multiply'
              : `h-16 scale-100 translate-y-0 ${theme === 'dark' ? 'mix-blend-multiply' : ''}`
              }`}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-sans text-sm font-bold transition-colors ${
                isScrolled || theme === 'dark' 
                  ? 'text-white hover:text-[#D7A65B]' 
                  : 'text-[#4D2D22] hover:text-[#6E1E18]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link to="/contact">
            <Button variant="secondary" showArrow>Contact Us</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={isScrolled || theme === 'dark' ? 'text-white' : 'text-[#4D2D22]'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FFFDFB] shadow-soft-hover py-4 px-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[#666666] hover:text-[#6E1E18] font-sans text-base font-medium transition-colors py-2 border-b border-[#E8D8C5] last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="w-full mt-4 block" onClick={() => setIsMobileMenuOpen(false)}>
            <Button showArrow className="w-full">Book Now</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
