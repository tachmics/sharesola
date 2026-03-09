import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PurposeFilter } from "@/components/purpose-filter"
import { FeaturedSpots } from "@/components/featured-spots"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PurposeFilter />
      <FeaturedSpots />
      <Footer />
    </main>
  )
}