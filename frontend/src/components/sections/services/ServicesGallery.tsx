import React from 'react';
import { motion } from 'framer-motion';

export const ServicesGallery: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1583089892943-e02e52f17004?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953eb1b5b6?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <section className="py-20 bg-[#F8F3EC]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="text-center mb-12">
          <span className="text-[#D7A65B] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            GLIMPSE OF OUR WORK
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#4D2D22]">Moments That Speak Royalty</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-sm group"
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/gallery" 
            className="inline-flex items-center justify-center px-8 py-3 bg-[#4D2D22] text-white font-sans text-sm font-bold uppercase tracking-wider rounded hover:bg-[#6E1E18] transition-colors shadow-md"
          >
            VIEW FULL GALLERY
          </a>
        </div>
      </div>
    </section>
  );
};
