import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MediaGallery } from './components/MediaGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import { INITIAL_SERVICES, INITIAL_MEDIA, INITIAL_REVIEWS } from './data/initialData';
import { MediaItem, Review, ServiceItem } from './types';

export default function App() {
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  
  // Media state with localStorage persistence and automatic sync of new WebP media
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('massoterapia_media_v2');
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('massoterapia_media');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        const existingIds = new Set(parsed.map((item: MediaItem) => item.id));
        const missingInitial = INITIAL_MEDIA.filter(item => !existingIds.has(item.id));
        return [...missingInitial, ...parsed];
      }
    } catch {
      // ignore
    }
    return INITIAL_MEDIA;
  });

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('massoterapia_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_REVIEWS;
  });

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);

  // Save media on changes
  useEffect(() => {
    try {
      localStorage.setItem('massoterapia_media_v2', JSON.stringify(mediaList));
    } catch {
      // ignore
    }
  }, [mediaList]);

  // Save reviews on changes
  useEffect(() => {
    try {
      localStorage.setItem('massoterapia_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleAddMedia = (newMediaData: Omit<MediaItem, 'id' | 'dateAdded'>) => {
    const newItem: MediaItem = {
      ...newMediaData,
      id: `media-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setMediaList(prev => [newItem, ...prev]);
  };

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Hoje',
      helpfulCount: 1,
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const handleLikeReview = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r))
    );
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedServiceForBooking(services[0] || null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-stone-800 flex flex-col selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Navigation Bar */}
      <Navbar onOpenBooking={handleOpenGeneralBooking} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenGeneralBooking} />

        {/* Services & Massage Techniques */}
        <ServicesSection 
          services={services} 
          onSelectService={handleSelectService} 
        />

        {/* Media Gallery (Photos & Videos) */}
        <MediaGallery 
          mediaList={mediaList} 
          onAddMedia={handleAddMedia}
        />

        {/* Testimonials & Reviews */}
        <TestimonialsSection 
          reviews={reviews} 
          onAddReview={handleAddReview}
          onLikeReview={handleLikeReview}
        />

        {/* Location & Google Maps */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp onOpenBooking={handleOpenGeneralBooking} />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        preSelectedService={selectedServiceForBooking}
      />
    </div>
  );
}
