import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";
import {Spot} from "../../../interface/spot";
import * as L from 'leaflet';


@Component({
  selector: 'app-add-spot',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-spot.component.html',
  styleUrl: './add-spot.component.css'
})
export class AddSpotComponent {
  @Output() onAddSpot = new EventEmitter<Spot>();
  spotRequest: Spot = {name:"",coordinates:L.latLng(0,0),description:""};
  subscriptionToSelectSpot: Subscription;

  constructor(private mapService:MapService) {

    this.subscriptionToSelectSpot = mapService.onClick().subscribe(
      value => {
        this.spotRequest.coordinates.lat = value.lat;
        this.spotRequest.coordinates.lng = value.lng;
      }
    )
  }

  onSubmit() {
    this.onAddSpot.emit(this.spotRequest)
  }
}
