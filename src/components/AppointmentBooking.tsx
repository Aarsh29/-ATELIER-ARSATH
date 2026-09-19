import React, { useState } from 'react';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles } from 'lucide-react';

export const AppointmentBooking: React.FC = () => {
  const { theme, playSfx } = useAtelier();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '2026-10-14',
    timeSlot: '11:00 AM (Morning Sunlight Fitting)',
    service: 'Bridal Muhurtham Bespoke Consultation',
    weddingDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('click');
    setSubmitted(true);
  };

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-full text-[#C5A880] text-[9px] tracking-[0.3em] uppercase mb-4">
            <Sparkles className="w-3 h-3" />
            <span>EXCLUSIVITY & ATTENTION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight mb-4">
            REQUEST A PRIVATE APPOINTMENT.
          </h2>
          <p className="text-xs sm:text-sm opacity-70 max-w-xl mx-auto font-sans leading-relaxed">
            We host a maximum of three appointments per day to preserve the serenity of our salon. Your fitting includes private textile viewings and custom tea service.
          </p>
        </div>

        {submitted ? (
          <div className="p-12 sm:p-16 border border-[#C5A880] text-center bg-current/5 space-y-6">
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C5A880] block">
              INVITATION DISPATCHED
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light">
              YOUR PRIVATE VISIT RESERVED
            </h3>
            <p className="font-serif italic text-lg opacity-85 max-w-md mx-auto">
              “We look forward to welcoming you to Atelier Aarsh, {form.name || 'honored guest'}. Our senior couturier has set aside {form.date} at {form.timeSlot} for your bridal journey.”
            </p>
            <div className="text-[10px] tracking-[0.2em] uppercase font-mono opacity-60">
              A bespoke salon pass & chauffeur details have been sent to your contact.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-14 border space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#C5A880] block mb-2">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Radhika Sundaram"
                  className="w-full bg-transparent border-b border-current/20 pb-2 text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#C5A880] block mb-2">
                  TELEPHONE / WHATSAPP *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98400 12345"
                  className="w-full bg-transparent border-b border-current/20 pb-2 text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#C5A880] block mb-2">
                  DESIRED CONSULTATION DATE *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 pb-2 text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#C5A880] block mb-2">
                  CONSULTATION FOCUS *
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 pb-2 text-sm focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Bridal Muhurtham Bespoke Consultation" className="bg-[#1A1614] text-white">
                    Bridal Muhurtham Bespoke Consultation
                  </option>
                  <option value="Architectural Aari Blouse Commission" className="bg-[#1A1614] text-white">
                    Architectural Aari Blouse Commission
                  </option>
                  <option value="Nocturne Evening Reception Couture" className="bg-[#1A1614] text-white">
                    Nocturne Evening Reception Couture
                  </option>
                  <option value="Mother & Child Trousseau Wardrobe" className="bg-[#1A1614] text-white">
                    Mother & Child Trousseau Wardrobe
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#C5A880] block mb-2">
                PERSONAL VISION OR SPECIAL RITUAL DATES
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Share your wedding dates, temple rituals, or color palette inspirations..."
                className="w-full bg-transparent border-b border-current/20 pb-2 text-sm focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer"
            >
              CONFIRM SALON RESERVATION
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
