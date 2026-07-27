import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';

export const AboutSection: React.FC = () => {
  // const features = [
  //   {
  //     icon: <Landmark className="w-6 h-6 text-[#C48B3C]" strokeWidth={1.5} />,
  //     text: "Traditional Maharashtrian Heritage"
  //   },
  //   {
  //     icon: <Crown className="w-6 h-6 text-[#C48B3C]" strokeWidth={1.5} />,
  //     text: "Elegant, Authentic & Royal Pheta Styles"
  //   },
  //   {
  //     icon: <Users className="w-6 h-6 text-[#C48B3C]" strokeWidth={1.5} />,
  //     text: "Personalized Ceremonies for Every Occasion"
  //   },
  //   {
  //     icon: <Heart className="w-6 h-6 text-[#C48B3C]" strokeWidth={1.5} />,
  //     text: "Passion, Perfection & Cultural Pride"
  //   }
  // ];

  return (
    <section id="about" className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto relative">

      {/* Decorative Mandala on the right edge */}
      <div className="absolute right-0 bottom-0 opacity-100 pointer-events-none z-0">
        <div className="relative">
          <img src="/aboutnewiamge.png" alt="" className="w-[400px] md:w-[600px] lg:w-[800px] mix-blend-multiply object-contain object-bottom" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-stretch relative z-10">

        {/* Left Side: Portrait Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[35%] relative shrink-0"
        >
          <div className="relative rounded-[24px] overflow-hidden shadow-soft h-full min-h-[350px] md:min-h-[450px]">
            <img
              src="/about_portrait.webp"
              alt="Nihar Tambde Portrait"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Middle: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[48%] flex flex-col items-start justify-start py-4 shrink-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal mb-2">
            A Tradition Passed <br /> Down with <span className="italic font-light text-[#C48B3C]">Pride</span>
          </h2>
          <Divider className="ml-0 max-w-[400px] mb-4" />
          {/* Decorative Divider */}
          <p className="text-[#4D2D22] font-sans text-sm md:text-base leading-relaxed mb-6 font-medium">
            With deep respect for Maharashtrian culture and years of dedicated practice, Nihar Tambde keeps the royal tradition of Pheta tying alive. Each fold is more than just cloth – it's an emotion, a symbol of respect, honor and our glorious heritage.
          </p>



          <div>
            <Button variant="secondary" className="flex items-center text-sm px-6 py-2.5">
              Know More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

