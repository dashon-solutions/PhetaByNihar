import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { SEO } from '../components/common/SEO';
import { ClassInquiryModal } from '../components/ui/ClassInquiryModal';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart, Crown, Clock, Quote, ChevronRight, Calendar, Sparkles, GraduationCap } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../utils/api';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

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

export const AboutUsPage: React.FC = () => {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const aboutData = await apiFetch('/about').catch(() => null);
        if (aboutData) setAbout(aboutData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#F8F4EE] min-h-screen text-[#2E1A14] font-sans selection:bg-[#4A0D0D] selection:text-[#F3D18A] overflow-x-hidden">
      <SEO
        title="Pheta Tying Workshops & Masterclasses in Mumbai & Pune | About Pheta By Nihar"
        description="Learn the authentic royal art of Marathi pheta tying with Nihar. Certified offline studio masterclasses in Mumbai & Pune, and global online workshops. Heritage Pheta Academy."
        keywords="Pheta Tying Workshop, Pheta Tying Workshop Mumbai, Pheta Tying Workshop Pune, Marathi Pheta Workshop, Marathi Pheta Tying Workshop, Pheta Workshop Maharashtra, Learn Pheta Tying, Pheta Tying Classes Mumbai, Pheta Tying Classes Pune, Traditional Pheta Workshop, Maharashtrian Culture Workshop, Traditional Turban Tying Workshop, Pheta Academy, Nihar Pheta Artist, Marathi Pheta History"
        canonicalUrl="https://phetabynihar.com/about"
        ogImage="/aboutnewiamge.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Professional Pheta Tying Masterclass",
          "description": "Comprehensive training in authentic Maharashtrian pheta styles, from basic folds to royal intricate patterns.",
          "provider": {
            "@type": "Organization",
            "name": "Pheta By Nihar Academy",
            "sameAs": "https://phetabynihar.com"
          }
        }}
      />
      <Navbar />

      {/* --- Section 1: Standardized Hero Section --- */}
      <HeroBanner pageName="about" />

      {/* --- Section 2: Our Brand Story --- */}
      <section className="py-10 sm:py-14 lg:py-18 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
            className="w-full lg:w-5/12 max-w-sm sm:max-w-md lg:max-w-[420px] mx-auto lg:mx-0 relative"
          >
            <div className="relative rounded-2xl sm:rounded-[24px] overflow-hidden shadow-lg z-10 group border-2 border-white/90">
              <img
                src={about?.portraitImage ? getApiImageUrl(about.portraitImage) : "/about_portrait.webp"}
                alt="Founder crafting royal pheta"
                className="w-full h-auto aspect-[4/5] max-h-[440px] sm:max-h-[480px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0D0D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute -inset-2.5 sm:-inset-3 border-2 border-[#D4AF37]/40 rounded-2xl sm:rounded-[24px] z-0 transform translate-x-2.5 translate-y-2.5 sm:translate-x-3 sm:translate-y-3 hidden sm:block pointer-events-none" />
          </motion.div>

          <motion.div
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="w-full lg:w-7/12"
          >
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="text-[#6E1E18] font-bold tracking-[0.2em] uppercase text-xs inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D7A65B]" />
                Our Brand Story
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0D0D] leading-tight mb-4">
              {about?.heading || "A Tradition Reimagined"} <br />
              <span className="italic text-[#D4AF37] font-serif font-light">{about?.italicHeading || "With Love & Respect"}</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-3 text-[#2E1A14]/75 text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-wrap">
              <p>{about?.brandStory || "What started as a deep passion for our rich Maharashtrian heritage has blossomed into a brand synonymous with royal elegance. For years, we have meticulously studied the art of pheta tying, passed down through generations."}</p>
              {!about?.brandStory && (
                <p>Every fabric is hand-selected, every fold is precise, and every pheta tells a story of valor, pride, and celebration. We take pride in reviving forgotten styles while infusing modern comfort and luxury into our creations.</p>
              )}
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Crown, title: "Authentic Tradition", desc: "Pure cultural roots" },
                { icon: Star, title: "Premium Fabrics", desc: "Finest silk & brocade" },
                { icon: ShieldCheck, title: "Handcrafted Craft", desc: "Master precision" },
                { icon: Heart, title: "Made With Passion", desc: "Timeless devotion" }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-2.5 bg-white/80 backdrop-blur-sm p-3 sm:p-3.5 rounded-xl border border-[#E8D8C5]/60 shadow-soft">
                  <div className="w-8 h-8 rounded-full bg-[#F3D18A]/25 flex items-center justify-center text-[#6E1E18] shrink-0">
                    <feature.icon strokeWidth={1.75} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A0D0D] text-xs sm:text-sm leading-tight">{feature.title}</h4>
                    <span className="text-[10px] sm:text-[11px] text-[#666666] hidden sm:block mt-0.5">{feature.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: Journey Timeline --- */}
      <section id="our-journey" className="py-10 sm:py-14 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("/heritage_sketch.png")', backgroundSize: '50%' }} />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#6E1E18] font-bold tracking-[0.2em] uppercase text-xs block mb-1.5">Milestones</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0D0D] mb-1">Our Journey</h2>
            <Divider className="max-w-[340px] my-1" />
          </div>

          {about?.journey && (
            <motion.p
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5 }}
              className="text-center text-[#2E1A14]/70 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-wrap"
            >
              {about.journey}
            </motion.p>
          )}

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center relative z-10">
              {(about?.journeyPoints && about.journeyPoints.length > 0 ? about.journeyPoints : [
                { title: "The Beginning", description: "A humble start driven by passion for culture.", image: "/aboutnewiamge.png" },
                { title: "The Growth", description: "Mastering styles and serving thousands of weddings.", image: "/aboutuspng.png" },
                { title: "Recognition", description: "Becoming a trusted name in celebrity styling.", image: "/aboutsideiamge.png" },
                { title: "The Future", description: "Taking Maharashtrian heritage to the global stage.", image: "/hero_bride_groom.png" }
              ]).map((milestone: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center group bg-[#F8F4EE] p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 border-3 border-white shadow-sm group-hover:scale-105 transition-transform duration-500 shrink-0">
                    <img src={milestone.image ? getApiImageUrl(milestone.image) : "/about_portrait.webp"} alt={milestone.title} className="w-full h-full object-cover object-top" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-[#641414] font-bold mb-1.5">{milestone.title}</h3>
                  <p className="text-[#2E1A14]/70 text-xs leading-relaxed">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Passion & Experience --- */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-[#4A0D0D] via-[#5B1313] to-[#6E1E18] text-[#F8F4EE] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/aboutuspng.png')] bg-cover mix-blend-overlay pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

            {/* Quote & Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative order-2 lg:order-1"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-7 rounded-2xl shadow-xl mb-5">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#D7A65B] mb-3 opacity-60" />
                <p className="font-serif text-lg sm:text-xl md:text-2xl italic font-light leading-relaxed mb-4 whitespace-pre-wrap text-white">
                  {about?.quoteText || `"For me, it’s not just about tying a pheta, it’s about creating emotions and memories that last forever."`}
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-px bg-[#D7A65B]" />
                  <span className="font-sans text-xs font-bold tracking-wider text-[#F3D18A] uppercase">— {about?.quoteAuthor || "Nihar Tambde"}</span>
                </div>
              </div>

              {(about?.passion || about?.experience) && (
                <div className="space-y-3.5">
                  {about?.passion && (
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                      <h4 className="text-[#F3D18A] font-bold uppercase tracking-wider text-xs mb-1.5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D7A65B]" /> Our Passion
                      </h4>
                      <p className="text-[#F8F4EE]/85 text-xs leading-relaxed whitespace-pre-wrap">{about.passion}</p>
                    </div>
                  )}
                  {about?.experience && (
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                      <h4 className="text-[#F3D18A] font-bold uppercase tracking-wider text-xs mb-1.5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D7A65B]" /> Our Experience
                      </h4>
                      <p className="text-[#F8F4EE]/85 text-xs leading-relaxed whitespace-pre-wrap">{about.experience}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Stats Right */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 order-1 lg:order-2">
              {[
                { num: "5+", label: "Years Experience" },
                { num: "5000+", label: "Royal Phetas Tied" },
                { num: "100+", label: "Authentic Styles" },
                { num: "50+", label: "Celebrity Satkars" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="text-center p-4 sm:p-5 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#D7A65B]/40 transition-all duration-300 shadow-md"
                >
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F3D18A] font-bold mb-1">{stat.num}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-85 text-white/90">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 5: Pheta Classes (Tight Spacing & Perfect 4:3 Image Framing) --- */}
      <section className="py-10 sm:py-14 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left CTA / Description */}
            <motion.div
              initial={{ opacity: 0, x: -25 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3 lg:sticky lg:top-24"
            >
              <span className="text-[#6E1E18] font-bold tracking-[0.2em] uppercase text-xs inline-flex items-center gap-1.5 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#D7A65B]" />
                Learn The Royal Art
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4A0D0D] leading-tight mb-4">
                Pheta Classes
              </h2>
              <p className="text-[#2E1A14]/75 text-xs sm:text-sm leading-relaxed mb-6">
                Want to learn the royal art of tying a traditional pheta? Join our certified offline studio masterclasses and global online sessions to master this timeless heritage.
              </p>
              <button 
                onClick={() => handleOpenClassInquiry('General Pheta Academy Inquiry')}
                className="inline-flex items-center gap-2 bg-[#4A0D0D] hover:bg-[#6E1E18] text-[#F3D18A] px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
              >
                <span>Enroll in Class</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Right Class Cards Grid - Tight Spacing & Perfect 4:3 Image Framing with Top Alignment */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {(about?.offeredClasses && about.offeredClasses.length > 0)
                ? about.offeredClasses.map((cls: OfferedClass, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    onClick={() => handleOpenClassInquiry(cls.title)}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8D8C5]/70 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col hover:-translate-y-0.5"
                  >
                    {/* Image container: aspect-[4/3] with object-top prevents chopping top of heads/phetas */}
                    <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#EBE4D8] shrink-0">
                      <img 
                        src={getApiImageUrl(cls.image)} 
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
                ))
                : [
                  { title: "Offline Studio Masterclass", desc: "Immersive, hands-on masterclass at our studio with live models and 1-on-1 guidance.", img: "/aboutnewiamge.png" },
                  { title: "Online Global Masterclass", desc: "Live interactive HD video training tailored for global learners and diaspora families.", img: "/aboutuspng.png" },
                  { title: "Group & Corporate Workshops", desc: "Tailored cultural workshops for Dhol Tasha Pathaks, colleges, and festive satkars.", img: "/aboutsideiamge.png" },
                  { title: "Royal Wedding Safa Specialization", desc: "Advanced certification in bridal & groom pagadis, Kalgi attachment, and Shahi mass draping.", img: "/hero_bride_groom.png" }
                ].map((cls, idx) => (
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
                        src={cls.img} 
                        alt={cls.title} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col grow justify-between bg-white">
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#4A0D0D] mb-1.5">
                          {cls.title}
                        </h4>
                        <p className="text-[#2E1A14]/70 text-xs leading-relaxed line-clamp-3">
                          {cls.desc}
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

      {/* --- Section 6: Upcoming Batches --- */}
      {!loading && about?.classBatches && about.classBatches.length > 0 && (
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
          about?.offeredClasses && about.offeredClasses.length > 0
            ? about.offeredClasses.map((c: OfferedClass) => c.title)
            : undefined
        }
      />

      <Footer />
    </div>
  );
};

