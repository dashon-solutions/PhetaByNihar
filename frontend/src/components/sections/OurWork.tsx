import React from 'react';
import { Divider } from '../ui/Divider';
import { motion } from 'framer-motion';
import { ImageIcon, ArrowRight } from 'lucide-react';

export const OurWork: React.FC = () => {
  return (
    <section id="work" className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto bg-[#FFFDFB]">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-8 md:mb-12 relative"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal">
          Our <span className="italic font-light text-[#C48B3C]">Work</span>
        </h2>
        <Divider />
      </motion.div>

      {/* Gallery Grid - Responsive Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[250px_150px_150px] md:grid-rows-2 gap-3 h-auto md:h-[500px]">

        {/* Large Main Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-2 row-span-1 md:row-span-2 relative rounded-[16px] overflow-hidden shadow-soft group"
        >
          <img src="/pheta_by_nihar_tambde_1645633815_2780100398651064414_2400202343.webp" alt="Gallery 1" className="w-full h-full object-cover object-top md:object-center transform group-hover:scale-105 transition-transform duration-700" />
        </motion.div>

        {/* Top Right Images */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden shadow-soft group"
        >
          <img src="/pheta_by_nihar_tambde_1654463102_2854165829931617736_2400202343.webp" alt="Gallery 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden shadow-soft group"
        >
          <img src="/pheta_by_nihar_tambde_1665393499_2945856640876056884_2400202343.webp" alt="Gallery 3" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 object-top" />
        </motion.div>

        {/* Bottom Right Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden shadow-soft group"
        >
          <img src="/pheta_by_nihar_tambde_1665393890_2945859920821826134_2400202343.webp" alt="Gallery 4" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        </motion.div>

        {/* View Gallery Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="col-span-1 row-span-1 bg-[#6E1E18] rounded-[16px] flex flex-col items-center justify-center text-white cursor-pointer hover:bg-[#7D201D] transition-colors shadow-soft text-center p-2"
        >
          <ImageIcon className="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-4 text-[#D7A65B]" />
          <span className="font-serif text-sm md:text-lg font-medium">View Full Gallery</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-1 md:mt-2" />
        </motion.div>

      </div>
    </section>
  );
};
