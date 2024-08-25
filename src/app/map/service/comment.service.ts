import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SpotComment} from "../../interface/SpotComment";
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
export class CommentService {
  private apiUrl: string = 'http://localhost:8080/api/v1/spotComment';


  constructor(private http: HttpClient) { }

  getCommentsForSpotByPage(page: number, spot:Spot) {
    return this.http.get<SpotComment[]>(this.apiUrl + `/get/${spot.id}/${page}`,httpOptions)
  }

  createComment(comment: SpotComment) {
    return this.http.post<SpotComment>(this.apiUrl + '/create', comment, httpOptions);
  }
}
