import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/sections/Navbar';
import { HeroBanner } from './components/sections/HeroBanner';
import { Statistics } from './components/sections/Statistics';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { OurWork } from './components/sections/OurWork';
import { FeaturedConversations } from './components/sections/FeaturedConversations';
import { ProductsPreview } from './components/sections/ProductsPreview';
import { MediaAndTestimonials } from './components/sections/MediaAndTestimonials';
import { Footer } from './components/sections/Footer';

// Admin Imports
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Page Imports
import { ServicesPage } from './pages/ServicesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { RentalProductsPage } from './pages/RentalProductsPage';
import { SingleProductPage } from './pages/SingleProductPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { OurWorkPage } from './pages/OurWorkPage';

const HomePage = () => {
  return (
    <>
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
        <ProductsPreview />
        <FeaturedConversations />
        <MediaAndTestimonials />
        <OurWork />
      </main>

      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
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

