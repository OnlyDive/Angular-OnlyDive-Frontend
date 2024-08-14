import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageInfo } from '../../../tools/message/MessageInfo';
import { ErrorsService } from '../../../error/errors.service';
import { MessageComponent } from '../../../tools/message/message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [ FormsModule, CommonModule, MessageComponent ],
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css']
})
export class VerifyAccountComponent {
  verificationToken!: string
  
  messageInfo: MessageInfo;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private errorsService: ErrorsService) {
    this.messageInfo = MessageComponent.prototype.getDefaultErrorConfiguration();
  }

  ngOnInit(): void {
    this.verificationToken = this.route.snapshot.paramMap.get('verificationToken') || "";
  }

  onSubmit() {
    console.log(this.verificationToken);

    this.authService.verifyAccount(this.verificationToken).subscribe({
      next: (v) => {
        console.log(v);
        sessionStorage.setItem("redirectionLogIn", "true");
        sessionStorage.setItem("redirectionLogInText", "Your account has just been verified. Please log in");
        this.router.navigate(['/logIn'])
      },
      error: (e) => {
        this.messageInfo = this.errorsService.getResponseErrors(e)[1];
      }
    });
  }

}
