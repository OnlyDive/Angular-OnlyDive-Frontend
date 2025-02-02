import { Routes } from '@angular/router';
import { MapComponent } from "./map/component/map/map.component";
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { LogInComponent } from './auth/component/log-in/log-in.component';
import { VerifyAccountComponent } from './auth/component/verify-account/verify-account.component';
import { LogOutComponent } from './auth/component/log-out/log-out.component';
import { UserProfileComponent } from './people/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', component: MapComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'logIn', component: LogInComponent},
    { path: 'verifyAccount/:verificationToken', component: VerifyAccountComponent },
    { path: 'logOut', component: LogOutComponent },
    { path: 'profile/:username', component: UserProfileComponent }
];
