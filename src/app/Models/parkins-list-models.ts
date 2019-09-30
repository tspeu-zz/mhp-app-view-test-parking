export interface UserParking {
  idUser: number;
  text: string;
  idParking: number;
  location: {
    coordinates: { lat: number; lon: number };
  };
  isEnterParking: boolean;
}
