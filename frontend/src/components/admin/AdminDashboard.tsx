import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LogOut, LayoutGrid, Image, UserCheck,
  Award, Package, PlaySquare, Star,
  Sparkles, ExternalLink, Calendar,
  PhoneCall, Layers, Globe, Menu, X,
  Search, ChevronRight, ChevronDown, BarChart3, Clock
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

// Manager Imports
import { BannerManager } from './BannerManager';
import { AboutManager } from './AboutManager';
import { ServicesManager } from './ServicesManager';
import { ProductsManager } from './ProductsManager';
import { EventsManager } from './EventsManager';
import { VideosManager } from './VideosManager';
import { MediaManager } from './MediaManager';
import { TestimonialsManager } from './TestimonialsManager';
import { InquiryManager } from './InquiryManager';
import { OurWorkManager } from './OurWorkManager';
import { CRMManager } from './CRMManager';
import { LaunchTimerManager } from './LaunchTimerManager';

export type ActiveTab =
  | 'crm'
  | 'inquiries'
  | 'launch-timer'
  | 'banner'
  | 'about'
  | 'services'
  | 'products'
  | 'events'
  | 'our-work'
  | 'videos'
  | 'media'
  | 'testimonials';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('crm');
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [showStatsOnMobile, setShowStatsOnMobile] = useState(true);

  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    events: 0,
    videos: 0,
    testimonials: 0,
    inquiries: 0,
    customers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    const userString = localStorage.getItem('adminUser');

    if (!token || (expiry && Date.now() > Number(expiry))) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminTokenExpiry');
      localStorage.removeItem('adminUser');
      navigate('/admin');
      return;
    }

    if (userString) {
      setAdminUser(JSON.parse(userString));
    }

    const verifyAndLoadStats = async () => {
      try {
        await apiFetch('/auth/verify');
        const [services, products, events, videos, testimonials, inquiries, crmStats] = await Promise.all([
          apiFetch('/services').catch(() => []),
          apiFetch('/products').catch(() => []),
          apiFetch('/events').catch(() => []),
          apiFetch('/videos').catch(() => []),
          apiFetch('/testimonials').catch(() => []),
          apiFetch('/inquiry').catch(() => []),
          apiFetch('/crm/stats').catch(() => ({ totalCustomers: 0 }))
        ]);

        setStats({
          services: services?.length || 0,
          products: products?.length || 0,
          events: events?.length || 0,
          videos: videos?.length || 0,
          testimonials: testimonials?.length || 0,
          inquiries: inquiries?.length || 0,
          customers: crmStats?.totalCustomers || 0
        });
      } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTokenExpiry');
        localStorage.removeItem('adminUser');
        navigate('/admin');
      }
    };

    verifyAndLoadStats();
  }, [navigate]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const navCategories = [
    {
      category: 'Sales & Customer Loyalty',
      items: [
        {
          id: 'crm',
          label: 'Customer CRM & Coupons',
          icon: <Sparkles className="w-4 h-4" />,
          badge: stats.customers > 0 ? `${stats.customers}` : undefined,
          highlight: true,
          description: 'Client directory, discount codes & campaign delivery'
        },
        {
          id: 'inquiries',
          label: 'Inquiries & Orders',
          icon: <PhoneCall className="w-4 h-4" />,
          badge: stats.inquiries > 0 ? `${stats.inquiries}` : undefined,
          highlight: true,
          description: 'Live order requests, class registrations & messages'
        },
        {
          id: 'launch-timer',
          label: 'Site Launch & Timer',
          icon: <Clock className="w-4 h-4" />,
          highlight: true,
          description: 'Configure 3, 4, 5+ min launch countdown timer & curtain reveal'
        }
      ]
    },
    {
      category: 'Website Content',
      items: [
        {
          id: 'banner',
          label: 'Hero Banners',
          icon: <Image className="w-4 h-4" />,
          description: 'Page headlines, hero photos & call-to-actions'
        },
        {
          id: 'about',
          label: 'About Us & Story',
          icon: <UserCheck className="w-4 h-4" />,
          description: 'Heritage history, mission, vision & academy syllabus'
        },
        {
          id: 'services',
          label: 'Services Offered',
          icon: <LayoutGrid className="w-4 h-4" />,
          badge: stats.services > 0 ? `${stats.services}` : undefined,
          description: 'Groom styling, wedding baraat & workshop services'
        },
        {
          id: 'products',
          label: 'Exclusive Collection',
          icon: <Package className="w-4 h-4" />,
          badge: stats.products > 0 ? `${stats.products}` : undefined,
          description: 'Rental props, miniature phetas & royal accessories'
        },
        {
          id: 'events',
          label: 'Upcoming Events',
          icon: <Calendar className="w-4 h-4" />,
          badge: stats.events > 0 ? `${stats.events}` : undefined,
          description: 'Workshops, exhibitions & upcoming public masterclasses'
        },
        {
          id: 'our-work',
          label: 'Our Work Gallery',
          icon: <Layers className="w-4 h-4" />,
          description: 'Photo gallery, weddings & cultural styling portfolio'
        }
      ]
    },
    {
      category: 'Media & Social Proof',
      items: [
        {
          id: 'videos',
          label: 'Conversations & Reels',
          icon: <PlaySquare className="w-4 h-4" />,
          badge: stats.videos > 0 ? `${stats.videos}` : undefined,
          description: 'YouTube videos, Instagram reels & featured talks'
        },
        {
          id: 'media',
          label: 'Media Features',
          icon: <Award className="w-4 h-4" />,
          description: 'News press, newspaper features & award coverage'
        },
        {
          id: 'testimonials',
          label: 'Client Testimonials',
          icon: <Star className="w-4 h-4" />,
          badge: stats.testimonials > 0 ? `${stats.testimonials}` : undefined,
          description: 'Celebrity & groom reviews, ratings & feedback'
        }
      ]
    }
  ];

  const handleSelectTab = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setDrawerSearch('');
    // Scroll content to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = navCategories.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      item.description?.toLowerCase().includes(drawerSearch.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const renderActiveManager = () => {
    switch (activeTab) {
      case 'launch-timer':
        return <LaunchTimerManager />;
      case 'banner':
        return <BannerManager />;
      case 'about':
        return <AboutManager />;
      case 'services':
        return <ServicesManager />;
      case 'products':
        return <ProductsManager />;
      case 'events':
        return <EventsManager />;
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
        return <CRMManager />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex flex-col font-['Roboto',sans-serif] text-[#2E1A14] selection:bg-[#D7A65B] selection:text-white pb-20 md:pb-0">
      {/* Top Royal Navigation Header */}
      <header className="bg-gradient-to-r from-[#3D0A0A] via-[#5A1410] to-[#3D0A0A] text-[#FFFDFB] px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border-b-2 border-[#D7A65B] shadow-lg z-30 sticky top-0">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F3D18A] active:scale-95 transition-all cursor-pointer relative"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
            {stats.inquiries > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#3D0A0A] animate-ping"></span>
            )}
          </button>

          {/* Logo & Title */}
          <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex items-center justify-center border-2 border-[#D7A65B] shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Pheta By Nihar" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-wide leading-tight text-white font-serif">
                  Pheta By Nihar
                </h1>
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#D7A65B]/25 border border-[#D7A65B]/40 text-[#F3D18A] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Admin
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#D7A65B] tracking-widest uppercase font-semibold line-clamp-1">
                Heritage Administration
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* View Website Link */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3D18A] hover:text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[#D7A65B]/30 transition-all"
            title="Open Live Public Website"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          {/* Logged in User Chip (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A0808]/80 border border-[#D7A65B]/40 text-left">
            <div className="w-6 h-6 rounded-full bg-[#D7A65B] text-[#4A0D0D] font-bold text-xs flex items-center justify-center">
              {(adminUser?.username || 'A')[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-white/70 leading-none">Admin</span>
              <span className="text-xs text-[#F3D18A] font-bold leading-tight line-clamp-1 max-w-[100px]">
                {adminUser?.username || 'Administrator'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#2A0808] hover:bg-[#7D201D] text-[#F3D18A] hover:text-white rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-[#D7A65B]/40 shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Log Out of Administration"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-[#E8D8C5] p-4 flex-col gap-6 shrink-0 z-20 shadow-xs min-h-[calc(100vh-62px)]">
          <nav className="flex flex-col gap-5">
            {navCategories.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <div className="px-3 pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">
                    {group.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id as ActiveTab)}
                        className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer text-left ${
                          isActive
                            ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-[#FFFDFB] shadow-md transform translate-x-1'
                            : 'text-[#4D2D22] hover:bg-[#F8F3EC] hover:text-[#6E1E18]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={isActive ? 'text-[#F3D18A]' : 'text-[#C48B3C]'}>
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              isActive
                                ? 'bg-[#F3D18A] text-[#4A0D0D]'
                                : 'bg-[#F8F3EC] text-[#6E1E18] border border-[#E8D8C5]'
                            }`}
                          >
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
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-3 sm:p-5 lg:p-7 flex flex-col gap-4 sm:gap-6 max-w-[1600px] mx-auto w-full">
          {/* Quick Metrics Bar (Collapsible on Mobile) */}
          <div className="bg-white rounded-2xl border border-[#E8D8C5] p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D7A65B]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#4D2D22]">
                  Live Performance Overview
                </h3>
              </div>
              <button
                onClick={() => setShowStatsOnMobile(!showStatsOnMobile)}
                className="md:hidden text-[11px] text-[#6E1E18] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{showStatsOnMobile ? 'Hide Stats' : 'Show Stats'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showStatsOnMobile ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Metrics Grid */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 transition-all ${
                showStatsOnMobile ? 'grid' : 'hidden md:grid'
              }`}
            >
              <button
                onClick={() => handleSelectTab('crm')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Clients
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.customers}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('inquiries')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Inquiries
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.inquiries}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('services')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Services
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.services}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <LayoutGrid className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('products')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Products
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.products}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <Package className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('videos')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Videos
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.videos}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <PlaySquare className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('testimonials')}
                className="bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E8D8C5] p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Reviews
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#4A0D0D] block leading-tight">
                    {stats.testimonials}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D7A65B] shadow-xs">
                  <Star className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Active section manager rendering */}
          <div className="flex-1 w-full">
            {renderActiveManager()}
          </div>
        </main>
      </div>

      {/* Slide-over Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer Sheet */}
          <div className="relative w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-[#3D0A0A] to-[#5A1410] text-white p-4 border-b border-[#D7A65B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full p-1 flex items-center justify-center border border-[#D7A65B]">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white font-serif">Admin Portal</h2>
                  <p className="text-[10px] text-[#D7A65B]">Pheta By Nihar</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="p-3 border-b border-[#E8D8C5] bg-[#F8F3EC]/50">
              <div className="relative">
                <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Jump to manager..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8D8C5] rounded-xl text-xs text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
                />
              </div>
            </div>

            {/* Categories & Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {filteredCategories.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                    {group.category}
                  </span>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id as ActiveTab)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                            isActive
                              ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-white shadow-sm'
                              : 'text-[#4D2D22] hover:bg-[#F8F3EC]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isActive ? 'text-[#F3D18A]' : 'text-[#C48B3C]'}>
                              {item.icon}
                            </span>
                            <div>
                              <div className="font-bold">{item.label}</div>
                              {item.description && (
                                <div className={`text-[10px] line-clamp-1 ${isActive ? 'text-[#F3D18A]/80' : 'text-[#888888]'}`}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.badge && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-[#F3D18A] text-[#4A0D0D]'
                                    : 'bg-[#F8F3EC] text-[#6E1E18] border border-[#E8D8C5]'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : 'text-[#888888]'}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-3 border-t border-[#E8D8C5] bg-[#F8F3EC] flex flex-col gap-2">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-[#E8D8C5] text-xs font-bold text-[#4D2D22] hover:bg-[#FAF6F0]"
              >
                <Globe className="w-3.5 h-3.5 text-[#D7A65B]" />
                <span>Visit Live Website</span>
                <ExternalLink className="w-3 h-3 text-[#888888]" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({adminUser?.username || 'Admin'})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App-Style Mobile Bottom Navigation Bar (`md:hidden`) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#3D0A0A]/95 backdrop-blur-md border-t-2 border-[#D7A65B] px-2 py-1.5 flex items-center justify-around md:hidden shadow-2xl">
        <button
          onClick={() => handleSelectTab('crm')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'crm' ? 'text-[#F3D18A]' : 'text-white/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">CRM</span>
        </button>

        <button
          onClick={() => handleSelectTab('inquiries')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer relative ${
            activeTab === 'inquiries' ? 'text-[#F3D18A]' : 'text-white/70 hover:text-white'
          }`}
        >
          <PhoneCall className="w-5 h-5" />
          {stats.inquiries > 0 && (
            <span className="absolute top-0 right-1.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold text-[9px] leading-tight">
              {stats.inquiries}
            </span>
          )}
          <span className="text-[10px] font-bold mt-0.5">Inquiries</span>
        </button>

        <button
          onClick={() => handleSelectTab('products')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'products' ? 'text-[#F3D18A]' : 'text-white/70 hover:text-white'
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Products</span>
        </button>

        <button
          onClick={() => handleSelectTab('services')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'services' ? 'text-[#F3D18A]' : 'text-white/70 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Services</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">More</span>
        </button>
      </nav>
    </div>
  );
};
