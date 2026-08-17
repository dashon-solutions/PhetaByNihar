import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Phone, Mail, User, MapPin, MessageSquare, CheckCircle, Loader2, Sparkles, Send } from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface ClassInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass?: string;
  initialBatch?: string;
  classList?: string[];
}

const DEFAULT_COURSES = [
  'Basic Traditional Pheta Tying Workshop',
  'Master Shahi & Royal Pheta Course',
  'Professional Groom & Bridal Safa Certification',
  'Puneri & Kolhapuri Heritage Styling Class',
  'Weekend Intensive Crash Course',
  'Other / Custom One-on-One Workshop'
];

export const ClassInquiryModal: React.FC<ClassInquiryModalProps> = ({
  isOpen,
  onClose,
  initialClass = '',
  initialBatch = '',
  classList = DEFAULT_COURSES
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    selectedClass: initialClass || DEFAULT_COURSES[0],
    city: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialClass) {
      setFormData(prev => ({
        ...prev,
        selectedClass: initialClass
      }));
    }
  }, [initialClass, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await apiFetch('/inquiry', {
        method: 'POST',
        body: JSON.stringify({
          type: 'class',
          subject: formData.selectedClass,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          preferredBatch: initialBatch || '',
          message: formData.message,
          address: formData.city || 'Not specified'
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
          selectedClass: DEFAULT_COURSES[0],
          city: '',
          message: ''
        });
      }, 3500);
    } catch (err: any) {
      console.error('Error submitting class inquiry:', err);
      setError(err.message || 'Failed to submit inquiry. Please try again.');
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
              <GraduationCap className="w-4 h-4" />
              <span>Academy Admissions</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F3EC] leading-tight">
              Enroll in Pheta Class
            </h3>
            <p className="text-white/75 text-xs sm:text-sm mt-1">
              Master the art of traditional Maharashtrian pheta tying under expert master guidance.
            </p>

            {initialBatch && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7A65B]/20 border border-[#D7A65B]/40 text-[#F3D18A] text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Batch: {initialBatch}</span>
              </div>
            )}
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
                  Thank you, <strong className="text-[#4A0D0D]">{formData.name}</strong>! Our academy team will connect with you on WhatsApp/Phone with complete syllabus, fee details, and batch confirmation.
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

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rohan Kulkarni"
                      className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Select Course / Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="selectedClass"
                    value={formData.selectedClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                  >
                    {classList.map((course, idx) => (
                      <option key={idx} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Your City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D7A65B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Pune, Mumbai, Kolhapur, etc."
                      className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Message / Preferred Timing */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4D2D22] mb-1.5">
                    Message / Preferred Dates & Timings (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific questions or preferred schedule..."
                    className="w-full p-3.5 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm text-[#4D2D22] placeholder:text-[#999999] focus:outline-none focus:border-[#6E1E18] focus:bg-white transition-colors resize-none"
                  ></textarea>
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
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Class Enrollment Inquiry</span>
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
