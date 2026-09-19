import React from 'react';
import { useAtelier } from '../context/AtelierContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, playSfx } = useAtelier();

  return (
    <footer className="pt-28 pb-14 px-6 sm:px-12 lg:px-16 border-t border-current/15 transition-colors duration-500 select-none bg-[#0F0D0C] text-[#FBF9F5]">
      <div className="max-w-[1720px] mx-auto">
        {/* Massive Closing Wordmark */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-4 font-mono">
            HAUTE COUTURE HOUSE • ESTABLISHED IN CHENNAI
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[120px] tracking-[0.08em] font-light leading-none text-[#FBF9F5]">
            ATELIER AARSH
          </h2>
          <p className="font-sans text-xs tracking-[0.35em] text-[#C5A880] uppercase mt-4">
            CRAFT / FORM / MOTION
          </p>
        </div>

        {/* 4-Column Navigation & Metiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10 text-xs font-sans">
          {/* Col 1: Metiers */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#C5A880] block mb-2">
              THE METIERS
            </span>
            {[
              { label: 'The Kalyanam Bridal', route: '/collections' },
              { label: 'Architectural Blouses', route: '/collections' },
              { label: 'Pure Kanchipuram Silks', route: '/collections' },
              { label: 'Nocturne Evening Gowns', route: '/collections' },
              { label: 'Tambour Aari Masterworks', route: '/craft' },
              { label: 'Les Petites (Kids)', route: '/collections' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigateTo(item.route);
                  playSfx('click');
                }}
                className="block text-white/70 hover:text-[#C5A880] transition-colors cursor-pointer text-left">
                {item.label}
              </button>
            ))}
          </div>

          {/* Col 2: Digital Couture Tools */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#C5A880] block mb-2">
              EXPERIENCES
            </span>
            {[
              { label: 'Design Your Own Silhouette', route: '/design-your-own' },
              { label: 'Tactile Fabric Library', route: '/fabrics' },
              { label: 'Ask The Couture Stylist', route: '/stylist' },
              { label: 'Virtual Silhouette Trial', route: '/virtual-trial' },
              { label: 'Wedding Collection Planner', route: '/wedding-planner' },
              { label: 'Personal Scrapbook (My Atelier)', route: '/my-atelier' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigateTo(item.route);
                  playSfx('click');
                }}
                className="block text-white/70 hover:text-[#C5A880] transition-colors cursor-pointer text-left">
                {item.label}
              </button>
            ))}
          </div>

          {/* Col 3: The Sanctuary */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#C5A880] block mb-2">
              THE SALON
            </span>
            <p className="text-white/70 leading-relaxed">
              14 Kaveri Residency, Raja Annamalaipuram, Chennai, Tamil Nadu 600028
            </p>
            <p className="text-white/50 text-[11px]">
              Private consultations by prior appointment only.
            </p>
            <button
              onClick={() => {
                navigateTo('/book-appointment');
                playSfx('click');
              }}
              className="mt-4 text-[#C5A880] flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-widest text-[10px]">
              <span>REQUEST INVITATION</span>
              <ArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#C5A880] block mb-2">
              JOURNAL & INVITATIONS
            </span>
            <p className="text-white/70 text-xs leading-relaxed">
              Receive private previews of our loom releases, bridal essays, and seasonal salon salons.
            </p>
            <div className="flex items-center border-b border-white/30 pb-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent text-white text-xs w-full focus:outline-none placeholder:text-white/40"/>
              <button
                onClick={() => playSfx('click')}
                className="text-[#C5A880] text-[10px] tracking-widest uppercase hover:text-white cursor-pointer">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.25em] text-white/50 uppercase font-mono">
          <div>© 2026 ATELIER AARSH. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>INSTAGRAM: @ATELIER.AARSH</span>
            <span>WHATSAPP: +91 98400 12345</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
