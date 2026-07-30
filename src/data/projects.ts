const p = (path: string) => encodeURI(path)

export interface ProjectUnit {
  type: string
  size: string
  price: string
  available: boolean
}

export interface ProjectAmenity {
  label: string
  image: string
}

export interface VrTour {
  category: string
  title: string
  description: string
  url: string
  thumbnail: string
}

export interface ProjectData {
  slug: string
  name: string
  tagline: string
  locationLabel: string
  locationFull: string
  type: string
  blocks?: string
  floors: number
  totalUnits: number
  parking: string
  completion: string
  statusLabel: string
  isLaunchingSoon?: boolean
  specialOffer?: string
  heroImage: string
  exteriorImages: string[]
  descriptionParagraphs: string[]
  availableUnits: ProjectUnit[]
  soldOutUnits: ProjectUnit[]
  amenities: ProjectAmenity[]
  amenityList: string[]
  investmentPoints: string[]
  locationAdvantages: string[]
  mapSrc: string
  brochurePath: string
  vrTours?: VrTour[]
}

export const projects: ProjectData[] = [
  /* ─────────────────────── BLOSSOM IVY ─────────────────────── */
  {
    slug: 'blossom-ivy',
    name: 'Blossom Ivy Residence',
    tagline: "Luxury Living in One of Nairobi's Most Prestigious Addresses",
    locationLabel: 'KILELESHWA, NAIROBI',
    locationFull: 'Gatundu Road, Kileleshwa, Nairobi',
    type: 'Luxury Apartments',
    blocks: '2 Residential Blocks',
    floors: 22,
    totalUnits: 220,
    parking: 'Ground Floor + 4 Basement Levels',
    completion: 'December 2026',
    statusLabel: 'AVAILABLE',
    heroImage: p('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'),
    exteriorImages: [
      p('/Blossoms Ivy Residence Assets/Exterior/Exterior.png'),
      p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg'),
      p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 03.jpg'),
    ],
    descriptionParagraphs: [
      "Blossom Ivy Residence is an exclusive residential development located along Gatundu Road in Kileleshwa — one of Nairobi's most sought-after residential neighbourhoods. Rising 22 floors across two elegant residential blocks, the project combines refined architecture, generous layouts, premium finishes, and world-class amenities.",
      "Designed for discerning homeowners and savvy investors, Blossom Ivy Residence offers the perfect equilibrium between luxury, comfort, and long-term investment value. Every detail — from the heated indoor pool to the smart door lock systems — has been curated to elevate your everyday experience.",
    ],
    availableUnits: [
      { type: '3 Bedroom + Study + DSQ', size: '180 – 236 SQM', price: 'From KES 18,000,000', available: true },
    ],
    soldOutUnits: [
      { type: '1 Bedroom', size: '78 – 90 SQM', price: 'SOLD OUT', available: false },
      { type: '2 Bedroom', size: '96 – 166 SQM', price: 'SOLD OUT', available: false },
      { type: '4 Bedroom + Study + DSQ', size: '251 – 260 SQM', price: 'SOLD OUT', available: false },
    ],
    amenities: [
      { label: 'Heated Indoor Pool', image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/13_KCGV_Blossom Ivy_R1 Pool 2.jpg') },
      { label: 'Fully Equipped Gym', image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Gym 2.jpg') },
      { label: 'Spa & Wellness', image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Spa 1.jpg') },
      { label: 'Grand Lobby', image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 05.jpg') },
      { label: 'Coffee Bar & Restaurant', image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Restaurant 2.png') },
      { label: "Children's Play Area", image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/16_KCGV_Blossom Ivy_Play_Area1.png') },
    ],
    amenityList: [
      'Heated Indoor Swimming Pool', 'Fully Equipped Gym', 'Yoga Studio',
      'Coffee Bar', 'Landscaped Leisure Garden', "Indoor Children's Play Area",
      "Outdoor Children's Play Area", 'Borehole Water Supply', 'Dual Backup Generators',
      'High-Speed Lifts', 'CCTV Surveillance', 'Smart Door Lock Systems',
      '24-Hour Security', 'Modern Fitted Kitchens (Cooker Hood, Burner, Oven & Water Purifier)',
    ],
    investmentPoints: [
      "Prime Kileleshwa address with strong capital appreciation potential",
      "Spacious family-oriented layouts with extra-large balconies",
      "Smart home features and dedicated study rooms",
      "Detached staff quarters (DSQ) included",
      "High rental demand in Nairobi's most prestigious neighbourhood",
      "Developed by a proven developer with a record of on-time delivery",
    ],
    locationAdvantages: [
      '10 Minutes to Westlands', '15 Minutes to Nairobi CBD',
      'Close to leading schools', 'Near major hospitals',
      'Shopping malls & supermarkets nearby', 'Easy access to public transport',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d451.6556133047034!2d36.78503743441678!3d-1.276938025382227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE%2C%20Nairobi!3m2!1d-1.2771432999999999!2d36.785353199999996!5e1!3m2!1sen!2ske!4v1781850935628!5m2!1sen!2ske',
    brochurePath: p('/Blossoms Ivy Residence Assets/BlossomsIvy Brochure.pdf'),
  },

  /* ─────────────────────── LUCKINN IVY ─────────────────────── */
  {
    slug: 'luckinn-ivy',
    name: 'Luckinn Ivy Residence',
    tagline: 'Premium Urban Living in the Heart of Westlands',
    locationLabel: 'WESTLANDS, NAIROBI',
    locationFull: 'Mogotio Road, Westlands, Nairobi',
    type: 'Luxury Apartments',
    blocks: '1 Tower',
    floors: 20,
    totalUnits: 120,
    parking: 'Basement, Ground & First Floor',
    completion: 'December 2026',
    statusLabel: 'LIMITED UNITS',
    heroImage: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'),
    exteriorImages: [
      p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'),
      p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'),
    ],
    descriptionParagraphs: [
      "Luckinn Ivy Residence is a prestigious residential development strategically located along Mogotio Road in the heart of Westlands. Designed for modern professionals, growing families, and discerning investors, the project offers luxurious apartments with premium finishes and exceptional lifestyle amenities.",
      "Westlands is Nairobi's most vibrant commercial and residential district, placing Luckinn Ivy residents at the centre of everything — world-class shopping, top international schools, gourmet dining, and dynamic business hubs all within minutes of your door.",
    ],
    availableUnits: [
      { type: '2 Bedroom + DSQ', size: '126 – 140 SQM', price: 'Limited Units — Enquire', available: true },
      { type: '3 Bedroom + DSQ', size: '170 – 172 SQM', price: 'Limited Units — Enquire', available: true },
    ],
    soldOutUnits: [
      { type: '1 Bedroom', size: '78 SQM', price: 'SOLD OUT', available: false },
    ],
    amenities: [
      { label: 'Heated Indoor Pool', image: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png') },
      { label: 'Fully Equipped Gym', image: p('/Luckinn Ivy Assets/Amenities/Gym.jpeg') },
      { label: 'Yoga Studio', image: p('/Luckinn Ivy Assets/Amenities/Yoga Area.jpeg') },
      { label: 'Lounge & Co-working', image: p('/Luckinn Ivy Assets/Amenities/Lounge Area.jpeg') },
      { label: 'Business Lounge', image: p('/Luckinn Ivy Assets/Amenities/Lounge Area close up.jpeg') },
      { label: "Children's Play Area", image: p('/Luckinn Ivy Assets/Amenities/Kids Play Area.jpeg') },
    ],
    amenityList: [
      'Heated Indoor Swimming Pool', 'Fully Equipped Gym', 'Yoga Room',
      'Coffee Bar', "Children's Indoor Play Area", "Children's Outdoor Play Area",
      'Co-working Spaces', 'Business Lounge', 'Borehole Water Supply',
      'Backup Generator', 'Smart Door Locks', 'High-Speed Elevators',
      'CCTV Monitoring', 'Access Control Systems', '24-Hour Security',
    ],
    investmentPoints: [
      "Prime Westlands address with unmatched urban convenience",
      "High rental yield potential in Nairobi's top business district",
      "Premium lifestyle amenities including co-working spaces & business lounge",
      "Limited number of units — exclusivity guaranteed",
      "Modern architectural design with strong capital growth prospects",
      "Ideal for both homeowners and buy-to-let investors",
    ],
    locationAdvantages: [
      'Located in Westlands Business District',
      'Minutes from Sarit Centre & Westgate Mall',
      'Close to GTC Nairobi & international schools',
      'Easy access to major roads & expressway',
      'High rental demand area', 'Near top restaurants, hotels & entertainment',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d2148.455932025552!2d36.810185702436065!3d-1.2677446121873845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d-1.2877824!2d36.7886336!4m5!1s0x182f17cc6e858b33%3A0x778089c06435dda9!2sLUCKINN%20IVY%20RESIDENCE%20Nairobi%2C%20Mogotio%20Rd%2C%20KE!3m2!1d-1.2670761!2d36.8102079!5e1!3m2!1sen!2ske!4v1781851024052!5m2!1sen!2ske',
    brochurePath: p('/Luckinn Ivy Assets/Luckinn Brochure.pdf'),
    vrTours: [
      {
        category: 'Common Areas',
        title: 'Amenities Floor',
        description: 'Explore the gym, heated swimming pool, and luxury lounge on the 2nd floor.',
        url: 'https://vr.justeasy.cn/view/lg5174d6h0036a26-1746078378.html',
        thumbnail: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'),
      },
      {
        category: 'Common Areas',
        title: 'Co-working & Meeting Rooms',
        description: 'Shared office spaces and meeting rooms surrounded by lush greenery.',
        url: 'https://vr.justeasy.cn/view/1w746q0pl0l37741-1746078298.html',
        thumbnail: p('/Luckinn Ivy Assets/Amenities/Lounge Area.jpeg'),
      },
      {
        category: 'Unit Types',
        title: '1 Bedroom Residence',
        description: 'Walk through a fully furnished 1 bedroom apartment — 78 SQM.',
        url: 'https://vr.justeasy.cn/view/1746fqe00v3o32x3-1746003487.html',
        thumbnail: p('/Luckinn Ivy Assets/Amenities/Lounge Area close up.jpeg'),
      },
      {
        category: 'Unit Types',
        title: '2 Bedroom Residence',
        description: 'Tour a spacious 2 bedroom apartment with premium finishes — 126–140 SQM.',
        url: 'https://vr.justeasy.cn/view/5g1n8746l003j824-1746070867.html',
        thumbnail: p('/Luckinn Ivy Assets/Amenities/Gym.jpeg'),
      },
      {
        category: 'Unit Types',
        title: '3 Bedroom Residence',
        description: 'Experience the full 3 bedroom layout with DSQ — 170–172 SQM.',
        url: 'https://vr.justeasy.cn/view/l174xmx6900392o9-1746074641.html',
        thumbnail: p('/Luckinn Ivy Assets/Amenities/Yoga Area.jpeg'),
      },
    ],
  },

  /* ─────────────────────── IVY PARK ─────────────────────── */
  {
    slug: 'ivy-park',
    name: 'Ivy Park Residence',
    tagline: 'The Future of Modern Living and Investment in Kilimani',
    locationLabel: 'KILIMANI, NAIROBI',
    locationFull: 'Kirichwa Road, Kilimani (Near Yaya Centre), Nairobi',
    type: 'Modern Residential Apartments',
    blocks: '3 Residential Blocks on 1.06 Acres',
    floors: 22,
    totalUnits: 660,
    parking: 'Ground Floor + 2 Basement Levels',
    completion: 'December 2028',
    statusLabel: 'EARLY BIRD',
    heroImage: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'),
    exteriorImages: [
      p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 1_IVY PARK.jpg'),
      p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 2_IVY PARK.jpg'),
      p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Drone 1_IVY PARK.jpg'),
    ],
    descriptionParagraphs: [
      "Ivy Park Residence is a landmark mixed-use residential development positioned near Yaya Centre along Kirichwa Road, Kilimani. With 660 apartments across three residential blocks on 1.06 acres, the project presents an exceptional opportunity for homeowners and investors seeking premium living in one of Nairobi's most desirable neighbourhoods.",
      "Currently under construction with foundation and structural works progressing on schedule, Ivy Park Residence is offering early-bird pricing to investors who act now. Pre-construction pricing, flexible payment plans, and a wider selection of unit options make this an unmissable opportunity.",
    ],
    availableUnits: [
      { type: '1 Bedroom', size: '62 – 69 SQM', price: 'From KES 6,820,000', available: true },
      { type: '2 Bedroom', size: '73 – 128 SQM', price: 'From KES 10,780,000', available: true },
      { type: '3 Bedroom + DSQ', size: '142 SQM', price: 'From KES 15,620,000', available: true },
    ],
    soldOutUnits: [],
    amenities: [
      { label: 'Heated Swimming Pool', image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png') },
      { label: 'Bar & Lounge', image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Bar_001.png') },
      { label: 'Spa & Wellness', image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Spa_001 Night.png') },
      { label: 'Fully Equipped Gym', image: p('/IVY PARK RESIDENCE Assests/AMENITIES/GYM/GYM_V1_B.png') },
      { label: 'Rooftop Garden', image: p('/IVY PARK RESIDENCE Assests/AMENITIES/ROOFTOP/251027_FINAL_Creative(18).jpg') },
      { label: "Children's Play Area", image: p('/IVY PARK RESIDENCE Assests/AMENITIES/CHILDREN_S AREA/enhanced_Cam_Kids_001.png') },
    ],
    amenityList: [
      'Heated Swimming Pool', 'Rooftop Garden & Lounge', 'Fully Equipped Gym',
      'Yoga Studio', 'Landscaped Courtyard Gardens', 'Co-working Spaces',
      'Coffee Bar', "Indoor Children's Play Area", 'Borehole Water Supply',
      'Backup Generators', 'CCTV Surveillance', 'Smart Door Locks', '24-Hour Security',
    ],
    investmentPoints: [
      'Early-bird pricing — maximum capital growth potential',
      'Prime Kilimani address near Yaya Centre',
      'Excellent rental demand and strong occupancy rates',
      'Flexible payment plans spread throughout construction period',
      'Rooftop garden, lounge and world-class lifestyle amenities',
      'Ideal for first-time investors and long-term wealth creation',
    ],
    locationAdvantages: [
      'Walking distance to Yaya Centre', 'Easy access to Nairobi CBD',
      'Close to major hospitals', 'Near leading schools',
      'Shopping malls & supermarkets nearby', 'Strong road infrastructure network',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3038.3471868036504!2d36.780312317928214!3d-1.2916600198019121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d-1.2877824!2d36.7886336!4m5!1s0x182f1b000d6f3f39%3A0x854c68bdc588cef5!2sIVY%20PARK%20RESIDENCE%20Nairobi%2C%20Kirichwa%20Rd!3m2!1d-1.2914455!2d36.781751!5e1!3m2!1sen!2ske!4v1781850798389!5m2!1sen!2ske',
    brochurePath: p('/IVY PARK RESIDENCE Assests/IvyPark BROCHURE.pdf'),
  },

  /* ─────────────────────── IVY MYST ─────────────────────── */
  {
    slug: 'ivy-myst',
    name: 'Ivy Myst',
    tagline: '1, 2 & 3 Bedroom Luxury Residences with Garden Terraces — Now Selling',
    locationLabel: 'KILELESHWA, NAIROBI',
    locationFull: 'Kileleshwa, Nairobi',
    type: 'Luxury Residences',
    floors: 25,
    totalUnits: 0,
    parking: 'Basement Parking',
    completion: 'To be announced',
    statusLabel: 'NOW SELLING',
    isLaunchingSoon: false,
    heroImage: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
    exteriorImages: [
      p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior day view.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior night view.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'),
    ],
    descriptionParagraphs: [
      "Ivy Myst is a landmark luxury residential development in the heart of Kileleshwa. Following a celebrated groundbreaking ceremony, sales are now officially open — offering buyers the opportunity to secure one of Nairobi's most architecturally distinctive addresses.",
      "Comprising two wings of generously proportioned 1, 2 and 3 bedroom residences — many with private garden terraces — Ivy Myst raises the benchmark for luxury living in Nairobi. The development is defined by its sweeping curved architecture, lush green balconies, and a suite of world-class rooftop amenities including the signature Celestial Pool.",
      "Every detail has been considered — from the sculptural reception lobby to the rooftop restaurant and bar overlooking the Nairobi skyline. This is not merely a residence; it is an experience.",
    ],
    availableUnits: [
      { type: '1 Bedroom', size: '79 – 84 SQM', price: 'From KES 8,800,000', available: true },
      { type: '2 Bedroom', size: '121 – 159 SQM', price: 'From KES 14,200,000', available: true },
      { type: '3 Bedroom + DSQ', size: '169 – 231 SQM', price: 'From KES 19,800,000', available: true },
    ],
    soldOutUnits: [],
    amenities: [
      { label: 'Celestial Rooftop Pool', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png') },
      { label: 'Rooftop Restaurant', image: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png') },
      { label: 'Rooftop Bar & Lounge', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop bar area.png') },
      { label: 'Rooftop Lounge', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop lounge area night view.png') },
      { label: 'Gym & Yoga Studio', image: p('/Ivy Myst Assets/New Renders/Myst amenities/gym and yoga space.jpg') },
      { label: 'Garden Stream', image: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png') },
      { label: 'Indoor Restaurant', image: p('/Ivy Myst Assets/New Renders/Myst amenities/indoor restaurant.png') },
      { label: 'Grand Reception', image: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png') },
    ],
    amenityList: [
      'Celestial Rooftop Pool with Waterfall Feature',
      'Rooftop Bar & Lounge',
      'Rooftop & Indoor Restaurant',
      'Gymnasium & Yoga Studio',
      'Sculptural Garden Stream',
      'Grand Lobby Reception',
      'Private Garden Terraces (select units)',
      'Smart Home Features',
      'High-Speed Elevators',
      '24-Hour Security & CCTV',
      'Borehole Water Supply',
      'Backup Generator',
    ],
    investmentPoints: [
      'Groundbreaking completed — construction actively underway',
      'Early-stage pricing for maximum capital appreciation',
      'Prime Kileleshwa address with proven strong rental demand',
      'Architecturally distinctive — a landmark on the Nairobi skyline',
      'Garden terrace units available — a rare offering in Nairobi',
      'Flexible payment plans: 20% deposit, balance through construction',
      "Developed by The Ivy Group — 10+ years of on-time delivery",
    ],
    locationAdvantages: [
      'Prestigious Kileleshwa address',
      'Minutes from Westlands and Nairobi CBD',
      'Close to top international schools',
      'Near major hospitals and health facilities',
      'Shopping malls & supermarkets nearby',
      'Easy highway and expressway access',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d451.6556133047034!2d36.78503743441678!3d-1.276938025382227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f170056423b43%3A0xac4d412392285ae0!2sBLOSSOMS%20IVY%20RESIDENCE%2C%20Nairobi!3m2!1d-1.2771432999999999!2d36.785353199999996!5e1!3m2!1sen!2ske!4v1781850935628!5m2!1sen!2ske',
    brochurePath: p('/Ivy Myst Assets/IvyMystBrochure.pdf'),
  },
]

export function getProject(slug: string): ProjectData | undefined {
  return projects.find((proj) => proj.slug === slug)
}

export function getOtherProjects(slug: string): ProjectData[] {
  return projects.filter((proj) => proj.slug !== slug).slice(0, 3)
}
