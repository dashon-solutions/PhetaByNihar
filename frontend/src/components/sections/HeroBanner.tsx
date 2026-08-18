import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiFetch, getApiImageUrl } from '../../utils/api';

export interface BannerData {
  tag?: string;
  titleItalic?: string;
  titleBold?: string;
  titleRegular?: string;
  description?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const DEFAULT_PAGE_BANNERS: Record<string, BannerData> = {
  home: {
    tag: 'Preserving Heritage',
    titleItalic: 'The Art of',
    titleBold: 'Maharashtrian',
    titleRegular: 'Pheta Ceremony',
    description: 'Honoring traditions with elegance, respect & pride. From royal weddings to cultural celebrations, we bring the timeless art of Pheta tying to life.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Book Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Explore Work',
    secondaryButtonLink: '/our-work'
  },
  about: {
    tag: 'Our Legacy',
    titleItalic: 'The Story Behind',
    titleBold: 'Pheta By Nihar',
    titleRegular: 'Tradition & Excellence',
    description: 'Learn the story behind our craft, our passion for Maharashtrian culture, and the masters who keep the royal tradition alive.',
    backgroundImage: '/aboutnewiamge.png',
    primaryButtonText: 'Explore Collection',
    primaryButtonLink: '/products',
    secondaryButtonText: 'Our Services',
    secondaryButtonLink: '/services'
  },
  services: {
    tag: 'Specialized Offerings',
    titleItalic: 'Royal & Authentic',
    titleBold: 'Pheta Services',
    titleRegular: '& Custom Masterclasses',
    description: 'From grand wedding ceremonies and cultural processions to professional training workshops, discover our tailored turban styling services.',
    backgroundImage: '/service_pheta.webp',
    primaryButtonText: 'Book Service',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'View Portfolio',
    secondaryButtonLink: '/our-work'
  },
  'our-work': {
    tag: 'Portfolio of Pride',
    titleItalic: 'A Showcase of',
    titleBold: 'Royal Celebrations',
    titleRegular: '& Memorable Events',
    description: 'Explore our gallery of royal wedding ceremonies, celebrity satkars, high-profile dignitaries, and vibrant cultural processions across India.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Book Us Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Explore Services',
    secondaryButtonLink: '/services'
  },
  products: {
    tag: 'Exclusive Heritage',
    titleItalic: 'Handcrafted Royal',
    titleBold: 'Products & Rentals',
    titleRegular: 'Artifacts & Regalia',
    description: 'Discover our premium range of traditional Maharashtrian accessories, miniature phetas, Wagnakha replicas, and royal pagadis available for purchase and rental.',
    backgroundImage: '/aboutsideiamge.png',
    primaryButtonText: 'Inquire Now',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Our Services',
    secondaryButtonLink: '/services'
  },
  contact: {
    tag: 'Connect With Us',
    titleItalic: 'Begin Your',
    titleBold: 'Royal Experience',
    titleRegular: '& Event Inquiries',
    description: 'Whether you want to book our team for an upcoming wedding, festival, or masterclass training, reach out to us and let us create unforgettable memories.',
    backgroundImage: '/footerimg.png',
    primaryButtonText: 'Send Inquiry',
    primaryButtonLink: '#inquiry-form',
    secondaryButtonText: 'Explore Work',
    secondaryButtonLink: '/our-work'
  }
};

interface HeroBannerProps {
  pageName?: string;
  customData?: Partial<BannerData>;
  centered?: boolean;
  showButtons?: boolean;
  showTag?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  pageName = 'home',
  customData,
  centered,
  showButtons,
  showTag
}) => {
  const fallback = DEFAULT_PAGE_BANNERS[pageName] || DEFAULT_PAGE_BANNERS.home;

  const [banner, setBanner] = useState<BannerData>({
    ...fallback,
    ...customData
  });

  const isCentered = centered !== undefined
    ? centered
    : (pageName === 'about' || pageName === 'our-work');

  const shouldShowButtons = showButtons !== undefined
    ? showButtons
    : (pageName !== 'about' && pageName !== 'our-work');

  const shouldShowTag = showTag !== undefined
    ? showTag
    : (pageName !== 'about' && pageName !== 'our-work');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await apiFetch(`/banner?pageName=${pageName}`);
        if (data && data.titleBold) {
          setBanner({
            ...fallback,
            ...data,
            ...customData
          });
        }
      } catch (err) {
        console.warn(`Could not load dynamic banner for ${pageName}, using fallback:`, err);
      }
    };
    fetchBanner();
  }, [pageName]);

  const renderButton = (text?: string, link?: string, isPrimary = true) => {
    if (!text) return null;

    const isExternalOrAnchor = link?.startsWith('http') || link?.startsWith('#') || link?.startsWith('tel:');

    const className = isPrimary
      ? "inline-flex items-center justify-center gap-2 bg-[#4D2D22] text-[#D7A65B] hover:bg-[#3A2219] hover:text-[#F3D18A] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group"
      : "inline-flex items-center justify-center gap-2 border-2 border-[#D7A65B]/60 bg-[#4D2D22]/40 backdrop-blur-sm text-[#FFFDFB] hover:bg-[#4D2D22] hover:border-[#D7A65B] hover:text-[#D7A65B] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg hover:-translate-y-0.5 group";

    const content = (
      <>
        <span>{text}</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </>
    );

    if (isExternalOrAnchor) {
      return (
        <a href={link || '#'} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link to={link || '/contact'} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <section className="relative w-full h-[540px] sm:h-[580px] md:h-[620px] lg:h-[660px] overflow-hidden flex items-center bg-[#2A0D0F]">
      {/* Background Image */}
      <img
        src={getApiImageUrl(banner.backgroundImage || '/footerimg.png')}
        alt={banner.titleBold || "Royal Pheta"}
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
      />

      {/* Luxury Dark Gradient Overlay */}
      <div
        className={`absolute inset-0 z-10 ${isCentered
          ? 'bg-gradient-to-t from-black/85 via-black/60 to-black/45'
          : 'bg-gradient-to-r from-black/5 via-black/35 to-black/25'
          }`}
      />

      {/* Decorative Heritage Watermark Overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-10"
        style={{ backgroundImage: 'url("/heritage_sketch.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Content Container */}
      <div className={`relative z-20 max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 flex items-center h-full pt-16 md:pt-0 ${isCentered ? 'justify-center' : 'justify-start'
        }`}>
        <motion.div
          initial={{ opacity: 0, y: isCentered ? 30 : 0, x: isCentered ? 0 : -35 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full ${isCentered
            ? 'max-w-3xl text-center flex flex-col items-center justify-center mx-auto'
            : 'lg:w-1/2 text-left'
            }`}
        >
          {/* Tag Pill */}
          {shouldShowTag && banner.tag && (
            <div className={`inline-block mb-3 sm:mb-4 ${isCentered ? 'mx-auto' : ''}`}>
              <span className="inline-flex items-center gap-2 bg-[#4D2D22]/90 backdrop-blur-md px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[#FFFDFB] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold border border-[#D7A65B]/30 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#D7A65B] animate-pulse" />
                {banner.tag}
              </span>
            </div>
          )}

          {/* Triple Heading */}
          <h1 className="font-serif leading-[1.08] tracking-normal">
            {banner.titleItalic && (
              <span className="block font-serif italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#D7A65B] mb-1">
                {banner.titleItalic}
              </span>
            )}

            {banner.titleBold && (
              <span className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {banner.titleBold}
              </span>
            )}

            {banner.titleRegular && (
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/95 mt-1">
                {banner.titleRegular}
              </span>
            )}
          </h1>

          {/* Description */}
          {banner.description && (
            <p className={`mt-4 sm:mt-5 md:mt-6 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-normal ${isCentered ? 'max-w-2xl mx-auto' : 'max-w-xl'
              }`}>
              {banner.description}
            </p>
          )}

          {/* Buttons (Only shown when shouldShowButtons is true) */}
          {shouldShowButtons && (banner.primaryButtonText || banner.secondaryButtonText) && (
            <div className={`mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 ${isCentered ? 'justify-center' : 'justify-start'
              }`}>
              {renderButton(banner.primaryButtonText, banner.primaryButtonLink, true)}
              {renderButton(banner.secondaryButtonText, banner.secondaryButtonLink, false)}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

