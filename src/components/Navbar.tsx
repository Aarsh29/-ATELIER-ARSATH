import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Moon, Sun, Bookmark, ArrowUpRight } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    activeRoute,
    navigateTo,
    wishlist,
    isMenuOpen,
    setIsMenuOpen,
    playSfx
  } = useAtelier();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { number: '01', label: 'COLLECTIONS', route: '/collections', sub: 'Bridal, Pattu & Haute Evening' },
    { number: '02', label: 'THE ATELIER', route: '/atelier', sub: 'The Architecture of Tamil Silk' },
    { number: '03', label: 'CRAFT & AARI', route: '/craft', sub: 'Tambour Needle Meditation' },
    { number: '04', label: 'FABRIC ARCHIVE', route: '/fabrics', sub: 'Mulberry, Banarasi & Gossamer Tissue' },
    { number: '05', label: 'DESIGN YOUR OWN', route: '/design-your-own', sub: 'Bespoke Silhouette Configurator' },
    { number: '06', label: 'VIRTUAL TRIAL', route: '/virtual-trial', sub: 'Drape & Silhouette Studio' },
    { number: '07', label: 'ASK THE STYLIST', route: '/stylist', sub: 'Private Consultation Intelligence' },
    { number: '08', label: 'WEDDING PLANNER', route: '/wedding-planner', sub: 'Couture Wardrobe for 5 Rituals' },
    { number: '09', label: 'CURATED GALLERY', route: '/gallery', sub: 'Asymmetric Editorial Exhibition' },
    { number: '10', label: 'THE BOUTIQUE', route: '/boutique', sub: 'Architectural Salon & Visit' },
    { number: '11', label: 'BOOK APPOINTMENT', route: '/book-appointment', sub: 'Private Salon Consultation' },
    { number: '12', label: 'MY ATELIER', route: '/my-atelier', sub: 'Personal Couture Scrapbook' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 select-none ${
          isScrolled
            ? 'py-4 bg-[#0F0D0C]/90 backdrop-blur-md border-b border-[#C5A880]/20'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Left: Brand Identity / Monogram */}
          <button
            onClick={() => {
              navigateTo('/');
              playSfx('click');
            }}
            className="group flex items-center gap-3 text-left cursor-pointer focus:outline-none"
            data-cursor="HOME"
          >
            <span className="text-[13px] tracking-[0.25em] font-serif uppercase font-semibold transition-colors duration-300 group-hover:text-[#C5A880]">
              ATELIER AARSH
            </span>
            <span className="hidden lg:inline-block text-[9px] uppercase tracking-[0.35em] text-[#8C7A6B] pl-2 border-l border-[#8C7A6B]/30 font-sans">
              COUTURE HOUSE
            </span>
          </button>

          {/* Center: Minimal Contextual Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {[
              { label: 'COLLECTIONS', route: '/collections' },
              { label: 'THE CRAFT', route: '/craft' },
              { label: 'DESIGN OUTFIT', route: '/design-your-own' },
              { label: 'FABRICS', route: '/fabrics' },
              { label: 'STYLIST', route: '/stylist' },
            ].map((item) => (
              <button
                key={item.route}
                onClick={() => {
                  navigateTo(item.route);
                  playSfx('click');
                }}
                className="relative text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 py-1 cursor-pointer focus:outline-none font-medium text-current hover:text-[#C5A880]"
              >
                {item.label}
                {activeRoute === item.route && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A880]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Controls & Menu Trigger */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Audio Ambience Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playSfx('click');
              }}
              title={soundEnabled ? 'Disable Atelier Sound' : 'Enable Atelier Ambient Audio'}
              className="p-2 rounded-full border border-current/15 hover:border-[#C5A880] transition-colors cursor-pointer text-xs"
              data-cursor={soundEnabled ? 'MUTE' : 'SOUND'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            {/* Midnight / Light Atelier Mode */}
            <button
              onClick={toggleTheme}
              title={theme === 'midnight' ? 'Switch to Light Atelier' : 'Switch to Midnight Atelier'}
              className="p-2 rounded-full border border-current/15 hover:border-[#C5A880] transition-colors cursor-pointer"
              data-cursor="MODE"
            >
              {theme === 'midnight' ? (
                <Sun className="w-3.5 h-3.5 text-[#C5A880]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#5C534D]" />
              )}
            </button>

            {/* Scrapbook / Wishlist Indicator */}
            <button
              onClick={() => {
                navigateTo('/my-atelier');
                playSfx('click');
              }}
              className="relative p-2 rounded-full border border-current/15 hover:border-[#C5A880] transition-colors cursor-pointer"
              title="My Atelier Scrapbook"
              data-cursor="SAVED"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C5A880] text-[#0F0D0C] text-[8px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Private Appointment CTA */}
            <button
              onClick={() => {
                navigateTo('/book-appointment');
                playSfx('click');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#C5A880]/60 text-[9px] uppercase tracking-[0.25em] font-medium hover:bg-[#C5A880] hover:text-[#0F0D0C] transition-all duration-300 cursor-pointer"
              data-cursor="RESERVE"
            >
              <span>BOOK VISIT</span>
            </button>

            {/* Fullscreen Editorial Menu Trigger */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                playSfx('click');
              }}
              className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase py-2 cursor-pointer focus:outline-none"
              data-cursor={isMenuOpen ? 'CLOSE' : 'INDEX'}
            >
              <span className="hidden sm:inline-block font-medium">
                {isMenuOpen ? 'CLOSE' : 'INDEX'}
              </span>
              <div className="w-6 h-4 flex flex-col justify-between items-end">
                <span
                  className={`h-[1px] bg-current transition-all duration-300 ${
                    isMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'
                  }`}
                />
                <span
                  className={`h-[1px] bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'
                  }`}
                />
                <span
                  className={`h-[1px] bg-current transition-all duration-300 ${
                    isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5 group-hover:w-6'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Magazine Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto bg-[#0F0D0C] text-[#FBF9F5]"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-6 pt-16">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880]">
                ARCHIVE INDEX — VOLUME 2026
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase opacity-60">
                TAMIL NADU / GLOBAL COUTURE
              </span>
            </div>

            {/* Main Editorial Nav Index */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.route}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * idx, duration: 0.4 }}
                >
                  <button
                    onClick={() => {
                      navigateTo(item.route);
                      playSfx('rustle');
                    }}
                    className="w-full text-left group py-4 border-b border-white/10 flex items-start justify-between hover:border-[#C5A880] transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] block mb-1">
                        {item.number}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.05em] group-hover:translate-x-2 transition-transform duration-300 font-light">
                        {item.label}
                      </h3>
                      <p className="text-[10px] tracking-[0.15em] opacity-60 font-sans mt-1">
                        {item.sub}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-[#C5A880] transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="pt-6 border-t border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.25em] opacity-70">
              <div>PRIVATE SALON: 14 KAVERI RESIDENCY, RAJA ANNAMALAIPURAM, CHENNAI</div>
              <div>CONSULTATIONS BY ADVANCE APPOINTMENT ONLY</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
