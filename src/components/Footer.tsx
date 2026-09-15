import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Waves, 
  Heart, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { DISPLAY_PHONE, GOOGLE_MAPS_URL, getQuickBookingUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { ShaktiLogo } from './ShaktiLogo';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#2C3639] text-[#F5F2ED] pt-16 pb-24 sm:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShaktiLogo size="sm" showAura />
              <div>
                <h3 className="font-serif text-lg font-normal text-white">Shakti Prana Massage</h3>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#78A1BB] font-medium">Spa & Morro Massagem • Morro de SP</p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span className="font-medium text-stone-200">{t.footer.googleRating}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white tracking-wide uppercase">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-xs font-light text-stone-300">
              <li><a href="#inicio" className="hover:text-white transition-colors">{t.nav.home}</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">{t.nav.services}</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">{t.nav.gallery}</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">{t.nav.reviews}</a></li>
              <li><a href="#localizacao" className="hover:text-white transition-colors">{t.nav.location}</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Scheduling */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white tracking-wide uppercase">{t.footer.contactTitle}</h4>
            <div className="space-y-2.5 text-xs text-stone-300 font-light">
              <a 
                href={getQuickBookingUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#78A1BB] shrink-0" />
                <span>{t.footer.hoursText}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <span>{t.footer.locationsText}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#78A1BB] hover:underline"
              >
                <span>{t.footer.mapsLink}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Highlights */}
          <div className="space-y-3 bg-[#242c2f] p-5 rounded-2xl border border-white/5">
            <h4 className="font-serif text-sm font-normal text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#78A1BB]" />
              {t.footer.standardsTitle}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-300 font-light">
              <li>✓ {t.footer.standard1}</li>
              <li>✓ {t.footer.standard2}</li>
              <li>✓ {t.footer.standard3}</li>
              <li>✓ {t.footer.standard4}</li>
            </ul>
          </div>

        </div>

        {/* SEO Keywords & Search Indexing Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-left">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400 font-light">
            <span className="font-medium text-[#D9A84E] uppercase tracking-wider text-[10px]">Buscas frequentes:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">morro massagem</span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">spa</span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">massagem orgástica</span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">thai massagem</span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">morro de são paulo</span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300">passeios morro</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-light">
          <p>© {new Date().getFullYear()} Shakti Prana Massage • {t.footer.copyright}</p>
          <p className="flex items-center gap-1">
            {t.footer.madeWithLove}
          </p>
        </div>
      </div>
    </footer>
  );
};


