import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';

export const WhatsAppFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const contacts = [
    {
      name: 'Working / Official Line',
      title: 'Orders, Bookings & Inquiries',
      phone: '+91 86520 28136',
      rawPhone: '918652028136',
      desc: 'Wedding Pheta Draping, Groom Styling & Product Orders',
      badge: 'Working Number',
      message: 'Namaskar! I want to inquire about Wedding Pheta styling and booking services.'
    },
    {
      name: 'Nihar Tambde',
      title: 'Personal Line & Academy',
      phone: '+91 80875 45175',
      rawPhone: '918087545175',
      desc: 'Founder Direct Line, Masterclasses & Certified Workshops',
      badge: 'Personal Number',
      message: 'Namaskar Nihar! I want to connect with you directly regarding Pheta masterclasses / collaboration.'
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Pop-up Options Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-[#E8D8C5] overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#075E54] p-5 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp Menu"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 bg-[#4D1217] flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Pheta By Nihar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight text-[#F8F3EC]">
                    Pheta By Nihar
                  </h3>
                  <p className="text-[11px] text-white/90 font-sans flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
                    <span>Typically replies within minutes</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 bg-black/20 rounded-xl p-2.5 text-[11px] text-[#E8F5E9] leading-relaxed">
                Namaskar! Choose a contact number below to start a direct WhatsApp chat:
              </div>
            </div>

            {/* Contact Options List */}
            <div className="p-4 space-y-3 bg-[#FAF6F0]">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${contact.rawPhone}?text=${encodeURIComponent(contact.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block p-3.5 bg-white rounded-2xl border border-[#E8D8C5] hover:border-[#25D366] hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                        {/* Official WhatsApp SVG Icon */}
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.968.572 3.801 1.564 5.353l-1.635 5.975 6.136-1.609c1.503.896 3.254 1.395 5.093 1.395 5.514 0 10-4.486 10-10s-4.486-10-10-10z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#2E1A14] group-hover:text-[#075E54] transition-colors leading-tight">
                          {contact.name}
                        </h4>
                        <span className="text-[10px] text-[#25D366] font-bold">
                          {contact.badge}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#4D2D22] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E8D8C5]">
                      {contact.phone}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#666666] leading-snug pl-10">
                    {contact.desc}
                  </p>
                </a>
              ))}
            </div>

            {/* Direct Call Footer */}
            <div className="p-3 bg-white border-t border-[#E8D8C5] flex items-center justify-between text-xs text-[#666666] px-4">
              <span className="text-[11px]">Prefer a direct phone call?</span>
              <a
                href="tel:+918652028136"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6E1E18] hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>Call Now (+91 86520 28136)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main WhatsApp Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] flex items-center justify-center transition-all duration-300 border-2 border-white cursor-pointer group overflow-hidden bg-white"
        aria-label="Open WhatsApp Chat Options"
      >
        {/* Pulsating Ping Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />



        {isOpen ? (
          <div className="w-full h-full bg-[#25D366] flex items-center justify-center text-white">
            <X className="w-7 h-7" />
          </div>
        ) : (
          <img
            src="/whatsappicon.jpg"
            alt="WhatsApp Chat"
            className="w-full h-full object-cover"
          />
        )}
      </motion.button>
    </div>
  );
};
