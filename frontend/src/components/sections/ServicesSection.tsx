import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '../ui/Divider';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../../utils/api';

interface ServiceData {
  _id?: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<ServiceData[]>([
    {
      title: 'Royal Groom Pheta',
      description: 'Traditional & royal pheta ceremony for weddings that becomes a memory for life.',
      image: '/hero_bride_groom.png',
      icon: 'Crown'
    },
    {
      title: 'Cultural Festivals',
      description: 'Celebrate festivals, temple events & cultural programs with pride and honor.',
      image: '/service_pheta.webp',
      icon: 'Tent'
    },
    {
      title: 'Workshops & Training',
      description: 'Learn the art of Pheta tying with our interactive workshops & hands-on training.',
      image: '/hero_bride_groom.png',
      icon: 'GraduationCap'
    },
    {
      title: 'Corporate Events',
      description: 'Add a touch of tradition to corporate gatherings, award functions & VIP satkars.',
      image: '/service_pheta.webp',
      icon: 'Briefcase'
    }
  ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiFetch('/services');
        if (data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic services, using fallback:', err);
      }
    };
    fetchServices();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Crown;
    return <IconComponent className="text-[#C48B3C] group-hover:text-[#F3D18A] w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" />;
  };

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-10 md:mb-14 relative"
      >
        <span className="text-[#C48B3C] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-2 block">
          HERITAGE & EXCELLENCE
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-wide font-normal">
          Pheta <span className="italic font-light text-[#C48B3C]">Services</span>
        </h2>
        <Divider />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12 items-stretch">
        {services.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            key={service._id || index}
            className="bg-[#FFFDFB] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(77,45,34,0.06)] border border-[#E8D8C5] hover:border-[#D7A65B] group hover:shadow-[0_12px_32px_rgba(77,45,34,0.14)] transition-all duration-500 flex flex-col h-full relative cursor-pointer transform hover:-translate-y-1.5"
          >
            {/* Card Image Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] overflow-hidden shrink-0 bg-[#F4EDE4]">
              <div className="absolute inset-0 bg-[#4D2D22]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img
                src={getApiImageUrl(service.image)}
                alt={service.title}
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Floating Centered Icon Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#FFFDFB] w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-full shadow-lg border border-[#E8D8C5] group-hover:bg-[#6E1E18] group-hover:border-[#6E1E18] transition-all duration-300 z-20">
                <div className="transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {renderIcon(service.icon)}
                </div>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="pt-8 pb-6 px-5 sm:px-6 flex flex-col items-center text-center flex-grow bg-[#FFFDFB]">
              <h3 className="font-serif text-[#4D2D22] text-lg md:text-xl font-bold mb-2.5 group-hover:text-[#6E1E18] transition-colors duration-300 line-clamp-2 leading-snug">
                {service.title}
              </h3>

              <p className="font-sans text-[#666666] text-xs md:text-sm leading-relaxed mb-5 flex-grow line-clamp-3 text-balance">
                {service.description}
              </p>

              {/* Action Link */}
              <Link
                to="/services"
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#C48B3C] group-hover:text-[#6E1E18] transition-colors duration-300 uppercase tracking-wider pt-2 border-t border-[#E8D8C5]/40 w-full justify-center"
              >
                <span>Explore Details</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Services Button */}
      <div className="text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-[#6E1E18] hover:bg-[#52140F] text-[#F3D18A] px-8 py-3.5 rounded-full font-medium text-sm md:text-base tracking-wide transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span>View All Specialized Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};



