import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DeesCakeryLogo } from './DeesCakeryLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
          }, 250);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6F0] text-[#2B1D18] px-6"
        >
          {/* Subtle Ambient Warm Glow */}
          <div className="absolute w-80 h-80 rounded-full bg-[#C87D65]/10 blur-3xl pointer-events-none" />

          {/* Center Logo with elegant entrance */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              <DeesCakeryLogo size={160} />
            </div>

            {/* Brand Title and Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-6 text-center space-y-1"
            >
              <h2 className="text-xl md:text-2xl font-serif tracking-[0.22em] text-[#2B1D18] font-bold uppercase">
                DEES CAKERY
              </h2>
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-script text-xl text-[#C87D65] normal-case">
                  Delivering Happiness ♡
                </span>
              </div>
            </motion.div>

            {/* Warm Progress Indicator */}
            <div className="mt-7 w-44 md:w-56 h-[3px] bg-[#EBDED2] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#2B1D18]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-[11px] tracking-widest text-[#8E7E76] uppercase font-mono"
            >
              Homemade in Kavoor • Mangaluru
            </motion.p>
          </motion.div>

          {/* Instant Skip button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onComplete, 150);
            }}
            className="absolute bottom-8 text-[11px] uppercase tracking-[0.18em] text-[#8E7E76] hover:text-[#2B1D18] transition-colors py-1.5 px-3.5 border border-[#EBDED2] rounded-full bg-[#FFFFFF] shadow-sm"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
