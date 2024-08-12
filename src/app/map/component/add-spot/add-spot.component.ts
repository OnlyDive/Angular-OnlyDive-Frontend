import {Component, EventEmitter, Output} from '@angular/core';
import {SpotRequest} from "../../../DTO/SpotRequest";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";

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
  @Output() onAddSpot = new EventEmitter<SpotRequest>();
  spotRequest: SpotRequest = {name:"",longitude:0,latitude:0};
  subscriptionToSelectSpot: Subscription;

  constructor(private mapService:MapService) {

    this.subscriptionToSelectSpot = mapService.onClick().subscribe(
      value => {
        this.spotRequest.latitude = value.lat;
        this.spotRequest.longitude = value.lng;
      }
    )
  }

  onSubmit() {
    this.onAddSpot.emit(this.spotRequest)
  }
}
