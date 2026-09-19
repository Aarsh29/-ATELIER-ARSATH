import React, { useState } from 'react';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles, Plus, Check } from 'lucide-react';

interface RitualPlan {
  ritual: string;
  time: string;
  outfit: string;
  fabric: string;
  palette: string;
}

export const WeddingPlanner: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();

  const [wardrobe] = useState<RitualPlan[]>([
    {
      ritual: '01 / MEHENDI & HALDI',
      time: 'Daytime Courtyard Sunlight',
      outfit: 'Raw Matka Silk Kalidar Kurta with Fine Hairline Zari',
      fabric: 'Hand-Spun Bengal Matka Silk',
      palette: 'Sunlit Turmeric Yellow & Warm Ivory'
    },
    {
      ritual: '02 / THE SANGEET',
      time: 'Evening Starlight & High Dance',
      outfit: 'Dancing Kalidar Lehenga with 36-Panel Organza Flare',
      fabric: 'Tissue Organza with Swarovski Dewdrops',
      palette: 'Temple Emerald Green & Burnished Bronze'
    },
    {
      ritual: '03 / THE KALYANAM MUHURTHAM',
      time: 'Sacred Dawn (5:30 AM) Mandapam',
      outfit: 'Heirloom Korvai Double-Warp Kanchipuram Pattu with Pure Silver-Gilt Zari',
      fabric: 'Pure Mulberry Silk × 24k Gold Zari Weft',
      palette: 'Sacred Madder Crimson (#7D2328)'
    },
    {
      ritual: '04 / THE NOCTURNE RECEPTION',
      time: 'Grand Ballroom Chandelier Ambiance',
      outfit: 'Champagne Gilded Column Gown with Sheer Organza Trail Cape',
      fabric: 'Metallic Spun Tissue Organza',
      palette: 'Starlight Champagne Gold & Bone Ivory'
    },
    {
      ritual: '05 / POST-WEDDING MARUVADU',
      time: 'Intimate Family Breakfast Gathering',
      outfit: 'Featherweight Tissue Chanderi Saree with Minimalist Aari Edge',
      fabric: 'Pure Chanderi Silk Cotton',
      palette: 'Sandalwood Taupe & Lotus Petal Blush'
    }
  ]);

  return (
    <div className={`pt-32 pb-24 px-6 sm:px-12 lg:px-16 min-h-screen transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C] text-[#FBF9F5]' : 'bg-[#FBF9F5] text-[#1A1614]'
   }}`}>
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5"/>
              <span>COUTURE WARDROBE CURATION</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              MY WEDDING EDIT.
            </h1>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Five ceremonies, five unique expressions. We orchestrate weight, silhouette, and movement so each ritual reveals a distinct chapter of your grace.
          </p>
        </div>

        <div className="space-y-6">
          {wardrobe.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 ${
                theme === 'midnight'
                  ? 'bg-[#141110] border-[#2E2824]'
                  : 'bg-[#F8F5EE] border-[#E8E2D8] shadow-sm'
             }}`}>
              <div className="lg:w-1/4">
                <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase block mb-1">
                  {item.ritual}
                </span>
                <span className="text-xs opacity-60 font-sans block">
                  {item.time}
                </span>
              </div>

              <div className="lg:w-2/5">
                <span className="text-[9px] tracking-[0.2em] font-mono uppercase opacity-50 block mb-1">
                  PRESCRIBED ENSEMBLE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light">
                  {item.outfit}
                </h3>
              </div>

              <div className="lg:w-1/4">
                <span className="text-[9px] tracking-[0.2em] font-mono uppercase opacity-50 block mb-1">
                  FABRIC & TONAL HARMONY
                </span>
                <p className="text-xs font-serif text-[#C5A880]">
                  {item.fabric}
                </p>
                <p className="text-[11px] opacity-70 font-sans">
                  {item.palette}
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    navigateTo('/book-appointment');
                    playSfx('click');
                  }}
                  className="px-5 py-2.5 border border-[#C5A880] text-[9px] tracking-[0.2em] uppercase text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0F0D0C] transition-colors cursor-pointer whitespace-nowrap">
                  DISCUSS IN SALON
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 border border-current/15 bg-current/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-light">
              RESERVE YOUR ENTIRE BRIDAL TROUSSEAU
            </h3>
            <p className="text-xs opacity-75 mt-1 font-sans">
              Our head couturier personally oversees the synchrony of embroidery, blouse back cutouts, and jewellery across all five occasions.
            </p>
          </div>
          <button
            onClick={() => {
              navigateTo('/book-appointment');
              playSfx('click');
            }}
            className="px-8 py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer whitespace-nowrap">
            SCHEDULE WARDROBE CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};
