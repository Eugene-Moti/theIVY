export const contact = {
  office: "Gatundu Road 23, Blossoms Ivy Residence",
  email: "marketing.ivy-group@rsunproperty.net",
  phone: "+254 118 266666",
  whatsapp: "https://wa.me/254118266666"
};

export const socials = [
  ["Facebook", "https://www.facebook.com/share/1JfveKL618/"],
  ["Instagram", "https://www.instagram.com/theivygroupke?igsh=M2dtaXdjNG8yejYy"],
  ["TikTok", "https://www.tiktok.com/@the.ivy.group.ke?_r=1&_t=ZS-95YSgA8XeNU"],
  ["YouTube", "https://youtube.com/@theivygroupke?si=jR-CgBXqn9h12RMT"]
];

export const assets = {
  ivyLogo: "/The Ivygroup/Logo/3x/Artboard 1@3x.png",
  ivyParkLogo: "/IVY PARK RESIDENCE/Logo/SVG/Artboard 1.svg",
  blossomsLogo: "/BLOSSOMS_IVY/logo/SVG/Artboard 1.svg",
  luckinnLogo: "/Luckinn/Logo/LUCKINN LOGO-blck02.png",
  ivyParkHero: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/EXTERIORS/251118_D01_Droneview-Sunset_Ivy Park.jpg",
  ivyParkExterior: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/EXTERIORS/Daylight_EXTERIOS_01.png",
  ivyParkRooftop: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/EXTERIORS/Aerial Images + Rooftop/251211_D03-Rooftop_IVY PARK.jpg",
  ivyParkPool: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/AMENITIES/BAR POOL SPA/enhanced_Cam_Pool_002 Day.png",
  ivyParkGym: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/AMENITIES/GYM/GYM_V4.png",
  ivyParkInterior: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/INTERIOR/IVY PARK 2 BR FINAL Day/enhanced_Living.png",
  blossomsHero: "/BLOSSOMS_IVY/Blossoms Ivy_Lobby_R1_View 01-1.jpg",
  blossomsPool: "/BLOSSOMS_IVY/13_KCGV_Blossom Ivy_R1 Pool 2.jpg",
  blossomsCafe: "/BLOSSOMS_IVY/09_KCGV_Blossom Ivy_R1 Cafe 2.jpg",
  luckinnHero: "/Luckinn/Luckinn Exterior gate.jpeg",
  luckinnPool: "/Luckinn/Swimming pool 1.jpeg",
  luckinnLounge: "/Luckinn/Lounge wide view.jpeg"
};

export const projects = [
  {
    slug: "ivy-park-residence",
    name: "Ivy Park Residence",
    location: "Kirichwa Road, Kilimani",
    status: "Latest launch",
    price: "From KES 6.8M",
    completion: "December 2028",
    image: assets.ivyParkHero,
    logo: assets.ivyParkLogo,
    brochure: "/IVY PARK RESIDENCE/IvyPark Brochure/Ivypark Brochure.pdf",
    description:
      "A landmark Kilimani address with 660 apartments, rooftop living, heated pools, co-working spaces, and high investment potential near Yaya Centre.",
    stats: ["660 apartments", "22 residential floors", "1.06 acres", "3 blocks"],
    paymentPlans: ["Reserve with a 20% deposit", "Spread balance during construction", "Mortgage and cash buyer support", "Projected completion: December 2028"]
  },
  {
    slug: "blossoms-ivy-residence",
    name: "Blossoms Ivy Residence",
    location: "Gatundu Road, Kileleshwa",
    status: "Ongoing",
    price: "3BR from KES 19.5M",
    completion: "December 2026",
    image: assets.blossomsHero,
    logo: assets.blossomsLogo,
    brochure: "/BLOSSOMS_IVY/Brochure/Blossoms Brochure.pdf",
    description:
      "Luxury residences in Kileleshwa with indoor pool, gym, coffee bar, play areas, smart locks, and fast access to Westlands and CBD.",
    stats: ["220 apartments", "2 blocks", "0.62 acres", "3BR available"],
    paymentPlans: ["Flexible deposit structure", "Construction-linked instalments", "Ready guidance for owner-occupiers", "Projected completion: December 2026"]
  },
  {
    slug: "luckinn-ivy-residence",
    name: "Luckinn Ivy Residence",
    location: "Westlands",
    status: "Ongoing",
    price: "3BR + DSQ available",
    completion: "December 2026",
    image: assets.luckinnHero,
    logo: assets.luckinnLogo,
    secondaryLogo: "/Luckinn/Logo/1x/Artboard 1.png",
    logoClass: "brightness-0 saturate-100 invert-[70%] sepia-[44%] saturate-[503%] hue-rotate-[358deg] brightness-[88%] contrast-[87%]",
    brochure: "/Luckinn/Brochure/Luckinn Ivy Residence Brochure.pdf",
    description:
      "A refined Westlands tower with 120 units, indoor pool, gym, co-working space, yoga room, smart locks, and strong urban convenience.",
    stats: ["120 units", "20 floors", "1 tower", "3BR available"],
    paymentPlans: ["Reservation support available", "Staged payments during build", "Mortgage introduction on request", "Projected completion: December 2026"]
  }
];

