import React from 'react';
import { PageId } from '../types';
import { BRAND, IMAGES, getWhatsAppUrl } from '../data/bakeryData';
import { DeesCakeryLogo } from '../components/DeesCakeryLogo';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowLeft,
  MessageCircle,
  Instagram,
  Check,
  MapPin,
  Clock,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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

        {/* Hero Banner with Logo & Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <DeesCakeryLogo size={130} />
          </div>

          <div className="space-y-2">
            <span className="font-script text-3xl sm:text-4xl text-[#C87D65]">
              Our boutique story ♡
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D18] tracking-tight">
              BAKED WITH LOVE
            </h1>
            <p className="font-serif text-xl sm:text-2xl italic text-[#B0654E] font-normal leading-relaxed max-w-xl mx-auto">
              “Dees Cakery brings together beautiful presentation, delicious flavours and the warmth of homemade baking.”
            </p>
          </div>
        </div>

        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D18]">
              Delivering Happiness, One Slice at a Time
            </h2>

            <p className="text-sm sm:text-base text-[#5C4E47] font-light leading-relaxed">
              Based at Gayathri Arcade in Kavoor, Dees Cakery was born out of an authentic passion for handcrafted baking. We believe that a cake is never just dessert — it is the centerpiece of birthdays, milestones, romantic anniversaries, and joyful family gatherings.
            </p>

            <p className="text-sm sm:text-base text-[#5C4E47] font-light leading-relaxed">
              Every creation is prepared freshly upon order, avoiding mass-production compromises. From rich Belgian chocolate sponges to delicate buttercream floral bouquets, our treats are thoughtfully designed to look stunning and taste heavenly.
            </p>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EBDED2] space-y-1.5 shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C87D65] block font-semibold">
                  Location &amp; Delivery
                </span>
                <p className="text-xs text-[#6E5F57]">
                  Serving Kavoor, Gandhinagara, and surrounding Mangaluru regions with utmost care and hygienic packaging.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#EBDED2] shadow-xl bg-[#FFFFFF] p-3">
              <img
                src={IMAGES.aboutStory}
                alt="Dees Cakery Kitchen Story"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#FAF6F0]/95 backdrop-blur-md p-4 rounded-2xl border border-[#EBDED2] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-script text-xl text-[#C87D65] -mb-1">Handcrafted in Kavoor ♡</span>
                    <h4 className="font-serif text-sm font-bold text-[#2B1D18]">
                      Freshly Baked Everyday
                    </h4>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#C87D65]">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="font-script text-2xl sm:text-3xl text-[#C87D65]">What sets us apart ♡</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B1D18]">
              OUR BAKING PROMISE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EBDED2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#C87D65]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2B1D18]">Boutique Quality</h4>
              <p className="text-xs text-[#5C4E47] leading-relaxed">
                We use pure Belgian cocoa, authentic vanilla extracts, dairy butter, and high-quality chocolate ganaches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EBDED2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#C87D65]">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2B1D18]">100% Pure Vegetarian</h4>
              <p className="text-xs text-[#5C4E47] leading-relaxed">
                All our eggless cakes are delightfully tender, moist, and fluffy, ensuring peace of mind for every guest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EBDED2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4ECE1] flex items-center justify-center text-[#C87D65]">
                <Heart className="w-5 h-5 text-[#C87D65] fill-[#C87D65]" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2B1D18]">Handcrafted Custom Art</h4>
              <p className="text-xs text-[#5C4E47] leading-relaxed">
                Every tier, rosette, and drip is hand-piped with care according to your exact specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Artisanal Baking Process Visual Photo Strip */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="font-script text-2xl text-[#C87D65]">From our studio ♡</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D18]">
              The Craft Behind Every Dee&apos;s Bake
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6B63] max-w-lg mx-auto">
              Small batch baking using real cocoa butter, rich dairy cream, and pure Belgian couverture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group rounded-2xl overflow-hidden border border-[#EBDED2] bg-[#FFFFFF] shadow-sm flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1D18]">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
                  alt="Belgian cocoa & ingredients"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#FAF6F0]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#2B1D18]">
                  STEP 01
                </div>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1D18]">Finest Pure Couverture</h4>
                  <p className="text-xs text-[#5C4E47] mt-1 leading-relaxed">
                    Authentic Dutch cocoa, French butter, and real vanilla bean extract form the foundation of our sponges.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#C87D65] uppercase tracking-wider pt-2 block font-semibold">
                  Zero Artificial Premixes
                </span>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-[#EBDED2] bg-[#FFFFFF] shadow-sm flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1D18]">
                <img
                  src="https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80"
                  alt="Hand piping artisanal cakes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#FAF6F0]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#2B1D18]">
                  STEP 02
                </div>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1D18]">Artisanal Hand-Piping</h4>
                  <p className="text-xs text-[#5C4E47] mt-1 leading-relaxed">
                    Smooth chocolate truffles, caramel drips, and delicate piped rosettes shaped with dedicated craftsmanship.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#C87D65] uppercase tracking-wider pt-2 block font-semibold">
                  100% Eggless Pure Veg
                </span>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-[#EBDED2] bg-[#FFFFFF] shadow-sm flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1D18]">
                <img
                  src="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80"
                  alt="Boutique packaging"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#FAF6F0]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#2B1D18]">
                  STEP 03
                </div>
              </div>
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2B1D18]">Boutique Presentation</h4>
                  <p className="text-xs text-[#5C4E47] mt-1 leading-relaxed">
                    Carefully boxed in reinforced presentation packaging with satin ribbons and personalized message cards.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#C87D65] uppercase tracking-wider pt-2 block font-semibold">
                  Safe Transit Assured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location & CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F6EDE2] border border-[#EBDED2] text-center space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="font-script text-3xl text-[#C87D65]">Come say hello ♡</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D18]">
              Dees Cakery at Gayathri Arcade
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E47] max-w-md mx-auto">
              {BRAND.address}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('Hi Dees Cakery! I would like to order a fresh cake.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2B1D18] hover:bg-[#44342D] text-[#FAF6F0] font-bold text-xs tracking-wider px-8 py-3.5 rounded-full shadow transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>ORDER ON WHATSAPP</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#2B1D18] border border-[#D5C6BA] text-xs tracking-wider px-7 py-3.5 rounded-full font-medium"
            >
              <span>CONTACT INFORMATION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
