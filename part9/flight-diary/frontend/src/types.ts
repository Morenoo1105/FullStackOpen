export enum WeatherType {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum VisibilityType {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntryType {
  id: number;
  date: string;
  weather: WeatherType | string;
  visibility: VisibilityType | string;
  comment: string;
}

export type NewDiaryEntryType = Omit<DiaryEntryType, "id">;
