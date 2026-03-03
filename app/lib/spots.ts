export interface SkySpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
  altitude: number;
  icon: string;
  location: string;
  soraColor: string;
}

export const SKY_SPOTS: SkySpot[] = [
  {
    id: 1,
    name: "HILLS BEACH IIDABASHI",
    lat: 35.7021,
    lng: 139.7448,
    altitude: 45,
    icon: "🏖️",
    location: "飯田橋 3-1",
    soraColor: "#ff9c2a",
  },
  {
    id: 2,
    name: "KAGURAZAKA TERRACE",
    lat: 35.7005,
    lng: 139.7405,
    altitude: 30,
    icon: "☕",
    location: "神楽坂 5-12",
    soraColor: "#3b82f6",
  },
  {
    id: 3,
    name: "CANAL SIDE ROOF",
    lat: 35.6995,
    lng: 139.743,
    altitude: 25,
    icon: "🛶",
    location: "外堀通り沿い",
    soraColor: "#ffffff",
  },
];

export interface FreeSpot {
  id: number;
  name: string;
  description: string;
  distanceLabel?: string;
  images: string[];
  sourceLabel: string;
  sourceUrl: string;
}

// AR のスポット詳細カード用ダミーデータ
export const FREE_SPOTS: FreeSpot[] = [
  {
    id: 1,
    name: "HILLS BEACH IIDABASHI",
    description:
      "飯田橋エリアの屋上テラス。都心とは思えない開放感のあるビアガーデンスタイルのスペースです。",
    distanceLabel: "徒歩 8 分・約 600m",
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1200&q=80",
    ],
    sourceLabel: "公式サイト（ダミー）",
    sourceUrl: "https://example.com/hills-beach-iidabashi",
  },
];

export const getFreeSpotById = (id: number): FreeSpot | undefined =>
  FREE_SPOTS.find((spot) => spot.id === id);