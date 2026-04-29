import SunCalc from "suncalc";

export interface SolarTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  sunriseLabel: string;
  sunsetLabel: string;
  solarNoonLabel: string;
}

export interface SkySpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  altitude: number;
  icon: string;
  location: string;
  soraColor: string;
}

export interface FreeSpot {
  id: string;
  name: string;
  description: string;
  distanceLabel?: string;
  images: string[];
  sourceLabel: string;
  sourceUrl: string;
  todaySolar: SolarTimes;
  nightFeatures: string[];
}

export type SpotDataProvider = "sharesola-official" | "external-partner";

// 将来の外部連携を想定した、汎用 JSON 互換のスポット構造
interface SpotCatalogSourceItem {
  id: string;
  provider: SpotDataProvider;
  category: "official" | "partner" | "community";
  visibility: "public" | "private" | "unlisted";
  name: {
    ja: string;
    en?: string;
  };
  geo: {
    lat: number;
    lng: number;
    altitudeMeters?: number;
  };
  address: {
    area: string;
    display: string;
  };
  tags: string[];
  businessHours: {
    timezone: string;
    regular: Array<{
      daysOfWeek: number[]; // 0: Sun ... 6: Sat
      open: string; // HH:mm
      close: string; // HH:mm
    }>;
    notes?: string;
  };
  content: {
    shortDescription: string;
    longDescription: string;
    sourceLabel: string;
    sourceUrl: string;
    images: string[];
  };
  ar: {
    icon: string;
    soraColor: string;
  };
  solarScore: number; // 0-100
  nightViewScore: number; // 0-100
  nightFeatures: string[];
}

export interface SpotCatalogItem extends SpotCatalogSourceItem {
  todaySolar: SolarTimes;
}

const formatAsJstHm = (date: Date): string =>
  new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  }).format(date);

const buildTodaySolar = (lat: number, lng: number): SolarTimes => {
  const now = new Date();
  const times = SunCalc.getTimes(now, lat, lng);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    sunriseLabel: formatAsJstHm(times.sunrise),
    sunsetLabel: formatAsJstHm(times.sunset),
    solarNoonLabel: formatAsJstHm(times.solarNoon),
  };
};

