import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import mongoose from "mongoose";

export async function generateMetadata(props) {
  const params = await props.params;
  
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return { title: 'Service Not Found' };
  }

  await dbConnect();
  const service = await Service.findById(params.id);

  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.name} - Care.xyz`,
    description: service.description,
  };
}

export default async function ServiceDetailsPage(props) {
  const params = await props.params;

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await dbConnect();
  const service = await Service.findById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="relative h-[400px] w-full">
          <Image 
            src={service.image} 
            alt={service.name} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {service.name}
            </h1>
          </div>
        </div>

        <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400">Description</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {service.description}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our {service.name} package ensures the highest quality of care. All our caretakers are verified, trained, and ready to valuable support to your family.
            </p>
            
            <div className="pt-8">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose This Service?</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Verified and experienced professionals</li>
                <li>24/7 Support and emergency availability</li>
                <li>Flexible booking durations</li>
                <li>Secure and transparent process</li>
              </ul>
            </div>
          </div>

          <div className="glass bg-slate-800/50 p-6 rounded-xl h-fit border border-white/5 space-y-6 sticky top-24">
            <div className="text-center">
              <p className="text-gray-400 mb-1">Service Rate</p>
              <p className="text-3xl font-bold text-white">{service.pricePerHour} BDT <span className="text-sm font-normal text-gray-500">/ hour</span></p>
            </div>
            
            <div className="h-px bg-white/10 w-full"></div>

            <Link 
              href={`/booking/${service._id}`} 
              className="w-full block"
            >
              <Button className="w-full py-6 text-lg shadow-lg shadow-pink-500/20 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700">
                Book Now
              </Button>
            </Link>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              * Login required to book this service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
