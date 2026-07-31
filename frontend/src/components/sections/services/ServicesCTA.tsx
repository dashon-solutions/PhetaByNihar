import React from 'react';

export const ServicesCTA: React.FC = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-[#E8D8C5]">
      {/* Decorative Pattern (Optional subtle element since bg is white) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #D7A65B 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div className="max-w-2xl">
          <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
            LET'S CREATE MEMORIES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight mb-6">
            Let's Make Your Celebration Truly Royal
          </h2>
          <p className="text-[#666666] font-sans text-base md:text-lg leading-relaxed">
            Whether it's your wedding, cultural event, corporate celebration, or family function, our expert team is ready to preserve tradition with elegance and perfection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#D7A65B] text-[#4D2D22] font-sans text-sm font-bold uppercase tracking-wider rounded hover:bg-[#C48B3C] transition-colors"
          >
            BOOK YOUR EVENT
          </a>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#4D2D22] text-[#4D2D22] font-sans text-sm font-bold uppercase tracking-wider rounded hover:bg-[#4D2D22] hover:text-white transition-colors"
          >
            CONTACT US
          </a>
        </div>

      </div>
    </section>
  );
};
