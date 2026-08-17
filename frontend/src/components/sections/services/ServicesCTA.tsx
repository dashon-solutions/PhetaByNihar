import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServicesCTA: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 bg-white overflow-hidden border-t border-[#E8D8C5]">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #D7A65B 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div className="max-w-2xl">
          <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
            LET'S CREATE MEMORIES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-4">
            Let's Make Your Celebration Truly Royal
          </h2>
          <p className="text-[#666666] font-sans text-sm md:text-base leading-relaxed">
            Whether it's your wedding, cultural event, corporate celebration, or family function, our expert team is ready to preserve tradition with elegance and perfection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-[#8A2B24] group"
          >
            <span>Book Your Event</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#4D2D22] border-2 border-[#D7A65B] hover:bg-[#6E1E18] hover:text-[#F3D18A] hover:border-[#6E1E18] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Contact Us</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

