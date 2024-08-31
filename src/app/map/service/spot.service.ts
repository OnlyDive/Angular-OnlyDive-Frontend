import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spot} from "../../interface/spot";
import {httpOptionsForJSON} from "../../model/httpOptions";

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  private apiUrl: string = 'http://localhost:8080/api/v1/spot';

  constructor(private http: HttpClient) {}

  createSpot(spot: Spot){
    let spotDto = {
      name: spot.name,
      longitude: spot.longitude,
      latitude: spot.latitude
    };
    return this.http.post<Spot>(this.apiUrl + '/create',spotDto,httpOptionsForJSON);
  }

  getAllSpots(){
    return this.http.get<Spot[]>(this.apiUrl + '/get/all',httpOptionsForJSON);
  }

  getSpot(spotId:number){
    return this.http.get<Spot>(this.apiUrl + `/get/${spotId}`,httpOptionsForJSON);
  }

  deleteSpot(spotId:number){
    return this.http.delete<string>(this.apiUrl + `/delete/${spotId}`, )
  }

}
