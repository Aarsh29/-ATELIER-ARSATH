import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'midnight';

interface AtelierContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSfx: (type: 'rustle' | 'needle' | 'shear' | 'click' | 'ambient') => void;
  activeRoute: string;
  navigateTo: (route: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export const AtelierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>('/');
  const [wishlist, setWishlist] = useState<string[]>(['kalyanam-bridal', 'kanchipuram-silk']);
  const [cursorText, setCursorText] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (theme === 'midnight') {
      document.body.classList.add('bg-[#0F0D0C]', 'text-[#FBF9F5]');
      document.body.classList.remove('bg-[#FBF9F5]', 'text-[#1A1614]');
    } else {
      document.body.classList.add('bg-[#FBF9F5]', 'text-[#1A1614]');
      document.body.classList.remove('bg-[#0F0D0C]', 'text-[#FBF9F5]');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'midnight' : 'light'));
    playSfx('click');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playSfx = (type: 'rustle' | 'needle' | 'shear' | 'click' | 'ambient') => {
    if (!soundEnabled && type !== 'click') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'rustle') {
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.02;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else if (type === 'needle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch (e) {
      // Audio policy catch
    }
  };

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    playSfx('click');
  };

  return (
    <AtelierContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        playSfx,
        activeRoute,
        navigateTo,
        wishlist,
        toggleWishlist,
        cursorText,
        setCursorText,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
};

export const useAtelier = () => {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error('useAtelier must be used within an AtelierProvider');
  }
  return context;
};
