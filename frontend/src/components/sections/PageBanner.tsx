import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, getApiImageUrl } from '../../utils/api';

import { fallbackBanners } from '../../data/fallbackData';

interface BannerData {
  tag: string;
  titleItalic: string;
  titleBold: string;
  titleRegular: string;
  description: string;
  backgroundImage: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

interface PageBannerProps {
  pageName: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ pageName }) => {
  const defaultBanner = fallbackBanners[pageName] || fallbackBanners.home;
  const [banner, setBanner] = useState<BannerData>(defaultBanner);

  useEffect(() => {
    const defaultData = fallbackBanners[pageName] || fallbackBanners.home;
    setBanner(defaultData);

    const fetchBanner = async () => {
      try {
        const data = await apiFetch(`/banner?pageName=${pageName}`);
        if (data && data.titleBold) {
          setBanner(data);
        }
      } catch (err) {
        console.warn(`Could not load dynamic banner for ${pageName}, using fallback:`, err);
        setBanner(defaultData);
      }
    };
    fetchBanner();
  }, [pageName]);

  return (
    <>
      <section className="relative w-full h-[40vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src={getApiImageUrl(banner.backgroundImage)}
          alt={`${pageName} Banner`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4D2D22]/90 via-black/50 to-black/30"></div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center">
          <div className="max-w-[1000px] mx-auto w-full px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Tag */}
              {banner.tag && (
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center gap-2 bg-[#D7A65B]/20 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[#D7A65B] uppercase tracking-[0.2em] text-[10px] md:text-sm font-bold border border-[#D7A65B]/30">
                    {banner.tag}
                  </span>
                </div>
              )}

              {/* Heading */}
              <h1 className="font-serif leading-[1.1] mb-6">
                <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {banner.titleBold} <span className="italic font-light text-[#D7A65B]">{banner.titleItalic}</span>
                </span>
                <span className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/90">
                  {banner.titleRegular}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-white/80 text-sm md:text-lg max-w-2xl mx-auto mb-8">
                {banner.description}
              </p>
              
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
