export type MediaType = 'photo' | 'video';

export type MediaCategory = 'all' | 'beira_mar' | 'terapeutica' | 'relaxante' | 'ambiente' | 'drenagem';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  url: string; // image or video URL (supports direct images/video or embedded previews)
  thumbnailUrl?: string;
  videoDuration?: string;
  category: MediaCategory;
  description: string;
  location: string;
  isFeatured?: boolean;
  dateAdded: string;
}

export interface Review {
  id: string;
  authorName: string;
  city: string; // e.g. "São Paulo - SP", "Buenos Aires", "Salvador - BA"
  rating: number; // 1 to 5
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
  photos?: string[];
  helpfulCount: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  durationMin: number | string;
  priceEstimate?: string;
  benefits: string[];
  recommendedFor: string;
  category: 'relaxante' | 'terapeutica' | 'estetica' | 'especial';
  badge?: string;
  iconName: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface BookingFormData {
  fullName: string;
  serviceId: string;
  locationType: 'praia' | 'pousada' | 'espaco';
  pousadaName?: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPersons: number;
  notes?: string;
}
