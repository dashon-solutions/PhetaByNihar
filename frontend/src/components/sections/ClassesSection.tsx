import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Divider } from '../ui/Divider';
import { ClassInquiryModal } from '../ui/ClassInquiryModal';
import { apiFetch, getApiImageUrl } from '../../utils/api';

interface OfferedClass {
  title: string;
  description: string;
  image: string;
}

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

const DEFAULT_CLASSES = [
  {
    title: "Offline Studio Masterclass",
    description: "Immersive, hands-on masterclass at our studio with live models, 1-on-1 guidance, and traditional techniques.",
    image: "/aboutnewiamge.png"
  },
  {
    title: "Online Global Masterclass",
    description: "Live interactive HD video training tailored for global learners, diaspora families, and cultural enthusiasts.",
    image: "/aboutuspng.png"
  },
  {
    title: "Group & Corporate Workshops",
    description: "Tailored cultural workshops for Dhol Tasha Pathaks, colleges, events, and festive satkars.",
    image: "/aboutsideiamge.png"
  },
  {
    title: "Royal Wedding Safa Specialization",
    description: "Advanced certification in bridal & groom pagadis, Kalgi attachment, and Shahi mass draping.",
    image: "/hero_bride_groom.png"
  }
];

export const ClassesSection: React.FC<ClassesSectionProps> = ({
  initialAboutData,
  showUpcomingBatches = true
}) => {
  const [about, setAbout] = useState<any>(initialAboutData || null);
  const [loading, setLoading] = useState<boolean>(!initialAboutData);

  // Class Inquiry Modal state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedClassForInquiry, setSelectedClassForInquiry] = useState<string | undefined>(undefined);
  const [selectedBatchForInquiry, setSelectedBatchForInquiry] = useState<string | undefined>(undefined);

  const handleOpenClassInquiry = (className?: string, batchName?: string) => {
    setSelectedClassForInquiry(className);
    setSelectedBatchForInquiry(batchName);
    setIsClassModalOpen(true);
  };

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

  const classesToDisplay: OfferedClass[] =
    about?.offeredClasses && about.offeredClasses.length > 0
      ? about.offeredClasses
      : DEFAULT_CLASSES;

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-[#F8F4EE] relative overflow-hidden border-t border-[#E8D8C5]/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left CTA / Description */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3 lg:sticky lg:top-24"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C48B3C]/10 border border-[#C48B3C]/30 text-[#6E1E18] text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-3">
                <GraduationCap className="w-4 h-4 text-[#D7A65B]" />
                <span>Learn The Royal Art</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#4A0D0D] leading-tight mb-4">
                Pheta Classes & <span className="italic font-light text-[#C48B3C]">Masterclasses</span>
              </h2>
              <p className="text-[#2E1A14]/75 text-xs sm:text-sm leading-relaxed mb-6">
                Want to learn the royal art of tying a traditional pheta? Join our certified offline studio masterclasses and global online sessions to master this timeless Maharashtrian heritage.
              </p>
              <button
                onClick={() => handleOpenClassInquiry('General Pheta Academy Inquiry')}
                className="inline-flex items-center gap-2 bg-[#4A0D0D] hover:bg-[#6E1E18] text-[#F3D18A] px-6 py-3.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
              >
                <span>Enroll in Class</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Right Class Cards Grid */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {classesToDisplay.map((cls: OfferedClass, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  onClick={() => handleOpenClassInquiry(cls.title)}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8D8C5]/70 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col hover:-translate-y-0.5"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#EBE4D8] shrink-0">
                    <img
                      src={cls.image?.startsWith('http') || cls.image?.startsWith('/') ? cls.image : getApiImageUrl(cls.image)}
                      alt={cls.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute top-2.5 right-2.5 bg-[#4A0D0D]/90 backdrop-blur-sm text-[#F3D18A] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#D7A65B]/30 shadow-sm">
                      Masterclass
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col grow justify-between bg-white">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#4A0D0D] mb-1.5 group-hover:text-[#6E1E18] transition-colors">
                        {cls.title}
                      </h4>
                      <p className="text-[#2E1A14]/70 text-xs leading-relaxed line-clamp-3">
                        {cls.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-[#F0E6D8] flex items-center justify-between text-xs font-bold text-[#6E1E18] group-hover:text-[#D7A65B] transition-colors">
                      <span>Enquire / Enroll Now</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {showUpcomingBatches && !loading && about?.classBatches && about.classBatches.length > 0 && (
        <section className="py-10 sm:py-14 bg-white border-t border-[#E8D8C5]/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-[#6E1E18] font-bold tracking-[0.2em] uppercase text-xs block mb-1.5">Admissions Open</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0D0D] mb-1">Upcoming Batches</h2>
              <Divider className="max-w-[340px] my-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {about.classBatches.map((batch: ClassBatch, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col sm:flex-row bg-[#F8F4EE] rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:shadow-md transition-all group"
                >
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0 bg-[#EBE4D8]">
                    <img
                      src={getApiImageUrl(batch.image || '/placeholder-class.jpg')}
                      alt={batch.batchName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#4A0D0D] text-[#F3D18A] text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md border border-[#F3D18A]/30">
                      {batch.status || "Upcoming"}
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-4 sm:p-6 flex flex-col justify-center">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A0D0D] mb-3">{batch.batchName}</h3>
                    <div className="flex flex-col gap-2.5 mb-4">
                      <div className="flex items-center gap-2.5 text-[#2E1A14]/75 text-xs">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                          <Calendar className="w-3 h-3 text-[#6E1E18]" />
                        </div>
                        <span>Starts: <strong className="text-[#4A0D0D]">{batch.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#2E1A14]/75 text-xs">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                          <Clock className="w-3 h-3 text-[#6E1E18]" />
                        </div>
                        <span>Duration: <strong className="text-[#4A0D0D]">{batch.duration}</strong></span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleOpenClassInquiry(batch.batchName, `${batch.batchName} (Starts: ${batch.startDate})`)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-semibold uppercase tracking-wider text-xs shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>Enquire / Reserve Seat</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Class Inquiry Popup Modal */}
      <ClassInquiryModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        initialClass={selectedClassForInquiry}
        initialBatch={selectedBatchForInquiry}
        classList={
          classesToDisplay.map((c: OfferedClass) => c.title)
        }
      />
    </>
  );
};
