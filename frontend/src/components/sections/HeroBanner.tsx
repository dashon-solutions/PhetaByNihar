import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { apiFetch, getApiImageUrl } from '../../utils/api';

interface BannerData {
  tag: string;
  titleItalic: string;
  titleBold: string;
  titleRegular: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export const HeroBanner: React.FC = () => {
  const [banner, setBanner] = useState<BannerData>({
    tag: 'Preserving Heritage',
    titleItalic: 'The Art of',
    titleBold: 'Maharashtrian',
    titleRegular: 'Pheta Ceremony',
    description: 'Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Book Now',
    secondaryButtonText: 'Explore Work'
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await apiFetch('/banner');
        if (data) {
          setBanner(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic banner, using fallback:', err);
      }
    };
    fetchBanner();
  }, []);

  return (
    <>
      <section className="relative w-full h-[50vh] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src={getApiImageUrl(banner.backgroundImage)}
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
                  {banner.tag}
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif leading-[1.05]">
                <span className="block italic font-light text-2xl md:text-4xl lg:text-5xl text-[#D7A65B]">
                  {banner.titleItalic}
                </span>

                <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-1 md:mt-2">
                  {banner.titleBold}
                </span>

                <span className="block text-2xl md:text-4xl lg:text-5xl font-semibold text-white mt-2 md:mt-3">
                  {banner.titleRegular}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 md:mt-8 text-white/90 text-sm md:text-lg max-w-xl">
                {banner.description}
              </p>

              {/* Buttons */}
              <div className="my-4 md:my-3 flex flex-row sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-5">
                <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center group shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-[10px] md:text-sm px-6 py-3 md:px-8 md:py-4 border-none rounded-full bg-[#4D2D22] text-[#D7A65B] hover:bg-[#3A2219]">
                  {banner.primaryButtonText} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center shadow-lg border-2 border-[#4D2D22] bg-transparent text-[#4D2D22] hover:bg-[#4D2D22] hover:text-[#D7A65B] text-[10px] md:text-sm px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group hover:-translate-y-1">
                  {banner.secondaryButtonText} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
