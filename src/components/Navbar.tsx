import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { DeesCakeryLogo } from './DeesCakeryLogo';
import { Menu, X, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; highlight?: boolean }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'menu', label: 'MENU' },
    { id: 'book_order', label: 'BOOK ORDER', highlight: true },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#2B1D18] text-[#FAF6F0] text-[11px] sm:text-xs py-2 px-4 text-center tracking-widest uppercase font-medium relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="font-script text-base sm:text-lg normal-case text-[#E8A590] -my-1">Homemade with love ♡</span>
          <span className="hidden sm:inline text-[#C87D65]">•</span>
          <span>Delivering Happiness in Kavoor</span>
          <span className="hidden md:inline text-[#C87D65]">•</span>
          <a
            href={getWhatsAppUrl('Hi Dees Cakery! I would like to order a fresh cake.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[#E8A590] hover:text-white underline underline-offset-2 ml-1"
          >
            <span>Order on WhatsApp: {BRAND.phone}</span>
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EBDED2] py-2.5 shadow-sm'
            : 'bg-[#FAF6F0] border-b border-[#EBDED2]/70 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Dees Cakery Home"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <DeesCakeryLogo size={46} showShadow={false} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg md:text-xl font-bold tracking-[0.14em] text-[#2B1D18] group-hover:text-[#C87D65] transition-colors">
                  DEES CAKERY
                </span>
                <span className="font-script text-lg text-[#C87D65] hidden sm:inline">♡</span>
              </div>
              <span className="text-[9px] md:text-[10px] tracking-[0.22em] text-[#8E7E76] font-medium uppercase -mt-0.5">
                HOMEMADE BAKERY • KAVOOR
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-xs lg:text-[13px] tracking-[0.18em] font-medium transition-colors duration-200 py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#2B1D18] font-bold'
                      : link.highlight
                      ? 'text-[#C87D65] hover:text-[#2B1D18]'
                      : 'text-[#5C4E47] hover:text-[#2B1D18]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C87D65] animate-pulse" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C87D65] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA: ORDER ON WHATSAPP */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={getWhatsAppUrl('Hi Dees Cakery! I would like to enquire about ordering a cake.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-medium text-xs lg:text-[12px] tracking-[0.12em] px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
              <span>ORDER ON WHATSAPP</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl('Hi Dees Cakery! I would like to enquire about ordering.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="p-2 text-[#25D366] hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="p-2 text-[#2B1D18] hover:text-[#C87D65] focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 pt-28 px-6 bg-[#FAF6F0]/98 backdrop-blur-xl md:hidden flex flex-col justify-between pb-24 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex items-center justify-between gap-3 pb-5 border-b border-[#EBDED2]">
                <div className="flex items-center gap-3">
                  <DeesCakeryLogo size={42} showShadow={false} />
                  <div>
                    <h3 className="font-serif text-base font-bold tracking-widest text-[#2B1D18]">
                      DEES CAKERY
                    </h3>
                    <p className="text-[9px] tracking-[0.2em] text-[#C87D65] uppercase">
                      DELIVERING HAPPINESS
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EBDED2] text-xs font-semibold text-[#2B1D18] shadow-sm hover:bg-[#F4ECE1] active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-[#7A6B63]" />
                  <span>Close</span>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left text-base font-serif tracking-[0.15em] py-3 border-b border-[#EBDED2] transition-colors flex items-center justify-between ${
                        isActive ? 'text-[#C87D65] font-bold' : 'text-[#2B1D18]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </button>
                  );
                })}
              </nav>

              {/* Direct WhatsApp & Call buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={getWhatsAppUrl('Hi Dees Cakery! I would like to order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#2B1D18] text-[#FAF6F0] font-bold text-xs tracking-wider py-3.5 px-6 rounded-full shadow active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                  <span>ORDER ON WHATSAPP</span>
                </a>

                <a
                  href={`tel:${BRAND.rawPhone}`}
                  className="flex items-center justify-center gap-2 bg-[#F4ECE1] text-[#2B1D18] hover:bg-[#EBDED2] border border-[#EBDED2] text-xs py-3 px-6 rounded-full font-medium"
                >
                  <Phone className="w-4 h-4 text-[#C87D65]" />
                  <span>CALL {BRAND.phone}</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EBDED2] text-center text-xs text-[#8E7E76] space-y-1">
              <p>{BRAND.address}</p>
              <p className="text-[#C87D65]">Kavoor, Mangaluru</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
