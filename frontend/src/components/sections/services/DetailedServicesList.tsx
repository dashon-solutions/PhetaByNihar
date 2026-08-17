import React, { useState, useEffect } from 'react';
import { 
  Heart, Crown, Palette, Users, 
  Tent, Award, Landmark, Star, 
  Briefcase, Presentation,
  Mic, Flag, Shield, Plane, MapPin, Sparkles, Video, Ticket
} from 'lucide-react';
import { Divider } from '../../ui/Divider';
import { apiFetch, getApiImageUrl } from '../../../utils/api';

const AVAILABLE_ICONS: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-4 h-4" />,
  Tent: <Tent className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  GraduationCap: <Crown className="w-4 h-4" />,
  Star: <Star className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Landmark: <Landmark className="w-4 h-4" />,
  Flag: <Flag className="w-4 h-4" />,
  Presentation: <Presentation className="w-4 h-4" />,
  Mic: <Mic className="w-4 h-4" />,
  Video: <Video className="w-4 h-4" />,
  Ticket: <Ticket className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Plane: <Plane className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />
};

interface SubFeature {
  icon: string;
  label: string;
}

interface DetailedService {
  _id: string;
  title: string;
  description: string;
  image: string;
  features: SubFeature[];
}

export const DetailedServicesList: React.FC = () => {
  const [services, setServices] = useState<DetailedService[]>([]);
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

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#F8F3EC]">
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#F8F3EC]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
        
        <div className="text-center mb-12">
          <span className="text-[#D7A65B] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
            WHAT WE OFFER
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] mb-1">Our Specialized Services</h2>
          <Divider className="max-w-[450px] my-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const displayId = (index + 1).toString().padStart(2, '0');
            
            return (
              <div 
                key={service._id} 
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8D8C5] shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Image Section - Perfect aspect-[4/5] with object-top for vertical photos */}
                <div className="w-full aspect-[4/5] relative overflow-hidden bg-[#F4EDE4]">
                  <img 
                    src={getApiImageUrl(service.image)} 
                    alt={service.title} 
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg text-[#4D2D22] font-serif font-bold text-sm px-3 py-1 shadow-md border border-[#E8D8C5]">
                    {displayId}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif text-xl text-[#4D2D22] mb-3 line-clamp-1">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-[#666666] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-[#E8D8C5]/50 pt-4 mt-auto">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-8 h-8 shrink-0 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B]">
                            {AVAILABLE_ICONS[feature.icon] || <Star className="w-4 h-4" />}
                          </div>
                          <span className="font-sans text-[11px] font-bold text-[#4D2D22] leading-tight line-clamp-2">
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {services.length === 0 && (
            <div className="col-span-full text-center text-[#666666] font-sans text-lg py-10">
              No services available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
