"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validatePassword = (pass: string) => {
    return pass.length >= 6 && /[A-Z]/.test(pass) && /[a-z]/.test(pass);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 chars, contain 1 uppercase and 1 lowercase letter.");
      return;
    }

    try {
      const user = await registerUser(formData.email, formData.password, formData.name);
      
      // Save to MongoDB
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          name: formData.name,
          contact: formData.contact,
          nid: formData.nid,
        })
      });

      if (!res.ok) throw new Error("Failed to save user data");

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 pb-20 px-4">
      <Card className="w-full max-w-lg glass border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Join Care.xyz to find or provide trusted care services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact No</Label>
                <Input id="contact" placeholder="+8801..." value={formData.contact} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nid">NID Number</Label>
              <Input id="nid" placeholder="National ID" value={formData.nid} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="bg-slate-900/50 border-white/10 text-white"/>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 mt-4">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-400 hover:underline">
                Login
              </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
