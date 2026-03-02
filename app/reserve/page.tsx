"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SKY_SPOTS } from "../lib/spots"; // 🌟 共通化したデータを使用

export default function ReservePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get("id")) || 1;
  const spot = SKY_SPOTS.find(s => s.id === id) || SKY_SPOTS[0];

  const [timeProgress, setTimeProgress] = useState(50);
  const [bgStyle, setBgStyle] = useState("");

  useEffect(() => {
    let color = "";
    if (timeProgress < 30) color = "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
    else if (timeProgress < 60) color = "linear-gradient(to bottom, #f83600 0%, #f9d423 100%)";
    else if (timeProgress < 85) color = "linear-gradient(to bottom, #6a11cb 0%, #2575fc 100%)";
    else color = "linear-gradient(to bottom, #09203f 0%, #537895 100%)";
    setBgStyle(color);
  }, [timeProgress]);

  // ☀️ 太陽・月の位置を計算（スライダー 0-100 に連動）
  const celestialX = timeProgress; // 0% - 100%
  const celestialY = Math.sin((timeProgress / 100) * Math.PI) * 50; // 放物線を描く

  return (
    <div 
      className="min-h-screen w-full transition-all duration-1000 ease-in-out flex flex-col p-8 text-white font-sans overflow-hidden relative"
      style={{ background: bgStyle }}
    >
      {/* ☀️ 天体アニメーションレイヤー */}
      <div 
        className="absolute text-5xl transition-all duration-500 ease-out pointer-events-none"
        style={{ 
          left: `${celestialX}%`, 
          top: `${60 - celestialY}%`,
          filter: "drop-shadow(0 0 20px white)",
          opacity: 0.8
        }}
      >
        {timeProgress < 70 ? "☀️" : "🌙"}
      </div>

      {/* 🔙 戻る */}
      <button onClick={() => router.back()} className="relative z-10 mb-8 self-start bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest">
        ← BACK TO SKY
      </button>

      <div className="relative z-10 flex-grow flex flex-col justify-end pb-12">
        <div className="mb-12">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-2xl">
            {spot.icon}
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 leading-none">{spot.name}</h1>
          <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px]">{spot.location}</p>
        </div>

        {/* 🕒 インテリジェント・タイムセレクター */}
        <div className="bg-black/20 backdrop-blur-3xl p-8 rounded-[40px] border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Reserved Slot</span>
              <span className="text-5xl font-black italic tabular-nums leading-none">
                {Math.floor(12 + (timeProgress / 100) * 12)}:00
              </span>
            </div>
            <div className="h-12 w-[2px] bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Price</span>
              <span className="text-2xl font-black block">¥3,500</span>
            </div>
          </div>

          <div className="relative h-12 flex items-center">
            <input 
              type="range" 
              min="0" max="100" 
              value={timeProgress}
              onChange={(e) => setTimeProgress(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
            />
          </div>
          
          <div className="flex justify-between mt-4 text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">
            <span>Daylight</span>
            <span>Sunset</span>
            <span>Night</span>
          </div>
        </div>

        <button 
          className="mt-8 w-full bg-white text-black py-6 rounded-[28px] font-black text-xl shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 transition-all hover:bg-opacity-90"
          onClick={() => alert(`Reserved: ${spot.name} at ${Math.floor(12 + (timeProgress / 100) * 12)}:00`)}
        >
          CONFIRM RESERVATION
        </button>
      </div>
    </div>
  );
}