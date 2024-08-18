import { Injectable } from '@angular/core';
import { SignUpRequest } from '../../interface/SignUpRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogInRequest } from '../../interface/LogInRequest';
import { RefreshTokenRequest } from '../../interface/RefreshTokenRequest';
import { Router } from '@angular/router';
import {AuthResponse} from "../../interface/AuthResponse";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
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

  saveJWT(jwt: AuthResponse) {
    localStorage.setItem("JWT", JSON.stringify(jwt));
  }

  removeJWT() {
    localStorage.removeItem("JWT");
  }

  getJWT() {
    const auth:AuthResponse = JSON.parse(localStorage.getItem("JWT") || "{}");
    return auth;
  }

  isLoggedIn(): boolean {
    const jwt = this.getJWT();

    if (jwt.jwtToken == undefined) return false;

    const curTime = new Date();
    curTime.setMinutes(curTime.getMinutes() + 5);

    const jwtTokenExpire = new Date(jwt.expires);

    return curTime.getTime() < jwtTokenExpire.getTime();

  }

  checkLogIn(): void {
    const jwt = this.getJWT();
    if (jwt.jwtToken == undefined) return;

    const curTime = new Date();
    curTime.setHours(curTime.getHours() + 1);
    const jwtTokenExpire = new Date(jwt.expires);


    if (curTime.getTime() < jwtTokenExpire.getTime()) {
      if (this.router.url != '/')
        this.router.navigate(['/']);
    }

    console.log("refreshing token");

    const refreshTokenRequest: RefreshTokenRequest = { refreshToken: jwt.refreshToken, username: jwt.user };

    this.refreshToken(refreshTokenRequest).subscribe({
      next: (v) => {
        this.saveJWT(v);
        if (this.router.url != '/')
          this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest)  {
    const url = `${this.apiUrl}/refreshToken`;
    return this.http.post<AuthResponse>(url, refreshTokenRequest, httpOptions);
  }

  signUp(signUpRequest: SignUpRequest) {
    const url = `${this.apiUrl}/signUp`;
    return this.http.post<string>(url, signUpRequest, httpOptions)
  }

  logIn(logInRequest: LogInRequest){
    const url = `${this.apiUrl}/logIn`;
    return this.http.post<AuthResponse>(url, logInRequest, httpOptions);
  }

  verifyAccount(verificationToken: string) {
    const url = `${this.apiUrl}/verifyAccount/${verificationToken}`;
    return this.http.get<string>(url, httpOptions);
  }

  logOut() {

    const jwt = this.getJWT();

    this.removeJWT();

    const logOutRequest: RefreshTokenRequest = { refreshToken: jwt.refreshToken, username: jwt.user };

    const url = `${this.apiUrl}/logOut`;
    return this.http.post<string>(url, logOutRequest, httpOptions);

  }
}
