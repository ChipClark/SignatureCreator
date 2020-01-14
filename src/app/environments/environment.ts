// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment =  {
  "clientId": "071258f8-f1d1-4b05-9a13-47dcfca72a04",
  "tenant": "ff882bc2-9a86-4418-beb2-a65db40835d8",
  // redirectUri: 'https://pd.azurewebsites.net/',
  // redirectUri: 'localhost:3800/',
  // postLogoutRedirectUri: window.location.origin + '/',
  endpoint: {
    "https://amazng-webapi.azurewebsites.net": "5be88488-9e45-45a8-9601-0809d1c8936f"
  },
  navigateToLoginRequestUrl: false,
  cacheLocation: 'sessionStorage',
};




      

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
