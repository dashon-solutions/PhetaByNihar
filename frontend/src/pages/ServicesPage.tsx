import React, { useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';

// New specialized components for the Services Page
import { ServicesHero } from '../components/sections/services/ServicesHero';
import { ServicesStatistics } from '../components/sections/services/ServicesStatistics';
import { DetailedServicesList } from '../components/sections/services/DetailedServicesList';
import { ProcessAndWhyChooseUs } from '../components/sections/services/ProcessAndWhyChooseUs';
import { ServicesGallery } from '../components/sections/services/ServicesGallery';
import { ServicesTestimonialsFAQ } from '../components/sections/services/ServicesTestimonialsFAQ';
import { ServicesCTA } from '../components/sections/services/ServicesCTA';

export const ServicesPage: React.FC = () => {
  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar theme="light" />
      <main className="bg-[#F8F3EC]">

        <DetailedServicesList />
        <ProcessAndWhyChooseUs />
        <ServicesCTA />
        <ServicesTestimonialsFAQ />
      </main>
      <Footer />
    </>
  );
};
