import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  MoonStar,
  SunMedium,
  Train,
  Wifi,
} from "lucide-react";
import { getSpotById } from "@/app/lib/spots";

type SpotDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SpotDetailPage({ params }: SpotDetailPageProps) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <section className="relative h-[52vh] min-h-[320px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spot.images[0]}
          alt={spot.name.ja}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="absolute left-6 top-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm text-white backdrop-blur"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Link>
        </div>
        <div className="absolute bottom-8 left-6 right-6 text-white">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/75">
            FLAGSHIP SPOT
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">{spot.name.ja}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">{spot.description}</p>
          <p className="mt-3 text-xs text-white/70">画像出典: {spot.sourceName}</p>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <section className="mb-8 rounded-3xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold tracking-wide text-muted-foreground">
            フォトギャラリー
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {spot.images.map((img, idx) => (
              <div
                key={img}
                className={`${idx === 0 ? "sm:col-span-2 lg:col-span-2" : ""} overflow-hidden rounded-2xl border border-border bg-muted`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${spot.name.ja} ${idx + 1}`}
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-bold tracking-wide text-muted-foreground">
            空のライブ情報
          </h2>
          <p className="mt-2 text-2xl font-black text-amber-600 sm:text-3xl">
            本日の日の入り: {spot.todaySolar.sunsetLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              <SunMedium className="h-3.5 w-3.5" />
              日の出 {spot.todaySolar.sunriseLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              <SunMedium className="h-3.5 w-3.5" />
              南中 {spot.todaySolar.solarNoonLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              <MoonStar className="h-3.5 w-3.5" />
              夜景スコア {spot.nightViewScore}
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">スポット情報</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <th className="w-32 bg-secondary/60 px-4 py-3 text-left font-semibold">
                      営業時間
                    </th>
                    <td className="px-4 py-3">
                      月-土 {spot.businessHours.weekday.open} - {spot.businessHours.weekday.close}
                      <br />
                      日祝 {spot.businessHours.sundayHoliday.open} -{" "}
                      {spot.businessHours.sundayHoliday.close}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="bg-secondary/60 px-4 py-3 text-left font-semibold">
                      定休日
                    </th>
                    <td className="px-4 py-3">{spot.closedDays.join(" / ")}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="bg-secondary/60 px-4 py-3 text-left font-semibold">
                      料金
                    </th>
                    <td className="px-4 py-3">
                      {spot.price === 0 ? "無料" : `${spot.price.toLocaleString()} ${spot.priceUnit}`}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="bg-secondary/60 px-4 py-3 text-left font-semibold">
                      住所
                    </th>
                    <td className="px-4 py-3">{spot.address}</td>
                  </tr>
                  <tr>
                    <th className="bg-secondary/60 px-4 py-3 text-left font-semibold">
                      アクセス
                    </th>
                    <td className="px-4 py-3">{spot.accessDetail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-base font-bold">Amenities</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {spot.amenities.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                  >
                    {item.includes("Wi-Fi") ? (
                      <Wifi className="h-3.5 w-3.5" />
                    ) : item.includes("徒歩") ? (
                      <Train className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-base font-bold">Rules</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {spot.usageRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-base font-bold">夜の魅力</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {spot.nightFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-indigo-300/40 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200"
                  >
                    ✨ {feature}
                  </span>
                ))}
              </div>
              <a
                href={spot.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-xs text-sky-600 underline"
              >
                公式情報を見る ({spot.sourceName})
              </a>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
