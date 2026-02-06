"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";

const claimsData = [
  { name: "Michael T.", amount: "$750" },
  { name: "Emily R.", amount: "$750" },
  { name: "David S.", amount: "$750" },
  { name: "Sarah J.", amount: "$750" },
  { name: "James L.", amount: "$750" },
  { name: "Jessica W.", amount: "$750" },
  { name: "Brandon K.", amount: "$750" },
  { name: "Amanda H.", amount: "$750" },
  { name: "Tyler M.", amount: "$750" },
  { name: "Rachel P.", amount: "$750" },
  { name: "Kevin D.", amount: "$750" },
  { name: "Lauren B.", amount: "$750" },
  { name: "Chris N.", amount: "$750" },
  { name: "Ashley G.", amount: "$750" },
  { name: "Ryan F.", amount: "$750" },
  { name: "Megan C.", amount: "$750" },
  { name: "Daniel V.", amount: "$750" },
  { name: "Stephanie A.", amount: "$750" },
  { name: "Andrew Z.", amount: "$750" },
  { name: "Nicole E.", amount: "$750" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function NotificationToast() {
  const [currentClaim, setCurrentClaim] = useState(claimsData[0]);
  const [isVisible, setIsVisible] = useState(false);
  const shuffledRef = useRef<typeof claimsData>(shuffleArray(claimsData));
  const indexRef = useRef(0);

  const getNextClaim = useCallback(() => {
    const idx = indexRef.current;
    const claim = shuffledRef.current[idx];
    indexRef.current = idx + 1;
    if (indexRef.current >= shuffledRef.current.length) {
      shuffledRef.current = shuffleArray(claimsData);
      indexRef.current = 0;
    }
    return claim;
  }, []);

  useEffect(() => {
    const DISPLAY_DURATION = 5000;
    const GAP_DURATION = 5000;
    const STOP_AFTER = 5 * 60 * 1000;
    const startTime = Date.now();
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const initialDelay = setTimeout(() => {
      setCurrentClaim(getNextClaim());
      setIsVisible(true);

      const scheduleNext = () => {
        if (Date.now() - startTime >= STOP_AFTER) return;

        const hideTimeout = setTimeout(() => {
          setIsVisible(false);

          const showTimeout = setTimeout(() => {
            if (Date.now() - startTime >= STOP_AFTER) return;
            setCurrentClaim(getNextClaim());
            setIsVisible(true);
            scheduleNext();
          }, GAP_DURATION);
          timeouts.push(showTimeout);
        }, DISPLAY_DURATION);
        timeouts.push(hideTimeout);
      };

      scheduleNext();
    }, 3000);
    timeouts.push(initialDelay);

    return () => timeouts.forEach(clearTimeout);
  }, [getNextClaim]);

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[340px] px-4 flex justify-center pointer-events-none">
      <div
        className={`bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/20 pointer-events-auto ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
        }`}
        style={{
          height: "48px",
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