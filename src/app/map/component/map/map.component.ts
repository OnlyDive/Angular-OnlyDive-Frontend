import {Component, EventEmitter, OnInit, output, Output} from '@angular/core';
import {MapService} from "../../service/map.service";
import {UiService} from "../../service/ui.service";
import {MapSpotEnum} from "../../../model/MapSpotEnum";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {ButtonComponent} from "../../../tools/button/button.component";
import {AddSpotComponent} from "../add-spot/add-spot.component";
import {SpotService} from "../../service/spot.service";
import {Spot} from "../../../interface/spot";
import {ViewSpotComponent} from "../view-spot/view-spot.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    AddSpotComponent,
    ViewSpotComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  menuSpotMode = MapSpotEnum.DEFAULT;
  spots: Spot[] = [];

  protected readonly MapSpotEnum = MapSpotEnum;

  constructor(private mapService: MapService,
              private uiService:UiService,
              private spotService: SpotService) {
    uiService.onToggle().subscribe(
      value => this.menuSpotMode = value
    )
    this.spotService.getAllSpots().subscribe(value => {
        this.spots = value;
        this.spots.forEach( spot => this.mapService.addSpot(spot))
    })
  }

  ngOnInit(): void {
    this.mapService.initMap()
  }

  toggleMenuMode(mode: MapSpotEnum) {
    this.uiService.toggleMenuMode(mode)
  }

  createSpot(spot: Spot) {
    this.spotService.createSpot(spot).subscribe(
      spot => {
        console.log(spot)
        this.spots.push(spot)
        this.mapService.addSpot(spot)
      }
    );
  }
}
