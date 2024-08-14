import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../../tools/message/message.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LogInRequest } from '../../../interface/LogInRequest';
import { AuthService } from '../../service/auth.service';
import { MessageInfo } from '../../../interface/MessageInfo';
import { ErrorsService } from '../../../error/errors.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ CommonModule, FormsModule, MessageComponent ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css']
})
export class LogInComponent {
  logInRequest: LogInRequest = { username:"", password:"" }
  messageInfo: MessageInfo = { 
    color: "LightGreen", 
    text: "Sign Up completed, please check you email to activate the account",
    textColor: "black",
    enabled: false
  }

  constructor(private router: Router, private authService: AuthService, private errorsService: ErrorsService) {}

  ngOnInit() {
    const afterSignUp = sessionStorage.getItem("afterSuccessfulSignUp");
    if (afterSignUp != null) {
      sessionStorage.removeItem("afterSuccessfulSignUp");
      this.messageInfo.enabled = Boolean(afterSignUp);
      console.log("Redirected after successful sign up!");
    }
  }

  onSubmit() {
    this.authService.logIn(this.logInRequest).subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigate(['/']).catch(e =>
          console.error('Navigation failed!', e))
      },
      error: (e) => {
        this.messageInfo = this.errorsService.getResponseErrors(e)[1];
      }
    });
  }
}
