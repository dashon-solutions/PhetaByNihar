import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SEO } from './components/common/SEO';
import { Navbar } from './components/sections/Navbar';
import { HeroBanner } from './components/sections/HeroBanner';

// Page Imports
import { ServicesPage } from './pages/ServicesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { RentalProductsPage } from './pages/RentalProductsPage';
import { SingleProductPage } from './pages/SingleProductPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { Statistics } from './components/sections/Statistics';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ClassesSection } from './components/sections/ClassesSection';
import { OurWork } from './components/sections/OurWork';
import { FeaturedConversations } from './components/sections/FeaturedConversations';
import { ProductsPreview } from './components/sections/ProductsPreview';
import { MediaAndTestimonials } from './components/sections/MediaAndTestimonials';
import { Footer } from './components/sections/Footer';

// Admin Imports
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Pheta Tying Service in Mumbai & Pune | Marathi & Wedding Pheta Artist - Pheta By Nihar"
        description="Premier Marathi Pheta tying service in Mumbai, Pune & across Maharashtra. Specialized groom pheta styling, royal wedding guest tying, traditional Puneri & Kolhapuri phetas, and masterclasses by Nihar."
        keywords="Pheta Tying Service in Mumbai, Marathi Pheta Tying Service in Mumbai, Wedding Pheta Tying Service in Mumbai, Pheta Tying in Mumbai, Marathi Pheta in Mumbai, Maharashtrian Pheta Service in Mumbai, Wedding Pheta Service Mumbai, Pheta for Wedding in Mumbai, Traditional Pheta Tying Service Mumbai, Professional Pheta Tying Service Mumbai, Pheta Tying Service in Pune, Marathi Pheta Tying Service in Pune, Wedding Pheta Tying Service in Pune, Marathi Pheta in Pune, Maharashtrian Pheta Service in Pune, Pheta for Wedding in Pune, Traditional Pheta Tying in Pune, Pheta Tying Service Maharashtra, Marathi Pheta Tying Service Maharashtra, Maharashtrian Wedding Pheta, Traditional Marathi Pheta, Professional Pheta Tying Service, Groom Pheta Tying Service, Groom Pheta Mumbai, Wedding Pheta for Groom, Pheta for Groom in Mumbai, Pheta for Groom in Pune, Marathi Wedding Pheta, Wedding Pheta Artist, Pheta Artist Mumbai, Pheta Artist Pune, Wedding Pheta Stylist, Pheta Styling for Weddings, Pheta Service for Baraat, Pheta for Wedding Guests, Pheta Tying for Wedding Guests, Group Pheta Tying Service, Wedding Pheta for Baraati, Pheta Tying Near Me, Pheta Artist Near Me, Marathi Pheta Near Me, Wedding Pheta Near Me"
        canonicalUrl="https://phetabynihar.com"
        ogImage="/hero_groom.png"
      />
      <Navbar />

      <main>
        <HeroBanner />

        {/* Decorative Divider & Overlapping Statistics */}
        <div className="flex justify-center -mt-5 sm:-mt-20 relative z-20 max-w-[1400px] mx-auto px-5">
          <div className="w-full">
            <Statistics />
          </div>
        </div>

        <AboutSection />
        <ServicesSection />
        <ClassesSection />
        <ProductsPreview />
        <FeaturedConversations />
        <MediaAndTestimonials />
        <OurWork />
      </main>

      <Footer />
    </motion.div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F8F3EC] font-sans selection:bg-[#D7A65B] selection:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/products" element={<RentalProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