// 公式/連携先データを取り込むためのベースカタログ（Raw）
const SPOT_CATALOG_SOURCE: SpotCatalogSourceItem[] = [
  {
    id: "kudankaikan-terrace",
    provider: "sharesola-official",
    category: "official",
    visibility: "public",
    name: {
      ja: "九段会館テラス 屋上庭園（九段下）",
      en: "Kudan Kaikan Terrace Rooftop Garden",
    },
    geo: {
      lat: 35.6942,
      lng: 139.7511,
      altitudeMeters: 20,
    },
    address: {
      area: "千代田区・九段下",
      display: "東京都千代田区九段南1丁目6-5",
    },
    tags: ["公式スポット", "屋上庭園", "都心"],
    businessHours: {
      timezone: "Asia/Tokyo",
      regular: [{ daysOfWeek: [1, 2, 3, 4, 5, 6, 0], open: "10:00", close: "18:00" }],
      notes: "天候・イベント開催状況により変更される場合があります。",
    },
    content: {
      shortDescription: "歴史ある九段会館に隣接する、緑と眺望を楽しめる屋上庭園スポット。",
      longDescription:
        "九段会館テラスの屋上庭園は、皇居周辺の街並みを見渡せる落ち着いた空間です。ランチ後の休憩、軽い打ち合わせ、撮影ロケーションとしても使いやすく、都心でありながら開放感を味わえます。",
      sourceLabel: "シェアソラ公式",
      sourceUrl: "https://sharesola.example.com/spots/official-kudankaikan-terrace-001",
      images: [
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    ar: {
      icon: "🌿",
      soraColor: "#22c55e",
    },
    solarScore: 91,
    nightViewScore: 88,
    nightFeatures: ["Imperial Palace Skyline", "Warm Lighting", "Quiet City Glow"],
  },
  {
    id: "hills-beach-iidabashi",
    provider: "external-partner",
    category: "partner",
    visibility: "public",
    name: {
      ja: "HILLS BEACH IIDABASHI",
    },
    geo: {
      lat: 35.7021,
      lng: 139.7448,
      altitudeMeters: 45,
    },
    address: {
      area: "飯田橋 3-1",
      display: "東京都千代田区飯田橋3-1",
    },
    tags: ["提携スポット", "ビアガーデン", "開放感"],
    businessHours: {
      timezone: "Asia/Tokyo",
      regular: [{ daysOfWeek: [1, 2, 3, 4, 5, 6, 0], open: "11:00", close: "22:00" }],
      notes: "季節営業。詳細は提携先ページをご確認ください。",
    },
    content: {
      shortDescription:
        "飯田橋エリアの屋上テラス。都心とは思えない開放感のあるビアガーデンスタイルのスペース。",
      longDescription:
        "飯田橋エリアの屋上テラス。都心とは思えない開放感のあるビアガーデンスタイルのスペースです。",
      sourceLabel: "公式サイト（ダミー）",
      sourceUrl: "https://example.com/hills-beach-iidabashi",
      images: [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    ar: {
      icon: "🏖️",
      soraColor: "#ff9c2a",
    },
    solarScore: 80,
    nightViewScore: 72,
    nightFeatures: ["Riverside Breeze", "Open Deck"],
  },
  {
    id: "kagurazaka-terrace",
    provider: "external-partner",
    category: "partner",
    visibility: "public",
    name: {
      ja: "KAGURAZAKA TERRACE",
    },
    geo: {
      lat: 35.7005,
      lng: 139.7405,
      altitudeMeters: 30,
    },
    address: {
      area: "神楽坂 5-12",
      display: "東京都新宿区神楽坂5-12",
    },
    tags: ["提携スポット", "カフェ", "テラス"],
    businessHours: {
      timezone: "Asia/Tokyo",
      regular: [{ daysOfWeek: [1, 2, 3, 4, 5, 6, 0], open: "09:00", close: "21:00" }],
      notes: "イベント貸切時は利用不可の場合があります。",
    },
    content: {
      shortDescription:
        "神楽坂の街並みを眺めながら、コーヒーと軽食を楽しめるテラススポット。",
      longDescription:
        "神楽坂の街並みを眺めながら、コーヒーと軽食を楽しめるテラススポット。ワーク・休憩・撮影のいずれにも使いやすいロケーションです。",
      sourceLabel: "提携先ページ（ダミー）",
      sourceUrl: "https://example.com/kagurazaka-terrace",
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    ar: {
      icon: "☕",
      soraColor: "#3b82f6",
    },
    solarScore: 76,
    nightViewScore: 79,
    nightFeatures: ["Slope Nightscape", "Street Lantern Ambience"],
  },
  {
    id: "canal-side-roof",
    provider: "external-partner",
    category: "partner",
    visibility: "public",
    name: {
      ja: "CANAL SIDE ROOF",
    },
    geo: {
      lat: 35.6995,
      lng: 139.743,
      altitudeMeters: 25,
    },
    address: {
      area: "外堀通り沿い",
      display: "東京都千代田区外堀通り沿い",
    },
    tags: ["提携スポット", "運河沿い", "夜景"],
    businessHours: {
      timezone: "Asia/Tokyo",
      regular: [{ daysOfWeek: [1, 2, 3, 4, 5, 6, 0], open: "10:00", close: "20:00" }],
    },
    content: {
      shortDescription:
        "運河沿いの風を感じる、落ち着いた雰囲気のルーフトップスポット。",
      longDescription:
        "運河沿いの風を感じる、落ち着いた雰囲気のルーフトップスポット。夕方以降はライトアップされた景観が魅力です。",
      sourceLabel: "提携先ページ（ダミー）",
      sourceUrl: "https://example.com/canal-side-roof",
      images: [
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    ar: {
      icon: "🛶",
      soraColor: "#ffffff",
    },
    solarScore: 74,
    nightViewScore: 83,
    nightFeatures: ["Canal Reflection", "Blue Hour View"],
  },
];

export const SPOT_CATALOG: SpotCatalogItem[] = SPOT_CATALOG_SOURCE.map((spot) => ({
  ...spot,
  todaySolar: buildTodaySolar(spot.geo.lat, spot.geo.lng),
}));

export const SKY_SPOTS: SkySpot[] = SPOT_CATALOG.map((spot) => ({
  id: spot.id,
  name: spot.name.ja,
  lat: spot.geo.lat,
  lng: spot.geo.lng,
  altitude: spot.geo.altitudeMeters ?? 20,
  icon: spot.ar.icon,
  location: spot.address.area,
  soraColor: spot.ar.soraColor,
}));

// AR のスポット詳細カード用データ
export const FREE_SPOTS: FreeSpot[] = SPOT_CATALOG.map((spot) => ({
  id: spot.id,
  name: spot.name.ja,
  description: spot.content.longDescription,
  distanceLabel: `${spot.address.area} エリア`,
  images: spot.content.images,
  sourceLabel: spot.content.sourceLabel,
  sourceUrl: spot.content.sourceUrl,
  todaySolar: spot.todaySolar,
  nightFeatures: spot.nightFeatures,
}));

export const getFreeSpotById = (id: string): FreeSpot | undefined =>
  FREE_SPOTS.find((spot) => spot.id === id);