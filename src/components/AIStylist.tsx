import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles } from 'lucide-react';

interface StyleQuery {
  prompt: string;
  category: string;
  recommendation: {
    outfit: string;
    jewellery: string;
    footwear: string;
    hairstyle: string;
    palette: string;
    curatorNotes: string;
  };
}

export const AIStylist: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();
  
  const presets: StyleQuery[] = [
    {
      prompt: 'What should I wear for my evening Leela Palace reception?',
      category: 'RECEPTION',
      recommendation: {
        outfit: 'The Nocturne Gilded Tissue Organza Column Gown with Sheer Dupatta Trail in Starlight Champagne.',
        jewellery: 'Uncut Golconda Polki Choker with Russian Emerald Beads and Hairline Basra Pearl Drops.',
        footwear: 'Handcrafted Zardozi-Embroidered Silk Pointed Mules with 3-inch sculpted architectural heel.',
        hairstyle: 'Structured Low Chignon woven with antique gold wire filigree and fresh white tuberose (Sampangi).',
        palette: 'Champagne Gilding (#D8C7A5), Sandalwood Bone, Obsidian Noir.',
        curatorNotes: 'Avoid heavy red textiles for grand ballroom receptions. A fluid metallic tissue captures evening chandelier refractions, ensuring effortless movement across 400 guests.'
      }
    },
    {
      prompt: 'A traditional 5:00 AM Kapaleeshwarar Temple Muhurtham',
      category: 'MUHURTHAM',
      recommendation: {
        outfit: 'Bespoke Madder-Red Korvai Double-Warp Kanchipuram with Pure Silver-Gilt Ganesha Zari Pallu.',
        jewellery: 'Heirloom Nakshi Temple Jewellery in 22k Antique Matte Gold: Kasu Mala, Oddiyanam waist belt, and Surya-Chandra head ornaments.',
        footwear: 'Traditional barefoot sanctum entry, shifting to raw silk juttis for mandapam.',
        hairstyle: 'Classic South Indian Temple Plait adorned with pure Jasmine string (Malli Poo) and floral Jada Billalu.',
        palette: 'Sacred Madder Crimson (#7D2328), Saffron Gold (#D4AF37), Kumkum Ochre.',
        curatorNotes: 'Morning temple lighting demands pure silk density rather than crystal sheen. The weight of 3-ply twisted silk radiates timeless ancestral majesty.'
      }
    },
    {
      prompt: 'Contemporary Outdoor Sangeet in Udaipur',
      category: 'SANGEET',
      recommendation: {
        outfit: 'Fluted Kalidar Lehenga in Malda Raw Matka Silk with Micro-Aari Tambour Chains and Dancing Peacock Jaal.',
        jewellery: 'Contemporary Chandelier Earrings with rose-cut diamonds and tourmaline drops.',
        footwear: 'Cushioned Metallic Strappy Block Heels engineered for high-energy dancing.',
        hairstyle: 'Romantic Tousled Waves with delicate baby’s breath and pearl pins.',
        palette: 'Temple Emerald Green (#1B4D3E), Burnished Bronze, Antique Lime.',
        curatorNotes: 'Sangeet is celebration in motion. Lightweight raw silk provides majestic volume without anchoring the bride with excessive weight.'
      }
    }
  ];

  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const activeConsultation = presets[activeQueryIndex];

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none">
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>07 / PRIVATE CONSULTATION INTELLIGENCE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              ASK THE ATELIER.
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Not a sterile AI chatbot. An intimate dialogue with our couture style direction based on ritual timing, temple architecture, and personal presence.
          </p>
        </div>

        {/* Query Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveQueryIndex(idx);
                playSfx('rustle');
              }}
              className={`p-6 text-left border transition-all duration-300 cursor-pointer ${
                activeQueryIndex === idx
                  ? 'border-[#C5A880] bg-[#C5A880]/10 shadow-sm'
                  : 'border-current/15 hover:border-current/30'
              }`}
              data-cursor="INQUIRE"
            >
              <span className="text-[9px] tracking-[0.3em] font-mono text-[#C5A880] block mb-2">
                SCENARIO 0{idx + 1} • {preset.category}
              </span>
              <p className="font-serif text-lg sm:text-xl font-light leading-snug">
                “{preset.prompt}”
              </p>
            </button>
          ))}
        </div>

        {/* Editorial Recommendation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConsultation.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-14 border border-current/15 bg-current/5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-current/15 mb-10">
              <div>
                <span className="text-[10px] tracking-[0.35em] font-mono uppercase text-[#C5A880] block mb-1">
                  ATELIER COUTURE DOSSIER
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light">
                  {activeConsultation.category} ENSEMBLE DIRECTION
                </h3>
              </div>
              <button
                onClick={() => {
                  navigateTo('/book-appointment');
                  playSfx('click');
                }}
                className="px-6 py-3 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer self-start lg:self-auto"
              >
                REQUEST SALON TRY-ON
              </button>
            </div>

            {/* 5-Pillar Recommendation Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  01 / COUTURE OUTFIT
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {activeConsultation.recommendation.outfit}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  02 / HIGH JEWELLERY
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {activeConsultation.recommendation.jewellery}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  03 / FOOTWEAR & MOVEMENT
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {activeConsultation.recommendation.footwear}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  04 / COUTURE HAIR & BOTANICALS
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {activeConsultation.recommendation.hairstyle}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  05 / COLOR HARMONY
                </span>
                <p className="text-sm font-serif leading-relaxed">
                  {activeConsultation.recommendation.palette}
                </p>
              </div>

              <div className="space-y-2 p-4 bg-current/5 border border-current/10">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono block">
                  COUTURIER NOTE
                </span>
                <p className="text-xs font-sans italic opacity-85 leading-relaxed">
                  {activeConsultation.recommendation.curatorNotes}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
