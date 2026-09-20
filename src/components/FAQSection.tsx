import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getQuickBookingUrl } from '../utils/whatsapp';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'locations' | 'techniques' | 'payment';
}

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Multilingual FAQ Content for top Google SEO search intent
  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'booking',
      question: 'Como funciona o agendamento de massagem em Morro de São Paulo?',
      answer: 'O agendamento é simples e rápido diretamente via WhatsApp oficial (+55 71 99954-5032). Você escolhe o tipo de terapia (relaxante, thai, terapêutica, orgástica ou pós-passeio), o horário desejado e o local (beira-mar ou na sua pousada). Respondemos rapidamente para confirmar sua sessão.',
    },
    {
      id: 'faq-2',
      category: 'locations',
      question: 'O atendimento é feito na praia ou na minha pousada / hotel?',
      answer: 'Oferecemos as duas opções para seu máximo conforto: você pode desfrutar de um atendimento à beira-mar sentindo a brisa e o som das ondas na Segunda Praia, ou solicitar o atendimento privativo na sua pousada, hotel ou casa de temporada em qualquer praia de Morro de São Paulo.',
    },
    {
      id: 'faq-3',
      category: 'techniques',
      question: 'Qual a massagem mais recomendada após passeios como Volta à Ilha e Gamboa?',
      answer: 'Recomendamos o "Spa & Massagem Pós-Passeios Morro". Ela combina manobras de liberação miofascial, alongamentos suaves e drenagem para aliviar a fadiga muscular após caminhadas na areia, subida do Farol, mergulho nas piscinas naturais ou sol do barco.',
    },
    {
      id: 'faq-4',
      category: 'techniques',
      question: 'O que é a Thai Massagem e quais são seus benefícios?',
      answer: 'A Thai Massagem Tradicional (Yoga Massagem Tailandesa) é uma terapia milenar realizada sobre tatami. Utiliza compressões ritmadas e alongamentos passivos nos canais de energia "Sen", desbloqueando tensões crônicas, aumentando a flexibilidade e restabelecendo o fluxo do prana (energia vital).',
    },
    {
      id: 'faq-5',
      category: 'techniques',
      question: 'Como funciona a Massagem Orgástica & Tântrica da Shakti Prana?',
      answer: 'É uma vivência meditativa e sensorial baseada nas tradições tântricas orientais e na bioenergética. O foco é expandir a energia vital (Shakti & Prana), promover profunda conexão corporal e dissolver couraças psicofísicas em um ambiente de absoluto respeito, presença e acolhimento.',
    },
    {
      id: 'faq-6',
      category: 'payment',
      question: 'Quais formas de pagamento são aceitas na ilha?',
      answer: 'Aceitamos PIX instantâneo, Cartões de Crédito e Débito (principais bandeiras), dinheiro em espécie (Real, Dólar e Euro) e transferências internacionais (Wise). Você pode acertar antes ou ao final da sessão.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-black/5 relative overflow-hidden">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D9A84E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#4A5D4E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20">
            <HelpCircle className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>Dúvidas Frequentes • FAQ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C3639] font-normal tracking-tight">
            Perguntas Frequentes sobre <span className="italic text-[#4A5D4E]">Massagem em Morro</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Tudo o que você precisa saber para planejar sua experiência de relaxamento, recuperação muscular e bem-estar na ilha de Morro de São Paulo.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.id}
                className="bg-white/90 backdrop-blur-xs rounded-2xl border border-black/5 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  id={`btn-${faq.id}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-black/[0.015] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`answer-${faq.id}`}
                >
                  <span className="font-medium text-stone-900 text-sm sm:text-base pr-2 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#4A5D4E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`answer-${faq.id}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-black/5 bg-[#FCFAF6]/60 animate-in fade-in duration-200"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Local SEO Trust Card & WhatsApp CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#4A5D4E]/10 via-[#FAF7F2] to-[#D9A84E]/10 rounded-2xl p-6 sm:p-8 border border-[#4A5D4E]/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#4A5D4E] font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dúvida específica ou horário personalizado?</span>
            </div>
            <p className="text-stone-700 text-sm">
              Converse diretamente no WhatsApp para verificar disponibilidade em tempo real para hoje ou agendar para sua viagem.
            </p>
          </div>

          <a
            id="btn-faq-whatsapp"
            href={getQuickBookingUrl(undefined, language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-full text-xs font-semibold shadow-[0_6px_16px_rgba(37,211,102,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-200 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
