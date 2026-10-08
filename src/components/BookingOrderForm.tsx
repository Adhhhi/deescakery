import React, { useState, useRef, useEffect } from 'react';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { DEES_FULL_MENU_ITEMS, MENU_SECTION_THEMES, getMenuItemVisual } from '../data/deesFullMenu';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  X,
  AlertCircle,
  MapPin,
  Heart,
  HelpCircle,
  ShoppingBag,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingOrderFormProps {
  initialItemName?: string;
  initialCategory?: string;
  onSwitchToMenu?: () => void;
}

export const BookingOrderForm: React.FC<BookingOrderFormProps> = ({
  initialItemName = '',
  initialCategory = '',
  onSwitchToMenu,
}) => {
  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('17:00');
  const [category, setCategory] = useState(initialCategory || 'chocoholic_cakes');
  const [selectedItem, setSelectedItem] = useState(initialItemName || 'Choco Dutch Truffle Cake');
  const [customFlavor, setCustomFlavor] = useState('');
  const [weight, setWeight] = useState('1.0 Kg');
  const [customWeight, setCustomWeight] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [customOccasion, setCustomOccasion] = useState('');
  const [cakeInscription, setCakeInscription] = useState('');
  const [dietary, setDietary] = useState('100% Eggless Vegetarian');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Image Reference State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission / Confirmation State
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Quick weight options
  const weightPresets = [
    '0.5 Kg',
    '1.0 Kg',
    '1.5 Kg',
    '2.0 Kg',
    '2.5 Kg',
    '3.0 Kg+',
    '2-Tier (3+ Kg)',
    'Box of 6 (Cupcakes/Brownies)',
    'Box of 12 (Cupcakes/Brownies)',
  ];

  // Occasions list
  const occasions = [
    'Birthday',
    'Anniversary',
    'Wedding / Reception',
    'Engagement',
    'Baby Shower',
    'Kids Theme / Cartoon',
    'Farewell / Office',
    'Housewarming',
    'Festival Celebration',
    'Custom Theme',
  ];

  // Signature Inspiration Presets from Dee's Cakery portfolio
  const inspirationPresets = [
    {
      id: 'insp-1',
      title: 'Belgian Dark Truffle Drip',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      flavour: 'Choco Dutch Truffle Cake',
    },
    {
      id: 'insp-2',
      title: 'Botanical Floral Tier',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
      flavour: 'Tiered Grand Celebration Cake',
    },
    {
      id: 'insp-3',
      title: 'Lotus Biscoff Gold Caramel',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      flavour: 'Lotus Biscoff Salted Caramel Drip Cake',
    },
    {
      id: 'insp-4',
      title: 'Pastel Kids Whimsical Cake',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
      flavour: 'Whimsical Theme & Baby Shower Cake',
    },
    {
      id: 'insp-5',
      title: 'Fresh Seasonal Fruit Gateau',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
      flavour: 'Fresh Exotic Seasonal Fruit Gateau',
    },
    {
      id: 'insp-6',
      title: 'Surprise Pinata Smash Dome',
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
      flavour: 'Surprise Smash Pinata Cake',
    },
  ];

  // Available items filtered by selected category
  const categoryItems = DEES_FULL_MENU_ITEMS.filter((item) => item.category === category);

  // Current selected item detail object for live visual preview
  const currentItemObj = React.useMemo(() => {
    return (
      DEES_FULL_MENU_ITEMS.find((i) => i.name === selectedItem) ||
      categoryItems[0] || {
        id: 'custom',
        name: selectedItem,
        category,
        description: 'Handcrafted fresh celebration cake with silky frosting and gourmet sponge.',
        price: 'PRICE ON REQUEST',
        isVegetarian: true,
      }
    );
  }, [selectedItem, categoryItems, category]);

  const currentTheme = React.useMemo(() => {
    return MENU_SECTION_THEMES.find((t) => t.id === category);
  }, [category]);

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('Image file must be under 10MB.');
        return;
      }
      setImageName(file.name);
      setSelectedPresetImage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: (typeof inspirationPresets)[0]) => {
    setImagePreview(preset.image);
    setImageName(preset.title);
    setSelectedPresetImage(preset.title);
    setSelectedItem(preset.flavour);
    setErrorMessage('');
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageName('');
    setSelectedPresetImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Build Structured WhatsApp Message
  const generateWhatsAppMessage = () => {
    const effectiveWeight = weight === 'Custom' ? customWeight || 'Custom Size' : weight;
    const effectiveOccasion = occasion === 'Custom Theme' ? customOccasion || 'Custom Theme' : occasion;
    const effectiveItem = selectedItem === 'Other Custom Flavor' ? customFlavor || 'Custom Flavor' : selectedItem;

    const lines = [
      '🎂 *NEW CAKE BOOKING - DEES CAKERY*',
      '----------------------------------------',
      `👤 *Client Name:* ${clientName.trim()}`,
      `📞 *Client Phone:* ${clientPhone.trim() || 'Provided in WhatsApp'}`,
      `📅 *Event Date:* ${eventDate || 'To be confirmed'}`,
      `⏰ *Event Time:* ${eventTime || 'To be confirmed'}`,
      `🍰 *Selected Item:* ${effectiveItem}`,
      `🏷️ *Category:* ${category.replace(/_/g, ' ').toUpperCase()}`,
      `⚖️ *Weight / Size:* ${effectiveWeight}`,
      `🎉 *Occasion / Theme:* ${effectiveOccasion}`,
      `✍️ *Cake Inscription:* ${cakeInscription ? `"${cakeInscription}"` : 'None requested'}`,
      `🌿 *Dietary Preference:* ${dietary}`,
      `📍 *Order Type:* ${
        deliveryType === 'delivery'
          ? `Home Delivery to: ${deliveryAddress || 'Address to be shared'}`
          : 'Self-Pickup at Gayathri Arcade, Kavoor'
      }`,
      `🖼️ *Image Reference:* ${
        imageName ? `Referencing design: ${imageName} (attaching photo in chat)` : 'No photo uploaded / Dee’s Cakery signature styling'
      }`,
      specialInstructions ? `📝 *Special Instructions:* ${specialInstructions}` : '',
      '----------------------------------------',
      '💬 _Booked via Dees Cakery Official Web App. Delivering Happiness in Kavoor! ♡_',
    ];

    return lines.filter(Boolean).join('\n');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setErrorMessage('Please enter your name so we know whom to address!');
      return;
    }

    if (!eventDate) {
      setErrorMessage('Please select your event date!');
      return;
    }

    setErrorMessage('');
    const message = generateWhatsAppMessage();
    const url = getWhatsAppUrl(message);

    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowConfirmation(true);
  };

  // Close confirmation modal on Escape
  useEffect(() => {
    if (!showConfirmation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowConfirmation(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmation]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header card with boutique styling */}
      <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6EDE2]/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Back to Menu quick link */}
        {onSwitchToMenu && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onSwitchToMenu}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#C87D65]" />
              <span>← BACK TO MENU</span>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0E4D8]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl sm:text-3xl text-[#C87D65]">
                Custom Celebration Bakes ♡
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18] tracking-tight">
              BOOK YOUR CAKE ORDER
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4E47] font-light max-w-xl">
              Tell us your celebration date, flavour choice, weight, and upload a design reference.
              Your details will be instantly forwarded to Dee&apos;s Cakery via WhatsApp for personalized confirmation!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="flex items-center gap-2 bg-[#FAF6F0] border border-[#EBDED2] px-4 py-2 rounded-full text-xs font-medium text-[#2B1D18]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00a859] animate-pulse" />
              <span>100% Eggless Vegetarian Available</span>
            </div>
            {onSwitchToMenu && (
              <button
                type="button"
                onClick={onSwitchToMenu}
                className="inline-flex items-center gap-1.5 text-xs text-[#C87D65] hover:text-[#2B1D18] font-semibold underline underline-offset-4"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Explore Full Menu</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-2xl bg-[#FFF2F0] border border-[#FFCCC7] flex items-center gap-3 text-xs text-[#CF1322]">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Order Form */}
        <form onSubmit={handleSubmitOrder} className="mt-8 space-y-8">
          {/* SECTION 1: CLIENT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0E4D8]">
              <User className="w-4 h-4 text-[#C87D65]" />
              <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                1. Client Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Client Full Name <span className="text-[#C87D65]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anagha / Priya Rao"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  WhatsApp / Contact Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7A6B63]">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl pl-12 pr-4 py-3 text-xs sm:text-sm text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: EVENT DATE & TIME */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0E4D8]">
              <Calendar className="w-4 h-4 text-[#C87D65]" />
              <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                2. Celebration Date & Time
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Event Date <span className="text-[#C87D65]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[10px] text-[#8E7E76] mt-1 block">
                  Please book at least 24-48 hours in advance for bespoke tiered cakes.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Event / Required Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[10px] text-[#8E7E76] mt-1 block">
                  Bakery operates daily from 9:00 AM to 9:30 PM.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: IMAGE REFERENCE OF THE CAKE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D8]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#C87D65]" />
                <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                  3. Image Reference of Cake / Design Idea
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#8E7E76]">
                Upload custom photo or pick preset
              </span>
            </div>

            {/* Drag and drop / file upload container */}
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D9C8BA] hover:border-[#C87D65] bg-[#FAF6F0] hover:bg-[#F6EDE2]/60 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#EBDED2] shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-[#C87D65]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#2B1D18]">
                  Click or Drag & Drop Cake Image Reference
                </h4>
                <p className="text-xs text-[#7A6B63] mt-1 max-w-sm mx-auto">
                  Have a Pinterest design, Instagram reel screenshot, or custom theme sketch? Upload it here!
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[#C87D65]">
                  <span>Supports JPG, PNG, WEBP (Max 10MB)</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF6F0] border border-[#EBDED2] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-[#2B1D18] flex-shrink-0 relative shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Cake reference"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#00a859] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Image reference loaded</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2B1D18] truncate max-w-xs sm:max-w-md">
                    {imageName || 'Selected Cake Reference'}
                  </h4>
                  <p className="text-[11px] text-[#7A6B63]">
                    {selectedPresetImage
                      ? "From Dee's Cakery signature designs portfolio."
                      : 'Client custom reference uploaded. You can attach it in WhatsApp chat upon redirect.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#2B1D18] text-xs font-medium text-[#2B1D18] transition-colors"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#EBDED2] hover:bg-[#FFF2F0] text-[#CF1322] transition-colors"
                    title="Remove reference"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Or choose from Dee's Cakery signature presets */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7A6B63] block">
                Or pick a quick design inspiration from our signature gallery:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {inspirationPresets.map((preset) => {
                  const isSelected = imageName === preset.title;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`group relative rounded-xl overflow-hidden border text-left transition-all p-1.5 flex flex-col gap-1.5 ${
                        isSelected
                          ? 'border-[#C87D65] bg-[#F6EDE2] ring-2 ring-[#C87D65]/40 shadow-sm'
                          : 'border-[#EBDED2] bg-[#FFFFFF] hover:border-[#C87D65]'
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden relative">
                        <img
                          src={preset.image}
                          alt={preset.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-[#2B1D18] leading-tight line-clamp-1">
                        {preset.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 4: FLAVOUR & CATEGORY SELECTION (FROM THE 4 MENU SHEETS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0E4D8]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C87D65]" />
                <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                  4. Cake Flavour & Category
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#C87D65]">
                Over 90+ Authentic Handcrafted Flavours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const newCat = e.target.value;
                    setCategory(newCat);
                    const matching = DEES_FULL_MENU_ITEMS.filter((i) => i.category === newCat);
                    if (matching.length > 0) {
                      setSelectedItem(matching[0].name);
                    }
                  }}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                >
                  {MENU_SECTION_THEMES.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name} ({theme.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Choose Flavour / Item
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                >
                  {categoryItems.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                  <option value="Other Custom Flavor">Other Custom / Combination Flavor</option>
                </select>
              </div>
            </div>

            {selectedItem === 'Other Custom Flavor' && (
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Specify your custom flavor blend (e.g. Lotus Biscoff + Dark Chocolate Truffle)"
                  value={customFlavor}
                  onChange={(e) => setCustomFlavor(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#C87D65] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none"
                />
              </div>
            )}

            {/* Live Flavour Visual Spotlight Card */}
            <div className="bg-[#FAF6F0] border border-[#EBDED2] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 shadow-sm">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#2B1D18] shadow-sm relative">
                <img
                  src={getMenuItemVisual(currentItemObj)}
                  alt={selectedItem}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  <div className="w-2 h-2 border border-[#00a859] p-[1px] flex items-center justify-center rounded-[1px]">
                    <div className="w-1 h-1 bg-[#00a859] rounded-full" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#00a859]">VEG</span>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C87D65] font-semibold bg-[#FFFFFF] px-2.5 py-0.5 rounded-full border border-[#EBDED2]">
                    {currentTheme?.name || 'Artisanal Cake'}
                  </span>
                  <span className="text-[10px] font-mono text-[#00a859] font-semibold">
                    • 100% Pure Vegetarian (Eggless)
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-[#2B1D18]">
                  {selectedItem}
                </h4>

                <p className="text-xs text-[#5C4E47] line-clamp-2 leading-relaxed">
                  {currentItemObj.description || currentTheme?.description || 'Custom baked fresh for your celebration.'}
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-[11px] font-mono text-[#7A6B63]">
                  <span className="bg-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#EBDED2]">
                    🍰 Serving Size: {weight === '0.5 Kg' ? '4 - 6 people' : weight === '1 Kg' ? '8 - 12 people' : weight === '1.5 Kg' ? '12 - 16 people' : weight === '2 Kg' ? '16 - 22 people' : '25+ people'}
                  </span>
                  <span className="text-[#C87D65] hidden md:inline">
                    • Freshly Made in Kavoor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: WEIGHT / SIZE & OCCASION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0E4D8]">
              <Heart className="w-4 h-4 text-[#C87D65]" />
              <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                5. Weight / Size & Occasion
              </h3>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-2">
                Cake Weight / Serving Size <span className="text-[#C87D65]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {weightPresets.map((w) => {
                  const isSelected = weight === w;
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeight(w)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                        isSelected
                          ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-sm'
                          : 'bg-[#FAF6F0] text-[#5C4E47] hover:text-[#2B1D18] border border-[#EBDED2]'
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setWeight('Custom')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                    weight === 'Custom'
                      ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-sm'
                      : 'bg-[#FAF6F0] text-[#5C4E47] border border-[#EBDED2]'
                  }`}
                >
                  Custom Size...
                </button>
              </div>

              {weight === 'Custom' && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter custom weight or pieces (e.g., 4.5 Kg or 24 Cupcakes Box)"
                    value={customWeight}
                    onChange={(e) => setCustomWeight(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#C87D65] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Occasion / Event Theme
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
                {occasion === 'Custom Theme' && (
                  <input
                    type="text"
                    placeholder="Describe theme (e.g. Jungle Safari / Rose Gold Floral)"
                    value={customOccasion}
                    onChange={(e) => setCustomOccasion(e.target.value)}
                    className="mt-2 w-full bg-[#FAF6F0] border border-[#C87D65] rounded-xl px-4 py-2.5 text-xs text-[#2B1D18] focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                  Dietary Preference
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] focus:outline-none transition-colors"
                >
                  <option value="100% Eggless Vegetarian">100% Eggless Vegetarian (Dee&apos;s Cakery Standard)</option>
                  <option value="Standard Eggless">Standard Eggless</option>
                  <option value="Nut-Free Allergy Request">Nut-Free Request</option>
                  <option value="Low Sugar / Mild Sweetness">Low Sugar / Mild Sweetness</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 6: INSCRIPTION & DELIVERY DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F0E4D8]">
              <MapPin className="w-4 h-4 text-[#C87D65]" />
              <h3 className="font-serif text-lg font-bold text-[#2B1D18]">
                6. Inscription, Delivery & Special Requests
              </h3>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                Message to Write on Cake / Plaque
              </label>
              <input
                type="text"
                placeholder='e.g. "Happy 1st Birthday Vihaan ♡" or "Happy 25th Anniversary Mom & Dad"'
                value={cakeInscription}
                onChange={(e) => setCakeInscription(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-2">
                Pickup or Delivery
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    deliveryType === 'pickup'
                      ? 'border-[#2B1D18] bg-[#FAF6F0] ring-1 ring-[#2B1D18]'
                      : 'border-[#EBDED2] bg-[#FFFFFF] hover:border-[#C87D65]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      deliveryType === 'pickup' ? 'border-[#2B1D18] bg-[#2B1D18]' : 'border-[#8E7E76]'
                    }`}
                  >
                    {deliveryType === 'pickup' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B1D18]">Store Pickup (Recommended)</h4>
                    <p className="text-[11px] text-[#7A6B63] mt-0.5">
                      Gayathri Arcade, Gandhinagara, Kavoor, Mangaluru
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    deliveryType === 'delivery'
                      ? 'border-[#2B1D18] bg-[#FAF6F0] ring-1 ring-[#2B1D18]'
                      : 'border-[#EBDED2] bg-[#FFFFFF] hover:border-[#C87D65]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                      deliveryType === 'delivery' ? 'border-[#2B1D18] bg-[#2B1D18]' : 'border-[#8E7E76]'
                    }`}
                  >
                    {deliveryType === 'delivery' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B1D18]">Home Delivery</h4>
                    <p className="text-[11px] text-[#7A6B63] mt-0.5">
                      Delivery across Kavoor and Mangaluru (charges based on distance)
                    </p>
                  </div>
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <div className="mt-3">
                  <textarea
                    rows={2}
                    placeholder="Enter delivery street address, apartment / landmark in Kavoor or Mangaluru..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#C87D65] rounded-xl p-3 text-xs text-[#2B1D18] focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C4E47] mb-1.5">
                Other Details / Special Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Any special requests: color palette (e.g. pastel pink and gold), acrylic topper, birthday number candles, smash hammer, message card..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-xl p-3 text-xs sm:text-sm text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON ROW */}
          <div className="pt-4 border-t border-[#F0E4D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#7A6B63]">
              <HelpCircle className="w-4 h-4 text-[#C87D65]" />
              <span>Clicking below opens WhatsApp with all your formatted order details!</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              {onSwitchToMenu && (
                <button
                  type="button"
                  onClick={onSwitchToMenu}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F4ECE1] text-[#5C4E47] hover:text-[#2B1D18] border border-[#EBDED2] font-semibold text-xs sm:text-sm px-6 py-4 rounded-full transition-colors active:scale-[0.98]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Menu</span>
                </button>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs sm:text-sm tracking-[0.12em] px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>BOOK ORDER VIA WHATSAPP</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowConfirmation(false);
            }}
            className="fixed inset-0 z-50 bg-[#2B1D18]/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FFFFFF] border border-[#EBDED2] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4"
            >
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 p-2 text-[#7A6B63] hover:text-[#2B1D18] rounded-full hover:bg-[#FAF6F0] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-full bg-[#E8F8EE] border border-[#B7EB8F] flex items-center justify-center mx-auto text-[#00a859]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="text-center space-y-1">
                <span className="font-script text-2xl text-[#C87D65]">
                  Order Details Ready ♡
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2B1D18]">
                  WhatsApp Opened!
                </h3>
                <p className="text-xs text-[#5C4E47] leading-relaxed">
                  We have forwarded your booking details for{' '}
                  <strong className="text-[#2B1D18]">{clientName}</strong> to Dee&apos;s Cakery.
                </p>
              </div>

              {imageName && (
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EBDED2] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2B1D18] flex-shrink-0">
                    <img
                      src={imagePreview || ''}
                      alt="Cake preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-[#2B1D18] line-clamp-1">{imageName}</p>
                    <p className="text-[10px] text-[#C87D65]">
                      Don&apos;t forget to tap the paperclip icon in WhatsApp to attach your photo!
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={getWhatsAppUrl(generateWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] text-xs font-semibold py-3.5 px-6 rounded-full shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Re-open WhatsApp Chat</span>
                </a>

                <div className="flex items-center gap-2">
                  {onSwitchToMenu && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmation(false);
                        onSwitchToMenu();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FAF6F0] hover:bg-[#F4ECE1] text-[#2B1D18] border border-[#EBDED2] text-xs font-semibold py-2.5 px-4 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Menu</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 text-xs text-[#5C4E47] hover:text-[#2B1D18] bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#EBDED2] font-semibold py-2.5 px-4 rounded-full transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
