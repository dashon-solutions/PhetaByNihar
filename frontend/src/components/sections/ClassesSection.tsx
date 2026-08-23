import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calendar, Clock } from 'lucide-react';
import { Divider } from '../ui/Divider';
import { apiFetch, getApiImageUrl } from '../../utils/api';

import { fallbackAboutUs } from '../../data/fallbackData';

interface ClassBatch {
  batchName: string;
  startDate: string;
  duration: string;
  status: string;
  image: string;
}

interface ClassesSectionProps {
  initialAboutData?: any;
  showUpcomingBatches?: boolean;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({
  initialAboutData,
  showUpcomingBatches = true
}) => {
  const [about, setAbout] = useState<any>(initialAboutData || fallbackAboutUs);
  const [loading, setLoading] = useState<boolean>(false);

  // Swiper Slider state for batches (2 on Desktop, 1 on Mobile)
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [batchesPerView, setBatchesPerView] = useState(1);

  // Class Inquiry Form Link
  const CLASS_INQUIRY_FORM_URL = 'https://form.svhrt.com/6654d6c50c0b3c7867522e16';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBatchesPerView(2);
      } else {
        setBatchesPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!initialAboutData) {
      const fetchData = async () => {
        try {
          const aboutData = await apiFetch('/about').catch(() => null);
          if (aboutData) setAbout(aboutData);
        } catch (err) {
          console.warn('Could not fetch classes data:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setAbout(initialAboutData);
      setLoading(false);
    }
  }, [initialAboutData]);

  const totalBatches = about?.classBatches?.length || 0;
  const maxBatchIndex = Math.max(0, totalBatches - batchesPerView);

  const nextBatchSlide = () => {
    setCurrentBatchIndex((prev) => (prev >= maxBatchIndex ? 0 : prev + 1));
  };

  const prevBatchSlide = () => {
    setCurrentBatchIndex((prev) => (prev <= 0 ? maxBatchIndex : prev - 1));
  };

  return (
    <>
      {showUpcomingBatches && !loading && about?.classBatches && about.classBatches.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-t border-[#E8D8C5]/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-[#6E1E18] font-bold tracking-[0.2em] uppercase text-xs block mb-1.5">Admissions Open</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0D0D] mb-1">Upcoming Batches</h2>
              <Divider className="max-w-[340px] my-1" />
            </div>

            {/* Swiper Slider Container */}
            <div className="relative max-w-7xl mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentBatchIndex * (100 / batchesPerView)}%)` }}
                >
                  {about.classBatches.map((batch: ClassBatch, idx: number) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / batchesPerView}%` }}
                    >
                      <div className="flex flex-col sm:flex-row bg-[#F8F4EE] rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:shadow-lg transition-all duration-300 group h-full">
                        <div className="sm:w-2/5 h-48 sm:h-auto min-h-[210px] relative overflow-hidden shrink-0 bg-[#EBE4D8]">
                          <img
                            src={getApiImageUrl(batch.image || '/placeholder-class.jpg')}
                            alt={batch.batchName}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-[#4A0D0D] text-[#F3D18A] text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md border border-[#F3D18A]/30">
                            {batch.status || "Upcoming"}
                          </div>
                        </div>
                        <div className="sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A0D0D] mb-3 leading-snug">{batch.batchName}</h3>
                            <div className="flex flex-col gap-2.5 mb-5">
                              <div className="flex items-center gap-2.5 text-[#2E1A14]/75 text-xs">
                                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                                  <Calendar className="w-3.5 h-3.5 text-[#6E1E18]" />
                                </div>
                                <span>Starts: <strong className="text-[#4A0D0D]">{batch.startDate}</strong></span>
                              </div>
                              <div className="flex items-center gap-2.5 text-[#2E1A14]/75 text-xs">
                                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                                  <Clock className="w-3.5 h-3.5 text-[#6E1E18]" />
                                </div>
                                <span>Duration: <strong className="text-[#4A0D0D]">{batch.duration}</strong></span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <a
                              href={CLASS_INQUIRY_FORM_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-semibold uppercase tracking-wider text-xs shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                            >
                              <span>Enquire / Book Seat</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slider Navigation Controls */}
              {maxBatchIndex > 0 && (
                <div className="flex items-center justify-between mt-6 px-2">
                  <button
                    onClick={prevBatchSlide}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#6E1E18] hover:bg-[#6E1E18] hover:text-[#F3D18A] transition-all duration-300 shadow-sm bg-white cursor-pointer"
                    aria-label="Previous Batches"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: maxBatchIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentBatchIndex(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          currentBatchIndex === idx
                            ? 'w-7 sm:w-9 h-2 bg-[#6E1E18] shadow-xs'
                            : 'w-2 h-2 bg-[#D4AF37]/40 hover:bg-[#D4AF37]/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextBatchSlide}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#6E1E18] hover:bg-[#6E1E18] hover:text-[#F3D18A] transition-all duration-300 shadow-sm bg-white cursor-pointer"
                    aria-label="Next Batches"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
