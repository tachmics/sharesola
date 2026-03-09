"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Thermometer,
  Wind,
  Flame,
  Utensils,
  Camera,
  Video,
  Tent,
  Sun,
  MapPin,
} from "lucide-react";
import { FREE_SPOTS } from "./lib/spots";

export default function LandingPage() {
  const router = useRouter();

  const quickFilters = [
    {
      id: "sauna",
      label: "屋上サウナ",
      description: "ととのう導線と外気浴を重視した屋上サウナ。",
      icons: [Thermometer, Wind],
    },
    {
      id: "bbq",
      label: "BBQ・パーティー",
      description: "手ぶらBBQや少人数パーティーに最適なルーフトップ。",
      icons: [Flame, Utensils],
    },
    {
      id: "shooting",
      label: "スチール・動画撮影",
      description: "空抜け・夜景・俯瞰ショットに対応した撮影向けスペース。",
      icons: [Camera, Video],
    },
    {
      id: "camp",
      label: "キャンプ・チル",
      description: "焚き火OK、ハンモックOKのチルアウト向け屋上。",
      icons: [Tent, Sun],
    },
  ];

  const highlightSpots = FREE_SPOTS.map((spot) => ({
    ...spot,
    price: "¥3,000/h〜",
    area: "飯田橋",
    tags: ["#展望最高", "#貸切サウナ", "#夜景◎"],
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* ヘッダー */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="text-lg font-semibold tracking-tight">
            share<span className="text-sky-500">sora</span>
          </div>
          <button
            onClick={() => router.push("/ar")}
            className="rounded-full border border-slate-200/70 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
          >
            ARで屋上を探す
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 space-y-20">
        {/* ヒーロー + AR 導線 */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div className="space-y-7">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
              屋上レンタルスペース専門ポータル
              <br />
              <span className="text-sky-500 tracking-tighter">「シェアソラ」</span>で、
              <span className="whitespace-nowrap">空の時間を予約</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-xl">
              サウナ、BBQ、撮影、チルアウト。
              <br className="hidden md:block" />
              あなたの「やりたいこと」から、都心の屋上スペースを一括検索できます。
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/ar")}
                className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600 px-7 py-4 text-sm md:text-base font-semibold text-white shadow-[0_18px_45px_rgba(15,118,205,0.45)] hover:shadow-[0_22px_60px_rgba(15,118,205,0.7)] hover:-translate-y-1 active:scale-[0.98] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-70" />
                <span className="relative z-10">ARで近くの屋上を探す</span>
              </button>
              <p className="text-xs md:text-sm text-slate-500">
                見上げるだけで、空きスペースが見つかる。
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-slate-50 p-6 md:p-7 shadow-xl shadow-slate-200/50 border border-slate-200/60">
            <h2 className="mb-5 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              目的から選ぶ（クイック検索）
            </h2>
            <div className="grid grid-cols-2 gap-3.5">
              {quickFilters.map((item) => (
                <button
                  key={item.id}
                  className="flex flex-col items-start gap-2 rounded-2xl bg-white px-3.5 py-3.5 text-left shadow-sm ring-1 ring-slate-200/60 hover:shadow-md hover:-translate-y-1 hover:ring-sky-100 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-1.5 text-sky-500">
                    {item.icons.map((Icon, idx) => (
                      <span
                        key={idx}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50"
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] md:text-xs font-semibold text-slate-900 tracking-tight">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 注目のルーフトップ */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
              注目のルーフトップ
            </h2>
            <button className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:-translate-y-0.5 transition-all">
              すべて見る
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {highlightSpots.map((spot) => (
              <div
                key={spot.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 hover:-translate-y-1 transition-all"
              >
                {spot.images?.[0] && (
                  <div className="relative h-40 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={spot.images[0]}
                      alt={spot.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-slate-50 backdrop-blur-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{spot.area}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base font-semibold tracking-tight text-slate-900">
                        {spot.name}
                      </h3>
                      {spot.description && (
                        <p className="text-[11px] leading-snug text-slate-500 line-clamp-2">
                          {spot.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs space-y-0.5">
                      <p className="font-semibold text-slate-900 tracking-tight">
                        {spot.price}
                      </p>
                      <p className="text-[10px] text-slate-500">税込・目安</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {spot.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-1 flex gap-2">
                    <button
                      onClick={() => router.push(`/reserve?id=${spot.id}`)}
                      className="flex-1 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      予約内容を確認
                    </button>
                    <button
                      onClick={() => router.push("/ar")}
                      className="flex-1 rounded-full border border-slate-300 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      ARで位置を確認
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center">
        <p className="text-[11px] text-slate-400 tracking-wide">
          © 2026 Sharesola. 屋上レンタルスペース専門ポータル「シェアソラ」
        </p>
      </footer>
    </div>
  );
}