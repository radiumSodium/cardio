"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/authContext";

import BookingTimeline from "./BookingTimeline";
import { useRouter } from "next/navigation";

export default function BookingList({ role, limit }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchBookings() {
      if (!user) return;
      try {
        let url = `/api/bookings?`;
        // Admin gets all, others get theirs
        if (role === 'user') url += `userId=${user.uid}`;
        if (role === 'caretaker') url += `caretakerId=${user.uid}`; 
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (Array.isArray(data)) {
            setBookings(limit ? data.slice(0, limit) : data);
        }
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchBookings();
  }, [user, role, limit]);
  
  const handlePay = async (booking) => {
    try {
        const res = await fetch('/api/create-checkout-session', {
             method: 'POST',
             body: JSON.stringify({
                 bookingId: booking._id,
                 serviceName: booking.serviceName,
                 amount: booking.totalCost
             }),
             headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            toast.error("Payment initiation failed");
        }
    } catch (error) {
        toast.error("Error starting payment");
    }
  };

  const updateStatus = async (id, newStatus) => {
    // ... existing updateStatus logic ...
    try {
        const res = await fetch(`/api/bookings/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            toast.success("Status updated");
            fetchBookings();
        } else {
            toast.error("Failed to update");
        }
    } catch (error) {
        toast.error("Error updating status");
    }
  };

  if (loading) return <div className="text-white">Loading bookings...</div>;

  return (
    <Card className="glass border-white/10 text-white">
      <CardHeader>
         <CardTitle className="text-xl">
            {limit ? "Recent Bookings" : "All Bookings"}
         </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
            <p className="text-slate-400">No bookings found.</p>
        ) : (
            <Table>
            <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-slate-400">Service & Progress</TableHead>
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Total</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => (
                <TableRow key={booking._id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                        <div className="space-y-3 py-2">
                           <div className="font-medium text-lg text-white">{booking.serviceName}</div>
                           <BookingTimeline status={booking.status} />
                        </div>
                    </TableCell>
                    <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <div className="font-bold text-lg">${booking.totalCost}</div>
                        <div className={`text-xs uppercase font-bold tracking-widest ${booking.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {booking.paymentStatus}
                        </div>
                    </TableCell>
                    <TableCell>
                        <StatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell>
                     <div className="flex gap-2 items-center">
                             {role !== 'user' && (
                                <Select onValueChange={(val) => updateStatus(booking._id, val)} defaultValue={booking.status}>
                                    <SelectTrigger className="w-[110px] bg-slate-900 border-white/20 h-8 text-xs">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                             )}
                             {role === 'user' && booking.status === 'pending' && booking.status !== 'cancelled' && (
                                 <div className="flex gap-2">
                                     {booking.paymentStatus !== 'paid' && (
                                        <Button size="sm" onClick={() => handlePay(booking)} className="h-8 bg-green-600 hover:bg-green-700 text-white font-bold">
                                            Pay Now
                                        </Button>
                                     )}
                                     <Button size="sm" variant="destructive" onClick={() => updateStatus(booking._id, 'cancelled')} className="h-8 font-bold">
                                            Cancel
                                     </Button>
                                 </div>
                             )}
                         </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        completed: "bg-green-500/20 text-green-400 border-green-500/50",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.pending} uppercase tracking-wide`}>
            {status}
        </span>
    );
}
