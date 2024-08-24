import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Spot} from "../../../interface/spot";
import {ButtonComponent} from "../../../tools/button/button.component";

@Component({
  selector: 'app-view-spot',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './view-spot.component.html',
  styleUrls: ['./view-spot.component.css','../../../styles/mapStyles.css','../../../styles/buttonStyles.css']
})
export class ViewSpotComponent{
  @Input() spot!:Spot;

  openInGoogleMaps() {
    const url = `https://www.google.com/maps?q=${this.spot.latitude},${this.spot.longitude}`;
    window.open(url, '_blank');
  }
}
