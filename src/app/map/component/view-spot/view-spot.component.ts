import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Spot} from "../../../interface/spot";

@Component({
  selector: 'app-view-spot',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './view-spot.component.html',
  styleUrl: './view-spot.component.css'
})
export class ViewSpotComponent {
  @Input() spot!:Spot;
}
