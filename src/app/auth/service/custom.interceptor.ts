import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const jwt = authService.getJWT();

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt.jwtToken}`
    }
  })

  return next(clonedRequest);
};
