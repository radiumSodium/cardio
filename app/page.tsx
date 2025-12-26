import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ServiceProps } from "@/components/ServiceCard";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Care.xyz - Reliable Caregiving Services",
  description: "Find trusted care for children, elderly, and sick family members. Secure bookings and verified caretakers.",
};

// Helper to fetch services
async function getServices(): Promise<ServiceProps[]> {
  await dbConnect();
  const services = await Service.find({}).lean();
  return services.map(service => ({
    _id: service._id.toString(),
    name: service.name,
    description: service.description,
    image: service.image,
    pricePerHour: service.pricePerHour
  }));
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
         <div className="absolute inset-0 z-0 user-select-none">
            <Image 
              src="https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070" 
              alt="Care Background" 
              fill 
              className="object-cover opacity-30" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/50 to-slate-900"></div>
         </div>
         <div className="relative z-10 max-w-4xl space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pb-2 drop-shadow-lg">
              Caregiving Made Simple
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Trusted care services for babysitting, elderly support, and sick family members. Secure, reliable, and accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="#services">
                <Button className="text-lg px-8 py-6 rounded-full shadow-lg shadow-pink-500/20 bg-gradient-to-r from-blue-600 to-pink-600 hover:scale-105 transition-transform">
                  Find a Caretaker
                </Button>
              </Link>
            </div>
         </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4">
        <div className="glass p-10 rounded-2xl flex flex-col md:flex-row items-center gap-10 border border-white/5">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-pink-500">About Care.xyz</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Care.xyz is a dedicated platform designed to connect families with reliable and compassionate caretakers. 
              Whether you need assistance with childcare, support for elderly family members, or specialized care for sick individuals, 
              we make the process secure and accessible.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-semibold text-blue-400">Reliable</button>
              <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-semibold text-pink-400">Secure</button>
              <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-semibold text-purple-400">Accessible</button>
            </div>
          </div>
          <div className="flex-1 relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
             <Image 
                src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&q=80" 
                alt="About Us" 
                fill 
                className="object-cover hover:scale-105 transition duration-700" 
             />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 scroll-mt-28">
         <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Our Premium Services
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
         </div>
      </section>

      {/* Testimonials & Stats */}
      <section className="container mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold mb-12 text-white">Why Families Trust Us</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((i) => (
               <div key={i} className="glass p-8 rounded-xl text-left border border-white/5 hover:border-pink-500/30 transition duration-300">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                            <span className="font-bold text-sm">U{i}</span>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold text-white">Happy User {i}</h4>
                        <div className="flex text-yellow-400 text-sm">★★★★★</div>
                     </div>
                  </div>
                  <p className="text-gray-400 italic">"The service was incredible! I found a trusted caretaker within minutes. Highly recommended for anyone needing support."</p>
               </div>
            ))}
         </div>
         
         <div className="flex flex-wrap justify-center gap-8">
            <div className="glass px-10 py-6 rounded-2xl border border-white/5">
                <h3 className="text-3xl font-bold text-blue-400">1000+</h3>
                <p className="text-gray-400 mt-1">Trusted Caretakers</p>
            </div>
            <div className="glass px-10 py-6 rounded-2xl border border-white/5">
                <h3 className="text-3xl font-bold text-pink-400">5000+</h3>
                <p className="text-gray-400 mt-1">Happy Families</p>
            </div>
            <div className="glass px-10 py-6 rounded-2xl border border-white/5">
                <h3 className="text-3xl font-bold text-purple-400">24/7</h3>
                <p className="text-gray-400 mt-1">Support Available</p>
            </div>
         </div>
      </section>
    </div>
  );
}
