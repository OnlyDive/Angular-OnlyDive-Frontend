import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MapSpotEnum} from "../../model/MapSpotEnum";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddSpot = MapSpotEnum.DEFAULT;
  private subject = new Subject<MapSpotEnum>();

  constructor() { }

  toggleMenuMode(mapMode :MapSpotEnum){
    this.showAddSpot = mapMode;
    this.subject.next(this.showAddSpot);
  }

  onToggle(){
    return this.subject.asObservable();
  }

}
