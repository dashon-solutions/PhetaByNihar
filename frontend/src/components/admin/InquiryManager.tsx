import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import {
  Loader2, MapPin, Phone, Mail, Send,
  GraduationCap, Search, Trash2,
  Clock, RefreshCw, MessageSquare
} from 'lucide-react';

interface LocationDetails {
  lat: number;
  lng: number;
  accuracy: number;
}

interface Inquiry {
  _id: string;
  type: 'buy' | 'rental' | 'class' | 'contact' | 'event' | 'general';
  subject: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  message?: string;
  preferredBatch?: string;
  locationDetails?: LocationDetails;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export const InquiryManager: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/inquiry');
      if (data) {
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await apiFetch(`/inquiry/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      if (updated) {
        setInquiries(inquiries.map(i => i._id === id ? { ...i, status: newStatus as any } : i));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      await apiFetch(`/inquiry/${id}`, { method: 'DELETE' });
      setInquiries(inquiries.filter(i => i._id !== id));
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const handleWhatsAppReply = (inquiry: Inquiry) => {
    let cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const message = inquiry.type === 'class'
      ? `👑 *Namaskar ${inquiry.name}!* 👑\n\nThank you for your interest in our *${inquiry.subject}* at Pheta By Nihar Academy.\n\nWe would love to share the complete syllabus, upcoming batch schedule, and fee details with you!\n\n📍 *Pheta By Nihar*\n📞 +91 86520 28136 / +91 80875 45175`
      : `👑 *Namaskar ${inquiry.name}!* 👑\n\nThank you for reaching out regarding *${inquiry.subject}* from Pheta By Nihar.\n\nOur team is here to assist you with royal pheta tying orders and customization.\n\n📍 *Pheta By Nihar*\n📞 +91 86520 28136 / +91 80875 45175`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'buy':
        return { label: 'Buy & Order', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      case 'class':
        return { label: 'Academy Class', bg: 'bg-purple-50 text-purple-800 border-purple-300' };
      case 'contact':
        return { label: 'Contact Msg', bg: 'bg-blue-50 text-blue-800 border-blue-300' };
      case 'event':
        return { label: 'Event Booking', bg: 'bg-amber-50 text-amber-800 border-amber-300' };
      case 'rental':
        return { label: 'Pheta Rental', bg: 'bg-indigo-50 text-indigo-800 border-indigo-300' };
      default:
        return { label: type || 'General', bg: 'bg-gray-50 text-gray-800 border-gray-300' };
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filterType !== 'all' && i.type !== filterType) return false;
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = i.name?.toLowerCase().includes(q);
      const matchSubject = i.subject?.toLowerCase().includes(q);
      const matchPhone = i.phone?.includes(q);
      const matchCity = i.city?.toLowerCase().includes(q);
      const matchMsg = i.message?.toLowerCase().includes(q);
      if (!matchName && !matchSubject && !matchPhone && !matchCity && !matchMsg) return false;
    }
    return true;
  });

  const countNew = inquiries.filter(i => i.status === 'new').length;
  const countContacted = inquiries.filter(i => i.status === 'contacted').length;
  const countResolved = inquiries.filter(i => i.status === 'resolved').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xs border border-[#E8D8C5] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22]">
                Customer Inquiries & Orders
              </h2>
              {countNew > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200 animate-pulse">
                  {countNew} New
                </span>
              )}
            </div>
            <p className="text-[#666666] text-xs sm:text-sm mt-0.5">
              Live wedding orders, academy class registrations, and customer messages
            </p>
          </div>

          <button
            onClick={fetchInquiries}
            className="self-end sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8D8C5] bg-[#F8F3EC] hover:bg-white text-[#4D2D22] text-xs font-semibold transition-colors cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Quick Status Chips */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#E8D8C5]/60">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-[#6E1E18] text-white'
                : 'bg-[#F8F3EC] text-[#4D2D22] hover:bg-[#E8D8C5]'
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'new'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>New ({countNew})</span>
          </button>
          <button
            onClick={() => setFilterStatus('contacted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'contacted'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Contacted ({countContacted})</span>
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'resolved'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Resolved ({countResolved})</span>
          </button>
        </div>

        {/* Search & Type Select */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, city, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-xs sm:text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white"
            />
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-xs font-semibold text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
            >
              <option value="all">All Inquiry Types</option>
              <option value="buy">Buy / Orders</option>
              <option value="class">Academy Classes</option>
              <option value="contact">Contact Messages</option>
              <option value="event">Event Bookings</option>
              <option value="rental">Pheta Rentals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiry List */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-[#E8D8C5]">
          <Loader2 className="w-8 h-8 animate-spin text-[#6E1E18]" />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white p-10 sm:p-16 rounded-2xl text-center border border-[#E8D8C5] shadow-xs">
          <MessageSquare className="w-12 h-12 text-[#D7A65B] opacity-50 mx-auto mb-3" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4D2D22] mb-1">
            No Inquiries Found
          </h3>
          <p className="text-[#666666] text-xs sm:text-sm max-w-md mx-auto">
            {searchQuery
              ? 'No customer inquiries match your current search and filters.'
              : 'When customers request orders, masterclasses or contact messages on your website, they will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {filteredInquiries.map((inquiry) => {
            const badge = getTypeBadge(inquiry.type);
            return (
              <div
                key={inquiry._id}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-xs border border-[#E8D8C5] hover:border-[#D7A65B] transition-all flex flex-col lg:flex-row gap-4 sm:gap-6 justify-between"
              >
                <div className="flex-1 space-y-3">
                  {/* Top Metadata Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${badge.bg}`}>
                      {badge.label}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        inquiry.status === 'new'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : inquiry.status === 'contacted'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {inquiry.status}
                    </span>

                    <span className="text-[#888888] text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D7A65B]" />
                      <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Subject & Customer Name */}
                  <div>
                    <h3 className="font-serif text-base sm:text-xl font-bold text-[#4D2D22]">
                      <span className="text-[#888888] font-sans text-xs font-normal mr-1.5">Regarding:</span>
                      {inquiry.subject}
                    </h3>
                    <p className="text-base font-bold text-[#6E1E18] mt-0.5">{inquiry.name}</p>
                  </div>

