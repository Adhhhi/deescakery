import React from 'react';
import { PageId } from '../types';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { DeesCakeryLogo } from './DeesCakeryLogo';
import { MessageCircle, Instagram, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'menu', label: 'MENU' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <footer className="bg-[#221714] text-[#FAF6F0] pt-16 pb-28 md:pb-16 relative overflow-hidden border-t border-[#3A2A24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#3A2A24]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <DeesCakeryLogo size={58} showShadow={false} />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-2xl font-bold tracking-[0.16em] text-[#FAF6F0]">
                    {BRAND.name}
                  </h3>
                  <span className="font-script text-xl text-[#C87D65]">♡</span>
                </div>
                <p className="text-[10px] tracking-[0.25em] text-[#C87D65] uppercase font-medium">
                  {BRAND.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#C4B4A9] max-w-sm leading-relaxed font-light">
              Handcrafted cakes, designer cupcakes, decadent brownies, and custom celebration desserts
              baked fresh with love in Kavoor. Making your sweet milestones truly memorable.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#2F211C] border border-[#48352D] flex items-center justify-center text-[#FAF6F0] hover:bg-[#C87D65] hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#2F211C] border border-[#48352D] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              <a
                href={`tel:${BRAND.rawPhone}`}
                aria-label="Phone"
                className="w-10 h-10 rounded-full bg-[#2F211C] border border-[#48352D] flex items-center justify-center text-[#FAF6F0] hover:bg-[#C87D65] hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#C87D65]">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="text-sm tracking-wider hover:text-[#C87D65] transition-colors text-[#DDD0C7]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Ordering */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#C87D65]">
              VISIT &amp; ENQUIRE
            </h4>
            
            <div className="space-y-2.5 text-sm text-[#C4B4A9]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                <span>
                  {BRAND.address}
                  <br />
                  <span className="text-xs text-[#9E8E84]">Kavoor, Mangaluru, Karnataka</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C87D65] shrink-0" />
                <a
                  href={`tel:${BRAND.rawPhone}`}
                  className="hover:text-[#C87D65] transition-colors"
                >
                  {BRAND.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C87D65] shrink-0" />
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C87D65] transition-colors"
                >
                  {BRAND.instagramHandle}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl('Hi Dees Cakery! I would like to place an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FAF6F0] hover:bg-white text-[#221714] font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8988E]">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="font-script text-base text-[#C87D65] -my-1">Homemade with love ♡</span>
            <span>in Kavoor</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#C87D65] transition-colors text-xs tracking-wider uppercase font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
