import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { Crown, Tent, Briefcase, GraduationCap, Star, Shield, Heart, Award } from 'lucide-react';

const AVAILABLE_ICONS: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-8 h-8 text-[#C48B3C]" />,
  Tent: <Tent className="w-8 h-8 text-[#C48B3C]" />,
  Briefcase: <Briefcase className="w-8 h-8 text-[#C48B3C]" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-[#C48B3C]" />,
  Star: <Star className="w-8 h-8 text-[#C48B3C]" />,
  Shield: <Shield className="w-8 h-8 text-[#C48B3C]" />,
  Heart: <Heart className="w-8 h-8 text-[#C48B3C]" />,
  Award: <Award className="w-8 h-8 text-[#C48B3C]" />,
};

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  moreInfo?: string;
}

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiFetch('/services');
        if (data) {
          setServices(data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        
        <section className="py-20 md:py-32 bg-[#F8F3EC] relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #6E1E18 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                Professional Craftsmanship
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight">
                Pheta Services & Workshops
              </h2>
              <div className="w-24 h-1 bg-[#D7A65B] mx-auto mt-6 md:mt-8"></div>
              <p className="mt-8 text-lg text-[#666666] font-sans leading-relaxed">
                Elevate your events with our specialized Pheta tying services and learn the art yourself through our exclusive workshops.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {services.map((service, index) => (
                  <div key={service._id} className={`group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-500 border border-[#E8D8C5] ${index % 2 === 1 ? 'lg:translate-y-12' : ''}`}>
                    <div className="h-64 sm:h-80 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img 
                        src={getApiImageUrl(service.image)} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg text-[#6E1E18]">
                          {AVAILABLE_ICONS[service.icon] || <Crown className="w-8 h-8" />}
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-white font-bold drop-shadow-md">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-10">
                      <p className="text-[#666666] font-sans text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      {service.moreInfo && (
                        <div className="bg-[#F8F3EC] p-6 rounded-2xl border border-[#E8D8C5]">
                          <h4 className="font-sans font-bold text-[#4D2D22] text-sm uppercase tracking-wider mb-3">Service Details</h4>
                          <p className="text-[#666666] font-sans text-sm leading-relaxed whitespace-pre-wrap">
                            {service.moreInfo}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-8 flex justify-end">
                        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-[#6E1E18] text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#6E1E18] hover:text-white transition-colors">
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
