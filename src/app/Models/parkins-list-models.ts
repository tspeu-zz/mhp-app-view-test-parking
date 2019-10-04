export interface UserParking {
  idUser: number;
  text: string;
  idParking: number;
  location: {
    type: string;
    coordinates: [number, number];
  };
  isEnterParking: boolean;
}
