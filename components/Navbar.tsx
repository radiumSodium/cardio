"use client";
import Link from "next/link";
import { useAuth } from "../lib/authContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass fixed w-full z-50 top-0 left-0 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Care.xyz
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/#services" className="text-gray-300 hover:text-white transition">Services</Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400 truncate max-w-[150px]">{user.displayName || user.email}</span>
                  <Button onClick={() => logout()} variant="destructive" size="sm">Logout</Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden absolute w-full bg-slate-900/95 glass border-b border-white/10 transition-all duration-300 ease-in-out backdrop-blur-xl", 
        isOpen ? "top-16 opacity-100" : "-top-96 opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center space-y-6 py-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg text-gray-200">Home</Link>
          <Link href="/#services" onClick={() => setIsOpen(false)} className="text-lg text-gray-200">Services</Link>
          {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-gray-200">Dashboard</Link>
                <div className="text-sm text-gray-400">{user.displayName || user.email}</div>
                <Button onClick={() => { logout(); setIsOpen(false); }} variant="destructive">Logout</Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}
