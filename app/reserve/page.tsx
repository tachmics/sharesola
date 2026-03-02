"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

// 1. メインのページコンポーネント
export default function ReservePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="animate-pulse">Loading SOLA...</p>
      </div>
    }>
      <ReservationContent />
    </Suspense>
  );
}

// 2. 実際の予約ロジック（元のコードの中身をここに集約）
function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLからパラメータを取得
  const date = searchParams.get("date") || "2024-05-20";
  const time = searchParams.get("time") || "19:00";
  const color = searchParams.get("color") || "#FFD700";

  const handleConfirm = () => {
    alert("予約が完了しました！当日は神楽坂でお待ちしております。");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24">
      <button 
        onClick={() => router.back()}
        className="mb-8 flex items-center text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        戻る
      </button>

      <div className="max-w-md mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            SOLA Reservation
          </h1>
          <p className="text-zinc-400 mt-2">選択した光の柱を予約します</p>
        </header>

        <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-zinc-800 rounded-2xl">
              <MapPin className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 text-left">Location</p>
              <p className="text-lg font-medium">神楽坂エリア (Kagurazaka)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Calendar className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 text-left">Date</p>
                <p className="text-lg font-medium">{date}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Clock className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 text-left">Time</p>
                <p className="text-lg font-medium">{time}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-3 text-left">Selected Pillar Color</p>
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-zinc-300">{color.toUpperCase()}</span>
            </div>
          </div>
        </section>

        <button
          onClick={handleConfirm}
          className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>予約を確定する</span>
        </button>
      </div>
    </main>
  );
}