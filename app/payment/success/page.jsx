"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    async function verify() {
      if (!sessionId || !bookingId) return;
      
      try {
        const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, bookingId })
        });
        if (res.ok) {
            toast.success("Payment Verified! Check your dashboard.");
        }
      } catch (err) {
        console.error("Verification error", err);
      } finally {
        setVerifying(false);
      }
    }
    verify();
  }, [sessionId, bookingId]);

  return (
    <div className="text-center space-y-6 animate-fade-in-up">
        <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-white">Payment Successful!</h1>
        <p className="text-gray-400">Your booking has been confirmed.</p>
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">✅ A copy of your invoice has been sent to your email.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
                onClick={() => router.push("/dashboard/user/bookings")}
                className="bg-gradient-to-r from-blue-600 to-green-600"
            >
                View My Bookings
            </Button>
            <Button 
                variant="outline"
                onClick={() => toast.success("Invoice downloading... (Simulated)")}
                className="border-white/10 text-white hover:bg-white/5"
            >
                Download Invoice
            </Button>
        </div>
      </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
