"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SKY_SPOTS } from "../lib/spots";

export default function ARPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [alpha, setAlpha] = useState(0); 
  const [beta, setBeta] = useState(0);   
  const [userPos, setUserPos] = useState<{lat: number, lng: number} | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeSpot, setActiveSpot] = useState<(any) | null>(null);

  // 数学ロジック（getBearing, getDistance）は既存のものを維持
  const getBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const φ1 = lat1 * Math.PI / 180; const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180; const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180; const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const startAR = async () => {
    try {
      navigator.geolocation.watchPosition((pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, (err) => console.error(err), { enableHighAccuracy: true });

      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        await (DeviceOrientationEvent as any).requestPermission();
      }

      window.addEventListener("deviceorientation", (e) => {
        const compass = (e as any).webkitCompassHeading || (360 - (e.alpha || 0));
        setAlpha(prev => {
          const diff = ((compass - prev + 540) % 360) - 180;
          return (prev + diff * 0.2 + 360) % 360;
        });
        if (e.beta !== null) setBeta(prev => prev * 0.8 + e.beta! * 0.2); 
      }, true);

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setIsStarted(true);
    } catch (err) { alert("起動エラー"); }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans text-white flex flex-col">
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />

      {isStarted ? (
        <>
          <div className="relative flex-grow z-10 pointer-events-none">
            {SKY_SPOTS.map((spot) => {
              const bearing = userPos ? getBearing(userPos.lat, userPos.lng, spot.lat, spot.lng) : 42;
              const distance = userPos ? getDistance(userPos.lat, userPos.lng, spot.lat, spot.lng) : 300;

              const diffX = ((bearing - alpha + 540) % 360) - 180;
              if (Math.abs(diffX) > 45) return null;
              const screenX = diffX * 25; 

              const spotPitch = Math.atan2(spot.altitude, distance) * (180 / Math.PI);
              const devicePitch = 75 - beta; 
              const screenY = -((spotPitch + devicePitch) * 22);

              // ✨ 遠近法：100mを基準にスケールを計算
              const baseScale = Math.max(0.4, Math.min(1.5, 200 / (distance + 100)));
              const isActive = activeSpot?.id === spot.id;
              const finalScale = isActive ? baseScale * 1.2 : baseScale;

              return (
                <div key={spot.id} className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ transform: `translateX(${screenX}px)` }}>
                  <div className="relative flex flex-col items-center" style={{ transform: `translateY(${screenY}px) scale(${finalScale})` }}>
                    {/* 距離に応じて太さと透明度が変わる柱 */}
                    <div 
                      className="absolute bottom-10 bg-gradient-to-t from-white via-white/20 to-transparent" 
                      style={{ 
                        width: `${2 * baseScale}px`, 
                        height: '200vh',
                        opacity: 0.3 + (baseScale * 0.4)
                      }} 
                    />
                    
                    <div 
                      onClick={() => setActiveSpot({...spot, dist: Math.round(distance)})} 
                      className={`pointer-events-auto cursor-pointer w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all shadow-2xl ${isActive ? 'bg-white border-blue-500 shadow-blue-500/50' : 'bg-white/80 border-transparent'}`}
                    >
                      <span className="text-3xl">{spot.icon}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 📱 レイアウト改善：少し上に配置（bottom-20） */}
          <div className="relative z-50 p-6 pb-20 pointer-events-none">
            {activeSpot ? (
              <div onClick={() => router.push(`/reserve?id=${activeSpot.id}`)} className="pointer-events-auto bg-white/95 backdrop-blur-xl p-5 rounded-[32px] flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-bottom-8">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">{activeSpot.icon}</div>
                  <div>
                    <h3 className="font-black text-lg leading-none mb-1">{activeSpot.name}</h3>
                    <p className="text-blue-600 font-black text-[10px] uppercase">{activeSpot.dist}m | {activeSpot.altitude}m↑</p>
                  </div>
                </div>
                <div className="bg-blue-600 px-6 py-4 rounded-2xl text-white font-black text-xs uppercase shadow-md active:scale-90 transition-transform">Book</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                  <p className="text-[9px] font-black tracking-[0.3em] text-white opacity-70 uppercase">Looking for Rooftops...</p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 px-10 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-[30%] mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)]">
            <span className="text-4xl">🔭</span>
          </div>
          <h2 className="text-2xl font-black mb-2 italic">SORA-RESERVE</h2>
          <p className="text-white/50 text-xs mb-10 font-bold uppercase tracking-widest">Kagurazaka / Iidabashi Area</p>
          <button onClick={startAR} className="w-full max-w-xs bg-blue-600 text-white py-6 rounded-[24px] font-black text-xl shadow-2xl active:scale-95 transition-transform tracking-tight">
            SCAN THE SKY
          </button>
        </div>
      )}
    </div>
  );
}