"use client";

import BookingStats from "@/components/dashboard/BookingStats";
import BookingList from "@/components/dashboard/BookingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceManager from "@/components/dashboard/ServiceManager";

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">My Dashboard</h2>
        <p className="text-gray-400">Track your bookings and requests.</p>
      </div>

      <BookingStats role="user" />

      <Tabs defaultValue="bookings" className="w-full">
         <TabsList className="bg-slate-900 border border-white/10">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="request">Request Service</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="mt-6">
             <BookingList role="user" />
        </TabsContent>
         <TabsContent value="request" className="mt-6">
             <div className="max-w-2xl">
                 <h3 className="text-xl font-bold text-white mb-4">Propose a New Service Type</h3>
                 <p className="text-sm text-gray-400 mb-6">Can't find what you're looking for? Suggest a new service category.</p>
                 <ServiceManager allowDelete={false} />
             </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
