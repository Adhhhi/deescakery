import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ThematicMenu } from '../components/ThematicMenu';
import { BookingOrderForm } from '../components/BookingOrderForm';
import { MenuItemDetail } from '../data/deesFullMenu';
import { BRAND } from '../data/bakeryData';
import {
  Calendar,
  ShoppingBag,
  Clock,
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderAndMenuPageProps {
  initialSubTab?: 'menu' | 'book_order';
  prefilledItem?: string;
  prefilledCategory?: string;
  onNavigate: (page: PageId) => void;
  onOpenCustomCakeModal: (occasion?: string) => void;
}

export const OrderAndMenuPage: React.FC<OrderAndMenuPageProps> = ({
  initialSubTab = 'menu',
  prefilledItem = '',
  prefilledCategory = '',
  onNavigate,
  onOpenCustomCakeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'book_order'>(initialSubTab);
  const [selectedItemName, setSelectedItemName] = useState(prefilledItem);
  const [selectedCategory, setSelectedCategory] = useState(prefilledCategory);

  useEffect(() => {
    setActiveTab(initialSubTab);
  }, [initialSubTab]);

  const handleSelectItemForBooking = (item: MenuItemDetail) => {
    setSelectedItemName(item.name);
    setSelectedCategory(item.category);
    setActiveTab('book_order');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D18] pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Back */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>HOME</span>
            </button>
            {activeTab === 'book_order' ? (
              <>
                <span className="text-[#D5C6BA]">/</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('menu')}
                  className="text-xs font-mono tracking-widest text-[#C87D65] hover:text-[#2B1D18] transition-colors"
                >
                  ← BACK TO MENU
                </button>
              </>
            ) : (
              <>
                <span className="text-[#D5C6BA]">/</span>
                <span className="text-xs font-mono tracking-widest text-[#2B1D18] font-bold">
                  MENU DIRECTORY
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8E7E76] hidden sm:inline">
              Dee&apos;s Cakery • Gayathri Arcade, Kavoor
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C87D65]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Freshly Baked In Kavoor</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#2B1D18] tracking-tight">
            MENU & CAKE BOOKING
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#5C4E47] font-light max-w-xl mx-auto leading-relaxed">
            Browse our full 90+ artisanal flavours across 4 themed sheets, or book your customized celebration cake with image reference in seconds.
          </p>
        </div>

        {/* Primary Dual Tab Switcher */}
        <div className="max-w-md mx-auto mb-10 p-1.5 bg-[#FFFFFF] border border-[#EBDED2] rounded-full shadow-sm flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-md'
                : 'text-[#5C4E47] hover:text-[#2B1D18]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>THE MENU</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('book_order')}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'book_order'
                ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-md'
                : 'text-[#5C4E47] hover:text-[#2B1D18]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#C87D65]" />
            <span>BOOK ORDER</span>
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'menu' ? (
            <motion.div
              key="menu-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ThematicMenu onSelectForBooking={handleSelectItemForBooking} />
            </motion.div>
          ) : (
            <motion.div
              key="booking-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <BookingOrderForm
                initialItemName={selectedItemName}
                initialCategory={selectedCategory}
                onSwitchToMenu={() => setActiveTab('menu')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helpful Ordering Information Accordion / Cards */}
        <div className="mt-16 pt-10 border-t border-[#EBDED2] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#EBDED2] flex items-center justify-center text-[#C87D65]">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#2B1D18]">
              Advance Notice Period
            </h4>
            <p className="text-xs text-[#5C4E47] leading-relaxed">
              Standard cakes require 24 hours notice. Tiered, customized theme, or pinata cakes require 48 hours for bespoke sugarcraft.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#EBDED2] flex items-center justify-center text-[#00a859]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#2B1D18]">
              100% Eggless Vegetarian
            </h4>
            <p className="text-xs text-[#5C4E47] leading-relaxed">
              All our handcrafted sponge recipes, cupcakes, brownies, and cookies are prepared eggless with pure dairy and premium chocolate.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#EBDED2] flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#2B1D18]">
              Direct WhatsApp Support
            </h4>
            <p className="text-xs text-[#5C4E47] leading-relaxed">
              Have questions about flavor combos, custom designs, or delivery in Kavoor? Chat with the head baker at{' '}
              <strong className="text-[#2B1D18]">{BRAND.phone}</strong>.
            </p>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-[#EBDED2] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C87D65]" />
            <span>BACK TO HOME PAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
