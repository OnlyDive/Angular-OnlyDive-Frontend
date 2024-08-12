import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from "./map/component/map/map.component";
import {ButtonComponent} from "./tools/button/button.component";
import {AddSpotComponent} from "./map/component/add-spot/add-spot.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, ButtonComponent,AddSpotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OnlyDiveFrontend';
}
