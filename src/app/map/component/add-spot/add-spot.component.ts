import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {MapService} from "../../service/map.service";
import {Spot} from "../../../interface/spot";
import {UiService} from "../../service/ui.service";
import {MapSpotEnum} from "../../../model/MapSpotEnum";
import {AngularOnlyDiveExeption} from "../../../error/AngularOnlyDiveExeption";


@Component({
  selector: 'app-add-spot',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.css','../../../styles/map-popUp.css','../../../styles/buttonStyles.css',
  '../../../styles/mapFormStyles.css']
})
export class AddSpotComponent implements OnInit{
  @Output() onAddSpot = new EventEmitter<Spot>();
  spotRequest: Spot = {name:"",longitude:0,latitude:0};
  spotWasSelected:boolean = false;
  subscriptionToSelectSpot!: Subscription;

  constructor(private mapService:MapService,
              private uiService:UiService,
              private cdr:ChangeDetectorRef) {}

  ngOnInit(){
    this.subscriptionToSelectSpot = this.mapService.onClick().subscribe(
      value => {
        this.spotRequest.latitude = value.lat;
        this.spotRequest.longitude = value.lng;
        this.spotWasSelected = true;
        this.cdr.detectChanges();
      }
    )
  }

  onSubmit() {
    if (this.spotRequest.name == "" ||
      !this.spotWasSelected)
      throw new AngularOnlyDiveExeption("Info has not been selected properly")


    this.onAddSpot.emit(this.spotRequest);
    this.uiService.toggleMenuMode(MapSpotEnum.DEFAULT);
  }
}
