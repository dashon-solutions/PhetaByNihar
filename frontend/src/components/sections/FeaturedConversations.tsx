import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ExternalLink, Play } from 'lucide-react';
import { Divider } from '../ui/Divider';
import { Button } from '../ui/Button';
import { apiFetch } from '../../utils/api';

interface VideoData {
  _id?: string;
  title: string;
  channel: string;
  url: string;
}

const formatYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;

  // Extract video ID from common YouTube formats: watch?v=ID, youtu.be/ID, shorts/ID
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
};

const getWatchUrl = (url: string): string => {
  if (!url) return 'https://www.youtube.com';
  if (url.includes('/embed/')) {
    const id = url.split('/embed/')[1]?.split('?')[0];
    if (id) return `https://www.youtube.com/watch?v=${id}`;
  }
  return url;
};

export const FeaturedConversations: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([
    {
      title: 'अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक आणि फेटयाबद्दलचा विशेष अभिप्राय नक्की बघा @PhetabyNihar',
      channel: 'Zee Marathi',
      url: 'https://www.youtube.com/embed/OkjwpA-MdNc'
    },
    {
      title: 'Special Interview on Maharashtra Day (1 May) conducted by Maharashtra Times',
      channel: 'Cultural Diaries',
      url: 'https://www.youtube.com/embed/OkjwpA-MdNc'
    },
    {
      title: 'How the Turban of Kondhanpur’s Mankaris Was Tied',
      channel: 'Pheta By Nihar',
      url: 'https://www.youtube.com/embed/OkjwpA-MdNc'
    },
    {
      title: 'News18 Marathi takes note of the history of the Pheta – How might the turban have originated?',
      channel: 'News18',
      url: 'https://www.youtube.com/embed/OkjwpA-MdNc'
    },
    {
      title: 'From Delivery Boy to the Artist Who Ties Phetas for Celebrities – Nihar Tambde',
      channel: 'Loksatta',
      url: 'https://www.youtube.com/embed/OkjwpA-MdNc'
    }
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

  const featuredVideo = videos[0];
  const sideVideos = videos.slice(1, 5);

  return (
    <section className="py-10 md:py-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center mb-8 md:mb-12 relative"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#C48B3C] text-[10px] md:text-xs font-sans tracking-[0.2em] md:tracking-[0.25em] uppercase mb-3 font-semibold">
          <Play className="w-3 h-3 fill-[#C48B3C]" />
          <span>Exclusive Video Showcase</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#000000] tracking-wide font-normal">
          Featured <span className="italic font-light text-[#C48B3C]">Conversations</span>
        </h2>
        <Divider />
      </motion.div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8 md:mb-12">
        {/* Left: Main Featured Spotlight Video Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col bg-[#FFFDFB] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E8D8C5] hover:border-[#C48B3C]/50 hover:shadow-[0_12px_32px_rgba(110,30,24,0.12)] transition-all duration-300 group"
        >
          {/* Spotlight Video Iframe */}
          <div className="relative aspect-video w-full bg-black overflow-hidden">
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#6E1E18]/90 backdrop-blur-md text-[#F8F3EC] text-xs font-medium rounded-full shadow-md border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Spotlight Feature</span>
            </div>
            <iframe
              className="w-full h-full"
              src={formatYouTubeEmbedUrl(featuredVideo.url)}
              title={featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Spotlight Content Area */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#FFFDFB] to-[#FAF6F0]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-wider text-[#C48B3C] bg-[#C48B3C]/10 px-2.5 py-0.5 rounded-full border border-[#C48B3C]/20">
                  Featured Masterclass
                </span>
              </div>
              <h3 className="font-serif text-[#4D2D22] font-bold text-base sm:text-lg md:text-xl leading-snug line-clamp-2 group-hover:text-[#6E1E18] transition-colors">
                {featuredVideo.title}
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E8D8C5]/80 flex items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-[#7A6B65] font-sans flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#D4AF37]/40 shadow-sm">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(featuredVideo.channel || 'P')}&background=4D1217&color=D4AF37`}
                    alt={featuredVideo.channel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-[#4D2D22] block leading-tight text-xs sm:text-sm">
                    {featuredVideo.channel}
                  </span>
                  <span className="text-[10px] text-[#999999] block font-light">Official Feature</span>
                </div>
              </div>

              <a
                href={getWatchUrl(featuredVideo.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#6E1E18] bg-[#6E1E18]/5 hover:bg-[#6E1E18] hover:text-[#FFFDFB] transition-all border border-[#6E1E18]/20 shadow-xs"
              >
                <svg className="w-4 h-4 fill-red-600 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: 2x2 Grid of Related Videos */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {sideVideos.map((video, idx) => (
            <motion.div
              key={video._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#FFFDFB] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E8D8C5] hover:border-[#C48B3C]/50 hover:shadow-[0_8px_24px_rgba(110,30,24,0.1)] transition-all duration-300 group flex flex-col h-full"
            >
              {/* Video Iframe Container */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={formatYouTubeEmbedUrl(video.url)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Info Container */}
              <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#FFFDFB] to-[#FAF6F0]">
                <h4 className="font-serif text-[#4D2D22] font-bold text-xs sm:text-[13px] leading-snug line-clamp-2 mb-2.5 group-hover:text-[#6E1E18] transition-colors">
                  {video.title}
                </h4>

                <div className="pt-2 border-t border-[#E8D8C5]/60 flex items-center justify-between gap-2 mt-auto">
                  <div className="text-[11px] sm:text-xs text-[#7A6B65] font-sans flex items-center gap-1.5 min-w-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex-shrink-0 border border-[#D4AF37]/30">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.channel || 'P')}&background=4D1217&color=D4AF37`}
                        alt={video.channel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="truncate text-[#4D2D22] font-medium text-[11px] sm:text-xs">
                      {video.channel}
                    </span>
                  </div>

                  <a
                    href={getWatchUrl(video.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-semibold text-[#C48B3C] hover:text-[#6E1E18] flex items-center gap-1 whitespace-nowrap flex-shrink-0 transition-colors"
                  >
                    <span>Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* See More Videos CTA Button */}
      <div className="mt-10 md:mt-14 flex justify-center">
        <Link to="/videos">
          <Button variant="primary" showArrow className="px-8 py-3.5 text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-lg">
            See More Videos
          </Button>
        </Link>
      </div>
    </section>
  );
};


