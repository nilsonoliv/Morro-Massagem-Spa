import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Waves, Phone } from 'lucide-react';
import { DISPLAY_PHONE, createWhatsAppLink, getQuickBookingUrl } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const presets = [
    'Olá Nilson! Gostaria de saber a disponibilidade de horários para hoje em Morro de SP.',
    'Olá! Quanto custa a Massagem Relaxante e Terapêutica?',
    'Olá! Vocês atendem direto na minha pousada em Morro de São Paulo?',
    'Olá! Gostaria de agendar massagem para casal.',
  ];

  return (
    <>
      {/* Floating Button & Quick Popover on Desktop and Mobile */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        
        {/* Interactive Chat Bubble Popup */}
        {isPopupOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-[#F5F2ED] rounded-2xl shadow-2xl border border-black/10 overflow-hidden text-left animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="bg-[#2C3639] p-4 text-[#F5F2ED] flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#4A5D4E] text-[#F5F2ED] font-normal flex items-center justify-center font-serif text-base border border-white/10">
                    N
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#2C3639]" />
                </div>
                <div>
                  <h4 className="font-serif font-normal text-sm text-white">Nilson Massoterapia</h4>
                  <p className="text-[10px] text-[#78A1BB] flex items-center gap-1 font-light">
                    <span className="w-1.5 h-1.5 bg-[#78A1BB] rounded-full animate-pulse" />
                    Online em Morro de São Paulo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-stone-400 hover:text-white p-1"
                aria-label="Fechar popover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bubble Message */}
            <div className="p-4 bg-[#FAF8F5] text-xs space-y-3">
              <div className="bg-white p-3.5 rounded-xl shadow-2xs border border-black/5 text-stone-700 space-y-1">
                <p className="font-medium text-[#2C3639]">Olá! Seja muito bem-vindo(a) ao paraíso 🌴</p>
                <p className="text-stone-600 font-light leading-relaxed">
                  Como posso te ajudar a relaxar hoje? Escolha uma mensagem rápida ou clique para abrir o WhatsApp:
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                {presets.map((preset, idx) => (
                  <a
                    key={idx}
                    href={createWhatsAppLink(preset)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-left text-xs bg-white hover:bg-[#F5F2ED] text-stone-700 hover:text-[#2C3639] p-2.5 rounded-xl border border-black/5 transition-colors shadow-2xs font-light"
                  >
                    💬 {preset}
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3.5 bg-[#F5F2ED] border-t border-black/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                  onOpenBooking();
                }}
                className="text-xs font-semibold text-[#4A5D4E] hover:underline uppercase tracking-wider"
              >
                Formulário
              </button>
              <a
                href={getQuickBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Abrir Chat</span>
              </a>
            </div>

          </div>
        )}

        {/* WhatsApp Main Button */}
        <div className="relative flex items-center gap-2">
          {/* Notification pill badge */}
          {!isPopupOpen && (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#2C3639] text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-black/5 hover:bg-white transition-all hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>Agendamento Rápido</span>
            </button>
          )}

          <button
            id="btn-floating-whatsapp"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Abrir WhatsApp para agendamento"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
          </button>
        </div>

      </div>

      {/* Mobile Bottom Sticky Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-black/10 p-2.5 px-4 flex items-center justify-between gap-3 shadow-lg">
        <div className="text-left">
          <p className="font-serif text-xs text-[#2C3639]">Nilson Massoterapia</p>
          <p className="text-[10px] text-[#4A5D4E] font-medium">Morro de São Paulo • BA</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="bg-white hover:bg-stone-100 text-[#2C3639] text-xs font-semibold px-3.5 py-2 rounded-full border border-black/5 transition-colors"
          >
            Opções
          </button>
          <a
            id="btn-mobile-sticky-whatsapp"
            href={getQuickBookingUrl('Olá! Estou em Morro de São Paulo e gostaria de agendar uma massagem.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4A5D4E] hover:bg-[#2C3639] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Agendar</span>
          </a>
        </div>
      </div>
    </>
  );
};
