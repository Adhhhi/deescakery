import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { BRAND, getWhatsAppUrl } from '../data/bakeryData';
import { X, ChevronLeft, ChevronRight, MessageCircle, Instagram, Heart, Eye } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, items, onClose, onSelect }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl border border-[#EBDED2] flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#EBDED2] shadow transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Frame */}
        <div className="relative md:w-3/5 bg-[#F4ECE1] flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[480px]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover max-h-[500px]"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF6F0]/80 hover:bg-[#FAF6F0] text-[#2B1D18] shadow transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF6F0]/80 hover:bg-[#FAF6F0] text-[#2B1D18] shadow transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Details Sidebar */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF6F0]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F4ECE1] text-[#2B1D18] border border-[#EBDED2]">
                {item.category.replace('_', ' ')}
              </span>
              <span className="font-script text-lg text-[#C87D65]">Dees Cakery ♡</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#2B1D18] leading-tight">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C4E47] leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-[#8E7E76] pt-2">
              {item.likesCount && (
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{item.likesCount} Loves</span>
                </div>
              )}
              {item.viewsCount && (
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#C87D65]" />
                  <span>{item.viewsCount} Views</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-[#EBDED2] space-y-2.5">
            <a
              href={getWhatsAppUrl(
                `Hi Dees Cakery! I loved this cake from your gallery: "${item.title}". Can I order something like this?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider py-3.5 rounded-full shadow transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>ENQUIRE ABOUT THIS DESIGN</span>
            </a>

            {item.instagramUrl && (
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F4ECE1] text-[#2B1D18] border border-[#D5C6BA] text-xs font-semibold py-2.5 rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C87D65]" />
                <span>View on Instagram</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 text-[#7A6B63] hover:text-[#2B1D18] hover:bg-[#F4ECE1] text-xs font-medium py-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
