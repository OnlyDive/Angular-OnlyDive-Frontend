import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spot} from "../../interface/spot";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  }),
  responseType: 'json' as 'json'
}

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
    return this.http.post<Spot>(this.apiUrl + '/create',spotDto,httpOptions);
  }

  getAllSpots(){
    return this.http.get<Spot[]>(this.apiUrl + '/get/all',httpOptions);
  }

  getSpot(spotId:number){
    return this.http.get<Spot>(this.apiUrl + `/get/${spotId}`,httpOptions);
  }

}
