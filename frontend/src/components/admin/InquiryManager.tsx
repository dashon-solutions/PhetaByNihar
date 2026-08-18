import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { Loader2, MapPin, Phone, Mail, Send, GraduationCap } from 'lucide-react';

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

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
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
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
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
      ? `👑 *Namaskar ${inquiry.name}!* 👑\n\nThank you for your interest in our *${inquiry.subject}* at Pheta By Nihar Academy.\n\nWe would love to share the complete syllabus, upcoming batch schedule, and details with you!\n\n📍 *Pheta By Nihar*\n📞 +91 89285 63608 / +91 80875 45175`
      : `👑 *Namaskar ${inquiry.name}!* 👑\n\nThank you for reaching out regarding *${inquiry.subject}* from Pheta By Nihar.\n\nOur team is here to assist you with order confirmation and details.\n\n📍 *Pheta By Nihar*\n📞 +91 89285 63608 / +91 80875 45175`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'buy':
        return { label: 'Buy & Order', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'class':
        return { label: 'Class Enrollment', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'contact':
        return { label: 'Contact Message', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'event':
        return { label: 'Event Booking', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'rental':
        return { label: 'Rental', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      default:
        return { label: type || 'General', bg: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filterType !== 'all' && i.type !== filterType) return false;
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#6E1E18]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#E8D8C5]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#4D2D22]">Customer Inquiries & Orders</h2>
          <p className="text-[#666666] text-sm mt-1">Manage buy orders, class enrollments, and messages</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-lg text-sm text-[#4D2D22] focus:outline-none focus:border-[#D7A65B]"
          >
            <option value="all">All Types</option>
            <option value="buy">Buy / Orders</option>
            <option value="class">Academy Classes</option>
            <option value="contact">Contact Messages</option>
            <option value="event">Event Bookings</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-lg text-sm text-[#4D2D22] focus:outline-none focus:border-[#D7A65B]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Inquiries</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved / Completed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center border border-[#E8D8C5]">
            <p className="text-[#666666]">No inquiries found matching your filters.</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => {
            const badge = getTypeBadge(inquiry.type);
            return (
              <div key={inquiry._id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8D8C5] flex flex-col md:flex-row gap-6">
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      inquiry.status === 'new' ? 'bg-green-100 text-green-800' : 
                      inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="text-[#666666] text-xs">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#4D2D22] mb-1">
                      <span className="text-[#666666] font-sans text-sm font-normal mr-2">Interested in:</span> 
                      {inquiry.subject}
                    </h3>
                    <p className="text-lg font-medium text-[#6E1E18]">{inquiry.name}</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-[#666666]">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 mt-0.5 text-[#D7A65B]" />
                      <div>
                        <span className="block font-bold text-[#4D2D22]">Phone / WhatsApp</span>
                        <a href={`tel:${inquiry.phone}`} className="hover:text-[#6E1E18] underline font-medium">{inquiry.phone}</a>
                      </div>
                    </div>

                    {inquiry.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 mt-0.5 text-[#D7A65B]" />
                        <div>
                          <span className="block font-bold text-[#4D2D22]">Email</span>
                          <a href={`mailto:${inquiry.email}`} className="hover:text-[#6E1E18] underline">{inquiry.email}</a>
                        </div>
                      </div>
                    )}

                    {(inquiry.city || inquiry.address) && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#D7A65B]" />
                        <div>
                          <span className="block font-bold text-[#4D2D22]">Delivery City / Location</span>
                          <p>{inquiry.city || inquiry.address}</p>
                        </div>
                      </div>
                    )}

                    {inquiry.preferredBatch && (
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 mt-0.5 text-[#D7A65B]" />
                        <div>
                          <span className="block font-bold text-[#4D2D22]">Batch Preference</span>
                          <p>{inquiry.preferredBatch}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {inquiry.message && (
                    <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8D8C5] text-xs">
                      <span className="font-bold text-[#4D2D22] block mb-1">Customer Note / Message:</span>
                      <p className="text-[#555555] italic">"{inquiry.message}"</p>
                    </div>
                  )}
                </div>

                {/* Right Action Panel */}
                <div className="flex md:flex-col justify-between items-end gap-3 border-t md:border-t-0 md:border-l border-[#E8D8C5] pt-4 md:pt-0 md:pl-6">
                  <div className="w-full space-y-2">
                    <label className="text-[11px] font-bold text-[#4D2D22] uppercase tracking-wider block">Status</label>
                    <select 
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-lg text-xs font-medium text-[#4D2D22] focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <button
                      onClick={() => handleWhatsAppReply(inquiry)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => deleteInquiry(inquiry._id)}
                      className="w-full px-4 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
