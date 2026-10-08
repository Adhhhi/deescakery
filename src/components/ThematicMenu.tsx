import React, { useState, useMemo, useEffect } from 'react';
import {
  DEES_FULL_MENU_ITEMS,
  MENU_SECTION_THEMES,
  MENU_SHEETS,
  MenuItemDetail,
  MenuSectionTheme,
  getMenuItemVisual,
} from '../data/deesFullMenu';
import { getWhatsAppUrl, BRAND } from '../data/bakeryData';
import {
  Search,
  X,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ArrowUp,
  LayoutGrid,
  List,
  Calendar,
  RotateCcw,
  Eye,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThematicMenuProps {
  onSelectForBooking: (item: MenuItemDetail) => void;
}

export const ThematicMenu: React.FC<ThematicMenuProps> = ({ onSelectForBooking }) => {
  const [selectedSheet, setSelectedSheet] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewItem, setPreviewItem] = useState<MenuItemDetail | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    if (!previewItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewItem]);

  // Filtered categories based on selected sheet
  const visibleCategories = useMemo(() => {
    if (selectedSheet === 'all') {
      return MENU_SECTION_THEMES;
    }
    return MENU_SECTION_THEMES.filter((theme) => theme.sheetNumber === selectedSheet);
  }, [selectedSheet]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return DEES_FULL_MENU_ITEMS.filter((item) => {
      // Sheet filter
      const matchesSheet = selectedSheet === 'all' || item.sheetNumber === selectedSheet;
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.categoryGroup && item.categoryGroup.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesSheet && matchesCategory && matchesSearch;
    });
  }, [selectedSheet, selectedCategory, searchQuery]);

  // Group filtered items by category for thematic presentation
  const groupedCategories = useMemo(() => {
    const groups: { theme: MenuSectionTheme; items: MenuItemDetail[] }[] = [];

    visibleCategories.forEach((theme) => {
      if (selectedCategory !== 'all' && selectedCategory !== theme.id) {
        return;
      }
      const items = filteredItems.filter((i) => i.category === theme.id);
      if (items.length > 0) {
        groups.push({ theme, items });
      }
    });

    return groups;
  }, [visibleCategories, selectedCategory, filteredItems]);

  const handleClearFilters = () => {
    setSelectedSheet('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Visual Sheet Cards Gallery (Top Overview) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C87D65] font-semibold">
              Explore By Collection
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a859]" />
            <span className="text-[11px] text-[#7A6B63]">100% Pure Vegetarian</span>
          </div>
          {selectedSheet !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setSelectedSheet('all');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#C87D65] hover:text-[#2B1D18] font-mono tracking-wider flex items-center gap-1 font-semibold"
            >
              <span>VIEW ALL SHEETS</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {MENU_SHEETS.map((sheet) => {
            const isSelected = selectedSheet === sheet.number;
            return (
              <button
                key={sheet.number}
                type="button"
                onClick={() => {
                  setSelectedSheet(isSelected ? 'all' : sheet.number);
                  setSelectedCategory('all');
                }}
                className={`group relative rounded-2xl overflow-hidden text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#2B1D18] ring-2 ring-[#2B1D18] shadow-md bg-[#FAF6F0]'
                    : 'border-[#EBDED2] hover:border-[#C87D65] bg-[#FFFFFF] shadow-sm hover:-translate-y-0.5'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#2B1D18]">
                  <img
                    src={sheet.image}
                    alt={sheet.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Sheet Number Badge */}
                  <div className="absolute top-2 left-2 bg-[#FAF6F0]/90 backdrop-blur-sm text-[#2B1D18] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                    SHEET {sheet.number}
                  </div>

                  {/* Active Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#2B1D18] text-[#FAF6F0] p-1 rounded-full shadow">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65]" />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 text-[#FAF6F0]">
                    <h3 className="font-serif text-sm sm:text-base font-bold leading-tight drop-shadow-sm">
                      {sheet.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle & categories count */}
                <div className="p-2.5 sm:p-3 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-[#7A6B63] truncate">
                    {sheet.categoriesCount} Themes
                  </span>
                  <span
                    className={`text-[10px] font-mono tracking-wide font-semibold ${
                      isSelected ? 'text-[#C87D65]' : 'text-[#8E7E76] group-hover:text-[#2B1D18]'
                    }`}
                  >
                    {isSelected ? 'FILTERED' : 'EXPLORE →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1D18] tracking-tight">
              Flavours Directory
            </h2>
            <span className="text-xs font-mono text-[#8E7E76] bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#EBDED2]">
              {filteredItems.length} delicacies
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Bar with Clear Button */}
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-[#8E7E76] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Belgian, Biscoff, Rose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EBDED2] focus:border-[#2B1D18] rounded-full py-2 pl-9 pr-8 text-xs text-[#2B1D18] placeholder-[#9E8E84] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8E7E76] hover:text-[#2B1D18] rounded-full hover:bg-[#EBDED2]/50 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle (Grid vs Minimal List) */}
            <div className="flex items-center bg-[#FAF6F0] border border-[#EBDED2] rounded-full p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#2B1D18] text-[#FAF6F0] shadow-sm'
                    : 'text-[#7A6B63] hover:text-[#2B1D18]'
                }`}
                title="Cards Grid"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#2B1D18] text-[#FAF6F0] shadow-sm'
                    : 'text-[#7A6B63] hover:text-[#2B1D18]'
                }`}
                title="Compact List"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        {visibleCategories.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs border-t border-[#F0E4D8]">
            <span className="text-[10px] font-mono uppercase text-[#8E7E76] flex-shrink-0 mr-1 font-semibold">
              Themes:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full transition-colors flex-shrink-0 font-medium ${
                selectedCategory === 'all'
                  ? 'bg-[#2B1D18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#FAF6F0] text-[#7A6B63] hover:text-[#2B1D18] border border-[#EBDED2]'
              }`}
            >
              All ({visibleCategories.length})
            </button>
            {visibleCategories.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedCategory(theme.id)}
                className={`px-3 py-1 rounded-full transition-colors flex-shrink-0 whitespace-nowrap font-medium ${
                  selectedCategory === theme.id
                    ? 'bg-[#2B1D18] text-[#FAF6F0] shadow-sm'
                    : 'bg-[#FAF6F0] text-[#7A6B63] hover:text-[#2B1D18] border border-[#EBDED2]'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        )}

        {/* Active Filter Summary Bar with Clear Button */}
        {(selectedSheet !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-[#7A6B63] bg-[#FAF6F0] px-3.5 py-2 rounded-xl border border-[#EBDED2]">
            <span>
              Showing <strong className="text-[#2B1D18]">{filteredItems.length}</strong> delicacies
              {searchQuery && <> matching &quot;{searchQuery}&quot;</>}
              {selectedSheet !== 'all' && <> in Sheet {selectedSheet}</>}
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-[11px] text-[#C87D65] hover:text-[#2B1D18] font-semibold hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl p-10 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#EBDED2] flex items-center justify-center mx-auto text-[#8E7E76]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2B1D18]">No bakes found</h3>
            <p className="text-xs text-[#5C4E47] mt-1">
              We couldn&apos;t find any item matching &quot;{searchQuery}&quot;. Dee&apos;s Cakery customizes any flavour upon request!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-[#FAF6F0] hover:bg-[#F4ECE1] text-[#2B1D18] border border-[#EBDED2]"
            >
              Clear Search
            </button>
            <a
              href={getWhatsAppUrl(`Hi Dees Cakery! I was looking for "${searchQuery}" on your menu.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2B1D18] text-[#FAF6F0] text-xs font-semibold px-4 py-2 rounded-full shadow"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* 4. Categorized Items Display with Visual Headers & Photography */}
      <div className="space-y-12">
        {groupedCategories.map(({ theme, items }) => {
          return (
            <section key={theme.id} id={theme.id} className="space-y-4">
              {/* Category Visual Header */}
              <div className="relative rounded-2xl overflow-hidden border border-[#EBDED2] bg-[#FFFFFF] shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#2B1D18] relative shadow-sm border border-[#EBDED2]">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B1D18] tracking-tight">
                        {theme.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#C87D65] uppercase tracking-wider font-semibold">
                        • {theme.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6B63] font-light max-w-xl line-clamp-2">
                      {theme.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 border-t sm:border-t-0 border-[#F0E4D8] pt-2 sm:pt-0">
                  <span className="text-xs font-mono text-[#8E7E76]">
                    {items.length} {items.length === 1 ? 'delicacy' : 'delicacies'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (items[0]) onSelectForBooking(items[0]);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C87D65] hover:text-[#2B1D18] font-semibold"
                  >
                    <span>CUSTOMIZE THEME</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* GRID VIEW (Visual Cards with Food Photography) */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {items.map((item) => {
                    const visualUrl = getMenuItemVisual(item);
                    return (
                      <div
                        key={item.id}
                        className="group bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        {/* Appetizing Food Photo Frame */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2B1D18]">
                          <img
                            src={visualUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                          {/* 100% Eggless Pure Veg Indicator Badge */}
                          <div
                            className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm"
                            title="100% Eggless Vegetarian Bake"
                          >
                            <div className="w-3 h-3 border border-[#00a859] p-[1.5px] flex items-center justify-center rounded-[2px]">
                              <div className="w-1.5 h-1.5 bg-[#00a859] rounded-full" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#2B1D18]">
                              EGGLESS
                            </span>
                          </div>

                          {/* Quick Lightbox Preview Eye Button */}
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-[#FAF6F0] text-[#2B1D18] shadow transition-transform hover:scale-110"
                            title="View high-res photo"
                            aria-label={`Preview photo for ${item.name}`}
                          >
                            <Eye className="w-3.5 h-3.5 text-[#2B1D18]" />
                          </button>
                        </div>

                        {/* Card Content Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1.5">
                            <h4
                              onClick={() => setPreviewItem(item)}
                              className="font-serif text-base font-bold text-[#2B1D18] group-hover:text-[#C87D65] transition-colors leading-snug cursor-pointer"
                            >
                              {item.name}
                            </h4>

                            <p className="text-xs text-[#5C4E47] line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {item.tags.slice(0, 2).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[9px] font-mono text-[#7A6B63] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#EBDED2]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Price & Actions Row */}
                          <div className="pt-3 border-t border-[#F0E4D8] flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-bold text-[#2B1D18]">
                              {item.price}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={getWhatsAppUrl(
                                  `Hi Dees Cakery! I would like to order the "${item.name}" from your menu.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-[#7A6B63] hover:text-[#00a859] hover:bg-[#E8F8EE] transition-colors"
                                title="Enquire on WhatsApp"
                                aria-label={`WhatsApp enquiry for ${item.name}`}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              <button
                                type="button"
                                onClick={() => onSelectForBooking(item)}
                                className="inline-flex items-center gap-1.5 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] text-[11px] font-semibold py-1.5 px-3.5 rounded-full transition-transform active:scale-95 shadow-sm"
                              >
                                <span>Book Order</span>
                                <ArrowRight className="w-3 h-3 text-[#C87D65]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* LIST VIEW (Bistro Style with Food Thumbnails) */
                <div className="bg-[#FFFFFF] border border-[#EBDED2] rounded-2xl divide-y divide-[#F0E4D8] overflow-hidden shadow-sm">
                  {items.map((item) => {
                    const visualUrl = getMenuItemVisual(item);
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF6F0]/60 transition-colors group"
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          {/* Visual Thumbnail */}
                          <div
                            onClick={() => setPreviewItem(item)}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#2B1D18] flex-shrink-0 cursor-pointer shadow-sm relative group-hover:opacity-90"
                          >
                            <img
                              src={visualUrl}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                onClick={() => setPreviewItem(item)}
                                className="font-serif text-sm sm:text-base font-bold text-[#2B1D18] group-hover:text-[#C87D65] transition-colors cursor-pointer truncate"
                              >
                                {item.name}
                              </h4>
                              {item.isVegetarian && (
                                <div
                                  className="w-3.5 h-3.5 border border-[#00a859] p-[1.5px] flex items-center justify-center rounded-[2px] flex-shrink-0"
                                  title="100% Eggless Vegetarian"
                                >
                                  <div className="w-1.5 h-1.5 bg-[#00a859] rounded-full" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-[#7A6B63] line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                          <span className="text-xs font-mono font-bold text-[#2B1D18]">
                            {item.price}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <a
                              href={getWhatsAppUrl(
                                `Hi Dees Cakery! I would like to enquire about "${item.name}".`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-[#7A6B63] hover:text-[#00a859] hover:bg-[#E8F8EE] rounded-full transition-colors"
                              title="Enquire on WhatsApp"
                              aria-label={`WhatsApp enquiry for ${item.name}`}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            <button
                              type="button"
                              onClick={() => onSelectForBooking(item)}
                              className="inline-flex items-center gap-1 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] text-[11px] font-semibold py-1 px-3.5 rounded-full transition-transform active:scale-95 shadow-sm"
                            >
                              <span>Book Order</span>
                              <ArrowRight className="w-3 h-3 text-[#C87D65]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* 5. Food Photo Lightbox Modal */}
      <AnimatePresence>
        {previewItem && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setPreviewItem(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl border border-[#EBDED2] my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Frame */}
              <div className="relative aspect-[16/10] w-full bg-[#2B1D18]">
                <img
                  src={getMenuItemVisual(previewItem)}
                  alt={previewItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4ECE1] block">
                    Dee&apos;s Cakery Artisanal Bake
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                    {previewItem.name}
                  </h3>
                </div>
              </div>

              {/* Modal Details */}
              <div className="p-6 space-y-4 text-[#2B1D18]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-[#00a859] p-[2px] flex items-center justify-center rounded-[2px]">
                      <div className="w-2 h-2 bg-[#00a859] rounded-full" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00a859]">
                      100% PURE VEGETARIAN (EGGLESS)
                    </span>
                  </div>

                  <span className="text-sm font-mono font-bold text-[#2B1D18] bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#EBDED2]">
                    {previewItem.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5C4E47] leading-relaxed">
                  {previewItem.description}
                </p>

                {previewItem.tags && previewItem.tags.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B63] block">
                      Flavour Highlights &amp; Inclusions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {previewItem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-[#2B1D18] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#EBDED2]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal CTA Buttons */}
                <div className="pt-3 border-t border-[#EBDED2] flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectForBooking(previewItem);
                      setPreviewItem(null);
                    }}
                    className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#2B1D18] hover:bg-[#402B21] text-[#FAF6F0] font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#C87D65]" />
                    <span>BOOK THIS CAKE / FLAVOUR</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      `Hi Dees Cakery! I would like to order "${previewItem.name}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#D5C6BA] text-[#2B1D18] font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Minimal Footer Bar & Back to Top */}
      <div className="pt-6 border-t border-[#EBDED2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6B63]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C87D65]" />
          <span>Need a customized multi-tier cake or custom sugarcraft topper? Book in our order tab!</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#EBDED2] font-mono tracking-wider transition-colors shadow-sm"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>BACK TO TOP</span>
        </button>
      </div>
    </div>
  );
};
