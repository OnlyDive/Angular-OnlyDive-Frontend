import {Component, OnInit} from '@angular/core';
import {MapService} from "../../service/map.service";
import {ButtonComponent} from "../../../tools/button/button.component";

@Component({
  selector: 'app-map',
  standalone: true,
    imports: [
        ButtonComponent
    ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.initMap();
  }

}
