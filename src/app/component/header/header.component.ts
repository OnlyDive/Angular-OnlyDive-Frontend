import { Component } from '@angular/core';
import { HeaderButtonComponent } from '../../tools/header-button/header-button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
import { NavigationStart, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderButtonComponent, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log("Navigation start caught, checking if logged in");
        this.isLoggedIn = authService.isLoggedIn();
      }
    })
  }

  logOut() {
    this.router.navigate(['/logOut']);
  }

  logIn() {
    this.router.navigate(['/logIn']);
  }

  signUp() {
    this.router.navigate(['/signUp']);
  }
}
