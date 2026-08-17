import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F3EC]"
    >
      <Navbar />
      <main>
        <HeroBanner pageName="contact" />

        <section id="inquiry-form" className="py-14 md:py-20 bg-[#F8F3EC] relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #6E1E18 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-1">
                Contact Us
              </h2>
              <Divider className="max-w-[400px] my-1" />
              <p className="mt-4 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
                Whether you want to book our services for an upcoming event, or inquire about our products and workshops, we'd love to hear from you.
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/3"
              >
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#E8D8C5]">
                  <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-6">Contact Details</h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Location</h4>
                        <p className="text-[#666666] font-sans text-sm leading-relaxed">
                          Pune, Maharashtra, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Phone</h4>
                        <p className="text-[#666666] font-sans text-sm leading-relaxed">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Email</h4>
                        <p className="text-[#666666] font-sans text-sm leading-relaxed">
                          info@phetabynihar.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-2/3"
              >
                <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-[#E8D8C5]">
                  <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-6">Send Us a Message</h3>

                  <form className="flex flex-col gap-4 sm:gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Full Name</label>
                        <input type="text" placeholder="Your Name" className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Email Address</label>
                        <input type="email" placeholder="name@example.com" className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Phone Number</label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX" className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Subject</label>
                        <select className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all text-[#4D2D22]">
                          <option value="wedding">Wedding Pheta Booking</option>
                          <option value="workshop">Workshop Inquiry</option>
                          <option value="rental">Product Rental</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Message</label>
                      <textarea rows={4} placeholder="Tell us about your event..." className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all resize-y"></textarea>
                    </div>

                    <div className="pt-2">
                      <Button variant="primary" showArrow className="w-full sm:w-auto px-8 py-3.5 text-xs">
                        Submit Message
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

