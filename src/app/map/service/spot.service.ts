import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Spot} from "../../interface/spot";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  private apiUrl: string = 'http://localhost:8080/api/v1/spot';

  constructor(private http: HttpClient) {}

  createSpot(spot: Spot){
    return this.http.post<SpotResponse>(this.apiUrl + '/create',spot,httpOptions);
  }
}
