import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Waves, Phone } from 'lucide-react';
import { DISPLAY_PHONE, createWhatsAppLink, getQuickBookingUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  const { t, language } = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getPresets = () => {
    switch (language) {
      case 'en':
        return [
          'Hello Nilson! I would like to check available massage times for today in Morro de SP.',
          'Hello! How much is the Relaxing & Therapeutic massage?',
          'Hello! Do you provide massage sessions directly at my hotel/pousada in Morro de São Paulo?',
          'Hello! I would like to book a couples massage.',
        ];
      case 'es':
        return [
          '¡Hola Nilson! Me gustaría consultar disponibilidad de horarios para hoy en Morro de SP.',
          '¡Hola! ¿Cuánto cuesta el Masaje Relajante y Terapéutico?',
          '¡Hola! ¿Realizan masajes directamente en mi posada/hotel en Morro de São Paulo?',
          '¡Hola! Me gustaría agendar un masaje para parejas.',
        ];
      case 'it':
        return [
          'Ciao Nilson! Vorrei conoscere la disponibilità di orari per oggi a Morro de SP.',
          'Ciao! Quanto costa il massaggio rilassante e terapeutico?',
          'Ciao! Eseguite massaggi direttamente nella mia posada a Morro de São Paulo?',
          'Ciao! Vorrei prenotare un massaggio per coppia.',
        ];
      case 'fr':
        return [
          'Bonjour Nilson ! J’aimerais connaître les disponibilités pour aujourd’hui à Morro de SP.',
          'Bonjour ! Quel est le tarif pour le massage relaxant et thérapeutique ?',
          'Bonjour ! Faites-vous des séances directement à ma posada/hôtel à Morro de São Paulo ?',
          'Bonjour ! J’aimerais réserver un massage pour couple.',
        ];
      case 'he':
        return [
          'שלום נילסון! אשמח לדעת על זמינות תורים להיום במורו דה סאו פאולו.',
          'שלום! מה המחיר לעיסוי מרגיע או טיפולי?',
          'שלום! האם אתם מגיעים לטיפול בפוסאדה/מלון שלי במורו?',
          'שלום! אשמח לקבוע עיסוי זוגי.',
        ];
      default:
        return [
          'Olá Nilson! Gostaria de saber a disponibilidade de horários para hoje em Morro de SP.',
          'Olá! Quanto custa a Massagem Relaxante e Terapêutica?',
          'Olá! Vocês atendem direto na minha pousada em Morro de São Paulo?',
          'Olá! Gostaria de agendar massagem para casal.',
        ];
    }
  };

  const presets = getPresets();

  const getFloatingWelcome = () => {
    switch (language) {
      case 'en': return { title: 'Hello! Welcome to paradise 🌴', sub: 'How can I help you relax today? Pick a quick message or click to open WhatsApp:' };
      case 'es': return { title: '¡Hola! Bienvenido(a) al paraíso 🌴', sub: '¿Cómo puedo ayudarte a relajarte hoy? Elige un mensaje rápido o haz clic para abrir WhatsApp:' };
      case 'it': return { title: 'Ciao! Benvenuto(a) in paradiso 🌴', sub: 'Come posso aiutarti a rilassarti oggi? Scegli un messaggio rapido o clicca per aprire WhatsApp:' };
      case 'fr': return { title: 'Bonjour ! Bienvenue au paradis 🌴', sub: 'Comment puis-je vous aider à vous détendre aujourd’hui ? Choisissez un message rapide ou cliquez pour ouvrir WhatsApp :' };
      case 'he': return { title: 'שלום! ברוכים הבאים לגן עדן 🌴', sub: 'איך אוכל לעזור לך להירגע היום? בחר הודעה מהירה או לחץ לפתיחת וואטסאפ:' };
      default: return { title: 'Olá! Seja muito bem-vindo(a) ao paraíso 🌴', sub: 'Como posso te ajudar a relaxar hoje? Escolha uma mensagem rápida ou clique para abrir o WhatsApp:' };
    }
  };

  const welcome = getFloatingWelcome();

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
                    {language === 'en' ? 'Online in Morro de São Paulo' :
                     language === 'es' ? 'En línea en Morro de São Paulo' :
                     language === 'it' ? 'Online a Morro de São Paulo' :
                     language === 'fr' ? 'En ligne à Morro de São Paulo' :
                     language === 'he' ? 'זמין אונליין במורו דה סאו פאולו' :
                     'Online em Morro de São Paulo'}
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
                <p className="font-medium text-[#2C3639]">{welcome.title}</p>
                <p className="text-stone-600 font-light leading-relaxed">
                  {welcome.sub}
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
                {t.floatingChat.btnFullForm}
              </button>
              <a
                href={getQuickBookingUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>WhatsApp</span>
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
              <span>{t.floatingChat.badgeQuickBook}</span>
            </button>
          )}

          <button
            id="btn-floating-whatsapp"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="WhatsApp"
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
            {t.nav.services}
          </button>
          <a
            id="btn-mobile-sticky-whatsapp"
            href={getQuickBookingUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4A5D4E] hover:bg-[#2C3639] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};

