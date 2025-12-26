"use client";

import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, DollarSign, Trash2 } from "lucide-react";

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    // TODO: Migrate to MongoDB fetching eventually
    // For now we kept saving to Firestore in BookingPage?
    // Wait, BookingPage was updated to use API route /api/bookings which saves to MongoDB!
    // So we need to fetch from MongoDB API: GET /api/bookings?userId=...
    
    // Changing implementation to fetch from MongoDB API
    async function fetchBookings() {
       try {
         const res = await fetch(`/api/bookings?userId=${user?.uid}`);
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
    
    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
        const res = await fetch(`/api/bookings/${bookingId}`, { 
            method: "DELETE" 
        });
        if (res.ok) {
            setBookings(bookings.filter(b => b._id !== bookingId));
        }
    } catch (error) {
        console.error("Error cancelling booking", error);
    }
  };

  const handlePay = async (bookingId: string) => {
      try {
          const res = await fetch("/api/create-checkout-session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ bookingId })
          });
          if (res.ok) {
              const { url } = await res.json();
              window.location.href = url;
          } else {
              alert("Payment failed to initialize");
          }
      } catch (error) {
          console.error("Payment error", error);
      }
  };

  if (loading || fetching) return <div className="text-center pt-20 text-white">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center text-gray-400 py-10 glass rounded-xl border border-white/5">
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking._id} className="glass border-white/10 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-white text-xl">{booking.serviceName || "Service"}</CardTitle>
                  <CardDescription className="text-gray-400 text-xs">
                    Booking ID: {booking._id}
                  </CardDescription>
                </div>
                <Badge className={`${
                  booking.status === 'confirmed' ? 'bg-green-500' : 
                  booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                } text-white capitalize`}>
                  {booking.status}
                </Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Duration: {booking.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>Cost: ৳ {booking.totalCost}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>
                    {booking.location.address}, {booking.location.district}, {booking.location.division}
                  </span>
                </div>
              </CardContent>
              {booking.status === 'pending' && (
                <CardFooter className="bg-slate-900/50 p-4 flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleCancel(booking._id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Cancel Booking
                  </Button>
                </CardFooter>
              )}
              {booking.status === 'confirmed' && booking.paymentStatus !== 'paid' && (
                 <CardFooter className="bg-slate-900/50 p-4 flex justify-end gap-2">
                    <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handlePay(booking._id)}
                    >
                        Pay Now
                    </Button>
                 </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
