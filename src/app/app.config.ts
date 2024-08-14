import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withDebugTracing} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { customInterceptor } from './auth/service/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withDebugTracing()),
    provideHttpClient(/*withInterceptors([customInterceptor])*/)
  ]
};
