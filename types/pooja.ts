export type PoojaService = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  startingPrice: number;
  samagriIncluded: boolean;
  image?: string;
  features?: string[];
};
