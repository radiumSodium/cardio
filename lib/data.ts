export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  pricePerHour: number;
}

export const services: Service[] = [
  {
    id: "baby-care",
    name: "Baby Care",
    description: "Reliable and loving care for your little ones. Our babysitters are experienced and vetted.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
    pricePerHour: 500, // BDT presumably, or generic currency
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    description: "Compassionate companionship and assistance for seniors at home.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    pricePerHour: 600,
  },
  {
    id: "sick-care",
    name: "Sick People Service",
    description: "Specialized care for sick family members requiring extra attention and medical support.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    pricePerHour: 800,
  },
];
