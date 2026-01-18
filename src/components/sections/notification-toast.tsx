"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const claimsData = [
  { name: "Michael T.", amount: "$750" },
  { name: "Emily R.", amount: "$750" },
  { name: "David S.", amount: "$750" },
  { name: "Sarah J.", amount: "$750" },
  { name: "James L.", amount: "$750" },
];

/**
 * NotificationToast component
 * Pixel perfect reproduction of the floating social proof toast.
 * Positioned: fixed top-4, left-1/2, -translate-x-1/2.
 */
export default function NotificationToast() {
  const [claimIndex, setClaimIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Change content and fade in after a short delay
      setTimeout(() => {
        setClaimIndex((prev) => (prev + 1) % claimsData.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(cycleInterval);
  }, []);

  const currentClaim = claimsData[claimIndex];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs flex justify-center pointer-events-none">
      <div
        className={`bg-white rounded-full px-5 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-2 transition-all duration-500 ease-out border border-[rgba(15,23,42,0.05)] pointer-events-auto ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{
          height: "40px",
          backgroundColor: "#FFFFFF"
        }}
      >
        <Sparkles 
          size={16} 
          className="text-[#FBBF24] fill-[#FBBF24] flex-shrink-0" 
        />
        <span className="text-[14px] leading-[20px] tracking-tight whitespace-nowrap text-[#0F172A] font-normal font-sans">
          <span className="font-semibold">{currentClaim.name}</span> claimed {currentClaim.amount}!
        </span>
      </div>
    </div>
  );
}