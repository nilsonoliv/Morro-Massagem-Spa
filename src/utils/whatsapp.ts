import { BookingFormData, ServiceItem } from '../types';

export const WHATSAPP_NUMBER = '5571999545032';
export const DISPLAY_PHONE = '(71) 99954-5032';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/5gj4D6ytApPfgW8G8';
export const THERAPIST_NAME = 'Massoterapia Morro de São Paulo';

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getQuickBookingUrl(preset?: string): string {
  if (preset) {
    return createWhatsAppLink(preset);
  }
  const defaultMsg = `Olá! Estou em Morro de São Paulo e gostaria de informações para agendar uma massagem.`;
  return createWhatsAppLink(defaultMsg);
}

export function getServiceBookingUrl(service: ServiceItem, date?: string, time?: string): string {
  let msg = `Olá! Gostaria de agendar a *${service.name}* (${service.durationMin} min) em Morro de São Paulo.`;
  if (date || time) {
    msg += `\n📅 Preferência: ${date ? date : 'a combinar'}${time ? ` às ${time}` : ''}`;
  }
  msg += `\nQual é a disponibilidade de horário?`;
  return createWhatsAppLink(msg);
}

export function getCustomBookingUrl(data: BookingFormData, services: ServiceItem[]): string {
  const selectedService = services.find(s => s.id === data.serviceId);
  const serviceName = selectedService ? selectedService.name : 'Massagem';
  
  const locationText = data.locationType === 'praia' 
    ? 'Na Beira da Praia (com brisa e som do mar)'
    : data.locationType === 'pousada'
    ? `Na Pousada/Hotel: ${data.pousadaName || 'A combinar'}`
    : 'No Espaço de Atendimento';

  let msg = `🌿 *Novo Agendamento - Massoterapia Morro de SP*\n\n`;
  msg += `👤 *Nome:* ${data.fullName}\n`;
  msg += `💆‍♂️ *Serviço:* ${serviceName}\n`;
  msg += `👥 *Pessoas:* ${data.numberOfPersons}\n`;
  msg += `📍 *Local:* ${locationText}\n`;
  if (data.preferredDate) {
    msg += `📅 *Data:* ${data.preferredDate}\n`;
  }
  if (data.preferredTime) {
    msg += `⏰ *Horário:* ${data.preferredTime}\n`;
  }
  if (data.notes) {
    msg += `📝 *Observação / Foco:* ${data.notes}\n`;
  }
  msg += `\nOlá! Poderia confirmar a disponibilidade para esse horário?`;

  return createWhatsAppLink(msg);
}
