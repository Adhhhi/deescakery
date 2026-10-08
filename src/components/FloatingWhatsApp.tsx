import React, { useState, useEffect } from 'react';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { MessageCircle, Instagram, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showEntranceNotice, setShowEntranceNotice] = useState(false);

  // Show a gentle attention-grabbing notice bubble shortly after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntranceNotice(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom-Right) with subtle entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="hidden md:block fixed bottom-8 right-8 z-40"
      >
        <div className="relative group">
          {/* Subtle Attention Notice with Close Button */}
          <AnimatePresence>
            {showEntranceNotice && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 bottom-full mb-3 whitespace-nowrap bg-[#FFFFFF] text-[#2B1D18] border border-[#EBDED2] text-xs py-2 pl-3.5 pr-2.5 rounded-2xl shadow-xl flex items-center gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-[11px] leading-tight text-[#2B1D18]">
                    Chat with Dee&apos;s Cakery
                  </span>
                  <span className="text-[10px] text-[#7A6B63] leading-tight">
                    Delivering fresh in Kavoor ♡
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEntranceNotice(false);
                  }}
                  aria-label="Close message"
                  className="p-1 rounded-full text-[#8E7E76] hover:text-[#2B1D18] hover:bg-[#FAF6F0] transition-colors ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Tooltip */}
          <div
            className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#FAF6F0] text-[#2B1D18] border border-[#EBDED2] text-xs px-3.5 py-1.5 rounded-full shadow-lg transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
              showTooltip && !showEntranceNotice ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
            <span className="font-medium">Order / Enquire on WhatsApp</span>
          </div>

          <a
            href={getWhatsAppUrl('Hi Dees Cakery! I would like to order / enquire about your cakes.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_6px_25px_rgba(37,211,102,0.42)] transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none"
          >
            {/* Subtle attention ring pulse */}
            <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/40 animate-pulse pointer-events-none" />
            <MessageCircle className="w-7 h-7 fill-white text-white transition-transform group-hover:rotate-6 relative z-10" />
          </a>
        </div>
      </motion.div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-lg border-t border-[#EBDED2] px-4 py-2.5 shadow-lg safe-area-bottom">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          {/* Instagram Button */}
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFFFFF] hover:bg-[#F4ECE1] text-[#2B1D18] border border-[#EBDED2] font-medium text-xs py-3 px-3 rounded-full transition-transform active:scale-95 shadow-sm"
          >
            <Instagram className="w-4 h-4 text-[#C87D65]" />
            <span className="truncate">Instagram</span>
          </a>

          {/* Primary WhatsApp Button */}
          <a
            href={getWhatsAppUrl('Hi Dees Cakery! I would like to place an order / enquire.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Order"
            className="flex-[2] flex items-center justify-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider py-3 px-4 rounded-full shadow transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
            <span className="truncate">WHATSAPP ORDER</span>
          </a>
        </div>
      </div>
    </>
  );
};
