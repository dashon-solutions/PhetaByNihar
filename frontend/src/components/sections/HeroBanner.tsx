import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroBanner: React.FC = () => {
  return (
    <>
      <section className="relative w-full h-[50vh] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/footerimg.png"
          alt="Royal Maharashtrian Wedding Pheta"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 mt-16 md:mt-0"
            >
              {/* Tag */}
              <div className="inline-block mb-4 md:mb-6">
                <span className="inline-flex items-center gap-2 bg-[#4D2D22]/90 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[#FFFDFB] uppercase tracking-[0.2em] text-[10px] md:text-sm font-bold">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D7A65B]"></span>
                  Preserving Heritage
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif leading-[1.05]">
                <span className="block italic font-light text-2xl md:text-4xl lg:text-5xl text-[#D7A65B]">
                  The Art of
                </span>

                <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-1 md:mt-2">
                  Maharashtrian
                </span>

                <span className="block text-2xl md:text-4xl lg:text-5xl font-semibold text-white mt-2 md:mt-3">
                  Pheta Ceremony
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 md:mt-8 text-white/90 text-sm md:text-lg max-w-xl">
                Honoring traditions with elegance, respect & pride. From royal
                weddings to cultural celebrations, we bring the timeless art of
                Pheta tying to life.
              </p>

              {/* Buttons */}
              <div className="my-4 md:my-3 flex flex-row sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-5">
                <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center group shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-[10px] md:text-sm px-6 py-3 md:px-8 md:py-4 border-none rounded-full bg-[#4D2D22] text-[#D7A65B] hover:bg-[#3A2219]">
                  {/* <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#D7A65B] group-hover:text-white transition-colors" /> */}
                  Book Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center shadow-lg border-2 border-[#4D2D22] bg-transparent text-[#4D2D22] hover:bg-[#4D2D22] hover:text-[#D7A65B] text-[10px] md:text-sm px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group hover:-translate-y-1">
                  Explore Work <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
    // <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-[#D7A65B] overflow-hidden pt-24 pb-20 lg:pt-24 lg:pb-32">

    //   {/* Decorative subtle glow behind text */}
    //   <div
    //     className="absolute z-10 right-80 -top-4 bottom-0 w-full lg:w-1/2 opacity-30 lg:opacity-60 pointer-events-none bg-no-repeat bg-left-bottom"
    //     style={{
    //       backgroundImage: 'url(/heritage_sketch.png)',
    //       backgroundSize: '50%',
    //       mixBlendMode: 'color-burn'
    //     }}
    //   />
    //   {/* Right Image (Desktop Side-by-Side) / Background Image (Mobile) */}
    //   <motion.div
    //     initial={{ opacity: 0, scale: 1.05 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ duration: 1.5, ease: "easeOut" }}
    //     className="absolute inset-0 lg:right-0 lg:left-auto lg:top-0 lg:bottom-0 lg:w-[50%] z-0 pointer-events-none"
    //   >

    //     <img
    //       src="/bannerimgside.png"
    //       alt="Royal Maharashtrian Wedding Pheta"
    //       className="w-full h-full object-cover object-top lg:object-right"
    //     />
    //     {/* Mobile Dark Overlay for Text Readability */}
    //     {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden"></div> */}

    //     {/* Desktop Fade Mask - adjusted to match the new background color */}
    //     <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
    //       background: 'linear-gradient(to right, #D7A65B 0%, transparent 35%)'
    //     }}></div>
    //   </motion.div>

    //   <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10 flex flex-col lg:flex-row items-center">

    //     {/* Left Content */}
    //     <motion.div
    //       initial={{ opacity: 0, x: -30 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    //       className="flex-1 w-full lg:w-1/2 lg:pr-16 text-center lg:text-left mt-10 lg:mt-10"
    //     >
    //       {/* Tagline */}
    //       <div className="inline-block mb-5 lg:mb-6">
    //         <span className="inline-flex items-center gap-2 text-[#FFFDFB] font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-[#4D2D22] px-6 py-2 rounded-full shadow-lg">
    //           <span className="w-2 h-2 rounded-full bg-[#D7A65B]"></span>
    //           Preserving Heritage
    //         </span>
    //       </div>

    //       <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-serif text-[#4D2D22] leading-[1.1] mb-6">
    //         <span className="italic font-light text-4xl sm:text-5xl lg:text-6xl text-[#FFFDFB]/90">The Art of</span> <br />
    //         <span className="text-[#FFFDFB] drop-shadow-md inline-block mt-2 font-bold tracking-wide">Maharashtrian</span><br />
    //         Pheta Ceremony
    //       </h1>

    //       <p className="text-[#4D2D22] font-sans text-sm sm:text-base lg:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-semibold">
    //         Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.
    //       </p>

    //       <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
    //         <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center group shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm px-8 py-4 border-none rounded-full bg-[#4D2D22] text-[#D7A65B] hover:bg-[#3A2219]">
    //           <Calendar className="w-5 h-5 mr-2 text-[#D7A65B] group-hover:text-white transition-colors" />
    //           Book Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
    //         </Button>
    //         <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center shadow-lg border-2 border-[#4D2D22] bg-transparent text-[#4D2D22] hover:bg-[#4D2D22] hover:text-[#D7A65B] text-sm px-8 py-4 rounded-full transition-all duration-300 group hover:-translate-y-1">
    //           Explore Work <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
    //         </Button>
    //       </div>
    //     </motion.div>

    //   </div>
    // </section>
  );
};

