import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MousePointerClick, CalendarCheck, Truck, Crown, Heart } from 'lucide-react';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Consultation",
      desc: "Share your event details with us"
    },
    {
      icon: <MousePointerClick className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Choose Pheta",
      desc: "Select from our premium collection"
    },
    {
      icon: <CalendarCheck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Book Date",
      desc: "Confirm your date and requirements"
    },
    {
      icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Our Team Arrives",
      desc: "Our team reaches on time"
    },
    {
      icon: <Crown className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Traditional Ceremony",
      desc: "Experience the royal pheta ceremony"
    },
    {
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Royal Experience",
      desc: "Create memories that last forever"
    }
  ];

  return (
    <section className="bg-[#4D2D22] py-20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #D7A65B 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
        <div className="mb-16">
          <span className="text-[#D7A65B] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
            OUR PROCESS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white">How We Work</h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-[5%] right-[5%] h-[1px] border-t border-dashed border-[#D7A65B]/50"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#D7A65B] text-[#4D2D22] flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h4 className="font-serif text-sm md:text-base text-white font-bold mb-2">
                  {step.title}
                </h4>
                <p className="font-sans text-[#E8D8C5] text-[10px] md:text-xs leading-relaxed max-w-[150px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
