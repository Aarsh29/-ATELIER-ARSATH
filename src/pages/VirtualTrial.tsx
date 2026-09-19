import React, { useState } from 'react';
import { useAtelier } from '../context/AtelierContext';
import { Eye, Sparkles, Check, Bookmark } from 'lucide-react';

export const VirtualTrial: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();

  const [selectedSilhouette, setSelectedSilhouette] = useState('Bridal Kanchipuram Drape');
  const [selectedBlouse, setSelectedBlouse] = useState('Architectural Gopuram Cut');
  const [selectedTone, setSelectedTone] = useState('#7D2328');

  const silhouettes = [
    { name: 'Bridal Kanchipuram Drape', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Nocturne Tissue Gown', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Heirloom Korvai Saree', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop' },
  ];

  const tones = [
    { name: 'Madder Crimson', code: '#7D2328' },
    { name: 'Sandalwood Taupe', code: '#C5A880' },
    { name: 'Obsidian Velvet', code: '#1A1614' },
    { name: 'Temple Emerald', code: '#1B4D3E' },
  ];

  const currentImg = silhouettes.find(s => s.name === selectedSilhouette)?.img || silhouettes[0].img;

  return (
    <div className={`pt-32 pb-24 px-6 sm:px-12 lg:px-16 min-h-screen transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C] text-[#FBF9F5]' : 'bg-[#FBF9F5] text-[#1A1614]'
   }}`}>
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Eye className="w-3.5 h-3.5"/>
              <span>EXPERIMENTAL DRAPING LAB</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              VIRTUAL ATELIER TRIAL.
            </h1>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Simulate your ceremonial proportions and fabric harmonies prior to your physical muslin fitting in our Chennai salon.
          </p>
        </div>

        {/* Trial Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Visual Simulation Display */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[3/4] overflow-hidden bg-black/10 border border-current/15 relative">
              <img
                src={currentImg}
                alt={selectedSilhouette}
                className="w-full h-full object-cover object-top transition-all duration-700"/>
              <div
                className="absolute inset-0 mix-blend-multiply opacity-25 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: selectedTone }}
              />
              <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[9px] tracking-widest font-mono uppercase border border-white/10">
                PROPORTION SIMULATION: {selectedSilhouette}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase block mb-3">
                01 / CHOOSE SILHOUETTE
              </span>
              <div className="space-y-2">
                {silhouettes.map(s => (
                  <button
                    key={s.name}
                    onClick={() => {
                      setSelectedSilhouette(s.name);
                      playSfx('rustle');
                    }}
                    className={`w-full p-4 text-left border text-xs tracking-wider uppercase font-serif flex items-center justify-between cursor-pointer ${
                      selectedSilhouette === s.name
                        ? 'border-[#C5A880] bg-[#C5A880]/15'
                        : 'border-current/15 hover:border-current/30'
                   }}`}>
                    <span>{s.name}</span>
                    {selectedSilhouette === s.name && <Check className="w-4 h-4 text-[#C5A880]"/>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase block mb-3">
                02 / PALETTE TONE FILTER
              </span>
              <div className="grid grid-cols-2 gap-3">
                {tones.map(t => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setSelectedTone(t.code);
                      playSfx('click');
                    }}
                    className={`p-3 border flex items-center gap-3 text-xs cursor-pointer ${
                      selectedTone === t.code
                        ? 'border-[#C5A880] bg-[#C5A880]/10 ring-1 ring-[#C5A880]'
                        : 'border-current/15'
                   }}`}>
                    <div
                      className="w-4 h-4 rounded-full border border-current/20"
                      style={{ backgroundColor: t.code }}
                    />
                    <span className="font-serif">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border border-current/10 bg-current/5 space-y-2">
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#C5A880] block">
                ATELIER TAILORING NOTE
              </span>
              <p className="text-xs opacity-75 font-sans leading-relaxed">
                Virtual draping provides tonal balance guidance. Physical measurements require 28 unique posture reference points recorded in our Chennai private salon.
              </p>
            </div>

            <button
              onClick={() => {
                navigateTo('/book-appointment');
                playSfx('click');
              }}
              className="w-full py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer">
              BOOK PHYSICAL FITTING SESSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
