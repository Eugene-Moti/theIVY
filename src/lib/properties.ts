export interface Property {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "blossoms-ivy",
    name: "BLOSSOMS IVY",
    location: "Kileleshwa",
    image: "/designs/blossom.jpg",
    description: "Elegant apartments in the heart of Kileleshwa, offering tranquil living with urban convenience."
  },
  {
    id: "luckinn-ivy",
    name: "LUCKINN IVY",
    location: "Westlands",
    image: "/designs/Luckinn Ivy.jpg",
    description: "Contemporary living spaces in vibrant Westlands, perfect for modern professionals and families."
  },
  {
    id: "ivy-park",
    name: "IVY PARK",
    location: "Kilimani",
    image: "/designs/Exterior_07_IA.png",
    description: "Sophisticated residences in prestigious Kilimani, combining luxury with accessibility."
  }
];