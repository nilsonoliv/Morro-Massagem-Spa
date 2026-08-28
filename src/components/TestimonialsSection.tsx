import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Check, 
  PlusCircle, 
  X, 
  Sparkles, 
  ExternalLink, 
  MapPin,
  Heart
} from 'lucide-react';
import { Review } from '../types';
import { GOOGLE_MAPS_URL } from '../utils/whatsapp';

interface TestimonialsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  onLikeReview?: (id: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  reviews,
  onAddReview,
  onLikeReview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Massagem Relaxante Tropical');
  const [comment, setComment] = useState('');

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    onAddReview({
      authorName: authorName.trim(),
      city: city.trim() || 'Turista em Morro de SP',
      rating,
      service,
      comment: comment.trim(),
      verified: true,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setAuthorName('');
      setCity('');
      setComment('');
      setRating(5);
    }, 1800);
  };

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E]">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
              Depoimentos & Avaliações
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#2C3639] tracking-tight">
              O que nossos clientes dizem
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl leading-relaxed font-light opacity-85">
              Veja a opinião de quem já relaxou e renovou as energias com os nossos serviços em Morro de São Paulo.
            </p>
          </div>

          {/* Action CTA to leave review */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-open-review-modal"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#F5F2ED]" />
              <span>Deixar Avaliação</span>
            </button>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/80 hover:bg-white text-stone-700 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-black/5 shadow-2xs transition-colors"
            >
              <span>Ver no Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-black/5 shadow-2xs mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl sm:text-6xl font-normal text-[#2C3639]">{averageRating}</span>
              <span className="text-stone-400 text-base font-normal">/ 5.0</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center sm:justify-start text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-800">
                Classificação Máxima • {reviews.length} Avaliações Verificadas
              </p>
              <p className="text-xs text-stone-500 font-light">
                Atendimento à beira-mar na Segunda e Terceira Praia e pousadas parceiras.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Check className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
            <span>100% de Recomendação</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-black/5 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="space-y-3">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{review.date}</span>
                </div>

                {/* Service Tag */}
                <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-[#4A5D4E] bg-[#4A5D4E]/10 px-2.5 py-0.5 rounded-full border border-[#4A5D4E]/20">
                  {review.service}
                </span>

                {/* Comment */}
                <p className="font-serif italic text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F5F2ED] text-[#2C3639] border border-black/5 flex items-center justify-center font-bold text-xs">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-xs text-stone-800">{review.authorName}</p>
                      {review.verified && (
                        <Check className="w-3 h-3 text-[#4A5D4E] shrink-0" title="Atendimento Verificado" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 flex items-center gap-0.5 font-light">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {review.city}
                    </p>
                  </div>
                </div>

                {onLikeReview && (
                  <button
                    onClick={() => onLikeReview(review.id)}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-[#4A5D4E] p-1.5 rounded-full hover:bg-stone-50 transition-colors"
                    title="Útil"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{review.helpfulCount || 0}</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#F5F2ED] rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-serif font-normal text-xl text-[#2C3639]">Conte Sua Experiência</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 bg-[#4A5D4E]/10 text-[#4A5D4E] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-serif font-normal text-xl text-[#2C3639]">Muito obrigado pelo carinho!</h4>
                <p className="text-xs text-stone-600 font-light">
                  Sua avaliação foi publicada com sucesso e ajuda novos visitantes a conhecerem o trabalho de massoterapia em Morro de SP.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
                
                {/* Star rating selector */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">Sua Nota Geral</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-stone-700">
                      {rating === 5 ? '5.0 - Excelente / Perfeito' : `${rating}.0 Estrelas`}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Beatriz & Lucas"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                  />
                </div>

                {/* City / Country */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">De onde você é?</label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo - SP, Salvador, etc."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                  />
                </div>

                {/* Service received */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Qual massagem você realizou?</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                  >
                    <option value="Massagem Relaxante Tropical">Massagem Relaxante Tropical</option>
                    <option value="Massagem Terapêutica & Descompressão">Massagem Terapêutica & Descompressão</option>
                    <option value="Drenagem Linfática Corporal">Drenagem Linfática Corporal</option>
                    <option value="Reflexologia Podal & Spa dos Pés">Reflexologia Podal & Spa dos Pés</option>
                    <option value="Ventosaterapia Integrativa">Ventosaterapia Integrativa</option>
                    <option value="Atendimento na Pousada / Casal">Atendimento na Pousada / Casal</option>
                  </select>
                </div>

                {/* Comment */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Seu Depoimento *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Conte como foi sua massagem, a sensação de relaxar em Morro de São Paulo..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
                  />
                </div>

                <div className="pt-3 border-t border-black/10 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-full text-stone-600 hover:bg-stone-200 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs"
                  >
                    Publicar Depoimento
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

