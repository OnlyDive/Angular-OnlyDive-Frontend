import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { ErrorsService } from '../../../error/errors.service';
import { SignUpRequest } from '../../../interface/SignUpRequest';
import { MessageComponent } from '../../../component/message/message.component';
import { CommonModule } from '@angular/common';
import { MessageInfo } from '../../../component/message/MessageInfo';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ CommonModule, FormsModule, MessageComponent ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css'],
})
export class SignUpComponent {
  repeatPassword: string = "";
  signUpRequest: SignUpRequest = { email:"", username:"", firstName:"", lastName:"", password:"" };

  messageInfo: MessageInfo;

  constructor(private errorsService: ErrorsService, private authService: AuthService, private router: Router) {
    this.messageInfo = MessageComponent.prototype.getDefaultErrorConfiguration();
  }

  onSubmit() {
    if (this.signUpRequest.password != this.repeatPassword) {
      this.messageInfo.text = "Password and repeated password must match!";
      this.messageInfo.enabled = true;
      return;
    }

    this.authService.signUp(this.signUpRequest).subscribe({
      next: (v) => {
        console.log(v);
        sessionStorage.setItem("redirectionLogIn", "true");
        sessionStorage.setItem("redirectionLogInText", "Sign Up completed, please check you email to activate the account");
        this.router.navigate(['/logIn'])
      },
      error: (e) => {
        this.messageInfo = this.errorsService.getResponseErrors(e)[1];
      }
    });
  }
}
