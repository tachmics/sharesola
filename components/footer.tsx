import { Instagram, Twitter } from "lucide-react"

const footerLinks = {
  service: [
    { name: "スポット一覧", href: "#" },
    { name: "目的から探す", href: "#" },
    { name: "エリアから探す", href: "#" },
    { name: "料金について", href: "#" },
  ],
  owner: [
    { name: "スペースを掲載する", href: "#" },
    { name: "オーナー向けガイド", href: "#" },
    { name: "掲載料金", href: "#" },
    { name: "オーナーログイン", href: "#" },
  ],
  company: [
    { name: "運営会社", href: "#" },
    { name: "利用規約", href: "#" },
    { name: "プライバシーポリシー", href: "#" },
    { name: "特定商取引法に基づく表記", href: "#" },
  ],
  support: [
    { name: "よくある質問", href: "#" },
    { name: "お問い合わせ", href: "#" },
    { name: "キャンセルポリシー", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  シェアソラ
                </span>
              </a>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                都会の屋上で、<br />特別な体験を。
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-6">
                サービス
              </h4>
              <ul className="space-y-4">
                {footerLinks.service.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-6">
                オーナー様へ
              </h4>
              <ul className="space-y-4">
                {footerLinks.owner.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-6">
                会社情報
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-6">
                サポート
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50">
              © 2026 シェアソラ. All rights reserved.
            </p>
            <p className="text-sm text-background/50">
              Made with ❤️ for rooftop lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
