import React, { useState } from 'react';
import { GalleryCategory, GalleryItem, PageId } from '../types';
import { GALLERY_ITEMS, INSTAGRAM_ITEMS, BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { Lightbox } from '../components/Lightbox';
import {
  Instagram,
  Play,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'cakes', label: 'CAKES' },
    { id: 'desserts', label: 'DESSERTS' },
    { id: 'cupcakes', label: 'CUPCAKES' },
    { id: 'brownies', label: 'BROWNIES' },
    { id: 'custom_cakes', label: 'CUSTOM CAKES' },
    { id: 'instagram_reels', label: 'INSTAGRAM REELS' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'instagram_reels') return item.type === 'reel';
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D18] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7A6B63] hover:text-[#2B1D18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#C87D65] hover:underline font-mono"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>{BRAND.instagramHandle}</span>
          </a>
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
            Celebration portfolio ♡
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D18] tracking-tight">
            OUR CREATIONS
          </h1>
          <p className="text-sm sm:text-base text-[#5C4E47] font-light">
            A glimpse into the sweet world of Dees Cakery. Handcrafted fresh in Kavoor for your memorable celebrations.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#2B1D18] text-[#FAF6F0] font-bold shadow-sm'
                    : 'bg-[#FFFFFF] text-[#5C4E47] hover:text-[#2B1D18] border border-[#EBDED2] hover:border-[#C87D65]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid of Creations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl p-3 flex flex-col justify-between"
            >
              {/* Media Wrap */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4ECE1]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Reel indicator overlay */}
                {item.type === 'reel' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FAF6F0]/90 text-[#2B1D18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Top badges */}
                <div className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#2B1D18] border border-[#EBDED2]">
                  {item.category.replace('_', ' ')}
                </div>

                {item.viewsCount && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#C87D65]" />
                    <span>{item.viewsCount}</span>
                  </div>
                )}
              </div>

              {/* Caption info */}
              <div className="p-3 pt-4 space-y-2">
                <p className="font-script text-xl text-[#C87D65] -mb-1">Sweet Moment ♡</p>
                <h3 className="font-serif text-lg font-bold text-[#2B1D18] group-hover:text-[#C87D65] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C4E47] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#F0E4D8] flex items-center justify-between text-xs text-[#8E7E76]">
                  <span className="font-mono text-[11px] text-[#C87D65] font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Click to view details</span>
                  </span>

                  {item.likesCount && (
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>{item.likesCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Instagram Reel Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#F6EDE2] border border-[#EBDED2] text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#EBDED2] px-4 py-1.5 rounded-full text-xs font-mono text-[#C87D65]">
            <Instagram className="w-4 h-4 text-[#C87D65]" />
            <span>@dees_cakery2020 on Instagram</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
            Want to see our latest cake reels?
          </h3>

          <p className="text-xs sm:text-sm text-[#5C4E47] max-w-lg mx-auto">
            We post daily order unboxings, glossy chocolate glaze pours, client celebrations, and behind-the-scenes bakery clips.
          </p>

          <div>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider px-8 py-3.5 rounded-full shadow transition-transform active:scale-95"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>VISIT OUR INSTAGRAM PAGE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(newItem) => setSelectedItem(newItem)}
      />
    </div>
  );
};
