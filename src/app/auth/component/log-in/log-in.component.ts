import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from '../../../tools/message/message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ CommonModule, FormsModule, MessageComponent ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css']
})
export class LogInComponent {
  username!: string;
  password!: string;

  showSuccessfulSignupMessage!: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const afterSignUp = sessionStorage.getItem("afterSuccessfulSignUp");
    if (afterSignUp != null) {
      sessionStorage.removeItem("afterSuccessfulSignUp");
      this.showSuccessfulSignupMessage = Boolean(afterSignUp);
      console.log("Redirected after successful sign up!");
    }
  }

  onSubmit() {

  }
}
