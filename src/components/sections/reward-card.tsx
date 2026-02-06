"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import NotificationToast from './notification-toast';

export default function RewardCard() {
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#F2F4F8] flex flex-col items-center justify-center px-4 py-8 font-sans antialiased text-[#263140]">
      <NotificationToast />

      <div className="w-full max-w-[320px] bg-white rounded-[32px] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.3)] border border-[#0F172A]/10 overflow-hidden">
        <div className="w-full bg-white flex items-center justify-center pt-8 pb-2 px-4">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/85fd72e3-8a04-40a8-a355-77cd6ec71c84/costco-logo-DKVkkWvk-1-1769676927619.png?width=8000&height=8000&resize=contain" 
                  alt="Costco Wholesale" 
                  width={168} 
                  height={112} 
                  className="h-28 w-auto object-contain"
                  priority
                  unoptimized
                />
        </div>

        <div className="text-center px-4 pb-4">
            <h1 className="text-[36px] font-bold text-[#000000] mb-1 leading-none tracking-tight">
              $750
            </h1>
            <p className="text-[#000000] font-semibold tracking-widest uppercase text-[12px]">
              Costco Product Reviewer
            </p>
        </div>

        <div className="px-4 mb-3">
          <div className="flex items-center justify-center gap-2 bg-[#EF4444]/10 text-[#EF4444] px-3 py-1.5 rounded-[16px]">
            <Clock size={14} className="w-3.5 h-3.5" />
            <span className="text-[12px] font-bold">Offer expires in {formattedTime}</span>
          </div>
        </div>

        <div className="mx-4 mb-4 bg-[#E4EAF1]/50 rounded-[24px] p-4">
          <div className="space-y-3">
            {[
              "Click the Button Below",
              "Enter your Basic Info",
              "Complete 4-5 Offers",
              "Claim your Reward"
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#005DAA] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-[12px]">{index + 1}</span>
                </div>
                <span className="text-[#0F172A] font-medium text-[14px]">{text}</span>
              </div>
            ))}
          </div>
        </div>

          <div className="px-4 pb-6">
            <a 
              href="https://trkfy.org/aff_c?offer_id=941&aff_id=95618"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#005DAA] py-4 px-4 text-[14px] font-bold text-white transition-all hover:bg-[#005DAA]/90 focus:outline-none focus:ring-2 focus:ring-[#005DAA] focus:ring-offset-2 active:scale-[0.98]"
            >
              START REVIEW NOW
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
      </div>
    </div>
  );
}