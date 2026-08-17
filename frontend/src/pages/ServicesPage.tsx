import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

