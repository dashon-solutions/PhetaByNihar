import React, { useState, useEffect } from 'react';
import {
  Users, Tag, Search, Plus, Phone, Mail,
  Calendar, CheckCircle, Clock, Send,
  Trash2, Edit, Copy, Sparkles,
  RefreshCw, Check, Gift,
  Layers, ExternalLink
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  serviceOrProduct: string;
  serviceProviderChain: string;
  couponCode: string;
  discountType: 'percentage' | 'fixed_amount' | 'special_benefit';
  discountValue: string;
  couponStatus: 'active' | 'redeemed' | 'expired';
  validUntil: string;
  notes?: string;
  whatsappSentAt?: string;
  emailSentAt?: string;
  createdAt: string;
}

interface CRMStats {
  totalCustomers: number;
  activeCoupons: number;
  redeemedCoupons: number;
  expiredCoupons: number;
}

export const CRMManager: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CRMStats>({
    totalCustomers: 0,
    activeCoupons: 0,
    redeemedCoupons: 0,
    expiredCoupons: 0
  });
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceOrProduct: 'Royal Groom Pheta Styling',
    serviceProviderChain: 'Pheta By Nihar Main',
    couponCode: '',
    discountType: 'percentage' as 'percentage' | 'fixed_amount' | 'special_benefit',
    discountValue: '20% OFF',
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchCustomersAndStats();
  }, [statusFilter, chainFilter]);

  const fetchCustomersAndStats = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (chainFilter !== 'all') params.append('chain', chainFilter);

      const [customersData, statsData] = await Promise.all([
        apiFetch(`/crm/customers?${params.toString()}`).catch(() => []),
        apiFetch('/crm/stats').catch(() => ({ totalCustomers: 0, activeCoupons: 0, redeemedCoupons: 0, expiredCoupons: 0 }))
      ]);

      setCustomers(customersData || []);
      setStats(statsData || { totalCustomers: 0, activeCoupons: 0, redeemedCoupons: 0, expiredCoupons: 0 });
    } catch (error) {
      console.error('Error fetching CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, couponCode: `ROYAL-${randomPart}` }));
  };

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceOrProduct: 'Royal Groom Pheta Styling',
      serviceProviderChain: 'Pheta By Nihar Main',
      couponCode: `ROYAL-${randomPart}`,
      discountType: 'percentage',
      discountValue: '20% OFF',
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cust: Customer) => {
    setEditingCustomer(cust);
    setFormData({
      name: cust.name,
      phone: cust.phone,
      email: cust.email || '',
      serviceOrProduct: cust.serviceOrProduct,
      serviceProviderChain: cust.serviceProviderChain,
      couponCode: cust.couponCode,
      discountType: cust.discountType,
      discountValue: cust.discountValue,
      validUntil: cust.validUntil ? new Date(cust.validUntil).toISOString().split('T')[0] : '',
      notes: cust.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await apiFetch(`/crm/customers/${editingCustomer._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
        showToast('Customer & Coupon updated successfully!', 'success');
      } else {
        await apiFetch('/crm/customers', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        showToast('New Customer & Coupon added successfully!', 'success');
      }
      setIsModalOpen(false);
      fetchCustomersAndStats();
    } catch (error: any) {
      showToast(error.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this customer record?')) return;
    try {
      await apiFetch(`/crm/customers/${id}`, { method: 'DELETE' });
      showToast('Customer record deleted.', 'success');
      fetchCustomersAndStats();
    } catch (error) {
      showToast('Failed to delete customer', 'error');
    }
  };

  const handleToggleStatus = async (cust: Customer) => {
    const nextStatus = cust.couponStatus === 'active' ? 'redeemed' : 'active';
    try {
      await apiFetch(`/crm/customers/${cust._id}`, {
        method: 'PUT',
        body: JSON.stringify({ couponStatus: nextStatus })
      });
      showToast(`Coupon marked as ${nextStatus.toUpperCase()}!`, 'success');
      fetchCustomersAndStats();
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const generateWhatsAppUrl = (cust: Customer) => {
    let cleanPhone = cust.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const formattedDate = cust.validUntil ? new Date(cust.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '90 Days';

    const message = `👑 *Namaskar ${cust.name}!* 👑\n\nThank you for choosing *Pheta By Nihar* for your special occasion. We truly value having you with us!\n\n🎉 Here is your *Exclusive Privilege Coupon Code*:\n🏷️ *Coupon Code:* ${cust.couponCode}\n✨ *Benefit:* ${cust.discountValue}\n⏳ *Valid Until:* ${formattedDate}\n\nPresent or mention this coupon code during your next royal styling, product rental, or share it with your family & friends!\n\n📍 *Pheta By Nihar* - Royal Maharashtrian Heritage & Turban Draping\n📞 *Call/WhatsApp:* +91 98765 43210\n🌐 *Website:* https://phetabynihar.com`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleSendWhatsApp = async (cust: Customer) => {
    const url = generateWhatsAppUrl(cust);
    window.open(url, '_blank');

    // Log in backend
    try {
      await apiFetch(`/crm/customers/${cust._id}/log-whatsapp`, { method: 'POST' });
      setCustomers(prev => prev.map(c => c._id === cust._id ? { ...c, whatsappSentAt: new Date().toISOString() } : c));
    } catch (err) {
      console.warn('Could not log WhatsApp timestamp', err);
    }
  };

  const handleSendEmail = async (cust: Customer) => {
    if (!cust.email) {
      alert('Please add an email address for this customer first.');
      return;
    }

    try {
      const res = await apiFetch(`/crm/customers/${cust._id}/send-email`, { method: 'POST' });
      showToast(res.message || `Coupon email sent to ${cust.email}!`, 'success');
      setCustomers(prev => prev.map(c => c._id === cust._id ? { ...c, emailSentAt: new Date().toISOString() } : c));
    } catch (error: any) {
      showToast(error.message || 'Failed to send email', 'error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const showToast = (text: string, type: 'success' | 'error') => {
    setActionMessage({ text, type });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Filtered by Search Query
  const filteredCustomers = customers.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.couponCode.toLowerCase().includes(q) ||
      c.serviceOrProduct.toLowerCase().includes(q) ||
      c.serviceProviderChain.toLowerCase().includes(q)
    );
  });

  const uniqueChains = Array.from(new Set(customers.map(c => c.serviceProviderChain).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Action Notification Toast */}
      {actionMessage && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm shadow-md transition-all ${
          actionMessage.type === 'success' ? 'bg-green-100 border border-green-300 text-green-800' : 'bg-red-100 border border-red-300 text-red-800'
        }`}>
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)} className="font-bold ml-4">&times;</button>
        </div>
      )}

      {/* Header & Stats Banner */}
      <div className="bg-[#FFFDFB] p-6 sm:p-7 rounded-3xl border border-[#E8D8C5] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8D8C5]/70">
          <div>
            <div className="flex items-center gap-2 text-[#6E1E18] text-xs uppercase font-bold tracking-[0.2em] mb-1">
              <Users className="w-4 h-4 text-[#D7A65B]" />
              <span>Customer Relationship & Loyalty Hub</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#4D2D22]">
              Customer CRM & Coupon Codes
            </h2>
            <p className="text-[#666666] text-sm mt-1">
              Manage client records, partner chain benefits, and send personalized privilege coupons directly via WhatsApp & Email.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shrink-0 border border-[#8A2B24]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Customer & Coupon</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#F8F3EC] p-4 rounded-2xl border border-[#E8D8C5]/60 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#4D2D22] text-[#F3D18A] flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider block">Total Clients</span>
              <span className="font-serif text-2xl font-bold text-[#4D2D22]">{stats.totalCustomers}</span>
            </div>
          </div>

          <div className="bg-green-50/70 p-4 rounded-2xl border border-green-200/60 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-green-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-green-800 uppercase tracking-wider block">Active Coupons</span>
              <span className="font-serif text-2xl font-bold text-green-900">{stats.activeCoupons}</span>
            </div>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/60 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Redeemed</span>
              <span className="font-serif text-2xl font-bold text-blue-900">{stats.redeemedCoupons}</span>
            </div>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Partner Chains</span>
              <span className="font-serif text-2xl font-bold text-amber-900">{uniqueChains.length || 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8D8C5] shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, email, coupon code, service, or chain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-xs font-semibold text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
          >
            <option value="all">All Coupon Statuses</option>
            <option value="active">Active Coupons</option>
            <option value="redeemed">Redeemed Coupons</option>
            <option value="expired">Expired Coupons</option>
          </select>

          {uniqueChains.length > 0 && (
            <select
              value={chainFilter}
              onChange={(e) => setChainFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-xs font-semibold text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
            >
              <option value="all">All Chains / Branches</option>
              {uniqueChains.map((ch, idx) => (
                <option key={idx} value={ch}>{ch}</option>
              ))}
            </select>
          )}

          <button
            onClick={fetchCustomersAndStats}
            title="Refresh list"
            className="p-2.5 rounded-xl border border-[#E8D8C5] bg-[#F8F3EC] hover:bg-white text-[#4D2D22] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Customer Directory List */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-3xl border border-[#E8D8C5]">
          <div className="w-10 h-10 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-[#E8D8C5] shadow-sm">
          <Gift className="w-12 h-12 text-[#D7A65B] opacity-50 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#4D2D22] mb-1">No Customers Found</h3>
          <p className="text-[#666666] text-sm max-w-md mx-auto mb-5">
            {searchQuery ? "No customer records match your search criteria." : "Start building your customer loyalty directory and generating customized privilege coupons."}
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6E1E18] text-[#F3D18A] font-semibold text-xs rounded-full uppercase tracking-wider hover:bg-[#52140F] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Customer</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredCustomers.map((cust) => (
            <div
              key={cust._id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D8C5] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Customer Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif text-xl font-bold text-[#4D2D22]">
                    {cust.name}
                  </span>
                  
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F8F3EC] text-[#6E1E18] border border-[#E8D8C5]">
                    {cust.serviceProviderChain || 'Main Studio'}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    cust.couponStatus === 'active'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : cust.couponStatus === 'redeemed'
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}>
                    {cust.couponStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#666666]">
                  <div className="flex items-center gap-1.5 font-medium text-[#4D2D22]">
                    <Phone className="w-3.5 h-3.5 text-[#D7A65B]" />
                    <a href={`tel:${cust.phone}`} className="hover:underline">{cust.phone}</a>
                  </div>

                  {cust.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D7A65B]" />
                      <a href={`mailto:${cust.email}`} className="hover:underline">{cust.email}</a>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D7A65B]" />
                    <span>Service: <strong className="text-[#4D2D22]">{cust.serviceOrProduct}</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D7A65B]" />
                    <span>Added: {new Date(cust.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {cust.notes && (
                  <p className="text-xs text-[#666666] bg-[#F8F3EC]/80 p-2.5 rounded-xl border border-[#E8D8C5]/50 italic">
                    "{cust.notes}"
                  </p>
                )}
              </div>

              {/* Middle: Coupon Badge */}
              <div className="bg-gradient-to-r from-[#4A0D0D]/5 via-[#D7A65B]/15 to-[#4A0D0D]/5 p-4 rounded-2xl border border-[#D7A65B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 lg:min-w-[280px]">
                <div>
                  <span className="text-[10px] font-bold text-[#6E1E18] uppercase tracking-wider block">
                    Privilege Coupon ({cust.discountValue})
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="font-mono text-base font-bold tracking-widest text-[#4A0D0D] bg-white px-2.5 py-1 rounded-lg border border-[#D7A65B]/60 shadow-xs">
                      {cust.couponCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cust.couponCode)}
                      title="Copy coupon code"
                      className="p-1.5 text-[#6E1E18] hover:text-[#4A0D0D] bg-white hover:bg-[#F8F3EC] rounded-lg border border-[#D7A65B]/40 transition-colors"
                    >
                      {copiedCode === cust.couponCode ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-[#777777] block mt-1">
                    Valid till: {cust.validUntil ? new Date(cust.validUntil).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleStatus(cust)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                    cust.couponStatus === 'active'
                      ? 'bg-green-700 text-white hover:bg-green-800'
                      : 'bg-gray-200 text-[#4D2D22] hover:bg-gray-300'
                  }`}
                >
                  {cust.couponStatus === 'active' ? 'Mark Redeemed' : 'Mark Active'}
                </button>
              </div>

              {/* Right: Quick Action Buttons */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-[#E8D8C5] pt-3 lg:pt-0 lg:pl-5">
                {/* Send on WhatsApp Button */}
                <button
                  onClick={() => handleSendWhatsApp(cust)}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                  title="Open direct WhatsApp with pre-crafted royal coupon greeting"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send on WhatsApp</span>
                  <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
                </button>

                {/* Send Email Button */}
                {cust.email && (
                  <button
                    onClick={() => handleSendEmail(cust)}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    title="Send branded coupon email to customer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </button>
                )}

                {/* Edit & Delete */}
                <div className="flex items-center gap-2 justify-end w-full">
                  <button
                    onClick={() => handleOpenEditModal(cust)}
                    className="p-2 text-[#4D2D22] hover:text-[#6E1E18] bg-[#F8F3EC] hover:bg-white rounded-xl border border-[#E8D8C5] transition-colors"
                    title="Edit Customer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cust._id)}
                    className="p-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
                    title="Delete Customer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Customer & Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8D8C5] overflow-hidden my-8">
            <div className="bg-[#4A0D0D] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[#D7A65B] text-xs uppercase font-bold tracking-wider block">Customer CRM</span>
                <h3 className="font-serif text-2xl font-bold text-[#F8F3EC]">
                  {editingCustomer ? 'Edit Customer & Coupon' : 'Add New Client & Coupon Code'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    Client Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Patil"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    WhatsApp Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@example.com"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    Service / Product Availed
                  </label>
                  <input
                    type="text"
                    value={formData.serviceOrProduct}
                    onChange={(e) => setFormData({ ...formData, serviceOrProduct: e.target.value })}
                    placeholder="e.g. Wedding Pheta Service"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    Service Provider / Partner Chain
                  </label>
                  <input
                    type="text"
                    value={formData.serviceProviderChain}
                    onChange={(e) => setFormData({ ...formData, serviceProviderChain: e.target.value })}
                    placeholder="e.g. Pheta By Nihar Main / Pune Partner"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                    Discount Value / Offer
                  </label>
                  <input
                    type="text"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    placeholder="e.g. 20% OFF or ₹500 OFF"
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="bg-[#F8F3EC] p-4 rounded-2xl border border-[#E8D8C5] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22]">
                    Privilege Coupon Code <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#6E1E18] hover:text-[#D7A65B] transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Generate Random Code</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. ROYAL-89B7K"
                  className="w-full px-4 py-3 bg-white border border-[#D7A65B] rounded-xl font-mono text-base font-bold text-[#4A0D0D] tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-[#D7A65B]"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                  Coupon Expiry / Valid Until Date
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1">
                  Internal Notes / Event Details
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Groom at Taj Vivanta wedding on 24th Nov..."
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white resize-none"
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8D8C5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#666666] hover:bg-[#F8F3EC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-xl transition-all"
                >
                  {editingCustomer ? 'Update Customer' : 'Save & Generate Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
