import React, { useState } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  PlusCircle, 
  X, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Sparkles, 
  Upload, 
  Eye, 
  Filter,
  Trash2
} from 'lucide-react';
import { MediaCategory, MediaItem, MediaType } from '../types';

interface MediaGalleryProps {
  mediaList: MediaItem[];
  onAddMedia: (newMedia: Omit<MediaItem, 'id' | 'dateAdded'>) => void;
  onDeleteMedia?: (id: string) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ 
  mediaList, 
  onAddMedia,
  onDeleteMedia 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'video' | 'photo' | MediaCategory>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding new media
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<MediaType>('photo');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaCategory>('beira_mar');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('Segunda Praia, Morro de São Paulo');

  const filteredMedia = mediaList.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'video') return item.type === 'video';
    if (selectedFilter === 'photo') return item.type === 'photo';
    return item.category === selectedFilter;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      setNewType(isVideo ? 'video' : 'photo');
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    onAddMedia({
      title: newTitle.trim(),
      type: newType,
      url: newUrl.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Atendimento de massoterapia em Morro de São Paulo.',
      location: newLocation.trim() || 'Morro de São Paulo - BA',
      isFeatured: true,
      videoDuration: newType === 'video' ? '0:30' : undefined,
    });

    // Reset & close
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#FAF8F5] border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
              Galeria & Registros
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#2C3639] tracking-tight">
              Vídeos & fotos dos atendimentos
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl leading-relaxed font-light opacity-85">
              Confira os atendimentos à beira-mar, macas confortáveis, óleos naturais e a vibe relaxante de Morro de São Paulo.
            </p>
          </div>

          {/* Add Media Action Button */}
          <button
            id="btn-open-add-media"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-[#F5F2ED]" />
            <span>Publicar Foto ou Vídeo</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 overflow-x-auto">
          {[
            { key: 'all', label: 'Todos', icon: Filter },
            { key: 'video', label: 'Vídeos', icon: VideoIcon },
            { key: 'photo', label: 'Fotos', icon: ImageIcon },
            { key: 'beira_mar', label: 'À Beira-Mar', icon: Sparkles },
            { key: 'terapeutica', label: 'Terapêutica', icon: Sparkles },
            { key: 'ambiente', label: 'Pousadas & Ilha', icon: Sparkles },
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
                      src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'}
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
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-[#2C3639]/75 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/10">
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
                </div>
              </div>

              {/* Media Info Content */}
              <div className="p-4 sm:p-5 text-left space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-normal text-base sm:text-lg text-[#2C3639] leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                  {onDeleteMedia && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Deseja excluir esta mídia?')) {
                          onDeleteMedia(item.id);
                        }
                      }}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Excluir mídia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
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

      {/* Lightbox / Video Player Modal */}
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
                  href={`https://wa.me/5571999545032?text=${encodeURIComponent(`Olá! Vi a foto/vídeo "${activeMedia.title}" e gostaria de agendar uma massagem igual!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider text-center transition-colors shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
                >
                  Quero Essa Massagem
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Media Modal Form */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#F5F2ED] rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#4A5D4E]" />
                <h3 className="font-serif font-normal text-xl text-[#2C3639]">Publicar Foto ou Vídeo</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
              {/* Type toggle */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">Tipo de Mídia</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('photo')}
                    className={`py-2 rounded-xl font-semibold flex items-center justify-center gap-2 border transition-all ${
                      newType === 'photo'
                        ? 'bg-[#2C3639] text-[#F5F2ED] border-[#2C3639]'
                        : 'bg-white text-stone-700 border-black/10'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" /> Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('video')}
                    className={`py-2 rounded-xl font-semibold flex items-center justify-center gap-2 border transition-all ${
                      newType === 'video'
                        ? 'bg-[#2C3639] text-[#F5F2ED] border-[#2C3639]'
                        : 'bg-white text-stone-700 border-black/10'
                    }`}
                  >
                    <VideoIcon className="w-4 h-4" /> Vídeo
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Título da Foto/Vídeo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Massagem na Terceira Praia..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                />
              </div>

              {/* File upload or URL */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Carregar Arquivo ou Inserir Link *</label>
                <div className="space-y-2">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-[#4A5D4E] rounded-xl p-4 cursor-pointer bg-white transition-colors">
                    <Upload className="w-6 h-6 text-stone-400 mb-1" />
                    <span className="text-xs text-stone-600 font-medium">Clique para escolher foto/vídeo do dispositivo</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="relative">
                    <input
                      type="url"
                      placeholder="Ou cole a URL da imagem/vídeo..."
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Categoria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MediaCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                >
                  <option value="beira_mar">À Beira-Mar (Praia)</option>
                  <option value="terapeutica">Terapêutica / Dores</option>
                  <option value="relaxante">Relaxante & Aromaterapia</option>
                  <option value="ambiente">Ambiente / Pousada / Quiosque</option>
                  <option value="drenagem">Drenagem & Pés</option>
                </select>
              </div>

              {/* Location in Morro */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Localização em Morro de SP</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Ex: Segunda Praia, Morro de São Paulo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Descrição</label>
                <textarea
                  rows={2}
                  placeholder="Breve descrição da sessão, técnica ou benefícios..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                />
              </div>

              <div className="pt-3 border-t border-black/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-stone-600 hover:bg-stone-200 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newTitle || !newUrl}
                  className="bg-[#4A5D4E] hover:bg-[#2C3639] disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
                >
                  Adicionar à Galeria
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
};
