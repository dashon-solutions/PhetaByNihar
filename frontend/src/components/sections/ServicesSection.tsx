import React from 'react';
import { Divider } from '../ui/Divider';
import { motion } from 'framer-motion';
import { Crown, Tent, Briefcase, GraduationCap } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Wedding Pheta',
      description: 'Traditional & royal pheta ceremony for weddings that becomes a memory for life.',
      image: '/hero_bride_groom.png',
      icon: <Crown className="text-[#C48B3C] w-6 h-6" />
    },
    {
      title: 'Cultural Events',
      description: 'Celebrate festivals, temple events & cultural programs with pride.',
      image: '/service_pheta.webp',
      icon: <Tent className="text-[#C48B3C] w-6 h-6" />
    },
    {
      title: 'Workshops & Training',
      description: 'Learn the art of Pheta tying with our interactive workshops & training.',
      image: '/hero_bride_groom.png',
      icon: <GraduationCap className="text-[#C48B3C] w-6 h-6" />
    },
    {
      title: 'Corporate Events',
      description: 'Add a touch of tradition to corporate gatherings, award functions & more.',
      image: '/service_pheta.webp',
      icon: <Briefcase className="text-[#C48B3C] w-6 h-6" />
    }
  ];

  return (
    <section id="services" className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-8 md:mb-12 relative"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal">
          Pheta <span className="italic font-light text-[#C48B3C]">Services</span>
        </h2>
        <Divider />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
        {services.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            key={index}
            className="bg-[#FFFDFB] rounded-[24px] overflow-hidden shadow-soft border border-[#E8D8C5] hover:border-[#D7A65B] group hover:shadow-2xl transition-all duration-500 flex flex-col h-full md:h-[380px] relative cursor-pointer transform hover:-translate-y-2"
          >
            {/* Card Image */}
            <div className="relative h-36 sm:h-48 md:h-[50%] overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[#4D2D22]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>

            {/* Card Content */}
            <div className="px-2 pb-4 pt-6 md:px-6 md:pb-6 md:pt-8 flex flex-col items-center text-center flex-grow relative bg-[#FFFDFB]">
              {/* Floating Centered Icon */}
              <div className="absolute -top-5 md:-top-8 left-1/2 -translate-x-1/2 bg-[#FFFDFB] w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-md border border-[#E8D8C5] group-hover:bg-[#6E1E18] group-hover:border-[#6E1E18] transition-colors duration-500 z-20">
                <div className="transform group-hover:scale-110 group-hover:brightness-125 transition-all duration-300 scale-[0.65] md:scale-100 flex items-center justify-center">
                  {service.icon}
                </div>
              </div>

              <h3 className="font-serif text-[#4D2D22] text-[12px] md:text-xl font-bold mb-2 md:mb-3 group-hover:text-[#6E1E18] transition-colors duration-300">
                {service.title}
              </h3>

              <p className="font-sans text-[#666666] text-[10px] md:text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Hover Reveal Link */}
              {/* <div className="mt-auto overflow-hidden flex justify-center w-full">
                <span className="inline-flex items-center gap-1 text-[#C48B3C] text-xs font-bold uppercase tracking-widest transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Explore More <ArrowRight className="w-4 h-4" />
                </span>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>



    </section>
  );
};

