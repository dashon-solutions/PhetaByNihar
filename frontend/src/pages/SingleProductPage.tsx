import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { InquiryModal } from '../components/ui/InquiryModal';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { ArrowLeft } from 'lucide-react';

interface ProductItem {
  _id: string;
  id: string;
  name: string;
  marathiName?: string;
  subtitle: string;
  image: string;
  galleryImages?: string[];
  description: string;
  information?: string;
}

export const SingleProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Gallery state
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const data = await apiFetch(`/products/${id}`);
        if (data) {
          setProduct(data);
          setActiveImage(data.image);
        }
      } catch (err: any) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const allImages = product ? [product.image, ...(product.galleryImages || [])] : [];

  if (loading) {
    return (
      <>
        <Navbar theme="light" />
        <div className="min-h-screen bg-[#F8F3EC] flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar theme="light" />
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F3EC] text-center px-4">
          <h2 className="text-2xl font-serif text-[#4D2D22] mb-4">Product Not Found</h2>
          <p className="text-[#666666] font-sans mb-8">{error || "The product you're looking for doesn't exist."}</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2.5 bg-[#6E1E18] text-[#F3D18A] font-sans uppercase font-bold text-xs rounded-full hover:bg-[#7D201D] transition-colors"
          >
            Back to Collection
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F3EC] flex flex-col font-sans text-text-gray selection:bg-[#D7A65B] selection:text-white"
    >
      <SEO
        title={`${product.name} - Royal Marathi Pheta on Rent & Sale in Mumbai & Pune | Pheta By Nihar`}
        description={`Rent or book ${product.name} (${product.subtitle || 'Traditional Royal Pheta'}). Handcrafted silk turban with designer Kalgi. Available across Mumbai, Pune & Maharashtra.`}
        keywords={`${product.name}, ${product.name} on Rent, Marathi Pheta on Rent Mumbai, Wedding Pheta Rental Pune, Puneri Pheta, Kolhapuri Pheta, Traditional Maharashtrian Pheta`}
        canonicalUrl={`https://phetabynihar.com/products/${id}`}
        ogImage={getApiImageUrl(product.image)}
        ogType="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": getApiImageUrl(product.image),
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "Pheta By Nihar"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": `https://phetabynihar.com/products/${id}`
          }
        }}
      />
      <Navbar theme="light" />
      <main className="bg-[#F8F3EC] min-h-screen pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8D8C5] bg-white text-[#4D2D22] hover:bg-[#6E1E18] hover:text-[#F3D18A] hover:border-[#6E1E18] transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm hover:shadow group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Left: Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg border-4 border-white bg-white">
                <img 
                  src={getApiImageUrl(activeImage)} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-block bg-[#FFFDFB] text-[#4D2D22] font-serif font-bold text-lg px-4 py-2 rounded-full shadow-md">
                    {product.id}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[#6E1E18] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img 
                        src={getApiImageUrl(img)} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 lg:py-6"
            >
              <div>
                <p className="text-[#D7A65B] font-sans text-sm font-bold uppercase tracking-[0.1em] mb-2">
                  {product.subtitle}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#4D2D22] leading-tight mb-2">
                  <span>{product.name}</span>
                  {product.marathiName && (
                    <span className="block font-marathi text-2xl md:text-3xl text-[#6E1E18] font-normal mt-1">
                      ({product.marathiName.replace(/[()]/g, '')})
                    </span>
                  )}
                </h1>
              </div>

              <div className="w-16 h-1 bg-[#D7A65B] rounded-full"></div>

              <div className="prose prose-sm font-sans text-[#666666] leading-relaxed">
                <p className="text-base md:text-lg font-medium text-[#4D2D22] mb-4">
                  {product.description}
                </p>
                
                {product.information && (
                  <div className="mt-4 space-y-3 whitespace-pre-wrap text-sm">
                    {product.information}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-[#8A2B24] cursor-pointer"
                >
                  Buy / Inquire Now
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="buy"
        subject={product.name}
      />
    </motion.div>
  );
};

