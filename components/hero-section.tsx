"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-background to-background pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-medium text-muted-foreground">
                東京・大阪・福岡で展開中
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-foreground text-balance">
                屋上で、
                <br />
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  特別な時間
                </span>
                を
                <br />
                予約する。
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                都会の空に一番近い場所で、サウナ、BBQ、撮影、チルアウト。
                あなただけの屋上体験を見つけよう。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white border-0 rounded-full px-8 py-7 text-lg font-bold shadow-xl shadow-sky-500/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ARで近くの屋上を探す
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-7 text-lg font-medium border-2 border-border hover:bg-card hover:border-foreground/20 transition-all duration-300"
              >
                すべてのスポットを見る
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">登録スポット</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">10,000+</p>
                <p className="text-sm text-muted-foreground">利用者数</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">平均評価</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1464093515883-ec948246accb?w=800&h=1000&fit=crop&q=80"
                alt="都会の屋上で夕日を楽しむ様子"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              
              {/* Floating card */}
              <div className="absolute bottom-8 left-8 right-8 bg-card/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                    <span className="text-2xl">🌅</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">渋谷スカイテラス</p>
                    <p className="text-sm text-muted-foreground">¥5,000/h〜 · 最大20名</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl rotate-12 opacity-20 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl -rotate-12 opacity-20 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  )
}
