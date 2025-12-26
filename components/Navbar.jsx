"use client";
import Link from "next/link";
import { useAuth } from "../lib/authContext";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="glass fixed w-full z-50 top-0 left-0 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Care.xyz
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition text-sm font-medium">
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-white/10 hover:bg-white/5 overflow-hidden">
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 text-sm font-bold text-white uppercase">
                      {user.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : <FaUserCircle size={24} className="text-gray-400" />}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass border-white/10 text-white" align="end" sideOffset={10}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer w-full py-2 hover:bg-white/5 transition-colors">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-500/10 py-2"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 h-9 px-6 text-sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-white outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden absolute w-full bg-slate-950/95 glass border-b border-white/10 transition-all duration-300 ease-in-out backdrop-blur-2xl overflow-hidden", 
        isOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-gray-200">
              {link.name}
            </Link>
          ))}
          
          

          {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-gray-200">Dashboard</Link>
                <Button onClick={() => { logout(); setIsOpen(false); }} variant="destructive">Logout</Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full px-12">Login</Button>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}
