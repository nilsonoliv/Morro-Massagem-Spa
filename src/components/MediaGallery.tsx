import React, { useState } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  X, 
  MapPin, 
  Maximize2, 
  Sparkles, 
  Filter
} from 'lucide-react';
import { MediaCategory, MediaItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

interface MediaGalleryProps {
  mediaList: MediaItem[];
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ 
  mediaList 
}) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | MediaCategory>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const filteredMedia = mediaList.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#FAF8F5] border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
              {t.gallery.badge}
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#2C3639] tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl leading-relaxed font-light opacity-85">
              {t.gallery.subtitle}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 overflow-x-auto">
          {[
            { key: 'all', label: t.gallery.filterAll, icon: Filter },
            { key: 'beira_mar', label: t.gallery.filterBeiraMar, icon: Sparkles },
            { key: 'terapeutica', label: t.gallery.filterTherapeutic, icon: Sparkles },
            { key: 'relaxante', label: t.gallery.filterRelax || 'Relaxante', icon: Sparkles },
            { key: 'ambiente', label: t.gallery.filterAmbiance, icon: Sparkles },
            { key: 'drenagem', label: t.gallery.filterDrainage || 'Drenagem', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key as typeof selectedFilter)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFilter === tab.key
                    ? 'bg-[#2C3639] text-[#F5F2ED] shadow-xs'
                    : 'bg-white/80 hover:bg-white text-stone-600 border border-black/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-md border border-black/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnailUrl || '/images/massagem-praia-atendimento.webp'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#2C3639] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#2C3639] ml-0.5" />
                      </div>
                    </div>
                    {item.videoDuration && (
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {item.videoDuration}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Badge: Type Indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[85%]">
                  <span className="inline-flex items-center gap-1 bg-[#2C3639]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                    {item.type === 'video' ? (
                      <>
                        <VideoIcon className="w-3 h-3 text-[#78A1BB]" />
                        <span>Vídeo</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-emerald-300" />
                        <span>Foto</span>
                      </>
                    )}
                  </span>
                  {(item.id.includes('real') || item.title.includes('Foto Real') || item.id.includes('foto-real')) && (
                    <span className="inline-flex items-center gap-1 bg-emerald-800/85 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-200" />
                      <span>Foto Real</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Media Info Content */}
              <div className="p-4 sm:p-5 text-left space-y-1.5">
                <div>
                  <h3 className="font-serif font-normal text-base sm:text-lg text-[#2C3639] leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#4A5D4E] font-medium pt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Media Viewer Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#2C3639] text-[#F5F2ED] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
              aria-label="Fechar visualizador"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Display */}
            <div className="w-full bg-black flex items-center justify-center max-h-[70vh]">
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain"
                >
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              ) : (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 bg-[#2C3639] border-t border-white/10 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-normal text-lg sm:text-xl text-white">
                    {activeMedia.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeMedia.description}
                  </p>
                  <p className="text-xs text-[#78A1BB] flex items-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeMedia.location}
                  </p>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Vi o item "${activeMedia.title}" na galeria e gostaria de agendar uma massagem.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider text-center transition-colors shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
                >
                  {t.services.btnBookWhatsapp}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
