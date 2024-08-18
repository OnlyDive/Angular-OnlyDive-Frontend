import {EventEmitter, Injectable} from '@angular/core';
import * as L from "leaflet";
import {AngularOnlyDiveExeption} from "../../error/AngularOnlyDiveExeption";
import {Subject} from "rxjs";
import {Spot} from "../../interface/spot";


@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private cordsSubject = new Subject<L.LatLng>();
  spotClicked = new EventEmitter<number>();

  constructor() { }

  initMap() : void{
    this.map = L.map('map');
    this.setMapCoordinates([52.5,21],13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on('click',
      (e: L.LeafletMouseEvent) => this.cordsSubject.next(e.latlng)
    )
  }

  setMapCoordinates(coordinates: L.LatLngExpression, zoomLevel? : number) : void{
    if (this.map) {
      this.map.setView(coordinates, zoomLevel || this.map.getZoom());
    } else throw new AngularOnlyDiveExeption("map has not been init");
  }

  onClick(){
    return this.cordsSubject.asObservable();
  }

  addSpot(spot: Spot){
    const coordinates: L.LatLngExpression = [spot.latitude,spot.longitude];
    console.log(spot);
    const marker = L.marker(coordinates).addTo(this.map);

    marker.on('click', () =>
      this.spotClicked.emit(spot.id));
  }
}
