// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapsAPIKey: 'AIzaSyCqoxTUdPOwLkUNUTDVyJqssA-m_c0QTac',
  apiParking: 'https://localhost:3000/api/parking/',
  apiUser: 'https://localhost:5001/api/User',
  _URL_ALL_USERS : 'https://localhost:5001/api/User',
  _URL_USER_EMAIL : 'https://localhost:5001/api/User/email'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
