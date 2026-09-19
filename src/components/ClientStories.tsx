import React from 'react';
import { CLIENT_STORIES } from '../data/mockData';
import { useAtelier } from '../context/AtelierContext';
import { Heart, Play } from 'lucide-react';

export const ClientStories: React.FC = () => {
  const { theme } = useAtelier();

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none">
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Heart className="w-3.5 h-3.5" />
              <span>09 / MEMORIES IN SILK</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              CLIENT TESTIMONIALS.
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Real brides, genuine celebrations. The true test of our atelier is how our garments withstand the emotion, laughter, and rituals of the sacred day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CLIENT_STORIES.map((story) => (
            <div
              key={story.id}
              className="p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-black/10">
                  <img
                    src={story.portrait}
                    alt={story.brideName}
                    className="w-full h-full object-cover object-top"
                  />
                  {story.videoDuration && (
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[9px] tracking-[0.2em] font-mono flex items-center gap-2">
                      <Play className="w-3 h-3 text-[#C5A880]" />
                      <span>{story.videoDuration}</span>
                    </div>
                  )}
                </div>

                <div className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#C5A880] mb-2">
                  {story.occasion} • {story.city}
                </div>

                <h3 className="font-serif text-2xl font-light mb-4">
                  {story.brideName}
                </h3>

                <p className="font-serif italic text-base leading-relaxed opacity-85 mb-6">
                  {story.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-current/10">
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-50 block font-mono">
                  ENSEMBLE
                </span>
                <span className="text-xs font-serif text-[#C5A880]">
                  {story.outfitDetails}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
