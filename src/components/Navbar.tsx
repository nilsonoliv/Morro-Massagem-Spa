import React, { useState } from 'react';
import { Menu, X, MessageCircle, Sparkles, MapPin, Phone } from 'lucide-react';
import { SoundAmbiance } from './SoundAmbiance';
import { LanguageSelector } from './LanguageSelector';
import { ShaktiLogo } from './ShaktiLogo';
import { useLanguage } from '../context/LanguageContext';
import { DISPLAY_PHONE, getQuickBookingUrl } from '../utils/whatsapp';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-black/5 transition-all duration-300">
      {/* Top micro bar for location & notice */}
      <div className="bg-[#2C3639] text-[#F5F2ED]/90 text-xs py-2 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#78A1BB] shrink-0" />
            <span className="text-[11px] uppercase tracking-[1.5px] opacity-90">{t.nav.locationBadge}</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[#F5F2ED]/80 text-[11px]">
            <span className="flex items-center gap-1.5 opacity-90">
              <Sparkles className="w-3 h-3 text-[#D9A84E]" /> {t.nav.servicesBadge}
            </span>
            <span className="opacity-40">•</span>
            <a 
              href={`tel:${DISPLAY_PHONE.replace(/\D/g, '')}`} 
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3" /> {DISPLAY_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Brand Logo - Official Shakti Prana Emblem */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group text-left shrink-0">
            <ShaktiLogo size="sm" showAura className="transition-transform group-hover:scale-105" />
            <div>
              <span className="block font-serif text-lg sm:text-2xl font-normal tracking-[-0.5px] text-[#2C3639] group-hover:text-[#4A5D4E] transition-colors">
                Shakti Prana
              </span>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[2px] font-semibold text-[#4A5D4E]">
                Massage & Spa • Morro de SP
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-semibold uppercase tracking-[1.5px] text-stone-600">
            <a href="#inicio" className="hover:text-[#4A5D4E] transition-colors">{t.nav.home}</a>
            <a href="#servicos" className="hover:text-[#4A5D4E] transition-colors">{t.nav.services}</a>
            <a href="#galeria" className="hover:text-[#4A5D4E] transition-colors">{t.nav.gallery}</a>
            <a href="#depoimentos" className="hover:text-[#4A5D4E] transition-colors">{t.nav.reviews}</a>
            <a href="#localizacao" className="hover:text-[#4A5D4E] transition-colors">{t.nav.location}</a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Flags in Navbar: Brazil, Spain, UK, Italy, France, Israel */}
            <div className="hidden lg:flex items-center">
              <LanguageSelector variant="compact" />
            </div>

            {/* Sound Synthesizer */}
            <SoundAmbiance />

            {/* Quick WhatsApp Pill Button */}
            <a
              id="btn-nav-whatsapp"
              href={getQuickBookingUrl(undefined, language)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 lg:px-5 py-2.5 rounded-full text-xs font-semibold shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] transition-all duration-200 active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>{t.nav.bookWhatsapp}</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/50 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-black/5 bg-[#F5F2ED] px-5 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Language Flags Selector */}
          <div className="p-3.5 bg-white/70 rounded-2xl border border-black/5">
            <LanguageSelector variant="full" onSelect={() => setMobileMenuOpen(false)} />
          </div>

          <nav className="flex flex-col space-y-1.5 text-sm font-medium text-stone-700">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              {t.nav.home}
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              {t.nav.services}
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              {t.nav.reviews}
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              {t.nav.location}
            </a>
          </nav>

          <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
            <button
              id="btn-mobile-booking-wizard"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#4A5D4E] hover:bg-[#2C3639] text-white py-3 rounded-full font-medium text-xs uppercase tracking-wider text-center shadow-xs"
            >
              {t.nav.customizeBooking}
            </button>
            <a
              href={getQuickBookingUrl(undefined, language)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-3 rounded-full font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              {t.nav.callWhatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


