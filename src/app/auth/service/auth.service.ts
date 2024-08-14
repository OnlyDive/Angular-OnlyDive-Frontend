import { Injectable } from '@angular/core';
import { SignUpRequest } from '../../interface/SignUpRequest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/v1/auth'

  constructor(private http: HttpClient) { }

  signUp(signUpRequest: SignUpRequest): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/signUp`;
    return this.http.post<HttpResponse<any>>(url, signUpRequest, httpOptions)
  }
}
