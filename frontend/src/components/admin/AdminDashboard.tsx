import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, LayoutGrid, Image, UserCheck,
  Award, Package, PlaySquare, Star,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

// Manager Imports
import { BannerManager } from './BannerManager';
import { AboutManager } from './AboutManager';
import { ServicesManager } from './ServicesManager';
import { ProductsManager } from './ProductsManager';
import { VideosManager } from './VideosManager';
import { MediaManager } from './MediaManager';
import { TestimonialsManager } from './TestimonialsManager';
import { InquiryManager } from './InquiryManager';
import { OurWorkManager } from './OurWorkManager';

type ActiveTab = 'banner' | 'about' | 'services' | 'products' | 'videos' | 'media' | 'testimonials' | 'inquiries' | 'our-work';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('banner');
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    videos: 0,
    testimonials: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userString = localStorage.getItem('adminUser');

    if (!token) {
      navigate('/admin');
      return;
    }

    if (userString) {
      setAdminUser(JSON.parse(userString));
    }

    // Verify token validity
    const verifyToken = async () => {
      try {
        await apiFetch('/auth/verify');
        // Fetch simple count stats
        const services = await apiFetch('/services');
        const products = await apiFetch('/products');
        const videos = await apiFetch('/videos');
        const testimonials = await apiFetch('/testimonials');

        setStats({
          services: services?.length || 0,
          products: products?.length || 0,
          videos: videos?.length || 0,
          testimonials: testimonials?.length || 0
        });
      } catch (err) {
        // If invalid, clear and redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const menuItems = [
    { id: 'banner', label: 'Hero Banner', icon: <Image className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'services', label: 'Services Offered', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'products', label: 'Exclusive Collection', icon: <Package className="w-4 h-4" /> },
    { id: 'videos', label: 'Conversations / Videos', icon: <PlaySquare className="w-4 h-4" /> },
    { id: 'media', label: 'Media Features', icon: <Award className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Client Testimonials', icon: <Star className="w-4 h-4" /> },
    { id: 'our-work', label: 'Our Work', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'inquiries', label: 'Inquiries', icon: <UserCheck className="w-4 h-4" /> }
  ];

  const renderActiveManager = () => {
    switch (activeTab) {
      case 'banner':
        return <BannerManager />;
      case 'about':
        return <AboutManager />;
      case 'services':
        return <ServicesManager />;
      case 'products':
        return <ProductsManager />;
      case 'videos':
        return <VideosManager />;
      case 'media':
        return <MediaManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'our-work':
        return <OurWorkManager />;
      case 'inquiries':
        return <InquiryManager />;
      default:
        return <BannerManager />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex flex-col font-sans text-text-gray selection:bg-[#D7A65B] selection:text-white">
      {/* Top Header */}
      <header className="bg-[#6E1E18] text-[#FFFDFB] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#D7A65B] shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full p-1 flex items-center justify-center border border-[#D7A65B] shadow-inner shrink-0">
            <img src="/logo.png" alt="Pheta By Nihar" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <h1 className="font-serif text-base md:text-lg font-bold tracking-wide leading-tight">
              Pheta By Nihar
            </h1>
            <p className="text-[9px] text-[#D7A65B] tracking-widest uppercase font-bold">
              Administration Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">Logged in as</span>
            <span className="text-[10px] text-[#D7A65B] font-bold uppercase tracking-wider">{adminUser?.username || 'Admin'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2A0D0F] hover:bg-[#3b1215] text-[#D7A65B] hover:text-white rounded text-[10px] font-semibold uppercase tracking-wider border border-[#D4AF37]/30 transition-all duration-300 active:scale-95"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 flex-col md:flex-row relative">
        {/* Sidebar */}
        <aside className="w-full md:w-56 bg-[#FFFDFB] border-b md:border-b-0 md:border-r border-[#E8D8C5] p-2 md:p-3 flex flex-col gap-1 shrink-0 z-20">
          <div className="mb-2 hidden md:block">
            <span className="text-[9px] text-[#999999] font-bold uppercase tracking-wider px-2">
              Section Settings
            </span>
          </div>

          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0 scrollbar-none whitespace-nowrap">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${activeTab === item.id
                    ? 'bg-[#6E1E18] text-[#FFFDFB] shadow-sm'
                    : 'text-[#4D2D22] hover:bg-[#F8F3EC]'
                  }`}
              >
                <span className={activeTab === item.id ? 'text-[#D7A65B]' : 'text-[#C48B3C]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-[#E8D8C5]/60 hidden md:flex flex-col gap-1.5 text-[9px] text-[#666666] font-medium tracking-wider uppercase px-2">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C48B3C]" />
              <span>Status: Active Connection</span>
            </div>
            <span>Database: MongoDB Atlas</span>
          </div>
        </aside>

        {/* Dashboard Content Container */}
        <main className="flex-1 p-3 md:p-5 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-60px)]">
          {/* Header Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#FFFDFB] border border-[#E8D8C5] p-3 rounded-lg flex items-center justify-between shadow-soft">
              <div>
                <span className="text-[9px] text-[#666666] uppercase font-bold tracking-wider">Services</span>
                <span className="block font-serif text-lg font-bold text-[#4D2D22] mt-0.5">{stats.services}</span>
              </div>
              <div className="w-8 h-8 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#C48B3C]">
                <LayoutGrid className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#FFFDFB] border border-[#E8D8C5] p-3 rounded-lg flex items-center justify-between shadow-soft">
              <div>
                <span className="text-[9px] text-[#666666] uppercase font-bold tracking-wider">Products</span>
                <span className="block font-serif text-lg font-bold text-[#4D2D22] mt-0.5">{stats.products}</span>
              </div>
              <div className="w-8 h-8 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#C48B3C]">
                <Package className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#FFFDFB] border border-[#E8D8C5] p-3 rounded-lg flex items-center justify-between shadow-soft">
              <div>
                <span className="text-[9px] text-[#666666] uppercase font-bold tracking-wider">Videos</span>
                <span className="block font-serif text-lg font-bold text-[#4D2D22] mt-0.5">{stats.videos}</span>
              </div>
              <div className="w-8 h-8 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#C48B3C]">
                <PlaySquare className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-[#FFFDFB] border border-[#E8D8C5] p-3 rounded-lg flex items-center justify-between shadow-soft">
              <div>
                <span className="text-[9px] text-[#666666] uppercase font-bold tracking-wider">Reviews</span>
                <span className="block font-serif text-lg font-bold text-[#4D2D22] mt-0.5">{stats.testimonials}</span>
              </div>
              <div className="w-8 h-8 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#C48B3C]">
                <Star className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Active section manager rendering */}
          <div className="flex-1">
            {renderActiveManager()}
          </div>
        </main>
      </div>
    </div>
  );
};
