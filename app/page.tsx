import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PurposeFilter } from "@/components/purpose-filter"
import { FeaturedSpots } from "@/components/featured-spots"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col gap-12 pb-20"> {/* ここでパーツ間の余白を作る */}
        <HeroSection />
        <div className="container mx-auto px-4 space-y-20"> {/* 左右の余白と縦の余白 */}
          <PurposeFilter />
          <FeaturedSpots />
        </div>
      </div>
      <Footer />
    </main>
  )
}