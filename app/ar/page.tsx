"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SKY_SPOTS, FREE_SPOTS, FreeSpot } from "../lib/spots";

export default function ARPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeSpot, setActiveSpot] = useState<any | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "watching" | "denied" | "error">(
    "idle"
  );
  const geoWatchIdRef = useRef<number | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const [hasCameraFeed, setHasCameraFeed] = useState(false);
  const [dismissedSpotId, setDismissedSpotId] = useState<string | null>(null);

  // 現在の位置に応じてアクティブなスポットの距離を更新し、
  // 30m 以内に近づいたら自動的に詳細カードを開く
  useEffect(() => {
    if (!userPos) return;

    // すでに選択されているスポットの距離をリアルタイム更新
    if (activeSpot) {
      const base = SKY_SPOTS.find((s) => s.id === activeSpot.id);
      if (base) {
        const d = getDistance(userPos.lat, userPos.lng, base.lat, base.lng);
        setActiveSpot((prev: any | null) =>
          prev && prev.id === base.id ? { ...prev, dist: Math.round(d) } : prev
        );
      }
    }

    const NEAR_THRESHOLD = 30; // m
    let nearest: { spot: (typeof SKY_SPOTS)[number]; dist: number } | null = null;

    for (const spot of SKY_SPOTS) {
      const d = getDistance(userPos.lat, userPos.lng, spot.lat, spot.lng);
      if (d <= NEAR_THRESHOLD && (!nearest || d < nearest.dist)) {
        nearest = { spot, dist: d };
      }
    }

    // 30m 以内に入ったスポットがある場合、自動的にカードを開く
    if (nearest && nearest.spot.id !== dismissedSpotId) {
      setActiveSpot((prev: any | null) => {
        if (prev && prev.id === nearest!.spot.id && prev.dist === Math.round(nearest!.dist)) {
          return prev;
        }
        return { ...nearest!.spot, dist: Math.round(nearest!.dist) };
      });
    }
  }, [userPos, activeSpot, dismissedSpotId]);

  // 数学ロジック（getBearing, getDistance）は既存のものを維持
  const getBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const startAR = async () => {
    // iOS 13+ のジャイロ許可。拒否・未対応でも AR 画面は開く（コンパスは弱くなるだけ）。
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        await (DeviceOrientationEvent as any).requestPermission();
      } catch {
        /* 続行 */
      }
    }

    window.addEventListener(
      "deviceorientation",
      (e) => {
        const compass =
          (e as any).webkitCompassHeading || (360 - (e.alpha || 0));
        setAlpha((prev) => {
          const diff = ((compass - prev + 540) % 360) - 180;
          return (prev + diff * 0.2 + 360) % 360;
        });
        if (e.beta !== null) setBeta((prev) => prev * 0.8 + e.beta! * 0.2);
      },
      true
    );

    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
    } else {
      setGeoStatus("watching");
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGeoStatus("watching");
        },
        (err) => {
          if (err.code === 1) {
            setGeoStatus("denied");
          } else {
            setGeoStatus("error");
            if (process.env.NODE_ENV === "development") {
              console.info(
                "[AR] Geolocation:",
                err.code,
                err.message || "(no message)"
              );
            }
          }
        },
        { enableHighAccuracy: true }
      );
      geoWatchIdRef.current = watchId;
    }

    // ノートPC等は背面カメラが無く environment 単体指定で失敗しやすい → ideal → 任意 → なし
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
      } catch {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch {
          stream = null;
        }
      }
    }

    cameraStreamRef.current = stream;
    setHasCameraFeed(!!stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      if (stream) {
        await videoRef.current.play().catch(() => {});
      }
    }

    setIsStarted(true);
  };

  // コンポーネントのアンマウント時に位置情報ウォッチを停止
  useEffect(() => {
    return () => {
      if (geoWatchIdRef.current !== null && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
      }
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans text-white flex flex-col">
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />

      {isStarted ? (
        <>
          <div className="relative flex-grow z-10 pointer-events-none">
            {SKY_SPOTS.map((spot) => {
              const bearing = userPos
                ? getBearing(userPos.lat, userPos.lng, spot.lat, spot.lng)
                : 42;
              const distance = userPos
                ? getDistance(userPos.lat, userPos.lng, spot.lat, spot.lng)
                : 300;

              const rawDiff = ((bearing - alpha + 540) % 360) - 180;
              const fovHalf = 45; // 視野角の半分（約90度分）
              const edgeSoftness = 15; // 端でのフェード用

              if (Math.abs(rawDiff) > fovHalf + edgeSoftness) return null;

              const angle = Math.abs(rawDiff);
              const edgeFactor =
                angle <= fovHalf
                  ? 1
                  : Math.max(0, 1 - (angle - fovHalf) / edgeSoftness);

              const screenX = rawDiff * 25;

              const spotPitch = Math.atan2(spot.altitude, distance) * (180 / Math.PI);
              const devicePitch = 75 - beta;
              const screenY = -((spotPitch + devicePitch) * 22);

              // ✨ 遠近法：距離に応じてスケールと透明度を調整
              const baseScale = Math.max(0.3, Math.min(1.5, 220 / (distance + 150)));
              const isActive = activeSpot?.id === spot.id;
              const finalScale = isActive ? baseScale * 1.25 : baseScale;
              const distanceOpacity = 0.15 + baseScale * 0.55;
              const finalOpacity = distanceOpacity * edgeFactor;

              return (
                <div
                  key={spot.id}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                  style={{ transform: `translateX(${screenX}px)`, opacity: finalOpacity }}
                >
                  <div
                    className="relative flex flex-col items-center"
                    style={{ transform: `translateY(${screenY}px) scale(${finalScale})` }}
                  >
                    {/* ✨ エネルギーシェーダー風の光の柱 */}
                    <div
                      className="absolute bottom-10 origin-bottom bg-gradient-to-t from-sky-400 via-sky-200/80 to-transparent shadow-[0_0_40px_rgba(56,189,248,0.9)]"
                      style={{
                        width: `${2 * baseScale}px`,
                        height: "200vh",
                        filter: "blur(2px)",
                        animation: "pillarPulseWidth 3.2s ease-in-out infinite",
                      }}
                    />
                    {/* 柱の中心コア（細く明るい芯） */}
                    <div
                      className="absolute bottom-10 origin-bottom bg-gradient-to-t from-cyan-300 via-white to-transparent pointer-events-none"
                      style={{
                        width: `${0.9 * baseScale}px`,
                        height: "200vh",
                        boxShadow:
                          "0 0 35px rgba(125,211,252,0.7), 0 0 90px rgba(56,189,248,0.8)",
                        opacity: 0.9,
                        filter: "blur(1px)",
                      }}
                    />
                    {/* パーティクル（小さな光の粒が上昇） */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-12 rounded-full bg-cyan-200"
                        style={{
                          width: 2,
                          height: 2,
                          left: `${(Math.random() - 0.5) * 12}px`,
                          animation: `pillarParticles 3.6s linear infinite`,
                          animationDelay: `${i * 0.4}s`,
                          opacity: 0.8,
                        }}
                      />
                    ))}
                    {/* 接地面の波紋エフェクト */}
                    <div className="absolute bottom-9">
                      <div
                        className="relative w-16 h-16 rounded-full border border-cyan-300/60"
                        style={{
                          boxShadow:
                            "0 0 25px rgba(56,189,248,0.9), 0 0 50px rgba(56,189,248,0.7)",
                          filter: "blur(1px)",
                          opacity: 0.7,
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border border-cyan-200/40"
                        style={{
                          animation: "pillarRipple 3s ease-out infinite",
                        }}
                      />
                    </div>

                    {/* タップ可能なスポットアイコン */}
                    <div
                      onClick={() => {
                        setDismissedSpotId(null);
                        setActiveSpot((prev: any | null) =>
                          prev && prev.id === spot.id
                            ? null
                            : { ...spot, dist: Math.round(distance) }
                        );
                      }}
                      className={`pointer-events-auto cursor-pointer w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all shadow-2xl ${
                        isActive
                          ? "bg-white border-sky-400 shadow-sky-400/70"
                          : "bg-white/90 border-transparent"
                      }`}
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
            <AnimatePresence>
              {activeSpot ? (
                <MotionSpotCard
                  key={activeSpot.id}
                  activeSpot={activeSpot}
                  onClose={() => {
                    setDismissedSpotId(activeSpot.id);
                    setActiveSpot(null);
                  }}
                  onViewDetail={() => router.push(`/spots/${activeSpot.id}`)}
                  onReserve={() =>
                    router.push(`/reserve?id=${encodeURIComponent(activeSpot.id)}`)
                  }
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center"
                >
                  <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                    <p className="text-[9px] font-black tracking-[0.3em] text-white opacity-70 uppercase">
                      Looking for Rooftops...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!hasCameraFeed && (
            <div className="absolute top-14 left-1/2 z-40 -translate-x-1/2 max-w-[90vw] rounded-full bg-amber-500/20 px-4 py-2 text-center text-[11px] font-medium text-amber-100 border border-amber-400/30 pointer-events-none">
              カメラを使えないため、背景なしで表示しています（拒否・未搭載・HTTPS以外など）
            </div>
          )}
          {/* 現在地デバッグ表示（左下、小さく） */}
          <div className="absolute left-2 bottom-2 z-40 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/70 pointer-events-none">
            <div>geoStatus: {geoStatus}</div>
            <div>
              lat:{" "}
              {userPos?.lat != null
                ? userPos.lat.toFixed(5)
                : "--"}
            </div>
            <div>
              lng:{" "}
              {userPos?.lng != null
                ? userPos.lng.toFixed(5)
                : "--"}
            </div>
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

type MotionSpotCardProps = {
  activeSpot: any;
  onClose: () => void;
  onViewDetail: () => void;
  onReserve: () => void;
};

const MotionSpotCard: React.FC<MotionSpotCardProps> = ({
  activeSpot,
  onClose,
  onViewDetail,
  onReserve,
}) => {
  const detail: FreeSpot | undefined = FREE_SPOTS.find((s) => s.id === activeSpot.id);
  const isArrived =
    typeof activeSpot?.dist === "number" && !Number.isNaN(activeSpot.dist) && activeSpot.dist <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", damping: 22, stiffness: 260 }}
      className="pointer-events-auto bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-5 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
          {activeSpot.icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-black text-lg leading-tight mb-1 text-white">
            {detail?.name.ja ?? activeSpot.name.ja}
          </h3>
          <p
            className={`text-xs font-semibold ${
              isArrived ? "text-amber-300" : "text-blue-300"
            }`}
          >
            {activeSpot.dist != null && `${Math.round(activeSpot.dist)}m`}{" "}
            {activeSpot.altitude != null && `| ${activeSpot.altitude}m↑`}
          </p>
          {isArrived && (
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-[10px] font-semibold text-amber-200">
              <span className="text-[10px]">✨</span>
              <span>スポットに到着しました！</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 px-2 py-1 text-[10px] text-zinc-200 hover:bg-white/10 transition-colors"
        >
          閉じる
        </button>
      </div>

      {detail && detail.images?.length > 0 && (
        <div className="mt-1 -mx-1">
          <div className="flex gap-3 overflow-x-auto pb-1 px-1 snap-x snap-mandatory">
            {detail.images.map((src, idx) => (
              <div
                key={idx}
                className="relative min-w-[200px] max-w-[260px] h-32 rounded-2xl overflow-hidden snap-start bg-zinc-800/80 border border-white/5 flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${detail.name.ja} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {detail?.description && (
        <p className="text-xs text-zinc-200 text-left leading-relaxed mt-1">
          {detail.description}
        </p>
      )}

      {detail && (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="text-[11px] text-zinc-300">
            本日の日の入り:{" "}
            <span className="font-semibold text-amber-200">
              {detail.todaySolar.sunsetLabel}
            </span>
          </p>
        </div>
      )}

      {detail && detail.nightFeatures.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {detail.nightFeatures.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-indigo-300/30 bg-indigo-400/10 px-2.5 py-1 text-[10px] font-medium text-indigo-100"
            >
              ✨ {feature}
            </span>
          ))}
        </div>
      )}

      {detail && (
        <div className="flex items-center justify-between gap-3 mt-1">
          <button
            type="button"
            onClick={onViewDetail}
            className="px-3 py-2 rounded-2xl border border-sky-300/40 text-[10px] text-sky-100 hover:bg-sky-400/20 transition-colors"
          >
            詳細を見る
          </button>
          <button
            type="button"
            onClick={onReserve}
            className="flex-1 bg-white text-black py-3 rounded-2xl font-bold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.97] transition-transform"
          >
            このスポットを予約する
          </button>
          <a
            href={detail.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-2xl border border-white/20 text-[10px] text-zinc-200 hover:bg-white/5 transition-colors"
          >
            出典: {detail.sourceName}
          </a>
        </div>
      )}
    </motion.div>
  );
};