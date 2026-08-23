import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Map, Star, Users, CalendarCheck, Crown } from 'lucide-react';

const CountUpNumber: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '+',
  duration = 3000
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Smooth ease-out cubic curve
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutCubic * target);
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

export const ServicesStatistics: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#D7A65B]" strokeWidth={1.5} />,
      content: <CountUpNumber target={7000} duration={3000} />,
      subtitle: "Happy Clients"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-[#D7A65B]" strokeWidth={1.5} />,
      content: <CountUpNumber target={2000} duration={3000} />,
      subtitle: "Events Completed"
    },
    {
      icon: <Crown className="w-8 h-8 text-[#D7A65B]" strokeWidth={1.5} />,
      content: <CountUpNumber target={100} duration={3000} />,
      subtitle: "Pheta Designs"
    },
    {
      icon: <Star className="w-8 h-8 text-[#D7A65B]" strokeWidth={1.5} />,
      content: <CountUpNumber target={10} duration={3000} />,
      subtitle: "Years Experience"
    },
    {
      icon: <Map className="w-8 h-8 text-[#D7A65B]" strokeWidth={1.5} />,
      content: "Trusted Across",
      subtitle: "Maharashtra"
    },
  ];

  return (
    <section className="w-full relative z-20 -mt-16 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-xl border border-[#E8D8C5] px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 items-center"
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center gap-3">
            <div className="flex-shrink-0">
              {stat.icon}
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl text-[#4D2D22] font-bold block mb-1">
                {stat.content}
              </span>
              <span className="font-sans text-[#666666] text-xs md:text-sm font-medium uppercase tracking-wider block">
                {stat.subtitle}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
