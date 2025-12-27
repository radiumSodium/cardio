"use client";

import { Check, Circle, Clock, X } from "lucide-react";

export default function BookingTimeline({ status }) {
  const steps = [
    { id: "pending", label: "Pending", icon: Clock },
    { id: "confirmed", label: "Confirmed", icon: Check },
    { id: "completed", label: "Completed", icon: Check }
  ];
  
  // Handle cancelled separately or as a specific state?
  // If cancelled, show red X.
  if (status === "cancelled") {
      return (
          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 w-fit">
              <X size={16} />
              <span className="font-bold uppercase text-xs">Booking Cancelled</span>
          </div>
      );
  }

  const currentIdx = steps.findIndex(s => s.id === status);
  // specific logic: if confirmed, pending is done.
  // if completed, confirmed and pending are done.
  
  return (
    <div className="flex items-center w-full max-w-md">
      {steps.map((step, idx) => {
        const isCompleted = currentIdx >= idx;
        const isCurrent = currentIdx === idx;
        const Icon = step.icon;
        
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none relative">
            <div className={`
                flex flex-col items-center gap-2 z-10 
                ${isCompleted ? "text-blue-400" : "text-slate-600"}
            `}>
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${isCompleted ? "bg-blue-500 border-blue-500 text-white" : "bg-slate-900 border-slate-700"}
                    ${isCurrent ? "ring-4 ring-blue-500/20" : ""}
                    transition-all duration-500
                `}>
                    <Icon size={14} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
                <div className={`
                    h-[2px] w-full absolute top-4 left-0 -z-0 translate-x-1/2
                    ${currentIdx > idx ? "bg-blue-500" : "bg-slate-800"}
                    transition-all duration-500
                `} style={{ width: 'calc(100% - 2rem)', left: '2rem' }}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
