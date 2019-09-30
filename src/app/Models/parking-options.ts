export interface UserOptions {
  idUser: number;
  text: string;
  idParking: number;
  location: {
    type: { type: string };
    coordinates: [];
  };
  isEnterParking: boolean;
}
