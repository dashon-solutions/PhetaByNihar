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

function App() {
  return (
    <div className="min-h-screen bg-[#F8F3EC] font-sans selection:bg-[#D7A65B] selection:text-white">
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
    </div>
  );
}

export default App;
