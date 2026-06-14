import type { PoojaService } from "@/types/pooja";

export const poojaServices: PoojaService[] = [
  {
    id: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    description: "Family prosperity and gratitude ke liye complete katha and pooja vidhi.",
    durationMinutes: 120,
    startingPrice: 2100,
    samagriIncluded: false
  },
  {
    id: "griha-pravesh",
    name: "Griha Pravesh",
    description: "Naye ghar ke shubh pravesh ke liye kalash, havan, and vastu shanti.",
    durationMinutes: 180,
    startingPrice: 5100,
    samagriIncluded: true
  },
  {
    id: "mahamrityunjaya-jaap",
    name: "Mahamrityunjaya Jaap",
    description: "Health, protection, and peace ke liye mantra jaap with sankalp.",
    durationMinutes: 90,
    startingPrice: 3100,
    samagriIncluded: false
  }
];
