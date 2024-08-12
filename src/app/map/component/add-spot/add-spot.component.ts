import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";
import {Spot} from "../../../interface/spot";
import {UiService} from "../../service/ui.service";
import {MapSpotEnum} from "../../../model/MapSpotEnum";


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
  spotRequest: Spot = {name:"",longitude:0,latitude:0,description:""};
  spotWasSelected:boolean = false;
  subscriptionToSelectSpot: Subscription;

  constructor(private mapService:MapService,
              private uiService:UiService) {

    this.subscriptionToSelectSpot = mapService.onClick().subscribe(
      value => {
        this.spotRequest.latitude = value.lat;
        this.spotRequest.longitude = value.lng;
        this.spotWasSelected = true;
      }
    )
  }

  onSubmit() {
    if (this.spotRequest.name == "" || !this.spotWasSelected){
      alert("Please select properly");
      return;
    }

    this.onAddSpot.emit(this.spotRequest);
    this.uiService.toggleMenuMode(MapSpotEnum.DEFAULT);
  }
}
