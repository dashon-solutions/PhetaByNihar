import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Divider } from '../ui/Divider';

export const ProductsPreview: React.FC = () => {
  const products = [
    {
      id: '01',
      name: 'Miniature Pheta',
      subtitle: 'Decorative Heritage Artifact',
      image: '/wagnakh (2).png',
      description: 'Handcrafted mini-phetas designed as royal keepsakes and cultural decor.'
    },
    {
      id: '02',
      name: 'Wagnakha',
      subtitle: 'Legendary Maratha Emblem',
      image: '/wagnakh.png',
      description: 'Detailed metal replicas showcasing the power and courage of Chhatrapati Shivaji Maharaj.'
    },
    {
      id: '03',
      name: 'Rajmudra',
      subtitle: 'The Royal Sovereign Seal',
      image: '/rajmudra.jpg',
      description: 'Precision-etched historic royal seal cast in traditional metallic tones.'
    }
  ];

  return (
    <section id="products" className="py-20 md:py-32 px-4 md:px-12 lg:px-24 max-w-[1440px] mx-auto relative overflow-hidden">

      {/* Background Royal Atmosphere */}
      <div className="absolute inset-0 bg-[#6E1E18] rounded-[32px] md:rounded-[48px] overflow-hidden border border-[#6E1E18]/30 shadow-2xl">
        <div className="absolute inset-0 opacity-15 bg-[url('/pattern.png')] bg-repeat mix-blend-overlay"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#6E1E18]/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#6E1E18]/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Artistic Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="text-center ">

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F8F3EC] tracking-wide font-normal">
              The Heritage <span className="italic font-light text-[#E5C158]">Collection</span>
            </h2>
            <Divider />
          </div>


        </motion.div>

        {/* Artistic Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col bg-[#2A0D0F]/80 backdrop-blur-md rounded-[24px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:-translate-y-2"
            >
              {/* Card Corner Ornament */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-[24px] group-hover:border-[#D4AF37] transition-colors duration-500 pointer-events-none"></div>

              {/* Number Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="font-serif text-xs text-[#E5C158]/80 border border-[#E5C158]/30 bg-[#2A0D0F]/90 px-2.5 py-1 rounded-full tracking-widest">
                  {product.id}
                </span>
              </div>

              {/* Product Frame & Showcase Image */}
              <div className="relative h-64 md:h-72 overflow-hidden flex items-center justify-center p-8 bg-radial from-[#4D1217] to-[#1A0507]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D0F] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow justify-between relative z-10 bg-[#2A0D0F]/90">
                <div>
                  <span className="text-[11px] font-sans text-[#E5C158] uppercase tracking-wider block mb-1">
                    {product.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F8F3EC] font-bold mb-3 group-hover:text-[#E5C158] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#C2B2A3] text-xs leading-relaxed line-clamp-2 font-light">
                    {product.description}
                  </p>
                </div>

                {/* Interactive Action Button */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/15">
                  <button className="w-full py-3 px-4 rounded-xl border border-[#D4AF37]/40 bg-[#3B1417] text-[#E5C158] font-sans text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 group-hover:bg-[#E5C158] group-hover:text-[#2A0D0F] group-hover:border-[#E5C158] transition-all duration-300">
                    <span>Reserve / Rent</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Dedicated Gallery CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="group relative flex flex-col justify-between p-8 bg-gradient-to-br from-[#4D1217] via-[#2A0D0F] to-[#1A0507] rounded-[24px] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform hover:-translate-y-2 min-h-[380px]"
          >
            {/* Glowing Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[50px] group-hover:bg-[#D4AF37]/20 transition-all duration-500"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#D4AF37] transition-all duration-500">
                <ArrowUpRight className="w-6 h-6 text-[#E5C158] group-hover:text-[#1A0507] transition-colors" />
              </div>
              <span className="text-xs font-sans text-[#E5C158] uppercase tracking-[0.2em] block mb-2">
                Full Catalogue
              </span>
              <h3 className="font-serif text-3xl text-[#F8F3EC] font-bold leading-tight">
                Explore The Complete Collection
              </h3>
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t border-[#D4AF37]/20">
              <p className="text-xs text-[#C2B2A3] font-light mb-4">
                Discover over 50+ authentic Maratha royal props, attire, and decor items available for events.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E5C158] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>View Full Gallery</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};