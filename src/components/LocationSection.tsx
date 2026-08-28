import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Compass, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Palmtree, 
  Home
} from 'lucide-react';
import { GOOGLE_MAPS_URL, createWhatsAppLink } from '../utils/whatsapp';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase bg-[#4A5D4E]/10 text-[#4A5D4E]">
            <MapPin className="w-3.5 h-3.5 text-[#4A5D4E]" />
            Localização & Logística
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#2C3639] tracking-tight">
            Onde estamos em Morro de São Paulo
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light opacity-85">
            Atendimento presencial nas praias paradisíacas ou com total comodidade diretamente na sua pousada ou hotel.
          </p>
        </div>

        {/* Map & Logistics Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Map Container */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden shadow-2xs border border-black/5 flex flex-col justify-between">
            {/* Embedded Responsive Map */}
            <div className="relative w-full h-80 sm:h-96 bg-stone-200">
              <iframe
                title="Mapa de Morro de São Paulo - Nilson Massoterapia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15535.79774698506!2d-38.92209795!3d-13.38139585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x73e1c66f7f32997%3A0x6b149b1a03fc514f!2sMorro%20de%20S%C3%A3o%20Paulo%2C%20Cairu%20-%20BA!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 bg-[#F5F2ED]/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-black/10 text-left max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#4A5D4E] text-white flex items-center justify-center font-bold text-xs">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-[#2C3639]">Morro de São Paulo, BA</p>
                    <p className="text-[11px] text-stone-500 font-light">Ilha de Tinharé • Cairu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Action Bar */}
            <div className="p-4 sm:p-5 bg-[#F5F2ED] border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <p className="font-semibold text-xs sm:text-sm text-[#2C3639]">Perfil Oficial no Google Maps</p>
                <p className="text-[11px] text-stone-500 font-light">Consulte rotas, fotos e avaliações no app</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  id="btn-open-google-maps"
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#4A5D4E] hover:bg-[#2C3639] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                >
                  <span>Abrir Perfil</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={createWhatsAppLink('Olá! Gostaria de receber a localização exata do atendimento em Morro de São Paulo.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Pedir Posição</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: How It Works & Location Highlights */}
          <div className="lg:col-span-5 space-y-4 text-left flex flex-col justify-between">
            
            {/* Location Option 1: Beach */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-black/5 shadow-2xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F2ED] border border-black/5 flex items-center justify-center text-[#4A5D4E]">
                  <Palmtree className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-normal text-base text-[#2C3639]">
                    Atendimento à Beira-Mar (Praia)
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">Segunda & Terceira Praia</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Maca montada sob quiosque ou sombreador, com a brisa suave do oceano e o som relaxante das ondas do mar de Morro de São Paulo.
              </p>
            </div>

            {/* Location Option 2: Pousada Delivery */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-black/5 shadow-2xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F2ED] border border-black/5 flex items-center justify-center text-[#4A5D4E]">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-normal text-base text-[#2C3639]">
                    Atendimento em Pousadas & Hotéis
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">Vila, 1ª, 2ª, 3ª, 4ª Praia e Gamboa</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Levamos a estrutura completa até o seu quarto ou varanda: maca profissional higienizada, lençóis descartáveis e óleos essenciais.
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#2C3639] text-[#F5F2ED] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3 border border-white/5">
              <div className="flex items-center gap-2 text-[#78A1BB] text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Horários de Atendimento</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-stone-300 font-light">Segunda a Domingo:</span>
                  <span className="font-semibold text-white">08:00 às 19:00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-300 font-light">Agendamentos Noturnos:</span>
                  <span className="font-semibold text-[#78A1BB]">Sob consulta prévia</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                *Recomendamos agendar com antecedência, especialmente na alta temporada e fins de semana.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

