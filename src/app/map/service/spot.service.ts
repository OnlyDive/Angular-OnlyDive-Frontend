import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Spot} from "../../interface/spot";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkb2RvIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE3MjM2MjIzNzksImV4cCI6MTcyMzc5NTE3OX0.qlWJtu2IUuGe9WivrJMkvdpbDzKg5_oGRYkXSUX9OM9nvWXUplJU3Hf4vNC_Cw74Fi9vCcL40EIicEl4QVc80g"
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

}
