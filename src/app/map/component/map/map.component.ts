import {Component, OnInit} from '@angular/core';
import {MapService} from "../../service/map.service";
import {UiService} from "../../service/ui.service";
import {MapSpotEnum} from "../../../model/MapSpotEnum";
import {NgIf, NgStyle} from "@angular/common";
import {AddSpotComponent} from "../add-spot/add-spot.component";
import {SpotService} from "../../service/spot.service";
import {Spot} from "../../../interface/spot";
import {ViewSpotComponent} from "../view-spot/view-spot.component";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf,
    AddSpotComponent,
    ViewSpotComponent,
    NgStyle
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css','../../../styles/buttonStyles.css']
})

export class MapComponent implements OnInit {
  menuSpotMode = MapSpotEnum.DEFAULT;
  selectedSpot!: Spot;

  protected readonly MapSpotEnum = MapSpotEnum;

  constructor(private mapService: MapService,
              private uiService:UiService,
              private spotService: SpotService) {}

  ngOnInit(): void {
    this.mapService.initMap().then()
    this.uiService.onToggle().subscribe(
      value => this.menuSpotMode = value
    )
    this.spotService.getAllSpots().subscribe(value => {
      value.forEach( spot =>this.mapService.addSpot(spot))
    })
    this.mapService.spotClicked.subscribe(
      id => this.onSeletedSpot(id)
    )
  }

  toggleMenuMode(mode: MapSpotEnum) {
    this.uiService.toggleMenuMode(mode)
  }

  createSpot(spot: Spot) {
    this.spotService.createSpot(spot).subscribe(
      spot =>
        this.mapService.addSpot(spot)
    );
  }

  onSeletedSpot(spotId: number) {
    this.spotService.getSpot(spotId).subscribe(
      spot => {
        this.selectedSpot = spot
        this.toggleMenuMode(MapSpotEnum.VIEW)
      })
  }

  removeSpot(spot: Spot) {
    this.mapService.removeSpot(spot);
    this.menuSpotMode = MapSpotEnum.DEFAULT;
  }
}
