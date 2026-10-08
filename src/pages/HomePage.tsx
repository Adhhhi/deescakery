import React from 'react';
import { PageId } from '../types';
import {
  BRAND,
  IMAGES,
  MENU_ITEMS,
  CUSTOM_CAKE_CATEGORIES,
  WHY_DEES_CAKERY,
  getWhatsAppUrl,
} from '../data/bakeryData';
import { DeesCakeryLogo } from '../components/DeesCakeryLogo';
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Palette,
  Gift,
  Instagram,
  ChevronRight,
  CheckCircle2,
  Star,
  Clock,
  MapPin,
  Smile,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenCustomCakeModal: (occasion?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCustomCakeModal,
}) => {
  // 6 best featured creations
  const featured = MENU_ITEMS.slice(0, 6);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C87D65]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#C87D65]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#C87D65]" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-[#C87D65]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C87D65]" />;
    }
  };

  return (
    <div className="w-full bg-[#FAF6F0] text-[#2B1D18] overflow-hidden">
      {/* ====================================================
          HERO SECTION: Warm Bakery Boutique Presentation
          (Matching the user's template layout & palette)
      ==================================================== */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#FAF6F0] to-[#F6EDE2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Headline, Script Eyebrow & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Script Eyebrow from Template */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2"
              >
                <span className="font-script text-3xl sm:text-4xl text-[#C87D65] font-semibold">
                  Homemade with love ♡
                </span>
              </motion.div>

              {/* Bold Serif Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B1D18] leading-[1.1]"
              >
                MADE FRESH. <br />
                <span className="font-serif italic font-normal text-[#B0654E]">
                  FOR EVERY CELEBRATION.
                </span>
              </motion.h1>

              {/* Subheading Narrative */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.7 }}
                className="text-base sm:text-lg md:text-xl text-[#5C4E47] font-light max-w-xl leading-relaxed"
              >
                Artisanal handcrafted cakes, designer cupcakes, decadent brownies, and bespoke celebration centrepieces baked fresh from scratch in Kavoor.
              </motion.p>

              {/* CTA Buttons - Matching Template */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                {/* Primary Pill Button */}
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-semibold text-xs sm:text-sm tracking-wider px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <span>EXPLORE MENU</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary Pill Button */}
                <button
                  onClick={() => onOpenCustomCakeModal('BIRTHDAYS')}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#D5C6BA] font-medium text-xs sm:text-sm tracking-wider px-7 py-4 rounded-full shadow-sm hover:border-[#2B1D18] transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[#C87D65]" />
                  <span>CUSTOM CAKE ENQUIRY</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="pt-4 flex items-center gap-6 text-xs text-[#8E7E76] flex-wrap"
              >
                <div className="flex items-center gap-1.5 font-medium text-[#4A3B34]">
                  <div className="w-3.5 h-3.5 border-2 border-[#00a859] flex items-center justify-center rounded-[2px]">
                    <div className="w-1.5 h-1.5 bg-[#00a859] rounded-full" />
                  </div>
                  <span>100% Pure Vegetarian</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>Freshly Baked to Order</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C87D65]" />
                  <span>Kavoor, Mangaluru</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Card (Bakery Showcase matching template) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative soft backdrop element */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#EADFD5] rounded-full filter blur-2xl opacity-60 -z-10" />

                {/* Main Framed Card */}
                <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-3xl border border-[#EBDED2] shadow-xl relative">
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/4.2] rounded-2xl overflow-hidden bg-[#F4ECE1]">
                    <img
                      src={IMAGES.hero}
                      alt="Dees Cakery Signature Creation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 bg-[#FAF6F0]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EBDED2] shadow-sm flex items-center gap-1.5">
                      <span className="font-script text-base text-[#C87D65] -my-1">Signature ♡</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2B1D18]">
                        Dees Cakery
                      </span>
                    </div>

                    {/* Badge bottom-right */}
                    <div className="absolute bottom-3 right-3 bg-[#2B1D18]/90 text-[#FAF6F0] backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
                      Made in Kavoor
                    </div>
                  </div>

                  {/* Card bottom details */}
                  <div className="pt-4 px-2 pb-2 flex items-center justify-between">
                    <div>
                      <p className="font-script text-xl text-[#C87D65] -mb-1">Handcrafted with passion</p>
                      <h3 className="font-serif text-base font-bold text-[#2B1D18]">
                        Delivering Sweet Happiness
                      </h3>
                    </div>
                    <a
                      href={getWhatsAppUrl('Hi Dees Cakery! I would like to order a fresh cake.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>

                {/* Floating mini trust pill */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FAF6F0] border border-[#EBDED2] px-4 py-2.5 rounded-2xl shadow-lg items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#C87D65]">
                    <Heart className="w-5 h-5 fill-[#C87D65]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B1D18]">Baked with Love</p>
                    <p className="text-[10px] text-[#8E7E76]">Pure artisanal quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          FEATURE HIGHLIGHTS RIBBON (Soft Warm Linen Band)
      ==================================================== */}
      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-[#F4ECE1] border-y border-[#EBDED2]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="font-script text-2xl text-[#C87D65] -mb-1">Baked Fresh ♡</span>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#2B1D18] uppercase">
              Made to Order
            </p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">Never pre-made or stale</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-script text-2xl text-[#C87D65] -mb-1">Gourmet Taste ♡</span>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#2B1D18] uppercase">
              Pure Ingredients
            </p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">Belgian cocoa &amp; dairy butter</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-script text-2xl text-[#C87D65] -mb-1">Customised ♡</span>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#2B1D18] uppercase">
              Your Unique Dream
            </p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">Themes, tiers &amp; flavours</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-script text-2xl text-[#C87D65] -mb-1">Doorstep Care ♡</span>
            <p className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#2B1D18] uppercase">
              Kavoor &amp; Mangaluru
            </p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">Safely packed &amp; delivered</p>
          </div>
        </div>
      </section>

      {/* ====================================================
          PHILOSOPHY INTRO: "A Little Sweetness from Dees Cakery"
      ==================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-[#C87D65] text-xs font-mono uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4" />
                <span>Our Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1D18] leading-[1.2]">
                A LITTLE SWEETNESS FROM DEES CAKERY
              </h2>

              <p className="text-base sm:text-lg text-[#5C4E47] font-light leading-relaxed">
                From everyday treats to unforgettable celebrations, Dees Cakery creates cakes and
                desserts designed to make every moment a little sweeter.
              </p>

              <p className="text-sm text-[#7A6B63] leading-relaxed">
                Nestled in Gayathri Arcade, Gandhinagara, Kavoor, we bake in boutique small batches with
                uncompromising standards: pure Belgian chocolate, silky buttercreams, fresh fruit
                compotes, and handcrafted artistry that turns your celebration into a lasting memory.
              </p>

              {/* 4 Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                {[
                  { title: 'FRESHLY BAKED', sub: 'Baked only upon order' },
                  { title: 'MADE WITH LOVE', sub: 'Genuine home touch' },
                  { title: 'CUSTOM CREATIONS', sub: 'Your custom vision' },
                  { title: 'DELIVERING HAPPINESS', sub: 'To your doorstep' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C87D65] mb-1.5" />
                    <h4 className="text-xs font-serif font-bold tracking-wider text-[#2B1D18]">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#8E7E76] mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Editorial Image Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#EBDED2] shadow-md group bg-[#FFFFFF] p-2">
                  <img
                    src={IMAGES.featured1}
                    alt="Belgian Truffle Cake"
                    referrerPolicy="no-referrer"
                    className="w-full h-52 sm:h-64 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <p className="font-script text-center text-lg text-[#C87D65] mt-2 mb-1">
                    Chocolate Fudge Cake ♡
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#EBDED2] shadow-md group bg-[#FFFFFF] p-2">
                  <img
                    src={IMAGES.cupcakes}
                    alt="Artisanal Cupcakes"
                    referrerPolicy="no-referrer"
                    className="w-full h-40 sm:h-48 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <p className="font-script text-center text-lg text-[#C87D65] mt-2 mb-1">
                    Rosette Cupcakes ♡
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden border border-[#EBDED2] shadow-md group bg-[#FFFFFF] p-2">
                  <img
                    src={IMAGES.brownies}
                    alt="Fudge Brownies"
                    referrerPolicy="no-referrer"
                    className="w-full h-40 sm:h-48 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <p className="font-script text-center text-lg text-[#C87D65] mt-2 mb-1">
                    Fudge Brownies ♡
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#EBDED2] shadow-md group bg-[#FFFFFF] p-2">
                  <img
                    src={IMAGES.customCake1}
                    alt="Custom Floral Cake"
                    referrerPolicy="no-referrer"
                    className="w-full h-52 sm:h-64 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <p className="font-script text-center text-lg text-[#C87D65] mt-2 mb-1">
                    Botanical Floral Cake ♡
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          FEATURED CREATIONS: "OUR SPECIALTIES"
          (Directly matching the 3-column product cards in the template!)
      ==================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F6EDE2] border-y border-[#EBDED2]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
              Made to order ♡
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1D18]">
              OUR SPECIALTIES
            </h2>
            <p className="text-sm sm:text-base text-[#6E5F57] max-w-md mx-auto">
              A curated selection of our most requested, crowd-cherished celebration cakes and desserts.
            </p>
          </div>

          {/* Products Grid (6 cards matching template) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((item) => (
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
                  <div className="space-y-1.5">
                    {/* Script Category Tag like in template */}
                    <p className="font-script text-xl text-[#C87D65] -mb-1">
                      {item.category === 'cakes'
                        ? 'Artisanal Cake ♡'
                        : item.category === 'cupcakes'
                        ? 'Gourmet Cupcake ♡'
                        : item.category === 'brownies'
                        ? 'Belgian Brownie ♡'
                        : 'Boutique Dessert ♡'}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-[#2B1D18] group-hover:text-[#C87D65] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E5F57] line-clamp-2 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#F0E4D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E7E76] block">
                        Price
                      </span>
                      <span className="text-xs font-mono font-bold text-[#2B1D18]">
                        {item.price}
                      </span>
                    </div>

                    <a
                      href={getWhatsAppUrl(
                        `Hi Dees Cakery! I would like to enquire about the "${item.name}".`
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

          {/* Button leading to Menu */}
          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-medium text-xs sm:text-sm tracking-widest px-8 py-4 rounded-full transition-all shadow-sm"
            >
              <span>SEE COMPLETE MENU</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          CUSTOM CAKES: "A CAKE FOR EVERY OCCASION"
          (Matching the template's occasion section!)
      ==================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
              Bespoke celebration cakes ♡
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1D18] tracking-tight">
              A CAKE FOR EVERY OCCASION
            </h2>
            <p className="text-sm sm:text-base text-[#5C4E47] font-light leading-relaxed max-w-xl mx-auto">
              Have something special in mind? Tell us your celebration concept and let us bring it to life.
            </p>
          </div>

          {/* 6 Category Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CUSTOM_CAKE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onOpenCustomCakeModal(cat.name)}
                className="group cursor-pointer bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col p-2 shadow-sm"
              >
                <div className="aspect-square relative overflow-hidden rounded-xl bg-[#F4ECE1]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-2.5 text-center">
                  <h4 className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#2B1D18] group-hover:text-[#C87D65] transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-[#8E7E76] mt-0.5 line-clamp-1">{cat.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA: DISCUSS YOUR CAKE */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(
                'Hi Dees Cakery! I would like to enquire about a custom cake.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs sm:text-sm tracking-wider px-8 py-4 rounded-full shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
              <span>DISCUSS YOUR CAKE ON WHATSAPP</span>
            </a>

            <button
              onClick={() => onOpenCustomCakeModal('BIRTHDAYS')}
              className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] hover:text-[#C87D65] border border-[#D5C6BA] text-xs sm:text-sm tracking-wider px-7 py-4 rounded-full transition-colors font-medium"
            >
              <Sparkles className="w-4 h-4 text-[#C87D65]" />
              <span>Customize Online</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          WHY DEES CAKERY: Boutique Pillars
      ==================================================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F6EDE2] border-t border-[#EBDED2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
              The boutique promise ♡
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1D18]">
              WHY DEES CAKERY
            </h2>
            <p className="text-sm text-[#6E5F57]">
              Crafted in Kavoor with culinary passion, genuine care, and finest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_DEES_CAKERY.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#EBDED2] hover:border-[#C87D65] transition-all duration-300 space-y-3 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#EBDED2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(pillar.iconName)}
                </div>

                <h3 className="font-serif text-base font-bold tracking-wider text-[#2B1D18] group-hover:text-[#C87D65] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#6E5F57] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          INSTAGRAM COMMUNITY BANNER
      ==================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] border-t border-[#EBDED2]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#EBDED2] px-4 py-1.5 rounded-full text-xs font-mono text-[#C87D65] shadow-sm">
            <Instagram className="w-4 h-4 text-[#C87D65]" />
            <span>INSTAGRAM COMMUNITY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
            FOLLOW THE SWEETNESS
          </h2>

          <p className="text-base text-[#C87D65] font-mono font-semibold tracking-wider">
            {BRAND.instagramHandle}
          </p>

          <p className="text-xs sm:text-sm text-[#6E5F57] max-w-md mx-auto">
            Join our sweet community on Instagram for behind-the-scenes piping reels, customer celebrations, and seasonal hamper drops!
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider px-7 py-3.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>

            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#D5C6BA] text-xs tracking-wider px-6 py-3.5 rounded-full transition-colors font-medium shadow-sm"
            >
              <span>VIEW GALLERY</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
