import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../../../component/message/message.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LogInRequest } from '../../../interface/LogInRequest';
import { AuthService } from '../../service/auth.service';
import { MessageInfo } from '../../../component/message/MessageInfo';
import { ErrorsService } from '../../../error/errors.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ CommonModule, FormsModule, MessageComponent ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css']
})
export class LogInComponent implements OnInit{
  logInRequest: LogInRequest = { username:"", password:"" }
  messageInfo: MessageInfo;

  constructor(private router: Router, private authService: AuthService, private errorsService: ErrorsService) {
    this.messageInfo = MessageComponent.prototype.getDefaultMessageConfiguration();
  }

  ngOnInit() {
    const afterRedirection = sessionStorage.getItem("redirectionLogIn");
    if (afterRedirection != null) {
      this.messageInfo.enabled = Boolean(afterRedirection);
      this.messageInfo.text = sessionStorage.getItem("redirectionLogInText") || "";

      sessionStorage.removeItem("redirectionLogIn");
      sessionStorage.removeItem("redirectionLogInText");

      console.log(`Redirected successfully with message "${this.messageInfo.text}"!`);
    }
  }

  onSubmit() {

    this.authService.logIn(this.logInRequest).subscribe({
      next: (v) => {

        this.authService.saveJWT(v);

        this.router.navigate(['/'])
      },
      error: (e) => {
        this.messageInfo = this.errorsService.getResponseErrors(e)[1];
      }
    });
  }
}
