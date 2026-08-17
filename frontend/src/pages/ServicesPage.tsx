import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';

// New specialized components for the Services Page
import { DetailedServicesList } from '../components/sections/services/DetailedServicesList';
import { ProcessAndWhyChooseUs } from '../components/sections/services/ProcessAndWhyChooseUs';
import { ServicesTestimonialsFAQ } from '../components/sections/services/ServicesTestimonialsFAQ';
import { ServicesCTA } from '../components/sections/services/ServicesCTA';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
        title="Wedding & Event Pheta Tying Services in Mumbai, Pune & Maharashtra | Pheta By Nihar"
        description="Book professional Marathi Pheta tying services for weddings, groom styling, Baraat group draping, corporate functions, cultural festivals, and political satkars in Mumbai, Pune, Thane & Maharashtra."
        keywords="Wedding Pheta Tying Service in Mumbai, Wedding Pheta Tying Service in Pune, Groom Pheta Tying Service, Groom Pheta Mumbai, Wedding Pheta for Groom, Pheta for Groom in Mumbai, Pheta for Groom in Pune, Marathi Wedding Pheta, Maharashtrian Wedding Pheta, Wedding Pheta Artist, Pheta Artist Mumbai, Pheta Artist Pune, Wedding Pheta Stylist, Pheta Styling for Weddings, Pheta Service for Baraat, Pheta for Wedding Guests, Pheta Tying for Wedding Guests, Group Pheta Tying Service, Wedding Pheta for Baraati, Pheta Tying for Events, Pheta Service for Events, Pheta Tying for Cultural Events, Pheta Tying for Corporate Events, Pheta Tying for Festivals, Pheta Tying for Traditional Events, Pheta Tying for School Events, Pheta Tying for College Events, Pheta Tying for Political Events, Traditional Turban Tying Service, Marathi Turban Tying Service, Maharashtrian Turban Service"
        canonicalUrl="https://phetabynihar.com/services"
        ogImage="/hero_bride_groom.png"
      />
      <Navbar theme="light" />
      <main className="bg-[#F8F3EC]">
        <DetailedServicesList />
        <ProcessAndWhyChooseUs />
        <ServicesCTA />
        <ServicesTestimonialsFAQ />
      </main>
      <Footer />
    </motion.div>
  );
};

