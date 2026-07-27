import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Sparkles, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Divider } from '../ui/Divider';

export const MediaAndTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const reviews = [
    {
      quote: "Nihar's Pheta tying added a royal touch to our wedding. Every single guest was mesmerized by the precision of folds!",
      name: "Radhika & Swapnil",
      location: "Pune, India",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Radhika&background=4D1217&color=D4AF37"
    },
    {
      quote: "Professional, punctual, and profoundly passionate. They brought authentic Maratha regal elegance to our heritage event.",
      name: "Rohit Deshmukh",
      location: "Mumbai, India",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Rohit&background=800020&color=D4AF37"
    },
    {
      quote: "The masterclass workshop was divine! We didn't just learn turban wrapping; we experienced the soul of royal Maharashtrian culture.",
      name: "Anagha Kulkarni",
      location: "California, USA",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Anagha&background=D4AF37&color=2A0D0F"
    }
  ];

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div>
      <section className="w-full my-2 mx-auto max-w-[1200px]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center mb-8 md:mb-12 relative"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {[1, 2, 3, 4].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              className="group relative flex items-center justify-center h-24 md:h-28 rounded-[20px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden px-8 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
            >
              <img
                src={`/news1 (${num}).png`}
                alt={`Press Feature ${num}`}
                className="relative z-10 max-h-12 w-auto object-contain "
              />
            </motion.div>
          ))}
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
            <div className="relative max-w-7xl mx-auto">
              <div className="overflow-hidden rounded-[24px]">
                <motion.div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                  {reviews.map((review, index) => (
                    <div key={index} className="flex-shrink-0 px-2 md:px-4" style={{ width: `${100 / itemsPerView}%` }}>
                      <div className="group h-full relative bg-[#2A0D0F]/70 backdrop-blur-md p-8 md:p-10 rounded-[24px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        
                        {/* Subtle Decorative Background Quote Icon */}
                        <Quote className="absolute top-6 right-6 w-16 h-16 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none" />

                        <div>
                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 mb-6">
                            {[...Array(review.rating)].map((_, i) => (
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
                              src={review.image}
                              alt={review.name}
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
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-3">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentIndex === idx 
                          ? 'w-10 h-2.5 bg-[#E5C158] shadow-[0_0_10px_rgba(229,193,88,0.5)]' 
                          : 'w-2.5 h-2.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37] hover:text-[#1A0507] transition-all duration-300 shadow-md backdrop-blur-sm bg-[#2A0D0F]/50"
                >
                  <ChevronRight className="w-6 h-6" />
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