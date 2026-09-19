import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles, Check, ArrowRight, Bookmark, RefreshCw } from 'lucide-react';

interface CustomizerState {
  fabric: string;
  silhouette: string;
  neckline: string;
  sleeve: string;
  embroidery: string;
  stonework: string;
  color: string;
}

export const OutfitCustomizer: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();
  const [currentStep, setCurrentStep] = useState(0);

  const [choices, setChoices] = useState<CustomizerState>({
    fabric: 'Kanchipuram Raw Pattu',
    silhouette: 'Sculptured Fluted Column Lehenga',
    neckline: 'Temple Gopuram Jewel Cut',
    sleeve: 'Elbow Length with Korvai Border',
    embroidery: 'Single-thread Heritage Aari Needlework',
    stonework: 'Antique Kardana & Seed Pearls',
    color: 'Sandalwood & Madder Red (#9E2A2B)',
  });

  const steps = [
    {
      title: '01 / THE FABRIC',
      key: 'fabric',
      options: [
        { label: 'Kanchipuram Raw Pattu', sub: 'Traditional 3-ply heavy drape', swatch: '#7D2328' },
        { label: 'Gilded Tissue Organza', sub: 'Gossamer metallic glow', swatch: '#D4AF37' },
        { label: 'Banarasi Katan Silk', sub: 'Dense brocade luster', swatch: '#8C6239' },
        { label: 'Obsidian Silk Velvet', sub: 'Deep theatrical light absorption', swatch: '#1A1110' },
      ],
    },
    {
      title: '02 / THE SILHOUETTE',
      key: 'silhouette',
      options: [
        { label: 'Sculptured Fluted Column Lehenga', sub: 'Contemporary architectural drape' },
        { label: 'Sacred Korvai Muhurtham Saree Drape', sub: 'Nine-yard ceremonial majesty' },
        { label: 'Corseted Asymmetric Peplum Blouse', sub: 'Modern structured evening couture' },
        { label: 'Fluid Royal Kalidar Gown', sub: 'Sweeping 36-panel trail' },
      ],
    },
    {
      title: '03 / THE NECKLINE',
      key: 'neckline',
      options: [
        { label: 'Temple Gopuram Jewel Cut', sub: 'Inspired by South Indian sanctum gateways' },
        { label: 'Sculpted Sweetheart with Micro-Piping', sub: 'Flattering contoured collarbone framing' },
        { label: 'Architectural Deep Keyhole Back', sub: 'Minimal geometry with pearl clasp' },
        { label: 'High Mandarin Collar with Slit', sub: 'Regal vintage sensibility' },
      ],
    },
    {
      title: '04 / THE SLEEVE',
      key: 'sleeve',
      options: [
        { label: 'Elbow Length with Korvai Border', sub: 'Classic royal Tamil proportions' },
        { label: 'Sleeveless with Cutaway Armholes', sub: 'Clean modern lines' },
        { label: 'Fluid Sheer Organza Bell Sleeve', sub: 'Whisper-weight dramatic movement' },
        { label: 'Full Length with Hidden Zardozi Cuff', sub: 'Stately evening grandeur' },
      ],
    },
    {
      title: '05 / THE EMBROIDERY',
      key: 'embroidery',
      options: [
        { label: 'Single-thread Heritage Aari Needlework', sub: 'Micro chain-stitch relief' },
        { label: 'Antique Zardozi & Beaten Silver Wire', sub: 'Three-dimensional floral motifs' },
        { label: 'Dravidian Bird & Lotus Petal Jaal', sub: 'Traditional temple iconography' },
        { label: 'Minimalist Geometric Hairline Borders', sub: 'Contemporary restraint' },
      ],
    },
    {
      title: '06 / EMBELLISHMENT & STONEWORK',
      key: 'stonework',
      options: [
        { label: 'Antique Kardana & Seed Pearls', sub: 'Matte luminescence, zero glare' },
        { label: 'Tone-on-Tone Swarovski Dewdrops', sub: 'Subtle starlight twinkle' },
        { label: 'Uncut Polki & Kundan Glass Accents', sub: 'Regal heirloom texture' },
        { label: 'Zero Stonework (Pure Thread & Silk Only)', sub: 'Supreme textural purity' },
      ],
    },
    {
      title: '07 / PALETTE & HARMONY',
      key: 'color',
      options: [
        { label: 'Sandalwood & Madder Red', sub: 'Temple warmth and sacred devotion', swatch: '#7D2328' },
        { label: 'Champagne Gold & Bone Ivory', sub: 'Nocturne reception moonlight', swatch: '#D8C7A5' },
        { label: 'Temple Emerald & Antique Zari', sub: 'Imperial South Indian heritage', swatch: '#1B4D3E' },
        { label: 'Deep Indigo & Obsidian Velvet', sub: 'Star-studded twilight', swatch: '#13182C' },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <section className={`py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#141110]' : 'bg-[#F4F1EA]'
    }`}>
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5"/>
              <span>06 / INTERACTIVE ATELIER DESK</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              DESIGN YOUR OWN COUTURE.
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Step into the role of creative director. Harmonize your silhouette, handwoven textiles, and artisanal aari embellishment before meeting our couturier.
          </p>
        </div>

        {/* Configurator Workspace Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Step Selector Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-current/10">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    playSfx('click');
                  }}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.2em] font-mono transition-colors whitespace-nowrap cursor-pointer ${
                    idx === currentStep
                      ? 'border-b-2 border-[#C5A880] text-[#C5A880] font-bold'
                      : 'text-current/50 hover:text-current'
                  }`}>
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Current Step Title */}
            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase">
                STEP 0{currentStep + 1} OF 07
              </span>
              <h3 className="font-serif text-3xl font-light tracking-tight mt-1">
                {currentStepData.title.split('/ ')[1]}
              </h3>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStepData.options.map((opt, i) => {
                const isSelected = (choices as any)[currentStepData.key] === opt.label;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setChoices(prev => ({ ...prev, [currentStepData.key]: opt.label }));
                      playSfx('needle');
                    }}
                    className={`p-5 text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#C5A880]/10 shadow-sm ring-1 ring-[#C5A880]'
                        : 'border-current/10 hover:border-current/30'
                    }`}
                    data-cursor="CHOOSE"
                  >
                    <div className="flex items-center justify-between mb-3">
                      {opt.swatch && (
                        <div
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: opt.swatch }}
                        />
                      )}
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-[#C5A880] text-[#0F0D0C] flex items-center justify-center text-xs ml-auto">
                          <Check className="w-3 h-3"/>
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-current/20 ml-auto"/>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-light leading-snug">
                        {opt.label}
                      </h4>
                      <p className="text-[10px] tracking-[0.1em] opacity-60 font-sans mt-1">
                        {opt.sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-current/10">
              <button
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(prev => prev - 1);
                    playSfx('click');
                  }
                }}
                disabled={currentStep === 0}
                className="text-[10px] tracking-[0.25em] uppercase opacity-60 hover:opacity-100 disabled:opacity-20 cursor-pointer">
                ← PREVIOUS
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentStep(prev => prev + 1);
                    playSfx('click');
                  }}
                  className="px-6 py-3 bg-[#1A1614] text-[#FBF9F5] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C5A880] hover:text-[#0F0D0C] transition-colors cursor-pointer flex items-center gap-2">
                  <span>PROCEED TO STEP 0{currentStep + 2}</span>
                  <ArrowRight className="w-3.5 h-3.5"/>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigateTo('/book-appointment');
                    playSfx('click');
                  }}
                  className="px-6 py-3 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer">
                  TRANSLATE TO BESPOKE ORDER
                </button>
              )}
            </div>
          </div>

          {/* Right: Live Editorial Silhouette Summary Card */}
          <div className="lg:col-span-5 p-8 border border-[#C5A880]/40 bg-current/5 sticky top-28 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-current/15 mb-6">
              <span className="text-[9px] tracking-[0.3em] font-mono uppercase text-[#C5A880]">
                ATELIER SPECIFICATION SHEET
              </span>
              <span className="text-[9px] font-mono opacity-50">REF: AARSH-CUSTOM-26</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light mb-6">
              YOUR BESPOKE CREATION
            </h3>

            <div className="space-y-4 text-xs font-sans mb-8">
              {Object.entries(choices).map(([k, v]) => (
                <div key={k} className="flex justify-between items-start pb-2 border-b border-current/10 gap-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase opacity-60 font-mono">
                    {k}
                  </span>
                  <span className="text-right font-serif text-sm text-[#C5A880]">
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-sm mb-6 text-[11px] opacity-80 leading-relaxed font-sans">
              “Our senior pattern-maker in Chennai will review these preferences to draft your private muslin toile before our initial fitting.”
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigateTo('/book-appointment');
                  playSfx('click');
                }}
                className="w-full py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer text-center">
                REQUEST CONSULTATION WITH THIS BLUEPRINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
