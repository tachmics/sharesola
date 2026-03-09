"use client"

import { Flame, UtensilsCrossed, Camera, CloudSun } from "lucide-react"

const purposes = [
  {
    id: "sauna",
    name: "サウナ",
    description: "空の下で「ととのう」",
    icon: Flame,
    gradient: "from-orange-400 to-red-500",
    shadowColor: "shadow-orange-500/20",
    spotCount: 128,
  },
  {
    id: "bbq",
    name: "BBQ",
    description: "絶景を眺めながら",
    icon: UtensilsCrossed,
    gradient: "from-amber-400 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    spotCount: 256,
  },
  {
    id: "photo",
    name: "撮影",
    description: "プロ仕様のロケーション",
    icon: Camera,
    gradient: "from-sky-400 to-blue-500",
    shadowColor: "shadow-sky-500/20",
    spotCount: 184,
  },
  {
    id: "chill",
    name: "チル",
    description: "都会の喧騒を離れて",
    icon: CloudSun,
    gradient: "from-teal-400 to-cyan-500",
    shadowColor: "shadow-teal-500/20",
    spotCount: 312,
  },
]

export function PurposeFilter() {
  return (
    <section id="purpose" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-6">
            目的から
            <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
              探す
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            やりたいことから、ぴったりの屋上を見つけましょう
          </p>
        </div>

        {/* Purpose Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {purposes.map((purpose) => {
            const Icon = purpose.icon
            return (
              <button
                key={purpose.id}
                className={`group relative bg-card rounded-3xl p-8 lg:p-10 border border-border/60 shadow-lg ${purpose.shadowColor} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${purpose.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {purpose.name}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4">
                  {purpose.description}
                </p>

                {/* Spot Count */}
                <p className="text-sm font-medium text-muted-foreground">
                  <span className="text-foreground font-bold">{purpose.spotCount}</span> スポット
                </p>

                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${purpose.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
