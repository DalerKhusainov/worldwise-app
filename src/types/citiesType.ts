export interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface CountryType {
  country: string;
  emoji: string;
}
