"use client"

import Link from "next/link"
import { MapPin, Clock, ChevronRight, Wifi, Sunset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SPOT_CATALOG } from "@/app/lib/spots"

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
            asChild
            variant="outline"
            className="group rounded-full px-6 py-6 border-2 border-border hover:border-foreground/30 transition-all duration-300"
          >
            <Link href={`/spots/${SPOT_CATALOG[0]?.id ?? ""}`}>
              すべて見る
              <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Spots Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPOT_CATALOG.map((spot) => (
            <article
              key={spot.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/10"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={spot.images[0]}
                  alt={spot.name.ja}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
                    <Clock className="w-3 h-3" />
                    利用可能
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
                  <span>{spot.address}</span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-sky-600 transition-colors duration-300">
                  {spot.name.ja}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {spot.amenities.includes("Wi-Fi") && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      <Wifi className="w-3 h-3" />
                      Wi-Fi
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {spot.price === 0 ? "無料" : `${spot.price.toLocaleString()} ${spot.priceUnit}`}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    <Sunset className="w-3 h-3" />
                    日の入り {spot.todaySolar.sunsetLabel}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-foreground">
                      {spot.price === 0 ? "無料" : `¥${spot.price.toLocaleString()}`}
                    </span>
                    <span className="text-muted-foreground text-sm">{spot.price === 0 ? "" : `/${spot.priceUnit}`}</span>
                  </div>
                  <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 transition-all duration-300 hover:scale-105">
                    <Link href={`/spots/${spot.id}`}>詳細を見る</Link>
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
