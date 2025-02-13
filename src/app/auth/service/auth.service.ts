import { Injectable } from '@angular/core';
import { SignUpRequest } from '../../interface/SignUpRequest';
import { HttpClient } from '@angular/common/http';
import { LogInDto } from '../../interface/LogInDto';
import { RefreshTokenRequest } from '../../interface/RefreshTokenRequest';
import { Router } from '@angular/router';
import {AuthResponse} from "../../interface/AuthResponse";
import {httpOptionsForRaw,httpOptionsForJSON} from "../../model/httpOptions";
import {Permission} from "../../interface/Permission";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/v1/auth'

  constructor(private http: HttpClient, private router: Router) {
    if (!this.router.url.startsWith('/logOut') && !this.router.url.startsWith("/verifyAccount") && !this.isLoggedIn()) {
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

  getUsername() {
    const JWT = this.getJWT();
    if (JWT.user === undefined) {
      throw Error("JWT user does not exist");
    }
    return JWT.user;
  }

  isLoggedIn(): boolean {
    const jwt = this.getJWT();

    if (jwt.jwtToken == undefined) return false;

    const curTime = new Date();
    curTime.setMinutes(curTime.getMinutes() + 5);

    const jwtTokenExpire = new Date(jwt.expires);

    return curTime.getTime()/1000 < jwtTokenExpire.getTime()/1000;

  }

  checkLogIn(): void {
    const jwt = this.getJWT();
    if (jwt.jwtToken == undefined) return;

    const curTime = new Date();
    curTime.setHours(curTime.getHours() + 1);
    const jwtTokenExpire = new Date(jwt.expires);


    if (curTime.getTime()/1000 < jwtTokenExpire.getTime()/1000) {
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
        this.logOut();
        window.location.reload();
      }
    });

  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest)  {
    const url = `${this.apiUrl}/refreshToken`;
    return this.http.post<AuthResponse>(url, refreshTokenRequest, httpOptionsForJSON);
  }

  signUp(signUpRequest: SignUpRequest) {
    const url = `${this.apiUrl}/signUp`;
    return this.http.post<String>(url, signUpRequest, httpOptionsForRaw)
  }

  logIn(logInDto: LogInDto){
    const url = `${this.apiUrl}/logIn`;
    return this.http.post<AuthResponse>(url, logInDto, httpOptionsForJSON);
  }

  verifyAccount(verificationToken: string) {
    const url = `${this.apiUrl}/verifyAccount/${verificationToken}`;
    return this.http.get<String>(url, httpOptionsForRaw);
  }

  logOut() {

    const jwt = this.getJWT();

    this.removeJWT();

    const logOutRequest: RefreshTokenRequest = { refreshToken: jwt.refreshToken, username: jwt.user };

    const url = `${this.apiUrl}/logOut`;
    return this.http.post<String>(url, logOutRequest, httpOptionsForRaw);

  }

  isCurrentUserPermitted(permissionRequest :Permission ){
    if (!permissionRequest.username)
      permissionRequest.username = ''
    return this.http.post<Boolean>(this.apiUrl + '/getCurrentUserPermissions',permissionRequest,httpOptionsForJSON);
  }
}
