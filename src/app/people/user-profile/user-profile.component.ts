import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../interface/UserResponse';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  username!: string;
  user!: UserResponse;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || "";

    this.usersService.fetchUser(this.username).subscribe({
      next: (v) => {

        this.user = v;

        console.log(this.user);
      }
    });
  }
}
