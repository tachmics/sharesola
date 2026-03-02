"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // 1. 変数定義を確実に行う
  const categories = [
    { label: "Business", icon: "💻", desc: "青空のワークスペース", color: "bg-blue-50" },
    { label: "Sauna", icon: "🧖‍♂️", desc: "天空のサウナ体験", color: "bg-orange-50" },
    { label: "Chill", icon: "🛋️", desc: "都会の隠れ家ラウンジ", color: "bg-emerald-50" },
    { label: "Dining", icon: "🥂", desc: "特別な日のディナー", color: "bg-purple-50" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      
      {/* --- Navbar (画像に重ねるため absolute) --- */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-6 z-[60]">
        <div className="text-xl font-black tracking-tighter italic text-white drop-shadow-md">SHARE-SORA</div>
        <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black border border-white/30 uppercase">
          Sign In
        </button>
      </nav>

      {/* 2. Hero Section: 横長比率を維持するコンテナ */}
      <section className="relative w-full bg-white">
        
        {/* 🎨 aspect-[16/9] でスマホでも「横長」を強制。h-screenを使わないことで上下の黒帯を消去 */}
        <div className="relative w-full aspect-[16/11] md:aspect-[21/9] flex items-center justify-center overflow-hidden shadow-2xl">
          <img 
            src="/hero.png" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Rooftop Beach Wide"
          />
          
          {/* 画像を明るく、文字を読みやすくするオーバーレイ */}
          <div className="absolute inset-0 bg-blue-900/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/40 z-20" />

          {/* --- ✍️ テキスト & 検索 (画像の中央に完全固定) --- */}
          <div className="relative z-30 flex flex-col items-center w-full max-w-4xl px-6 text-center">
            
            <h2 className="text-[11vw] md:text-[100px] font-black mb-3 tracking-tighter leading-[0.85] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              空に、<br /><span className="text-blue-400">遊び場を。</span>
            </h2>
            
            <p className="text-[3.5vw] md:text-xl font-bold mb-6 text-white drop-shadow-md max-w-[280px] md:max-w-2xl leading-relaxed opacity-90">
              地上40mのプライベートビーチ。
            </p>
            
            {/* 検索ユニット: 画像の中に浮かぶモダンなデザイン */}
            <div className="w-full max-w-[320px] md:max-w-xl flex flex-col md:flex-row gap-2 bg-white/20 backdrop-blur-3xl p-2 rounded-[28px] border border-white/30 shadow-2xl">
              <button 
                onClick={() => router.push('/ar')}
                className="w-full md:w-1/2 bg-blue-600 text-white py-4 rounded-[20px] font-black text-sm shadow-xl active:scale-95 transition-all"
              >
                 ✨ ARで探す
              </button>
              
              <div className="bg-white/95 rounded-[20px] flex items-center flex-1 p-1">
                <div className="flex-1 flex items-center px-4 py-2">
                  <span className="opacity-30 text-base mr-2">📍</span>
                  <span className="font-bold text-[10px] md:text-sm text-slate-400">エリアから探す</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Section: 画像のすぐ下に接続 */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900">Use Cases</h3>
          <p className="text-slate-400 font-bold text-xs tracking-widest uppercase">Explore your sky</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((item) => (
            <div key={item.label} className={`${item.color} p-10 rounded-[48px] flex flex-col items-center text-center hover:shadow-xl transition-all border border-slate-50 cursor-pointer group`}>
              <span className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
              <span className="font-black text-slate-900 text-lg md:text-xl block tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 text-center bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-[0.2em]">© 2026 SHARE-SORA Project</p>
      </footer>
    </div>
  );
}