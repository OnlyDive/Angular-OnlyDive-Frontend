import { Injectable } from '@angular/core';
import {HttpClient,} from "@angular/common/http";
import {SpotComment} from "../../interface/SpotComment";
import {Spot} from "../../interface/spot";
import {httpOptionsForJSON, httpOptionsForRaw} from "../../model/httpOptions";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl: string = 'http://localhost:8080/api/v1/spotComment';


  constructor(private http: HttpClient) { }

  getCommentsForSpotByPage(page: number, spot:Spot) {
    return this.http.get<SpotComment[]>(this.apiUrl + `/get/${spot.uuid}/${page}`,httpOptionsForJSON)
  }

  createComment(comment: SpotComment) {
    return this.http.post<SpotComment>(this.apiUrl + '/create', comment, httpOptionsForJSON);
  }

  deleteComment(commentId: number) {
    return this.http.delete<string>(this.apiUrl + `/delete/${commentId}`,httpOptionsForRaw)
  }
}
