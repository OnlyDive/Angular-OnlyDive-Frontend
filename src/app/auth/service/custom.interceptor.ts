import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const jwt = JSON.parse(localStorage.getItem("JWT") || "{}");

  if (jwt.jwtToken == undefined) {
    return next(req);
  }

  if(req.url.includes('maps.googleapis.com'))
    return next(req);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt.jwtToken}`
    }
  })

  return next(clonedRequest);
};
