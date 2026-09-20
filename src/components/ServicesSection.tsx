import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Droplets, 
  Footprints, 
  Zap, 
  HeartHandshake, 
  Clock, 
  Check, 
  MessageCircle, 
  ArrowRight
} from 'lucide-react';
import { ServiceItem } from '../types';
import { getServiceBookingUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'relaxante' | 'terapeutica' | 'estetica' | 'especial'>('all');
  const { t, language } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#4A5D4E]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#4A5D4E]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#78A1BB]" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-[#4A5D4E]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#4A5D4E]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#4A5D4E]" />;
      default: return <Sparkles className="w-5 h-5 text-[#4A5D4E]" />;
    }
  };

  // Merge the base services with translated content
  const localizedServices = services.map(baseService => {
    const translated = t.services.items.find(item => item.id === baseService.id);
    if (!translated) return baseService;
    return {
      ...baseService,
      name: translated.name,
      description: translated.description,
      benefits: translated.benefits,
      recommendedFor: translated.recommendedFor,
      badge: translated.badge || baseService.badge,
    };
  });

  const filteredServices = filter === 'all' 
    ? localizedServices 
    : localizedServices.filter(s => s.category === filter);

  return (
    <section id="servicos" className="py-16 sm:py-24 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            {t.services.badge}
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#2C3639] tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal opacity-85">
            {t.services.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: 'all', label: t.services.filterAll },
            { key: 'relaxante', label: t.services.filterRelax },
            { key: 'terapeutica', label: t.services.filterTherapy },
            { key: 'estetica', label: t.services.filterDrainage },
            { key: 'especial', label: t.services.filterPousada },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-[#2C3639] text-[#F5F2ED] shadow-xs'
                  : 'bg-white/70 text-stone-600 hover:bg-white border border-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-black/5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 relative text-left"
            >
              {/* Service WebP Image Banner */}
              {service.imageUrl && (
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-[#EBE7DF] border border-black/5">
                  <img
                    src={service.imageUrl}
                    alt={service.imageAlt || service.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-[#2C3639]/90 text-white backdrop-blur-xs text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {service.badge}
                    </span>
                  )}

                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white/95 text-[11px] font-medium drop-shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                    <span>Morro de São Paulo</span>
                  </div>
                </div>
              )}

              {/* Badge if available and NO image */}
              {service.badge && !service.imageUrl && (
                <span className="absolute top-4 right-4 bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                  {service.badge}
                </span>
              )}

              {/* Service header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F2ED] border border-black/5 flex items-center justify-center group-hover:bg-white transition-colors shrink-0">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-lg sm:text-xl text-[#2C3639] leading-snug">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {service.durationMin} min
                      </span>
                      {service.priceEstimate && (
                        <>
                          <span className="opacity-40">•</span>
                          <span className="font-semibold text-[#4A5D4E]">{service.priceEstimate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Benefits checklist */}
                <div className="space-y-1.5 pt-2 border-t border-black/5">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">{t.services.benefitsLabel}:</p>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended for note */}
                <div className="bg-[#F5F2ED]/70 rounded-xl p-2.5 text-xs text-stone-600 border border-black/5">
                  <span className="font-semibold text-[#2C3639]">{t.services.recommendedForLabel}: </span>
                  {service.recommendedFor}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-black/5 flex flex-col sm:flex-row gap-2">
                <a
                  id={`btn-service-whatsapp-${service.id}`}
                  href={getServiceBookingUrl(service, language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-[0_4px_10px_rgba(37,211,102,0.2)]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t.services.btnBookWhatsapp}</span>
                </a>

                <button
                  id={`btn-service-select-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#F5F2ED] hover:bg-stone-200 text-stone-700 px-3.5 py-2.5 rounded-full font-medium text-xs transition-colors border border-black/5"
                >
                  <span>{t.services.btnDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Minimalist Advice Callout */}
        <div className="mt-12 bg-[#2C3639] rounded-2xl p-6 sm:p-8 text-[#F5F2ED] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-white/5 text-left">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-serif font-normal text-xl sm:text-2xl text-white">
              {t.services.adviceTitle}
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-light">
              {t.services.adviceSubtitle}
            </p>
          </div>
          <a
            href={getServiceBookingUrl(services[0], language)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            {t.services.adviceBtn}
          </a>
        </div>

      </div>
    </section>
  );
};


