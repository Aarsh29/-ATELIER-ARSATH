import React, { useState } from 'react';
import { useAtelier } from '../context/AtelierContext';
import { COLLECTIONS } from '../data/mockData';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { CollectionItem } from '../types';

export const CollectionsPage: React.FC = () => {
  const { theme, navigateTo, wishlist, toggleWishlist, playSfx } = useAtelier();
  const [filter, setFilter] = useState<'all' | 'bridal' | 'blouses' | 'sarees' | 'reception' | 'aari' | 'kids'>('all');

  const filtered = filter === 'all' ? COLLECTIONS : COLLECTIONS.filter(c => c.category === filter);

  return (
    <div className={`pt-32 pb-24 px-6 sm:px-12 lg:px-16 min-h-screen transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C] text-[#FBF9F5]' : 'bg-[#FBF9F5] text-[#1A1614]'
    }`}>
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-2 font-mono">
              THE FULL ATELIER ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              PERMANENT COLLECTIONS.
            </h1>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['all', 'bridal', 'blouses', 'sarees', 'reception', 'aari', 'kids'].map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f as any);
                  playSfx('click');
                }}
                className={`px-4 py-2 text-[9px] tracking-[0.2em] font-mono uppercase transition-colors cursor-pointer ${
                  filter === f
                    ? 'bg-[#C5A880] text-[#0F0D0C] font-bold'
                    : 'border border-current/15 hover:border-current/40'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(item => {
            const isSaved = wishlist.includes(item.id);
            return (
              <div
                key={item.id}
                className="group border border-current/10 hover:border-[#C5A880] transition-colors p-6 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/10 mb-6">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"/>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#C5A880] transition-colors cursor-pointer title={isSaved ? 'Saved' : 'Save to My Atelier'}"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#C5A880] uppercase mb-2">
                    <span>LOOK {item.number}</span>
                    <span>{item.craft}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-light mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider opacity-60 font-sans mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-xs opacity-75 font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-current/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono opacity-60 uppercase">
                    LEAD TIME: {item.leadTime}
                  </span>
                  <button
                    onClick={() => {
                      navigateTo('/book-appointment');
                      playSfx('click');
                    }}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer font-bold">
                    <span>BESPOKE INQUIRY</span>
                    <ArrowUpRight className="w-3 h-3"/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
