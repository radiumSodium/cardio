"use client";

import BookingStats from "@/components/dashboard/BookingStats";
import BookingList from "@/components/dashboard/BookingList";
import ServiceManager from "@/components/dashboard/ServiceManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CaretakerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Caretaker Portal</h2>
        <p className="text-gray-400">Manage your jobs and services.</p>
      </div>

      <BookingStats role="caretaker" />

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="bg-slate-900 border border-white/10">
            <TabsTrigger value="jobs">My Assigned Jobs</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="mt-6">
            <BookingList role="caretaker" />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
             <div className="grid lg:grid-cols-2 gap-8">
                <div>
                     <h3 className="text-xl font-bold text-white mb-4">Add New Service</h3>
                     <p className="text-sm text-gray-400 mb-4">You can list new services that you provide.</p>
                     <ServiceManager allowDelete={true} />
                </div>
             </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
