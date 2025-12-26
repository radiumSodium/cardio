"use client";

import { useAuth } from "@/lib/authContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
       try {
         // We might need a separate API route for listing all users which requires admin check
         // reusing fetch("/api/users") if implemented? 
         // For now, let's create a specific admin route or just assume /api/users returns all if no ID?
         // My current /api/users is POST only. /api/users/[id] is GET.
         // I need to add GET to /api/users to list all users.
         
         const res = await fetch("/api/users");
         if (res.ok) {
           const data = await res.json();
           // if data is array
           if (Array.isArray(data)) {
               setUsers(data);
           }
         }
       } catch (error) {
         console.error("Failed to fetch users", error);
       } finally {
         setFetching(false);
       }
    }
    fetchUsers();
  }, []);

  if (fetching) return <div className="text-center pt-20 text-white">Loading users...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">All Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{u.name}</TableCell>
                  <TableCell className="text-gray-300">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-blue-400 border-blue-400 capitalize">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(u.createdAt).toLocaleDateString()}
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
