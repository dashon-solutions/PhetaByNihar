import React from 'react';
import { motion } from 'framer-motion';

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583089892943-e02e52f17004?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10 lg:px-20 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#D7A65B] font-sans text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4 block">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] mb-6">
              Royal Maharashtrian <br/>
              <span className="text-[#D7A65B]">Pheta Services</span><br/>
              For Every Celebration
            </h1>
            <p className="text-[#E8D8C5] font-sans text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              From intimate family ceremonies to grand weddings and prestigious corporate events, Pheta By Nihar brings elegance, tradition, and authenticity to every occasion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D7A65B] text-[#4D2D22] font-sans text-sm font-bold uppercase tracking-wider rounded hover:bg-[#C48B3C] transition-colors"
              >
                BOOK YOUR EVENT
              </a>
              <a 
                href="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#D7A65B] text-[#D7A65B] font-sans text-sm font-bold uppercase tracking-wider rounded hover:bg-[#D7A65B] hover:text-[#4D2D22] transition-colors"
              >
                VIEW COLLECTION
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
