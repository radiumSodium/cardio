"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function CaretakerDashboard() {
  const { dbUser } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
        const res = await fetch("/api/bookings");
        if (res.ok) {
            const data = await res.json();
            // Caretaker sees all for now, in production filter by assignment
            setJobs(data.filter((b: any) => b.status === 'confirmed'));
        }
    }
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Caretaker Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-blue-400">{jobs.length}</p>
            </CardContent>
        </Card>
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-green-400">0</p>
            </CardContent>
        </Card>
        <Card className="glass border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Provider Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-yellow-400">5.0</p>
            </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/5 mt-8">
        <CardHeader>
          <CardTitle className="text-white">Active Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead className="text-gray-400">Service</TableHead>
                <TableHead className="text-gray-400">Location</TableHead>
                <TableHead className="text-gray-400">Duration</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id} className="border-white/5">
                    <TableCell className="text-white font-medium">{job.serviceName}</TableCell>
                    <TableCell className="text-gray-300 text-xs">
                        {job.location?.district}, {job.location?.division}
                    </TableCell>
                    <TableCell className="text-gray-300">{job.duration}</TableCell>
                    <TableCell>
                        <Badge className="bg-blue-500/20 text-blue-400 border-0 capitalize">
                            {job.status}
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
