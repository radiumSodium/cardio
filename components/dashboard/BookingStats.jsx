"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";

export default function BookingStats({ role }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  
  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      try {
        const res = await fetch(`/api/stats?role=${role}&userId=${role === 'admin' ? '' : user.uid}`);
        const data = await res.json();
        if (data && !data.error) {
            setStats(data);
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    }
    fetchStats();
  }, [user, role]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatsCard title="Total Bookings" value={stats.total} color="bg-blue-500/10 text-blue-400" />
      <StatsCard title="Pending" value={stats.pending} color="bg-yellow-500/10 text-yellow-400" />
      <StatsCard title="Confirmed" value={stats.confirmed} color="bg-green-500/10 text-green-400" />
      <StatsCard title="Completed" value={stats.completed} color="bg-purple-500/10 text-purple-400" />
      <StatsCard title="Cancelled" value={stats.cancelled} color="bg-red-500/10 text-red-400" />
    </div>
  );
}

function StatsCard({ title, value, color }) {
  return (
    <Card className={`border-white/10 glass`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-4xl font-black ${color.split(' ')[1]}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
