import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { Divider } from '../components/ui/Divider';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { InquiryModal } from '../components/ui/InquiryModal';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface ProductItem {
  _id: string;
  id: string;
  name: string;
  marathiName?: string;
  subtitle: string;
  price?: number;
  image: string;
  description: string;
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariant: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

import { fallbackProducts } from '../data/fallbackData';

export const RentalProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts as any);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();

  const handleOpenRentalInquiry = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const data = await apiFetch('/products');
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch rental products, using fallback:', err);
        setProducts(fallbackProducts as any);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F3EC] flex flex-col font-sans text-text-gray selection:bg-[#D7A65B] selection:text-white"
    >
      <SEO
        title="Pheta on Rent in Mumbai & Pune | Puneri, Kolhapuri & Royal Wedding Pheta Collection"
        description="Rent and buy authentic Maharashtrian phetas, royal groom pagadis, designer kalgis, Rajmudra, Wagnakha, and traditional accessories in Mumbai & Pune. Best wedding rental collection."
        keywords="Pheta on Rent Mumbai, Wedding Pheta on Rent Mumbai, Marathi Pheta on Rent, Pheta Rental Mumbai, Wedding Pheta Rental, Traditional Pheta Rental, Pheta Rental Pune, Wedding Turban Rental Mumbai, Marathi Pheta for Sale, Maharashtrian Pheta Online, Traditional Marathi Pheta, Puneri Pheta, Kolhapuri Pheta, Shahi Pheta, Traditional Pheta Collection, Wedding Pheta Collection, Traditional Maharashtrian Accessories, Maharashtrian Wedding Accessories, Rajmudra Accessories, Wagnakha Accessories, Traditional Kada, Maharashtrian Traditional Ornaments"
        canonicalUrl="https://phetabynihar.com/products"
        ogImage="/placeholder-pheta.png"
      />
      <Navbar theme="light" />
      <main>
        <section className="py-16 md:py-24 bg-[#F8F3EC] relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #6E1E18 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
            >
              <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-2 block">
                Exclusive Collection
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight mb-1">
                Products & Royal Collection
              </h1>
              <Divider className="max-w-[450px] my-1" />
              <p className="mt-4 text-base md:text-lg text-[#666666] font-sans leading-relaxed">
                Discover our premium range of handcrafted traditional Maharashtrian phetas and royal accessories.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {products.map((product) => (
                  <motion.div 
                    key={product._id} 
                    variants={cardVariant}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="group cursor-pointer bg-white p-5 rounded-3xl border border-[#E8D8C5]/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-5 border-2 border-[#F8F3EC] bg-[#EBE4D8]">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 duration-500"></div>
                        <img
                          src={getApiImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="inline-block bg-[#FFFDFB] text-[#4D2D22] font-serif font-bold text-sm px-3.5 py-1.5 rounded-full shadow-md border border-[#E8D8C5]">
                            {product.id}
                          </span>
                        </div>
                        {product.price !== undefined && product.price !== null && Number(product.price) > 0 && (
                          <div className="absolute bottom-4 right-4 z-20">
                            <span className="inline-block bg-[#6E1E18]/90 backdrop-blur-md text-[#F3D18A] font-serif font-bold text-sm px-3.5 py-1.5 rounded-full shadow-lg border border-[#D7A65B]/40">
                              ₹{Number(product.price).toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-center px-2">
                        <h2 className="font-serif text-2xl font-bold text-[#4D2D22] mb-1 group-hover:text-[#6E1E18] transition-colors leading-tight">
                          <span>{product.name}</span>
                          {product.marathiName && (
                            <span className="block font-marathi text-lg text-[#6E1E18] font-normal mt-0.5">
                              ({product.marathiName.replace(/[()]/g, '')})
                            </span>
                          )}
                        </h2>
                        <p className="text-[#D7A65B] font-sans text-xs font-bold uppercase tracking-[0.1em] mb-2.5">
                          {product.subtitle}
                        </p>
                        {product.description && (
                          <p className="text-[#666666] font-sans text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8D8C5]/60 flex gap-2">
                      <button
                        onClick={(e) => handleOpenRentalInquiry(e, product.name)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 border border-[#8A2B24] cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy / Inquire</span>
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="inline-flex items-center justify-center gap-1 py-3 px-4 rounded-full border border-[#E8D8C5] bg-white text-[#4D2D22] hover:bg-[#F8F3EC] font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="buy"
        subject={selectedProduct}
      />
    </motion.div>
  );
};


