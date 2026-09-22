import React from 'react';
import { MessageCircle, Star, Sparkles, Waves, Calendar, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { getQuickBookingUrl, GOOGLE_MAPS_URL } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { SoundAmbiance } from './SoundAmbiance';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, language } = useLanguage();

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#F5F2ED] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* Top Pill & Location Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20">
                <Waves className="w-3.5 h-3.5 text-[#4A5D4E]" />
                {t.hero.locationTag}
              </span>

              {/* Botão Som do Mar reduzido no modo mobile (libera espaço no header para o menu) */}
              <div className="sm:hidden inline-flex">
                <SoundAmbiance id="btn-sound-ambiance-hero" size="sm" />
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/80 hover:bg-white text-stone-700 border border-black/5 transition-colors shadow-2xs"
                title="Google Maps"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-bold text-stone-900">5.0</span>
                <span className="text-stone-500 text-[11px]">{t.hero.ratingText}</span>
              </a>
            </div>

            {/* Main Headline - Clean Minimalism Serif */}
            <div className="space-y-4">
              <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-[#2C3639] leading-[1.12] tracking-[-0.02em]">
                {t.hero.titlePart1}<span className="italic font-normal text-[#4A5D4E]">{t.hero.titlePart2}</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl font-normal opacity-85">
                {t.hero.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                id="btn-hero-whatsapp"
                href={getQuickBookingUrl(undefined, language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.hero.btnWhatsapp}</span>
              </a>

              <button
                id="btn-hero-customize"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-7 py-4 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-200 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#F5F2ED]" />
                <span>{t.hero.btnCustomize}</span>
              </button>
            </div>

            {/* Clean Feature Mini-Grid (oculto no mobile para deixar o layout enxuto) */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-3 pt-3 border-t border-black/5">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/60 border border-black/5">
                <Waves className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-xs text-[#2C3639]">{t.hero.pillSoundSea}</p>
                  <p className="text-stone-500 text-[11px]">{t.hero.pillSoundSeaSub}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/60 border border-black/5">
                <Sparkles className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-xs text-[#2C3639]">{t.hero.pillNaturalOils}</p>
                  <p className="text-stone-500 text-[11px]">{t.hero.pillNaturalOilsSub}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/60 border border-black/5">
                <ShieldCheck className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-xs text-[#2C3639]">{t.hero.pillBeachPousada}</p>
                  <p className="text-stone-500 text-[11px]">{t.hero.pillBeachPousadaSub}</p>
                </div>
              </div>
            </div>

            {/* Trust note */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium pt-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t.hero.satisfiedClients}</span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Clean Minimalist Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#2C3639] border border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80"
                  alt="Massoterapia à beira-mar em Morro de São Paulo"
                  className="w-full h-84 sm:h-96 object-cover hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3639]/90 via-transparent to-black/10" />
                
                {/* Floating Status Pill */}
                <div className="absolute top-4 left-4 bg-[#2C3639]/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide uppercase px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>{t.hero.therapistActive}</span>
                </div>

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-left p-4 rounded-xl bg-[#2C3639]/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-serif text-lg font-normal text-[#F5F2ED]">{t.hero.therapistTitle}</p>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#F5F2ED]/80 font-light">
                    {t.hero.therapistBio}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#78A1BB] font-medium">
                    <span>📍 {t.hero.locationTag}</span>
                    <a href="#galeria" className="underline hover:text-white flex items-center gap-1">
                      <span>{t.hero.seeGallery}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Minimalist Floating review quote */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#F5F2ED] p-3.5 rounded-xl shadow-md border border-black/10 items-center gap-3 max-w-xs animate-in fade-in slide-in-from-bottom duration-500 text-left">
                <div className="border-l-2 border-[#4A5D4E] pl-2.5">
                  <p className="font-serif italic text-xs text-[#2C3639]">{t.hero.quoteText}</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold mt-0.5">{t.hero.quoteAuthor}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


