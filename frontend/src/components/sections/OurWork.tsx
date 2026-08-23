import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../ui/Divider';
import { apiFetch, getApiImageUrl } from '../../utils/api';
import {
  Sparkles, ArrowRight, Maximize2, X, Eye
} from 'lucide-react';

import { fallbackOurWork } from '../../data/fallbackData';

interface WorkItem {
  _id?: string;
  title: string;
  description: string;
  images: string[];
  category?: string;
}

export const OurWork: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<WorkItem[]>(fallbackOurWork);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch('/our-work');
        if (data && data.length > 0) {
          // Validate that items have images
          const validWorks = data.map((item: any) => ({
            ...item,
            images: item.images && item.images.length > 0 ? item.images : fallbackOurWork[0].images
          }));
          setCategories(validWorks);
        }
      } catch (err) {
        console.warn('Using curated fallback portfolio:', err);
        setCategories(fallbackOurWork);
      }
    };
    fetchCategories();
  }, []);

  // Interleave images from all categories for the "All" tab
  const allImages = React.useMemo(() => {
    const imageLists = categories.map((w) => w.images || []).filter((imgs) => imgs.length > 0);
    const maxLength = Math.max(0, ...imageLists.map((l) => l.length));
    const combined: string[] = [];
    for (let i = 0; i < maxLength; i++) {
      for (const list of imageLists) {
        if (list[i] && !combined.includes(list[i])) {
          combined.push(list[i]);
        }
      }
    }
    return combined;
  }, [categories]);

  const allCategoryItem: WorkItem = React.useMemo(
    () => ({
      _id: 'all',
      title: 'All',
      description:
        'A curated showcase of royal phetas across all occasions, celebrity styling, groom ceremonies, and cultural heritage events.',
      images: allImages.length > 0 ? allImages : fallbackOurWork[0].images
    }),
    [allImages]
  );

  const displayCategories = React.useMemo(() => {
    return [allCategoryItem, ...categories.filter((c) => c._id !== 'all')];
  }, [allCategoryItem, categories]);

  const currentCategory = displayCategories[activeCategoryIndex] || displayCategories[0] || allCategoryItem;
  const images = currentCategory.images && currentCategory.images.length > 0
    ? currentCategory.images
    : fallbackOurWork[0].images;

  // Main featured image and grid images
  const mainImage = images[0] || '/pheta_by_nihar_tambde_1645633815_2780100398651064414_2400202343.webp';
  const secondaryImage1 = images[1] || images[0];
  const secondaryImage2 = images[2] || images[0];
  const secondaryImage3 = images[3] || images[1] || images[0];

  const openLightbox = (imgUrl: string) => {
    setLightboxImage(imgUrl);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="work" className="py-10 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto bg-[#FFFDFB] relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-6 md:mb-10 relative flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D7A65B]/15 border border-[#D7A65B]/30 text-[#8A5B1D] text-xs font-sans tracking-[0.2em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C48B3C]" />
          <span>Royal Styling Showcase</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#4D2D22] tracking-wide font-normal">
          Our <span className="italic font-light text-[#C48B3C]">Work</span>
        </h2>
        <Divider />
        <p className="text-xs md:text-sm text-[#666666] max-w-xl mx-auto mt-2 font-sans">
          Explore our signature groom stylings, celebrity appearances, and heritage wedding celebrations.
        </p>
      </motion.div>

      {/* Interactive Category Filter Pills (Mobile Responsive & Scroll Safe) */}
      <div className="w-full max-w-full overflow-x-auto pb-3 mb-6 md:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center sm:justify-center justify-start gap-2 md:gap-3 w-max sm:w-auto mx-auto px-1">
          {displayCategories.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat._id || idx}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xs shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-[#FFFDFB] shadow-md scale-105 border border-[#D7A65B]/50 ring-2 ring-[#D7A65B]/20'
                    : 'bg-white border border-[#E8D8C5] text-[#4D2D22] hover:border-[#D7A65B] hover:bg-[#FAF6F0]'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Gallery Mosaic Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory._id || activeCategoryIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-[280px_160px_160px] md:grid-rows-2 gap-3 sm:gap-4 h-auto md:h-[520px]"
        >
          {/* Large Main Featured Image (Left half) */}
          <div
            onClick={() => openLightbox(mainImage)}
            className="col-span-2 row-span-1 md:row-span-2 relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-sm group cursor-pointer border border-[#E8D8C5]/70 bg-[#2A0D0F]"
          >
            <img
              src={getApiImageUrl(mainImage)}
              alt={currentCategory.title}
              className="w-full h-full object-cover object-top md:object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay & Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-7 text-white transition-opacity">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#F3D18A] mb-1">
                Featured Portfolio
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight text-white mb-1">
                {currentCategory.title}
              </h3>
              <p className="text-white/80 text-[11px] sm:text-xs line-clamp-2 max-w-md font-light hidden sm:block">
                {currentCategory.description}
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F3D18A] mt-2 group-hover:translate-x-1 transition-transform">
                <Eye className="w-3.5 h-3.5" />
                <span>Tap to Expand High-Res Photo</span>
              </div>
            </div>
          </div>

          {/* Top Right Tile 1 */}
          <div
            onClick={() => openLightbox(secondaryImage1)}
            className="col-span-1 row-span-1 relative rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-xs group cursor-pointer border border-[#E8D8C5]/70 bg-[#FAF6F0]"
          >
            <img
              src={getApiImageUrl(secondaryImage1)}
              alt="Gallery thumbnail 1"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-[#F3D18A]" />
              </div>
            </div>
          </div>

          {/* Top Right Tile 2 */}
          <div
            onClick={() => openLightbox(secondaryImage2)}
            className="col-span-1 row-span-1 relative rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-xs group cursor-pointer border border-[#E8D8C5]/70 bg-[#FAF6F0]"
          >
            <img
              src={getApiImageUrl(secondaryImage2)}
              alt="Gallery thumbnail 2"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 object-top"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-[#F3D18A]" />
              </div>
            </div>
          </div>

          {/* Bottom Right Tile 3 */}
          <div
            onClick={() => openLightbox(secondaryImage3)}
            className="col-span-1 row-span-1 relative rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-xs group cursor-pointer border border-[#E8D8C5]/70 bg-[#FAF6F0]"
          >
            <img
              src={getApiImageUrl(secondaryImage3)}
              alt="Gallery thumbnail 3"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-[#F3D18A]" />
              </div>
            </div>
          </div>

          {/* Bottom Right: Interactive "View Full Gallery" CTA Card */}
          <div
            onClick={() => navigate('/our-work')}
            className="col-span-1 row-span-1 bg-gradient-to-br from-[#4A0D0D] via-[#6E1E18] to-[#3D0A0A] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center text-white cursor-pointer hover:shadow-xl transition-all duration-300 p-4 text-center border-2 border-[#D7A65B]/40 group hover:scale-[1.02]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:bg-[#D7A65B] group-hover:text-[#4A0D0D] transition-colors">
              <Sparkles className="w-5 h-5 text-[#F3D18A] group-hover:text-[#4A0D0D]" />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
              View Full Gallery
            </span>
            <span className="text-[10px] text-[#F3D18A] font-sans mt-0.5 hidden sm:block">
              50+ Royal Creations
            </span>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F3D18A] mt-2 group-hover:translate-x-1 transition-transform">
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox / Zoom Modal */}
      {lightboxOpen && lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer z-20"
            title="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl">
            <img
              src={getApiImageUrl(lightboxImage)}
              alt="Enlarged Portfolio View"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
