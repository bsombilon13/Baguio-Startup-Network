
export interface Startup {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  facebookUrl?: string;
  websiteUrl?: string;
  category: 'Community' | 'Startup' | 'Accelerator' | 'Non-Profit' | 'Government' | 'Incubator';
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description: string;
  location: string;
  category: 'Meetup' | 'Workshop' | 'Pitch' | 'Social';
  imageUrl?: string;
  registrationLink?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'Funding' | 'News' | 'Opportunity';
  datePosted: Date;
  deadline?: Date;
  ctaLink?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Report' | 'Template' | 'Guide' | 'Presentation';
  format: 'PDF' | 'DOCX' | 'PPTX' | 'XLSX' | 'WEB';
  size: string;
  downloadUrl: string;
  dateAdded: Date;
}
