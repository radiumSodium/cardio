import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Care.xyz - Trusted Care Services",
  description: "Find reliable caretakers for your loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
          <AuthProvider>
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
      </body>
    </html>
  );
}
