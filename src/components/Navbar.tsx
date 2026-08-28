import React, { useState } from 'react';
import { Menu, X, MessageCircle, Sparkles, MapPin, Phone } from 'lucide-react';
import { SoundAmbiance } from './SoundAmbiance';
import { DISPLAY_PHONE, getQuickBookingUrl } from '../utils/whatsapp';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-black/5 transition-all duration-300">
      {/* Top micro bar for location & notice */}
      <div className="bg-[#2C3639] text-[#F5F2ED]/90 text-xs py-2 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#78A1BB] shrink-0" />
            <span className="text-[11px] uppercase tracking-[1.5px] opacity-90">Morro de São Paulo, Bahia</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[#F5F2ED]/80 text-[11px]">
            <span className="flex items-center gap-1.5 opacity-90">
              <Sparkles className="w-3 h-3 text-[#78A1BB]" /> Atendimento Beira-Mar & Pousadas
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Clean Minimalism Serif Italic */}
          <a href="#" className="flex items-center gap-3 group text-left">
            <div className="w-9 h-9 rounded-full bg-[#4A5D4E] text-[#F5F2ED] flex items-center justify-center font-serif text-base font-medium group-hover:bg-[#2C3639] transition-colors shadow-xs">
              N
            </div>
            <div>
              <span className="block font-serif italic text-xl sm:text-2xl font-normal tracking-[-0.5px] text-[#2C3639]">
                Massoterapia Morro
              </span>
              <span className="block text-[10px] uppercase tracking-[2px] font-semibold text-stone-500 opacity-70">
                Morro de São Paulo, Bahia
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[1.5px] text-stone-600">
            <a href="#inicio" className="hover:text-[#4A5D4E] transition-colors">Início</a>
            <a href="#servicos" className="hover:text-[#4A5D4E] transition-colors">Massagens</a>
            <a href="#galeria" className="hover:text-[#4A5D4E] transition-colors">Galeria</a>
            <a href="#depoimentos" className="hover:text-[#4A5D4E] transition-colors">Avaliações</a>
            <a href="#localizacao" className="hover:text-[#4A5D4E] transition-colors">Localização</a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Sound Synthesizer */}
            <SoundAmbiance />

            {/* Quick WhatsApp Pill Button */}
            <a
              id="btn-nav-whatsapp"
              href={getQuickBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Agendar WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/50 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-[#F5F2ED] px-5 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              Início
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              Massagens & Serviços
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              Galeria de Fotos & Vídeos
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              Depoimentos de Clientes
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#4A5D4E]"
            >
              Localização & Acesso
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
              Personalizar Atendimento
            </button>
            <a
              href={getQuickBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-3 rounded-full font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chamar no WhatsApp (71 99954-5032)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

