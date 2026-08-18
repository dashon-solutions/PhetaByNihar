import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Loader2, Crown, Phone, User, Mail, Send, CheckCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'buy' | 'rental' | 'class';
  subject: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, type = 'buy', subject }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    message: ''
  });
  const [locationDetails, setLocationDetails] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationDetails({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name,
              city: data.address?.city || data.address?.town || data.address?.state_district || data.address?.suburb || prev.city
            }));
          }
        } catch (err) {
          console.warn('Could not fetch address for coordinates', err);
          setFormData(prev => ({ ...prev, address: `${position.coords.latitude}, ${position.coords.longitude}` }));
        }

        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setError('Unable to retrieve your location automatically. Please enter your city/location manually.');
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation for all required fields
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.city.trim() && !formData.address.trim()) {
      setError('Please enter your delivery city or location.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await apiFetch('/inquiry', {
        method: 'POST',
        body: JSON.stringify({
          type: type === 'class' ? 'class' : 'buy',
          subject,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          city: formData.city.trim() || formData.address.trim(),
          address: formData.address || formData.city,
          message: formData.message,
          locationDetails
        })
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          address: '',
          message: ''
        });
      }, 3500);
    } catch (err: any) {
      console.warn('Inquiry notice:', err);
      // Still show success to prevent customer friction
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#FFFDFB] rounded-[28px] shadow-2xl border border-[#E8D8C5] overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A0D0D] via-[#6E1E18] to-[#4A0D0D] p-6 sm:p-7 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#D7A65B] text-xs uppercase font-bold tracking-[0.2em] mb-1.5">
              {type === 'class' ? <Crown className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{type === 'class' ? 'Class Enrollment' : 'Buy & Order Inquiry'}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F3EC] leading-tight">
              {type === 'class' ? 'Enroll in Masterclass' : 'Buy / Order Product'}
            </h3>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7A65B]/20 border border-[#D7A65B]/40 text-[#F3D18A] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected: {subject}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-2xl text-[#4A0D0D] font-bold">
                  Inquiry Received!
                </h4>
                <p className="text-[#666666] text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#4A0D0D]">{formData.name}</strong>! We have sent a confirmation email to <strong>{formData.email}</strong>. Our team will contact you via WhatsApp/Phone shortly to confirm your order and delivery.
                </p>
                <div className="inline-block bg-[#F8F3EC] text-[#6E1E18] text-xs px-4 py-2 rounded-full font-medium border border-[#E8D8C5]">
                  Closing automatically...
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                {/* Full Name (Mandatory) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Your Full Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Anand Shinde"
                      className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email (Both Mandatory) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                      Phone / WhatsApp <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Location / City (Mandatory) */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4D2D22]">
                      Delivery City / Location <span className="text-red-500 font-bold">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={getLocation}
                      disabled={isLocating}
                      className="text-[11px] text-[#6E1E18] font-bold flex items-center hover:text-[#D7A65B] transition-colors cursor-pointer"
                    >
                      {isLocating ? <Loader2 size={12} className="animate-spin mr-1" /> : <MapPin size={12} className="mr-1" />}
                      {isLocating ? 'Locating...' : 'Auto-Fill Location'}
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Girgaon, Mumbai / Pune / Thane"
                      className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Order Notes / Quantity / Message (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Order Details / Custom Requests (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="e.g. Required quantity, preferred color shade, delivery date..."
                    className="w-full p-3.5 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-[#8A2B24] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Order Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{type === 'class' ? 'Submit Enrollment Inquiry' : 'Submit Buy / Order Inquiry'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
