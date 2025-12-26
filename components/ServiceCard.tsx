import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ServiceProps {
  _id?: string;
  id?: string; // Fallback for legacy
  name: string;
  description: string;
  image: string;
  pricePerHour: number;
}

export default function ServiceCard({ service }: { service: ServiceProps }) {
  const serviceId = service._id || service.id;
  return (
    <Card className="glass border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      <div className="relative h-56 w-full">
        <Image 
          src={service.image} 
          alt={service.name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {service.pricePerHour} BDT/hr
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold text-white">{service.name}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Link href={`/services/${serviceId}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
