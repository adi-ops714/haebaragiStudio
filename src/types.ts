export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  gradient: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  location: string;
  image: string;
  aspect: 'portrait' | 'square' | 'landscape';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  highlight?: string;
}
