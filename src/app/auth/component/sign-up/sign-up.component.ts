import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { ErrorsService } from '../../service/errors.service';
import { SignUpRequest } from '../../../interface/SignUpRequest';
import { MessageComponent } from '../../../tools/message/message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ CommonModule, FormsModule, MessageComponent ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css'],
})
export class SignUpComponent {
  repeatPassword: string = "";
  signUpRequest: SignUpRequest = { email:"", username:"", firstName:"", lastName:"", password:"" }

  alertColor: string = "Crimson";
  alertText!: string;
  showErrorAlert: boolean = false;

  constructor(private errorsService: ErrorsService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signUpRequest.password != this.repeatPassword) {
      this.alertText = "Password and repeated password must match!";
      this.showErrorAlert = true;
      return;
    }

    this.authService.signUp(this.signUpRequest).subscribe({
      next: (v) => {
        console.log(v);
        sessionStorage.setItem("afterSuccessfulSignUp", "true");
        this.router.navigate(['/logIn']).catch(e =>
          console.error('Navigation failed!', e))
      },
      error: (e) => {
        this.alertText = this.errorsService.getResponseErrors(e);
        this.showErrorAlert = true;
      }
    });
  }
}
