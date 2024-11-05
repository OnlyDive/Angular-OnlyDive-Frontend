import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
import { NavigationStart, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../../styles/buttonStyles.css']
})
export class HeaderComponent {
  @ViewChild('sidebarCheckbox') sidebarCheckbox!: ElementRef;
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window;
    if (target.innerWidth > 600 && this.sidebarCheckbox)
      this.sidebarCheckbox.nativeElement.checked = false;

  }

  showProfile() {
    this.sidebarCheckbox.nativeElement.checked = false;
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.sidebarCheckbox.nativeElement.checked = false;
    this.router.navigate(['/logOut']);
  }

  logIn() {
    this.sidebarCheckbox.nativeElement.checked = false;
    this.router.navigate(['/logIn']);
  }

  signUp() {
    this.sidebarCheckbox.nativeElement.checked = false;
    this.router.navigate(['/signUp']);
  }
}
