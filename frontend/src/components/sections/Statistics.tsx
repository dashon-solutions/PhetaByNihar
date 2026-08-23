import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Landmark, Star } from 'lucide-react';

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

export const Statistics: React.FC = () => {
  const stats = [
    {
      icon: <Award className="w-7 h-7 md:w-10 md:h-10 text-[#C48B3C]" strokeWidth={1} />,
      content: (
        <>
          <span className="font-serif text-base sm:text-lg md:text-xl text-[#4D2D22] font-bold block mb-0.5">
            <CountUpNumber target={2000} duration={3000} />
          </span>
          <span className="block">Ceremonies</span>
          <span className="block">Performed</span>
        </>
      )
    },
    {
      icon: <Users className="w-7 h-7 md:w-10 md:h-10 text-[#C48B3C]" strokeWidth={1} />,
      content: (
        <>
          <span className="font-serif text-base sm:text-lg md:text-xl text-[#4D2D22] font-bold block mb-0.5">
            <CountUpNumber target={7000} duration={3000} />
          </span>
          <span className="block">Happy Families</span>
          <span className="block">& Clients</span>
        </>
      )
    },
    {
      icon: <Landmark className="w-7 h-7 md:w-10 md:h-10 text-[#C48B3C]" strokeWidth={1} />,
      content: (
        <>
          <span className="font-serif text-base sm:text-lg md:text-xl text-[#4D2D22] font-bold block mb-0.5">
            <CountUpNumber target={10} duration={3000} />
          </span>
          <span className="block">Years of</span>
          <span className="block">Experience</span>
        </>
      )
    },
    {
      icon: <Star className="w-7 h-7 md:w-10 md:h-10 text-[#C48B3C]" strokeWidth={1} />,
      content: (
        <>
          <span className="font-serif text-base sm:text-lg md:text-xl text-[#4D2D22] font-bold block mb-0.5">
            <CountUpNumber target={100} duration={3000} />
          </span>
          <span className="block md:mt-1">Trusted by</span>
          <span className="block">Celebrities</span>
        </>
      )
    },
  ];

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-[16px] shadow-soft border border-[#E8D8C5] px-4 py-6 md:px-10 md:py-8 grid grid-cols-2 lg:flex lg:flex-nowrap justify-between items-center gap-y-6 gap-x-2 md:gap-x-4"
      >
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-2 sm:gap-4 flex-1"
            >
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <div className="font-sans text-[#4D2D22] text-[10px] sm:text-xs md:text-sm font-medium leading-tight">
                {stat.content}
              </div>
            </motion.div>

            {/* Vertical Divider (hide on last element and adjust for mobile wrap) */}
            {index < stats.length - 1 && (
              <div className="hidden lg:block w-[1px] h-12 bg-[#E8D8C5] flex-shrink-0 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
};
