import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { PageBanner } from '../components/sections/PageBanner';
import { Footer } from '../components/sections/Footer';
import { InquiryModal } from '../components/ui/InquiryModal';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { Calendar, Clock } from 'lucide-react';

interface OfferedClass {
  title: string;
  description: string;
  image: string;
}

interface ClassBatch {
  batchName: string;
  startDate: string;
  duration: string;
  status: string;
  image: string;
}

interface AboutData {
  heading: string;
  italicHeading: string;
  text: string;
  portraitImage: string;
  backgroundImage: string;
  journey: string;
  passion: string;
  experience: string;
  brandStory: string;
  offeredClasses?: OfferedClass[];
  classBatches?: ClassBatch[];
}

export const AboutUsPage: React.FC = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await apiFetch('/about');
        if (data) {
          setAbout(data);
        }
      } catch (err) {
        console.error('Failed to fetch about us details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageBanner pageName="about" />
        
        {/* Main About Section */}
        <section className="py-20 md:py-32 bg-[#F8F3EC] relative overflow-hidden" id="about">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #6E1E18 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
          
          {about?.backgroundImage && (
            <img 
              src={getApiImageUrl(about.backgroundImage)} 
              alt="Decorative Mandala" 
              className="absolute -top-20 -right-20 w-96 opacity-20 pointer-events-none"
            />
          )}

          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                {/* Image Side */}
                <div className="w-full lg:w-5/12 relative">
                  <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                    <img 
                      src={getApiImageUrl(about?.portraitImage || '/about_portrait.webp')} 
                      alt="Nihar Tambde" 
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -inset-4 border-2 border-[#D7A65B] rounded-[3rem] -z-10 transform translate-x-4 translate-y-4"></div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-7/12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-0.5 bg-[#D7A65B]"></div>
                    <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em]">Our Story</span>
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight mb-8">
                    {about?.heading} <br className="hidden md:block" />
                    <span className="italic font-light text-[#D7A65B]">{about?.italicHeading}</span>
                  </h2>
                  
                  <div className="prose prose-lg text-[#666666] font-sans leading-relaxed whitespace-pre-wrap">
                    {about?.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Detailed Info Grid */}
        {!loading && (about?.journey || about?.passion || about?.experience || about?.brandStory) && (
          <section className="py-20 md:py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {about?.journey && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-3xl text-[#4D2D22] flex items-center gap-3">
                      <div className="w-8 h-px bg-[#D7A65B]"></div>
                      Our Journey
                    </h3>
                    <p className="text-[#666666] font-sans leading-relaxed whitespace-pre-wrap pl-11 border-l border-[#E8D8C5] ml-4">
                      {about.journey}
                    </p>
                  </div>
                )}
                {about?.passion && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-3xl text-[#4D2D22] flex items-center gap-3">
                      <div className="w-8 h-px bg-[#D7A65B]"></div>
                      Our Passion
                    </h3>
                    <p className="text-[#666666] font-sans leading-relaxed whitespace-pre-wrap pl-11 border-l border-[#E8D8C5] ml-4">
                      {about.passion}
                    </p>
                  </div>
                )}
                {about?.experience && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-3xl text-[#4D2D22] flex items-center gap-3">
                      <div className="w-8 h-px bg-[#D7A65B]"></div>
                      Our Experience
                    </h3>
                    <p className="text-[#666666] font-sans leading-relaxed whitespace-pre-wrap pl-11 border-l border-[#E8D8C5] ml-4">
                      {about.experience}
                    </p>
                  </div>
                )}
                {about?.brandStory && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-3xl text-[#4D2D22] flex items-center gap-3">
                      <div className="w-8 h-px bg-[#D7A65B]"></div>
                      Brand Story
                    </h3>
                    <p className="text-[#666666] font-sans leading-relaxed whitespace-pre-wrap pl-11 border-l border-[#E8D8C5] ml-4">
                      {about.brandStory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Classes Section */}
        {!loading && about?.offeredClasses && about.offeredClasses.length > 0 && (
          <section className="py-20 md:py-32 bg-[#F8F3EC] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                  Learn The Art
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight">
                  Masterclass & Workshops
                </h2>
                <div className="w-24 h-1 bg-[#D7A65B] mx-auto mt-6 md:mt-8"></div>
                <p className="mt-8 text-lg text-[#666666] font-sans leading-relaxed">
                  Join our exclusive classes to master the intricate art of Maharashtrian Pheta tying. Suitable for beginners and professionals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {about.offeredClasses.map((cls, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 border border-[#E8D8C5] group flex flex-col">
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={getApiImageUrl(cls.image)} 
                        alt={cls.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-4">{cls.title}</h3>
                      <p className="font-sans text-sm text-[#666666] leading-relaxed flex-1">
                        {cls.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Class Batches Section */}
        {!loading && about?.classBatches && about.classBatches.length > 0 && (
          <section className="py-20 md:py-24 bg-white border-t border-[#E8D8C5]">
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#E8D8C5] pb-8">
                <div>
                  <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                    Admissions Open
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-[#4D2D22]">
                    Upcoming Batches
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {about.classBatches.map((batch, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row bg-[#F8F3EC] rounded-2xl overflow-hidden border border-[#E8D8C5] hover:shadow-lg transition-shadow">
                    <div className="sm:w-2/5 h-48 sm:h-auto relative">
                      <img 
                        src={getApiImageUrl(batch.image || '/placeholder-class.jpg')} 
                        alt={batch.batchName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#6E1E18] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">
                        {batch.status}
                      </div>
                    </div>
                    <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                      <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-4">{batch.batchName}</h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-[#666666] font-sans text-sm">
                          <Calendar className="w-5 h-5 text-[#D7A65B]" />
                          <span>Starts: <strong>{batch.startDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-[#666666] font-sans text-sm">
                          <Clock className="w-5 h-5 text-[#D7A65B]" />
                          <span>Duration: <strong>{batch.duration}</strong></span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => {
                            setSelectedClass(`Batch: ${batch.batchName}`);
                            setIsModalOpen(true);
                          }}
                          className="inline-block text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-wider hover:text-[#D7A65B] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#D7A65B] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                        >
                          Enquire Now &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      
      <InquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="class"
        subject={selectedClass}
      />
    </>
  );
};
