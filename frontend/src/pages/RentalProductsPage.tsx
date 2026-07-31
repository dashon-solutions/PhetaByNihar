import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/sections/Navbar';
import { HeroBanner } from '../components/sections/HeroBanner';
import { Footer } from '../components/sections/Footer';
import { InquiryModal } from '../components/ui/InquiryModal';
import { apiFetch, getApiImageUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface ProductItem {
  _id: string;
  id: string;
  name: string;
  marathiName?: string;
  subtitle: string;
  image: string;
  description: string;
}

export const RentalProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiFetch('/products');
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar theme="light" />
      <main>

        <section className="py-20 md:py-32 bg-[#F8F3EC] relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #6E1E18 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

          <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <span className="text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                Exclusive Collection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4D2D22] leading-tight">
                Products & Rentals
              </h2>
              <div className="w-24 h-1 bg-[#D7A65B] mx-auto mt-6 md:mt-8"></div>
              <p className="mt-8 text-lg text-[#666666] font-sans leading-relaxed">
                Discover our premium range of traditional Maharashtrian accessories available for purchase and rental.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {products.map((product) => (
                  <div key={product._id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg mb-6 border-4 border-white">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 duration-500"></div>
                      <img
                        src={getApiImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="inline-block bg-[#FFFDFB] text-[#4D2D22] font-serif font-bold text-lg px-4 py-2 rounded-full shadow-md">
                          {product.id}
                        </span>
                      </div>
                    </div>

                    <div className="text-center px-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <h3 className="font-serif text-2xl font-bold text-[#4D2D22] mb-1">{product.name}</h3>
                      {product.marathiName && (
                        <h4 className="font-marathi text-xl text-[#6E1E18] mb-2">({product.marathiName})</h4>
                      )}
                      <p className="text-[#D7A65B] font-sans text-sm font-bold uppercase tracking-[0.1em] mb-4">
                        {product.subtitle}
                      </p>
                      <p className="text-[#666666] font-sans text-sm leading-relaxed mb-6 line-clamp-3">
                        {product.description}
                      </p>
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="inline-block text-[#6E1E18] font-sans text-sm font-bold uppercase tracking-wider hover:text-[#D7A65B] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#D7A65B] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                      >
                        See More &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="rental"
        subject={selectedProduct}
      />
    </>
  );
};
