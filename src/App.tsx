import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomCakeModal } from './components/CustomCakeModal';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { OrderAndMenuPage } from './pages/OrderAndMenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [customCakeModalOpen, setCustomCakeModalOpen] = useState(false);
  const [customCakeOccasion, setCustomCakeOccasion] = useState<string>('BIRTHDAYS');

  // Smooth scroll to top whenever changing page
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomCakeModal = (occasion: string = 'BIRTHDAYS') => {
    setCustomCakeOccasion(occasion);
    setCustomCakeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D18] font-sans antialiased selection:bg-[#F4ECE1] selection:text-[#2B1D18]">
      {/* 1. Fullscreen Luxury Preloader (Only runs initially) */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 2. Fixed Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* 3. Page Content with Fluid Animated Transitions */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onOpenCustomCakeModal={handleOpenCustomCakeModal}
              />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <GalleryPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {(currentPage === 'menu' || currentPage === 'order_menu') && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <OrderAndMenuPage
                initialSubTab="menu"
                onNavigate={handleNavigate}
                onOpenCustomCakeModal={handleOpenCustomCakeModal}
              />
            </motion.div>
          )}

          {currentPage === 'book_order' && (
            <motion.div
              key="book_order"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <OrderAndMenuPage
                initialSubTab="book_order"
                onNavigate={handleNavigate}
                onOpenCustomCakeModal={handleOpenCustomCakeModal}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <AboutPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <ContactPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Desktop Floating WhatsApp Button & Mobile Action Bar */}
      <FloatingWhatsApp />

      {/* 6. Custom Cake Consultation Modal */}
      <CustomCakeModal
        isOpen={customCakeModalOpen}
        onClose={() => setCustomCakeModalOpen(false)}
        defaultOccasion={customCakeOccasion}
      />
    </div>
  );
}
