import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/common/SEO';
import { ClassesSection } from '../components/sections/ClassesSection';
import { Divider } from '../components/ui/Divider';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart, Crown, Quote, Sparkles } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../utils/api';

import { fallbackAboutUs } from '../data/fallbackData';

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

export const AboutUsPage: React.FC = () => {
  const [about, setAbout] = useState<any>(fallbackAboutUs);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const aboutData = await apiFetch('/about').catch(() => null);
        if (aboutData && (aboutData.heading || aboutData.journey)) {
          setAbout(aboutData);
        }
      } catch (err) {
        console.error('Failed to fetch data, using fallback:', err);
        setAbout(fallbackAboutUs);
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
            "name": "Pheta By Nihar",
            "sameAs": "https://phetabynihar.com"
          }
        }}
      />
      <Navbar theme="light" />

      {/* --- Page Header Section --- */}
      <section className="pt-28 md:pt-36 pb-6 text-center max-w-3xl mx-auto px-4">
        <span className="text-[#D7A65B] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
          OUR LEGACY & TRADITION
        </span>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#4D2D22] mb-1 leading-tight">
          About Pheta By Nihar
        </h1>
        <Divider className="max-w-[450px] my-1" />
        <p className="mt-4 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
          Preserving the royal tradition of Maharashtrian Pheta draping with modern elegance and passion.
        </p>
      </section>

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

      {/* --- Section 5 & 6: Pheta Classes & Upcoming Batches --- */}
      <ClassesSection initialAboutData={about} showUpcomingBatches={true} />

      <Footer />
    </div>
  );
};

