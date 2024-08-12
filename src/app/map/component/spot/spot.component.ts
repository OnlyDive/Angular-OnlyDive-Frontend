import { Component } from '@angular/core';
import {MapComponent} from "../map/map.component";
import {MapSpotEnum} from "../../../model/MapSpotEnum";
import {AddSpotComponent} from "../add-spot/add-spot.component";
import {ButtonComponent} from "../../../tools/button/button.component";
import {NgIf, NgStyle} from "@angular/common";
import {Subscription} from "rxjs";
import {UiService} from "../../service/ui.service";
import {SpotRequest} from "../../../DTO/SpotRequest";
import {absoluteFrom} from "@angular/compiler-cli";

@Component({
  selector: 'app-spot',
  standalone: true,
  imports: [
    MapComponent,
    AddSpotComponent,
    ButtonComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './spot.component.html',
  styleUrl: './spot.component.css'
})
export class SpotComponent {
  menuSpotMode: MapSpotEnum = MapSpotEnum.DEFAULT;
  subscription: Subscription;
  protected readonly MapSpotEnum = MapSpotEnum;

  constructor(private uiService:UiService) {
    this.subscription = uiService.onToggle().subscribe(
      value => this.menuSpotMode = value
    )
  }

  toggleMenuMode(mode: MapSpotEnum) {
    this.uiService.toggleMenuMode(mode);
  }

  //comunication with spring
  createSpot(spot: SpotRequest) {
    //this.spotService.createSpot(spot);
  }

  protected readonly absoluteFrom = absoluteFrom;
}
