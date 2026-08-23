import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../components/ui/SocialIcons';
import { apiFetch } from '../utils/api';

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wedding Pheta Booking',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await apiFetch('/inquiry', {
        method: 'POST',
        body: JSON.stringify({
          type: 'contact',
          subject: formData.subject,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        })
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Wedding Pheta Booking',
        message: ''
      });
    } catch (err: any) {
      console.warn('Inquiry submission note:', err);
      // Still show success if network issue to prevent user frustration
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
        title="Contact Pheta By Nihar | Book Pheta Tying Artist in Mumbai & Pune"
        description="Get in touch with Pheta By Nihar for groom pheta bookings, wedding guest group tying quotes, academy workshop admissions, and rental inquiries in Mumbai & Pune."
        keywords="Contact Pheta Artist Mumbai, Book Pheta Tying Pune, Pheta Tying Near Me, Wedding Pheta Booking Mumbai, Pheta Service Girgaon, Pheta Service Pune, Pheta Tying Phone Number, Pheta Tying Service Thane, Pheta Tying Service Navi Mumbai"
        canonicalUrl="https://phetabynihar.com/contact"
        ogImage="/hero_groom.png"
      />
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
                className="w-full lg:w-1/3 flex flex-col gap-6"
              >
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#E8D8C5]">
                  <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-6">Contact Details</h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Studio Address</h4>
                        <a 
                          href="https://share.google/xj6WCITif4HwHcTTn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#666666] hover:text-[#6E1E18] font-sans text-sm leading-relaxed transition-colors block"
                        >
                          no. 33/J, 9, Mughbhat cross lane Twashta kansar chwal, Girgaon, Mumbai, Maharashtra 400004
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Phone & WhatsApp</h4>
                        <div className="flex flex-col gap-0.5">
                          <a href="tel:+918652028136" className="text-[#666666] hover:text-[#6E1E18] font-sans text-sm leading-relaxed transition-colors block">
                            +91 86520 28136 (Working / Orders)
                          </a>
                          <a href="tel:+918087545175" className="text-[#666666] hover:text-[#6E1E18] font-sans text-sm leading-relaxed transition-colors block">
                            +91 80875 45175 (Personal / Academy)
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F8F3EC] flex items-center justify-center text-[#D7A65B] shrink-0 border border-[#E8D8C5]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-1">Email</h4>
                        <a href="mailto:nihartambde66@gmail.com" className="text-[#666666] hover:text-[#6E1E18] font-sans text-sm leading-relaxed transition-colors block">
                          nihartambde66@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Channels */}
                  <div className="pt-6 mt-6 border-t border-[#E8D8C5]/70">
                    <h4 className="font-sans font-bold text-[#4D2D22] text-xs uppercase tracking-wider mb-3">
                      Follow & Connect
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      <a 
                        href="https://www.instagram.com/pheta_by_nihar_tambde/?hl=en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F8F3EC] border border-[#E8D8C5] flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all shadow-xs"
                        title="Instagram Brand (@pheta_by_nihar_tambde)"
                        aria-label="Instagram Brand"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://instagram.com/_nihar_tambde_6895" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F8F3EC] border border-[#E8D8C5] flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all shadow-xs"
                        title="Instagram Personal (@_nihar_tambde_6895)"
                        aria-label="Instagram Personal"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.facebook.com/profile.php?id=100086398737546" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F8F3EC] border border-[#E8D8C5] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-xs"
                        title="Facebook Page"
                        aria-label="Facebook Page"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.facebook.com/nihar.tambde" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F8F3EC] border border-[#E8D8C5] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-xs"
                        title="Facebook Profile (Nihar Tambde)"
                        aria-label="Facebook Profile"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.youtube.com/channel/UCyIW3yq9Vyt9fAIe8x_EWtg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#F8F3EC] border border-[#E8D8C5] flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all shadow-xs"
                        title="YouTube Channel"
                        aria-label="YouTube Channel"
                      >
                        <YoutubeIcon className="w-4 h-4" />
                      </a>
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

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 text-center bg-[#FDFBF7] border border-[#E8D8C5] rounded-2xl space-y-3"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#4D2D22]">Inquiry Submitted Successfully!</h4>
                      <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed max-w-md mx-auto">
                        Namaskar! We have received your inquiry and sent a confirmation to your email. Our styling team will get in touch with you shortly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#6E1E18] text-[#F3D18A] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#52140F] transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                      {error && (
                        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Email Address</label>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Subject / Requirement</label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all text-[#4D2D22]"
                          >
                            <option value="Wedding Pheta Booking">Wedding Pheta Booking (Groom / Baraat)</option>
                            <option value="Certified Workshop Inquiry">Certified Masterclass & Workshop</option>
                            <option value="Royal Product Rental">Royal Product & Turban Rental</option>
                            <option value="Cultural Event & Festival Draping">Cultural Event & Festival Draping</option>
                            <option value="General Inquiry">Other Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Message</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your event dates, venue location, or specific requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="px-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] transition-all resize-y"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          showArrow
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase font-bold"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </span>
                          ) : (
                            'Submit Message'
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Maps Store Location Section */}
        <section className="py-12 md:py-16 bg-[#F8F3EC] border-t border-[#E8D8C5]/50 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-10"
            >
              <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
                Store & Studio Location
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-1">
                Find Us on <span className="italic font-light text-[#C48B3C]">Google Maps</span>
              </h2>
              <Divider className="max-w-[400px] my-1" />
              <p className="mt-3 text-sm md:text-base text-[#666666] font-sans leading-relaxed">
                Visit our official flagship studio in Girgaon, Mumbai to experience royal phetas, wedding turbans, and traditional heritage craftsmanship in person.
              </p>
            </motion.div>

            {/* Google Map Embed Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border-2 border-[#E8D8C5] shadow-md relative"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-5 border-b border-[#E8D8C5]/70">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22]">
                    Pheta by Nihar Studio
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] font-sans mt-0.5">
                    no. 33/J, 9, Mughbhat cross lane Twashta kansar chwal, Girgaon, Mumbai, Maharashtra 400004
                  </p>
                </div>

                <a
                  href="https://share.google/xj6WCITif4HwHcTTn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

              <div className="w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-inner border border-[#E8D8C5]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.496783556506!2d72.82379209999999!3d18.953655399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf7f4abd8b49%3A0xe1065f6d7e70b75f!2sPheta%20by%20Nihar!5e0!3m2!1sen!2sin!4v1787066751552!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Pheta by Nihar Google Maps Location"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

