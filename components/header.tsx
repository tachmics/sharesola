"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              シェアソラ
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <a 
              href="#spots" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              スポット一覧
            </a>
            <a 
              href="#purpose" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              目的から探す
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              掲載について
            </a>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              ログイン
            </Button>
            <Button 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 transition-all duration-300 hover:scale-105"
            >
              無料会員登録
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              <a 
                href="#spots" 
                className="text-base font-medium text-foreground py-3 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                スポット一覧
              </a>
              <a 
                href="#purpose" 
                className="text-base font-medium text-foreground py-3 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                目的から探す
              </a>
              <a 
                href="#" 
                className="text-base font-medium text-foreground py-3 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                掲載について
              </a>
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-center rounded-full"
                >
                  ログイン
                </Button>
                <Button 
                  className="w-full justify-center bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  無料会員登録
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
