"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import NotificationToast from './notification-toast';

export default function RewardCard() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

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
    <div className="min-h-screen bg-[#F2F4F8] flex flex-col items-center justify-center px-4 py-8 sm:py-12 font-sans antialiased text-[#263140] safe-top safe-bottom">
      <NotificationToast />

      <div className="w-full max-w-[380px] bg-white rounded-[40px] shadow-[0_12px_60px_-15px_rgba(0,0,0,0.2)] border border-[#0F172A]/5 overflow-hidden transition-all duration-300">
        <div className="w-full bg-white flex items-center justify-center pt-10 pb-4 px-6">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/85fd72e3-8a04-40a8-a355-77cd6ec71c84/costco-logo-DKVkkWvk-1-1-1769597835852.webp?width=8000&height=8000&resize=contain" 
              alt="Costco Wholesale" 
              width={168} 
              height={112} 
              className="h-28 w-auto object-contain"
              priority
            />
        </div>

        <div className="text-center px-6 pb-6">
          <h1 className="text-[44px] sm:text-[48px] font-bold text-[#005DAA] mb-1 leading-none tracking-tight">
            $750
          </h1>
          <p className="text-[#65758B] font-semibold tracking-widest uppercase text-[14px]">
            Costco Gift Card
          </p>
        </div>

        <div className="px-6 mb-4">
          <div className="flex items-center justify-center gap-2 bg-[#EF4444]/8 text-[#EF4444] px-4 py-2 rounded-[20px] border border-[#EF4444]/10">
            <Clock size={16} className="w-4 h-4" />
            <span className="text-[14px] font-bold">Offer expires in {formattedTime}</span>
          </div>
        </div>

        <div className="mx-6 mb-6 bg-[#F8FAFC] rounded-[32px] p-6 border border-[#0F172A]/5">
          <div className="space-y-4">
            {[
              "Click The Button Below",
              "Enter Your Basic Info",
              "Complete 4-5 Offers",
              "Claim Your Reward"
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#005DAA] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white font-bold text-[14px]">{index + 1}</span>
                </div>
                <span className="text-[#0F172A] font-semibold text-[15px]">{text}</span>
              </div>
            ))}
          </div>
        </div>

          <div className="px-6 pb-8">
            <a 
              href="https://trkfy.org/aff_c?offer_id=941&aff_id=95618"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-[#005DAA] py-5 px-6 text-[16px] font-bold text-white transition-all hover:bg-[#005DAA]/90 focus:outline-none focus:ring-4 focus:ring-[#005DAA]/20 active:scale-[0.97] shadow-lg shadow-[#005DAA]/20"
            >
              CLAIM YOUR GIFT CARD
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
      </div>
    </div>
  );
}