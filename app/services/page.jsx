import ServiceCard from "@/components/ServiceCard";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export const metadata = {
  title: "Our Services | Care.xyz",
  description: "Explore our wide range of professional caregiving services including baby care, elderly support, nursing, and more.",
};

async function getServices() {
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

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-slate-950 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Professional Care Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide a comprehensive range of caregiving solutions tailored to your family's unique needs. 
            All our caregivers are verified and experienced.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
        
        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No services found. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
