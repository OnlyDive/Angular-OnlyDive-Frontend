import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { SignUpRequest } from '../../../dto/SignUpRequest';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ FormsModule ],
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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password.trim() == "") {
      alert("Password must not be empty!");
      return;
    } else if (this.password != this.repeatPassword) {
      alert("Password and repeated password must match!");
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
        this.router.navigate(['/logIn'], { queryParams: { successfulSignUp: true }})
      },
      error: (e) => {
        console.log(e);
        // console.error(e);
        alert("Error: "+e.error);
      }
    });;
  }
}
