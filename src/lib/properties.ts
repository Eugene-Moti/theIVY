export interface Unit {
  type: string;
  size: string;
  price: string;
  status: "available" | "sold-out";
}

export interface Property {
  id: string;
  name: string;
  location: string;
  locationDetail: string;
  image: string;
  description: string;
  blocks: number;
  floors: number;
  units: number;
  completionDate: string;
  unitsList: Unit[];
  amenities: string[];
  features: string[];
  status: "current" | "sold-out";
}

export const PROPERTIES: Property[] = [
  {
    id: "luckinn-ivy",
    name: "LUCKINN IVY RESIDENCE",
    location: "Westlands",
    locationDetail: "Westlands, Nairobi",
    image: "/designs/Luckinn Ivy.jpg",
    description: "Contemporary living spaces in vibrant Westlands, perfect for modern professionals and families.",
    blocks: 1,
    floors: 20,
    units: 120,
    completionDate: "December 2026",
    unitsList: [
      { type: "1 Bedroom", size: "78sqm", price: "N/A", status: "sold-out" },
      { type: "2 Bedroom + DSQ", size: "126-140sqm", price: "N/A", status: "sold-out" },
      { type: "3 Bedroom + DSQ", size: "170-172sqm", price: "Available", status: "available" },
    ],
    amenities: [
      "Heated indoor Swimming pool",
      "Gym",
      "Coffee bar",
      "Kids' play areas",
      "Co-working space",
      "Yoga room"
    ],
    features: [
      "Smart door locks",
      "High-speed lifts",
      "24/7 security",
      "Backup generator",
      "Borehole water supply"
    ],
    status: "current"
  },
  {
    id: "blossoms-ivy",
    name: "BLOSSOM IVY RESIDENCE",
    location: "Kileleshwa",
    locationDetail: "Kileleshwa, Nairobi",
    image: "/designs/blossom.jpg",
    description: "Experience luxury living in the heart of Kileleshwa with elegant modern apartments.",
    blocks: 2,
    floors: 22,
    units: 220,
    completionDate: "December 2026",
    unitsList: [
      { type: "1 Bedroom", size: "78-90sqm", price: "Sold Out", status: "sold-out" },
      { type: "2 Bedroom", size: "96-166sqm", price: "Sold Out", status: "sold-out" },
      { type: "3 Bedroom + Study + DSQ", size: "208-236sqm", price: "From Ksh 19.5M", status: "available" },
      { type: "4 Bedroom + Study + DSQ", size: "251-260sqm", price: "Sold Out", status: "sold-out" },
    ],
    amenities: [
      "Heated indoor swimming pool",
      "Yoga Studio & gym",
      "Coffee bar & leisure garden",
      "Indoor/outdoor children's play area",
      "Borehole & dual backup generators",
      "24/7 security, CCTV & smart locks"
    ],
    features: [
      "Modern fitted kitchens",
      "Burner, hood, oven & purifier",
      "Smart locks",
      "High-speed lifts",
      "CCTV surveillance"
    ],
    status: "current"
  },
  {
    id: "ivy-park",
    name: "IVY PARK RESIDENCE",
    location: "Kilimani",
    locationDetail: "Kirichwa Road, Kilimani, Nairobi",
    image: "/designs/Exterior_07_IA.png",
    description: "A landmark residential development set to redefine luxury living near Yaya Centre.",
    blocks: 3,
    floors: 22,
    units: 660,
    completionDate: "December 2028",
    unitsList: [
      { type: "1 Bedroom", size: "62-69sqm", price: "From Ksh 6.82M", status: "available" },
      { type: "2 Bedroom", size: "73-128sqm", price: "From Ksh 10.78M", status: "available" },
      { type: "3 Bedroom + DSQ", size: "142sqm", price: "From Ksh 15.62M", status: "available" },
    ],
    amenities: [
      "Heated swimming pool",
      "Rooftop garden & lounge with panoramic views",
      "Fully equipped gym & yoga studio",
      "Co-working spaces & coffee bar",
      "Indoor children's playground",
      "Landscaped garden"
    ],
    features: [
      "Smart door locks",
      "High-speed lifts",
      "24/7 security",
      "Backup generators",
      "Ample parking"
    ],
    status: "current"
  }
];
