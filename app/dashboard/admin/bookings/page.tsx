"use client";

import { useAuth } from "@/lib/authContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // Assuming sonner or generic toast, or just alert

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
       try {
         const res = await fetch("/api/bookings");
         if (res.ok) {
           const data = await res.json();
           setBookings(data);
         }
       } catch (error) {
         console.error("Failed to fetch bookings", error);
       } finally {
         setFetching(false);
       }
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
      try {
          const res = await fetch(`/api/bookings/${bookingId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: newStatus })
          });
          if (res.ok) {
              setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
              toast.success(`Booking ${newStatus} successfully`);
          } else {
              toast.error("Failed to update status");
          }
      } catch (error) {
          console.error("Update failed", error);
          toast.error("An error occurred during update");
      }
  };

  if (fetching) return <div className="text-center pt-20 text-white">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Manage Bookings</h1>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400">Service</TableHead>
                <TableHead className="text-gray-400">Customer (UID)</TableHead>
                <TableHead className="text-gray-400">Duration</TableHead>
                <TableHead className="text-gray-400">Cost</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{booking.serviceName}</TableCell>
                  <TableCell className="text-gray-300 text-xs truncate max-w-[100px]" title={booking.userId}>{booking.userId}</TableCell>
                  <TableCell className="text-gray-300">{booking.duration}</TableCell>
                  <TableCell className="text-gray-300">৳ {booking.totalCost}</TableCell>
                  <TableCell>
                    <Badge className={`${
                      booking.status === 'confirmed' ? 'bg-green-500' : 
                      booking.status === 'cancelled' ? 'bg-red-500' : 
                      booking.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                    } text-white capitalize`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select onValueChange={(val) => handleStatusChange(booking._id, val)} defaultValue={booking.status}>
                      <SelectTrigger className="w-[130px] bg-slate-900 border-white/10 text-white h-8 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
