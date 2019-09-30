export interface parkingLot {
  idParking: number;
  location: {
    type: 'Point';
    coordinates: { lat: number; lon: number };
  };
}
/*
{ 
	"idUser": 1,
    "text": "test2",
    "idParking": 1,
    "location": {
  "type": "Point",
    "coordinates": {"lat":36.098948, "lon":-10}
  },
    "isEnterParking": false
    */
