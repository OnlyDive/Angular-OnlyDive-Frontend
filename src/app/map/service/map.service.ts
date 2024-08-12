import {Injectable} from '@angular/core';
import * as L from "leaflet";
import {AngularOnlyDiveExeption} from "../../error/AngularOnlyDiveExeption";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?: L.Map;
  private subject = new Subject<L.LatLng>();

  constructor() { }

  initMap() : void{
    this.map = L.map('map');
    this.setMapCoordinates([52.5,21],13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on('click',
      (e: L.LeafletMouseEvent) => this.subject.next(e.latlng)
    )
  }

  setMapCoordinates(coordinates: L.LatLngExpression, zoomLevel? : number) : void{
    if (this.map) {
      this.map.setView(coordinates, zoomLevel || this.map.getZoom());
    } else throw new AngularOnlyDiveExeption("map has not been init");
  }

  onClick(){
    return this.subject.asObservable();
  }
}
