"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SPOT_CATALOG } from "@/app/lib/spots"

const flagship = SPOT_CATALOG[0]
// アイキャッチはイメージ訴求用。スポット実写真は詳細・カード側で表示
const heroImage = "/images/hero-rooftop.png"
const heroImageAlt =
  "屋上テラスでパラソルの下、日差しを楽しむ様子"

export function HeroSection() {
  return (
    <section className="relative flex flex-col pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-background to-background pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex items-center">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 md:space-y-8 lg:space-y-10 order-2 md:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-medium text-muted-foreground">
                東京・大阪・福岡で展開中
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-5 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-foreground text-balance">
                屋上で、
                <br />
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  特別な時間
                </span>
                を
                <br />
                予約する。
              </h1>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                都会の空に一番近い場所で、サウナ、BBQ、撮影、チルアウト。
                あなただけの屋上体験を見つけよう。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white border-0 rounded-full px-6 lg:px-8 py-6 lg:py-7 text-base lg:text-lg font-bold shadow-xl shadow-sky-500/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                <Link href="/ar">
                  <span className="relative z-10 flex items-center gap-3">
                    ARで近くの屋上を探す
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 lg:px-8 py-6 lg:py-7 text-base lg:text-lg font-medium border-2 border-border hover:bg-card hover:border-foreground/20 transition-all duration-300"
              >
                <Link href="#spots">すべてのスポットを見る</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 lg:gap-8 pt-2 lg:pt-4">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-foreground">500+</p>
                <p className="text-xs lg:text-sm text-muted-foreground">登録スポット</p>
              </div>
              <div className="w-px h-10 lg:h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-foreground">10,000+</p>
                <p className="text-xs lg:text-sm text-muted-foreground">利用者数</p>
              </div>
              <div className="w-px h-10 lg:h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-foreground">4.8</p>
                <p className="text-xs lg:text-sm text-muted-foreground">平均評価</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual (Now visible on mobile too) */}
          <div className="relative order-1 md:order-2">
            <div className="relative aspect-[4/3] md:aspect-[4/4] lg:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />

              {/* Floating card */}
              {flagship && (
                <Link
                  href={`/spots/${flagship.id}`}
                  className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-card/90 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl transition-opacity hover:opacity-95"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl lg:text-2xl">{flagship.ar.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm lg:text-base truncate">
                        {flagship.name.ja}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        {flagship.price === 0
                          ? flagship.priceUnit
                          : `${flagship.price.toLocaleString()} ${flagship.priceUnit}`}
                        {" · "}日の入り {flagship.todaySolar.sunsetLabel}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl rotate-12 opacity-20 blur-sm" />
            <div className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg lg:rounded-xl -rotate-12 opacity-20 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  )
}
