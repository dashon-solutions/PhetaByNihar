import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Sparkles, Award } from 'lucide-react';
import { Divider } from '../ui/Divider';

export const MediaAndTestimonials: React.FC = () => {
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

  return (
    <div>
      <section className="w-full my-2 mx-auto max-w-[1200px]">


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center mb-16 relative"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C158] text-xs font-sans tracking-[0.25em] uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Press & Publications</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#000000] tracking-wide font-normal">
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
              {/* Gold Highlight Line on Hover */}
              {/* <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

              <img
                src={`/news1 (${num}).png`}
                alt={`Press Feature ${num}`}
                className="relative z-10 max-h-12 w-auto object-contain "
              />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#6E1E18]">
        {/* Royal Background Effects & Subtle Motifs */}
        <div className="absolute inset-0 opacity-10 bg-[url('/aboutsideiamge.png')] bg-cover bg-center mix-blend-luminosity pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#800020]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

          {/* ================= MEDIA RECOGNITION SECTION ================= */}


          {/* ================= TESTIMONIALS SECTION ================= */}
          <section className="w-full">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16 relative"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C158] text-xs font-sans tracking-[0.25em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Patronage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#F8F3EC] tracking-wide">
                Royal Words <span className="italic font-light text-[#E5C158]">of Appreciation</span>
              </h2>

              <Divider />          </motion.div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#2A0D0F]/70 backdrop-blur-md p-8 md:p-10 rounded-[28px] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform hover:-translate-y-2"
                >
                  {/* Subtle Decorative Background Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-16 h-16 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none" />

                  <div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E5C158] text-[#E5C158]" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="font-serif text-[#F8F3EC]/90 text-base md:text-lg italic font-light leading-relaxed mb-8 relative z-10">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-6 border-t border-[#D4AF37]/15 flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-13 h-13 rounded-full object-cover border-2 border-[#D4AF37]/40 p-0.5 shadow-md"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-[#F8F3EC] font-semibold text-base group-hover:text-[#E5C158] transition-colors">
                        {review.name}
                      </h4>
                      <p className="font-sans text-[#D4AF37]/70 text-xs tracking-wider uppercase mt-0.5">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Artistic Custom Pagination / Indicator */}
            <div className="flex justify-center items-center gap-3 mt-16">
              <span className="w-12 h-[2px] bg-[#E5C158]"></span>
              <span className="w-3 h-[2px] bg-[#D4AF37]/30"></span>
              <span className="w-3 h-[2px] bg-[#D4AF37]/30"></span>
            </div>
          </section>

        </div>
      </section></div>
  );
};