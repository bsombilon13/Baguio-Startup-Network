
import { Startup, Event, Announcement } from './types';

export const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'Baguio Startup Network',
    description: 'Baguio Startup Network is a vibrant community that unites entrepreneurs, innovators, and creatives in the City of Pines. Our mission is to cultivate a collaborative environment where ideas can flourish, and businesses can thrive.',
    logoUrl: '', // Will be fetched from FB
    facebookUrl: 'https://www.facebook.com/baguiostartup/',
    category: 'Community',
  },
  {
    id: '2',
    name: 'ADSG Baguio',
    description: 'A dedicated group fostering growth and design in the Baguio region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/adsgbaguio',
    category: 'Community',
  },
  {
    id: '3',
    name: 'Community Member (6157)',
    description: 'An emerging player in the local ecosystem.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61578216141652',
    category: 'Startup',
  },
  {
    id: '4',
    name: 'AWMA SLU-SC',
    description: 'Academic and student organization focusing on management and accountancy at SLU.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/AWMA.SLUSC',
    category: 'Community',
  },
  {
    id: '5',
    name: 'Startup Profile (6157)',
    description: 'Innovating locally in the Cordilleras.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61572716963985',
    category: 'Startup',
  },
  {
    id: '6',
    name: 'Boslay Arts & Crafts',
    description: 'Showcasing local artistry and traditional crafts from the mountains.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/boslayartsandcrafts',
    category: 'Startup',
  },
  {
    id: '7',
    name: 'CEGP Cordillera',
    description: 'College Editors Guild of the Philippines - Cordillera Chapter.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/cegpcordi',
    category: 'Non-Profit',
  },
  {
    id: '8',
    name: 'Organization (6156)',
    description: 'Contributing to the vibrant tapestry of the Baguio community.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61567306167712',
    category: 'Community',
  },
  {
    id: '9',
    name: 'Cordillera Studies Center',
    description: 'Research center dedicated to the preservation and study of Cordilleran culture and history.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/cordistudiescenter',
    category: 'Community',
  },
  {
    id: '10',
    name: 'Cordilleran Youth Center',
    description: 'Empowering the youth of the Cordilleras through advocacy and education.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/cordilleranyouthcenter',
    category: 'Non-Profit',
  },
  {
    id: '11',
    name: 'DICT Cordillera',
    description: 'Department of Information and Communications Technology - CAR Field Office.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/dict.car',
    category: 'Accelerator',
  },
  {
    id: '12',
    name: 'DOST CAR',
    description: 'Department of Science and Technology - Cordillera Administrative Region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/dostcar.gov.ph',
    category: 'Accelerator',
  },
  {
    id: '13',
    name: 'Ecosystem Member (6157)',
    description: 'Joining forces to build a stronger startup network.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61576826433382',
    category: 'Startup',
  },
  {
    id: '14',
    name: 'DTI Cordillera',
    description: 'Department of Trade and Industry - Cordillera Administrative Region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/DTI.CordilleraAdministrativeRegion',
    category: 'Accelerator',
  },
  {
    id: '15',
    name: 'GDG Baguio',
    description: 'Google Developer Group Baguio - A community of developers and tech enthusiasts.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/gdgbaguio',
    category: 'Community',
  },
  {
    id: '16',
    name: 'Hey Success PH',
    description: 'Empowering students and young professionals to achieve success.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/heysuccessph',
    category: 'Startup',
  },
  {
    id: '17',
    name: 'Kasiyana Tulong Kabataan',
    description: 'Youth-led organization dedicated to helping the community.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/KasiyanaTulongKabataan',
    category: 'Non-Profit',
  },
  {
    id: '18',
    name: 'JBECP UP Baguio',
    description: 'Junior Business Economics Club of the Philippines - UP Baguio Chapter.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/jbecp.upb',
    category: 'Community',
  },
  {
    id: '19',
    name: 'DICT Cordillera ILCDB',
    description: 'ICT Literacy and Competency Development Bureau - Cordillera.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/dict.cordillera.ilcdb',
    category: 'Accelerator',
  },
  {
    id: '20',
    name: 'DICT CAR IIDB',
    description: 'ICT Industry Development Bureau - CAR.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/car.iidb.dict',
    category: 'Accelerator',
  },
  {
    id: '21',
    name: 'Kitkituy Handicrafts',
    description: 'Handwoven products and local handicrafts.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/kitkituyhandicrafts',
    category: 'Startup',
  },
  {
    id: '22',
    name: 'Layad Di Kordilyera',
    description: 'Promoting the love for Cordilleran culture and arts.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/layaddikordilyera',
    category: 'Startup',
  },
  {
    id: '23',
    name: 'CMO Baguio MITD',
    description: 'City Mayor\'s Office - Management Information and Technology Division.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/cmobaguio.mitd',
    category: 'Accelerator',
  },
  {
    id: '24',
    name: 'Parapo',
    description: 'Official Parapo - Innovative solutions for the people.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/officialparapo',
    category: 'Startup',
  }
];

// Helper to create dates relative to today
const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const MOCK_EVENTS: Event[] = [];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Seed Fund Batch 5 Open',
    content: 'We are accepting applications for our Q3 Seed Fund cohort. Up to $50k in equity-free funding for qualified startups in the region.',
    type: 'Funding',
    datePosted: new Date(),
    deadline: addDays(today, 30),
    ctaLink: '#'
  },
  {
    id: 'a2',
    title: 'Call for Mentors',
    content: 'Experienced founders wanted to mentor our upcoming accelerator batch. Give back to the community!',
    type: 'Opportunity',
    datePosted: addDays(today, -2),
    ctaLink: '#'
  },
  {
    id: 'a3',
    title: 'Partnership with Cloud Giant',
    content: 'All community members now get $1000 in cloud credits. Claim yours today via the member portal.',
    type: 'News',
    datePosted: addDays(today, -5),
  }
];