export const blogPosts = [
  {
    title: "Why Kilimani continues to lead Nairobi apartment demand",
    excerpt: "A practical look at access, rental depth, lifestyle amenities, and why Ivy Park Residence is positioned for modern buyers.",
    image: "/IVY PARK RESIDENCE/IVY PARK RESIDENCE - RENDERS/EXTERIORS/Night_EXTERIOS_06_Detail Rooftop.png",
    author: "Ivy Advisory Team",
    authorImage: assets.ivyLogo,
    views: "2.4k",
    comments: 18,
    likes: 146
  },
  {
    title: "How flexible payment plans help off-plan buyers plan with confidence",
    excerpt: "Understand deposits, construction-linked instalments, mortgage timing, and the questions every buyer should ask before reserving.",
    image: assets.ivyParkInterior,
    author: "Sales Strategy Desk",
    authorImage: assets.ivyLogo,
    views: "1.8k",
    comments: 12,
    likes: 97
  },
  {
    title: "Kileleshwa, Westlands, and Kilimani: choosing the right address",
    excerpt: "Compare three strong Nairobi neighborhoods through lifestyle, connectivity, rental audience, and long-term ownership goals.",
    image: assets.blossomsPool,
    author: "Market Insights",
    authorImage: assets.ivyLogo,
    views: "3.1k",
    comments: 24,
    likes: 188
  },
  {
    title: "What premium amenities mean for everyday living and resale value",
    excerpt: "From rooftop lounges to indoor pools and co-working spaces, thoughtful amenities can make a residence easier to live in and easier to rent.",
    image: assets.luckinnPool,
    author: "The Ivy Group",
    authorImage: assets.ivyLogo,
    views: "1.5k",
    comments: 9,
    likes: 84
  }
];

export const floorPlans = [
  {
    project: "Ivy Park Residence",
    slug: "ivy-park-residence",
    logo: assets.ivyParkLogo,
    plans: [
      "/Floor Plans/1BEDROOM 62SQM.jpeg",
      "/Floor Plans/1BEDROOM 66SQM.jpeg",
      "/Floor Plans/1BEDROOM 67SQM.jpeg",
      "/Floor Plans/1BEDROOM 69SQM.jpeg",
      "/Floor Plans/1BEDROOM 73SQ.jpeg",
      "/Floor Plans/1BEDROOM 76SQM.jpeg",
      "/Floor Plans/2BEDROOM 98SQM.jpeg",
      "/Floor Plans/2BEDROOM 110SQM.jpeg",
      "/Floor Plans/2BEDROOM 114SQM.jpeg",
      "/Floor Plans/2BEDROOM 115SQM.jpeg",
      "/Floor Plans/2BR+DSQ 108SQM.jpeg",
      "/Floor Plans/2BR+DSQ 128SQM.jpeg",
      "/Floor Plans/3BR +DSQ 142SQM.jpeg",
      "/Floor Plans/Floor Plan Block - A,B & C.jpeg",
      "/Floor Plans/Floor Plan Block - A.jpeg",
      "/Floor Plans/Floor Plan Block - B.jpeg",
      "/Floor Plans/Floor Plan Block - C.jpeg"
    ]
  },
  {
    project: "Luckinn Ivy Residence",
    slug: "luckinn-ivy-residence",
    logo: assets.luckinnLogo,
    logoClass: "brightness-0 saturate-100 invert-[70%] sepia-[44%] saturate-[503%] hue-rotate-[358deg] brightness-[88%] contrast-[87%]",
    plans: [
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.35.jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.36 (1).jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.36 (2).jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.36.jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.37 (1).jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.37.jpeg",
      "/Luckinn/Floor plans/WhatsApp Image 2026-05-11 at 13.01.38.jpeg"
    ]
  },
  {
    project: "Blossoms Ivy Residence",
    slug: "blossoms-ivy-residence",
    logo: assets.blossomsLogo,
    plans: [
      "/BLOSSOMS_IVY/FloorPlans/WhatsApp Image 2026-05-11 at 13.07.55 (1).jpeg",
      "/BLOSSOMS_IVY/FloorPlans/WhatsApp Image 2026-05-11 at 13.07.55 (2).jpeg",
      "/BLOSSOMS_IVY/FloorPlans/WhatsApp Image 2026-05-11 at 13.07.55.jpeg",
      "/BLOSSOMS_IVY/FloorPlans/WhatsApp Image 2026-05-11 at 13.07.56 (1).jpeg",
      "/BLOSSOMS_IVY/FloorPlans/WhatsApp Image 2026-05-11 at 13.07.56.jpeg"
    ]
  }
];

export const tours = [
  ["Amenities Floor", "Gym, swimming pool, and luxury lifestyle spaces", "https://vr.justeasy.cn/view/lg5174d6h0036a26-1746078378.html"],
  ["Shared Office", "Co-working and meeting room surrounded by greenery", "https://vr.justeasy.cn/view/1w746q0pl0l37741-1746078298.html"],
  ["One Bedroom", "Virtual tour of the one-bedroom showhouse", "https://vr.justeasy.cn/view/1746fqe00v3o32x3-1746003487.html"],
  ["Two Bedroom", "Virtual tour of the two-bedroom showhouse", "https://vr.justeasy.cn/view/5g1n8746l003j824-1746070867.html"],
  ["Three Bedroom", "Virtual tour of the three-bedroom showhouse", "https://vr.justeasy.cn/view/l174xmx6900392o9-1746074641.html"]
];

export const marketingTeam = ["Michael Olanya", "Erick Moti", "Remy Barack", "Kelvin Matiku", "Mercy Valentine"];
