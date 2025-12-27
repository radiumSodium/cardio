"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ServiceManager({ allowDelete }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerHour: "",
    image: "",
    category: "General"
  });

  const fetchServices = async () => {
    try {
      // Assuming a public GET endpoint exists or using the one we have
      // Wait: app/api/services/route.js currently only has POST/DELETE.
      // We should use the public getServices helper or add GET to the route.
      // Actually, standard usually is GET /api/services. 
      // Let's assume we can fetch from the public page logic or we add GET to route.
      // I'll add GET to app/api/services/route.js in next step if it's missing, 
      // for now assuming it exists or I'll implement it.
      // To connect to DB directly is server side. Client side needs API.
      // Let's fetch from a new endpoint or update the existing one. 
      // For now I'll just use a placeholder text if empty but I should implement GET.
      
      const res = await fetch('/api/services'); 
      // Note: I need to implement GET in /app/api/services/route.js!
      if(res.ok) {
          const data = await res.json();
          setServices(data);
      }
    } catch (error) {
        console.error("Error fetching services", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/services', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            toast.success("Service added successfully");
            setFormData({ name: "", description: "", pricePerHour: "", image: "", category: "General" });
            fetchServices();
        } else {
            toast.error("Failed to add service");
        }
    } catch (error) {
        toast.error("Error creating service");
    }
  };

  const handleDelete = async (id) => {
      if(!confirm("Are you sure?")) return;
      try {
        const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
        if(res.ok) {
            toast.success("Service deleted");
            fetchServices();
        } else {
            toast.error("Failed to delete");
        }
      } catch (error) {
        toast.error("Delete failed");
      }
  };

  return (
    <div className="space-y-8">
        <Card className="glass border-white/10 text-white">
            <CardHeader><CardTitle>Add New Service</CardTitle></CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Service Name</Label>
                            <Input 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="bg-slate-900 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Price Per Hour</Label>
                            <Input 
                                type="number"
                                value={formData.pricePerHour} 
                                onChange={e => setFormData({...formData, pricePerHour: e.target.value})}
                                className="bg-slate-900 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input 
                                value={formData.image} 
                                onChange={e => setFormData({...formData, image: e.target.value})}
                                className="bg-slate-900 border-white/10"
                                required
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>Category</Label>
                            <Input 
                                value={formData.category} 
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                className="bg-slate-900 border-white/10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea 
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="bg-slate-900 border-white/10"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">Add Service</Button>
                </form>
            </CardContent>
        </Card>

        {allowDelete && (
            <Card className="glass border-white/10 text-white">
                <CardHeader><CardTitle>Manage Services</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {services.map(service => (
                            <div key={service._id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5">
                                <div>
                                    <h4 className="font-bold">{service.name}</h4>
                                    <p className="text-sm text-slate-400">${service.pricePerHour}/hr</p>
                                </div>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(service._id)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
