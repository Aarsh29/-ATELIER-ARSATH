export interface CollectionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'bridal' | 'blouses' | 'sarees' | 'reception' | 'festive' | 'kids' | 'aari';
  description: string;
  details: string[];
  silhouette: string;
  craft: string;
  leadTime: string;
  heroImage: string;
  detailImages: string[];
  accentColor?: string;
  quote?: string;
}

export interface FabricItem {
  id: string;
  name: string;
  tamilName?: string;
  origin: string;
  description: string;
  tactileFeel: string;
  composition: string;
  recommendedFor: string[];
  textureImage: string;
  drapeWeight: 'Whisper-light' | 'Medium Lustrous' | 'Sculptural Heavy';
}

export interface CraftStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  timeframe: string;
  artisanQuote: string;
}

export interface ClientStory {
  id: string;
  brideName: string;
  occasion: string;
  date: string;
  city: string;
  quote: string;
  portrait: string;
  outfitDetails: string;
  videoDuration?: string;
}

export interface JournalArticle {
  slug: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: string;
  image: string;
}
