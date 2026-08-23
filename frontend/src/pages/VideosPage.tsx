import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { YoutubeIcon } from '../components/ui/SocialIcons';
import { Play, ExternalLink, Video as VideoIcon } from 'lucide-react';
import { apiFetch } from '../utils/api';

interface VideoItem {
  _id?: string;
  title: string;
  channel: string;
  url: string;
}

const formatYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
};

const getWatchUrl = (url: string): string => {
  if (!url) return 'https://www.youtube.com/channel/UCyIW3yq9Vyt9fAIe8x_EWtg';
  if (url.includes('/embed/')) {
    const id = url.split('/embed/')[1]?.split('?')[0];
    if (id) return `https://www.youtube.com/watch?v=${id}`;
  }
  return url;
};

import { fallbackVideos } from '../data/fallbackData';

export const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(fallbackVideos as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const dynamicVideos = await apiFetch('/videos');
        if (dynamicVideos && Array.isArray(dynamicVideos) && dynamicVideos.length > 0) {
          setVideos(dynamicVideos);
        } else {
          setVideos(fallbackVideos as any);
        }
      } catch (err) {
        console.warn('Could not fetch videos from database, using fallback:', err);
        setVideos(fallbackVideos as any);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F3EC]"
    >
      <SEO
        title="YouTube Videos & Masterclass Demonstrations | Pheta By Nihar"
        description="Watch exclusive Pheta tying tutorials, royal groom styling videos, celebrity interviews, and cultural heritage demonstrations by Nihar Tambde."
        keywords="Pheta Videos, Pheta Tying Tutorial, YouTube Pheta By Nihar, Marathi Turban Video, How to Tie Pheta, Nihar Tambde Interview"
        canonicalUrl="https://phetabynihar.com/videos"
        ogImage="/hero_groom.png"
      />
      <Navbar theme="light" />

      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1E18]/10 text-[#6E1E18] text-xs font-sans tracking-[0.2em] uppercase font-bold mb-3">
              <Play className="w-3.5 h-3.5 fill-[#6E1E18]" />
              <span>Video Gallery</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-2">
              Watch the Royal Art in <span className="italic font-light text-[#C48B3C]">Motion</span>
            </h1>
            <Divider className="max-w-[400px] my-1" />
            <p className="mt-3 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
              Explore our masterclass tutorials, royal wedding styling moments, celebrity features, and news interviews.
            </p>
          </motion.div>

          {/* Channel Subscribe Callout Banner */}


          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center text-[#666666] font-sans text-sm">
              Loading videos...
            </div>
          )}

          {/* Empty State when no videos exist in database */}
          {!loading && videos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#E8D8C5] text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8F3EC] flex items-center justify-center text-red-600 mx-auto mb-4 border border-[#E8D8C5]">
                <VideoIcon className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D2D22] mb-2">
                No Videos Added Yet
              </h2>
              <p className="text-sm text-[#666666] font-sans leading-relaxed mb-6 max-w-md mx-auto">
                We are currently uploading new tutorials and media conversations. Visit our official YouTube channel in the meantime!
              </p>
              <a
                href="https://www.youtube.com/channel/UCyIW3yq9Vyt9fAIe8x_EWtg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            </motion.div>
          )}

          {/* Video Cards Grid (Rendered when videos exist) */}
          {!loading && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.map((video, idx) => (
                <motion.div
                  key={video._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8D8C5] hover:border-[#C48B3C]/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* YouTube Player Iframe */}
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

                  {/* Video Meta Info */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-[#FAF6F0]">
                    <h3 className="font-serif text-[#4D2D22] font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-4 group-hover:text-[#6E1E18] transition-colors">
                      {video.title}
                    </h3>

                    <div className="pt-3 border-t border-[#E8D8C5]/70 flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-[#D4AF37]/40 bg-[#4D1217] flex items-center justify-center text-[#F3D18A] text-[10px] font-bold">
                          {video.channel?.[0] || 'P'}
                        </div>
                        <span className="truncate text-[#666666] font-medium text-xs">
                          {video.channel || 'Pheta By Nihar'}
                        </span>
                      </div>

                      <a
                        href={getWatchUrl(video.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C48B3C] hover:text-[#6E1E18] transition-colors uppercase tracking-wider shrink-0"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </motion.div>
  );
};
