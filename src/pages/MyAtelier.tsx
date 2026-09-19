import React from 'react';
import { useAtelier } from '../context/AtelierContext';
import { COLLECTIONS, FABRICS } from '../data/mockData';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';

export const MyAtelier: React.FC = () => {
  const { theme, wishlist, toggleWishlist, navigateTo, playSfx } = useAtelier();

  const savedCollections = COLLECTIONS.filter(c => wishlist.includes(c.id));
  const savedFabrics = FABRICS.filter(f => wishlist.includes(f.id));

  return (
    <div className={`pt-32 pb-24 px-6 sm:px-12 lg:px-16 min-h-screen transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C] text-[#FBF9F5]' : 'bg-[#FBF9F5] text-[#1A1614]'
   }}`}>
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-2 font-mono">
              PERSONAL COUTURE SCRAPBOOK
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              MY ATELIER ARCHIVE.
            </h1>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Your saved silhouettes, tactile fabric favorites, and custom notes preserved across your bridal journey.
          </p>
        </div>

        {savedCollections.length === 0 && savedFabrics.length === 0 ? (
          <div className="text-center py-24 border border-current/10 p-8">
            <h3 className="font-serif text-2xl opacity-60 mb-4">
              YOUR SCRAPBOOK IS CURRENTLY EMPTY
            </h3>
            <p className="text-xs opacity-60 max-w-md mx-auto mb-8">
              Explore our permanent archives, tactile fabrics, and customizer to bookmark pieces for your personal consultation.
            </p>
            <button
              onClick={() => {
                navigateTo('/collections');
                playSfx('click');
              }}
              className="px-6 py-3 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-widest uppercase font-bold cursor-pointer">
              EXPLORE ARCHIVE
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {savedCollections.length > 0 && (
              <div>
                <h3 className="text-xs tracking-[0.3em] font-mono text-[#C5A880] uppercase mb-6">
                  SAVED COUTURE SILHOUETTES ({savedCollections.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {savedCollections.map(item => (
                    <div key={item.id} className="border border-current/15 p-6 flex flex-col justify-between">
                      <div>
                        <div className="aspect-[3/4] overflow-hidden mb-4 bg-black/10">
                          <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover object-top"/>
                        </div>
                        <span className="text-[9px] font-mono text-[#C5A880] block">{item.craft}</span>
                        <h4 className="font-serif text-2xl mb-1">{item.title}</h4>
                        <p className="text-xs opacity-70 mb-4">{item.leadTime}</p>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-[10px] tracking-widest uppercase text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5"/>
                        <span>REMOVE</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {savedFabrics.length > 0 && (
              <div>
                <h3 className="text-xs tracking-[0.3em] font-mono text-[#C5A880] uppercase mb-6">
                  FAVORITE TEXTILE WEAVES ({savedFabrics.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {savedFabrics.map(fabric => (
                    <div key={fabric.id} className="border border-current/15 p-6 flex flex-col justify-between">
                      <div>
                        <div className="aspect-[4/3] overflow-hidden mb-4 bg-black/10">
                          <img src={fabric.textureImage} alt={fabric.name} className="w-full h-full object-cover"/>
                        </div>
                        <span className="text-[9px] font-mono text-[#C5A880] block">{fabric.origin}</span>
                        <h4 className="font-serif text-2xl mb-1">{fabric.name}</h4>
                        <p className="text-xs opacity-70 mb-4">{fabric.tactileFeel}</p>
                      </div>
                      <button
                        onClick={() => toggleWishlist(fabric.id)}
                        className="text-[10px] tracking-widest uppercase text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5"/>
                        <span>REMOVE</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8 border border-[#C5A880] bg-current/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl font-light">BRING YOUR SCRAPBOOK TO OUR CHENNAI SALON</h3>
                <p className="text-xs opacity-75 mt-1 font-sans">
                  Our couturier will prepare these exact fabric swatches and silhouette toiles for your arrival.
                </p>
              </div>
              <button
                onClick={() => {
                  navigateTo('/book-appointment');
                  playSfx('click');
                }}
                className="px-8 py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer whitespace-nowrap">
                REQUEST PRIVATE SALON TIME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
