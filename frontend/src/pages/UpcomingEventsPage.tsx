import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { Button } from '../components/ui/Button';
import { InquiryModal } from '../components/ui/InquiryModal';
import { Calendar, Clock, MapPin, Award, CheckCircle, Sparkles } from 'lucide-react';
import { apiFetch, getApiImageUrl } from '../utils/api';

interface EventItem {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
  priceBadge?: string;
}

export const UpcomingEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventForInquiry, setSelectedEventForInquiry] = useState<EventItem | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await apiFetch('/events');
        if (data && Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.warn('Could not fetch events from database:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleOpenInquiry = (event: EventItem) => {
    setSelectedEventForInquiry(event);
    setIsInquiryOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F3EC]"
    >
      <SEO
        title="Upcoming Events & Pheta Masterclasses | Pheta By Nihar"
        description="Explore upcoming workshops, certified masterclasses, cultural festivals, and exhibitions hosted by Pheta By Nihar in Mumbai and Pune. Register and reserve your seat."
        keywords="Pheta Workshop Mumbai, Pheta Classes Pune, Upcoming Pheta Events, Marathi Culture Events Mumbai, Turban Tying Workshop, Nihar Tambde Masterclass"
        canonicalUrl="https://phetabynihar.com/events"
        ogImage="/class1.png"
      />
      <Navbar theme="light" />

      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1E18]/10 text-[#6E1E18] text-xs font-sans tracking-[0.2em] uppercase font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mark Your Calendar</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-2">
              Upcoming <span className="italic font-light text-[#C48B3C]">Events & Workshops</span>
            </h1>
            <Divider className="max-w-[400px] my-1" />
            <p className="mt-3 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
              Explore our certified masterclasses, cultural heritage gatherings, and royal live draping sessions across Maharashtra.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center text-[#666666] font-sans text-sm">
              Loading upcoming events...
            </div>
          )}

          {/* Empty State when no events exist in database */}
          {!loading && events.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#E8D8C5] text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#C48B3C] mx-auto mb-4 border border-[#E8D8C5]">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4D2D22] mb-2">
                No Upcoming Events Scheduled
              </h2>
              <p className="text-sm text-[#666666] font-sans leading-relaxed mb-6 max-w-md mx-auto">
                We are currently preparing new certified masterclasses, workshops, and royal festival schedules. Stay tuned for upcoming batch announcements!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to="/contact">
                  <Button variant="primary" showArrow className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold">
                    Inquire Private Workshop
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Events Grid (Shown only when events exist in DB) */}
          {!loading && events.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map((event, idx) => (
                <motion.div
                  key={event._id || event.id || idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8D8C5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Event Banner Image & Badges */}
                    {event.image && (
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#2A0D0F]">
                        <img
                          src={getApiImageUrl(event.image)}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Top Badge */}
                        {event.priceBadge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3.5 py-1 rounded-full bg-[#6E1E18]/90 text-[#F3D18A] backdrop-blur-md text-[11px] font-sans font-bold uppercase tracking-wider border border-[#F3D18A]/30">
                              {event.priceBadge}
                            </span>
                          </div>
                        )}

                        {/* Title on Image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                            {event.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* Event Details Body */}
                    <div className="p-6 sm:p-7 space-y-4">
                      {!event.image && (
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22] leading-tight">
                          {event.title}
                        </h2>
                      )}

                      {/* Date, Time & Venue Meta */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#555555] pb-4 border-b border-[#E8D8C5]/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#C48B3C] shrink-0" />
                          <span className="font-semibold text-[#4D2D22]">{event.date}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#C48B3C] shrink-0" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        <div className="sm:col-span-2 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#6E1E18] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{event.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      {event.description && (
                        <p className="text-sm text-[#666666] font-sans leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      {/* Highlights */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="pt-2">
                          <h3 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[#C48B3C]" />
                            <span>Key Inclusions & Highlights</span>
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {event.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-[#555555]">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-6 sm:p-7 pt-0">
                    <Button
                      variant="primary"
                      showArrow
                      className="w-full py-3.5 text-xs uppercase font-bold tracking-wider"
                      onClick={() => handleOpenInquiry(event)}
                    >
                      Book / Inquire Event
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Inquiry Modal */}
      {selectedEventForInquiry && (
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          type="class"
          subject={`Event Admission: ${selectedEventForInquiry.title}`}
        />
      )}

      <Footer />
    </motion.div>
  );
};
