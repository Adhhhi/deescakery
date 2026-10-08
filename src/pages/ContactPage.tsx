import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { DeesCakeryLogo } from '../components/DeesCakeryLogo';
import {
  MessageCircle,
  Phone,
  Instagram,
  Navigation,
  MapPin,
  Clock,
  ArrowLeft,
  Send,
  Sparkles,
  Heart,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hi Dees Cakery!
👤 Name: ${name || 'Customer'}
🎉 Occasion: ${occasion}
📅 Date Required: ${deliveryDate || 'Flexible'}
🍰 Message / Details: ${messageText || 'Would like to explore cake options'}`;

    window.open(getWhatsAppUrl(formatted), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D18] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex justify-center mb-2">
            <DeesCakeryLogo size={90} />
          </div>
          <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
            We&apos;d love to hear from you ♡
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D18] tracking-tight">
            LET&apos;S MAKE SOMETHING SWEET
          </h1>
          <p className="text-sm sm:text-base text-[#5C4E47] font-light max-w-md mx-auto">
            We are here to answer all your custom cake queries, flavor pairings, and delivery requests in Kavoor.
          </p>
        </div>

        {/* 4 Large Contact Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* WhatsApp Card */}
          <a
            href={getWhatsAppUrl('Hi Dees Cakery! I would like to place an order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1 text-center space-y-3 group shadow-sm"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#E8F8EE] border border-[#25D366]/20 flex items-center justify-center mx-auto text-[#25D366] group-hover:scale-110 transition-transform p-3">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#2B1D18]">WhatsApp</h4>
              <p className="text-xs text-[#6E5F57] mt-1">{BRAND.phone}</p>
            </div>
            <span className="inline-block text-[11px] text-[#25D366] font-semibold font-mono tracking-wide">
              Instant Reply • Tap to chat
            </span>
          </a>

          {/* Call Card */}
          <a
            href={`tel:${BRAND.rawPhone}`}
            className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#2B1D18] transition-all duration-300 hover:-translate-y-1 text-center space-y-3 group shadow-sm"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#F4ECE1] border border-[#EBDED2] flex items-center justify-center mx-auto text-[#2B1D18] group-hover:scale-110 transition-transform p-3">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#2B1D18]">Direct Call</h4>
              <p className="text-xs text-[#6E5F57] mt-1">{BRAND.phone}</p>
            </div>
            <span className="inline-block text-[11px] text-[#C87D65] font-semibold font-mono tracking-wide">
              9:00 AM – 9:30 PM
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] transition-all duration-300 hover:-translate-y-1 text-center space-y-3 group shadow-sm"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#FCF1E8] border border-[#F0D5C3] flex items-center justify-center mx-auto text-[#C87D65] group-hover:scale-110 transition-transform p-3">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#2B1D18]">Instagram</h4>
              <p className="text-xs text-[#6E5F57] mt-1">{BRAND.instagramHandle}</p>
            </div>
            <span className="inline-block text-[11px] text-[#C87D65] font-semibold font-mono tracking-wide">
              Follow for daily bakes
            </span>
          </a>

          {/* Location Card */}
          <a
            href={BRAND.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] transition-all duration-300 hover:-translate-y-1 text-center space-y-3 group shadow-sm"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#F4ECE1] border border-[#EBDED2] flex items-center justify-center mx-auto text-[#C87D65] group-hover:scale-110 transition-transform p-3">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#2B1D18]">Location</h4>
              <p className="text-xs text-[#6E5F57] mt-1 line-clamp-2">{BRAND.address}</p>
            </div>
            <span className="inline-block text-[11px] text-[#C87D65] font-semibold font-mono tracking-wide">
              Kavoor, Mangaluru
            </span>
          </a>
        </div>

        {/* Interactive Consultation Form & Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EBDED2] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="font-script text-2xl text-[#C87D65]">Quick enquiry ♡</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D18]">
                Send an Order Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5F57]">
                Fill in what you need and this will open WhatsApp directly with all your details pre-formatted.
              </p>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ananya Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-3 px-4 text-xs text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-3 px-4 text-xs text-[#2B1D18] focus:outline-none transition-colors"
                  >
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Wedding / Reception</option>
                    <option>Baby Shower</option>
                    <option>Theme Celebration</option>
                    <option>Gift Box / Hampers</option>
                    <option>Other Special Occasion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                    Required Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-3 px-4 text-xs text-[#2B1D18] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                  Flavour or Design Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about weight (e.g. 1kg), favourite flavours (e.g. Belgian truffle, Biscoff), or theme..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-3 px-4 text-xs text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider py-4 rounded-xl shadow transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>SEND DIRECTLY TO WHATSAPP</span>
              </button>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F6EDE2] border border-[#EBDED2] rounded-3xl p-7 space-y-5 shadow-sm">
              <span className="font-script text-2xl text-[#C87D65]">Bakery details ♡</span>
              <h3 className="font-serif text-2xl font-bold text-[#2B1D18]">
                Baking Hours &amp; Location
              </h3>

              <div className="space-y-4 text-xs text-[#5C4E47]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2B1D18] block">Bakery Address:</strong>
                    <span>{BRAND.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2B1D18] block">Operating Hours:</strong>
                    <span>{BRAND.timings}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2B1D18] block">Custom Notice:</strong>
                    <span>For customized cakes and multi-tier designs, please order 24-48 hours in advance.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={BRAND.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#D5C6BA] text-xs font-semibold px-5 py-3 rounded-full transition-colors w-full justify-center"
                >
                  <Navigation className="w-4 h-4 text-[#C87D65]" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>

            {/* Visual Packaging & Pickup Card */}
            <div className="rounded-3xl border border-[#EBDED2] bg-[#FFFFFF] overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9] w-full bg-[#2B1D18]">
                <img
                  src="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80"
                  alt="Freshly boxed bakery treats"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4ECE1]">
                    Careful Handling
                  </span>
                  <h4 className="font-serif text-base font-bold leading-snug">
                    Bespoke Presentation &amp; Safe Transit
                  </h4>
                </div>
              </div>
              <div className="p-4 space-y-2 text-xs text-[#5C4E47]">
                <p>
                  Every cake leaves our studio packed in premium reinforced bakery boxes with cake boards and complimentary celebration candles.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#00a859] font-medium pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#00a859]" />
                  <span>Doorstep delivery available across Mangalore &amp; Kavoor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
