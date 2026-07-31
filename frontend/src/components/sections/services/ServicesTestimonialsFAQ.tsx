import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../../../utils/api';

interface TestimonialData {
  _id?: string;
  source?: 'manual' | 'google';
  quote?: string;
  name?: string;
  location?: string;
  rating?: number;
  image?: string;
  googleMapUrl?: string;
  event?: string;
}

export const ServicesTestimonialsFAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  const faqs = [
    { q: "How many people can your team manage in one event?", a: "Our team is equipped to manage events of all sizes, from intimate gatherings to large weddings with hundreds of guests needing a Pheta." },
    { q: "Do you provide services outside Maharashtra?", a: "Yes, we provide our premium Pheta services across India and internationally for special destination weddings and events." },
    { q: "Can we choose custom colors and styles?", a: "Absolutely. We offer a wide range of fabrics, colors, and tying styles. We can customize them to match your event's theme." },
    { q: "How early should we book your services?", a: "We recommend booking at least 2-3 months in advance, especially during the peak wedding seasons, to ensure availability." },
    { q: "Do you provide destination wedding services?", a: "Yes, we specialize in destination weddings and can travel with our team to bring tradition to your special location." },
    { q: "What is included in your Pheta service?", a: "Our service includes the premium fabric, expert tying by our craftsmen at your venue, and styling consultation." }
  ];

  const defaultTestimonials: TestimonialData[] = [
    {
      source: 'manual',
      quote: "The Pheta service by Nihar was outstanding! The team was professional, punctual and made our wedding even more special.",
      name: "Rohit & Sneha Patil",
      location: "Pune, Maharashtra",
      event: "Wedding Ceremony",
      image: "https://images.unsplash.com/photo-1583089892943-e02e52f17004?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5
    },
    {
      source: 'manual',
      quote: "Exceptional quality and truly royal experience. Highly recommend their services for any grand occasion.",
      name: "Amit & Priya Deshmukh",
      location: "Mumbai, Maharashtra",
      event: "Reception",
      image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5
    }
  ];

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await apiFetch('/testimonials');
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error('Failed to load testimonials', err);
        setTestimonials(defaultTestimonials);
      }
    };
    loadTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial] || defaultTestimonials[0];

  return (
    <section className="bg-[#2D120B] py-24 relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* Left: Testimonials */}
          <div className="flex flex-col">
            <div className="mb-10">
              <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                WHAT OUR CLIENTS SAY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Client Testimonials</h2>
            </div>

            <div className="relative border border-[#D7A65B]/30 rounded-2xl p-8 md:p-10 bg-white/5 min-h-[400px]">
              {(!currentTestimonial.source || currentTestimonial.source === 'manual') && (
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#D7A65B]/20" />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full w-full"
                >
                  {(!currentTestimonial.source || currentTestimonial.source === 'manual') ? (
                    <>
                      <div className="flex gap-1 text-[#D7A65B] mb-6">
                        {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>

                      <p className="font-serif text-white text-lg md:text-xl leading-relaxed mb-10 italic flex-grow">
                        "{currentTestimonial.quote}"
                      </p>

                      <div className="flex items-center gap-4 mt-auto">
                        <img
                          src={getApiImageUrl(currentTestimonial.image || '')}
                          alt={currentTestimonial.name || 'Client'}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#D7A65B]"
                        />
                        <div>
                          <h4 className="text-white font-sans font-bold text-sm">
                            - {currentTestimonial.name}
                          </h4>
                          <p className="text-[#E8D8C5]/70 font-sans text-xs">
                            {currentTestimonial.location}
                          </p>
                        </div>
                        {currentTestimonial.event && (
                          <div className="ml-auto text-right">
                            <p className="text-[#D7A65B] font-sans text-[10px] uppercase tracking-wider font-bold">
                              {currentTestimonial.event}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex-grow flex flex-col pt-2 min-h-[300px]">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1 text-[#D7A65B]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#4285F4] bg-[#4285F4]/10 px-2 py-1 rounded">Google Review</span>
                      </div>
                      <div 
                        className="w-full flex-grow rounded-xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:min-h-[250px]"
                        dangerouslySetInnerHTML={{ __html: currentTestimonial.googleMapUrl || '' }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {testimonials.length > 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 w-full pointer-events-none">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 -ml-5 bg-[#4D2D22] border border-[#D7A65B]/50 rounded-full flex items-center justify-center text-[#D7A65B] hover:bg-[#D7A65B] hover:text-[#4D2D22] transition-colors pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 -mr-5 bg-[#4D2D22] border border-[#D7A65B]/50 rounded-full flex items-center justify-center text-[#D7A65B] hover:bg-[#D7A65B] hover:text-[#4D2D22] transition-colors pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="flex flex-col">
            <div className="mb-10">
              <span className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Have Questions?</h2>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border border-[#D7A65B]/30 rounded-xl overflow-hidden transition-colors ${activeFaq === index ? 'bg-[#4D2D22]' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-sans text-sm text-white font-medium pr-8">
                      {faq.q}
                    </span>
                    <span className="text-[#D7A65B] shrink-0">
                      {activeFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-0 text-[#E8D8C5] font-sans text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
