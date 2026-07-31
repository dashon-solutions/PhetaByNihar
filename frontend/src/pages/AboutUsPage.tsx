import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart, Crown, Clock, Quote, ChevronRight, Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      staggerChildren: 0.2
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
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, bannerData] = await Promise.all([
          apiFetch('/about').catch(() => null),
          apiFetch('/banner?pageName=about').catch(() => null)
        ]);

        if (aboutData) setAbout(aboutData);
        if (bannerData && bannerData.titleBold) setBanner(bannerData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#F8F4EE] min-h-screen text-[#2E1A14] font-['Inter'] selection:bg-[#4A0D0D] selection:text-[#F3D18A]">
      <Navbar />

      {/* --- Section 1: Hero Section --- */}
      <section className="relative h-[700px] overflow-hidden pt-24 bg-[#4A0D0D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0D0D] via-[#4A0D0D]/90 to-transparent z-10" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("/heritage_sketch.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] z-0" />

        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full z-0">
          <img
            src={banner?.backgroundImage ? getApiImageUrl(banner.backgroundImage) : "/bannerimgside.png"}
            alt="Royal Maharashtrian Pheta"
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="relative z-20 max-w-[1280px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="w-full lg:w-1/2"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-semibold tracking-[0.2em] uppercase text-sm font-['Inter']">{banner?.tag || "About Us"}</span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="font-['Playfair_Display'] text-5xl lg:text-7xl text-[#F8F4EE] leading-[1.1] mb-6">
                {banner?.titleBold || "The Story Behind"} <br />
                <span className="italic text-[#F3D18A] font-['Cormorant_Garamond']">{banner?.titleItalic || "Every Pheta"}</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-[#F8F4EE]/80 text-lg leading-relaxed mb-10 max-w-lg font-['Inter'] whitespace-pre-wrap">
              {banner?.description || "At Pheta By Nihar, we don't simply tie a pheta—we preserve a tradition, celebrate culture, and create unforgettable moments with every fold."}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              <Link to="/products" className="bg-[#D4AF37] hover:bg-[#F3D18A] text-[#2E1A14] px-8 py-4 rounded-[24px] font-semibold tracking-[0.5px] transition-all duration-300 shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1">
                {banner?.primaryButtonText || "Explore Collection"}
              </Link>
              <a href="#our-journey" className="text-[#F8F4EE] flex items-center gap-2 font-semibold tracking-[0.5px] hover:text-[#D4AF37] transition-colors group">
                {banner?.secondaryButtonText || "Our Journey"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 2: Our Brand Story --- */}
      <section className="py-24 lg:py-32 max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(46,26,20,0.1)] z-10 group">
              <img
                src={about?.portraitImage ? getApiImageUrl(about.portraitImage) : "/about_portrait.webp"}
                alt="Founder crafting pheta"
                className="w-full h-auto aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0D0D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute -inset-4 border border-[#D4AF37] rounded-[24px] z-0 transform translate-x-4 translate-y-4 hidden md:block" />
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="w-full lg:w-1/2"
          >
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="text-[#641414] font-bold tracking-[0.2em] uppercase text-sm">Our Brand Story</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D] leading-tight mb-6">
              {about?.heading || "A Tradition Reimagined"} <br />
              <span className="italic text-[#D4AF37] font-['Cormorant_Garamond']">{about?.italicHeading || "With Love & Respect"}</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="space-y-4 text-[#2E1A14]/70 leading-relaxed font-['Inter'] mb-10 whitespace-pre-wrap">
              <p>{about?.brandStory || "What started as a deep passion for our rich Maharashtrian heritage has blossomed into a brand synonymous with royal elegance. For years, we have meticulously studied the art of pheta tying, passed down through generations."}</p>
              {!about?.brandStory && (
                <p>Every fabric is hand-selected, every fold is precise, and every pheta tells a story of valor, pride, and celebration. We take pride in reviving forgotten styles while infusing modern comfort and luxury into our creations.</p>
              )}
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Crown, title: "Authentic Tradition" },
                { icon: Star, title: "Premium Fabrics" },
                { icon: ShieldCheck, title: "Handcrafted Excellence" },
                { icon: Heart, title: "Made With Passion" }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F3D18A]/20 flex items-center justify-center text-[#4A0D0D]">
                    <feature.icon strokeWidth={1.5} className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[#2E1A14] font-['Inter']">{feature.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: Journey Timeline --- */}
      <section id="our-journey" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("/heritage_sketch.png")', backgroundSize: '50%' }} />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D] mb-4">Our Journey</h2>
            <img src="/divider.png" alt="divider" className="mx-auto h-4 opacity-70" />
          </div>

          {about?.journey && (
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center text-[#2E1A14]/70 max-w-4xl mx-auto mb-20 leading-relaxed font-['Inter'] text-lg whitespace-pre-wrap"
            >
              {about.journey}
            </motion.p>
          )}

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
              {(about?.journeyPoints && about.journeyPoints.length > 0 ? about.journeyPoints : [
                { title: "The Beginning", description: "A humble start driven by passion for culture.", image: "/aboutnewiamge.png" },
                { title: "The Growth", description: "Mastering styles and serving thousands of weddings.", image: "/aboutuspng.png" },
                { title: "Recognition", description: "Becoming a trusted name in celebrity styling.", image: "/aboutsideimage.png" },
                { title: "The Future", description: "Taking Maharashtrian heritage to the global stage.", image: "/hero_bride_groom.png" }
              ]).map((milestone: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="flex flex-col items-center group bg-[#F8F4EE] p-6 rounded-[24px] border border-[#D4AF37]/30 shadow-sm hover:shadow-[0_15px_30px_rgba(74,13,13,0.08)] transition-all"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <img src={milestone.image ? getApiImageUrl(milestone.image) : "/about_portrait.webp"} alt={milestone.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl lg:text-2xl text-[#641414] font-bold mb-3">{milestone.title}</h3>
                  <p className="text-[#2E1A14]/70 font-['Inter'] text-sm leading-relaxed">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Passion & Experience --- */}
      <section className="py-24 bg-gradient-to-br from-[#4A0D0D] to-[#641414] text-[#F8F4EE] relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/aboutuspng.png')] bg-cover mix-blend-overlay" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Quote & Text Right */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative order-2 lg:order-1"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-[24px] shadow-2xl mb-8">
                <Quote className="w-10 h-10 text-[#D4AF37] mb-6 opacity-50" />
                <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl italic leading-relaxed mb-6 whitespace-pre-wrap">
                  {about?.quoteText || `"For me, it’s not just about tying a pheta, it’s about creating emotions and memories that last forever."`}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="font-['Inter'] font-semibold tracking-wider text-[#F3D18A] uppercase">— {about?.quoteAuthor || "Nihar Tambde"}</span>
                </div>
              </div>

              {(about?.passion || about?.experience) && (
                <div className="space-y-6">
                  {about?.passion && (
                    <div>
                      <h4 className="text-[#F3D18A] font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Our Passion
                      </h4>
                      <p className="text-[#F8F4EE]/80 leading-relaxed font-['Inter'] whitespace-pre-wrap">{about.passion}</p>
                    </div>
                  )}
                  {about?.experience && (
                    <div>
                      <h4 className="text-[#F3D18A] font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Our Experience
                      </h4>
                      <p className="text-[#F8F4EE]/80 leading-relaxed font-['Inter'] whitespace-pre-wrap">{about.experience}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Stats Left */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 order-1 lg:order-2">
              {[
                { num: "5+", label: "Years Experience" },
                { num: "5000+", label: "Happy Customers" },
                { num: "100+", label: "Pheta Styles" },
                { num: "50+", label: "Events" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-center p-6 bg-white/5 rounded-[24px] border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#F3D18A] mb-3">{stat.num}</div>
                  <div className="text-sm uppercase tracking-wider font-semibold opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 5: Why Choose Us --- */}
      <section className="py-24 lg:py-32 max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-[#641414] font-bold tracking-[0.2em] uppercase text-sm block mb-4">The Pheta By Nihar Difference</span>
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D]">Why Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Authentic Maharashtrian Heritage", desc: "True to the roots of Peshwai, Kolhapuri, and Puneri traditions." },
            { title: "Expert Craftsmanship", desc: "Tied with precision, ensuring a perfect fit and majestic look." },
            { title: "Premium Materials", desc: "Using only the finest silk, cotton, and rich zari fabrics." },
            { title: "Trusted by Thousands", desc: "The preferred choice for grooms, celebrities, and grand events." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-[24px] border border-[#E8D8C5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,13,13,0.08)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#F3D18A] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#4A0D0D] mb-4">{item.title}</h3>
              <p className="text-[#2E1A14]/70 font-['Inter'] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Section 6: Meet The Founder --- */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="w-full lg:w-5/12"
            >
              <div className="relative rounded-[24px] overflow-hidden group">
                <img src="/about_portrait.webp" alt="Nihar Tambde" className="w-full aspect-[3/4] object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#4A0D0D] to-transparent">
                  <h3 className="text-[#F3D18A] font-['Playfair_Display'] text-3xl mb-1">Nihar Tambde</h3>
                  <p className="text-white/80 font-['Inter'] text-sm tracking-wider uppercase">Founder & Master Craftsman</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="w-full lg:w-7/12"
            >
              <motion.h2 variants={fadeInUp} className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D] mb-8">
                The Visionary <span className="italic text-[#D4AF37] font-['Cormorant_Garamond']">Behind The Brand</span>
              </motion.h2>

              <div className="space-y-8">
                <motion.div variants={fadeInUp}>
                  <h4 className="font-bold text-[#641414] tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#F3D18A] rounded-sm rotate-45" /> Mission
                  </h4>
                  <p className="text-[#2E1A14]/70 font-['Inter'] leading-relaxed pl-6 border-l border-[#E8D8C5]">
                    To elevate the traditional Maharashtrian Pheta into a global symbol of luxury, pride, and cultural identity while preserving its authentic roots.
                  </p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h4 className="font-bold text-[#641414] tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#F3D18A] rounded-sm rotate-45" /> Journey
                  </h4>
                  <p className="text-[#2E1A14]/70 font-['Inter'] leading-relaxed pl-6 border-l border-[#E8D8C5]">
                    Starting from small local events to styling renowned personalities, Nihar's journey is fueled by a relentless pursuit of perfection and an unwavering love for Maharashtrian culture.
                  </p>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-[#E8D8C5]">
                <img src="/signature.png" alt="Signature" className="h-16 opacity-80 mix-blend-multiply" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 7: Pheta Classes --- */}
      <section className="py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3"
            >
              <span className="text-[#641414] font-bold tracking-[0.2em] uppercase text-sm block mb-4">Learn The Art</span>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D] mb-6">Pheta Classes</h2>
              <p className="text-[#2E1A14]/70 font-['Inter'] leading-relaxed mb-8">
                Want to learn the royal art of tying a pheta? Join our offline & online classes and become a part of this beautiful tradition.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 bg-[#4A0D0D] hover:bg-[#641414] text-[#F3D18A] px-8 py-4 rounded-[24px] font-semibold tracking-[0.5px] transition-colors shadow-lg">
                Explore Classes
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {(about?.offeredClasses && about.offeredClasses.length > 0)
                ? about.offeredClasses.map((cls: OfferedClass, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative shrink-0">
                      <img src={getApiImageUrl(cls.image)} alt={cls.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#4A0D0D] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-[#4A0D0D] mb-2">{cls.title}</h4>
                      <p className="text-[#2E1A14]/60 text-sm font-['Inter'] line-clamp-3">{cls.description}</p>
                    </div>
                  </motion.div>
                ))
                : [
                  { title: "Offline Classes", desc: "Hands-on training with personal guidance.", img: "/aboutnewiamge.png" },
                  { title: "Online Classes", desc: "Learn from anywhere at your convenience.", img: "/aboutuspng.png" },
                  { title: "Workshops", desc: "Special workshops for groups & events.", img: "/aboutsideimage.png" }
                ].map((cls, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative shrink-0">
                      <img src={cls.img} alt={cls.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#4A0D0D] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-[#4A0D0D] mb-2">{cls.title}</h4>
                      <p className="text-[#2E1A14]/60 text-sm font-['Inter']">{cls.desc}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 7.5: Class Batches --- */}
      {!loading && about?.classBatches && about.classBatches.length > 0 && (
        <section className="py-24 bg-white border-t border-[#E8D8C5]/40">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-[#641414] font-bold tracking-[0.2em] uppercase text-sm block mb-4">Admissions Open</span>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-[#4A0D0D]">Upcoming Batches</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {about.classBatches.map((batch: ClassBatch, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row bg-[#F8F4EE] rounded-[24px] overflow-hidden border border-[#D4AF37]/20 hover:shadow-[0_20px_40px_rgba(74,13,13,0.08)] transition-all group"
                >
                  <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={getApiImageUrl(batch.image || '/placeholder-class.jpg')}
                      alt={batch.batchName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#4A0D0D] text-[#F3D18A] text-[10px] uppercase font-bold tracking-wider px-4 py-2 rounded-full shadow-lg border border-[#F3D18A]/30">
                      {batch.status || "Upcoming"}
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#4A0D0D] mb-5">{batch.batchName}</h3>
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex items-center gap-3 text-[#2E1A14]/70 font-['Inter'] text-sm">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <span>Starts: <strong className="text-[#4A0D0D]">{batch.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-3 text-[#2E1A14]/70 font-['Inter'] text-sm">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <span>Duration: <strong className="text-[#4A0D0D]">{batch.duration}</strong></span>
                      </div>
                    </div>
                    <div>
                      <Link to="/contact" className="inline-flex items-center gap-2 text-[#641414] font-bold uppercase tracking-wider text-sm hover:text-[#D4AF37] transition-colors">
                        Enquire Now <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}





      <Footer />
    </div>
  );
};
