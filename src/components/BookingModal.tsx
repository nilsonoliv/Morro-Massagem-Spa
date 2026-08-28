import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Check, 
  Palmtree, 
  Home
} from 'lucide-react';
import { BookingFormData, ServiceItem } from '../types';
import { getCustomBookingUrl } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preSelectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedService,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    serviceId: services[0]?.id || '',
    locationType: 'praia',
    pousadaName: '',
    preferredDate: '',
    preferredTime: '',
    numberOfPersons: 1,
    notes: '',
  });

  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, serviceId: preSelectedService.id }));
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomBookingUrl(formData, services, language);
    window.open(url, '_blank');
    onClose();
  };

  const selectedService = services.find(s => s.id === formData.serviceId) || services[0];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#F5F2ED] rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/10 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4A5D4E]/10 flex items-center justify-center text-[#4A5D4E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-normal text-xl text-[#2C3639]">{t.bookingModal.title}</h3>
              <p className="text-[11px] text-stone-500 font-light">{t.bookingModal.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
          
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelName} *</label>
            <input
              type="text"
              required
              placeholder={t.bookingModal.placeholderName}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
            />
          </div>

          {/* Service Selection */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelService} *</label>
            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white font-medium text-stone-800"
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.durationMin} min) {s.priceEstimate ? `- ${s.priceEstimate}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Location Type */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">{t.bookingModal.labelLocation}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, locationType: 'praia' })}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  formData.locationType === 'praia'
                    ? 'bg-white border-[#4A5D4E] text-[#2C3639] ring-1 ring-[#4A5D4E]'
                    : 'bg-white/60 border-stone-200 text-stone-600'
                }`}
              >
                <Palmtree className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs">{t.bookingModal.locBeach}</p>
                  <p className="text-[11px] text-stone-500 font-light">{t.bookingModal.locBeachSub}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, locationType: 'pousada' })}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  formData.locationType === 'pousada'
                    ? 'bg-white border-[#4A5D4E] text-[#2C3639] ring-1 ring-[#4A5D4E]'
                    : 'bg-white/60 border-stone-200 text-stone-600'
                }`}
              >
                <Home className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs">{t.bookingModal.locPousada}</p>
                  <p className="text-[11px] text-stone-500 font-light">{t.bookingModal.locPousadaSub}</p>
                </div>
              </button>
            </div>
          </div>

          {/* If pousada selected */}
          {formData.locationType === 'pousada' && (
            <div className="animate-in fade-in duration-200">
              <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelPousadaName}</label>
              <input
                type="text"
                placeholder={t.bookingModal.placeholderPousada}
                value={formData.pousadaName}
                onChange={(e) => setFormData({ ...formData, pousadaName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
              />
            </div>
          )}

          {/* Date, Time & Number of persons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelDate}</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelTime}</label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelPersons}</label>
              <select
                value={formData.numberOfPersons}
                onChange={(e) => setFormData({ ...formData, numberOfPersons: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
              >
                <option value={1}>{t.bookingModal.person1}</option>
                <option value={2}>{t.bookingModal.person2}</option>
                <option value={3}>{t.bookingModal.person3Plus}</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">{t.bookingModal.labelNotes}</label>
            <input
              type="text"
              placeholder={t.bookingModal.placeholderNotes}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] bg-white"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-stone-500 text-center sm:text-left font-light">
              {t.bookingModal.whatsappHint}
            </p>
            <button
              id="btn-submit-booking-whatsapp"
              type="submit"
              disabled={!formData.fullName}
              className="w-full sm:w-auto bg-[#4A5D4E] hover:bg-[#2C3639] disabled:opacity-50 text-white font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.bookingModal.btnSendWhatsapp}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

