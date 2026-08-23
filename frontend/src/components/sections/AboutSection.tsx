import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { apiFetch, getApiImageUrl } from '../../utils/api';

import { fallbackAboutUs } from '../../data/fallbackData';

interface AboutData {
  heading: string;
  italicHeading: string;
  text: string;
  portraitImage: string;
  backgroundImage: string;
}

export const AboutSection: React.FC = () => {
  const [about, setAbout] = useState<AboutData>({
    heading: fallbackAboutUs.heading,
    italicHeading: fallbackAboutUs.italicHeading,
    text: fallbackAboutUs.text,
    portraitImage: fallbackAboutUs.portraitImage,
    backgroundImage: fallbackAboutUs.backgroundImage
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await apiFetch('/about');
        if (data && (data.heading || data.text)) {
          setAbout(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic about data, using fallback:', err);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto relative">

      {/* Decorative Mandala on the right edge */}


      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-stretch relative z-10">

        {/* Left Side: Portrait Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[35%] relative shrink-0"
        >
          <div className="relative rounded-[24px] overflow-hidden shadow-soft h-full min-h-[350px] md:min-h-[450px]">
            <img
              src={getApiImageUrl(about.portraitImage)}
              alt="Nihar Tambde Portrait"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Middle: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[48%] flex flex-col items-start justify-start py-4 shrink-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal mb-2">
            {about.heading} <br /> <span className="italic font-light text-[#C48B3C]">{about.italicHeading}</span>
          </h2>
          <Divider className="ml-0 max-w-[400px] mb-4" />
          {/* Decorative Divider */}
          <p className="text-[#4D2D22] font-sans text-sm md:text-base leading-relaxed mb-6 font-medium">
            {about.text}
          </p>

          <div>
            <Link to="/about">
              <Button variant="primary" showArrow className="px-7 py-3 text-xs sm:text-sm">
                Know More
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


