"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceProps } from "@/components/ServiceCard";

const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];
const districts = {
  "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
  "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
  "Rajshahi": ["Rajshahi", "Bogra", "Pabna"],
  "Khulna": ["Khulna", "Jessore", "Kushtia"]
};

export default function BookingPage() {
  const { user, loading } = useAuth();
  const params = useParams();
  const router = useRouter();
  
  const [service, setService] = useState(null);
  const [fetchingService, setFetchingService] = useState(true);
  
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("hours");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Force private route
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchService() {
      if (!params.id) return;
      try {
        const res = await fetch(`/api/services/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          // map _id to id if needed, or just use as is
          setService(data);
        } else {
          setService(null);
        }
      } catch (err) {
        console.error("Failed to fetch service", err);
      } finally {
        setFetchingService(false);
      }
    }
    fetchService();
  }, [params.id]);

  if (loading || fetchingService) return <div className="text-center pt-20 text-white">Loading...</div>;
  if (!service) return <div className="text-center pt-20 text-white">Service not found</div>;

  const totalCost = (parseInt(duration || "0") * service.pricePerHour) * (durationType === "days" ? 24 : 1);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!division || !district || !address || !duration) return;

    if (!user) return;

    setIsSubmitting(true);
    try {
      // NOTE: We should eventually move this to backend /api/booking to save to MongoDB
      // For now, keeping Firebase logic as placeholder or redundant?
      // User asked for MongoDB. So we should probably POST to /api/booking
      
      // Let's create the booking via API
      // But for now, user asked to "put the services in mongo... and add a payment method"
      // I will assume we want to save booking to MongoDB. 
      // I will rewrite this to use an API route for booking creation.
      
    const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          serviceId: service._id || service.id,
          duration: `${duration} ${durationType}`,
          location: { division, district, address },
          totalCost
        })
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url; // Redirect to Stripe
      } else {
        console.error("Payment initialization failed");
      }
    } catch (error) {
      console.error("Booking failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <Card className="max-w-2xl mx-auto glass border-white/10">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Book {service.name}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Complete the form below to schedule your care service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBooking} className="space-y-6">
            
            {/* Duration Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Duration</Label>
                <Input 
                  type="number" 
                  min="1" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                  placeholder="Enter duration" 
                  className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Unit</Label>
                <Select onValueChange={setDurationType} defaultValue="hours">
                  <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location Section */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label className="text-gray-300">Division</Label>
                <Select onValueChange={setDivision}>
                  <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map(div => (
                      <SelectItem key={div} value={div}>{div}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               </div>
               <div className="space-y-2">
                <Label className="text-gray-300">District</Label>
                <Select onValueChange={setDistrict} disabled={!division}>
                  <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                     {division && districts[division]?.map(dist => (
                       <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                     ))}
                  </SelectContent>
                </Select>
               </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Full Address</Label>
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="House No, Road No, Area..." 
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500"
                required
              />
            </div>

            {/* Cost Summary */}
            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Total Estimated Cost</span>
                <span className="text-2xl font-bold text-green-400">
                   ৳ {totalCost.toLocaleString()}
                </span>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-pink-600 hover:opacity-90">
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
