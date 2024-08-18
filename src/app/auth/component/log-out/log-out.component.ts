import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logOut().subscribe({
      complete: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/'])
    });
  }
}
