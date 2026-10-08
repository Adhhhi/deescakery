import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { CUSTOM_CAKE_CATEGORIES, getWhatsAppUrl } from '../data/bakeryData';

interface CustomCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOccasion?: string;
  defaultOccasion?: string;
}

export const CustomCakeModal: React.FC<CustomCakeModalProps> = ({
  isOpen,
  onClose,
  initialOccasion,
  defaultOccasion,
}) => {
  const [occasion, setOccasion] = useState(defaultOccasion || initialOccasion || 'BIRTHDAYS');
  const [flavor, setFlavor] = useState('Belgian Dark Chocolate');
  const [weight, setWeight] = useState('1 Kg');
  const [tier, setTier] = useState('Single Tier');
  const [customMessage, setCustomMessage] = useState('');
  const [needEggless, setNeedEggless] = useState(true);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConsultWhatsApp = () => {
    const formatted = `Hi Dees Cakery! I would like to design a custom cake.
🎂 Occasion: ${occasion}
✨ Preferred Flavour: ${flavor}
⚖️ Size / Weight: ${weight}
🍰 Style / Tier: ${tier}
🌱 Vegetarian (Eggless): ${needEggless ? 'Yes' : 'No'}
✍️ Inscription / Design Notes: ${customMessage || 'Would like your guidance / design recommendations'}`;

    window.open(getWhatsAppUrl(formatted), '_blank');
    onClose();
  };

  const flavoursList = [
    'Belgian Dark Chocolate',
    'Dutch Truffle',
    'Lotus Biscoff Crunch',
    'Classic Red Velvet Cream Cheese',
    'Nutella Hazelnut',
    'Fresh Seasonal Fruit / Mango',
    'Madagascar Vanilla Bean',
    'Rasmalai / Indian Fusion',
  ];

  const weightsList = ['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg', '3 Kg+'];
  const tiersList = ['Single Tier', 'Two Tier', 'Tall Extended Tier', 'Cupcake Tower + Mini Cake'];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#FAF6F0] text-[#2B1D18] border border-[#EBDED2] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6B63] hover:text-[#2B1D18] hover:bg-[#F4ECE1] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#C87D65] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customised in Kavoor</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D18]">
            DESIGN YOUR CAKE
          </h3>
          <p className="text-xs sm:text-sm text-[#5C4E47]">
            Share your dream celebration concept with us on WhatsApp.
          </p>
        </div>

        {/* Form elements */}
        <div className="space-y-5">
          {/* Occasion */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-2 font-medium">
              1. Select Occasion
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {CUSTOM_CAKE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setOccasion(cat.name)}
                  className={`rounded-xl border text-left transition-all p-1.5 flex items-center gap-2 ${
                    occasion === cat.name
                      ? 'bg-[#2B1D18] text-[#FAF6F0] border-[#2B1D18] font-bold shadow-sm'
                      : 'bg-[#FFFFFF] text-[#5C4E47] border-[#EBDED2] hover:border-[#C87D65]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-[#2B1D18]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-mono tracking-tight truncate leading-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Flavour */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
              2. Favourite Flavour
            </label>
            <select
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-2.5 px-3.5 text-xs text-[#2B1D18] focus:outline-none"
            >
              {flavoursList.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Weight and Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                3. Estimated Size / Weight
              </label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-2.5 px-3.5 text-xs text-[#2B1D18] focus:outline-none"
              >
                {weightsList.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
                4. Structure
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-2.5 px-3.5 text-xs text-[#2B1D18] focus:outline-none"
              >
                {tiersList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dietary toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="vegCheck"
              checked={needEggless}
              onChange={(e) => setNeedEggless(e.target.checked)}
              className="w-4 h-4 rounded text-[#2B1D18] focus:ring-0 border-[#D5C6BA]"
            />
            <label htmlFor="vegCheck" className="text-xs text-[#5C4E47] cursor-pointer flex items-center gap-1.5">
              <span>Require 100% Pure Vegetarian (Eggless)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a859] inline-block" />
            </label>
          </div>

          {/* Message / Details */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6B63] mb-1.5 font-medium">
              5. Custom Theme / Message / Reference Link
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Lavender floral palette, topper with name 'Rhea turns 5', or reference theme..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl py-2.5 px-3.5 text-xs text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none resize-none"
            />
          </div>

          {/* Action CTA */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto order-2 sm:order-1 flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F4ECE1] text-[#5C4E47] hover:text-[#2B1D18] border border-[#EBDED2] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-full transition-colors active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back / Close</span>
            </button>

            <button
              type="button"
              onClick={handleConsultWhatsApp}
              className="w-full sm:flex-1 order-1 sm:order-2 flex items-center justify-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs sm:text-sm tracking-wider py-3.5 px-6 rounded-full shadow transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>CONSULT ON WHATSAPP</span>
            </button>
          </div>
          <p className="text-center text-[11px] text-[#8E7E76] mt-2">
            Opens WhatsApp with your specs already filled in. No payment needed yet!
          </p>
        </div>
      </div>
    </div>
  );
};
