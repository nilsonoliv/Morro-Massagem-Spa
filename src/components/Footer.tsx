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

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C3639] text-[#F5F2ED] pt-16 pb-24 sm:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A5D4E] text-[#F5F2ED] flex items-center justify-center font-serif text-lg font-normal border border-white/10">
                N
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal text-white">Nilson Massoterapia</h3>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#78A1BB] font-medium">Morro de São Paulo • Bahia</p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Terapia manual integrativa, alívio de tensões e relaxamento profundo em harmonia com a natureza exuberante de Morro de São Paulo.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span className="font-medium text-stone-200">Nota 5.0 no Google Maps</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white tracking-wide uppercase">Navegação</h4>
            <ul className="space-y-2 text-xs font-light text-stone-300">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Técnicas & Massagens</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotos & Vídeos</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos dos Clientes</a></li>
              <li><a href="#localizacao" className="hover:text-white transition-colors">Como Chegar / Mapa</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Scheduling */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-normal text-white tracking-wide uppercase">Agendamentos & Contato</h4>
            <div className="space-y-2.5 text-xs text-stone-300 font-light">
              <a 
                href={getQuickBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#78A1BB] shrink-0" />
                <span>Segunda a Domingo: 08h às 19h</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <span>Segunda/Terceira Praia & Pousadas</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#78A1BB] hover:underline"
              >
                <span>Acessar perfil no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Highlights */}
          <div className="space-y-3 bg-[#242c2f] p-5 rounded-2xl border border-white/5">
            <h4 className="font-serif text-sm font-normal text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#78A1BB]" />
              Padrão de Higiene & Conforto
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-300 font-light">
              <li>✓ Lençóis descartáveis e toalhas esterilizadas</li>
              <li>✓ Óleos 100% vegetais dermatologicamente seguros</li>
              <li>✓ Atendimento com respeito, ética e acolhimento</li>
              <li>✓ Experiência sensorial com a brisa e som do mar</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-light">
          <p>© {new Date().getFullYear()} Nilson Massoterapia • Morro de São Paulo - Cairu / BA. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> para o bem-estar e relaxamento na Bahia
          </p>
        </div>
      </div>
    </footer>
  );
};

