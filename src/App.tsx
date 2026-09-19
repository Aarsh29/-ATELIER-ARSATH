import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { AtelierProvider, useAtelier } from './context/AtelierContext';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { SignatureCollections } from './components/SignatureCollections';
import { Carousel3D } from './components/Carousel3D';
import { CraftTimeline } from './components/CraftTimeline';
import { FabricLibrary } from './components/FabricLibrary';
import { OutfitCustomizer } from './components/OutfitCustomizer';
import { AIStylist } from './components/AIStylist';
import { EditorialGallery } from './components/EditorialGallery';
import { ClientStories } from './components/ClientStories';
import { BoutiqueExperience } from './components/BoutiqueExperience';
import { AppointmentBooking } from './components/AppointmentBooking';
import { Footer } from './components/Footer';

// Sub-pages
import { CollectionsPage } from './pages/CollectionsPage';
import { AtelierPage } from './pages/AtelierPage';
import { VirtualTrial } from './pages/VirtualTrial';
import { WeddingPlanner } from './pages/WeddingPlanner';
import { MyAtelier } from './pages/MyAtelier';

const MainExperience: React.FC = () => {
  const { activeRoute } = useAtelier();
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-grain overflow-x-hidden">
      {/* Precision Cursor */}
      <CustomCursor />

      {/* Cinematic Fashion Opening Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Persistent Minimalist Luxury Navbar */}
      <Navbar />

      {/* Page Routing Stage with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeRoute}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeRoute === '/' && (
            <>
              <Hero />
              <Manifesto />
              <SignatureCollections />
              <Carousel3D />
              <CraftTimeline />
              <FabricLibrary />
              <OutfitCustomizer />
              <AIStylist />
              <EditorialGallery />
              <ClientStories />
              <BoutiqueExperience />
              <AppointmentBooking />
            </>
          )}

          {activeRoute === '/collections' && <CollectionsPage />}
          {activeRoute === '/atelier' && <AtelierPage />}
          {activeRoute === '/craft' && (
            <div className="pt-24">
              <CraftTimeline />
              <EditorialGallery />
            </div>
          )}
          {activeRoute === '/fabrics' && (
            <div className="pt-24">
              <FabricLibrary />
            </div>
          )}
          {activeRoute === '/design-your-own' && (
            <div className="pt-24">
              <OutfitCustomizer />
            </div>
          )}
          {activeRoute === '/virtual-trial' && <VirtualTrial />}
          {activeRoute === '/stylist' && (
            <div className="pt-24">
              <AIStylist />
            </div>
          )}
          {activeRoute === '/wedding-planner' && <WeddingPlanner />}
          {activeRoute === '/gallery' && (
            <div className="pt-24">
              <EditorialGallery />
            </div>
          )}
          {activeRoute === '/boutique' && (
            <div className="pt-24">
              <BoutiqueExperience />
            </div>
          )}
          {activeRoute === '/book-appointment' && (
            <div className="pt-24">
              <AppointmentBooking />
            </div>
          )}
          {activeRoute === '/my-atelier' && <MyAtelier />}
        </motion.main>
      </AnimatePresence>

      {/* Permanent Haute Couture Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AtelierProvider>
      <MainExperience />
    </AtelierProvider>
  );
};

export default App;
