"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { FREE_SPOTS, getFreeSpotById, FreeSpot } from "../lib/spots";

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
  const idParam = searchParams.get("id");
  const spotId = idParam ? Number(idParam) : NaN;
  const spot: FreeSpot | undefined =
    !Number.isNaN(spotId) && spotId > 0 ? getFreeSpotById(spotId) : undefined;

  const date = searchParams.get("date") || "2024-05-20";
  const time = searchParams.get("time") || "19:00";
  const color = searchParams.get("color") || "#FFD700";

  const handleConfirm = () => {
    alert("予約が完了しました！当日は神楽坂でお待ちしております。");
    router.push("/");
  };

  // スポットが見つからない場合のエラー表示
  if (!spot) {
    return (
      <main className="min-h-screen bg-black text-white p-6 pb-24 flex flex-col">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          戻る
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">スポットが見つかりません</h1>
            <p className="text-zinc-400 text-sm">
              無効なリンクか、スポット情報が削除された可能性があります。
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors"
          >
            一覧へ戻る
          </button>
        </div>
      </main>
    );
  }

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
            {spot.name} を予約
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            選択した屋上スポットの利用時間を予約します。
          </p>
        </header>

        {/* 画像カルーセル */}
        {spot.images?.length > 0 && (
          <section className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-3">
            <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
              {spot.images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative min-w-[220px] max-w-[260px] h-40 rounded-2xl overflow-hidden snap-start bg-zinc-800/80 border border-white/10 flex-shrink-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${spot.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-zinc-800 rounded-2xl">
              <MapPin className="w-6 h-6 text-zinc-400" />
            </div>
            <div className="text-left">
              <p className="text-sm text-zinc-500">Location</p>
              <p className="text-lg font-medium">{spot.name}</p>
              {spot.distanceLabel && (
                <p className="text-xs text-zinc-500 mt-1">{spot.distanceLabel}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Calendar className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-zinc-500">Date</p>
                <p className="text-lg font-medium">{date}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Clock className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-zinc-500">Time</p>
                <p className="text-lg font-medium">{time}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 space-y-3">
            <p className="text-sm text-zinc-500 text-left">Selected Pillar Color</p>
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-zinc-300 text-sm">
                {color.toUpperCase()}
              </span>
            </div>
            {spot.description && (
              <p className="text-xs text-zinc-300 text-left leading-relaxed mt-2">
                {spot.description}
              </p>
            )}
            <div className="text-xs text-zinc-500 text-left">
              出典:{" "}
              <a
                href={spot.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-zinc-300"
              >
                {spot.sourceLabel}
              </a>
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