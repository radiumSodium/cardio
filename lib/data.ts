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
    pricePerHour: 500,
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

  // ✅ New services below

  {
    id: "newborn-care",
    name: "Newborn Care",
    description: "Gentle and professional care for newborn babies, ensuring safety and comfort.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    pricePerHour: 700,
  },
  {
    id: "postnatal-care",
    name: "Postnatal Mother Care",
    description: "Dedicated care for mothers during postnatal recovery with emotional and physical support.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=80",
    pricePerHour: 900,
  },
  {
    id: "disabled-care",
    name: "Disabled Care",
    description: "Personalized assistance for people with disabilities, focusing on dignity and independence.",
    image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=800&q=80",
    pricePerHour: 850,
  },
  {
    id: "home-nursing",
    name: "Home Nursing Service",
    description: "Professional home nursing support including medication, monitoring, and care.",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f6c4?w=800&q=80",
    pricePerHour: 1200,
  },
  {
    id: "patient-attendant",
    name: "Patient Attendant",
    description: "Trained attendants to assist patients with daily needs and hospital or home care.",
    image: "https://images.unsplash.com/photo-1584515933487-5b2a4f4d0b51?w=800&q=80",
    pricePerHour: 750,
  },
  {
    id: "physiotherapy-support",
    name: "Physiotherapy Support",
    description: "Assistance during physiotherapy sessions and post-treatment recovery.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    pricePerHour: 1000,
  },
  {
    id: "mental-health-support",
    name: "Mental Health Support",
    description: "Compassionate support and companionship for individuals facing mental health challenges.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    pricePerHour: 950,
  },
  {
    id: "night-care",
    name: "Night Care Service",
    description: "Overnight care for babies, elderly, or patients requiring continuous supervision.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80",
    pricePerHour: 1100,
  },
  {
    id: "respite-care",
    name: "Respite Care",
    description: "Short-term relief care for family caregivers while ensuring loved ones are safe.",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80",
    pricePerHour: 650,
  },
];