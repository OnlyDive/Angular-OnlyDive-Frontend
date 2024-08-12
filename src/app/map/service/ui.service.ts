import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MapSpotEnum} from "../../model/MapSpotEnum";
import {SpotResponse} from "../../interface/SpotResponse";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddSpot:MapSpotEnum = MapSpotEnum.DEFAULT;
  private subject = new Subject<MapSpotEnum>();

  constructor() { }

  toggleMenuMode(mapMode :MapSpotEnum){
    this.showAddSpot = mapMode;
    this.subject.next(this.showAddSpot);
  }

  onToggle(){
    return this.subject.asObservable();
  }

  addSpot(spot: SpotResponse){
    L.marker([spot.latitude,spot.longitude])
  }
}
