import { Injectable } from '@angular/core';
import { SignUpRequest } from '../../interface/SignUpRequest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { LogInRequest } from '../../interface/LogInRequest';
import { RefreshTokenRequest } from '../../interface/RefreshTokenRequest';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { 
    if (!this.router.url.startsWith('/logOut') && !this.router.url.startsWith("/verifyAccount")) {
      this.checkLogIn();
    }
  }

  saveJWT(jwt: string) {
    localStorage.setItem("JWT", jwt);
  }

  removeJWT() {
    localStorage.removeItem("JWT");
  }

  getJWT(): any {
    return JSON.parse(localStorage.getItem("JWT") || "{}");
  }

  checkLogIn(): void {
    const jwt = this.getJWT();

    if (jwt.jwtToken == undefined) return;

    const curTime = Date.now()/1000;

    console.log(curTime, jwt.expires);

    if (curTime < jwt.expires) {
      this.router.navigate(['/']);
    }

    console.log("refreshing token");

    const refreshTokenRequest: RefreshTokenRequest = { refreshToken: jwt.refreshToken, username: jwt.user };

    this.refreshToken(refreshTokenRequest).subscribe({
      next: (v) => {
        console.log(v);
        this.saveJWT(v.toString());
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/refreshToken`;
    return this.http.post<HttpResponse<any>>(url, refreshTokenRequest, httpOptions);
  }

  signUp(signUpRequest: SignUpRequest): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/signUp`;
    return this.http.post<HttpResponse<any>>(url, signUpRequest, httpOptions)
  }

  logIn(logInRequest: LogInRequest): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/logIn`;
    return this.http.post<HttpResponse<any>>(url, logInRequest, httpOptions);
  }

  verifyAccount(verificationToken: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/verifyAccount/${verificationToken}`;
    return this.http.get<HttpResponse<any>>(url, httpOptions);
  }

  logOut(): Observable<HttpResponse<any>> {

    const jwt = this.getJWT();

    localStorage.removeItem("JWT");

    const logOutRequest: RefreshTokenRequest = { refreshToken: jwt.refreshToken, username: jwt.user };

    const url = `${this.apiUrl}/logOut`;
    return this.http.post<HttpResponse<any>>(url, logOutRequest, httpOptions);

  }
}
