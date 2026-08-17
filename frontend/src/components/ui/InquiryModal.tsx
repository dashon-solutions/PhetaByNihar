import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Loader2 } from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'rental' | 'class';
  subject: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, type, subject }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [locationDetails, setLocationDetails] = useState<{lat: number, lng: number, accuracy: number} | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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
        
        // Try reverse geocoding via standard API or just set a placeholder
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            setFormData(prev => ({ ...prev, address: data.display_name }));
          }
        } catch (err) {
          console.warn("Could not fetch address for coordinates", err);
          // Fallback if reverse geocoding fails, user can type it or leave it blank if they want, 
          // but we will tell them we got the coordinates.
          setFormData(prev => ({ ...prev, address: `${position.coords.latitude}, ${position.coords.longitude}` }));
        }
        
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setError('Unable to retrieve your location. Please type your address manually.');
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await apiFetch('/inquiry', {
        method: 'POST',
        body: JSON.stringify({
          type,
          subject,
          ...formData,
          locationDetails
        })
      });
      
      setSuccessMessage('Your inquiry has been submitted! We will contact you soon.');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E8D8C5]"
        >
          <div className="flex justify-between items-center p-6 border-b border-[#E8D8C5] bg-[#F8F3EC]">
            <h2 className="font-serif text-2xl font-bold text-[#4D2D22]">
              {type === 'rental' ? 'Inquire about Rental' : 'Enroll in Class'}
            </h2>
            <button onClick={onClose} className="text-[#666666] hover:text-[#6E1E18] transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <p className="text-[#666666] font-sans text-sm mb-6">
              You are inquiring about: <strong className="text-[#4D2D22]">{subject}</strong>
            </p>
            
            {successMessage ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-center">
                {successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm border border-red-200">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-bold text-[#4D2D22] mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D8C5] focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] bg-[#FFFDFB] text-[#4D2D22]"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#4D2D22] mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D8C5] focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] bg-[#FFFDFB] text-[#4D2D22]"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-[#4D2D22]">Address</label>
                    <button 
                      type="button"
                      onClick={getLocation}
                      disabled={isLocating}
                      className="text-xs text-[#6E1E18] font-bold flex items-center hover:text-[#D7A65B] transition-colors"
                    >
                      {isLocating ? <Loader2 size={12} className="animate-spin mr-1"/> : <MapPin size={12} className="mr-1"/>}
                      {isLocating ? 'Locating...' : 'Use Live Location'}
                    </button>
                  </div>
                  <textarea 
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D8C5] focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] bg-[#FFFDFB] text-[#4D2D22] resize-none"
                    placeholder="Enter your address or use live location"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] hover:text-[#FFE3A8] font-sans font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-[#8A2B24] cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
