import React from 'react';
import { Camera, Users, Video, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4D2D22] text-white pt-20 pb-6 relative overflow-hidden">

      {/* Background Decorative Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#4D2D22]/90 opacity-10 z-10"></div>
        <div className="absolute inset-0 bg-[url('/orangeFooter.png')] bg-cover bg-center bg-no-repeat z-0 opacity-100 mix-blend-luminosity"></div>
      </div>

      <div className="px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto relative z-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-full p-1 flex items-center justify-center border-2 border-[#D7A65B]">
                <img src="/logo.png" alt="Pheta By Nihar" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-serif font-bold text-2xl text-[#D7A65B]">Pheta By Nihar</span>
            </div>
            <p className="font-sans text-[#E8D8C5] text-sm mb-6 leading-relaxed">
              Preserving Maharashtrian heritage through the art of Pheta tying. Elevating every celebration with royal elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6E1E18] transition-colors"><Camera className="w-5 h-5 text-[#D7A65B]" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6E1E18] transition-colors"><Users className="w-5 h-5 text-[#D7A65B]" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6E1E18] transition-colors"><Video className="w-5 h-5 text-[#D7A65B]" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-[#D7A65B] tracking-wider uppercase mb-6 text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-[#E8D8C5]">
              <li><a href="#" className="hover:text-white transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Nihar Tambde</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pheta Services & Workshops</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products & Rentals Page</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Now Page</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-sans font-bold text-[#D7A65B] tracking-wider uppercase mb-6 text-sm">Our Services</h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-[#E8D8C5]">
              <li><a href="#" className="hover:text-white transition-colors">Wedding Pheta Ceremony</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workshops & Training</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pheta Rentals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Traditional Accessories</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-sans font-bold text-[#D7A65B] tracking-wider uppercase mb-6 text-sm">Contact</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-[#E8D8C5]">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D7A65B] flex-shrink-0" />
                <span>+91 98505 04054</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D7A65B] flex-shrink-0" />
                <span>phetabynihar@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D7A65B] flex-shrink-0 mt-1" />
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-6 text-center font-sans text-xs text-[#E8D8C5]/60 flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Pheta By Nihar. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Designed with Tradition</p>
        </div>

      </div>
    </footer>
  );
};
