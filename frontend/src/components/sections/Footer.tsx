import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../ui/SocialIcons';

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
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://www.instagram.com/pheta_by_nihar_tambde/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all shadow-sm group"
                title="Follow on Instagram (@pheta_by_nihar_tambde)"
                aria-label="Instagram Brand"
              >
                <InstagramIcon className="w-5 h-5 text-[#D7A65B] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/_nihar_tambde_6895"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all shadow-sm group"
                title="Follow Nihar Tambde on Instagram (@_nihar_tambde_6895)"
                aria-label="Instagram Personal"
              >
                <InstagramIcon className="w-5 h-5 text-[#D7A65B] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100086398737546"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm group"
                title="Facebook Page (Pheta By Nihar)"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-5 h-5 text-[#D7A65B] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCyIW3yq9Vyt9fAIe8x_EWtg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all shadow-sm group"
                title="Subscribe on YouTube"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-5 h-5 text-[#D7A65B] group-hover:text-white transition-colors" />
              </a>
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
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+918652028136" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>+91 86520 28136</span>
                    <span className="text-[10px] text-[#D7A65B] border border-[#D7A65B]/40 px-1.5 py-0.2 rounded font-medium">Work</span>
                  </a>
                  <a href="tel:+918087545175" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>+91 80875 45175</span>
                    <span className="text-[10px] text-[#E8D8C5]/70 border border-[#E8D8C5]/30 px-1.5 py-0.2 rounded font-medium">Personal</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D7A65B] flex-shrink-0" />
                <span>phetabynihar@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D7A65B] flex-shrink-0 mt-1" />
                <a
                  href="https://share.google/xj6WCITif4HwHcTTn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D7A65B] transition-colors leading-relaxed"
                >
                  no. 33/J, 9, Mughbhat cross lane Twashta kansar chwal, Girgaon, Mumbai, Maharashtra 400004
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Admin Access */}
        <div className="border-t border-white/10 pt-6 text-center font-sans text-xs text-[#E8D8C5]/70 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 Pheta By Nihar. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Designed and Developed by{' '}
              <a
                href="https://www.dashonsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D7A65B] hover:text-[#F3D18A] font-semibold underline underline-offset-2 transition-colors ml-1"
              >
                Dashon Solutions Pvt. Ltd.
              </a>
            </p>
            <span className="text-white/30 hidden sm:inline">•</span>
            <a
              href="/admin"
              className="text-[#D7A65B]/80 hover:text-white transition-colors flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[11px]"
              title="Admin Portal"
            >
              <span>👑 Admin Login</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
