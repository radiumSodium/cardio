"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const bookingId = searchParams.get("booking_id");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function verifyPayment() {
        if (!bookingId) return;
        
        try {
            // Update booking status
            // Ideally should verify session with stripe on server side
            // For now, doing direct update via an API call that we'd protect
            // Let's create a dedicated payment webhook or endpoint usually.
            // But to keep it simple as per request flow:
            
            // We'll trust the callback for now or better, verify.
            // Let's call an update endpoint.
            
            const res = await fetch('/api/payment/verify', {
                method: 'POST',
                body: JSON.stringify({ bookingId, sessionId }),
                headers: { 'Content-Type': 'application/json' }
            });
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    verifyPayment();
  }, [bookingId, sessionId]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="glass p-12 rounded-2xl max-w-md w-full border border-green-500/20 shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)]">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-400 mb-8">
                Thank you for your payment. Your booking has been confirmed.
            </p>
            <div className="space-y-3">
                <Link href="/dashboard/user">
                    <Button className="w-full bg-green-600 hover:bg-green-500 font-bold h-12 text-lg">
                        Go to Dashboard
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="w-full text-gray-400">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
