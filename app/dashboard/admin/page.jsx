"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const res = await fetch("/api/bookings");
        if (res.ok) {
            const data = await res.json();
            setRecentBookings(data.slice(0, 5));
            const revenue = data.filter(b => b.paymentStatus === 'paid').reduce((acc, b) => acc + b.totalCost, 0);
            setStats({ users: 50, bookings: data.length, revenue });
        }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-blue-400">{stats.bookings}</p>
            </CardContent>
        </Card>
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-green-400">৳ {stats.revenue}</p>
            </CardContent>
        </Card>
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-pink-400">{stats.users}</p>
            </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/5 mt-8">
        <CardHeader>
          <CardTitle className="text-white">Recent Payment Histories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead className="text-gray-400">Customer</TableHead>
                <TableHead className="text-gray-400">Service</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking._id} className="border-white/5">
                    <TableCell className="text-gray-300 font-mono text-xs">{booking.userId}</TableCell>
                    <TableCell className="text-white font-medium">{booking.serviceName}</TableCell>
                    <TableCell className="text-gray-300">৳ {booking.totalCost}</TableCell>
                    <TableCell>
                        <Badge className={`${booking.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'} border-0`}>
                            {booking.paymentStatus}
                        </Badge>
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
