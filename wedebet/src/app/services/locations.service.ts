import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor() { }
  async getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      // Check if Geolocation API is available
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
        return;
      }

      // Check permissions before requesting location
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            // If already granted, get location directly
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else if (permissionStatus.state === 'prompt') {
            // If permission is not yet decided, ask the user
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            // If denied, reject immediately
            reject('Location permission denied. Please enable it in settings.');
          }
        })
        .catch(() => {
          // If permission API is unavailable, request location directly
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    });
  }
}
