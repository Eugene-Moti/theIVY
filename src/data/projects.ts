const p = (path: string) => encodeURI(path)

export interface GallerySlide {
  src: string
  label: string
  category: string
  description: string
}

export interface DescriptionBlock {
  type: 'text' | 'image' | 'image-pair'
  content?: string
  src?: string
  caption?: string
  images?: Array<{ src: string; caption?: string }>
}

export interface ProjectUnit {
  type: string
  size: string
  price: string
  available: boolean
  note?: string
  priceRange?: string
  roi?: { furnished: string; unfurnished: string }
}

export interface FloorPlan {
  src: string
  label: string
}

export interface FloorPlanGroup {
  label: string
  plans: FloorPlan[]
}

export interface ProjectAmenity {
  label: string
  image: string
  description: string
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
  /** Optional portrait / square crop used for the hero on small screens.
   *  Falls back to heroImage when not supplied. */
  heroImageMobile?: string
  exteriorImages: string[]
  interiorImages?: string[]
  descriptionParagraphs: string[]
  descriptionBlocks?: DescriptionBlock[]
  availableUnits: ProjectUnit[]
  soldOutUnits: ProjectUnit[]
  amenities: ProjectAmenity[]
  amenityList: string[]
  investmentPoints: string[]
  locationAdvantages: string[]
  mapSrc: string
  brochurePath: string
  vrTours?: VrTour[]
  gallerySlides?: GallerySlide[]
  floorPlanOverview?: FloorPlan
  floorPlanGroups?: FloorPlanGroup[]
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
    heroImage: p('/Blossoms Ivy Residence Assets/Blossoms Ivy Gate.jpg'),
    exteriorImages: [
      p('/Blossoms Ivy Residence Assets/Exterior/Exterior.png'),
      p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg'),
      p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 03.jpg'),
    ],
    descriptionParagraphs: [
      "Blossom Ivy Residence is an exclusive residential development located along Gatundu Road in Kileleshwa — one of Nairobi's most sought-after residential neighbourhoods. Rising 22 floors across two elegant residential blocks, the project combines refined architecture, generous layouts, premium finishes, and world-class amenities.",
      "Designed for discerning homeowners and savvy investors, Blossom Ivy Residence offers the perfect equilibrium between luxury, comfort, and long-term investment value. Every detail — from the heated indoor pool to the smart door lock systems — has been curated to elevate your everyday experience.",
    ],
    descriptionBlocks: [
      { type: 'text', content: "Blossom Ivy Residence stands on Gatundu Road in Kileleshwa — one of Nairobi's most coveted residential addresses, known for its tree-lined streets, proximity to the CBD, and the calibre of residents it attracts. Rising 22 floors across two elegant residential blocks, the development was designed to deliver a standard of living that Nairobi's most discerning buyers have long sought in a locally built development." },
      { type: 'image', src: p('/Blossoms Ivy Residence Assets/Exterior/Exterior.png'), caption: 'Blossom Ivy Residence — Gatundu Road, Kileleshwa' },
      { type: 'text', content: "The architecture is at once refined and welcoming. The façade's considered proportions and rich material palette set Blossom Ivy apart on the Kileleshwa skyline — a building that reads as significant from the street and reveals its finer details to those who live within. Every unit benefits from generous proportions, with ceiling heights and window ratios calibrated to maximise natural light throughout the day." },
      { type: 'image-pair', images: [
        { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg'), caption: 'Grand Lobby Arrival' },
        { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 03.jpg'), caption: 'Lobby Detail' },
      ]},
      { type: 'text', content: "Inside, the common areas have been designed to hotel-residences standards. The grand lobby is conceived as an arrival experience — not merely a corridor. Above, the heated indoor pool, fully equipped gym, yoga studio, coffee bar, and landscaped leisure garden are available exclusively to residents, ensuring the privacy and consistency of service that would be impossible in a conventional apartment block." },
      { type: 'image', src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 05.jpg'), caption: 'The Lobby Reception — designed for arrival' },
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
      {
        label: 'Heated Indoor Pool',
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/13_KCGV_Blossom Ivy_R1 Pool 2.jpg'),
        description: 'A temperature-controlled indoor swimming pool offering a resort-like experience year-round. Designed for both meditative lap swimming and leisurely relaxation, the pool deck creates a private sanctuary within the building — available exclusively to residents and their guests.',
      },
      {
        label: 'Fully Equipped Gym',
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Gym 2.jpg'),
        description: 'A state-of-the-art fitness centre equipped with premium cardio, strength, and functional training machinery. Whether you are training for performance or maintaining a daily wellness routine, the gym delivers the tools and space of a boutique fitness club — steps from your front door.',
      },
      {
        label: 'Spa & Wellness',
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Spa 1.jpg'),
        description: 'A tranquil spa retreat conceived as a personal sanctuary. Therapeutic treatments, steam rooms, and dedicated relaxation areas combine to offer a truly restorative experience — the kind typically reserved for five-star hotels, now a permanent feature of your home.',
      },
      {
        label: 'Grand Lobby',
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 05.jpg'),
        description: 'A hotel-grade arrival experience designed to signal that you have arrived somewhere truly significant. Soaring ceilings, premium stone finishes, bespoke lighting, and 24-hour concierge service ensure that every return home feels intentional — a deliberate transition from the city into your private world.',
      },
      {
        label: 'Coffee Bar & Restaurant',
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Restaurant 2.png'),
        description: 'An in-house café and dining destination serving artisanal coffee, fresh pastries, and curated gourmet cuisine. Whether you are beginning your morning or closing out a long day, the restaurant offers the convenience of a world-class dining experience without leaving the building.',
      },
      {
        label: "Children's Play Area",
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/16_KCGV_Blossom Ivy_Play_Area1.png'),
        description: 'A fully dedicated indoor children\'s play zone engineered for creativity, active play, and social development in a safe, supervised environment. Thoughtfully designed with age-appropriate equipment, it gives young residents a vibrant space of their own within the building community.',
      },
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
    gallerySlides: [
      { src: p('/Blossoms Ivy Residence Assets/Exterior/Exterior.png'), label: 'Blossom Ivy Residence', category: 'Architecture', description: 'Rising 22 floors across two elegant residential blocks on Gatundu Road — a landmark on the Kileleshwa skyline.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 05.jpg'), label: 'Grand Lobby', category: 'Arrival Experience', description: 'Soaring ceilings, premium stone finishes, bespoke lighting, and 24-hour concierge — a transition from city to sanctuary.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg'), label: 'Lobby Reception', category: 'Architecture', description: 'Every return home is an intentional arrival experience — conceived to hotel-residences standards throughout.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/13_KCGV_Blossom Ivy_R1 Pool 2.jpg'), label: 'Heated Indoor Pool', category: 'Aquatics', description: 'A temperature-controlled indoor pool delivering a resort-like experience year-round, exclusively for residents.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Gym 2.jpg'), label: 'Fully Equipped Gym', category: 'Fitness', description: 'Premium cardio, strength, and functional training machinery — the tools of a boutique fitness club, steps from your door.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Spa 1.jpg'), label: 'Spa & Wellness', category: 'Wellness', description: 'Therapeutic treatments, steam rooms, and relaxation areas typically reserved for five-star hotels, now a permanent feature.' },
      { src: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Restaurant 2.png'), label: 'Coffee Bar & Restaurant', category: 'Dining', description: 'Artisanal coffee, fresh pastries, and curated gourmet cuisine — world-class dining without leaving the building.' },
    ],
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
    descriptionBlocks: [
      { type: 'text', content: "Westlands is Nairobi's most dynamic urban quarter — where international business headquarters, the city's best restaurants, and top-ranked schools converge in a single walkable district. Luckinn Ivy Residence is positioned at the heart of it all on Mogotio Road, placing residents at the precise intersection of professional convenience and cosmopolitan lifestyle." },
      { type: 'image', src: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'), caption: 'Luckinn Ivy Residence — Mogotio Road, Westlands' },
      { type: 'text', content: "The development's 20-floor tower was designed to meet the demands of Nairobi's modern professional: a resident who values both the sanctuary of a well-serviced home and the energy of urban life immediately outside. The building's interiors reflect this balance — premium finishes and smart home features create a private retreat, while co-working spaces and a business lounge on the amenity floor support those who move between home and office." },
      { type: 'image', src: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'), caption: 'Heated Indoor Swimming Pool — Amenities Floor' },
      { type: 'text', content: "With only 120 apartments across the tower, Luckinn Ivy Residence offers genuine exclusivity. The unit count is intentionally limited — a decision that sustains both the quality of resident experience and the building's long-term capital value. As Westlands continues its transformation into Nairobi's premier commercial address, demand for premium residences in the area continues to outpace supply. Only limited units remain." },
    ],
    availableUnits: [
      { type: '2 Bedroom + DSQ', size: '126 – 140 SQM', price: 'Limited Units — Enquire', available: true },
      { type: '3 Bedroom + DSQ', size: '170 – 172 SQM', price: 'Limited Units — Enquire', available: true },
    ],
    soldOutUnits: [
      { type: '1 Bedroom', size: '78 SQM', price: 'SOLD OUT', available: false },
    ],
    amenities: [
      {
        label: 'Heated Indoor Pool',
        image: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'),
        description: 'An elegantly designed indoor heated swimming pool, available year-round regardless of Nairobi\'s weather. The pool deck is conceived as a private resort — a place to decompress, socialise, or simply float in silence, high above the city\'s energy below.',
      },
      {
        label: 'Fully Equipped Gym',
        image: p('/Luckinn Ivy Assets/Amenities/Gym.jpeg'),
        description: 'A fully kitted-out fitness suite with premium cardio, strength and functional training equipment. Designed for the serious athlete and the casual exerciser alike, the gym delivers the performance of a boutique fitness club without requiring residents to leave the building.',
      },
      {
        label: 'Yoga Studio',
        image: p('/Luckinn Ivy Assets/Amenities/Yoga Area.jpeg'),
        description: 'A dedicated yoga and meditation studio bathed in considered light, designed for mindful movement and breath-work. Whether you practice at dawn or after a long evening, the studio offers a quiet counterpoint to the energy of Westlands just outside.',
      },
      {
        label: 'Lounge & Co-working',
        image: p('/Luckinn Ivy Assets/Amenities/Lounge Area.jpeg'),
        description: 'Sophisticated communal lounges and co-working spaces designed for residents who move fluidly between home and professional life. High-speed connectivity, thoughtful acoustic design, and premium furniture create an environment that genuinely supports focused work.',
      },
      {
        label: 'Business Lounge',
        image: p('/Luckinn Ivy Assets/Amenities/Lounge Area close up.jpeg'),
        description: 'A dedicated business lounge with private meeting areas and a professional atmosphere — the right environment for client meetings, video calls, or focused deep work. A rare amenity in Nairobi residential buildings, and a permanent advantage for professional residents.',
      },
      {
        label: "Children's Play Area",
        image: p('/Luckinn Ivy Assets/Amenities/Kids Play Area.jpeg'),
        description: 'A vibrant, thoughtfully designed children\'s play zone giving young residents their own dedicated space within the community. Safe, stimulating, and always supervised, it offers parents peace of mind and children the room to explore and grow freely.',
      },
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
    gallerySlides: [
      { src: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'), label: 'Tower Exterior', category: 'Architecture', description: 'A 20-floor tower on Mogotio Road in Westlands — at the precise intersection of professional convenience and cosmopolitan lifestyle.' },
      { src: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'), label: 'Arrival Entrance', category: 'Architecture', description: 'An arrival experience that sets the tone for the calibre of lifestyle that awaits within.' },
      { src: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'), label: 'Heated Indoor Pool', category: 'Aquatics', description: 'An elegantly designed indoor heated swimming pool conceived as a private resort, available year-round regardless of the weather.' },
      { src: p('/Luckinn Ivy Assets/Amenities/Gym.jpeg'), label: 'Fully Equipped Gym', category: 'Fitness', description: 'A fully kitted-out fitness suite delivering the performance of a boutique fitness club without leaving the building.' },
      { src: p('/Luckinn Ivy Assets/Amenities/Yoga Area.jpeg'), label: 'Yoga Studio', category: 'Wellness', description: 'A dedicated yoga and meditation studio bathed in considered light — a quiet counterpoint to the energy of Westlands outside.' },
      { src: p('/Luckinn Ivy Assets/Amenities/Lounge Area.jpeg'), label: 'Co-working & Lounge', category: 'Professional', description: 'Sophisticated lounges and co-working spaces supporting residents who move fluidly between home and professional life.' },
      { src: p('/Luckinn Ivy Assets/Amenities/Kids Play Area.jpeg'), label: "Children's Play Area", category: 'Family', description: 'A vibrant, safe play zone giving young residents their own dedicated community space within the building.' },
    ],
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
    interiorImages: [
      p('/IVY PARK RESIDENCE Assests/INTERIOR/enhanced_Living_.png'),
      p('/IVY PARK RESIDENCE Assests/INTERIOR/enhanced_Dining_Wide.png'),
      p('/IVY PARK RESIDENCE Assests/INTERIOR/enhanced_Kitchen.png'),
      p('/IVY PARK RESIDENCE Assests/INTERIOR/Bedroom_1.png'),
    ],
    descriptionParagraphs: [
      "Ivy Park Residence is a landmark mixed-use residential development positioned near Yaya Centre along Kirichwa Road, Kilimani. With 660 apartments across three residential blocks on 1.06 acres, the project presents an exceptional opportunity for homeowners and investors seeking premium living in one of Nairobi's most desirable neighbourhoods.",
      "Currently under construction with foundation and structural works progressing on schedule, Ivy Park Residence is offering early-bird pricing to investors who act now. Pre-construction pricing, flexible payment plans, and a wider selection of unit options make this an unmissable opportunity.",
    ],
    descriptionBlocks: [
      { type: 'text', content: "Kilimani has undergone a remarkable transformation over the past decade — evolving from a quiet, leafy neighbourhood into one of Nairobi's most sought-after mixed-use districts. Positioned along Kirichwa Road near Yaya Centre, Ivy Park Residence is sited at Kilimani's most active intersection, where established residential demand meets the district's growing commercial energy." },
      { type: 'image', src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'), caption: 'Ivy Park Residence — Kirichwa Road, Kilimani' },
      { type: 'text', content: "The development's scale is deliberate: 660 apartments across three residential blocks set on 1.06 acres, designed to create an internal community rather than simply a building. Each block connects through landscaped courtyard gardens and shared lifestyle spaces — a rooftop garden and lounge, co-working areas, a spa, bar, and heated swimming pool — that collectively justify the term 'residences' rather than apartments." },
      { type: 'image-pair', images: [
        { src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 1_IVY PARK.jpg'), caption: 'Block A Façade' },
        { src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 2_IVY PARK.jpg'), caption: 'Block B Façade' },
      ]},
      { type: 'text', content: "For investors, the timing of Ivy Park represents a rare alignment of conditions. Foundation and structural works are progressing on schedule, yet early-bird pricing remains available — meaning buyers entering now secure the maximum potential spread between their purchase price and the development's completion value. With units starting from KES 6.82M, Ivy Park opens the Ivy Group portfolio to a broader range of investors without compromising the quality standard that defines every Ivy Group development." },
    ],
    availableUnits: [
      { type: '1 Bedroom', size: '62 – 69 SQM', price: 'From KES 6,820,000', available: true },
      { type: '2 Bedroom', size: '73 – 128 SQM', price: 'From KES 10,780,000', available: true },
      { type: '3 Bedroom + DSQ', size: '142 SQM', price: 'From KES 15,620,000', available: true },
    ],
    soldOutUnits: [],
    amenities: [
      {
        label: 'Heated Swimming Pool',
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png'),
        description: 'A resort-calibre heated swimming pool set within a sun-drenched deck, designed for both active swimming and leisurely lounging. The pool environment at Ivy Park is conceived as a destination in itself — a place that rivals the best hotel pools in Nairobi, reserved exclusively for residents.',
      },
      {
        label: 'Bar & Lounge',
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Bar_001.png'),
        description: 'An elevated bar and lounge environment combining sophisticated design with curated cocktails and a carefully selected wine list. Whether you are entertaining guests or unwinding alone at the end of a long day, the bar delivers the quality and atmosphere of Nairobi\'s finest establishments — inside your own building.',
      },
      {
        label: 'Spa & Wellness',
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Spa_001 Night.png'),
        description: 'A full-service spa and wellness centre offering holistic treatments, steam rooms, and beauty services. Designed as an immersive retreat from the pace of urban life, the spa at Ivy Park brings the standard of a luxury wellness destination into daily reach — without the journey.',
      },
      {
        label: 'Fully Equipped Gym',
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/GYM/GYM_V1_B.png'),
        description: 'A premium fitness centre spanning a dedicated floor, equipped with the latest cardio, strength, and functional training machinery. With natural light, generous floor area, and top-specification equipment, the gym delivers an environment that makes consistent training genuinely enjoyable.',
      },
      {
        label: 'Rooftop Garden & Lounge',
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/ROOFTOP/251027_FINAL_Creative(18).jpg'),
        description: 'A spectacular rooftop garden and BBQ terrace offering panoramic views across Kilimani and beyond — an open-air living room positioned at the summit of the development. Designed for social gatherings, private dining, and quiet contemplation alike, the rooftop is one of Nairobi\'s most compelling residential amenity spaces.',
      },
      {
        label: "Children's Play Area",
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/CHILDREN_S AREA/enhanced_Cam_Kids_001.png'),
        description: 'A thoughtfully engineered children\'s play zone with safe equipment, creative exploration spaces, and areas that genuinely support childhood development and social growth. Designed so that children have a community of their own within Ivy Park — and parents have peace of mind.',
      },
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
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d982.7834738622485!2d36.781634957029155!3d-1.2914471018236187!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x182f1b000d6f3f39%3A0x854c68bdc588cef5!2sIVY%20PARK%20RESIDENCE%20Nairobi%2C%20Kirichwa%20Rd!3m2!1d-1.2914455!2d36.781751!5e1!3m2!1sen!2ske!4v1788511994363!5m2!1sen!2ske',
    brochurePath: p('/IVY PARK RESIDENCE Assests/IvyPark BROCHURE.pdf'),
    gallerySlides: [
      { src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg'), label: 'Aerial Sunset View', category: 'Architecture', description: 'Three residential blocks on 1.06 acres near Yaya Centre — designed to create an internal community, not simply a building.' },
      { src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Facade 1_IVY PARK.jpg'), label: 'Block A Façade', category: 'Architecture', description: 'A considered architectural language designed to hold its own in Kilimani\'s evolving skyline.' },
      { src: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Drone 1_IVY PARK.jpg'), label: 'Development Overview', category: 'Architecture', description: 'Foundation and structural works progressing on schedule — connecting three blocks through landscaped courtyard gardens.' },
      { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png'), label: 'Heated Swimming Pool', category: 'Aquatics', description: 'A resort-calibre heated pool set within a sun-drenched deck — rivalling the best hotel pools in Nairobi, for residents only.' },
      { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Bar_001.png'), label: 'Bar & Lounge', category: 'Dining', description: 'Sophisticated design, curated cocktails, and a carefully selected wine list — Nairobi\'s finest atmosphere, inside your building.' },
      { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/BAR POOL SPA/enhanced_Cam_Spa_001 Night.png'), label: 'Spa & Wellness', category: 'Wellness', description: 'A full-service spa and wellness centre — an immersive retreat from the pace of urban Nairobi, within daily reach.' },
      { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/GYM/GYM_V1_B.png'), label: 'Fully Equipped Gym', category: 'Fitness', description: 'Natural light, generous floor area, and top-specification equipment — an environment that makes consistent training enjoyable.' },
      { src: p('/IVY PARK RESIDENCE Assests/AMENITIES/ROOFTOP/251027_FINAL_Creative(18).jpg'), label: 'Rooftop Garden & Lounge', category: 'Lifestyle', description: 'Panoramic views across Kilimani and beyond — an open-air living room at the summit of the development.' },
      { src: p('/IVY PARK RESIDENCE Assests/INTERIOR/enhanced_Living_.png'), label: 'Living Space', category: 'Interiors', description: 'Generously proportioned living areas with premium finishes and natural light, designed for contemporary family life.' },
      { src: p('/IVY PARK RESIDENCE Assests/INTERIOR/Bedroom_1.png'), label: 'Master Bedroom', category: 'Interiors', description: 'Thoughtfully designed bedrooms delivering the quality and finish that define every residence at Ivy Park.' },
    ],
  },

  /* ─────────────────────── IVY MYST ─────────────────────── */
  {
    slug: 'ivy-myst',
    name: 'Ivy Myst',
    tagline: '1, 2 & 3 bedroom luxury residences with private garden terraces, on Gatundu Road, Kileleshwa.',
    locationLabel: 'KILELESHWA, NAIROBI',
    locationFull: 'Gatundu Road, Kileleshwa, Nairobi',
    type: 'Luxury Residences',
    blocks: '2 Wings — A & B',
    floors: 22,
    totalUnits: 448,
    parking: 'Basement Parking',
    completion: 'August 2029',
    statusLabel: 'NOW SELLING',
    isLaunchingSoon: false,
    heroImage: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'),
    exteriorImages: [
      p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'),
      p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Gate Front View.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior day view.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior night view.png'),
      p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'),
    ],
    descriptionParagraphs: [
      "Ivy Myst is a landmark luxury residential development on Gatundu Road, Kileleshwa. Following a celebrated groundbreaking ceremony, sales are now officially open.",
      "Two wings hold generously proportioned 1, 2 and 3 bedroom residences, many with private garden terraces, beneath sweeping curved architecture and a signature rooftop — the Celestial Pool, a restaurant and bar, and an uninterrupted view across Nairobi.",
    ],
    descriptionBlocks: [
      { type: 'text', content: "Ivy Myst is a landmark luxury residential development on Gatundu Road, Kileleshwa. Following a celebrated groundbreaking ceremony, sales are now officially open — the opportunity to secure one of Nairobi's most architecturally distinctive addresses at early-stage pricing." },
      { type: 'image', src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'), caption: 'Ivy Myst — the sweeping curved façade on Gatundu Road' },
      { type: 'text', content: "Two wings — A and B — hold generously proportioned 1, 2 and 3 bedroom residences, many with private garden terraces. The sweeping curved architecture and planted balconies give the building a presence unlike anything else on the Kileleshwa skyline, while ceiling heights and window ratios are calibrated to carry natural light deep into every home." },
      { type: 'image-pair', images: [
        { src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'), caption: 'The illuminated façade after dark' },
        { src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'), caption: 'The rooftop, above Nairobi' },
      ]},
      { type: 'text', content: "The rooftop is the development's signature: the Celestial Pool with its waterfall feature, a rooftop restaurant and bar, and an uninterrupted panorama across the city. Below, a sculptural garden stream runs through the landscaped grounds and the grand reception lobby sets the tone from arrival. Estimated completion is August 2029." },
    ],
    availableUnits: [
      { type: '1 Bedroom', size: '79 – 84 SQM', price: 'From KES 8,800,000', priceRange: 'KES 8.8M – 10.5M', roi: { furnished: '19.75%', unfurnished: '13.67%' }, note: 'Garden terrace on select units', available: true },
      { type: '2 Bedroom', size: '121 – 159 SQM', price: 'From KES 14,200,000', priceRange: 'KES 14.2M – 20.4M', roi: { furnished: '15.17%', unfurnished: '10.95%' }, note: 'Garden terrace options available', available: true },
      { type: '3 Bedroom + DSQ', size: '169 – 231 SQM', price: 'From KES 19,800,000', priceRange: 'KES 19.8M – 29.6M', roi: { furnished: '18.09%', unfurnished: '12.06%' }, note: 'DSQ & garden terrace on select units', available: true },
    ],
    soldOutUnits: [],
    amenities: [
      { label: 'Celestial Rooftop Pool', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'), description: 'The crown jewel of Ivy Myst — a rooftop pool unlike anything else in Nairobi. Designed to evoke a celestial landscape, it sits at the summit of the building with unobstructed views over the Kileleshwa skyline. This is where day and night blurs into something extraordinary.' },
      { label: 'Rooftop Restaurant', image: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'), description: 'A full rooftop dining destination with panoramic city views — an al-fresco restaurant experience above the Nairobi skyline. Curated menus, premium service, and an address that transforms every meal into a memorable occasion.' },
      { label: 'Rooftop Bar & Lounge', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop bar area.png'), description: 'An elevated bar experience at the apex of the building, combining crafted cocktails with one of Nairobi\'s most commanding views. Whether entertaining clients or simply watching the sun set over the city, the rooftop bar is your most compelling address.' },
      { label: 'Rooftop Lounge', image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop lounge area night view.png'), description: 'A sophisticated night-time lounge designed for the hours after dinner — ambient lighting, plush seating, and the city spread below. A space that rewards those who stay a little longer.' },
      { label: 'Gym & Yoga Studio', image: p('/Ivy Myst Assets/New Renders/Myst amenities/gym and yoga space.jpg'), description: 'A premium fitness and wellness floor combining a fully equipped gym with a dedicated yoga and meditation studio. Designed for residents who take their wellbeing as seriously as their address.' },
      { label: 'Garden Stream', image: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'), description: 'A living landscape element — a sculptural garden stream that runs through the development\'s common areas, bringing the sound and presence of water into daily life. A rare amenity that sets Ivy Myst apart from every other residential building in Nairobi.' },
      { label: 'Indoor Restaurant', image: p('/Ivy Myst Assets/New Renders/Myst amenities/indoor restaurant.png'), description: 'An in-house fine dining restaurant designed to hotel-residences standards. Available to residents and their guests, it delivers the intimacy of a private members\' dining club with the quality of Nairobi\'s finest restaurants.' },
      { label: 'Grand Reception', image: p('/Ivy Myst Assets/New Renders/Myst amenities/reception area.png'), description: 'A sculptural arrival experience conceived at architectural scale. The grand reception sets the tone for everything that follows — a statement of intent that communicates unmistakably that Ivy Myst operates at a different level.' },
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
      'Early-stage pricing — projected ROI up to 19.75% furnished on 1-bedroom units',
      'Prime Kileleshwa address with proven strong rental demand',
      'Architecturally distinctive — a landmark on the Nairobi skyline',
      'Garden terrace units available — a rare offering in Nairobi',
      'Flexible payment plans: 20% deposit, balance through construction',
      "Developed by The Ivy Group — a record of on-time delivery since 2017",
    ],
    locationAdvantages: [
      'Prestigious Kileleshwa address',
      'Minutes from Westlands and Nairobi CBD',
      'Close to top international schools',
      'Near major hospitals and health facilities',
      'Shopping malls & supermarkets nearby',
      'Easy highway and expressway access',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.3640841920273!2d36.7854601!3d-1.2774497999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171eb89deccd%3A0xe0d248c01f726963!2sIVY%20MYST%20RESIDENCE!5e1!3m2!1sen!2ske!4v1785406432997!5m2!1sen!2ske',
    brochurePath: p('/Ivy Myst Assets/IvyMystBrochure.pdf'),
    interiorImages: [
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (1).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (5).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (6).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (7).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (8).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (10).png'),
      p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (12).png'),
    ],
    gallerySlides: [
      { src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'), label: 'The Architecture', category: 'Exterior', description: "The sweeping curved façade of Ivy Myst rises above Gatundu Road, Kileleshwa — a landmark that redefines the neighbourhood's skyline." },
      { src: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'), label: 'Celestial Rooftop Pool', category: 'Amenity', description: 'An infinity pool with a signature waterfall, perched at the apex of Ivy Myst. Morning laps with a city-wide view; twilight drinks as Nairobi lights up below.' },
      { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (1).png'), label: 'Living & Dining', category: 'Interior', description: 'Premium marble floors, bespoke cabinetry and carefully curated joinery define every living space. Expansive openings frame the city beyond.' },
      { src: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'), label: 'Above Nairobi', category: 'Rooftop', description: 'From the rooftop, Nairobi stretches in every direction — an uninterrupted panorama available to every resident.' },
      { src: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'), label: 'Rooftop Restaurant', category: 'Dining', description: "Nairobi's most elevated dining destination — an inspired menu, curated interiors, and a panoramic backdrop." },
      { src: p('/Ivy Myst Assets/New Renders/Interior/Interior Renders 2026-07-27 (5).png'), label: 'Master Bedroom', category: 'Interior', description: 'Generous proportions, premium finishes and considered lighting design make the master bedrooms a genuine sanctuary.' },
      { src: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'), label: 'Garden Stream', category: 'Landscape', description: "A sculpted water feature flows through the heart of the landscaped gardens — an unexpected moment of nature in Kileleshwa." },
      { src: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Night View.png'), label: 'After Dark', category: 'Exterior', description: 'The illuminated façade, rooftop bar lights and garden lanterns — a development that looks as remarkable by night as by day.' },
    ],
    floorPlanOverview: { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/IVY MYST FULL FLOOR PLAN.jpg'), label: 'Full Floor Plan — Wing A & B, all unit types' },
    floorPlanGroups: [
      { label: 'Wing A', plans: [
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 01 -3BR 213SQM.jpg'), label: 'Unit 1 — 3 Bed + DSQ · 213 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Odd - 3BR 217SQM.jpg'), label: 'Unit 2, odd floors — 3 Bed + Garden · 217 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 02 Even - 3BR 231QM.jpg'), label: 'Unit 2, even floors — 3 Bed + Garden · 231 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 03&04 -1BR 84SQM.jpg'), label: 'Units 3 & 4 — 1 Bed + Garden · 84 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 05&06 - 2BR 142SQM.jpg'), label: 'Units 5 & 6 — 2 Bed + Garden · 142 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Odd- 2BR 146SQM.jpg'), label: 'Unit 7, odd floors — 2 Bed + Garden · 146 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 07 Even- 2BR 159SQM.jpg'), label: 'Unit 7, even floors — 2 Bed + Garden · 159 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 08-2BR 142SQM.jpg'), label: 'Unit 8 — 2 Bedroom · 142 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING A - 09&010&11 -1BR 79SQM.jpg'), label: 'Units 9, 10 & 11 — 1 Bedroom · 79 SQM' },
      ]},
      { label: 'Wing B', plans: [
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 01 - 3BR 212SQM.jpg'), label: 'Unit 1 — 3 Bed + DSQ · 212 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 02 - 3BR 169SQM.jpg'), label: 'Unit 2 — 3 Bed + DSQ · 169 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 03 - 2BR 128SQM.jpg'), label: 'Unit 3 — 2 Bedroom · 128 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 04 - 2BR 128SQM.jpg'), label: 'Unit 4 — 2 Bedroom · 128 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 05 - 2BR 121SQM.jpg'), label: 'Unit 5 — 2 Bedroom · 121 SQM' },
        { src: p('/Ivy Myst Assets/Ivy Myst Floor-plans/WING B - 07&08 -1BR 79SQM.jpg'), label: 'Units 7 & 8 — 1 Bedroom · 79 SQM' },
      ]},
    ],
  },
]

export function getProject(slug: string): ProjectData | undefined {
  return projects.find((proj) => proj.slug === slug)
}

export function getOtherProjects(slug: string): ProjectData[] {
  return projects.filter((proj) => proj.slug !== slug).slice(0, 3)
}
