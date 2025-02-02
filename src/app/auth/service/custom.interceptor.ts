import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RefreshTokenRequest } from '../../interface/RefreshTokenRequest';
import { Observable, throwError } from 'rxjs'; 
import { catchError, switchMap } from 'rxjs/operators'

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes('maps.googleapis.com') || (!req.url.includes("Permissions") && req.url.includes('auth')))
    return next(req);

  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    console.log(req.url, authService.isLoggedIn())
    authService.checkLogIn();
  }


  const jwt = authService.getJWT();

  if (jwt.jwtToken == undefined) {
    return next(req);
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt.jwtToken}`
    }
  })

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refreshToken')) {
        const refreshTokenRequest:RefreshTokenRequest = {
          refreshToken: jwt.refreshToken,
          username: jwt.user
        }
        return authService.refreshToken(refreshTokenRequest).pipe(
          switchMap((response: any) => {
            authService.saveJWT(response);
            const newClonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.jwtToken}`
              }
            });
            return next(newClonedRequest);
          }),
          catchError(err => {
            authService.logOut();
            window.location.reload();
            return throwError(err);
          })
        );
      }
      return throwError(error);
    })
  );
};
