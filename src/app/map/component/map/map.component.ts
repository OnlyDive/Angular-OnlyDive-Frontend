import {Component, OnInit} from '@angular/core';
import {MapService} from "../../service/map.service";
import {UiService} from "../../service/ui.service";
import {MapSpotEnum} from "../../../model/MapSpotEnum";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {ButtonComponent} from "../../../tools/button/button.component";
import {AddSpotComponent} from "../add-spot/add-spot.component";
import {SpotRequest} from "../../../DTO/SpotRequest";
import {SpotService} from "../../service/spot.service";
import {SpotResponse} from "../../../DTO/SpotResponse";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    AddSpotComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  menuSpotMode: MapSpotEnum = MapSpotEnum.DEFAULT;
  subscription: Subscription;
  protected readonly MapSpotEnum = MapSpotEnum;

  constructor(private mapService: MapService,
              private uiService:UiService,
              private spotService: SpotService) {
    this.subscription = uiService.onToggle().subscribe(
      value => this.menuSpotMode = value
    )
  }

  ngOnInit(): void {
    this.mapService.initMap();
  }

  toggleMenuMode(mode: MapSpotEnum) {
    this.uiService.toggleMenuMode(mode);
  }

  //comunication with spring
  createSpot(spot: SpotRequest) {
    this.spotService.createSpot(spot);
  }
}
