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
    { id: 1, name: "HILLS BEACH IIDABASHI", lat: 35.7021, lng: 139.7448, altitude: 45, icon: "🏖️", location: "飯田橋 3-1", soraColor: "#ff9c2a" },
    { id: 2, name: "KAGURAZAKA TERRACE", lat: 35.7005, lng: 139.7405, altitude: 30, icon: "☕", location: "神楽坂 5-12", soraColor: "#3b82f6" },
    { id: 3, name: "CANAL SIDE ROOF", lat: 35.6995, lng: 139.7430, altitude: 25, icon: "🛶", location: "外堀通り沿い", soraColor: "#ffffff" },
  ];