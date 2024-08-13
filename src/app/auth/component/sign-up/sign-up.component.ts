import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { SignUpRequest } from '../../../dto/SignUpRequest';
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
  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  repeatPassword!: string;

  alertColor: string = "Crimson";
  alertText!: string;
  showErrorAlert: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password == undefined || this.password.trim() == "") {
      this.alertText = "Password must not be empty";
      this.showErrorAlert = true;
      return;
    } else if (this.password != this.repeatPassword) {
      this.alertText = "Password and repeated password must match!";
      this.showErrorAlert = true;
      return;
    }

    const signUpRequest: SignUpRequest = {
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };

    this.authService.signUp(signUpRequest).subscribe({
      next: (v) => {
        console.log(v);
        sessionStorage.setItem("afterSuccessfulSignUp", "true");
        this.router.navigate(['/logIn'])
      },
      error: (e) => {
        console.log(e);
        try {
          const errorResponse = JSON.parse(e.error);
          if (errorResponse.error != undefined) {
            this.alertText = "Error: "+errorResponse.error;
          } 
          else if (errorResponse.errors != undefined) {
            this.alertText = "Errors: "+errorResponse.errors.join(', ');
          }
          this.showErrorAlert = true;
        } catch(ex) {
          this.alertText = "Error: "+e.error;
          this.showErrorAlert = true;
        }
      }
    });;
  }
}
