import { BookingFormData, ServiceItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

export const WHATSAPP_NUMBER = '5571999545032';
export const DISPLAY_PHONE = '+55 71 99954-5032';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/5gj4D6ytApPfgW8G8';
export const THERAPIST_NAME = 'Nilson Massoterapia Morro de São Paulo';

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getQuickBookingUrl(preset?: string, lang: Language = 'pt'): string {
  if (preset) {
    return createWhatsAppLink(preset);
  }
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  return createWhatsAppLink(t.whatsapp.greeting);
}

export function getServiceBookingUrl(service: ServiceItem, lang: Language = 'pt', date?: string, time?: string): string {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const translatedService = t.services.items.find(s => s.id === service.id);
  const sName = translatedService ? translatedService.name : service.name;

  let msg = `🌿 *${t.hero.therapistTitle} - Morro de São Paulo*\n`;
  msg += `💆 *${t.whatsapp.serviceRequest}:* ${sName} (${service.durationMin} min)\n`;
  if (date || time) {
    msg += `📅 *${t.whatsapp.datePref}:* ${date || 'OK'} ${time ? `⏰ ${time}` : ''}\n`;
  }
  msg += `\n${t.whatsapp.greeting}`;
  return createWhatsAppLink(msg);
}

export function getCustomBookingUrl(data: BookingFormData, services: ServiceItem[], lang: Language = 'pt'): string {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const selectedService = services.find(s => s.id === data.serviceId);
  const translatedService = t.services.items.find(s => s.id === data.serviceId);
  const serviceName = translatedService ? translatedService.name : (selectedService ? selectedService.name : 'Massagem');
  
  const locationText = data.locationType === 'praia' 
    ? t.bookingModal.locBeach
    : data.locationType === 'pousada'
    ? `${t.bookingModal.locPousada}: ${data.pousadaName || ''}`
    : 'Espaço';

  let msg = `🌿 *${t.hero.therapistTitle} - Agendamento / Booking*\n\n`;
  msg += `👤 *Nome / Name:* ${data.fullName}\n`;
  msg += `💆 *${t.whatsapp.serviceRequest}:* ${serviceName}\n`;
  msg += `👥 *${t.whatsapp.personsCount}:* ${data.numberOfPersons}\n`;
  msg += `📍 *${t.whatsapp.placePref}:* ${locationText}\n`;
  if (data.preferredDate) {
    msg += `📅 *${t.whatsapp.datePref}:* ${data.preferredDate}\n`;
  }
  if (data.preferredTime) {
    msg += `⏰ *${t.whatsapp.timePref}:* ${data.preferredTime}\n`;
  }
  if (data.notes) {
    msg += `📝 *${t.whatsapp.notesText}:* ${data.notes}\n`;
  }
  msg += `\n${t.whatsapp.greeting}`;

  return createWhatsAppLink(msg);
}

