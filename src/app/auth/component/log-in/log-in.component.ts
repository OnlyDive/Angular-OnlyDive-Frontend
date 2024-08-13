import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../../../styles/formStyles.css', '../../../styles/buttonStyles.css']
})
export class LogInComponent {
  username!: string;
  password!: string;

  showSuccessfulSignupMessage!: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showSuccessfulSignupMessage = Boolean(params['successfulSignUp'])
      console.log(params['successfulSignUp'], this.showSuccessfulSignupMessage);
    })
  }

  onSubmit() {

  }
}
