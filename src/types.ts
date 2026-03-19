export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  heroHeadline: string;
  heroSubtext: string;
  heroCtaText: string;
  heroBadgeText: string;
  heroImageUrl: string;
  heroCard1Text: string;
  heroCard2Text: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  imageUrl: string;
  order: number;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}
