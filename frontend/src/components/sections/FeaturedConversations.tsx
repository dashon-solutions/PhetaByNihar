import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Divider } from '../ui/Divider';
import { apiFetch } from '../../utils/api';

interface VideoData {
  _id?: string;
  title: string;
  channel: string;
  url: string;
}

export const FeaturedConversations: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([
    { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
    { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
    { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
    { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
    { title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar', channel: 'Zee Marathi', url: 'https://www.youtube.com/embed/OkjwpA-MdNc' },
  ]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiFetch('/videos');
        if (data && data.length > 0) {
          setVideos(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic videos, using fallback:', err);
      }
    };
    fetchVideos();
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-8 md:mb-12 relative"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal">
          Featured <span className="italic font-light text-[#C48B3C]">Conversations</span>
        </h2>
        <Divider />
      </motion.div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 md:mb-12">
        {/* Large Featured Video */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-2 bg-white rounded-[16px] overflow-hidden shadow-soft border border-[#E8D8C5] group flex flex-col"
        >
          <div className="relative h-[160px] sm:h-[200px] md:h-[300px] overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src={videos[0].url}
              title={videos[0].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>
          <div className="p-2.5 md:p-4 flex-grow flex flex-col justify-between">
            <h4 className="font-serif text-[#4D2D22] font-bold text-sm md:text-lg leading-snug mb-1 md:mb-2 line-clamp-2">{videos[0].title}</h4>
            <div className="text-[10px] md:text-xs text-[#999999] font-sans flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 border border-gray-300">
                <img src={`https://ui-avatars.com/api/?name=${videos[0].channel.charAt(0)}&background=random`} alt="" className="w-full h-full" />
              </div>
              {videos[0].channel}
            </div>
          </div>
        </motion.div>

        {/* Small Video Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
          {videos.slice(1).map((video, idx) => (
            <motion.div
              key={video._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-[12px] md:rounded-[16px] overflow-hidden shadow-soft border border-[#E8D8C5] group flex flex-col"
            >
              <div className="relative h-20 sm:h-24 md:h-40 overflow-hidden bg-black">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
              <div className="p-2 md:p-4 flex-grow flex flex-col justify-between">
                <h4 className="font-serif text-[#4D2D22] font-bold text-[9px] sm:text-[10px] md:text-sm leading-tight md:leading-snug mb-1 md:mb-3 line-clamp-2 md:line-clamp-2">{video.title}</h4>
                <div className="text-[8px] sm:text-[10px] md:text-xs text-[#999999] font-sans flex items-center gap-1 md:gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img src={`https://ui-avatars.com/api/?name=${video.channel.charAt(0)}&background=random`} alt="" className="w-full h-full" />
                  </div>
                  {video.channel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

