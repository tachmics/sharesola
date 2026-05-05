import SunCalc from "suncalc";

export interface SolarTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  sunriseLabel: string;
  sunsetLabel: string;
  solarNoonLabel: string;
}

export interface SpotCatalogItem {
  id: string;
  name: {
    ja: string;
    en?: string;
  };
  officialUrl: string;
  sourceName: string;
  description: string;
  address: string;
  accessDetail: string;
  geo: {
    lat: number;
    lng: number;
    altitudeMeters?: number;
  };
  businessHours: {
    open: string;
    close: string;
  };
  closedDays: string[];
  price: number;
  priceUnit: string;
  amenities: string[];
  usageRules: string[];
  skyOpenness: number; // 0-100
  solarScore: number; // 0-100
  nightViewScore: number; // 0-100
  nightFeatures: string[];
  images: string[];
  ar: {
    icon: string;
    soraColor: string;
  };
  todaySolar: SolarTimes;
}

export interface SkySpot extends SpotCatalogItem {
  lat: number;
  lng: number;
  altitude: number;
  icon: string;
  location: string;
  soraColor: string;
}

export interface FreeSpot extends SkySpot {}

const formatAsJstHm = (date: Date): string =>
  new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  }).format(date);

const buildTodaySolar = (lat: number, lng: number): SolarTimes => {
  const times = SunCalc.getTimes(new Date(), lat, lng);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    sunriseLabel: formatAsJstHm(times.sunrise),
    sunsetLabel: formatAsJstHm(times.sunset),
    solarNoonLabel: formatAsJstHm(times.solarNoon),
  };
};

type SpotSeed = Omit<SpotCatalogItem, "todaySolar">;

const SPOT_CATALOG_SOURCE: SpotSeed[] = [
  {
    id: "kudankaikan-terrace",
    name: {
      ja: "九段会館テラス 屋上庭園",
      en: "Kudan Kaikan Terrace Rooftop Garden",
    },
    officialUrl: "https://kudan-tokyo.jp/kudan_terrace/",
    sourceName: "九段会館テラス（参考）",
    description:
      "登録有形文化財の風格と、皇居を望む開放感が共存する特別な空間。都心にいながら静かな空と緑を楽しめる、シェアソラのフラッグシップ・スポットです。",
    address: "東京都千代田区九段南1丁目6-5 九段会館テラス",
    accessDetail: "九段下駅4番出口より徒歩1分",
    geo: {
      lat: 35.6942,
      lng: 139.7511,
      altitudeMeters: 20,
    },
    businessHours: {
      open: "09:00",
      close: "22:00",
    },
    closedDays: ["不定休（施設都合・天候により変更）"],
    price: 0,
    priceUnit: "無料",
    amenities: [
      "Wi-Fi",
      "電源あり",
      "ベンチ",
      "自販機",
      "歴史的建築",
      "屋根あり（一部）",
    ],
    usageRules: [
      "大音量の音楽再生は不可",
      "ドローン飛行は禁止",
      "他利用者の導線を塞がない",
      "ゴミは各自で持ち帰り",
    ],
    skyOpenness: 90,
    solarScore: 94,
    nightViewScore: 89,
    nightFeatures: ["皇居のスカイライン", "暖色系ライトアップ", "静かな都市夜景"],
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    ],
    ar: {
      icon: "🌿",
      soraColor: "#22c55e",
    },
  },
];

export const SPOT_CATALOG: SpotCatalogItem[] = SPOT_CATALOG_SOURCE.map((spot) => ({
  ...spot,
  todaySolar: buildTodaySolar(spot.geo.lat, spot.geo.lng),
}));

const withDerivedFields = (spot: SpotCatalogItem): SkySpot => ({
  ...spot,
  lat: spot.geo.lat,
  lng: spot.geo.lng,
  altitude: spot.geo.altitudeMeters ?? 20,
  icon: spot.ar.icon,
  location: spot.address,
  soraColor: spot.ar.soraColor,
});

export const SKY_SPOTS: SkySpot[] = SPOT_CATALOG.map(withDerivedFields);
export const FREE_SPOTS: FreeSpot[] = SPOT_CATALOG.map(withDerivedFields);

export const getSpotById = (id: string): SpotCatalogItem | undefined =>
  SPOT_CATALOG.find((spot) => spot.id === id);

export const getFreeSpotById = (id: string): FreeSpot | undefined =>
  FREE_SPOTS.find((spot) => spot.id === id);