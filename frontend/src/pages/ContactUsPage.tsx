import React from 'react';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
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
                Get In Touch
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-[#D7A65B] mx-auto mt-6 md:mt-8"></div>
              <p className="mt-8 text-lg text-[#666666] font-sans leading-relaxed">
                Whether you want to book our services for an upcoming event, or inquire about our products and workshops, we'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Contact Information */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-[#E8D8C5] h-full">
                  <h3 className="font-serif text-3xl font-bold text-[#4D2D22] mb-8">Contact Details</h3>

                  <div className="flex flex-col gap-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-sm uppercase tracking-wider mb-2">Location</h4>
                        <p className="text-[#666666] font-sans text-base leading-relaxed">
                          Pune, Maharashtra, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-sm uppercase tracking-wider mb-2">Phone</h4>
                        <p className="text-[#666666] font-sans text-base leading-relaxed">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-sm uppercase tracking-wider mb-2">Email</h4>
                        <p className="text-[#666666] font-sans text-base leading-relaxed">
                          info@phetabynihar.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#E8D8C5]">
                    <h4 className="font-sans font-bold text-[#4D2D22] text-sm uppercase tracking-wider mb-4">Follow Us</h4>
                    <div className="flex gap-4">
                      {/* <a href="#" className="w-12 h-12 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#6E1E18] hover:bg-[#6E1E18] hover:text-white transition-colors">
                        <Instagram className="w-6 h-6" />
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#6E1E18] hover:bg-[#6E1E18] hover:text-white transition-colors">
                        <Facebook className="w-6 h-6" />
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-[#E8D8C5]">
                  <h3 className="font-serif text-3xl font-bold text-[#4D2D22] mb-8">Send Us a Message</h3>

                  <form className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Full Name</label>
                        <input type="text" placeholder="John Doe" className="px-5 py-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-base focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="px-5 py-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-base focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Phone Number</label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX" className="px-5 py-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-base focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Subject</label>
                        <select className="px-5 py-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-base focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] transition-all text-[#666666]">
                          <option value="wedding">Wedding Pheta Booking</option>
                          <option value="workshop">Workshop Inquiry</option>
                          <option value="rental">Product Rental</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Message</label>
                      <textarea rows={6} placeholder="Tell us about your event..." className="px-5 py-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-base focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] transition-all resize-y"></textarea>
                    </div>

                    <div className="pt-4">
                      <Button variant="primary" showArrow className="w-full md:w-auto px-10 py-4 text-sm">
                        Submit Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
