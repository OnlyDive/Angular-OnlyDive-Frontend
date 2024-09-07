import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) {}

  openInGoogleMaps(cords: google.maps.LatLngLiteral) {
    const url = `https://www.google.com/maps?q=${cords.lat},${cords.lng}`;
    window.open(url, '_blank');
  }

  reverseGeocode(cords: google.maps.LatLngLiteral) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cords.lat},${cords.lng}&key=${environment.googleMapsApiKey}`

    return this.http.get<any>(url);
  }
}
