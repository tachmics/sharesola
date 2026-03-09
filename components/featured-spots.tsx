"use client"

import { MapPin, Star, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const spots = [
  {
    id: 1,
    name: "渋谷スカイテラス",
    area: "渋谷区",
    price: 5000,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80",
    tags: ["#展望", "#貸切", "#夜景"],
    available: true,
  },
  {
    id: 2,
    name: "新宿ルーフトップガーデン",
    area: "新宿区",
    price: 3500,
    rating: 4.7,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&q=80",
    tags: ["#緑化", "#BBQ可", "#駅近"],
    available: true,
  },
  {
    id: 3,
    name: "目黒サウナスカイ",
    area: "目黒区",
    price: 8000,
    rating: 4.9,
    reviewCount: 256,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80",
    tags: ["#サウナ", "#水風呂", "#プレミアム"],
    available: false,
  },
  {
    id: 4,
    name: "代官山フォトスタジオ屋上",
    area: "渋谷区",
    price: 4500,
    rating: 4.8,
    reviewCount: 84,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop&q=80",
    tags: ["#撮影向け", "#自然光", "#白壁"],
    available: true,
  },
  {
    id: 5,
    name: "恵比寿チルアウトデッキ",
    area: "渋谷区",
    price: 3000,
    rating: 4.6,
    reviewCount: 62,
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=400&fit=crop&q=80",
    tags: ["#チル", "#音楽OK", "#ソファ"],
    available: true,
  },
  {
    id: 6,
    name: "六本木パノラマテラス",
    area: "港区",
    price: 12000,
    rating: 5.0,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop&q=80",
    tags: ["#パーティー", "#360度", "#ラグジュアリー"],
    available: true,
  },
]

export function FeaturedSpots() {
  return (
    <section id="spots" className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                リアルタイム空き情報
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              今すぐ行ける
              <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
                屋上
              </span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="group rounded-full px-6 py-6 border-2 border-border hover:border-foreground/30 transition-all duration-300"
          >
            すべて見る
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Spots Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {spots.map((spot) => (
            <article
              key={spot.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/10"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  {spot.available ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
                      <Clock className="w-3 h-3" />
                      空きあり
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-bold">
                      本日満室
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-bold shadow-lg">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {spot.rating}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{spot.area}</span>
                  <span className="mx-2">·</span>
                  <span>{spot.reviewCount}件のレビュー</span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-sky-600 transition-colors duration-300">
                  {spot.name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {spot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-foreground">
                      ¥{spot.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm">/h〜</span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 transition-all duration-300 hover:scale-105"
                  >
                    詳細を見る
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
