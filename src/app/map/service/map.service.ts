import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Spot} from "../../interface/spot";
import {AngularOnlyDiveExeption} from "../../error/AngularOnlyDiveExeption";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!:google.maps.Map;
  private cordsSubject = new Subject<google.maps.LatLngLiteral>();
  spotClicked = new EventEmitter<number>();
  private markers:any[] = []

  constructor() {}

  async initMap(){
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    this.map = new Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 13,
        center: {lat: 52.5,lng: 21},
        mapId: '88e0fe89bab80243', //zmienic
        streetViewControl:false,
        fullscreenControl:false,
        mapTypeControl:false,
        zoomControlOptions: {
          position:google.maps.ControlPosition.TOP_LEFT
        }
      }
    )

    this.map.addListener('click',
      (e: google.maps.MapMouseEvent) => {
        if (e.latLng)
          this.cordsSubject.next(e.latLng.toJSON())
      }
    )
  }

  onClick(){
    return this.cordsSubject.asObservable();
  }

  async addSpot(spot: Spot){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const coordinates: google.maps.LatLngLiteral  = {lat: spot.latitude,lng: spot.longitude};
    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: coordinates
    })

    marker.addListener('click', () =>
      this.spotClicked.emit(spot.id));

    this.markers.push(marker);

    return marker;
  }


  removeSpot(spot: Spot) {
    const marker = this.markers.find(
      m=> m.position?.lat === spot.latitude &&
        m.position?.lng === spot.longitude
    )
    if (!marker) throw new AngularOnlyDiveExeption("this spot is not on the map")

    this.markers = this.markers.filter(m =>
      m !== marker
    )
    marker.setMap(null)
  }
}
