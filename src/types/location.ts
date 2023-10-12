export interface Location {
  place_id: string;
  address: string;
  name: string;
  latitude: number | string;
  longitude: number | string;
  vicinity?: string;
  description?: string;
}
