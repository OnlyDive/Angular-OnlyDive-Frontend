import { Routes } from '@angular/router';
import { MapComponent } from "./map/component/map/map.component";
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { LogInComponent } from './auth/component/log-in/log-in.component';

export const routes: Routes = [
    { path: '', component: MapComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'logIn', component: LogInComponent}
];
