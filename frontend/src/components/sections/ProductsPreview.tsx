import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Crown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../ui/Divider';
import { InquiryModal } from '../ui/InquiryModal';
import { apiFetch, getApiImageUrl } from '../../utils/api';

import { fallbackProducts } from '../../data/fallbackData';

interface ProductData {
  _id?: string;
  id: string;
  name: string;
  marathiName?: string;
  subtitle: string;
  price?: number;
  image: string;
  description: string;
}

export const ProductsPreview: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Ready-made Pheta');
  const [products, setProducts] = useState<ProductData[]>(fallbackProducts);

  const handleOpenRentalInquiry = (productName: string) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiFetch('/products');
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic products, using fallback:', err);
        setProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="products" className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto bg-[#6E1E18] relative overflow-hidden">

      {/* Background Royal Atmosphere */}
      <div className="absolute inset-0 bg-[#6E1E18] overflow-hidden border border-[#6E1E18]/30 shadow-2xl">
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
          className="w-full text-center mb-8 md:mb-12 relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C158] text-xs font-sans tracking-[0.25em] uppercase mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>The Heritage Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F8F3EC] tracking-wide font-normal">
            Exclusive <span className="italic font-light text-[#E5C158]">Collection</span>
          </h2>
          <Divider />
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-[24px]">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product, index) => (
                <div key={product._id || product.id || index} className="flex-shrink-0 px-1.5 sm:px-2 md:px-4" style={{ width: `${100 / itemsPerView}%` }}>
                  <div className="group h-full relative flex flex-col bg-[#2A0D0F]/80 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-[24px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

                    {/* Number Badge */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
                      <span className="font-serif text-[9px] md:text-xs text-[#E5C158]/80 border border-[#E5C158]/30 bg-[#2A0D0F]/90 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full tracking-widest">
                        {product.id}
                      </span>
                    </div>

                    {/* Product Frame & Showcase Image */}
                    <div className="relative w-full h-28 sm:h-36 md:h-72 lg:h-80 overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-8 bg-radial from-[#4D1217] to-[#1A0507]">
                      <img
                        src={getApiImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D0F] via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* Product Info */}
                    <div className="w-full p-2.5 sm:p-3 md:p-6 lg:p-8 flex flex-col flex-grow justify-between relative z-10 bg-[#2A0D0F]/90">
                      <div className="mb-1.5 md:mb-4">
                        <span className="text-[7.5px] sm:text-[9px] md:text-xs font-sans text-[#E5C158] uppercase tracking-wider block mb-0.5 md:mb-1 truncate">
                          {product.subtitle}
                        </span>
                        <h3 className="font-serif text-xs sm:text-sm md:text-xl lg:text-2xl text-[#F8F3EC] font-bold mb-1 md:mb-2 group-hover:text-[#E5C158] transition-colors leading-tight line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] md:min-h-[3rem]">
                          <span>{product.name}</span>
                        </h3>
                        {product.marathiName && (
                          <span className="block font-marathi text-[9.5px] sm:text-xs md:text-base text-[#E5C158] font-normal truncate mb-1">
                            ({product.marathiName.replace(/[()]/g, '')})
                          </span>
                        )}
                        {product.price !== undefined && product.price !== null && Number(product.price) > 0 && (
                          <div className="mb-1 md:mb-2">
                            <span className="font-serif text-xs sm:text-sm md:text-lg font-bold text-[#E5C158]">
                              ₹{Number(product.price).toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        <p className="text-[#C2B2A3] text-[8px] sm:text-[9.5px] md:text-xs lg:text-sm leading-tight md:leading-relaxed font-light line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-2 md:pt-4 border-t border-[#D4AF37]/15 flex items-center gap-1 sm:gap-2">
                        <button 
                          onClick={() => handleOpenRentalInquiry(product.name)}
                          className="flex-1 h-6 sm:h-7 md:h-9.5 px-1.5 sm:px-2 md:px-3 rounded sm:rounded-md md:rounded-lg border border-[#D4AF37]/40 bg-[#3B1417] text-[#E5C158] font-sans text-[8px] sm:text-[9.5px] md:text-xs tracking-wide uppercase font-semibold flex items-center justify-center gap-0.5 sm:gap-1 group-hover:bg-[#E5C158] group-hover:text-[#2A0D0F] group-hover:border-[#E5C158] transition-all duration-300 cursor-pointer shadow-xs whitespace-nowrap">
                          <span>Buy Now</span>
                          <ArrowUpRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                        </button>
                        <button
                          onClick={() => navigate(`/products/${product._id || product.id}`)}
                          className="h-6 sm:h-7 md:h-9.5 px-1.5 sm:px-2 md:px-3 rounded sm:rounded-md md:rounded-lg border border-[#D4AF37]/30 bg-white/5 hover:bg-white/15 text-[#F8F3EC] hover:text-[#E5C158] font-sans text-[8px] sm:text-[9.5px] md:text-xs tracking-wide uppercase font-semibold flex items-center justify-center gap-0.5 sm:gap-1 transition-all duration-300 cursor-pointer shadow-xs whitespace-nowrap"
                          title="View Details">
                          <span>Details</span>
                          <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 shrink-0" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-between mt-8 px-4">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2 md:gap-3">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${currentIndex === idx
                      ? 'w-6 h-2 md:w-10 md:h-2.5 bg-[#E5C158] shadow-[0_0_10px_rgba(229,193,88,0.5)]'
                      : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Global CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
          <span className="text-[10px] md:text-xs font-sans text-[#E5C158] uppercase tracking-[0.2em] block mb-2 md:mb-3">
            Full Catalogue
          </span>
          <h3 className="font-serif text-xl md:text-3xl text-[#F8F3EC] font-bold leading-tight mb-3 md:mb-4">
            Explore The Complete Collection
          </h3>
          <p className="text-xs md:text-sm text-[#C2B2A3] font-light mb-6 md:mb-8">
            Discover over 50+ authentic Maratha royal props, attire, and decor items available for events.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-[#D4AF37]/40 rounded-full text-[#E5C158] font-sans font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-lg group cursor-pointer">
            View Full Gallery
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="buy"
        subject={selectedProduct}
      />
    </section>
  );
};