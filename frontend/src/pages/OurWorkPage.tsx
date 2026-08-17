import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { HeroBanner } from '../components/sections/HeroBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface OurWorkItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

export const OurWorkPage: React.FC = () => {
  const [works, setWorks] = useState<OurWorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchWorks = async () => {
      try {
        const data = await apiFetch('/our-work');
        setWorks(data || []);
        if (data && data.length > 0) {
          setActiveTabId(data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch our work', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const activeWorkIndex = works.findIndex(w => w._id === activeTabId);
  const activeWork = activeWorkIndex >= 0 ? works[activeWorkIndex] : null;

  const openLightbox = (imageIndex: number) => {
    setCurrentWorkIndex(activeWorkIndex);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (!activeWork) return;
    const currentImages = activeWork.images;
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    if (!activeWork) return;
    const currentImages = activeWork.images;
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
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
  }, [lightboxOpen, activeWorkIndex]);

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F3EC] min-h-screen">
        <HeroBanner pageName="our-work" />

        <section className="py-12 md:py-20 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D7A65B]"></div>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-[#E8D8C5]">
              <ImageIcon className="w-16 h-16 text-[#D7A65B] opacity-50 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#4D2D22] mb-2">Portfolio Coming Soon</h3>
              <p className="text-[#666666] font-sans">We are currently curating our best works to showcase here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10">

              {/* Tabs Section */}
              <div className="flex flex-wrap items-center justify-center gap-3 border-b border-[#E8D8C5] pb-6">
                {works.map((work) => (
                  <button
                    key={work._id}
                    onClick={() => setActiveTabId(work._id)}
                    className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${activeTabId === work._id
                        ? 'bg-[#6E1E18] text-[#FFFDFB] shadow-md scale-105'
                        : 'bg-white border border-[#E8D8C5] text-[#666666] hover:border-[#D7A65B] hover:text-[#4D2D22]'
                      }`}
                  >
                    {work.title}
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
                    <div className="text-center max-w-4xl mx-auto mb-12">
                      <p className="text-[#666666] font-sans text-base md:text-lg leading-relaxed">
                        {activeWork.description}
                      </p>
                    </div>

                    {/* Image Grid */}
                    {activeWork.images && activeWork.images.length > 0 ? (
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {activeWork.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => openLightbox(imgIndex)}
                            className="relative rounded-2xl overflow-hidden cursor-pointer group/item shadow-soft hover:shadow-lg transition-all duration-500 break-inside-avoid"
                          >
                            <img
                              src={getApiImageUrl(img)}
                              alt={`${activeWork.title} - Image ${imgIndex + 1}`}
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover/item:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#6E1E18]/0 group-hover/item:bg-[#6E1E18]/40 transition-colors duration-500 flex items-center justify-center">
                              <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/item:opacity-100 transition-all duration-500 transform scale-50 group-hover/item:scale-100" />
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
        {lightboxOpen && works[currentWorkIndex] && works[currentWorkIndex].images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            {works[currentWorkIndex].images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-10 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-10 z-50 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
              <motion.img
                key={`${currentWorkIndex}-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={getApiImageUrl(works[currentWorkIndex].images[currentImageIndex])}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center">
                <p className="text-white/90 font-serif text-xl">{works[currentWorkIndex].title}</p>
                <p className="text-white/50 font-sans text-sm mt-1">
                  Image {currentImageIndex + 1} of {works[currentWorkIndex].images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
