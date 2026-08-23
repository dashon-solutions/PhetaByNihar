import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../../utils/api';

interface MediaLogoData {
  _id?: string;
  name: string;
  image?: string;
  color?: string;
  link?: string;
}

export const MediaRecognition: React.FC = () => {
  const [logos, setLogos] = useState<MediaLogoData[]>([
    { name: 'Lokmat', color: '#6E1E18' },
    { name: 'Sakal', color: '#1a56db' },
    { name: 'ABP', color: '#000000' },
    { name: 'TV9', color: '#cc0000' }
  ]);

  useEffect(() => {
    const fetchMediaLogos = async () => {
      try {
        const data = await apiFetch('/media');
        if (data && data.length > 0) {
          setLogos(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic media logos, using fallback:', err);
      }
    };
    fetchMediaLogos();
  }, []);

  return (
    <section className="py-8 md:py-12 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto border-t border-[#E8D8C5]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center">
          <div className="h-[1px] w-8 bg-[#C48B3C] hidden md:block"></div>
          <h2 className="px-4 text-sm font-sans tracking-[0.2em] uppercase text-[#C48B3C] font-bold whitespace-nowrap">
            Media Recognition
          </h2>
          <div className="h-[1px] w-8 bg-[#C48B3C] hidden md:block"></div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-start gap-8 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
           {logos.map((logo, idx) => {
             const inner = logo.image ? (
               <img src={getApiImageUrl(logo.image)} alt={logo.name} className="max-h-8 w-auto object-contain transition-transform hover:scale-105" />
             ) : (
               <span 
                 className="font-serif font-bold text-2xl transition-transform hover:scale-105" 
                 style={{ color: logo.color || '#6E1E18' }}
               >
                 {logo.name}
               </span>
             );

             return logo.link ? (
               <a
                 key={logo._id || idx}
                 href={logo.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-100 group"
                 title={`Visit ${logo.name} feature`}
               >
                 {inner}
                 <ExternalLink className="w-3 h-3 text-[#C48B3C] opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
             ) : (
               <React.Fragment key={logo._id || idx}>
                 {inner}
               </React.Fragment>
             );
           })}
        </div>

        <button className="flex items-center text-[#4D2D22] font-sans text-sm font-bold border border-[#E8D8C5] px-6 py-2 rounded bg-white hover:bg-[#F8F3EC] transition-colors">
          View All Features <ArrowRight className="ml-2 w-4 h-4" />
        </button>

      </div>
    </section>
  );
};

