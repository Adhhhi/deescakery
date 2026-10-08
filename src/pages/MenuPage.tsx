import React, { useState } from 'react';
import { MenuItem, PageId } from '../types';
import { MENU_ITEMS, getWhatsAppUrl, BRAND } from '../data/bakeryData';
import {
  MessageCircle,
  Search,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Tag,
  Info,
} from 'lucide-react';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCustomCakeModal: (occasion?: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, onOpenCustomCakeModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs: { id: string; label: string }[] = [
    { id: 'all', label: 'ALL DESSERTS' },
    { id: 'cakes', label: 'CAKES' },
    { id: 'custom_cakes', label: 'CUSTOM CAKES' },
    { id: 'desserts', label: 'DESSERTS' },
    { id: 'cupcakes', label: 'CUPCAKES' },
    { id: 'brownies', label: 'BROWNIES' },
    { id: 'specials', label: 'SPECIALS' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavours?.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D18] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <span className="text-xs font-mono text-[#8E7E76]">
            Showing {filteredItems.length} delicacies
          </span>
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
            Handcrafted with love ♡
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D18] tracking-tight">
            THE MENU
          </h1>
          <p className="text-sm sm:text-base text-[#5C4E47] font-light max-w-lg mx-auto">
            Something sweet for every craving. Baked fresh from scratch in Kavoor using gourmet ingredients.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8E7E76] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flavours, cakes, brownies, cheesecakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#EBDED2] focus:border-[#2B1D18] rounded-full py-3 pl-11 pr-4 text-xs text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8E7E76] hover:text-[#2B1D18]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-sm'
                      : 'bg-[#FFFFFF] text-[#5C4E47] hover:text-[#2B1D18] border border-[#EBDED2] hover:border-[#C87D65]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#EBDED2] p-8 max-w-lg mx-auto space-y-4">
            <p className="font-script text-2xl text-[#C87D65]">No matching bakes found</p>
            <p className="text-sm text-[#7A6B63]">
              Can’t find what you’re craving? We specialize in custom cakes and custom flavours!
            </p>
            <button
              onClick={() => onOpenCustomCakeModal('SPECIALS')}
              className="inline-flex items-center gap-2 bg-[#2B1D18] text-[#FAF6F0] px-6 py-3 rounded-full text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#C87D65]" />
              <span>REQUEST CUSTOM CAKE</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl p-3"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4ECE1]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-sm text-[#2B1D18] border border-[#EBDED2] text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full font-semibold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {item.isVegetarian && (
                    <div
                      className="absolute top-3 right-3 bg-[#FAF6F0]/95 p-1.5 rounded-lg border border-[#EBDED2] shadow-sm"
                      title="100% Vegetarian"
                    >
                      <div className="w-3 h-3 border-2 border-[#00a859] flex items-center justify-center rounded-[2px]">
                        <div className="w-1.5 h-1.5 bg-[#00a859] rounded-full" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="font-script text-xl text-[#C87D65] -mb-1">
                      {item.category === 'cakes'
                        ? 'Layered Cake ♡'
                        : item.category === 'custom_cakes'
                        ? 'Bespoke Design ♡'
                        : item.category === 'cupcakes'
                        ? 'Artisanal Cupcake ♡'
                        : item.category === 'brownies'
                        ? 'Gooey Brownie ♡'
                        : 'Sweet Treat ♡'}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-[#2B1D18] group-hover:text-[#C87D65] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#5C4E47] line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {item.flavours && item.flavours.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {item.flavours.map((flavour, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#F4ECE1] text-[#5C4E47] px-2.5 py-0.5 rounded-full"
                          >
                            {flavour}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#F0E4D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E7E76] block">
                        Pricing
                      </span>
                      <span className="text-xs font-mono font-bold text-[#2B1D18]">
                        {item.price}
                      </span>
                    </div>

                    <a
                      href={getWhatsAppUrl(
                        `Hi Dees Cakery! I would like to order / enquire about the "${item.name}".`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-semibold text-xs px-4 py-2.5 rounded-full transition-transform active:scale-95 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                      <span>ORDER</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Order Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F6EDE2] border border-[#EBDED2] text-center space-y-4 max-w-3xl mx-auto shadow-sm">
          <span className="font-script text-3xl text-[#C87D65]">Looking for a bespoke design? ♡</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D18]">
            Can&apos;t find your exact theme?
          </h3>
          <p className="text-xs sm:text-sm text-[#5C4E47] max-w-lg mx-auto">
            From two-tier floral engagement cakes to custom cartoon birthdays, we create custom designs tailored to your imagination.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenCustomCakeModal()}
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-semibold text-xs sm:text-sm tracking-wider px-8 py-3.5 rounded-full transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C87D65]" />
              <span>CUSTOMISE YOUR CAKE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
