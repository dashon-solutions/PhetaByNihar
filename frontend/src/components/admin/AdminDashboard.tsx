import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LogOut, LayoutGrid, Image, UserCheck,
  Award, Package, PlaySquare, Star,
  Sparkles, ExternalLink,
  PhoneCall, Layers, Globe
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
import { CRMManager } from './CRMManager';

type ActiveTab = 'banner' | 'about' | 'services' | 'products' | 'videos' | 'media' | 'testimonials' | 'inquiries' | 'our-work' | 'crm';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('crm');
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    videos: 0,
    testimonials: 0,
    inquiries: 0,
    customers: 0
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

    const verifyAndLoadStats = async () => {
      try {
        await apiFetch('/auth/verify');
        const [services, products, videos, testimonials, inquiries, crmStats] = await Promise.all([
          apiFetch('/services').catch(() => []),
          apiFetch('/products').catch(() => []),
          apiFetch('/videos').catch(() => []),
          apiFetch('/testimonials').catch(() => []),
          apiFetch('/inquiry').catch(() => []),
          apiFetch('/crm/stats').catch(() => ({ totalCustomers: 0 }))
        ]);

        setStats({
          services: services?.length || 0,
          products: products?.length || 0,
          videos: videos?.length || 0,
          testimonials: testimonials?.length || 0,
          inquiries: inquiries?.length || 0,
          customers: crmStats?.totalCustomers || 0
        });
      } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin');
      }
    };

    verifyAndLoadStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const navCategories = [
    {
      category: 'Sales & Customer Loyalty',
      items: [
        { id: 'crm', label: 'Customer CRM & Coupons', icon: <Sparkles className="w-4 h-4" />, badge: stats.customers > 0 ? `${stats.customers}` : undefined, highlight: true },
        { id: 'inquiries', label: 'Inquiries & Classes', icon: <PhoneCall className="w-4 h-4" />, badge: stats.inquiries > 0 ? `${stats.inquiries}` : undefined }
      ]
    },
    {
      category: 'Website Content',
      items: [
        { id: 'banner', label: 'Hero Banners', icon: <Image className="w-4 h-4" /> },
        { id: 'about', label: 'About Us & Story', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'services', label: 'Services Offered', icon: <LayoutGrid className="w-4 h-4" />, badge: `${stats.services}` },
        { id: 'products', label: 'Exclusive Collection', icon: <Package className="w-4 h-4" />, badge: `${stats.products}` },
        { id: 'our-work', label: 'Our Work Gallery', icon: <Layers className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Media & Social Proof',
      items: [
        { id: 'videos', label: 'Conversations & Reels', icon: <PlaySquare className="w-4 h-4" /> },
        { id: 'media', label: 'Media Features', icon: <Award className="w-4 h-4" /> },
        { id: 'testimonials', label: 'Client Testimonials', icon: <Star className="w-4 h-4" /> }
      ]
    }
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
      case 'crm':
        return <CRMManager />;
      default:
        return <BannerManager />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex flex-col font-['Roboto',sans-serif] text-[#2E1A14] selection:bg-[#D7A65B] selection:text-white">
      {/* Top Royal Navigation Header */}
      <header className="bg-gradient-to-r from-[#3D0A0A] via-[#5A1410] to-[#3D0A0A] text-[#FFFDFB] px-4 sm:px-8 py-3 flex items-center justify-between border-b-2 border-[#D7A65B] shadow-lg z-30 sticky top-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center border-2 border-[#D7A65B] shadow-inner shrink-0">
            <img src="/logo.png" alt="Pheta By Nihar" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-wide leading-tight text-white">
                Pheta By Nihar
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D7A65B]/25 border border-[#D7A65B]/40 text-[#F3D18A] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Admin Portal
              </span>
            </div>
            <p className="text-[10px] text-[#D7A65B] tracking-widest uppercase font-semibold">
              Royal Maharashtrian Heritage Administration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Live Website Link */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3D18A] hover:text-white text-xs font-semibold uppercase tracking-wider border border-[#D7A65B]/30 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Website</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          {/* Logged in User Chip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2A0808]/80 border border-[#D7A65B]/40 text-left">
            <div className="w-6 h-6 rounded-full bg-[#D7A65B] text-[#4A0D0D] font-bold text-xs flex items-center justify-center">
              {(adminUser?.username || 'A')[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/70 leading-none">Administrator</span>
              <span className="text-xs text-[#F3D18A] font-bold leading-tight">{adminUser?.username || 'Admin'}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A0808] hover:bg-[#7D201D] text-[#F3D18A] hover:text-white rounded-full text-xs font-bold uppercase tracking-wider border border-[#D7A65B]/40 shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex flex-1 flex-col md:flex-row relative">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#E8D8C5] p-3 md:p-4 flex flex-col gap-4 shrink-0 z-20 shadow-xs">
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-4 pb-2 md:pb-0 scrollbar-none">
            {navCategories.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-2.5 pb-1 hidden md:block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">
                    {group.category}
                  </span>
                </div>

                <div className="flex flex-row md:flex-col gap-1">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as ActiveTab)}
                        className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shrink-0 cursor-pointer ${isActive
                          ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-[#FFFDFB] shadow-md transform translate-x-0.5'
                          : 'text-[#4D2D22] hover:bg-[#F8F3EC] hover:text-[#6E1E18]'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-[#F3D18A]' : 'text-[#C48B3C]'}>
                            {item.icon}
                          </span>
                          <span className="text-left font-medium">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive
                            ? 'bg-[#F3D18A] text-[#4A0D0D]'
                            : 'bg-[#F8F3EC] text-[#6E1E18] border border-[#E8D8C5]'
                            }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* System Status Footnote */}

        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-68px)]">
          {/* Top Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Clients</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.customers}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <Sparkles className="w-4 h-4 text-[#D7A65B]" />
              </div>
            </div>

            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Inquiries</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.inquiries}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <PhoneCall className="w-4 h-4 text-[#D7A65B]" />
              </div>
            </div>

            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Services</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.services}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <LayoutGrid className="w-4 h-4 text-[#D7A65B]" />
              </div>
            </div>

            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Products</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.products}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <Package className="w-4 h-4 text-[#D7A65B]" />
              </div>
            </div>

            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Videos</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.videos}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <PlaySquare className="w-4 h-4 text-[#D7A65B]" />
              </div>
            </div>

            <div className="bg-white border border-[#E8D8C5] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:border-[#D7A65B] transition-colors">
              <div>
                <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">Reviews</span>
                <span className="font-bold text-xl text-[#4A0D0D] mt-0.5 block">{stats.testimonials}</span>
              </div>
              <div className="w-9 h-9 bg-[#F8F3EC] rounded-full flex items-center justify-center text-[#6E1E18]">
                <Star className="w-4 h-4 text-[#D7A65B]" />
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
