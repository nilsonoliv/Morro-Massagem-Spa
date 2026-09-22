import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getQuickBookingUrl } from '../utils/whatsapp';
import { Language } from '../i18n/translations';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQContent {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  trustTitle: string;
  trustDesc: string;
  ctaButton: string;
  items: FAQItem[];
}

const FAQ_DATA: Record<Language, FAQContent> = {
  pt: {
    badge: 'Dúvidas Frequentes • FAQ',
    titlePart1: 'Perguntas Frequentes sobre ',
    titlePart2: 'Massagem em Morro',
    subtitle: 'Tudo o que você precisa saber para planejar sua experiência de relaxamento, recuperação muscular e bem-estar na ilha de Morro de São Paulo.',
    trustTitle: 'Dúvida específica ou horário personalizado?',
    trustDesc: 'Converse diretamente no WhatsApp para verificar disponibilidade em tempo real para hoje ou agendar para sua viagem.',
    ctaButton: 'Tirar Dúvida no WhatsApp',
    items: [
      {
        id: 'faq-1',
        question: 'Como funciona o agendamento de massagem em Morro de São Paulo?',
        answer: 'O agendamento é simples e rápido diretamente via WhatsApp oficial (+55 71 99954-5032). Você escolhe o tipo de terapia (relaxante, thai, terapêutica, orgástica ou pós-passeio), o horário desejado e o local (beira-mar ou na sua pousada). Respondemos rapidamente para confirmar sua sessão.',
      },
      {
        id: 'faq-2',
        question: 'O atendimento é feito na praia ou na minha pousada / hotel?',
        answer: 'Oferecemos as duas opções para seu máximo conforto: você pode desfrutar de um atendimento à beira-mar sentindo a brisa e o som das ondas na Segunda Praia, ou solicitar o atendimento privativo na sua pousada, hotel ou casa de temporada em qualquer praia de Morro de São Paulo.',
      },
      {
        id: 'faq-3',
        question: 'Qual a massagem mais recomendada após passeios como Volta à Ilha e Gamboa?',
        answer: 'Recomendamos o "Spa & Massagem Pós-Passeios Morro". Ela combina manobras de liberação miofascial, alongamentos suaves e drenagem para aliviar a fadiga muscular após caminhadas na areia, subida do Farol, mergulho nas piscinas naturais ou sol do barco.',
      },
      {
        id: 'faq-4',
        question: 'O que é a Thai Massagem e quais são seus benefícios?',
        answer: 'A Thai Massagem Tradicional (Yoga Massagem Tailandesa) é uma terapia milenar realizada sobre tatami. Utiliza compressões ritmadas e alongamentos passivos nos canais de energia "Sen", desbloqueando tensões crônicas, aumentando a flexibilidade e restabelecendo o fluxo do prana (energia vital).',
      },
      {
        id: 'faq-5',
        question: 'Como funciona a Massagem Orgástica & Tântrica da Shakti Prana?',
        answer: 'É uma vivência meditativa e sensorial baseada nas tradições tântricas orientais e na bioenergética. O foco é expandir a energia vital (Shakti & Prana), promover profunda conexão corporal e dissolver couraças psicofísicas em um ambiente de absoluto respeito, presença e acolhimento.',
      },
      {
        id: 'faq-6',
        question: 'Quais formas de pagamento são aceitas na ilha?',
        answer: 'Aceitamos PIX instantâneo, Cartões de Crédito e Débito (principais bandeiras), dinheiro em espécie (Real, Dólar e Euro) e transferências internacionais (Wise). Você pode acertar antes ou ao final da sessão.',
      },
    ],
  },
  en: {
    badge: 'Frequently Asked Questions • FAQ',
    titlePart1: 'Frequently Asked Questions about ',
    titlePart2: 'Massage in Morro',
    subtitle: 'Everything you need to know to plan your relaxation, muscle recovery, and wellness experience on the island of Morro de São Paulo.',
    trustTitle: 'Specific question or customized schedule?',
    trustDesc: 'Chat directly on WhatsApp to check real-time availability for today or book in advance for your trip.',
    ctaButton: 'Ask a Question on WhatsApp',
    items: [
      {
        id: 'faq-1',
        question: 'How does booking a massage in Morro de São Paulo work?',
        answer: 'Booking is quick and straightforward via official WhatsApp (+55 71 99954-5032). Simply choose your desired therapy (Relaxing, Thai, Deep Tissue, Orgasmic/Tantric, or Post-Excursion), time slot, and preferred location (beachside or your pousada). We confirm quickly.',
      },
      {
        id: 'faq-2',
        question: 'Is the session held on the beach or at my hotel/pousada?',
        answer: 'We offer both options for your convenience: enjoy a seaside massage with the ocean breeze and sound of waves on Segunda Praia, or request a private in-room session at your pousada or vacation home anywhere on the island.',
      },
      {
        id: 'faq-3',
        question: 'Which massage is best after island boat tours like Volta à Ilha or Gamboa?',
        answer: 'We recommend the "Post-Excursion Recovery Massage". It combines myofascial release, gentle stretching, and lymphatic drainage to relieve soreness from walking on dunes, snorkeling in tidal pools, or long boat rides.',
      },
      {
        id: 'faq-4',
        question: 'What is Traditional Thai Massage and what are its benefits?',
        answer: 'Traditional Thai Massage is an ancient body therapy performed on a comfortable mat. It combines rhythmic acupressure and assisted yoga stretching along the "Sen" energy lines, releasing deep chronic tension and restoring flexibility.',
      },
      {
        id: 'faq-5',
        question: 'How does the Orgasmic & Tantric Massage by Shakti Prana work?',
        answer: 'It is a mindful, respectful sensory experience rooted in Eastern tantric traditions and bioenergetics. It focuses on expanding vital life-force energy (Shakti & Prana), conscious breathing, and somatic tension release with absolute professionalism.',
      },
      {
        id: 'faq-6',
        question: 'What payment methods are accepted on the island?',
        answer: 'We accept Brazilian PIX, major Credit and Debit cards, cash (BRL, USD, EUR), and international transfers (Wise). Payment can be made before or upon completion of the service.',
      },
    ],
  },
  es: {
    badge: 'Preguntas Frecuentes • FAQ',
    titlePart1: 'Preguntas Frecuentes sobre ',
    titlePart2: 'Masajes en Morro',
    subtitle: 'Todo lo que necesitas saber para planificar tu experiencia de relajación, recuperación muscular y bienestar en Morro de São Paulo.',
    trustTitle: '¿Pregunta específica o horario personalizado?',
    trustDesc: 'Escríbenos directamente por WhatsApp para consultar disponibilidad en tiempo real para hoy o agendar para tu estadía.',
    ctaButton: 'Consultar por WhatsApp',
    items: [
      {
        id: 'faq-1',
        question: '¿Cómo funciona la reserva de masajes en Morro de São Paulo?',
        answer: 'La reserva es rápida y sencilla a través de WhatsApp oficial (+55 71 99954-5032). Eliges el tipo de terapia (relajante, thai, terapéutico, orgásmico o post-paseo), horario y lugar (a la orilla del mar o en tu posada). Confirmamos al instante.',
      },
      {
        id: 'faq-2',
        question: '¿La atención se realiza en la playa o en mi posada / hotel?',
        answer: 'Ofrecemos ambas opciones para tu total comodidad: frente al mar con el sonido relajante de las olas en Segunda Praia, o servicio exclusivo a domicilio en tu posada o casa en cualquier punto de Morro.',
      },
      {
        id: 'faq-3',
        question: '¿Cuál es el masaje más recomendado después de los paseos en barco?',
        answer: 'Recomendamos el "Spa & Masaje Post-Paseos". Combina liberación miofascial, estiramientos suaves y drenaje para aliviar la fatiga muscular tras caminatas en la arena, subidas al Faro o sol en lanchas.',
      },
      {
        id: 'faq-4',
        question: '¿Qué es el Masaje Tradicional Tailandés y cuáles son sus beneficios?',
        answer: 'Es una terapia corporal milenaria sobre tatami. Utiliza presiones rítmicas y estiramientos pasivos tipo yoga a lo largo de las líneas de energía "Sen", liberando contracturas y restaurando el flujo del prana.',
      },
      {
        id: 'faq-5',
        question: '¿Cómo funciona el Masaje Orgásmico & Tántrico Shakti Prana?',
        answer: 'Es una vivencia meditativa y sensorial basada en la bioenergética y la tradición tántrica. Busca expandir la energía vital (Shakti & Prana), promover presencia corporal y disolver tensiones con total respeto y profesionalismo.',
      },
      {
        id: 'faq-6',
        question: '¿Qué formas de pago se aceptan en la isla?',
        answer: 'Aceptamos PIX, tarjetas de crédito y débito, efectivo (Reales, Dólares y Euros) y transferencias internacionales (Wise).',
      },
    ],
  },
  it: {
    badge: 'Domande Frequenti • FAQ',
    titlePart1: 'Domande Frequenti sui ',
    titlePart2: 'Massaggi a Morro',
    subtitle: 'Tutto ciò che devi sapere per organizzare la tua esperienza di benessere, relax e recupero muscolare a Morro de São Paulo.',
    trustTitle: 'Hai una richiesta specifica o un orario personalizzato?',
    trustDesc: 'Scrivici su WhatsApp per verificare la disponibilità in tempo reale per oggi o prenotare durante il tuo soggiorno.',
    ctaButton: 'Richiedi Info su WhatsApp',
    items: [
      {
        id: 'faq-1',
        question: 'Come funziona la prenotazione del massaggio a Morro de São Paulo?',
        answer: 'La prenotazione è facile e veloce via WhatsApp ufficiale (+55 71 99954-5032). Selezioni il tipo di terapia desiderata, orario e luogo (fronte mare o presso la tua pousada). Rispondiamo subito.',
      },
      {
        id: 'faq-2',
        question: 'Il massaggio si svolge in spiaggia o nella mia pousada/hotel?',
        answer: 'Offriamo entrambe le modalità: all\'aperto in riva al mare con la brezza marina sulla Segunda Praia, oppure nel comfort privato della tua camera d\'albergo.',
      },
      {
        id: 'faq-3',
        question: 'Quale massaggio è più indicato dopo escursioni in barca come Giro dell\'Isola?',
        answer: 'Consigliamo il "Massaggio Post-Escursione": rilassa la muscolatura contratta dopo camminate sulla sabbia, escursioni e bagni di sole.',
      },
      {
        id: 'faq-4',
        question: 'Cos\'è il Thai Massage Tradizionale?',
        answer: 'È un\'antica pratica corporea su tatami che abbina digitopressione ritmica e allungamenti yoga passivi lungo le linee energetiche Sen.',
      },
      {
        id: 'faq-5',
        question: 'Come funziona il Massaggio Orgastico & Tantrico?',
        answer: 'Un percorso sensoriale e meditativo che risveglia l\'energia vitale Shakti e Prana in totale rispetto e accoglienza professionale.',
      },
      {
        id: 'faq-6',
        question: 'Quali modalità di pagamento sono accettate?',
        answer: 'Accettiamo carte di credito e debito internazionali, PIX, contanti (Real, Dollari, Euro) e bonifici Wise.',
      },
    ],
  },
  fr: {
    badge: 'Foire Aux Questions • FAQ',
    titlePart1: 'Questions Fréquentes sur ',
    titlePart2: 'les Massages à Morro',
    subtitle: 'Tout ce que vous devez savoir pour organiser votre pause détente, récupération et bien-être sur l\'île de Morro de São Paulo.',
    trustTitle: 'Une demande particulière ou un créneau sur mesure ?',
    trustDesc: 'Échangez directement sur WhatsApp pour vérifier les disponibilités du jour ou réserver pendant vos vacances.',
    ctaButton: 'Poser une Question sur WhatsApp',
    items: [
      {
        id: 'faq-1',
        question: 'Comment réserver un massage à Morro de São Paulo ?',
        answer: 'La réservation s\'effectue en toute simplicité via le WhatsApp officiel (+55 71 99954-5032). Vous choisissez votre soin, l\'heure et le lieu (bord de mer ou votre pousada).',
      },
      {
        id: 'faq-2',
        question: 'Le soin a-t-il lieu sur la plage ou dans mon hébergement ?',
        answer: 'Les deux options sont possibles : face à l\'océan bercé par les vagues sur Segunda Praia, ou en séance privée dans votre pousada ou hôtel.',
      },
      {
        id: 'faq-3',
        question: 'Quel massage choisir après les excursions en bateau ou randonnées ?',
        answer: 'Nous recommandons le "Massage Récupération Après-Excursion", idéal pour relâcher les tensions musculaires accumulées après une journée de bateau et de marche.',
      },
      {
        id: 'faq-4',
        question: 'Qu\'est-ce que le Massage Thaïlandais Traditionnel ?',
        answer: 'Une thérapie ancestrale sur tatami mêlant étirements inspirés du yoga et pressions le long des lignes énergétiques Sen.',
      },
      {
        id: 'faq-5',
        question: 'Comment se déroule le Massage Orgastique & Tantrique ?',
        answer: 'Une expérience sensorielle et méditative guidée par la respiration pour libérer l\'énergie vitale Shakti & Prana dans un cadre de grand respect.',
      },
      {
        id: 'faq-6',
        question: 'Quels sont les modes de paiement acceptés ?',
        answer: 'Cartes bancaires, espèces (Reais, Dollars, Euros), PIX et virements internationaux (Wise).',
      },
    ],
  },
  he: {
    badge: 'שאלות נפוצות • FAQ',
    titlePart1: 'שאלות ותשובות על ',
    titlePart2: 'עיסוי במורו דה סאו פאולו',
    subtitle: 'כל מה שחשוב לדעת כדי לתאם חווית רוגע, הרפיית שרירים ובריאות באי מורו דה סאו פאולו.',
    trustTitle: 'יש לכם שאלה מיוחדת או שעה מועדפת?',
    trustDesc: 'צרו קשר ישירות בוואטסאפ לבדיקת זמינות להיום או לתיאום מראש במהלך החופשה שלכם.',
    ctaButton: 'שלחו הודעה בוואטסאפ',
    items: [
      {
        id: 'faq-1',
        question: 'איך מתאמים עיסוי במורו דה סאו פאולו?',
        answer: 'התיאום מהיר וקל ישירות בוואטסאפ (+55 71 99954-5032). בוחרים את סוג הטיפול הרצוי (מרגיע, תאילנדי, טנטרי או אחרי טיול), שעה ומיקום (בחוף או בפוסאדה שלכם).',
      },
      {
        id: 'faq-2',
        question: 'האם הטיפול מתקיים בחוף או בפוסאדה שלי?',
        answer: 'אנחנו מציעים את שתי האפשרויות: על קו המים מול רחש הגלים בחוף השני (Segunda Praia), או באופן פרטי אצלכם בפוסאדה או במלון בכל מקום באי.',
      },
      {
        id: 'faq-3',
        question: 'איזה עיסוי מומלץ אחרי טיולי יום וסירות באי?',
        answer: 'מומלץ מאוד טיפול התאוששות לאחר טיולים: משלב שחרור שרירים עמוק, מתיחות עדינות והרגעת עומסים לאחר הליכה בחול ושייט בסירה.',
      },
      {
        id: 'faq-4',
        question: 'מהו עיסוי תאילנדי מסורתי ומה יתרונותיו?',
        answer: 'עיסוי עתיק יומין המבוצע על גבי מזרן טאטאמי מיוחד, וכולל לחיצות קצביות ומתיחות פסיביות בסגנון יוגה לפתיחת חסימות אנרגטיות והגמשת הגוף.',
      },
      {
        id: 'faq-5',
        question: 'איך עובד עיסוי אורגזמי וטנטרי של שאקטי פראנה?',
        answer: 'חוויה חושית ומדיטטיבית המבוססת על מסורות טנטרה וביו-אנרגיה, במטרה להרחיב את אנרגיית החיים מתוך כבוד מלא ומקצועיות ללא פשרות.',
      },
      {
        id: 'faq-6',
        question: 'באילו אמצעי תשלום ניתן לשלם באי?',
        answer: 'אנו מקבלים כרטיסי אשראי ודביט בינלאומיים, מזומן (ריאל, דולר, יורו), העברות Wise ו-PIX.',
      },
    ],
  },
};

export const FAQSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const content = FAQ_DATA[language] || FAQ_DATA.pt;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-black/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D9A84E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#4A5D4E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E] border border-[#4A5D4E]/20">
            <HelpCircle className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>{content.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C3639] font-normal tracking-tight">
            {content.titlePart1}<span className="italic text-[#4A5D4E]">{content.titlePart2}</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {content.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.id}
                className="bg-white/90 backdrop-blur-xs rounded-2xl border border-black/5 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  id={`btn-${faq.id}`}
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 ${isRTL ? 'text-right' : 'text-left'} hover:bg-black/[0.015] transition-colors focus:outline-none`}
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
                    className={`px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-black/5 bg-[#FCFAF6]/60 animate-in fade-in duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
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
          <div className={`space-y-1.5 ${isRTL ? 'text-right' : 'text-center sm:text-left'}`}>
            <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-center sm:justify-start'} gap-2 text-[#4A5D4E] font-semibold text-xs uppercase tracking-wider`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.trustTitle}</span>
            </div>
            <p className="text-stone-700 text-sm">
              {content.trustDesc}
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
            <span>{content.ctaButton}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

