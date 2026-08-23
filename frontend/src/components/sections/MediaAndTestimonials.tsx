import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Sparkles, Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Divider } from '../ui/Divider';
import { apiFetch, getApiImageUrl } from '../../utils/api';

interface TestimonialData {
  _id?: string;
  source?: 'manual' | 'google';
  quote?: string;
  name?: string;
  location?: string;
  rating?: number;
  image?: string;
  googleMapUrl?: string;
}

import { fallbackTestimonials, fallbackMediaLogos } from '../../data/fallbackData';

interface MediaLogoData {
  _id?: string;
  name: string;
  image?: string;
  color?: string;
  link?: string;
}

export const MediaAndTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [reviews, setReviews] = useState<TestimonialData[]>(fallbackTestimonials as any);
  const [mediaLogos, setMediaLogos] = useState<MediaLogoData[]>(fallbackMediaLogos);

  useEffect(() => {
    const fetchTestimonialsAndMedia = async () => {
      try {
        const testimonialsData = await apiFetch('/testimonials');
        if (testimonialsData && testimonialsData.length > 0) {
          setReviews(testimonialsData);
        }
      } catch (err) {
        console.warn('Could not load dynamic testimonials, using fallback:', err);
        setReviews(fallbackTestimonials as any);
      }

      try {
        const logosData = await apiFetch('/media');
        if (logosData && logosData.length > 0) {
          setMediaLogos(logosData);
        }
      } catch (err) {
        console.warn('Could not load dynamic media logos, using fallback:', err);
        setMediaLogos(fallbackMediaLogos);
      }
    };
    fetchTestimonialsAndMedia();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Auto-swipe every 4.5 seconds with pause on hover
  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;

    const autoSwipeTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(autoSwipeTimer);
  }, [isHovered, maxIndex, reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const duplicatedLogos = [...mediaLogos, ...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <div>
      <section className="w-full my-6 mx-auto overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center mb-8 md:mb-12 relative px-4 max-w-[1200px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C158] text-[10px] md:text-xs font-sans tracking-[0.2em] md:tracking-[0.25em] uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Press & Publications</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal">
            As Featured In <span className="italic font-light text-[#C48B3C]">Leading Media</span>
          </h2>
          <Divider />
        </motion.div>

        {/* Seamless Infinite Marquee Track */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Subtle Left & Right Edge Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F3EC] via-[#F8F3EC]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F3EC] via-[#F8F3EC]/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous Loop Track */}
          <div className="animate-marquee flex items-center gap-5 sm:gap-7 md:gap-8">
            {duplicatedLogos.map((logo, index) => {
              const cardContent = (
                <div
                  className="group relative flex items-center justify-center w-48 sm:w-56 md:w-64 h-24 md:h-28 rounded-[20px] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden px-6 sm:px-8 shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.18)] bg-white/90 shrink-0 cursor-pointer"
                >
                  {logo.image ? (
                    <img
                      src={getApiImageUrl(logo.image)}
                      alt={logo.name}
                      className="relative z-10 max-h-11 md:max-h-13 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <span 
                      className="font-serif font-bold text-xl md:text-2xl relative z-10 transition-colors duration-300"
                      style={{ color: logo.color || '#6E1E18' }}
                    >
                      {logo.name}
                    </span>
                  )}
                  {logo.link && (
                    <div className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-[#F8F3EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#6E1E18] group-hover:bg-[#6E1E18] group-hover:text-[#F3D18A] group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );

              return logo.link ? (
                <a
                  key={`${logo._id || logo.name}-${index}`}
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-block focus:outline-none"
                  title={`Visit ${logo.name} article/coverage`}
                >
                  {cardContent}
                </a>
              ) : (
                <React.Fragment key={`${logo._id || logo.name}-${index}`}>
                  {cardContent}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-[#6E1E18]">
        {/* Royal Background Effects & Subtle Motifs */}
        <div className="absolute inset-0 opacity-10 bg-[url('/aboutsideiamge.png')] bg-cover bg-center mix-blend-luminosity pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#800020]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

          {/* ================= TESTIMONIALS SECTION ================= */}
          <section className="w-full">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 md:mb-12 relative"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C158] text-[10px] md:text-xs font-sans tracking-[0.2em] md:tracking-[0.25em] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Patronage</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F8F3EC] tracking-wide">
                Royal Words <span className="italic font-light text-[#E5C158]">of Appreciation</span>
              </h2>

              <Divider />          
            </motion.div>

            {/* Testimonials Slider */}
            <div 
              className="relative max-w-7xl mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="overflow-hidden rounded-[24px]">
                <motion.div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                  {reviews.map((review, index) => (
                    <div key={review._id || index} className="flex-shrink-0 px-2 md:px-4" style={{ width: `${100 / itemsPerView}%` }}>
                      <div className="group h-full relative bg-[#2A0D0F]/70 backdrop-blur-md p-8 md:p-10 rounded-[24px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        
                        {(!review.source || review.source === 'manual') ? (
                          <>
                            {/* Subtle Decorative Background Quote Icon */}
                            <Quote className="absolute top-6 right-6 w-16 h-16 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none" />

                            <div>
                              {/* Rating Stars */}
                              <div className="flex items-center gap-1 mb-6">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 fill-[#E5C158] text-[#E5C158]" />
                                ))}
                              </div>

                              {/* Review Quote */}
                              <p className="font-serif text-[#F8F3EC]/90 text-lg md:text-xl lg:text-2xl italic font-light leading-relaxed mb-8 relative z-10">
                                "{review.quote}"
                              </p>
                            </div>

                            {/* Author Info */}
                            <div className="pt-6 border-t border-[#D4AF37]/15 flex items-center gap-4 mt-auto">
                              <div className="relative">
                                <img
                                  src={getApiImageUrl(review.image || '')}
                                  alt={review.name || 'Client'}
                                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/40 p-0.5 shadow-md"
                                />
                              </div>
                              <div>
                                <h4 className="font-serif text-[#F8F3EC] font-semibold text-lg group-hover:text-[#E5C158] transition-colors">
                                  {review.name}
                                </h4>
                                <p className="font-sans text-[#D4AF37]/70 text-sm tracking-wider uppercase mt-1">
                                  {review.location}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col min-h-[300px]">
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-[#E5C158] text-[#E5C158]" />
                                ))}
                              </div>
                              <span className="text-[10px] font-bold text-[#4285F4] bg-[#4285F4]/10 px-2 py-1 rounded uppercase tracking-wider">Google Review</span>
                            </div>
                            <div 
                              className="w-full h-full flex-grow rounded-xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:min-h-[250px]"
                              dangerouslySetInnerHTML={{ __html: review.googleMapUrl || '' }}
                            />
                          </div>
                        )}

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
                    className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                  </button>

                  {/* Dots */}
                  <div className="flex items-center gap-2 md:gap-3">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          currentIndex === idx 
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
                    className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50"
                  >
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </div>
              )}
            </div>

          </section>

        </div>
      </section>
    </div>
  );
};