import React, { useEffect, useState, useMemo } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/common/SEO';
import { Divider } from '../components/ui/Divider';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface OurWorkItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

import { fallbackOurWork } from '../data/fallbackData';

export const OurWorkPage: React.FC = () => {
  const [works, setWorks] = useState<OurWorkItem[]>(fallbackOurWork as any);
  const [loading, setLoading] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [activeTabId, setActiveTabId] = useState<string>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchWorks = async () => {
      try {
        const data = await apiFetch('/our-work');
        if (data && data.length > 0) {
          setWorks(data);
        }
      } catch (error) {
        console.error('Failed to fetch our work, using fallback:', error);
        setWorks(fallbackOurWork as any);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  // Interleave images from all categories for a rich variety in "All" tab
  const allImages = useMemo(() => {
    const imageLists = works.map((w) => w.images || []).filter((imgs) => imgs.length > 0);
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
  }, [works]);

  const allWorkCategory: OurWorkItem = useMemo(
    () => ({
      _id: 'all',
      title: 'All',
      description:
        'A comprehensive showcase of royal Maharashtrian phetas across weddings, groom ceremonies, cultural festivals, and celebrity events.',
      images: allImages
    }),
    [allImages]
  );

  const displayTabs = useMemo(() => {
    return [allWorkCategory, ...works.filter((w) => w._id !== 'all')];
  }, [allWorkCategory, works]);

  const activeWork = useMemo(() => {
    return displayTabs.find((w) => w._id === activeTabId) || displayTabs[0] || allWorkCategory;
  }, [displayTabs, activeTabId, allWorkCategory]);

  const openLightbox = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const total = activeWork?.images?.length || 0;
    if (total > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % total);
    }
  };

  const prevImage = () => {
    const total = activeWork?.images?.length || 0;
    if (total > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + total) % total);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeWork]);

  return (
    <>
      <SEO
        title="Royal Wedding & Celebrity Pheta Portfolio in Mumbai & Pune | Pheta By Nihar"
        description="Explore real wedding photos, celebrity groom pheta stylings, royal Dhol Tasha satkars, and grand Maharashtrian wedding guest draping portfolio by Pheta By Nihar."
        keywords="Pheta Tying Photos, Marathi Groom Pheta Photos, Wedding Pheta Portfolio Mumbai, Marathi Pheta Girgaon, Pheta Service South Mumbai, Pheta Tying Service Thane, Pheta Tying Service Navi Mumbai, Pheta Artist Pune, Pheta Service Pune, Pheta Tying Service Pimpri Chinchwad, Celebrity Pheta Artist Mumbai"
        canonicalUrl="https://phetabynihar.com/our-work"
        ogImage="/hero_groom.png"
      />
      <Navbar theme="light" />
      <main className="bg-[#F8F3EC] min-h-screen">
        {/* Elegant Header Section */}
        <section className="pt-28 md:pt-36 pb-6 text-center max-w-3xl mx-auto px-4">
          <span className="text-[#D7A65B] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
            PORTFOLIO OF PRIDE
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#4D2D22] mb-1 leading-tight">
            Our Royal Work & Events
          </h1>
          <Divider className="max-w-[450px] my-1" />
          <p className="mt-4 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
            Explore our signature groom stylings, celebrity appearances, and heritage wedding celebrations across Maharashtra.
          </p>
        </section>

        <section className="py-8 md:py-16 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D7A65B]"></div>
            </div>
          ) : displayTabs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-[#E8D8C5]">
              <ImageIcon className="w-16 h-16 text-[#D7A65B] opacity-50 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#4D2D22] mb-2">Portfolio Coming Soon</h3>
              <p className="text-[#666666] font-sans">We are currently curating our best works to showcase here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 md:gap-10">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-[#E8D8C5] pb-6">
                {displayTabs.map((tab) => (
                  <button
                    key={tab._id}
                    onClick={() => setActiveTabId(tab._id)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs ${
                      activeTabId === tab._id
                        ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-[#FFFDFB] shadow-md scale-105 border border-[#D7A65B]/50 ring-2 ring-[#D7A65B]/20'
                        : 'bg-white border border-[#E8D8C5] text-[#4D2D22] hover:border-[#D7A65B] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Gallery Display */}
              <AnimatePresence mode="wait">
                {activeWork && (
                  <motion.div
                    key={activeWork._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col"
                  >
                    {/* Description */}
                    <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
                      <p className="text-[#666666] font-sans text-sm md:text-base leading-relaxed">
                        {activeWork.description}
                      </p>
                    </div>

                    {/* Image Masonry Grid */}
                    {activeWork.images && activeWork.images.length > 0 ? (
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                        {activeWork.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => openLightbox(imgIndex)}
                            className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group/item shadow-soft hover:shadow-lg transition-all duration-500 break-inside-avoid bg-[#2A0D0F]"
                          >
                            <img
                              src={getApiImageUrl(img)}
                              alt={`${activeWork.title} - Image ${imgIndex + 1}`}
                              loading="lazy"
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover/item:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#6E1E18]/0 group-hover/item:bg-[#6E1E18]/40 transition-colors duration-500 flex items-center justify-center">
                              <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform scale-50 group-hover/item:scale-100" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-[#999999] font-sans italic">No images in this collection yet.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && activeWork && activeWork.images && activeWork.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {activeWork.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 md:left-10 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 md:right-10 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
              <motion.img
                key={`lightbox-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={getApiImageUrl(activeWork.images[currentImageIndex])}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white/90 font-serif text-lg md:text-xl">{activeWork.title}</p>
                <p className="text-white/50 font-sans text-xs md:text-sm mt-1">
                  Image {currentImageIndex + 1} of {activeWork.images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
