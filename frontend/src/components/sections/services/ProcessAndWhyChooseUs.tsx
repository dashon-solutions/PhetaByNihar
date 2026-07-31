import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MousePointerClick, CalendarCheck, Truck, Crown, Heart, ShieldCheck, Users, Scissors, Star, Clock, UserCheck } from 'lucide-react';

export const ProcessAndWhyChooseUs: React.FC = () => {
  const steps = [
    { icon: <MessageSquare className="w-4 h-4" />, title: "Consultation", desc: "Share your event details with us" },
    { icon: <MousePointerClick className="w-4 h-4" />, title: "Choose Pheta", desc: "Select from our premium collection" },
    { icon: <CalendarCheck className="w-4 h-4" />, title: "Book Date", desc: "Confirm your date and requirements" },
    { icon: <Truck className="w-4 h-4" />, title: "Our Team Arrives", desc: "Our team reaches on time" },
    { icon: <Crown className="w-4 h-4" />, title: "Traditional Ceremony", desc: "Experience the royal pheta ceremony" },
    { icon: <Heart className="w-4 h-4" />, title: "Royal Experience", desc: "Create memories that last forever" }
  ];

  const reasons = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Authentic Maharashtrian Tradition" },
    { icon: <Users className="w-6 h-6" />, title: "5000+ Happy Customers" },
    { icon: <Scissors className="w-6 h-6" />, title: "Expert Craftsmen" },
    { icon: <Star className="w-6 h-6" />, title: "Premium Quality Fabric" },
    { icon: <Clock className="w-6 h-6" />, title: "Always On Time" },
    { icon: <UserCheck className="w-6 h-6" />, title: "Personalized Experience" }
  ];

  return (
    <section className="bg-[#3D1A11] py-20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #D7A65B 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* Left: How We Work */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                OUR PROCESS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">How We Work</h2>
            </div>

            <div className="relative">
              {/* Vertical connecting line for mobile, horizontal for desktop (wrapping) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4 relative">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center group relative"
                  >
                    {/* Dashed line connecting circles */}
                    {index !== steps.length - 1 && (
                       <div className="hidden sm:block absolute top-6 left-[60%] w-[80%] h-[1px] border-t border-dashed border-[#D7A65B]/30 -z-10"></div>
                    )}
                    
                    <div className="w-12 h-12 rounded-full bg-[#D7A65B] text-[#4D2D22] flex items-center justify-center mb-4 relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <h4 className="font-serif text-[13px] text-white font-bold mb-1">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[#E8D8C5] text-[10px] leading-tight max-w-[120px]">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Why Choose Us */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Why Choose Pheta By Nihar?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 border border-[#D7A65B]/20 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#D7A65B] shrink-0">
                    {reason.icon}
                  </div>
                  <h4 className="font-sans text-sm font-medium text-white leading-tight">
                    {reason.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
