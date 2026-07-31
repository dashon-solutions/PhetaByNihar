import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#F8F3EC]">
          <div className="w-12 h-12 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F3EC] text-center px-4">
          <h2 className="text-2xl font-serif text-[#4D2D22] mb-4">Product Not Found</h2>
          <p className="text-[#666666] font-sans mb-8">{error || "The product you're looking for doesn't exist."}</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-[#6E1E18] text-white font-sans uppercase font-bold rounded hover:bg-[#7D201D]"
          >
            Back to Collection
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F3EC] min-h-screen pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-[#666666] hover:text-[#4D2D22] transition-colors font-sans text-sm font-bold uppercase tracking-wider mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg border-4 border-white bg-white">
                <img 
                  src={getApiImageUrl(activeImage)} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
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
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col gap-6 lg:py-10">
              <div>
                <p className="text-[#D7A65B] font-sans text-sm font-bold uppercase tracking-[0.1em] mb-2">
                  {product.subtitle}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#4D2D22] leading-tight mb-2">
                  {product.name}
                </h1>
                {product.marathiName && (
                  <h2 className="font-marathi text-2xl md:text-3xl text-[#6E1E18]">
                    ({product.marathiName})
                  </h2>
                )}
              </div>

              <div className="w-16 h-1 bg-[#D7A65B]"></div>

              <div className="prose prose-sm font-sans text-[#666666] leading-relaxed">
                <p className="text-lg font-medium text-[#4D2D22] mb-4">
                  {product.description}
                </p>
                
                {product.information && (
                  <div className="mt-6 space-y-4 whitespace-pre-wrap">
                    {product.information}
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#6E1E18] text-[#FFFDFB] font-sans font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#7D201D] hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Inquire About This Product
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="rental"
        subject={product.name}
      />
    </>
  );
};
