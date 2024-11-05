import { Injectable } from '@angular/core';
import {httpOptionsForJSON} from "../../model/httpOptions";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserResponse } from '../../interface/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  fetchUser(username: string) {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<UserResponse>(url, httpOptionsForJSON)
  }

}