                  {/* Contact & Location Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#555555]">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F0] border border-[#E8D8C5]/60">
                      <Phone className="w-4 h-4 text-[#D7A65B] shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[10px] uppercase font-bold text-[#888888]">Phone / WhatsApp</span>
                        <a href={`tel:${inquiry.phone}`} className="hover:text-[#6E1E18] font-bold text-[#4D2D22] truncate block">
                          {inquiry.phone}
                        </a>
                      </div>
                    </div>

                    {inquiry.email && (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F0] border border-[#E8D8C5]/60">
                        <Mail className="w-4 h-4 text-[#D7A65B] shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-[10px] uppercase font-bold text-[#888888]">Email Address</span>
                          <a href={`mailto:${inquiry.email}`} className="hover:text-[#6E1E18] text-[#4D2D22] truncate block">
                            {inquiry.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {(inquiry.city || inquiry.address) && (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F0] border border-[#E8D8C5]/60 sm:col-span-2">
                        <MapPin className="w-4 h-4 text-[#D7A65B] shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-[#888888]">Delivery City / Location</span>
                          <span className="text-[#4D2D22] font-medium">{inquiry.city || inquiry.address}</span>
                        </div>
                      </div>
                    )}

                    {inquiry.preferredBatch && (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F0] border border-[#E8D8C5]/60 sm:col-span-2">
                        <GraduationCap className="w-4 h-4 text-[#D7A65B] shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-[#888888]">Batch Preference</span>
                          <span className="text-[#4D2D22] font-medium">{inquiry.preferredBatch}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Note */}
                  {inquiry.message && (
                    <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8D8C5] text-xs">
                      <span className="font-bold text-[#4D2D22] block mb-1">Customer Note / Message:</span>
                      <p className="text-[#555555] italic">"{inquiry.message}"</p>
                    </div>
                  )}
                </div>

                {/* Right Action Column */}
                <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end gap-2.5 border-t lg:border-t-0 lg:border-l border-[#E8D8C5] pt-3 lg:pt-0 lg:pl-6 lg:w-48 shrink-0">
                  {/* Status Dropdown */}
                  <div className="w-1/2 lg:w-full">
                    <label className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block mb-1">
                      Update Status
                    </label>
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-xs font-semibold text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
                    >
                      <option value="new">🔴 New</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="resolved">🟢 Resolved</option>
                    </select>
                  </div>

                  {/* WhatsApp and Delete Buttons */}
                  <div className="flex items-center gap-2 w-1/2 lg:w-full">
                    <button
                      onClick={() => handleWhatsAppReply(inquiry)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
                      title="Send WhatsApp Reply"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => deleteInquiry(inquiry._id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded-xl transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
