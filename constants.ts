
import { Startup, Event, Announcement, Resource } from './types';

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
    id: '4',
    name: 'AWMA SLU-SC',
    description: 'Academic and student organization focusing on management and accountancy at SLU.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/AWMA.SLUSC',
    category: 'Community',
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
    category: 'Government',
  },
  {
    id: '12',
    name: 'DOST CAR',
    description: 'Department of Science and Technology - Cordillera Administrative Region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/dostcar.gov.ph',
    category: 'Government',
  },
  {
    id: '14',
    name: 'DTI Cordillera',
    description: 'Department of Trade and Industry - Cordillera Administrative Region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/DTI.CordilleraAdministrativeRegion',
    category: 'Government',
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
    category: 'Government',
  },
  {
    id: '20',
    name: 'DICT CAR IIDB',
    description: 'ICT Industry Development Bureau - CAR.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/car.iidb.dict',
    category: 'Government',
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
    category: 'MSME',
  },
  {
    id: '23',
    name: 'CMO Baguio MITD',
    description: 'City Mayor\'s Office - Management Information and Technology Division.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/cmobaguio.mitd',
    category: 'Government',
  },
  {
    id: '24',
    name: 'Parapo',
    description: 'Official Parapo - Innovative solutions for the people.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/officialparapo',
    category: 'Startup',
  },
  // New Entries
  {
    id: '30',
    name: 'Rise Benguet Project',
    description: 'A community initiative dedicated to uplifting the Benguet province.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/risebenguetproject',
    category: 'Community',
  },
  {
    id: '31',
    name: 'SIGLAT',
    description: 'Empowering innovation and startups.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/siglat',
    category: 'Incubator',
  },
  {
    id: '32',
    name: 'Sirib Center',
    description: 'A hub for youth development and creative incubation.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/siribcenter',
    category: 'Incubator',
  },
  {
    id: '33',
    name: 'SRV Pinoy',
    description: 'Innovative solutions for the Filipino community.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/srvpinoy',
    category: 'Startup',
  },
  {
    id: '34',
    name: 'TARAKI CAR',
    description: 'Technology and innovation incubator for the Cordillera region.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/tarakicar',
    category: 'Incubator',
  },
  {
    id: '35',
    name: 'Tamawan Village',
    description: 'A center for arts, culture, and creative startups in Baguio.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/TamawanOfficial',
    category: 'Startup',
  },
  {
    id: '36',
    name: 'Tarana AI',
    description: 'Artificial Intelligence solutions for modern problems.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/TaranaAI',
    category: 'Startup',
  },
  {
    id: '37',
    name: 'Tech4ED DTC CAR',
    description: 'Providing access to technology and digital literacy.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/tech4eddtc.car',
    category: 'Government',
  },
  {
    id: '38',
    name: 'Tingi Station',
    description: 'Sustainable retail solutions for the community.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/tingistation',
    category: 'Startup',
  },
  {
    id: '39',
    name: 'UC InTTO',
    description: 'University of the Cordilleras Innovation and Technology Transfer Office.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/UCInTTO',
    category: 'Incubator',
  },
  {
    id: '40',
    name: 'UP Baguio SILBI TBI',
    description: 'UP Baguio Technology Business Incubator - Fostering innovation.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/upbsilbitbi',
    category: 'Incubator',
  },
  {
    id: '41',
    name: 'Vivistop Baguio',
    description: 'A creative space and community for young makers.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/vivistop.baguio',
    category: 'Community',
  },
  {
    id: '42',
    name: 'Women Techmakers Baguio',
    description: 'Building a world where all women can thrive in tech.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/WTMBaguio',
    category: 'Community',
  },
  {
    id: '43',
    name: 'YES DES CNS BSU',
    description: 'Young Entrepreneurs Society - BSU Chapter.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/yes.des.cns.bsu',
    category: 'Community',
  },
  {
    id: '44',
    name: 'Yuman Kaili',
    description: 'Celebrating local culture through enterprise.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/YumanKaili',
    category: 'Startup',
  },
  {
    id: '45',
    name: 'Zero Waste Baguio',
    description: 'Advocating for a sustainable and zero-waste city.',
    logoUrl: '',
    facebookUrl: 'https://www.facebook.com/zwbaguio',
    category: 'Non-Profit',
  }
];

// Helper to create dates relative to today
const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e2',
    title: 'Cloud and DevOps Basics',
    date: new Date('2025-12-10T13:00:00'),
    endDate: new Date('2025-12-10T17:00:00'),
    description: "This short course provides an introductory overview of cloud computing and DevOps principles. Participants will learn about service models (laaS, PaaS, SaaS), the advantages of cloud adoption, and the collaborative practices that define DevOps. The session supports DICT's Cloud First Policy and aims to build foundational awareness of cloud infrastructure and deployment workflows relevant to government, business, and startups.",
    location: 'Zoom',
    category: 'Workshop',
    imageUrl: 'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/587213315_872894341978383_6161694301616584039_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHxtQjMgZxlEc9du-DDOCu7eDeTBQyd0xJ4N5MFDJ3TEqIrc0d5JZc94yhB-f_FeODohzjSDDuHGJbYf0PUvN5s&_nc_ohc=Yh7OUvhI9SkQ7kNvwEllq0w&_nc_oc=Adm5dsXPof2IcVDImQtCQ-cpEfWYwDsq0vfSoSti4YQOpocyrgcgR1hjMPt_bwrKnKk&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=4RKTUIxbBmiN-jfooC7a5w&oh=00_AfiBPjakYwG62qEhWxMMEJzQgQPvbH6zuTVbCY7tJfU8cg&oe=693395A4',
    registrationLink: 'https://bit.ly/CDOBasics-Register'
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'CAR Ecosystem Mapping Report 2022-2025',
    description: 'A comprehensive mapping of the startup ecosystem in the Cordillera Administrative Region.',
    type: 'Report',
    format: 'WEB',
    size: 'N/A',
    downloadUrl: 'https://heyzine.com/flip-book/7acb10b7ce.html#page/1',
    dateAdded: new Date()
  }
];