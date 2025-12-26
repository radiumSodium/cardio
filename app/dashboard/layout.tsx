"use client";

import { useAuth } from "@/lib/authContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Home 
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, dbUser, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <div className="text-center pt-20 text-white">Loading...</div>;
  if (!user || !dbUser) return <div className="text-center pt-20 text-white">Access Denied</div>;

  const role = dbUser.role;

  const links = [
    { name: "Overview", href: `/dashboard/${role}`, icon: LayoutDashboard },
    { name: "Home", href: "/", icon: Home },
  ];

  if (role === "user") {
    links.push({ name: "My Bookings", href: "/dashboard/user/bookings", icon: Calendar });
  } else if (role === "admin") {
    links.push({ name: "All Bookings", href: "/dashboard/admin/bookings", icon: Calendar });
    links.push({ name: "Manage Users", href: "/dashboard/admin/users", icon: Users });
  } else if (role === "caretaker") {
    links.push({ name: "Assigned Jobs", href: "/dashboard/caretaker", icon: Calendar });
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Care.xyz
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{role} Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-slate-800 text-white border border-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={() => logout()}
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
